export enum BeatmapRankStatus {
    Graveyard = -2,
    Wip,
    Pending,
    Ranked,
    Approved,
    Qualified,
    Loved
}

export interface BeatmapDifficulty {
    rating: number
    name: string
}

export enum GameMode {
    Osu = 0,
    Taiko,
    Fruits,
    Mania
}

export interface GameMod<
    M extends ReadonlyArray<GameMode>
> {
    modes: M
    enabled: boolean
}

export interface GameMods {
    ez: GameMod<readonly [0, 1, 2, 3]>,
    nf: GameMod<readonly [0, 1, 2, 3]>,
    ht: GameMod<readonly [0, 1, 2, 3]>,
    hd: GameMod<readonly [0, 1, 2, 3]>,
    hr: GameMod<readonly [0, 1, 2, 3]>,
    dt: GameMod<readonly [0, 1, 2, 3]>,
    nc: GameMod<readonly [0, 1, 2, 3]>,
    fl: GameMod<readonly [0, 1, 2, 3]>,
    sd: GameMod<readonly [0, 1, 2, 3]>,
    pf: GameMod<readonly [0, 1, 2, 3]>,
    rx: GameMod<readonly [0, 1, 2]>,
    ap: GameMod<readonly [0]>,
    so: GameMod<readonly [0]>,
    fi: GameMod<readonly [3]>,
    cp: GameMod<readonly [3]>,
    mr: GameMod<readonly [3]>,
    rd: GameMod<readonly [3]>,
    xk: GameMod<readonly [3]> & {
        keys: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    },
    v2: GameMod<readonly [0, 1, 2, 3]>
}

export interface DifficultyAttribute<
    M extends ReadonlyArray<GameMode>
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
    mapId: number,
    setId: number,
    creatorId: number,
    artist: string,
    artistUnicode: string,
    title: string
    titleUnicode: string
    status: BeatmapRankStatus
    difficulty: BeatmapDifficulty
    mode: GameMode
    convert: boolean,
    bpm: number
    length: number
    attrs: DifficultyAttributes
    mods: GameMods
}

export function newBeatmap(): Beatmap {
    return {
        mapId: 0,
        setId: 0,
        creatorId: 0,
        artist: 'Artist',
        artistUnicode: 'Artist',
        title: 'Song Title',
        titleUnicode: 'Song Title',
        status: 1,
        difficulty: {
            rating: 0,
            name: 'Easy'
        },
        mode: 0,
        convert: false,
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