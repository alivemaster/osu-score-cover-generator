import type CoverData from '../CoverData'

const time = (length: number) => {
    const min = Math.floor(length / 60)
    const sec = length % 60
    return min + ':' + (sec < 10 ? '0' + sec : sec)
}

export default async (sid: number, unicode: boolean) => {
    if (!sid || sid === 0) return
    const api = 'https://api.alivem.top/osu'
    // const api = 'http://localhost:7271/osu' 
    const path = '/scores/' + sid

    try {
        const res = await fetch(api + path)
        if (!res.ok) {
            throw new Error('Response status: ' + res.status)
        }
        const json = await res.json()
        if (json.error)
            throw new Error(json.error)
        else {
            const mods: CoverData['beatmap']['mods'] = {
                ez: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                },
                nf: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                },
                ht: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                },
                hd: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                },
                hr: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                },
                dt: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                },
                nc: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                },
                fl: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                },
                sd: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                },
                pf: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                },
                rx: {
                    mode: ['osu', 'taiko', 'fruits'],
                    enabled: false
                },
                ap:
                {
                    mode: ['osu'],
                    enabled: false
                },
                so: {
                    mode: ['osu'],
                    enabled: false
                },
                cp: {
                    mode: ['mania'],
                    enabled: false
                },
                mr: {
                    mode: ['mania'],
                    enabled: false
                },
                rd: {
                    mode: ['mania'],
                    enabled: false
                },
                v2: {
                    mode: ['osu', 'taiko', 'fruits', 'mania'],
                    enabled: false
                }
            }
            const modsKeys = Object.keys(mods)
            modsKeys.forEach((key) => {
                json.mods.forEach((item: {acronym: string}) => {
                    if (item.acronym.toLowerCase() === key)
                        mods[key as keyof typeof mods].enabled = true
                })
            })
            const beatmap: Partial<CoverData['beatmap']> = {
                id: json.beatmap_id,
                title: unicode ? json.beatmapset.title_unicode : json.beatmapset.title,
                artist: unicode ? json.beatmapset.artist_unicode : json.beatmapset.artist,
                creator: json.creator,
                mode: json.beatmap.mode === 0 ? 'osu' : json.beatmap.mode === 1 ? 'taiko' : json.beatmap.mode === 2 ? 'fruits' : 'mania',
                converted: json.beatmap.convert,
                mods: mods,
                status: json.beatmap.status === 4 ? 'loved' : json.beatmap.status > 1 ? 'approved' : json.beatmap.status < 1 ? 'unranked' : 'ranked',
                stats: {
                    time: time(json.beatmap.hit_length),
                    bpm: parseFloat(json.beatmap.bpm.toFixed(2)),
                    ar: parseFloat(json.beatmap.ar.toFixed(2)),
                    cs: parseFloat(json.beatmap.cs.toFixed(2)),
                    od: parseFloat(json.beatmap.accuracy.toFixed(2)),
                    hp: parseFloat(json.beatmap.drain.toFixed(2))
                },
                difficulty: {
                    star: json.beatmap.difficulty_rating.toFixed(2),
                    name: json.beatmap.version
                }
            }
            const user: CoverData['user'] = {
                id: json.user.id,
                userName: json.user.username,
                code: json.user.country_code,
                globalRank: json.user.global_rank,
                countryRank: json.user.country_rank
            }
            const scoreStatus: CoverData['score']['status'] = {
                type: 'fc',
                value: 0
            }
            if (Number(json.accuracy === 100))
                scoreStatus.type = 'ss'
            if (!json.passed)
                scoreStatus.type = 'fail'
            if (json.statistics.miss > 0) {
                scoreStatus.type = 'miss'
                scoreStatus.value = json.statistics.miss
            }
            const score: CoverData['score'] = {
                pp: json.pp ? parseInt(json.pp) : 0,
                status: scoreStatus,
                rank: json.rank_global ? json.rank_global : 0,
                accuracy: Number((parseFloat(json.accuracy) * 100).toFixed(2)),
                maxCombo: {
                    value: json.max_combo,
                    perfect: json.is_perfect_combo
                }
            }
            return {
                data: {
                    beatmap,
                    user,
                    score
                },
                backgroundUrl: 'https://catboy.best/preview/background/' + json.beatmap_id,
                avatarUrl: api + json.user.avatar_url
            }
        }
    } catch (err) {
        console.log(err)
    }
}