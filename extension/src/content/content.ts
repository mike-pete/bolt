import bime from '@mike.pete/bime'
import createIframe from './createIframe'
import model from './model'
import { iframeSource } from '../constants'

const allowedHostnames = new Set(['www.linkedin.com'])
const { hostname } = window.location
const shouldShowIframe = allowedHostnames.has(hostname)

bime.listen('*', model)

type IframeModel = {
	locationChanged: (location: string) => void
}

if (shouldShowIframe) {
	const src = iframeSource
	const iframe = createIframe(src)
	const target = iframe.contentWindow

	if (target) {
		const bi = bime.target<IframeModel>(target, '*')

		let previousUrl = ''
		const observer = new MutationObserver(() => {
			if (window.location.href !== previousUrl) {
				previousUrl = window.location.href
				bi.locationChanged(JSON.stringify(window.location))
			}
		})
		const config = { subtree: true, childList: true }
		observer.observe(document, config)
	}
}
