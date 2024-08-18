import CoverData from "../CoverData"
import CoverAssets from "../CoverAssets"
import loadImgUrl from "../../utils/loadImgUrl"

export default async (data: CoverData, assets: CoverAssets, uid: string) => {
    const url = 'https://sp.365246692.xyz/api/yasunaori/user?uid='
    try {
        const res = await fetch(url + uid)
        if (!res.ok) {
            throw new Error('Response status: ' + res.status)
        }
        const json = await res.json()
        if (json.error)
            console.log(json.error)
        else {
            console.log(json)
            data.user.userName = json.username
            data.user.code = json.country_code
            data.user.globalRank = json.global_rank.toString()
            data.user.countryRank = json.country_rank.toString()
            assets.user.avatar = await loadImgUrl(json.avatar_url)
        }
    } catch (err) {
        console.log(err)
    }
}