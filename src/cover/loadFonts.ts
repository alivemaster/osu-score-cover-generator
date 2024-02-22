export default async (): Promise<void> => {
    const fonts = [
        "700 0 'Montserrat'",
        "700 0 'Quicksand', 'Noto Sans SC', 'Noto Sans TC', 'Noto Sans JP', 'Noto Sans KR'",
        "400 0 'Quicksand', 'Noto Sans SC', 'Noto Sans TC', 'Noto Sans JP', 'Noto Sans KR'"
    ]
    for (const font of fonts)
        await document.fonts.load(font)
}