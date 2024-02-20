export default async (file: File) => {
    const img = new Image()
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
        img.src = e.target!.result as string
    }
    return new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => resolve(img)
        img.onerror = () => reject(new Error())
    })
}