export default interface CoverData {
    user: {
        id: number
        userName: string
        code: string
        globalRank: number
        countryRank: number
    }
    score: {
        pp: number
        status: {
            type: 'ss' | 'fc' | 'fail' | 'miss' | 'sb'
            value: number
        }
        rank: number
        accuracy: number
        maxCombo: {
            value: number
            perfect: boolean
        }
    }
    beatmap: {
        id: number
        title: string
        artist: string
        creator: string
        mode: 'osu' | 'taiko' | 'fruits' | 'mania'
        converted: boolean,
        status: 'ranked' | 'approved' | 'loved' | 'unranked'
        stats: Record<'time' | 'bpm' | 'ar' | 'cs' | 'od' | 'hp', string | number>
        difficulty: {
            star: number
            name: string
        }
        mods: Record<'ez' | 'nf' | 'ht' | 'hd' | 'hr' | 'dt' | 'nc' | 'fl' | 'sd' | 'pf' | 'rx' | 'ap' | 'so' | 'cp' | 'mr' | 'rd' | 'v2', {
            mode: ('osu' | 'taiko' | 'fruits' | 'mania')[]
            enabled: boolean
        }>
        keys: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 // for mania xK mod. 0 = no change
    }
    comment: string
}