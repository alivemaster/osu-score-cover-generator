export default (ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, width: number, height: number): void => {
    if (!img) return
    
    let scale: number
    let offsetX: number
    let offsetY: number
    if (img.width / img.height > width / height) {
        scale = height / img.height
        offsetX = (img.width - width / scale) / 2
        offsetY = 0
    } else {
        scale = width / img.width
        offsetX = 0
        offsetY = (img.height - height / scale) / 2
    }
    ctx.drawImage(img, offsetX, offsetY, width / scale, height / scale, x, y, width, height)
}