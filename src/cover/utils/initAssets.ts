import CoverAssets from "../CoverAssets"
import loadImgUrl from "../../utils/loadImgUrl"
import rankedIcon from "../../assets/cover/beatmapstate-icons/ranked.svg"
import approvedIcon from "../../assets/cover/beatmapstate-icons/approved.svg"
import lovedIcon from "../../assets/cover/beatmapstate-icons/loved.svg"
import unrankedIcon from "../../assets/cover/beatmapstate-icons/unranked.svg"
import defaultBackground from "../../assets/cover/defaults/background.png"
import defaultAvatar from "../../assets/cover/defaults/avatar.png"
import defaultFlag from "../../assets/cover/defaults/flag.svg"

export default async (assets: CoverAssets) => {
    // fonts
    const fonts = [
        "0px 'Montserrat Variable'",
        "0px 'Quicksand Variable'",
        "0px 'Noto Sans SC Variable', 'Noto Sans TC Variable', 'Noto Sans JP Variable', 'Noto Sans KR Variable'"
    ]
    fonts.forEach(async (font) => {
        try {
            await document.fonts.load(font)
        } catch (err) {
            console.log(`${font} failed to load! ${err}`)
        }
    })
    // default imgs
    assets.user.defaults.avatar = await loadImgUrl(defaultAvatar)
    assets.user.defaults.flag = await loadImgUrl(defaultFlag)
    assets.beatmap.defaults.background = await loadImgUrl(defaultBackground)
    // beatmap state icons
    assets.beatmap.stateIcons.ranked = await loadImgUrl(rankedIcon)
    assets.beatmap.stateIcons.approved = await loadImgUrl(approvedIcon)
    assets.beatmap.stateIcons.loved = await loadImgUrl(lovedIcon)
    assets.beatmap.stateIcons.unranked = await loadImgUrl(unrankedIcon)
}