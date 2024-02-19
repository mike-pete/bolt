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
			let response
			try {
				response = invokeIframe[prop](args)
			} catch (_) {}
			try {
				response = invokeContent[prop](args)
			} catch (_) {}
			return response
		}
	},
}

const model = new Proxy({}, handler)

bime.listen('*', model)
