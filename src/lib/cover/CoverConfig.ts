import { type DifficultyAttributes, type Score, newScore } from '@/lib/osu'

export enum CoverTheme {
    Classic = 0,
    Ambient,
    Laser,
    Sweet
}

export enum AspectRatio {
    W16H9 = 0,
    W16H10,
    W4H3
}

export interface CoverRenderOptions {
    aspectRatio: AspectRatio
    scaleFactor: number
}

export interface CoverDisplayOptions {
    beatmap: {
        time: boolean
        bpm: boolean
        difficultyAttrs: Record<keyof DifficultyAttributes, boolean>
    }
    score: {
        pp: boolean
        rank: boolean
    }
    user: {
        countryFlag: boolean
        teamFlag: boolean
        pp: boolean,
        rank: boolean,
        cover: boolean
    }
}

export interface CoverConfig {
    score: Score
    options: {
        render: CoverRenderOptions
        display: CoverDisplayOptions
    }
    comment: string
}

export function newCoverConfig(): CoverConfig {
    return {
        score: newScore(),
        options: {
            render: {
                aspectRatio: 1,
                scaleFactor: 1
            },
            display: {
                beatmap: {
                    time: false,
                    bpm: false,
                    difficultyAttrs: {
                        ar: true,
                        cs: true,
                        od: false,
                        hp: false
                    }
                },
                score: {
                    pp: true,
                    rank: true
                },
                user: {
                    countryFlag: true,
                    teamFlag: true,
                    pp: true,
                    rank: true,
                    cover: false
                }
            }
        },
        comment: 'Comment'
    }
}
