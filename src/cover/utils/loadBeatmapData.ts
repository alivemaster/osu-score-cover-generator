import CoverData from "../CoverData"
import CoverAssets from "../CoverAssets"
import loadImgUrl from "../../utils/loadImgUrl"

export default async (data: CoverData, assets: CoverAssets, bid: string, unicode: boolean) => {
    const url = 'https://sp.365246692.xyz/api/yasunaori/beatmap/'
    let modOption = '?mods='
    const modsKeys = Object.keys(data.beatmap.mods)
    modsKeys.forEach((key) => {
        const item = data.beatmap.mods[key as keyof typeof data.beatmap.mods]
        if (item.enabled)
            modOption += key
    })
    const time = (length: string) => {
        const num = Number(length)
        const min = Math.floor(num / 60)
        const sec = num % 60
        return min + ':' + (sec < 10 ? '0' + sec : sec)
    }
    try {
        const res = await fetch(url + bid + modOption)
        if (!res.ok) {
            throw new Error('Response status: ' + res.status)
        }
        const json = await res.json()
        if (json.error)
            console.log(json.error)
        else {
            data.beatmap.title = unicode ? json.title_unicode : json.title
            data.beatmap.artist = unicode ? json.artist_unicode : json.artist
            data.beatmap.creator = json.creator
            data.beatmap.mode = json.mode as typeof data.beatmap.mode
            if (json.status === 'graveyard' || json.status === 'wip' || json.status === 'pending')
                data.beatmap.status = 'unranked'
            else if (json.status === 'approved' || json.status === 'qualified')
                data.beatmap.status = 'approved'
            else
                data.beatmap.status = json.status
            data.beatmap.stats.time.value = time(json.stats.length)
            data.beatmap.stats.bpm.value = json.stats.bpm
            data.beatmap.stats.ar.value = json.stats.ar
            data.beatmap.stats.cs.value = json.stats.cs
            data.beatmap.stats.od.value = json.stats.od
            data.beatmap.stats.hp.value = json.stats.hp
            data.beatmap.difficulty.star = json.difficulty.star.toFixed(2).toString()
            data.beatmap.difficulty.name = json.difficulty.name
            assets.beatmap.background = await loadImgUrl(json.cover_url)
        }
    } catch (err) {
        console.log(err)
    }
}