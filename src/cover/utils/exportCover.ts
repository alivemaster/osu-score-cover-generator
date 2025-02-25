import type CoverData from '../CoverData'
import type CoverAssets from '../CoverAssets'
import type RenderOptions from '../RenderOptions'
import RenderV1 from '../styles/V1'

export default async (data: CoverData, assets: CoverAssets, options: RenderOptions, type: string) => {
    const render = new RenderV1()
    Object.assign(render.options, options)
    render.draw(data, assets)
    return new Promise<Blob>((resolve, reject) => {
        render.canvas.toBlob((blob) => {
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