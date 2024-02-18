import { iframeHeight, iframeId, showIframeId } from '../constants'
import model from './model'

const createIframe = (src: string) => {
	const iframe = document.createElement('iframe')
	iframe.id = iframeId
	iframe.src = src
	iframe.style.cssText = `
	position: fixed;
	bottom: 2px;
	right: 2px;
	z-index: 9999;
	width: 354px;
	height: ${iframeHeight};
	transition-duration: 150ms
	`
	iframe.setAttribute(
		'sandbox',
		'allow-same-origin allow-forms allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-storage-access-by-user-activation'
	)

	const showIframeButton = document.createElement('button')
	showIframeButton.id = showIframeId
	showIframeButton.onclick = () => {
		model.showIframe()
	}
	showIframeButton.style.cssText = `
	position: fixed;
	height: 44px;
	width: 44px;
	bottom: 2px;
	right: 298.5px;
	z-index: 9998;
	border: 2px solid #d4d4d8;
	border-radius: 6px;
	background-color: white;
	transition-duration: 150ms;
	transform: translate(0, 46px);
	background-image: url('${chrome.runtime.getURL('images/bolt.svg')}');
	background-repeat: no-repeat;
	background-position: center;
	background-size: 16px;
	`

	document.body.append(iframe)
	document.body.append(showIframeButton)

	return iframe
}

export default createIframe
