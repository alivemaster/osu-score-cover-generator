import type CoverAssets from "../CoverAssets"
import loadImgUrl from "../../utils/loadImgUrl"
import beatmapStatusIconRanked from "../../assets/cover/beatmap-status-icons/ranked.svg"
import beatmapStatusIconApproved from "../../assets/cover/beatmap-status-icons/approved.svg"
import beatmapStatusIconLoved from "../../assets/cover/beatmap-status-icons/loved.svg"
import beatmapStatusIconUnranked from "../../assets/cover/beatmap-status-icons/unranked.svg"
import beatmapModeIconOsu from "../../assets/cover/beatmap-mode-icons/osu.svg"
import beatmapModeIconFruits from "../../assets/cover/beatmap-mode-icons/fruits.svg"
import beatmapModeIconTaiko from "../../assets/cover/beatmap-mode-icons/taiko.svg"
import beatmapModeIconMania from "../../assets/cover/beatmap-mode-icons/mania.svg"
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
    // beatmap status icons
    assets.beatmap.statusIcons.ranked = await loadImgUrl(beatmapStatusIconRanked)
    assets.beatmap.statusIcons.approved = await loadImgUrl(beatmapStatusIconApproved)
    assets.beatmap.statusIcons.loved = await loadImgUrl(beatmapStatusIconLoved)
    assets.beatmap.statusIcons.unranked = await loadImgUrl(beatmapStatusIconUnranked)
    // beatmap mode icons
    assets.beatmap.modeIcons.osu = await loadImgUrl(beatmapModeIconOsu)
    assets.beatmap.modeIcons.fruits = await loadImgUrl(beatmapModeIconFruits)
    assets.beatmap.modeIcons.taiko = await loadImgUrl(beatmapModeIconTaiko)
    assets.beatmap.modeIcons.mania = await loadImgUrl(beatmapModeIconMania)
}