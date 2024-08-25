import CoverData from '../CoverData'
import CoverAssets from '../CoverAssets'
import RenderOptions from '../RenderOptions'
import CoverRender from '../CoverRender'

export default async (data: CoverData, assets: CoverAssets, options: RenderOptions, type: string) => {
    const coverRender = new CoverRender()
    Object.assign(coverRender.renderOptions, options)
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