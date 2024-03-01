"use client";
import bime from "@mike.pete/bime";
import handleLocationChanged from "./handleLocationChanged";

const bi = () => {
	// Node doesn't know about window, so if window isn't available, just return a proxy that throws an error (instead of returning bime).
	if (typeof window === "undefined") {
    const handler: ProxyHandler<Record<string, () => void>> = {
      get: () => {
        return async () => {
          throw new Error("window is not available in this context");
        };
      },
    };

    return new Proxy<Record<string, () => void>>(
      {} as Record<string, () => void>,
      handler,
    );
  }

  const target = window.parent || window;

  const model = {
    locationChanged: handleLocationChanged,
  };

  bime.listen("*", model);

  type ContentScriptModel = {
    getTextContent: (selector: string) => Promise<string | undefined>;
    hideIframe: () => void;
    showIframe: () => void;
    goToPage: (url: string) => void;
  };

  return bime.target<ContentScriptModel>(target, "*");
};

export default bi();
