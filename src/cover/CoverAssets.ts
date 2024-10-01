export default interface CoverAssets {
    user: {
        avatar: HTMLImageElement
        flag: HTMLImageElement
        defaults: {
            avatar: HTMLImageElement
            flag: HTMLImageElement
        }
    }
    beatmap: {
        background: HTMLImageElement
        statusIcons: {
            ranked: HTMLImageElement
            approved: HTMLImageElement
            loved: HTMLImageElement
            unranked: HTMLImageElement
        }
        modeIcons: {
            osu: HTMLImageElement
            fruits: HTMLImageElement
            taiko: HTMLImageElement
            mania: HTMLImageElement
        }
        defaults: {
            background: HTMLImageElement
        }
    }
}