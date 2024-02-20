import '@fontsource/montserrat/700.css'
import '@fontsource/quicksand/400.css'
import '@fontsource/quicksand/700.css'
import '@fontsource/noto-sans-sc/400.css'
import '@fontsource/noto-sans-sc/700.css'
import '@fontsource/noto-sans-tc/400.css'
import '@fontsource/noto-sans-tc/700.css'
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/noto-sans-kr/400.css'
import '@fontsource/noto-sans-kr/700.css'

export default async (): Promise<void> => {
    const fonts = [
        "700 0 'Montserrat'",
        "700 0 'Quicksand', 'Noto Sans SC', 'Noto Sans TC', 'Noto Sans JP', 'Noto Sans KR'",
        "400 0 'Quicksand', 'Noto Sans SC', 'Noto Sans TC', 'Noto Sans JP', 'Noto Sans KR'"
    ]
    for (const font of fonts)
        await document.fonts.load(font)
}