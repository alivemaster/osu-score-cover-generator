export default interface RenderOptions {
    ratio: string
    scale: string
    show: {
        pp: boolean
        rank: boolean
        beatmapStats: Record<'time' | 'bpm' | 'ar' | 'cs' | 'od' | 'hp', boolean>
    }
}