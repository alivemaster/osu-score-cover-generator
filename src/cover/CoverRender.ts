import type CoverData from './CoverData'
import type CoverAssets from './CoverAssets'
import type RenderOptions from './RenderOptions'

export default interface CoverRender {
    canvas: HTMLCanvasElement
    options: RenderOptions
    draw(data: CoverData, assets: CoverAssets): void
}