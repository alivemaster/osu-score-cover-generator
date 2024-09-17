import CoverData from "./CoverData"
import CoverAssets from "./CoverAssets"
import RenderOptions from "./RenderOptions"

export default interface CoverRender {
    canvas: HTMLCanvasElement
    options: RenderOptions
    draw(data: CoverData, assets: CoverAssets): void
}