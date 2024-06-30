export default interface CoverData {
    user: {
        userName: string
        code: string
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
        title: string
        state: 'ranked' | 'approved' | 'loved' | 'unranked'
        stats: Record<'time' | 'bpm' | 'ar' | 'cs' | 'od' | 'hp', { enabled: boolean, value: string }>
        difficulty: {
            star: string
            name: string
        }
        mods: Record<'ez' | 'nf' | 'ht' | 'hd' | 'hr' | 'dt' | 'nc' | 'fl' | 'sd' | 'pf' | 'rx' | 'ap' | 'so' | 'v2', { enabled: boolean }>
    }
    comment: string
}