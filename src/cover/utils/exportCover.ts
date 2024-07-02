import CoverData from '../CoverData'
import CoverAssets from '../CoverAssets'
import CoverRender from '../CoverRender'

export default async (data: CoverData, assets: CoverAssets, ratio: string, scale: number, type: string) => {
    const coverRender = new CoverRender()
    coverRender.ratio = ratio as typeof coverRender.ratio
    coverRender.scale = scale
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