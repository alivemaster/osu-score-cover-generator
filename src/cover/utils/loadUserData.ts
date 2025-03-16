import type CoverData from '../CoverData'

export default async (uid: number) => {
    if (!uid || uid === 0) return
    const api = 'https://api.alivem.top/osu'
    // const api = 'http://localhost:7271/osu' 
    const path = '/users/' + uid
    try {
        const res = await fetch(api + path)
        if (!res.ok) {
            throw new Error('Response status: ' + res.status)
        }
        const json = await res.json()
        if (json.error)
            throw new Error(json.error)
        else {
            const user: CoverData['user'] = {
                id: json.id,
                userName: json.username,
                code: json.country_code,
                globalRank: json.global_rank,
                countryRank: json.country_rank
            }
            return {
                user,
                avatarUrl: api + json.avatar_url
            }
        }
    } catch (err) {
        console.log(err)
    }
}