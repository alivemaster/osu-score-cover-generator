import CoverAssets from "./CoverAssets.ts"
import CoverLayout from "./CoverLayout.ts"
import ScoreData from "./CoverData.ts"
import diffSpectrum from "./utils/diffSpectrum.ts"
import fillImg from "./utils/fillImg.ts"
import shrinkText from "./utils/shrinkText.ts"
import rankedIcon from "../assets/beatmapstate-icons/ranked.svg"
import approvedIcon from "../assets/beatmapstate-icons/approved.svg"
import lovedIcon from "../assets/beatmapstate-icons/loved.svg"
import unrankedIcon from "../assets/beatmapstate-icons/unranked.svg"
import defaultBackground from "../assets/defaults/background-alpha.png"
import defaultAvatar from "../assets/defaults/avatar.png"
import defaultFlag from "../assets/defaults/flag.svg"

export default class CoverRender {
    private _canvas: HTMLCanvasElement
    private _ctx: CanvasRenderingContext2D
    private _size: { width: number, height: number }
    private _scale: number
    private _layout: CoverLayout
    private _assets: CoverAssets
    constructor() {
        this._canvas = document.createElement("canvas")
        this._ctx = this.canvas.getContext("2d")!
        this._size = { width: 1920, height: 1200 }
        this._scale = 1
        this._layout = {} as CoverLayout
        this._assets = {} as CoverAssets
        this.resize()
        this.arrange(this._size)
    }
    public async init() {
        // fonts
        const fonts = [
            "0px 'Montserrat Variable'",
            "0px 'Quicksand Variable', 'Noto Sans SC Variable', 'Noto Sans TC Variable', 'Noto Sans JP Variable', 'Noto Sans KR Variable'",
            "0px 'Quicksand Variable', 'Noto Sans SC Variable', 'Noto Sans TC Variable', 'Noto Sans JP Variable', 'Noto Sans KR Variable'"
        ]
        fonts.forEach(async (font) => {
            try {
                await document.fonts.load(font)
            } catch (err) {
                console.log(`${font} failed to load! ${err}`)
            }
        })
        // assets
        const loadImg = async (src: string) => {
            const img = new Image()
            img.crossOrigin = "anonymous"
            img.src = src
            return new Promise<HTMLImageElement>((resolve, reject) => {
                img.onload = () => resolve(img)
                img.onerror = () => reject(new Error())
            })
        }
        this._assets = {
            beatmapStateIcons: {
                ranked: await loadImg(rankedIcon),
                approved: await loadImg(approvedIcon),
                loved: await loadImg(lovedIcon),
                unranked: await loadImg(unrankedIcon)
            },
            defaults: {
                background: await loadImg(defaultBackground),
                avatar: await loadImg(defaultAvatar),
                flag: await loadImg(defaultFlag)
            }
        }
    }
    get canvas() {
        return this._canvas
    }
    set scale(scale: number) {
        this._scale = scale
        this.resize()
    }
    set ratio(ratio: '16by9' | '16by10' | '4by3') {
        const size = this._size
        size.width = 1920
        size.height = ratio === '16by9' ? 1080 :
            ratio === '16by10' ? 1200 :
                1440
        this.resize()
        this.arrange(size)
    }
    private resize() {
        const canvas = this._canvas
        const ctx = this._ctx
        const size = this._size
        const scale = this._scale
        canvas.width = size.width * scale
        canvas.height = size.height * scale
        ctx.scale(scale, scale)
    }
    private arrange(size: { width: number, height: number }) {
        const layout = this._layout
        layout.topBar = {
            x: 0,
            y: 0,
            width: size.width,
            height: (size.height - 200) / 2,
            paddingH: 48,
            gap: 24
        }
        layout.playerCard = {
            x: layout.topBar.paddingH!,
            get y() { return (layout.topBar.height - this.height) / 2 },
            width: 640,
            height: 240,
            paddingH: 24,
            paddingV: 24,
            gap: 24
        }
        layout.avatar = {
            x: layout.playerCard.x + layout.playerCard.paddingH!,
            y: layout.playerCard.y + layout.playerCard.paddingV!,
            width: 192,
            height: 192
        }
        layout.playerInfo = {
            x: layout.avatar.x + layout.avatar.width + layout.playerCard.gap!,
            y: layout.playerCard.y + layout.playerCard.paddingV!,
            width: layout.playerCard.width - layout.avatar.width - layout.playerCard.paddingH! * 2 - layout.playerCard.gap!,
            height: layout.playerCard.height - layout.playerCard.paddingV! * 2,
            paddingH: 12,
            paddingV: 12
        }
        layout.userName = {
            x: layout.playerInfo.x + layout.playerInfo.paddingH!,
            y: layout.playerInfo.y + layout.playerInfo.paddingV!,
            width: 360,
            height: 90
        }
        layout.flag = {
            x: layout.playerInfo.x + layout.playerInfo.paddingH!,
            y: layout.playerInfo.y + layout.playerInfo.height - layout.playerInfo.paddingV!,
            width: 72,
            height: 52
        }
        layout.scoreDetails = {
            x: layout.playerCard.x + layout.playerCard.width + layout.topBar.gap!,
            y: 0,
            width: layout.topBar.width - layout.playerCard.width - layout.topBar.paddingH! * 2 - layout.topBar.gap!,
            height: layout.topBar.height,
            gap: 0
        }
        layout.beatmap = {
            x: 0,
            y: layout.topBar.height,
            width: size.width,
            height: (size.height - 200) / 2,
            paddingH: 96,
            paddingV: 48,
            get gap() { return (this.height - this.paddingV! * 2 - 336) / 2 }
        }
        layout.beatmapDetails = {
            x: layout.beatmap.paddingH!,
            y: layout.beatmap.y + layout.beatmap.paddingV!,
            width: layout.beatmap.width - layout.beatmap.paddingH! * 2,
            height: 108
        }
        layout.beatmapState = {
            x: layout.beatmapDetails.x,
            y: layout.beatmapDetails.y,
            width: 108,
            height: 108
        }
        layout.beatmapStatsList = {
            x: layout.beatmapState.x + layout.beatmapState.width,
            get y() { return layout.beatmapDetails.y + (layout.beatmapDetails.height - this.height) / 2 },
            width: layout.beatmapDetails.width - layout.beatmapState.width,
            height: 80,
            gap: 12
        }
        layout.beatmapStatsItem = {
            x: 0,
            y: layout.beatmapStatsList.y,
            width: 0,
            height: layout.beatmapStatsList.height,
            paddingH: 18
        }
        layout.title = {
            x: layout.beatmap.paddingH!,
            y: layout.beatmapDetails.y + layout.beatmapDetails.height + layout.beatmap.gap!,
            width: layout.beatmap.width - layout.beatmap.paddingH! * 2,
            height: 120
        }
        layout.difficultyDetails = {
            x: layout.beatmap.paddingH!,
            y: layout.title.y + layout.title.height + layout.beatmap.gap!,
            width: layout.beatmap.width - layout.beatmap.paddingH! * 2,
            height: 108
        }
        layout.difficulty = {
            x: layout.beatmap.paddingH!,
            y: layout.difficultyDetails.y,
            width: 0,
            height: 108,
            paddingH: 36,
            gap: 18
        }
        layout.modList = {
            get x() { return layout.difficultyDetails.x + layout.difficultyDetails.width - layout.modList.width },
            get y() { return layout.difficultyDetails.y + (layout.difficultyDetails.height - this.height) / 2 },
            width: 1080,
            height: 80,
            gap: 0
        }
        layout.modItem = {
            x: 0,
            y: layout.modList.y,
            width: 144,
            height: 80,
        }
        layout.comment = {
            x: 0,
            y: layout.topBar.height + layout.beatmap.height,
            width: size.width,
            height: 200
        }
    }
    public draw(data: ScoreData) {
        const ctx = this._ctx
        const size = this._size
        const scale = this._scale
        const layout = this._layout
        const assets = this._assets
        const cursor = {
            x: 0,
            y: 0
        }
        ctx.clearRect(0, 0, size.width, size.height)
        ctx.fillStyle = 'hsl(0 0% 0%)'
        // bg
        if (!data.beatmap.background.src)
            data.beatmap.background = assets.defaults.background
        ctx.save()
        ctx.fillRect(cursor.x, cursor.y, size.width, size.height)
        ctx.filter = `blur(${30 * scale}px)`
        fillImg(ctx, data.beatmap.background, cursor.x - 30, cursor.y - 30, size.width + 60, size.height + 60)
        ctx.filter = 'blur(0)'
        ctx.fillStyle = 'hsl(0 0% 0% / 65%)'
        ctx.fillRect(cursor.x, cursor.y, size.width, size.height)
        ctx.restore()
        // top bar base
        ctx.save()
        ctx.beginPath()
        ctx.roundRect(cursor.x, cursor.y, layout.topBar.width, layout.topBar.height, [0, 0, 48, 48])
        ctx.shadowBlur = 30 * scale
        ctx.shadowOffsetY = 30 * scale
        ctx.shadowColor = 'hsl(0 0% 0% / 35%)'
        ctx.fill()
        ctx.clip()
        fillImg(ctx, data.beatmap.background, cursor.x - 50, cursor.y - 50, layout.topBar.width + 100, layout.topBar.height + 100)
        ctx.fillStyle = 'hsl(0 0% 0% / 35%)'
        ctx.fill()
        ctx.restore()
        // player card
        ctx.save()
        cursor.x = layout.playerCard.x
        cursor.y = layout.playerCard.y
        ctx.beginPath()
        ctx.roundRect(cursor.x, cursor.y, layout.playerCard.width, layout.playerCard.height, 48)
        ctx.clip()
        ctx.filter = `blur(${50 * scale}px)`
        cursor.x = 0
        cursor.y = 0
        fillImg(ctx, data.beatmap.background, cursor.x - 50, cursor.y - 50, layout.topBar.width + 100, layout.topBar.height + 100)
        ctx.beginPath()
        ctx.rect(cursor.x - 50, cursor.y - 50, layout.topBar.width + 100, layout.topBar.height + 100)
        ctx.fillStyle = 'hsl(0 0% 0% / 35%)'
        ctx.fill()
        ctx.filter = 'blur(0)'
        ctx.fill()
        ctx.restore()
        // avatar
        if (!data.user.avatar.src)
            data.user.avatar = assets.defaults.avatar
        ctx.save()
        cursor.x = layout.avatar.x
        cursor.y = layout.avatar.y
        ctx.beginPath()
        ctx.roundRect(cursor.x, cursor.y, layout.avatar.width, layout.avatar.height, 48)
        ctx.clip()
        fillImg(ctx, data.user.avatar, cursor.x, cursor.y, layout.avatar.width, layout.avatar.height)
        ctx.restore()
        // username
        ctx.save()
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'left'
        ctx.font = "700 72px 'Quicksand Variable'"
        ctx.fillStyle = 'hsl(0 0% 100%)'
        cursor.x = layout.userName.x
        cursor.y = layout.userName.y + layout.userName.height / 2 + 4
        ctx.fillText(shrinkText(ctx, data.user.userName, 360), cursor.x, cursor.y)
        ctx.restore()
        // flag
        if (!data.user.flag.src)
            data.user.flag = assets.defaults.flag
        cursor.x = layout.playerInfo.x + layout.playerInfo.paddingH!
        cursor.y = layout.playerInfo.y + layout.playerInfo.height - layout.playerInfo.paddingV! - 62
        ctx.drawImage(data.user.flag, cursor.x, cursor.y, 72, 72)
        // scoreDetails
        ctx.save()
        ctx.shadowBlur = 15 * scale
        ctx.shadowOffsetY = 15 * scale
        ctx.shadowColor = 'hsl(0 0% 0% / 35%)'
        ctx.textBaseline = 'middle'
        // pp & status
        const ppStr = data.score.pp.value + 'PP'
        const scoreStatusStr = data.score.status.type === 'miss' || data.score.status.type === 'sb' ? data.score.status.value + 'X' : data.score.status.type === 'fail' ? 'F' : data.score.status.type.toUpperCase()
        ctx.save()
        ctx.font = "700 192px 'Montserrat Variable'"
        cursor.y = layout.scoreDetails.y + layout.scoreDetails.height / 4 + 12
        if (data.score.pp.enabled) {
            cursor.x = layout.scoreDetails.x
            ctx.textAlign = 'left'
            ctx.fillStyle = 'hsl(48 100% 60%)'
            ctx.fillText(ppStr, cursor.x, cursor.y)
        }
        cursor.x = layout.scoreDetails.x + layout.scoreDetails.width
        ctx.textAlign = 'right'
        switch (data.score.status.type) {
            case 'ss':
                ctx.fillStyle = 'hsl(200 100% 85%)'
                break
            case 'fc':
                ctx.fillStyle = 'hsl(54 100% 60%)'
                break
            case 'fail':
                ctx.fillStyle = 'hsl(0 0% 75%)'
                break
            case 'miss':
                ctx.fillStyle = 'hsl(0 100% 60%)'
                break
            case 'sb':
                ctx.fillStyle = 'hsl(210 100% 60%)'
        }
        ctx.fillText(scoreStatusStr, cursor.x, cursor.y)
        ctx.restore()
        // rank & acc & cb
        const rankStr = data.score.rank.enabled ? '#' + data.score.rank.value : ''
        const accStr = data.score.accuracy + '%'
        const comboStr = data.score.maxCombo.value + 'x'
        ctx.save()
        ctx.font = "700 108px 'Montserrat Variable'"
        ctx.textAlign = 'left'
        ctx.fillStyle = 'hsl(0 0% 100%)'
        layout.scoreDetails.gap = data.score.rank.enabled ? (layout.scoreDetails.width - ctx.measureText(rankStr + accStr + comboStr).width) / 2 : layout.scoreDetails.width - ctx.measureText(accStr + comboStr).width
        cursor.x = layout.scoreDetails.x
        cursor.y = layout.scoreDetails.y + layout.scoreDetails.height * 3 / 4 + 8
        if (data.score.rank.enabled) {
            ctx.fillText(rankStr, cursor.x, cursor.y)
            cursor.x += ctx.measureText(rankStr).width + layout.scoreDetails.gap
        }
        ctx.fillText(accStr, cursor.x, cursor.y)
        cursor.x += ctx.measureText(accStr).width + layout.scoreDetails.gap
        if (data.score.maxCombo.perfect) ctx.fillStyle = 'hsl(96 100% 70%)'
        ctx.fillText(comboStr, cursor.x, cursor.y)
        ctx.restore()
        //
        ctx.restore()
        // beatmap state
        ctx.save()
        cursor.x = layout.beatmapState.x + layout.beatmapState.width / 2
        cursor.y = layout.beatmapState.y + layout.beatmapState.height / 2
        ctx.beginPath()
        ctx.ellipse(cursor.x, cursor.y, layout.beatmapState.width / 2, layout.beatmapState.height / 2, 0, 0, 360)
        switch (data.beatmap.state) {
            case 'ranked':
                ctx.fillStyle = 'hsl(190 85% 50%)'
                break
            case 'approved':
                ctx.fillStyle = 'hsl(90 80% 50%)'
                break
            case 'loved':
                ctx.fillStyle = 'hsl(330 85% 60%)'
                break
            case 'unranked':
                ctx.fillStyle = 'hsl(0 0% 65%)'
                break
            default:
                ctx.fillStyle = 'hsl(0 0% 65%)'
        }
        ctx.fill()
        ctx.restore()
        cursor.x = layout.beatmapState.x
        cursor.y = layout.beatmapState.y
        fillImg(ctx, assets.beatmapStateIcons[data.beatmap.state], cursor.x, cursor.y, layout.beatmapState.width, layout.beatmapState.height)
        // beatmap stats
        ctx.save()
        ctx.font = "700 48px 'Quicksand Variable'"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        cursor.x = layout.beatmapStatsList.x + layout.beatmapStatsList.width
        const beatmapStatsEnabled: { type: string, value: string }[] = []
        data.beatmap.stats.forEach((item) => {
            if (item.enabled)
                beatmapStatsEnabled.push({
                    type: item.type,
                    value: item.value
                })
        })
        beatmapStatsEnabled.reverse().forEach((item) => {
            const typeBoxWidth = ctx.measureText(item.type).width + layout.beatmapStatsItem.paddingH! * 2
            const valueBoxWidth = ctx.measureText(item.value).width + layout.beatmapStatsItem.paddingH! * 2
            layout.beatmapStatsItem.width = typeBoxWidth + valueBoxWidth
            cursor.x -= layout.beatmapStatsItem.width
            cursor.y = layout.beatmapStatsItem.y
            ctx.save()
            ctx.beginPath()
            ctx.roundRect(cursor.x, cursor.y, layout.beatmapStatsItem.width, layout.beatmapStatsItem.height, 24)
            ctx.clip()
            switch (item.type) {
                case 'time':
                    ctx.fillStyle = 'hsl(320 100% 65%)'
                    break
                case 'bpm':
                    ctx.fillStyle = 'hsl(280 100% 65%)'
                    break
                case 'ar':
                    ctx.fillStyle = 'hsl(0 100% 65%)'
                    break
                case 'cs':
                    ctx.fillStyle = 'hsl(90 70% 50%)'
                    break
                case 'od':
                    ctx.fillStyle = 'hsl(30 85% 40%)'
                    break
                case 'hp':
                    ctx.fillStyle = 'hsl(210 100% 65%)'
                    break
                default:
                    ctx.fillStyle = 'hsl(0 0% 65%)'
            }
            ctx.fillRect(cursor.x, cursor.y, layout.beatmapStatsItem.width, layout.beatmapStatsItem.height)
            ctx.fillStyle = 'hsl(0 0% 100%)'
            cursor.x += typeBoxWidth
            ctx.fillRect(cursor.x, layout.beatmapStatsItem.y, valueBoxWidth, layout.beatmapStatsItem.height)
            ctx.fillStyle = 'hsl(0 0% 100%)'
            cursor.x -= typeBoxWidth / 2
            cursor.y += layout.beatmapStatsItem.height / 2 + 4
            ctx.fillText(item.type, cursor.x, cursor.y)
            ctx.fillStyle = 'hsl(0 0% 0%)'
            cursor.x += typeBoxWidth / 2 + valueBoxWidth / 2
            ctx.fillText(item.value, cursor.x, cursor.y)
            ctx.restore()
            cursor.x -= -valueBoxWidth / 2 + layout.beatmapStatsItem.width + layout.beatmapStatsList.gap!
        }
        )
        ctx.restore()
        // title
        ctx.save()
        ctx.font = "700 96px 'Quicksand Variable', 'Noto Sans SC Variable', 'Noto Sans TC Variable', 'Noto Sans JP Variable', 'Noto Sans KR Variable'"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        cursor.x = layout.title.x + layout.title.width / 2
        cursor.y = layout.title.y + layout.title.height / 2 + 6
        ctx.fillStyle = 'hsl(0 0% 100%)'
        ctx.fillText(shrinkText(ctx, data.beatmap.title, layout.title.width), cursor.x, cursor.y)
        ctx.restore()
        // difficulty
        const diffColor = diffSpectrum(Number(data.beatmap.difficulty.star))
        const starStr = data.beatmap.difficulty.star + '*'
        let diffStr = data.beatmap.difficulty.name
        ctx.save()
        ctx.font = "700 64px 'Quicksand Variable'"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'left'
        if (ctx.measureText(starStr + diffStr).width > 564)
            diffStr = shrinkText(ctx, diffStr, 564 - ctx.measureText(starStr).width)
        layout.difficulty.width = ctx.measureText(starStr + diffStr).width + 18 + layout.difficulty.gap! * 2 + layout.difficulty.paddingH! * 2
        cursor.x = layout.difficulty.x
        cursor.y = layout.difficulty.y
        ctx.beginPath()
        ctx.roundRect(cursor.x, cursor.y, layout.difficulty.width, layout.difficulty.height, 54)
        ctx.fillStyle = diffColor.bg
        ctx.fill()
        ctx.fillStyle = diffColor.fg
        cursor.x += layout.difficulty.paddingH!
        cursor.y += layout.difficulty.height / 2 + 4
        ctx.fillText(starStr, cursor.x, cursor.y)
        cursor.x += ctx.measureText(starStr).width + layout.difficulty.gap!
        cursor.y -= 4
        ctx.beginPath()
        ctx.ellipse(cursor.x + 9, cursor.y, 9, 9, 0, 0, 360)
        ctx.fill()
        cursor.x += 18 + layout.difficulty.gap!
        cursor.y += 4
        ctx.fillText(diffStr, cursor.x, cursor.y)
        ctx.restore()
        // mods
        ctx.save()
        ctx.font = "700 54px 'Montserrat Variable'"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        const modList: string[] = []
        data.beatmap.mods.forEach((item) => {
            if (item.enabled)
                modList.push(item.type)
        })
        layout.modList.gap = modList.length > 7 ? (layout.modList.width - layout.modItem.width * modList.length) / (modList.length - 1) : 12
        cursor.x = layout.modList.x + layout.modList.width
        const drawModIcon = (mod: string) => {
            cursor.x -= layout.modItem.width
            cursor.y = layout.modItem.y
            ctx.beginPath()
            ctx.roundRect(cursor.x, cursor.y, layout.modItem.width, layout.modItem.height, layout.modItem.height / 2)
            switch (mod) {
                case 'nm':
                    ctx.fillStyle = 'hsl(0 0% 50%)'
                    break
                case 'ez':
                    ctx.fillStyle = 'hsl(70 100% 40%)'
                    break
                case 'nf':
                    ctx.fillStyle = 'hsl(230 40% 50%)'
                    break
                case 'ht':
                    ctx.fillStyle = 'hsl(270 40% 50%)'
                    break
                case 'hd':
                    ctx.fillStyle = 'hsl(40 100% 50%)'
                    break
                case 'hr':
                    ctx.fillStyle = 'hsl(340 100% 55%)'
                    break
                case 'dt':
                    ctx.fillStyle = 'hsl(270 100% 60%)'
                    break
                case 'nc':
                    ctx.fillStyle = 'hsl(260 100% 60%)'
                    break
                case 'fl':
                    ctx.fillStyle = 'hsl(0 0% 15%)'
                    break
                case 'sd':
                case 'pf':
                    ctx.fillStyle = 'hsl(30 80% 50%)'
                    break
                case 'rx':
                    ctx.fillStyle = 'hsl(200 100% 60%)'
                    break
                case 'ap':
                    ctx.fillStyle = 'hsl(220 100% 60%)'
                    break
                case 'so':
                    ctx.fillStyle = 'hsl(330 100% 60%)'
                    break
                case 'v2':
                    ctx.fillStyle = 'hsl(0 0% 100%)'
                    break
                default:
                    ctx.fillStyle = 'hsl(0 0% 50%)'
            }
            ctx.fill()
            if (mod === 'v2')
                ctx.fillStyle = 'hsl(0 0% 0%)'
            else
                ctx.fillStyle = 'hsl(0 0% 100%)'
            cursor.x += layout.modItem.width / 2
            cursor.y += layout.modItem.height / 2 + 4
            ctx.fillText(mod.toUpperCase(), cursor.x, cursor.y)
            cursor.x -= layout.modItem.width / 2 + layout.modList.gap!
        }
        if (modList.length === 0)
            drawModIcon('nm')
        else modList.reverse().forEach((item) => drawModIcon(item))
        // comment
        ctx.save()
        ctx.font = "400 72px 'Noto Sans SC Variable', 'Noto Sans TC Variable', 'Noto Sans JP Variable', 'Noto Sans KR Variable'"
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        cursor.x = layout.comment.width / 2
        cursor.y = layout.comment.y + layout.comment.height / 2
        ctx.fillStyle = 'hsl(0 0% 100%)'
        ctx.fillText(shrinkText(ctx, data.comment, size.width), cursor.x, cursor.y)
        ctx.restore()
    }
}