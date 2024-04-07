const listen = (model, origin) => {
    let cleanedUp = false;
    if ("cleanup" in model) {
        console.warn('"cleanup" is a reserved name and cannot be used on the model.');
    }
    const handler = callHandler(origin, model);
    window.addEventListener("message", handler);
    return {
        cleanup: () => {
            if (cleanedUp) {
                throw new Error("The listener has been cleaned up.");
            }
            cleanedUp = true;
            window.removeEventListener("message", handler);
        },
    };
};
const callHandler = (origin, model) => (event) => {
    if (origin !== "*") {
        if (typeof origin === "string") {
            if (origin !== event.origin)
                return;
        }
        else if (Array.isArray(origin)) {
            if (!origin.includes(event.origin))
                return;
        }
        else {
            return;
        }
    }
    const { id, procedure, args, type, } = event.data;
    if (typeof id !== "string" || id === "")
        return;
    if (type !== "request")
        return;
    sendResponse({ id: event.data.id, type: "ack" }, event.source, event.origin);
    if (typeof model[procedure] !== "function") {
        const error = new ReferenceError(`"${procedure}" is not a procedure on the model`);
        sendResponse({ id: event.data.id, type: "error", error }, event.source, event.origin);
        return;
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const invocationResult = model[procedure](...args);
        if (invocationResult instanceof Promise) {
            invocationResult
                .then((data) => {
                sendResponse({ id: event.data.id, type: "response", data }, event.source, event.origin);
            })
                .catch((error) => {
                sendResponse({ id: event.data.id, type: "error", error }, event.source, event.origin);
            });
        }
        else {
            sendResponse({ id: event.data.id, type: "response", data: invocationResult }, event.source, event.origin);
        }
    }
    catch (error) {
        sendResponse({ id: event.data.id, type: "error", error: error }, event.source, event.origin);
    }
};
const sendResponse = (message, remote, origin) => {
    remote.postMessage(message, origin);
};

const createExposedPromise = () => {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return {
        resolve,
        reject,
        promise,
    };
};

const requestSender = (sentMessagesStore, remote, origin, options) => {
    const autoRetry = (id, reject, options = {
        timeout: 30,
        tries: 3,
        backoff: 3,
    }, startTime = Date.now()) => {
        const { timeout, tries, backoff } = options;
        setTimeout(() => {
            const sentMessage = sentMessagesStore.get(id);
            if (sentMessage === undefined)
                return;
            if (sentMessage.acknowledged)
                return;
            if (tries > 0) {
                autoRetry(id, reject, {
                    timeout: timeout * backoff,
                    tries: tries - 1,
                    backoff,
                }, startTime);
                sendRequest(sentMessage.message);
            }
            else {
                const timeElapsed = Date.now() - startTime;
                reject(new Error(`Message was not acknowledged after ${timeElapsed}ms.`));
            }
        }, timeout);
    };
    const saveMessageToStore = (message) => {
        const exposedPromise = createExposedPromise();
        sentMessagesStore.set(message.id, {
            message,
            acknowledged: false,
            promise: exposedPromise,
            remote,
        });
        return exposedPromise;
    };
    const sendNewRequest = async (messageData) => {
        const message = {
            ...messageData,
            id: Math.random().toString(36).substring(7),
        };
        const exposedPromise = saveMessageToStore(message);
        if (origin === "*" || origin === remote.origin) {
            sendRequest(message);
            autoRetry(message.id, exposedPromise.reject, options);
        }
        else {
            exposedPromise.reject(new Error(`The remote window's origin "${remote.origin}" does not match the specified origin "${origin}". The request was aborted before sending.`));
        }
        return await exposedPromise.promise;
    };
    const sendRequest = (message) => {
        remote.postMessage(message, origin);
    };
    return sendNewRequest;
};

const responseListener = (sentMessagesStore, origin) => {
    const handler = messageHandler(sentMessagesStore, origin);
    window.addEventListener("message", handler);
    return () => {
        window.removeEventListener("message", handler);
    };
};
const messageHandler = (sentMessagesStore, origin) => (event) => {
    if (origin !== "*" && origin !== event.origin)
        return;
    const { id, data, type, error } = event.data;
    if (typeof id !== "string" || id === "")
        return;
    if (type !== "response" && type !== "error" && type !== "ack")
        return;
    const sentMessage = sentMessagesStore.get(id);
    if (sentMessage === undefined)
        return;
    if (event.source !== sentMessage.remote)
        return;
    switch (type) {
        case "response":
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            sentMessage.promise.resolve(data);
            sentMessagesStore.delete(id);
            break;
        case "error":
            sentMessage.promise.reject(error);
            sentMessagesStore.delete(id);
            break;
        case "ack":
            sentMessagesStore.set(id, { ...sentMessage, acknowledged: true });
            break;
    }
};

const remote = (remote, origin, options) => {
    const sentMessagesStore = new Map();
    const sendRequest = requestSender(sentMessagesStore, remote, origin, options);
    const cleanup = responseListener(sentMessagesStore, origin);
    let cleanedUp = false;
    const handler = {
        get: (_, procedure) => {
            if (procedure === "cleanup") {
                return () => {
                    if (cleanedUp) {
                        throw new Error("The response listener has been cleaned up.");
                    }
                    cleanup();
                    cleanedUp = true;
                };
            }
            return async (...args) => {
                if (cleanedUp) {
                    throw new Error("The response listener has been cleaned up.");
                }
                return await sendRequest({
                    type: "request",
                    procedure,
                    args,
                });
            };
        },
    };
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return new Proxy({}, handler);
};

const bime = { listen, remote };

export { bime as default };
