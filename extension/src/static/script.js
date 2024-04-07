import bime from './bime.js'
const iframe = document.querySelector('iframe')
const callBoltIframe = bime.remote(iframe.contentWindow, '*')
const callContentScript = bime.remote(parent, '*')

const handler = (caller) => ({
	get: (_, prop) => {
		return async (...args) => {
			try {
				const response = caller[prop](...args)
				return response
			} catch (error) {
				console.warn(error)
			}
		}
	},
})

bime.listen(new Proxy({}, handler(callContentScript)), [
	'https://boltapply.com',
	'http://localhost:3000',
])
bime.listen(new Proxy({}, handler(callBoltIframe)), 'https://www.linkedin.com')
