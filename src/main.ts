import Generator from "./Generator"
import "./style.css"

document.addEventListener("DOMContentLoaded", () => initApp())

const initApp = async () => {
    const app = document.getElementById("app") as HTMLDivElement
    // DOM
    const previewDiv = document.createElement("div")
    previewDiv.className = "preview"
    const settngsDiv = document.createElement("div")
    settngsDiv.className = "settings"
    app.append(previewDiv, settngsDiv)
    // generator
    const generator = Generator.instance
    previewDiv.append(generator.preview.canvas)
    settngsDiv.append(...generator.settings)
    generator.init()
}

