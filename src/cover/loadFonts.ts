export default async (): Promise<void> => {
    const fonts = [
        "700 0 'Montserrat Variable'",
        "700 0 'Quicksand Variable', 'Noto Sans SC Variable', 'Noto Sans TC Variable', 'Noto Sans JP Variable', 'Noto Sans KR Variable'",
        "400 0 'Quicksand Variable', 'Noto Sans SC Variable', 'Noto Sans TC Variable', 'Noto Sans JP Variable', 'Noto Sans KR Variable'"
    ]
    for (const font of fonts)
        await document.fonts.load(font)
}