import Panel from "../Panel/Panel.ts"
import ScoreData from "../../cover/ScoreData.ts"
import Render from "../../cover/Render.ts"
import loadImgFile from "../../utils/loadImgFile.ts"
import countryCodeToFlagIcon from "../../utils/countryCodeToFlagIcon.ts"
import countryList from "../../assets/countries.json"
import classes from "./Generator.module.css"

export default class Generator {
    static instance: Generator = new Generator()
    private _preview: Render
    private _scoreData: ScoreData
    private constructor() {
        this._preview = new Render()
        this._scoreData =
        {
            user: {
                avatar: new Image(),
                userName: 'player',
                flag: new Image()
            },
            score: {
                pp: {
                    value: '0',
                    enabled: true
                },
                status: {
                    type: 'fc',
                    value: '0'
                },
                rank: {
                    value: '0',
                    enabled: true
                },
                accuracy: '0',
                maxCombo: {
                    value: '0',
                    perfect: false
                },
            },
            beatmap: {
                background: new Image(),
                title: 'Song Title',
                state: 'ranked',
                stats: [
                    {
                        type: 'time',
                        value: '0:00',
                        enabled: false
                    },
                    {
                        type: 'bpm',
                        value: '0',
                        enabled: false
                    },
                    {
                        type: 'ar',
                        value: '0',
                        enabled: true
                    },
                    {
                        type: 'cs',
                        value: '0',
                        enabled: true
                    },
                    {
                        type: 'od',
                        value: '0',
                        enabled: false
                    },
                    {
                        type: 'hp',
                        value: '0',
                        enabled: false
                    },
                ],
                difficulty: {
                    star: '0',
                    name: 'Diff Name'
                },
                mods: [
                    {
                        type: 'ez',
                        enabled: false
                    },
                    {
                        type: 'nf',
                        enabled: false
                    },
                    {
                        type: 'ht',
                        enabled: false
                    },
                    {
                        type: 'hd',
                        enabled: false
                    },
                    {
                        type: 'hr',
                        enabled: false
                    },
                    {
                        type: 'dt',
                        enabled: false
                    },
                    {
                        type: 'nc',
                        enabled: false
                    },
                    {
                        type: 'fl',
                        enabled: false
                    },
                    {
                        type: 'sd',
                        enabled: false
                    },
                    {
                        type: 'pf',
                        enabled: false
                    },
                    {
                        type: 'rx',
                        enabled: false
                    },
                    {
                        type: 'ap',
                        enabled: false
                    },
                    {
                        type: 'so',
                        enabled: false
                    },
                    {
                        type: 'v2',
                        enabled: false
                    },
                ]
            },
            comment: 'Comment'
        }
    }
    get preview() {
        const preview = this._preview
        const data = this._scoreData
        const container = document.createElement("div")
        container.className = classes.preview
        container.append(preview.canvas)
        //
        const previewResize = () => {
            preview.scale = container.clientWidth / 1920
            preview.draw(data)
        }
        window.addEventListener("resize", () => previewResize())
        //
        preview.init().then(() => previewResize())
        return container
    }
    get settings() {
        const container = document.createElement("div")
        container.className = classes.settings
        container.append(
            this.playerSettings(),
            this.scoreSettings(),
            this.beatmapSettings(),
            this.commentSettings(),
            this.exportSettings()
        )
        return container
    }
    private playerSettings = () => {
        const preview = this._preview
        const data = this._scoreData
        //
        const usernameSettings = () => {
            const label = document.createElement("label")
            label.append('username')
            label.htmlFor = "username"
            const textInput = document.createElement("input")
            textInput.type = "text"
            textInput.name = "username"
            textInput.value = data.user.userName
            textInput.addEventListener("change", () => {
                data.user.userName = textInput.value
                preview.draw(data)
            })
            const container = document.createElement("div")
            container.id = "username-settings"
            container.append(label, textInput)
            return container
        }
        const avatarSettings = () => {
            const label = document.createElement("label")
            label.append('avatar')
            label.htmlFor = "avatar"
            const upload = document.createElement("input")
            upload.type = "file"
            upload.accept = "image/*"
            upload.name = "avatar"
            upload.addEventListener("change", async () => {
                if (upload.files && upload.files[0]) {
                    data.user.avatar = await loadImgFile(upload.files[0])
                    preview.draw(data)
                }
            })
            const container = document.createElement("div")
            container.id = "avatar-settings"
            container.append(label, upload)
            return container
        }
        const flagSettings = () => {
            const label = document.createElement("label")
            label.append('flag')
            label.htmlFor = "flag"
            const select = document.createElement("select")
            select.name = "flag"
            // const options = countryList
            const options = [
                {
                    "name": "None",
                    "code": ""
                },
                ...countryList
            ]
            options.forEach((item) => {
                const option = document.createElement("option")
                option.value = item.code
                if (item.code === data.score.status.type) option.selected = true
                option.append(item.name)
                select.append(option)
            })
            select.addEventListener("change", async () => {
                if (select.value === '')
                    data.user.flag = new Image()
                else
                    data.user.flag = await countryCodeToFlagIcon(select.value)
                preview.draw(data)
            })
            const container = document.createElement("div")
            container.id = "flag-settings"
            container.append(label, select)
            return container
        }
        //
        const playerSettings = new Panel('Player', usernameSettings(), avatarSettings(), flagSettings())
        return playerSettings.panel
    }
    private scoreSettings = () => {
        const preview = this._preview
        const data = this._scoreData
        //
        const ppSettings = () => {
            const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.name = "enable-pp"
            checkbox.checked = true
            const label = document.createElement("label")
            label.append('PP')
            label.htmlFor = "enable-pp"
            const numInput = document.createElement("input")
            numInput.type = "number"
            numInput.disabled = !checkbox.checked
            numInput.value = data.score.pp.value
            const settings = [checkbox, numInput]
            settings.forEach((e) => {
                e.addEventListener("change", () => {
                    data.score.pp.enabled = checkbox.checked
                    numInput.disabled = !checkbox.checked
                    data.score.pp.value = numInput.value
                    preview.draw(data)
                })
            })
            const container = document.createElement("div")
            container.id = "pp-settings"
            container.append(checkbox, label, numInput)
            return container
        }
        const scoreStatusSettings = () => {
            const select = document.createElement("select")
            select.name = "score-status"
            const options = [
                {
                    name: 'SS',
                    value: 'ss'
                },
                {
                    name: 'FC',
                    value: 'fc'
                },
                {
                    name: 'failed',
                    value: 'fail'
                },
                {
                    name: 'miss',
                    value: 'miss'
                },
                {
                    name: 'sliderbreak',
                    value: 'sb'
                },
            ]
            options.forEach((item) => {
                const option = document.createElement("option")
                option.value = item.value
                if (item.value === data.score.status.type) option.selected = true
                option.append(item.name)
                select.append(option)
            })
            const numInput = document.createElement("input")
            numInput.type = "number"
            numInput.disabled = true
            numInput.value = data.score.status.value
            const status = [select, numInput]
            status.forEach((e) => {
                e.addEventListener("change", () => {
                    if (select.value === 'miss' || select.value === 'sb') {
                        numInput.disabled = false
                    } else {
                        numInput.disabled = true
                    }
                    data.score.status.type = select.value as typeof data.score.status.type
                    data.score.status.value = numInput.value
                    preview.draw(data)
                })
            })
            const container = document.createElement("div")
            container.id = "score-status-settings"
            container.append(select, numInput)
            return container
        }
        const rankSettings = () => {
            const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.name = "enable-rank"
            checkbox.checked = true
            const label = document.createElement("label")
            label.append('rank')
            label.htmlFor = "enable-rank"
            const numInput = document.createElement("input")
            numInput.type = "number"
            numInput.disabled = !checkbox.checked
            numInput.value = data.score.rank.value
            const settings = [checkbox, numInput]
            settings.forEach((e) => {
                e.addEventListener("change", () => {
                    data.score.rank.enabled = checkbox.checked
                    numInput.disabled = !checkbox.checked
                    data.score.rank.value = numInput.value
                    preview.draw(data)
                })
            })
            const container = document.createElement("div")
            container.id = "rank-settings"
            container.append(checkbox, label, numInput)
            return container
        }
        const accSettings = () => {
            const label = document.createElement("label")
            label.append('accuracy')
            label.htmlFor = "accuracy"
            const numInput = document.createElement("input")
            numInput.type = "number"
            numInput.name = "accuracy"
            numInput.value = data.score.accuracy
            numInput.addEventListener("change", () => {
                data.score.accuracy = numInput.value
                preview.draw(data)
            })
            const container = document.createElement("div")
            container.id = "accuracy-settings"
            container.append(label, numInput)
            return container
        }
        const cbSettings = () => {
            const label = document.createElement("label")
            label.append('combo')
            label.htmlFor = "cb"
            const numInput = document.createElement("input")
            numInput.type = "number"
            numInput.name = "cb"
            numInput.value = data.score.maxCombo.value
            numInput.addEventListener("change", () => {
                data.score.maxCombo.value = numInput.value
                preview.draw(data)
            })
            const container = document.createElement("div")
            container.id = "combo-settings"
            container.append(label, numInput)
            return container
        }
        const perfectSettings = () => {
            const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.name = "perfect"
            checkbox.checked = false
            checkbox.addEventListener("change", () => {
                data.score.maxCombo.perfect = checkbox.checked
                preview.draw(data)
            })
            const label = document.createElement("label")
            label.append('perfect')
            label.htmlFor = "perfect"
            const container = document.createElement("div")
            container.id = "perfect-settings"
            container.append(checkbox, label)
            return container
        }
        const scoreSettings = new Panel('Score', ppSettings(), scoreStatusSettings(), rankSettings(), accSettings(), cbSettings(), perfectSettings())
        return scoreSettings.panel
    }
    private beatmapSettings = () => {
        const preview = this._preview
        const data = this._scoreData
        //
        const titleSettings = () => {
            const label = document.createElement("label")
            label.append('title')
            label.htmlFor = "title"
            const textInput = document.createElement("input")
            textInput.type = "text"
            textInput.name = "title"
            textInput.value = data.beatmap.title
            textInput.addEventListener("change", () => {
                data.beatmap.title = textInput.value
                preview.draw(data)
            })
            const container = document.createElement("div")
            container.id = "title-settings"
            container.append(label, textInput)
            return container
        }
        const bgSettings = () => {
            const label = document.createElement("label")
            label.append('bg')
            label.htmlFor = "background"
            const upload = document.createElement("input")
            upload.type = "file"
            upload.accept = "image/*"
            upload.name = "background"
            upload.addEventListener("change", async () => {
                if (upload.files && upload.files[0]) {
                    data.beatmap.background = await loadImgFile(upload.files[0])
                    preview.draw(data)
                }
            })
            const container = document.createElement("div")
            container.id = "background-settings"
            container.append(label, upload)
            return container
        }
        const beatmapStateSettings = () => {
            const select = document.createElement("select")
            select.name = "beatmap-state"
            const options = [
                {
                    name: 'ranked',
                    value: 'ranked'
                },
                {
                    name: 'approved / qualified',
                    value: 'approved'
                },
                {
                    name: 'loved',
                    value: 'loved'
                },
                {
                    name: 'pending / wip / graveyard / not submitted',
                    value: 'unranked'
                },
            ]
            options.forEach((item) => {
                const option = document.createElement("option")
                option.value = item.value
                if (item.value === data.beatmap.state) option.selected = true
                option.append(item.name)
                select.append(option)
            })
            select.addEventListener("change", () => {
                data.beatmap.state = select.value as typeof data.beatmap.state
                preview.draw(data)
            })
            return select
        }
        const beatmapStatsSettings = () => {
            const container = document.createElement("div")
            container.id = "beatmap-stats-settings"
            data.beatmap.stats.forEach((item) => {
                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.name = `enable-${item.type}`
                checkbox.checked = item.enabled
                const label = document.createElement("label")
                label.append(item.type)
                label.htmlFor = `enable-${item.type}`
                const numInput = document.createElement("input")
                numInput.type = item.type === 'time' ? "string" : "number"
                numInput.disabled = !checkbox.checked
                numInput.value = item.value
                const settings = [checkbox, numInput]
                settings.forEach((e) => {
                    e.addEventListener("change", () => {
                        item.enabled = checkbox.checked
                        numInput.disabled = !checkbox.checked
                        item.value = numInput.value
                        preview.draw(data)
                    })
                })
                const subContainer = document.createElement("div")
                subContainer.append(checkbox, label, numInput)
                container.append(subContainer)
            })
            return container
        }
        const starSettings = () => {
            const label = document.createElement("label")
            label.append('star')
            label.htmlFor = "star"
            const numInput = document.createElement("input")
            numInput.type = "number"
            numInput.name = "star"
            numInput.step = '0.1'
            numInput.value = data.beatmap.difficulty.star
            numInput.addEventListener("change", () => {
                data.beatmap.difficulty.star = numInput.value
                preview.draw(data)
            })
            const container = document.createElement("div")
            container.id = "star-settings"
            container.append(label, numInput)
            return container
        }
        const diffNameSettings = () => {
            const label = document.createElement("label")
            label.append('diff name')
            label.htmlFor = "diff-name"
            const textInput = document.createElement("input")
            textInput.type = "text"
            textInput.name = "diff-name"
            textInput.value = data.beatmap.difficulty.name
            textInput.addEventListener("change", () => {
                data.beatmap.difficulty.name = textInput.value
                preview.draw(data)
            })
            const container = document.createElement("div")
            container.id = "diff-name-settings"
            container.append(label, textInput)
            return container
        }
        const modsSettings = () => {
            const container = document.createElement("div")
            container.id = "mods-settings"
            data.beatmap.mods.forEach((item) => {
                const checkbox = document.createElement("input")
                checkbox.type = "checkbox"
                checkbox.name = `enable-${item.type}`
                checkbox.checked = item.enabled
                const label = document.createElement("label")
                label.append(item.type)
                label.htmlFor = `enable-${item.type}`
                checkbox.addEventListener("change", () => {
                    item.enabled = checkbox.checked
                    preview.draw(data)
                })
                const subContainer = document.createElement("div")
                subContainer.append(checkbox, label)
                container.append(subContainer)
            })
            return container
        }
        const beatmapSettings = new Panel('Beatmap', titleSettings(), bgSettings(), beatmapStateSettings(), beatmapStatsSettings(), starSettings(), diffNameSettings(), modsSettings())
        return beatmapSettings.panel
    }
    private commentSettings = () => {
        const preview = this._preview
        const data = this._scoreData
        //
        const textArea = document.createElement("textarea")
        textArea.name = "comment"
        textArea.value = data.comment
        textArea.addEventListener("change", () => {
            data.comment = textArea.value
            preview.draw(data)
        })
        const commentSettings = new Panel('Comment', textArea)
        return commentSettings.panel
    }
    private exportSettings = () => {
        const preview = this._preview
        const data = this._scoreData
        //
        let scale = 1
        let ratio = '16by10'
        const scaleSettings = () => {
            const label = document.createElement("label")
            label.append('scale')
            label.htmlFor = "scale"
            const numInput = document.createElement("input")
            numInput.type = "number"
            numInput.name = "scale"
            numInput.value = scale.toString()
            numInput.addEventListener("change", () => {
                scale = Number(numInput.value)
            })
            const container = document.createElement("div")
            container.id = "accuracy-settings"
            container.append(label, numInput)
            return container
        }
        const aspectRatioSettings = () => {
            const label = document.createElement("label")
            label.append('aspect ratio')
            label.htmlFor = "aspect-ratio"
            const select = document.createElement("select")
            select.name = "aspect-ratio"
            const options = [
                {
                    name: '16:9',
                    value: '16by9'
                },
                {
                    name: '16:10',
                    value: '16by10'
                },
                {
                    name: '4:3',
                    value: '4by3'
                },
            ]
            options.forEach((item) => {
                const option = document.createElement("option")
                option.value = item.value
                if (item.value === '16by10') option.selected = true
                option.append(item.name)
                select.append(option)
            })
            select.addEventListener("change", () => {
                ratio = select.value
                preview.ratio = ratio as typeof preview.ratio
                preview.draw(data)
            })
            const container = document.createElement("div")
            container.id = "aspect-ratio-settings"
            container.append(label, select)
            return container
        }
        const exportButtons = () => {
            const exportCover = async (data: ScoreData, scale: number): Promise<Blob> => {
                const cover = new Render()
                await cover.init()
                cover.ratio = ratio as typeof preview.ratio
                cover.scale = scale
                cover.draw(data)
                return new Promise<Blob>((resolve, reject) => {
                    cover.canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob)
                        } else {
                            reject(() => {
                                console.log()
                            })
                        }
                    }
                    )
                })
            }
            const fileName = () => {
                const username = data.user.userName
                const beatmapTitle = '-' + data.beatmap.title
                const diffName = '[' + data.beatmap.difficulty.name + ']'
                const mods = () => {
                    let str = ''
                    data.beatmap.mods.forEach((mod) => {
                        if (mod.enabled) str += mod.type.toUpperCase()
                    })
                    if (str !== '') str = '-' + str
                    return str
                }
                const scoreStatus = '-' + (data.score.status.type === 'miss' || data.score.status.type === 'sb' ? data.score.status.value : '') + data.score.status.type.toUpperCase()
                const accuracy = '-' + data.score.accuracy + '%'
                const pp = () => {
                    if (data.score.pp.enabled)
                        return '-' + data.score.pp.value + 'PP'
                    else return ''
                }
                return username + beatmapTitle + diffName + mods() + scoreStatus + accuracy + pp() + '-' + ratio + '-' + scale + 'x'
            }
            //
            const downloadBtn = document.createElement("button")
            downloadBtn.name = "download-image"
            downloadBtn.innerHTML = 'Download'
            downloadBtn.addEventListener("click", () => {
                exportCover(data, Number(scale)).then((blob) => {
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = `${fileName()}.png`
                    a.click()
                    URL.revokeObjectURL(url)
                })
                    .catch((e) => console.log(`Download failed! ${e}`))
            })
            const copyBtn = document.createElement("button")
            copyBtn.name = "copy-image"
            copyBtn.innerHTML = 'Copy'
            copyBtn.addEventListener("click", () => {
                exportCover(data, Number(scale)).then((blob) => {
                    const cp = [new ClipboardItem({ 'image/png': blob })]
                    navigator.clipboard
                        .write(cp)
                        .catch((e) => console.log(`Copy failed! ${e}`))
                })
            })
            const container = document.createElement("div")
            container.id = "export-buttons"
            container.append(downloadBtn, copyBtn)
            return container
        }
        const exportSettings = new Panel('Export', scaleSettings(), aspectRatioSettings(), exportButtons())
        return exportSettings.panel
    }
} 