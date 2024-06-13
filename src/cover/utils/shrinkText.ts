export default (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string => {
    if (maxWidth <= 0)
        return ''
    else if (ctx.measureText(text).width <= maxWidth)
        return text
    else {
        let shrinkedText = text.slice(0, text.length - 1)
        while (ctx.measureText(shrinkedText + '...').width > maxWidth)
            shrinkedText = shrinkedText.slice(0, shrinkedText.length - 1)
        return shrinkedText + '...'
    }
}