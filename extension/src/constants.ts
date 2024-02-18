export const enum BackgroundActions {
	OPEN_CONTROLS = 'OPEN_CONTROLS',
	CLOSE_CONTROLS = 'CLOSE_CONTROLS',
}

const isProd = process.env.ENVIRONMENT === 'production'

// TODO: fix this
export const iframeSource = isProd ? 'https://stackfindr.vercel.app' : chrome.runtime.getURL('frame.html'); //'http://localhost:3000/extension'//'http://localhost:5173'

export const iframeId = 'stackfindr-iframe'
export const showIframeId = 'stackfindr-show-iframe'
export const iframeHeight = '654px'
