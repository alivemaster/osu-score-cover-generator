import Generator from "./Generator"
import "./style.css"
import '@fontsource/quicksand/500.css';

document.addEventListener("DOMContentLoaded", () => initApp())

const initApp = () => {
    const app = document.getElementById("app") as HTMLDivElement
    const generator = Generator.instance
    app.append(generator.preview, generator.settings)
}

