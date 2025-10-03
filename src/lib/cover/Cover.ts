import { Container } from 'pixi.js'
import type { CoverConfig, CoverTheme } from './CoverConfig'

export interface Cover {
    theme: CoverTheme
    scene: Container
    availableOptions: {
        readonly aspectRatio: boolean
        readonly beatmapAttrs: boolean
        readonly scorePp: boolean
        readonly scoreRank: boolean
    }
    update: (
        config: CoverConfig
    ) => void
}

export type CreateCover = () => Cover