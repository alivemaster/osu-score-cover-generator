export default async () => {
    const fonts = [
        "700 0px 'Montserrat Variable'",
        "700 0px 'Quicksand Variable', 'Noto Sans SC Variable', 'Noto Sans TC Variable', 'Noto Sans JP Variable', 'Noto Sans KR Variable'",
        "400 0px 'Quicksand Variable', 'Noto Sans SC Variable', 'Noto Sans TC Variable', 'Noto Sans JP Variable', 'Noto Sans KR Variable'"
    ]
    for (const font of fonts)
        await document.fonts.load(font)
}