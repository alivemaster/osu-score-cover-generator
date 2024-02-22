import Generator from "./components/Generator/Generator"
import "./style.css"
import '@fontsource/quicksand/300.css'
import '@fontsource/quicksand/400.css'
import '@fontsource/quicksand/500.css'
import '@fontsource/quicksand/600.css'
import '@fontsource/quicksand/700.css'
import '@fontsource/montserrat/700.css'
import '@fontsource/noto-sans-sc/400.css'
import '@fontsource/noto-sans-sc/700.css'
import '@fontsource/noto-sans-tc/400.css'
import '@fontsource/noto-sans-tc/700.css'
import '@fontsource/noto-sans-jp/400.css'
import '@fontsource/noto-sans-jp/700.css'
import '@fontsource/noto-sans-kr/400.css'
import '@fontsource/noto-sans-kr/700.css'

document.addEventListener("DOMContentLoaded", () => initApp())

const initApp = () => {
    const app = document.getElementById("app") as HTMLDivElement
    const generator = Generator.instance
    app.append(generator.preview, generator.settings)
}

