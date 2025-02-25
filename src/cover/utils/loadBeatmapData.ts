import type CoverData from '../CoverData'

export default async (bid: number, mods: CoverData['beatmap']['mods'], unicode: boolean) => {
    if (!bid || bid === 0) return
    const url = 'https://sp.365246692.xyz/api/yasunaori/beatmap/'
    // const url = 'api/yasunaori/beatmap/' // dev proxy
    let modOption = '?mods='
    const modsKeys = Object.keys(mods)
    modsKeys.forEach((key) => {
        const item = mods[key as keyof typeof mods]
        if (item.enabled) {
            modOption += key
        }
    })
    const time = (length: number) => {
        const min = Math.floor(length / 60)
        const sec = length % 60
        return min + ':' + (sec < 10 ? '0' + sec : sec)
    }
    try {
        const res = await fetch(url + bid + modOption)
        if (!res.ok)
            throw new Error('Response status: ' + res.status)
        else {
            const json = await res.json()
            if (json.error)
                throw new Error(json.error)
            else {
                const beatmap: Partial<CoverData['beatmap']> = {
                    title: unicode ? json.title_unicode : json.title,
                    artist: unicode ? json.artist_unicode : json.artist,
                    creator: json.creator,
                    mode: json.mode as CoverData['beatmap']['mode'],
                    status: json.status === 'graveyard' || json.status === 'wip' || json.status === 'pending' ? 'unranked' :
                        json.status === 'approved' || json.status === 'qualified' ? 'approved' :
                            json.status,
                    stats: {
                        time: time(json.stats.length),
                        bpm: json.stats.bpm,
                        ar: json.stats.ar,
                        cs: json.stats.cs,
                        od: json.stats.od,
                        hp: json.stats.hp
                    },
                    difficulty: {
                        star: json.difficulty.star.toFixed(2),
                        name: json.difficulty.name
                    }
                }
                return {
                    beatmap,
                    backgroundUrl: json.cover_url as string
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}