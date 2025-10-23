import { type Beatmap, newBeatmap } from './Beatmap'
import { type User, newUser } from './User'

export enum ScoreGrade {
    F = -1,
    D,
    C,
    B,
    A,
    S,
    SH,
    X,
    XH
}

export interface Score {
    user: User
    beatmap: Beatmap
    grade: ScoreGrade
    pp: number
    bestId: number | null
    rank: number | null
    missCount: number
    sliderBreakCount: number
    accuracy: number
    maxCombo: number
    isPerfectCombo: boolean
    passed: boolean
    setOnLazer: boolean
}

export function newScore(): Score {
    return {
        user: newUser(),
        beatmap: newBeatmap(),
        grade: 3,
        pp: 0,
        bestId: null,
        rank: null,
        missCount: 0,
        sliderBreakCount: 0,
        accuracy: 0,
        maxCombo: 0,
        isPerfectCombo: false,
        passed: true,
        setOnLazer: false
    }
}