import CoverData from '../CoverData'
import CoverAssets from '../CoverAssets'
import RenderOptions from '../RenderOptions'
import CoverRender from '../CoverRender'

export default async (data: CoverData, assets: CoverAssets, options: RenderOptions, type: string) => {
    const coverRender = new CoverRender()
    const renderOptions = coverRender.renderOptions
    renderOptions.ratio = options.ratio
    renderOptions.scale = options.scale
    coverRender.draw(data, assets)
    return new Promise<Blob>((resolve, reject) => {
        coverRender.canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob)
            } else {
                reject()
            }
        },
            'image/' + type,
            1
        )
    })
}