import { Container } from 'pixi.js'
import type { CoverConfig, CoverTheme } from './CoverConfig'

export interface CoverComponent<T> {
    component: T
}

export interface CoverComponentHandle<T, U> extends CoverComponent<T> {
    update(
        options: U
    ): void
}

export interface Cover extends CoverComponentHandle<Container, { config: CoverConfig }> {
    theme: CoverTheme
    availableOptions: {
        readonly aspectRatio: boolean
        readonly beatmapAttrs: boolean
        readonly scorePp: boolean
        readonly scoreRank: boolean
    }
}

export type CreateCover = () => Cover