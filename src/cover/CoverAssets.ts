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
        stateIcons: {
            ranked: HTMLImageElement
            approved: HTMLImageElement
            loved: HTMLImageElement
            unranked: HTMLImageElement
        }
        defaults: {
            background: HTMLImageElement
        }
    }
}