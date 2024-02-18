import bime from './bime.js'
console.log('script is running')
const iframe = document.querySelector('iframe')
const invokeIframe = bime.target(iframe.contentWindow, '*')
const invokeContent = bime.target(parent, '*')

const handler = {
	get: (_, prop) => {
		return async (...args) => {
			// TODO: forward messages to proper recipient
			//       instead of sending them to both the iframe and the content script
			try {
				invokeIframe[prop](args)
			} catch (_) {}
			try {
				invokeContent[prop](args)
			} catch (_) {}
		}
	},
}

const model = new Proxy({}, handler)

bime.listen('*', model)
