export default async (src: string) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = src
    return new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error())
    })
}