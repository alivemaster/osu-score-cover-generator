import CoverData from "../CoverData"

export default async (uid: string) => {
    if (!uid || uid === '0') return
    const url = 'https://sp.365246692.xyz/api/yasunaori/user?uid='
    // const url = 'api/yasunaori/user?uid=' // dev proxy
    try {
        const res = await fetch(url + uid)
        if (!res.ok) {
            throw new Error('Response status: ' + res.status)
        }
        const json = await res.json()
        if (json.error)
            throw new Error(json.error)
        else {
            const user: Partial<CoverData["user"]> = {
                userName: json.username,
                code: json.country_code,
                globalRank: json.global_rank.toString(),
                countryRank: json.country_rank.toString()
            }
            return {
                user,
                avatarUrl: json.avatar_url as string
            }
        }
    } catch (err) {
        console.log(err)
    }
}