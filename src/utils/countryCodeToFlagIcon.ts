export default async (code: string) => {
    const codePoints = code
        .split('')
        .map((char) => {
            const offset = 127397
            const emojiCode = offset + char.charCodeAt(0)
            const emoji = String.fromCharCode(emojiCode)
            const point = '1' + emoji.codePointAt(0)!.toString(16)
            return point
        })
    const fileName = codePoints[0] + '-' + codePoints[1]
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/' + fileName + '.svg'
    return new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error())
    })
}