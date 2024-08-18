export default interface CoverData {
    user: {
        id: string
        userName: string
        code: string
        globalRank: string
        countryRank: string
    }
    score: {
        pp: string
        status: {
            type: 'ss' | 'fc' | 'fail' | 'miss' | 'sb'
            value: string
        }
        rank: string
        accuracy: string
        maxCombo: {
            value: string
            perfect: boolean
        }
    }
    beatmap: {
        id: string
        title: string
        artist: string
        creator: string
        mode: 'osu' | 'taiko' | 'fruits' | 'mania'
        status: 'ranked' | 'approved' | 'loved' | 'unranked'
        stats: Record<'time' | 'bpm' | 'ar' | 'cs' | 'od' | 'hp', string>
        difficulty: {
            star: string
            name: string
        }
        mods: Record<'ez' | 'nf' | 'ht' | 'hd' | 'hr' | 'dt' | 'nc' | 'fl' | 'sd' | 'pf' | 'rx' | 'ap' | 'so' | 'v2', { enabled: boolean }>
    }
    comment: string
}