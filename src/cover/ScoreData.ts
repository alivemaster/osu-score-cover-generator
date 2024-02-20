export default interface ScoreData {
    user: {
        avatar: HTMLImageElement
        userName: string
        flag: HTMLImageElement
    }
    score: {
        pp: {
            value: string
            enabled: boolean
        }
        status: {
            type: 'ss' | 'fc' | 'fail' | 'miss' | 'sb'
            value: string
        }
        rank: {
            value: string
            enabled: boolean
        }
        accuracy: string
        maxCombo: {
            value: string
            perfect: boolean
        }
    }
    beatmap: {
        background: HTMLImageElement
        title: string
        state: 'ranked' | 'approved' | 'loved' | 'unranked'
        stats: [
            {
                type: 'time'
                value: string
                enabled: boolean
            },
            {
                type: 'bpm'
                value: string
                enabled: boolean
            },
            {
                type: 'ar'
                value: string
                enabled: boolean
            },
            {
                type: 'cs'
                value: string
                enabled: boolean
            },
            {
                type: 'od'
                value: string
                enabled: boolean
            },
            {
                type: 'hp'
                value: string
                enabled: boolean
            },
        ]
        difficulty: {
            star: string
            name: string
        }
        mods: [
            {
                type: 'ez'
                enabled: boolean
            },
            {
                type: 'nf'
                enabled: boolean
            },
            {
                type: 'ht'
                enabled: boolean
            },
            {
                type: 'hd'
                enabled: boolean
            },
            {
                type: 'hr'
                enabled: boolean
            },
            {
                type: 'dt'
                enabled: boolean
            },
            {
                type: 'nc'
                enabled: boolean
            },
            {
                type: 'fl'
                enabled: boolean
            },
            {
                type: 'sd'
                enabled: boolean
            },
            {
                type: 'pf'
                enabled: boolean
            },
            {
                type: 'rx'
                enabled: boolean
            },
            {
                type: 'ap'
                enabled: boolean
            },
            {
                type: 'so'
                enabled: boolean
            },
            {
                type: 'v2'
                enabled: boolean
            },
        ]
    }
    comment: string
}