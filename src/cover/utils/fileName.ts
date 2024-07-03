import CoverData from "../CoverData"
import RenderOptions from "../RenderOptions"

export default (data: CoverData, options: RenderOptions) => {
    const username = data.user.userName
    const beatmapTitle = '-' + data.beatmap.title
    const diffName = '[' + data.beatmap.difficulty.name + ']'
    const mods = () => {
        let str = ''
        const modsKeys = Object.keys(data.beatmap.mods)
        modsKeys.forEach((key) => {
            const item = data.beatmap.mods[key as keyof typeof data.beatmap.mods]
            if (item.enabled)
                str += key.toUpperCase()
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
    return username + beatmapTitle + diffName + mods() + scoreStatus + accuracy + pp() + '-' + options.ratio + '-' + options.scale + 'x'
}