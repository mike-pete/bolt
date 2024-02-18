import { iframeHeight, iframeId, showIframeId } from '../constants'

const queryArray = (selector: string) =>
	Array.from(document.querySelectorAll(selector)) as HTMLElement[]

const query = (selector: string) =>
	document.querySelector(selector) as HTMLElement | null

const getTextContent = async (selector: string) => {
	return query(selector)?.textContent?.trim()
}

const hideIframe = () => {
	const iframe = query(`#${iframeId}`)
	iframe?.style.setProperty('transition-delay', '0ms')
	iframe?.style.setProperty(
		'transform',
		`translate(0, calc(${iframeHeight} + 2px))`
	)

	const showIframe = query(`#${showIframeId}`)
	showIframe?.style.setProperty('transition-delay', `200ms`)
	showIframe?.style.setProperty('transform', `translate(0, 0)`)
}

const showIframe = () => {
	const iframe = query(`#${iframeId}`)
	iframe?.style.setProperty('transition-delay', `200ms`)
	iframe?.style.setProperty('transform', `translate(0, 0)`)

	const showIframe = query(`#${showIframeId}`)
	showIframe?.style.setProperty('transition-delay', `0ms`)
	showIframe?.style.setProperty('transform', `translate(0, 46px)`)
}

const goToPage = (url: string) => {
	window.location.href = url
}

type Model = {
	getTextContent: (selector: string) => Promise<string | undefined>,
	hideIframe : () => void,
	showIframe : () => void,
	goToPage : (url: string) => void,
}

const model: Model = {
	getTextContent,
	hideIframe,
	showIframe,
	goToPage,
}

export default model
