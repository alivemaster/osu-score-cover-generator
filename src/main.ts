import Generator from "./components/Generator/Generator"
import "./style.css"
import '@fontsource-variable/quicksand'
import '@fontsource-variable/montserrat'
import '@fontsource-variable/noto-sans-sc'
import '@fontsource-variable/noto-sans-tc'
import '@fontsource-variable/noto-sans-jp'
import '@fontsource-variable/noto-sans-kr'

document.addEventListener("DOMContentLoaded", () => initApp())

const initApp = () => {
    const app = document.getElementById("app") as HTMLDivElement
    const generator = Generator.instance
    app.append(generator.preview, generator.settings)
}

