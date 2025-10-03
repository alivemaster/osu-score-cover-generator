export enum Status {
    Graveyard = -2,
    Wip,
    Pending,
    Ranked,
    Approved,
    Qualified,
    Loved
}

export interface Difficulty {
    rating: number
    name: string
}

export enum Mode {
    Osu = 0,
    Taiko,
    Fruits,
    Mania
}

export interface Mod<
    M extends ReadonlyArray<Mode>
> {
    modes: M
    enabled: boolean
}

export interface Mods {
    ez: Mod<readonly [0, 1, 2, 3]>,
    nf: Mod<readonly [0, 1, 2, 3]>,
    ht: Mod<readonly [0, 1, 2, 3]>,
    hd: Mod<readonly [0, 1, 2, 3]>,
    hr: Mod<readonly [0, 1, 2, 3]>,
    dt: Mod<readonly [0, 1, 2, 3]>,
    nc: Mod<readonly [0, 1, 2, 3]>,
    fl: Mod<readonly [0, 1, 2, 3]>,
    sd: Mod<readonly [0, 1, 2, 3]>,
    pf: Mod<readonly [0, 1, 2, 3]>,
    rx: Mod<readonly [0, 1, 2]>,
    ap: Mod<readonly [0]>,
    so: Mod<readonly [0]>,
    fi: Mod<readonly [3]>,
    cp: Mod<readonly [3]>,
    mr: Mod<readonly [3]>,
    rd: Mod<readonly [3]>,
    xk: Mod<readonly [3]> & {
        keys: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    },
    v2: Mod<readonly [0, 1, 2, 3]>
}

export interface DifficultyAttribute<
    M extends ReadonlyArray<Mode>
> {
    modes: M
    value: number
}

export interface DifficultyAttributes {
    ar: DifficultyAttribute<readonly [0, 2]>,
    cs: DifficultyAttribute<readonly [0, 2]>,
    od: DifficultyAttribute<readonly [0, 1, 2, 3]>,
    hp: DifficultyAttribute<readonly [0, 1, 2, 3]>,
}

export interface Beatmap {
    title: string
    status: Status
    difficulty: Difficulty
    mode: Mode
    bpm: number
    length: number
    attrs: DifficultyAttributes
    mods: Mods
}

export function newBeatmap(): Beatmap {
    return {
        title: 'Song Title',
        status: 1,
        difficulty: {
            rating: 0,
            name: 'Easy'
        },
        mode: 0,
        bpm: 0,
        length: 0,
        attrs: {
            ar: {
                modes: [0, 2],
                value: 0
            },
            cs: {
                modes: [0, 2],
                value: 0
            },
            od: {
                modes: [0, 1, 2, 3],
                value: 0
            },
            hp: {
                modes: [0, 1, 2, 3],
                value: 0
            }
        },
        mods: {
            ez: {
                modes: [0, 1, 2, 3],
                enabled: false
            },
            nf: {
                modes: [0, 1, 2, 3],
                enabled: false
            },
            ht: {
                modes: [0, 1, 2, 3],
                enabled: false
            },
            hd: {
                modes: [0, 1, 2, 3],
                enabled: false
            },
            hr: {
                modes: [0, 1, 2, 3],
                enabled: false
            },
            dt: {
                modes: [0, 1, 2, 3],
                enabled: false
            },
            nc: {
                modes: [0, 1, 2, 3],
                enabled: false
            },
            fl: {
                modes: [0, 1, 2, 3],
                enabled: false
            },
            sd: {
                modes: [0, 1, 2, 3],
                enabled: false
            },
            pf: {
                modes: [0, 1, 2, 3],
                enabled: false
            },
            rx: {
                modes: [0, 1, 2],
                enabled: false
            },
            ap: {
                modes: [0],
                enabled: false
            },
            so: {
                modes: [0],
                enabled: false
            },
            fi: {
                modes: [3],
                enabled: false
            },
            cp: {
                modes: [3],
                enabled: false
            },
            mr: {
                modes: [3],
                enabled: false
            },
            rd: {
                modes: [3],
                enabled: false
            },
            xk: {
                modes: [3],
                enabled: false,
                keys: 4
            },
            v2: {
                modes: [0, 1, 2, 3],
                enabled: false
            }
        }
    }
}