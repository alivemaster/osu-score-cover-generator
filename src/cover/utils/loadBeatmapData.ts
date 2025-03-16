import type CoverData from '../CoverData'

const time = (length: number) => {
    const min = Math.floor(length / 60)
    const sec = length % 60
    return min + ':' + (sec < 10 ? '0' + sec : sec)
}

export default async (bid: number, converted: number, mods: CoverData['beatmap']['mods'], unicode: boolean) => {
    if (!bid || bid === 0) return
    const api = 'https://api.alivem.top/osu'
    // const api = 'http://localhost:7271/osu'
    const path = '/beatmaps/' + bid
    let query = ''
    if (converted > 0) {
        query = `?mode=${converted}&mods=`
    } else {
        query = '?mods='
    }
    const modsKeys = Object.keys(mods)
    modsKeys.forEach((key) => {
        const item = mods[key as keyof typeof mods]
        if (item.enabled) {
            query += key
        }
    })

    try {
        const res = await fetch(api + path + query)
        if (!res.ok)
            throw new Error('Response status: ' + res.status)
        else {
            const json = await res.json()
            if (json.error)
                throw new Error(json.error)
            else {
                const beatmap: Partial<CoverData['beatmap']> = {
                    id: json.id,
                    title: unicode ? json.beatmapset.title_unicode : json.beatmapset.title,
                    artist: unicode ? json.beatmapset.artist_unicode : json.beatmapset.artist,
                    creator: json.creator,
                    mode: json.mode === 0 ? 'osu' : json.mode === 1 ? 'taiko' : json.mode === 2 ? 'fruits' : 'mania',
                    converted: json.convert,
                    status: json.status === 4 ? 'loved' : json.status > 1 ? 'approved' : json.status < 1 ? 'unranked' : 'ranked',
                    stats: {
                        time: time(json.hit_length),
                        bpm: parseFloat(json.bpm.toFixed(2)),
                        ar: parseFloat(json.ar.toFixed(2)),
                        cs: parseFloat(json.cs.toFixed(2)),
                        od: parseFloat(json.accuracy.toFixed(2)),
                        hp: parseFloat(json.drain.toFixed(2))
                    },
                    difficulty: {
                        star: json.difficulty_rating.toFixed(2),
                        name: json.version
                    }
                }
                return {
                    beatmap,
                    backgroundUrl: 'https://catboy.best/preview/background/' + bid
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}