"use client"
import bime from '@mike.pete/bime'
import handleLocationChanged from './handleLocationChanged'

const target = window.parent

const model = {
    locationChanged: handleLocationChanged,
}

bime.listen('*', model)

type ContentScriptModel = {
    getTextContent: (selector: string) => Promise<string | undefined>
    hideIframe: () => void
    showIframe: () => void
    goToPage: (url: string) => void
}

const bi = bime.target<ContentScriptModel>(target, '*')

export default bi
