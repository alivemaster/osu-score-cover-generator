import './Panel.css'

export default class Panel {
    private _header: HTMLDivElement
    private _container: HTMLDivElement
    private _name: string
    constructor(name: string, ...content: Node[]) {
        this._header = document.createElement("div")
        this._header.className = "panel-header"

        this._name = name
        const title = document.createElement("span")
        title.className = "panel-title"
        title.append(this._name)
        const status = document.createElement("span")
        status.className = "panel-status"
        status.append('hide')
        this._header.append(title, status)

        this._container = document.createElement("div")
        this._container.className = "panel-container"
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
        panel.className = 'panel'
        panel.append(this._header, this._container)
        return panel
    }
}