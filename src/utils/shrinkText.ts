export default (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string => {
    if (maxWidth <= 0) return ''
    if (ctx.measureText(text).width > maxWidth) {
        let shrinkedText = text.slice(0, text.length - 1)
        while (ctx.measureText(shrinkedText + '...').width > maxWidth)
            shrinkedText = shrinkedText.slice(0, shrinkedText.length - 1)
        return shrinkedText + '...'
    } else return text
}