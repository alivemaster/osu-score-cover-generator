import Color from "color"

export default (sr: number) => {
    const bgColor = (sr: number, min: number, max: number, c1: string, c2: string) => {
        const ratio = (sr - min) / (max - min)
        const color1 = Color(c1)
        const color2 = Color(c2)
        const mixed = color1.mix(color2, ratio)
        return mixed.hsl().string()
    }
    const bg: string =
        sr < 1.5 ? 'hsl(200, 100%, 65%)' :
            sr >= 1.5 && sr < 2 ? bgColor(sr, 1.5, 2, 'hsl(200, 100%, 65%)', 'hsl(165, 100%, 65%)') :
                sr >= 2 && sr < 2.5 ? bgColor(sr, 2, 2.5, 'hsl(165, 100%, 65%)', 'hsl(105, 100%, 65%)') :
                    sr >= 2.5 && sr < 3.5 ? bgColor(sr, 2.5, 3.5, 'hsl(105, 100%, 65%)', 'hsl(60, 90%, 65%)') :
                        sr >= 3.5 && sr < 4.5 ? bgColor(sr, 3.5, 4.5, 'hsl(60, 90%, 65%)', 'hsl(10, 100%, 70%)') :
                            sr >= 4.5 && sr < 6 ? bgColor(sr, 4.5, 6, 'hsl(10, 100%, 70%)', 'hsl(345, 100%, 65%)') :
                                sr >= 6 && sr < 7 ? bgColor(sr, 6, 7, 'hsl(345, 100%, 65%)', 'hsl(240, 65%, 65%)') :
                                    sr >= 7 && sr < 8 ? bgColor(sr, 7, 8, 'hsl(240, 65%, 65%)', 'hsl(240, 75%, 35%)') : 'hsl(0, 0%, 0%)'
    const fg: string = sr < 6.5 ? 'hsl(205 20% 25%)' : 'hsl(45 100% 70%)'
    return {
        bg,
        fg
    }
}