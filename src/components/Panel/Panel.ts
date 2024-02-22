import classes from "./Panel.module.css"

export default class Panel {
    private _header: HTMLDivElement
    private _container: HTMLDivElement
    private _name: string
    constructor(name: string, ...content: Node[]) {
        this._header = document.createElement("div")
        this._header.className = classes.panelHeader

        this._name = name
        const title = document.createElement("span")
        title.className = classes.panelTitle
        title.append(this._name)
        const status = document.createElement("span")
        status.className = classes.panelStatus
        status.append('fold')
        this._header.append(title, status)

        this._container = document.createElement("div")
        this._container.className = classes.panelContainer
        this._container.append(...content)

        this._header.addEventListener("click", () => {
            if (this._container.style.display === "none") {
                this._container.style.display = "flex"
                status.innerHTML = 'hide'
            } else {
                this._container.style.display = "none"
                status.innerHTML = 'expand'
            }
        })
    }

    get panel() {
        const panel = document.createElement("div")
        panel.className = classes.panel
        panel.append(this._header, this._container)
        return panel
    }
}