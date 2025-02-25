import loadImgUrl from '../../utils/loadImgUrl'

export default async (code: string) => {
    if (code === '')
        return new Image()
    else {
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
        const fileSrc = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/' + fileName + '.svg'
        return loadImgUrl(fileSrc)
    }
}