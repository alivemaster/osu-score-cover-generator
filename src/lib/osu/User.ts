export interface User {
    userName: string
    countryCode: string | null
    pp: number | null
}

export function newUser(): User {
    return {
        userName: 'Player',
        countryCode: null,
        pp: 0
    }
}