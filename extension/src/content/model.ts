import { iframeHeight, iframeId, showIframeId } from '../constants'

const query = (selector: string) => document.querySelector(selector) as HTMLElement | null

const getTextContent = async (selector: string) => {
	const element = query(selector)
	
	if (element === null) {
		throw new Error('Element not found!')
	}

	const textNodes = document.evaluate(
		'.//child::text()',
		element,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	)
	
	let textSnippets: string[] = []

	for (let i = 0; i < textNodes.snapshotLength; i++) {
		const textNode = textNodes.snapshotItem(i)
		const text = textNode?.textContent?.trim()
		textSnippets.push(text ?? '')
	}

	return textSnippets.join(' ')
}

const hideIframe = () => {
	const iframe = query(`#${iframeId}`)
	iframe?.style.setProperty('transition-delay', '0ms')
	iframe?.style.setProperty('transform', `translate(0, calc(${iframeHeight} + 2px))`)

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

const getCurrentUrl = () => window.location.href

const removeHighlight = () => {
	// console.log('removing highlight...')
	document.querySelectorAll<HTMLElement>('[data-bolt-highlight]').forEach((span) => {
		const textNode = document.createTextNode(span.innerText)
		span.parentNode?.replaceChild(textNode, span)
	})

	document.querySelectorAll<HTMLElement>('[data-bolt-highlight-wrapper]').forEach((span) => {
		const textNode = document.createTextNode(span.innerText)
		span.parentNode?.replaceChild(textNode, span)
	})
}

const highlightKeywords = (
	keywords: { keyword: string; color: string }[],
	elementSelector: string
) => {
	removeHighlight()

	const element = document.querySelector(elementSelector) as HTMLElement | null
	if (element === null) {
		throw new Error('Element not found!')
	}


	console.log('highlighting...', keywords)
	const textNodes = document.evaluate(
		'.//child::text()',
		element,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null
	)

	for (let i = 0; i < textNodes.snapshotLength; i++) {
		const textNode = textNodes.snapshotItem(i)
		const text = textNode?.textContent ?? ''
		let replacedText = text

		keywords.forEach(({ keyword, color }) => {
			const escapedKeyword = keyword.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

			replacedText = replacedText.replace(
				new RegExp(`\\b(${escapedKeyword})((?=[^\\w])|$)`, 'gi'),
				`<span data-bolt-highlight="${keyword}" style="background-color:${color}; color:white; border-radius:4px; padding: 0px 2px;">$&</span>`
			)
		})

		if (replacedText !== text) {
			const span = document.createElement('span')
			span.setAttribute('data-bolt-highlight-wrapper', '')
			span.innerHTML = replacedText
			textNode?.parentNode?.replaceChild(span, textNode)
		}
	}
}

export type ExtensionModel = {
	getTextContent: (selector: string) => Promise<string | undefined>
	hideIframe: () => void
	showIframe: () => void
	goToPage: (url: string) => void
	getCurrentUrl: () => string
	highlightKeywords: (
		keywords: { keyword: string; color: string }[],
		elementSelector: string
	) => void
	removeHighlight: () => void
}

const model: ExtensionModel = {
	getTextContent,
	hideIframe,
	showIframe,
	goToPage,
	getCurrentUrl,
	highlightKeywords,
	removeHighlight,
}

export default model
