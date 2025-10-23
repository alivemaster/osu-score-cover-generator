import { type GameMode } from './Beatmap'

export interface Team {
    id: number
    flagUrl: string | null
    name: string
    shortName: string
}

export interface User {
    userId: number,
    userName: string
    countryCode: string | null
    team: Team | null
    mode: GameMode
    pp: number | null
    globalRank: number | null
    countryRank: number | null
}

export function newTeam(): Team {
    return {
        id: 0,
        flagUrl: null,
        name: 'Team',
        shortName: 'TM'
    }
}

export function newUser(): User {
    return {
        userId: 0,
        userName: 'Player',
        countryCode: null,
        team: newTeam(),
        mode: 0,
        pp: null,
        globalRank: null,
        countryRank: null
    }
}