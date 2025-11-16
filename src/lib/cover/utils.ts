import { type Text, type ColorSource, CanvasTextMetrics, TextStyle } from 'pixi.js'
import { type HslaColor, colord, extend } from 'colord'
import mixPlugin from 'colord/plugins/mix'
import type { DifficultyAttribute, DifficultyAttributes, GameMode, GameMod, GameMods } from '@/lib/osu'
import { type CoverDisplayOptions } from './CoverConfig'

export function updateDiffAttrs(attrs: DifficultyAttributes, currentMode: GameMode, display: CoverDisplayOptions, callback: (label: keyof DifficultyAttributes, visible: boolean) => void): void {
    Object.entries(attrs).forEach(([key, value]: [string, DifficultyAttribute<ReadonlyArray<GameMode>>]) => {
        const label = key as keyof DifficultyAttributes
        const visible = value.modes.includes(currentMode) && display.beatmap.difficultyAttrs[label]
        callback(label, visible)
    })
}

export function toggleMods(mods: GameMods, currentMode: GameMode, callback: (acronym: keyof GameMods) => void): number {
    let enabledCount = 0
    Object.entries(mods).forEach(([key, value]: [string, GameMod<ReadonlyArray<GameMode>>]) => {
        const acronym = key as keyof GameMods
        if (value.modes.includes(currentMode) && value.enabled) {
            enabledCount++
            callback(acronym)
        }
    })
    return enabledCount
}

extend([mixPlugin])
export function difficultyBadgeColor(rating: number): { background: ColorSource, foreground: ColorSource } {
    const difficultyColorSpectrum: { rating: number, color: HslaColor }[] = [
        { rating: 0.1, color: { h: 215, s: 96, l: 62, a: 1 } },
        { rating: 1.25, color: { h: 201, s: 100, l: 65, a: 1 } },
        { rating: 2, color: { h: 166, s: 100, l: 65, a: 1 } },
        { rating: 2.5, color: { h: 105, s: 100, l: 65, a: 1 } },
        { rating: 3.3, color: { h: 58, s: 90, l: 66, a: 1 } },
        { rating: 4.2, color: { h: 10, s: 100, l: 70, a: 1 } },
        { rating: 4.9, color: { h: 349, s: 100, l: 65, a: 1 } },
        { rating: 5.8, color: { h: 307, s: 53, l: 52, a: 1 } },
        { rating: 6.7, color: { h: 241, s: 65, l: 63, a: 1 } },
        { rating: 7.7, color: { h: 241, s: 74, l: 32, a: 1 } },
        { rating: 9, color: { h: 0, s: 0, l: 0, a: 1 } }
    ]

    let background: HslaColor = { h: 0, s: 0, l: 0, a: 1 }
    let foreground: HslaColor = { h: 45, s: 100, l: 70, a: 1 }

    // background color
    const nextIndex = difficultyColorSpectrum.findIndex((el) => el.rating > rating)
    if (nextIndex === 0) {
        background = { h: 0, s: 0, l: 67, a: 1 }
    } else {
        const nextStop = difficultyColorSpectrum[nextIndex]
        const prevStop = difficultyColorSpectrum[nextIndex - 1]
        if (nextStop && prevStop) {
            background = colord(prevStop.color).mix(
                nextStop.color,
                (rating - prevStop.rating) / (nextStop.rating - prevStop.rating)
            ).toHsl()
        }
    }
    // foreground color
    if (rating < 6.5)
        foreground = { h: 0, s: 0, l: 0, a: .85 }

    return {
        background,
        foreground
    }
}

// https://github.com/pixijs/pixijs/issues/3449#issuecomment-428648004
export function truncateText(text: Text, maxWidth?: number, maxLines?: number): void {
    const { align, breakWords, fontFamily, fontSize, fontStyle, fontVariant, fontWeight, leading, letterSpacing, lineHeight, textBaseline, whiteSpace, wordWrap, wordWrapWidth } = text.style
    const style = new TextStyle({ align, breakWords, fontFamily, fontSize, fontStyle, fontVariant, fontWeight, leading, letterSpacing, lineHeight, textBaseline, whiteSpace, wordWrap, wordWrapWidth })

    const { lines, lineWidths } = CanvasTextMetrics.measureText(text.text, style)
    let linesTruncated = false
    if (maxLines && lines.length > maxLines) {
        lines.splice(maxLines)
        lineWidths.splice(maxLines)
        linesTruncated = true
    }

    let width: number
    if (wordWrap)
        width = wordWrapWidth
    else if (maxWidth)
        width = maxWidth
    else
        return

    const lastLineIndex = lines.length - 1

    const lastLine = lines[lastLineIndex]
    const lastlineWidth = lineWidths[lastLineIndex]
    if (lastLine && lastlineWidth && width > 0) {
        const words = lastLine.split(' ')
        if (words) {
            let newLastLine = ''
            const wordMetrics = CanvasTextMetrics
                .measureText(`\u00A0\n...\n${words.join('\n')}`, style)
            const [spaceWidth, dotsWidth, ...wordWidths] = wordMetrics.lineWidths

            if (words[0] && wordWidths[0] && wordWidths[0] > width) {
                const chars = words[0].split('')
                const charWidths = CanvasTextMetrics
                    .measureText(chars.join('\n'), style).lineWidths
                charWidths.reduce((total, current, i) => {
                    const newTotal = total + current
                    if (newTotal < width) {
                        newLastLine += chars[i]
                        return newTotal
                    }
                    return width
                }, dotsWidth!)
                newLastLine += '...'
            } else if (lastlineWidth > width || linesTruncated) {
                wordWidths.reduce((total, current, i) => {
                    const newTotal = total + spaceWidth! + current
                    if (newTotal < width) {
                        newLastLine += words[i] + ' '
                        return newTotal
                    }
                    return width
                }, dotsWidth!)
                newLastLine += '...'
            }

            if (newLastLine.length > 0)
                lines[lastLineIndex] = newLastLine
        }
    }
    text.text = lines.join('\n')
}