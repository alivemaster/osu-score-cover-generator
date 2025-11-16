import { type ColorSource, Container, Sprite, Texture, BlurFilter, Graphics, Text } from 'pixi.js'
import { BackdropBlurFilter, DropShadowFilter } from 'pixi-filters'
import '@pixi/layout'
import type { ComputedLayout } from '@pixi/layout'
import prettyMilliseconds from 'pretty-ms'
import type { Beatmap, DifficultyAttributes, GameMode, GameMods, Score, User } from '@/lib/osu'
import type { Cover, CoverComponent, CoverComponentHandle } from '../Cover'
import { type CoverDisplayOptions, CoverTheme } from '../CoverConfig'
import { updateDiffAttrs, toggleMods, difficultyBadgeColor, truncateText } from '../utils'

// components
const playerCardClassic = (): CoverComponentHandle<Container, { user: User, display: CoverDisplayOptions }> => {
    const playerCard = new Container({
        layout: {
            flex: 0,
            flexDirection: 'column',
            gap: 6,
            width: 640
        }
    })
    const playerCardMask = new Graphics()
    playerCard.setMask({ mask: playerCardMask })
    playerCard.addChild(playerCardMask)
    playerCard.on('layout', (e) => {
        const { width, height } = e.computedLayout
        playerCardMask
            .clear()
            .roundRect(0, 0, width, height, 48)
            .fill({ h: 0, s: 0, l: 100 })
    })

    const playerCardMain = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row',
            padding: 24,
            gap: 24,
            width: 640
        }
    })
    const playerCardMainMask = new Graphics()
    const playerCardMainBackground = new Graphics({
        filters: [
            new BackdropBlurFilter({
                clipToViewport: false,
                strength: 48,
                quality: 8
            })
        ]
    })
    playerCardMain.setMask({ mask: playerCardMainMask })
    playerCardMain.addChild(
        playerCardMainMask,
        playerCardMainBackground
    )
    playerCardMain.on('layout', (e) => {
        const { width, height } = e.computedLayout
        playerCardMainMask
            .clear()
            .rect(0, 0, width, height)
            .fill({ h: 0, s: 0, l: 100 })
        playerCardMainBackground
            .clear()
            .rect(0, 0, width + 48, height + 48)
            .fill({ h: 0, s: 0, l: 0, a: .35 })
    })

    const playerCardExtras = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 48,
            paddingRight: 48
        }
    })
    const playerCardExtrasBackground = new Graphics({
        filters: [
            new BackdropBlurFilter({
                clipToViewport: false,
                strength: 48,
                quality: 8
            })
        ]
    })
    playerCardExtras.addChild(playerCardExtrasBackground)
    playerCardExtras.on('layout', (e) => {
        const { width, height } = e.computedLayout
        playerCardExtrasBackground
            .clear()
            .rect(0, 0, width + 48, height + 48)
            .fill({ h: 0, s: 0, l: 0, a: .35 })
    })

    playerCard.addChild(
        playerCardMain,
        playerCardExtras
    )

    const avatar = new Container({
        layout: {
            flexShrink: 0,
            width: 192,
            height: 192
        }
    })
    const avatarMask = new Graphics()
    const avatarImg = new Sprite({
        texture: Texture.from('fallback-user-avatar'),
        layout: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
    })
    avatar.setMask({ mask: avatarMask })
    avatar.addChild(
        avatarMask,
        avatarImg
    )
    avatar.on('layout', (e) => {
        const { width, height } = e.computedLayout
        avatarMask
            .clear()
            .roundRect(0, 0, width, height, 48)
            .fill({ h: 0, s: 0, l: 100 })
    })

    const playerInfo = new Container({
        layout: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            padding: 12
        }
    })
    const playerInfoLayout: Pick<ComputedLayout, 'width' | 'height'> = { width: 0, height: 0 }
    playerInfo.on('layout', (e) => {
        Object.assign(playerInfoLayout, { ...e.computedLayout })
    })

    playerCardMain.addChild(
        avatar,
        playerInfo
    )

    const userNameText = new Text({
        text: 'Player',
        style: {
            fontFamily: [
                'Quicksand Variable',
                'Noto Sans SC Variable',
                'Noto Sans TC Variable',
                'Noto Sans JP Variable',
                'Noto Sans KR Variable'
            ],
            fontSize: 72,
            fontWeight: '700',
            fill: { h: 0, s: 0, l: 100 }
        },
        resolution: 1,
        layout: true
    })

    const flagsContainer = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6
        }
    })

    playerInfo.addChild(
        userNameText,
        flagsContainer
    )

    const countryFlag = new Sprite({
        texture: Texture.from('fallback-user-countryflag'),
        layout: {
            flex: 0,
            height: 72
        }
    })
    const teamFlag = new Sprite({
        texture: Texture.from('fallback-user-teamflag'),
        layout: {
            flex: 0,
            height: 72
        }
    })
    flagsContainer.addChild(
        countryFlag,
        teamFlag
    )

    const userPpContainer = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row'
        }
    })
    const userRankContainer = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row'
        }
    })
    playerCardExtras.addChild(
        userPpContainer,
        userRankContainer
    )

    const userPpValueText = new Text({
        text: '0',
        style: {
            fontFamily: 'Quicksand Variable',
            fontSize: 48,
            fontWeight: '700',
            fill: { h: 333, s: 100, l: 65 }
        },
        resolution: 1,
        layout: true
    })
    userPpContainer.addChild(
        userPpValueText,
        new Text({
            text: 'PP',
            style: {
                fontFamily: 'Quicksand Variable',
                fontSize: 48,
                fontWeight: '700',
                fill: { h: 0, s: 0, l: 100 }
            },
            resolution: 1,
            layout: true
        })
    )

    const userGlobalRankText = new Text({
        text: '#0',
        style: {
            fontFamily: 'Quicksand Variable',
            fontSize: 24,
            fontWeight: '700',
            fill: { h: 0, s: 0, l: 100 }
        },
        resolution: 1,
        layout: true
    })
    const userCountryRankText = new Text({
        text: '(#0)',
        style: {
            fontFamily: 'Quicksand Variable',
            fontSize: 24,
            fontWeight: '700',
            fill: { h: 0, s: 0, l: 100, a: .65 }
        },
        resolution: 1,
        layout: true
    })
    userRankContainer.addChild(
        userGlobalRankText,
        userCountryRankText
    )

    return {
        component: playerCard,
        update(options) {
            const customUserAvatarTexture = Texture.from('custom-user-avatar')
            if (customUserAvatarTexture)
                avatarImg.texture = customUserAvatarTexture
            else avatarImg.texture = Texture.from('fallback-user-avatar')

            countryFlag.visible = options.display.user.countryFlag
            if (countryFlag.visible) {
                const countryFlagTexture = Texture.from('user-countryflag-twemoji')
                if (countryFlagTexture)
                    countryFlag.texture = countryFlagTexture
                else countryFlag.texture = Texture.from('fallback-user-countryflag')
            }

            teamFlag.visible = options.display.user.teamFlag
            if (teamFlag.visible) {
                const customTeamFlagTexture = Texture.from('custom-user-teamflag')
                if (customTeamFlagTexture)
                    teamFlag.texture = customTeamFlagTexture
                else teamFlag.texture = Texture.from('fallback-user-teamflag')
            }

            userNameText.text = options.user.userName
            truncateText(userNameText, playerInfoLayout.width)

            playerCardExtras.visible = options.display.user.pp || options.display.user.rank
            if (playerCardExtras.visible) {
                userPpContainer.visible = options.display.user.pp
                if (userPpContainer.visible) 
                    userPpValueText.text = options.user.pp ? options.user.pp : '--'

                userGlobalRankText.visible = options.display.user.rank
                if (userGlobalRankText.visible) 
                    userGlobalRankText.text = '#' + (options.user.globalRank ? options.user.globalRank : '--')

                userCountryRankText.visible = options.display.user.rank
                if (userCountryRankText.visible) 
                    userCountryRankText.text = '(#' + (options.user.countryRank ? options.user.countryRank : '--') + ')'
            }
        }
    }
}

const scoreSummaryTextClassic = (text: string, fontSize: number, fill: ColorSource): CoverComponent<Text> => {
    return {
        component: new Text({
            text,
            style: {
                fontFamily: 'Montserrat Variable',
                fontSize,
                fontWeight: '700',
                padding: 16,
                fill,
                dropShadow: {
                    alpha: .35,
                    angle: Math.PI / 2,
                    blur: 16,
                    distance: 16,
                    color: { h: 0, s: 0, l: 0 }
                }
            },
            resolution: 1,
            layout: true
        })
    }
}

const scorePpTextClassic = (): CoverComponentHandle<Text, { value: number }> => {
    const scorePpText = scoreSummaryTextClassic('2000PP', 192, { h: 48, s: 100, l: 60 })
    return {
        component: scorePpText.component,
        update(options) {
            scorePpText.component.text = options.value + 'PP'
        }
    }
}

const scoreStatusTextClassic = (): CoverComponentHandle<Text, { score: Score }> => {
    const scoreStatusText = scoreSummaryTextClassic('FC', 192, { h: 54, s: 100, l: 60 })
    return {
        component: scoreStatusText.component,
        update(options) {
            if (!options.score.passed) {
                scoreStatusText.component.text = 'F'
                scoreStatusText.component.style.fill = { h: 0, s: 0, l: 75 }
                scoreStatusText.component.style.dropShadow.color = { h: 0, s: 100, l: 65 }
            } else {
                if (options.score.missCount > 0) {
                    scoreStatusText.component.text = options.score.missCount + 'X'
                    scoreStatusText.component.style.fill = { h: 0, s: 100, l: 60 }
                } else if (options.score.sliderBreakCount > 0) {
                    scoreStatusText.component.text = options.score.sliderBreakCount + 'X'
                    scoreStatusText.component.style.fill = { h: 210, s: 100, l: 60 }
                } else if (options.score.accuracy = 1) {
                    scoreStatusText.component.text = 'SS'
                    scoreStatusText.component.style.fill = { h: 200, s: 100, l: 85 }
                } else {
                    scoreStatusText.component.text = 'FC'
                    scoreStatusText.component.style.fill = { h: 54, s: 100, l: 60 }
                }
                scoreStatusText.component.style.dropShadow.color = { h: 0, s: 0, l: 0 }
            }
        }
    }
}

const beatmapRankStatusClassic = (): CoverComponentHandle<Container, { beatmap: Beatmap }> => {
    let backgroundColor = { h: 0, s: 0, l: 65 }

    const beatmapRankStatus = new Container({
        layout: {
            flex: 0,
            alignItems: 'flex-start'
        }
    })
    const beatmapRankStatusIcon = new Sprite({
        texture: Texture.from('icon-beatmapstatus-unranked'),
        layout: {
            height: 108
        }
    })
    const beatmapRankStatusBackground = new Graphics()
    beatmapRankStatus.addChild(beatmapRankStatusBackground, beatmapRankStatusIcon)
    const beatmapRankStatusLayout: Pick<ComputedLayout, 'left' | 'top' | 'width' | 'height'> = { left: 0, top: 0, width: 0, height: 0 }
    function drawBeatmaopStatusBackground(x: number, y: number, width: number, height: number) {
        beatmapRankStatusBackground
            .clear()
            .ellipse(x + width / 2, y + height / 2, width / 2, height / 2)
            .fill(backgroundColor)
    }
    beatmapRankStatusIcon.on('layout', (e) => {
        Object.assign(beatmapRankStatusLayout, { ...e.computedLayout })
        const { left, top, width, height } = beatmapRankStatusLayout
        drawBeatmaopStatusBackground(left, top, width, height)
    })

    return {
        component: beatmapRankStatus,
        update(options) {
            if (options.beatmap.status === 4) {
                beatmapRankStatusIcon.texture = Texture.from('icon-beatmapstatus-loved')
                backgroundColor = { h: 330, s: 85, l: 60 }
            } else if (options.beatmap.status > 1) {
                beatmapRankStatusIcon.texture = Texture.from('icon-beatmapstatus-approved')
                backgroundColor = { h: 90, s: 80, l: 50 }
            } else if (options.beatmap.status === 1) {
                beatmapRankStatusIcon.texture = Texture.from('icon-beatmapstatus-ranked')
                backgroundColor = { h: 190, s: 85, l: 50 }
            } else {
                beatmapRankStatusIcon.texture = Texture.from('icon-beatmapstatus-unranked')
                backgroundColor = { h: 0, s: 0, l: 65 }
            }
            drawBeatmaopStatusBackground(
                beatmapRankStatusLayout.left,
                beatmapRankStatusLayout.top,
                beatmapRankStatusLayout.width,
                beatmapRankStatusLayout.height
            )
        }
    }
}

const beatmapBadgeClassic = (): CoverComponentHandle<Container, { beatmap: Beatmap }> => {
    const beatmapBadge = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center'
        }
    })
    const beatmapBadgeBackground = new Graphics()
    beatmapBadge.addChild(beatmapBadgeBackground)
    beatmapBadge.on('layout', (e) => {
        const { width, height } = e.computedLayout
        beatmapBadgeBackground
            .clear()
            .roundRect(0, 0, width, height, height / 2)
            .fill({ h: 0, s: 0, l: 0, a: .35 })
    })

    const beatmapRankStatus = beatmapRankStatusClassic()
    const beatmapModeIcon = new Sprite({
        texture: Texture.from('icon-gamemode-osu'),
        layout: {
            height: 108
        }
    })
    beatmapBadge.addChild(
        beatmapRankStatus.component,
        beatmapModeIcon
    )

    return {
        component: beatmapBadge,
        update(options) {
            beatmapRankStatus.update(options)
            // switch beatmap mode icon
            if (options.beatmap.mode === 3)
                beatmapModeIcon.texture = Texture.from('icon-gamemode-mania')
            else if (options.beatmap.mode === 2)
                beatmapModeIcon.texture = Texture.from('icon-gamemode-fruits')
            else if (options.beatmap.mode === 1)
                beatmapModeIcon.texture = Texture.from('icon-gamemode-taiko')
            else
                beatmapModeIcon.texture = Texture.from('icon-gamemode-osu')
        }
    }
}

const beatmapAttributeClassic = (label: string, labelColor: ColorSource): CoverComponentHandle<Container, { value: string | number }> => {
    const beatmapAttribute = new Container({
        layout: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            height: 80
        }
    })
    const beatmapAttributeMask = new Graphics()
    const beatmapAttributeBackground = new Graphics()
    beatmapAttribute.setMask({ mask: beatmapAttributeMask })
    beatmapAttribute.addChild(
        beatmapAttributeMask,
        beatmapAttributeBackground
    )
    beatmapAttribute.on('layout', (e) => {
        const { width, height } = e.computedLayout
        beatmapAttributeMask
            .clear()
            .roundRect(0, 0, width, height, 24)
            .fill({ h: 0, s: 0, l: 100 })
        beatmapAttributeBackground
            .clear()
            .rect(0, 0, width, height)
            .fill({ h: 0, s: 0, l: 100 })
    })

    const labelContainer = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
            height: '100%'
        }
    })
    const labelBackground = new Graphics()
    const labelText = new Text({
        text: label,
        style: {
            fontFamily: 'Quicksand Variable',
            fontSize: 48,
            fontWeight: '700',
            fill: { h: 0, s: 0, l: 100 }
        },
        resolution: 1,
        layout: true
    })
    labelContainer.on('layout', (e) => {
        const { width, height } = e.computedLayout
        labelBackground
            .clear()
            .rect(0, 0, width, height)
            .fill(labelColor)
    })
    labelContainer.addChild(
        labelBackground,
        labelText
    )

    const valueContainer = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
            height: '100%'
        }
    })
    const valueText = new Text({
        text: '0',
        style: {
            fontFamily: 'Quicksand Variable',
            fontSize: 48,
            fontWeight: '700',
            fill: { h: 0, s: 0, l: 0 }
        },
        resolution: 1,
        layout: true
    })
    valueContainer.addChild(valueText)

    beatmapAttribute.addChild(
        labelContainer,
        valueContainer
    )

    return {
        component: beatmapAttribute,
        update(options) {
            valueText.text = options.value
        }
    }
}

const beatmapAttributesClassic = (): CoverComponentHandle<Container, { beatmap: Beatmap, display: CoverDisplayOptions }> => {
    const beatmapAttributesContainer = new Container({
        layout: {
            flex: 1,
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 12
        }
    })

    const timeAttribute = beatmapAttributeClassic('time', { h: 320, s: 100, l: 65 })
    timeAttribute.update({ value: '0:00' })
    const bpmAttribute = beatmapAttributeClassic('bpm', { h: 280, s: 100, l: 65 })
    const difficultyAttributes: Record<keyof DifficultyAttributes, ReturnType<typeof beatmapAttributeClassic>> = {
        ar: beatmapAttributeClassic('ar', { h: 0, s: 100, l: 65 }),
        cs: beatmapAttributeClassic('cs', { h: 90, s: 70, l: 50 }),
        od: beatmapAttributeClassic('od', { h: 30, s: 85, l: 40 }),
        hp: beatmapAttributeClassic('hp', { h: 210, s: 100, l: 65 })
    }
    beatmapAttributesContainer.addChild(
        difficultyAttributes.hp.component,
        difficultyAttributes.od.component,
        difficultyAttributes.cs.component,
        difficultyAttributes.ar.component,
        bpmAttribute.component,
        timeAttribute.component
    )

    return {
        component: beatmapAttributesContainer,
        update(options) {
            timeAttribute.component.visible = options.display.beatmap.time
            timeAttribute.update({ value: prettyMilliseconds(options.beatmap.length * 1000, { colonNotation: true }) })
            bpmAttribute.component.visible = options.display.beatmap.bpm
            bpmAttribute.update({ value: parseFloat(options.beatmap.bpm.toFixed(2)) })
            updateDiffAttrs(options.beatmap.attrs, options.beatmap.mode, options.display, (label, visible) => {
                difficultyAttributes[label].component.visible = visible
                difficultyAttributes[label].update({ value: parseFloat(options.beatmap.attrs[label].value.toFixed(2)) })
            })
        }
    }
}

const difficultyBadgeClassic = (): CoverComponentHandle<Container, { rating: number, name: string }> => {
    const badgeColor = {
        background: { h: 0, s: 0, l: 67 },
        foreground: { h: 0, s: 0, l: 0, a: .85 }
    }

    const difficultyBadge = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 36,
            paddingRight: 36,
            gap: 18,
            height: 108
        }
    })
    const difficultyBadgeMask = new Graphics()
    const difficultyBadgeBackground = new Graphics()
    difficultyBadge.setMask({ mask: difficultyBadgeMask })
    difficultyBadge.addChild(
        difficultyBadgeMask,
        difficultyBadgeBackground
    )
    const difficultyBadgeLayout: Pick<ComputedLayout, 'width' | 'height'> = { width: 0, height: 0 }
    const computedBadgeWidth = (width: number) => width < 640 ? width : 640
    function drawdifficultyBadgeBackground(width: number, height: number) {
        difficultyBadgeBackground
            .clear()
            .roundRect(0, 0, width, height, height / 2)
            .fill(badgeColor.background)
    }
    difficultyBadge.on('layout', (e) => {
        Object.assign(difficultyBadgeLayout, { ...e.computedLayout })
        const { width, height } = difficultyBadgeLayout
        difficultyBadgeMask
            .clear()
            .roundRect(0, 0, computedBadgeWidth(width), height, height / 2)
            .fill({ h: 0, s: 0, l: 100 })
        drawdifficultyBadgeBackground(computedBadgeWidth(width), height)
    })

    const starText = new Text({
        text: '0*',
        style: {
            fontFamily: 'Quicksand Variable',
            fontSize: 64,
            fontWeight: '700',
            fill: badgeColor.foreground
        },
        resolution: 1,
        layout: true
    })
    difficultyBadge.addChild(starText)

    const divider = new Container({
        layout: {
            width: 18,
            height: 18
        }
    })
    difficultyBadge.addChild(divider)
    const dividerGraphics = new Graphics()
    divider.addChild(dividerGraphics)
    const dividerLayout: Pick<ComputedLayout, 'width' | 'height'> = { width: 0, height: 0 }
    function drawDivider(width: number, height: number) {
        dividerGraphics
            .clear()
            .ellipse(width / 2, height / 2, width / 2, height / 2)
            .fill(badgeColor.foreground)
    }
    divider.on('layout', (e) => {
        Object.assign(dividerLayout, { ...e.computedLayout })
        const { width, height } = dividerLayout
        drawDivider(width, height)
    })

    const nameText = new Text({
        text: 'Insane',
        style: {
            fontFamily: 'Quicksand Variable',
            fontSize: 64,
            fontWeight: '700',
            fill: badgeColor.foreground
        },
        resolution: 1,
        layout: true
    })
    difficultyBadge.addChild(nameText)

    return {
        component: difficultyBadge,
        update(options) {
            starText.text = parseFloat(options.rating.toFixed(2)) + '*'
            nameText.text = options.name
            truncateText(nameText, 400)
            // colors
            Object.assign(badgeColor, { ...difficultyBadgeColor(options.rating) })
            starText.style.fill = badgeColor.foreground
            nameText.style.fill = badgeColor.foreground
            drawDivider(dividerLayout.width, dividerLayout.height)
        }
    }
}

const modIconClassic = (acronym: string, backgroundColor: ColorSource, foregroundColor?: ColorSource): CoverComponent<Container> => {
    const modIcon = new Container({
        layout: {
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: 144,
            height: 80
        }
    })
    const modIconBackground = new Graphics()
    modIcon.addChild(modIconBackground)
    modIcon.on('layout', (e) => {
        const { width, height } = e.computedLayout
        modIconBackground
            .clear()
            .roundRect(0, 0, width, height, height / 2)
            .fill(backgroundColor)
    })

    const modIconText = new Text({
        text: acronym.toUpperCase(),
        style: {
            fontFamily: 'Montserrat Variable',
            fontSize: 54,
            fontWeight: '700',
            fill: foregroundColor ? foregroundColor : { h: 0, s: 0, l: 100 }
        },
        resolution: 1,
        layout: true
    })
    modIcon.addChild(modIconText)

    return {
        component: modIcon
    }
}

const modsClassic = (): CoverComponentHandle<Container, { mode: GameMode, mods: GameMods }> => {
    const modsContainer = new Container({
        layout: {
            flex: 1,
            flexDirection: 'row-reverse',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 12
        }
    })

    const mods: Record<keyof GameMods, ReturnType<typeof modIconClassic>> = {
        // nm: modIconClassic('nm', { h: 0, s: 0, l: 50 }),
        ez: modIconClassic('ez', { h: 70, s: 100, l: 40 }),
        nf: modIconClassic('nf', { h: 230, s: 40, l: 50 }),
        ht: modIconClassic('ht', { h: 270, s: 40, l: 50 }),
        hd: modIconClassic('hd', { h: 40, s: 100, l: 50 }),
        hr: modIconClassic('hr', { h: 340, s: 100, l: 55 }),
        dt: modIconClassic('dt', { h: 270, s: 100, l: 60 }),
        nc: modIconClassic('nc', { h: 270, s: 100, l: 60 }),
        fl: modIconClassic('fl', { h: 0, s: 0, l: 15 }),
        sd: modIconClassic('sd', { h: 30, s: 80, l: 50 }),
        pf: modIconClassic('pf', { h: 30, s: 80, l: 50 }),
        rx: modIconClassic('rx', { h: 200, s: 100, l: 60 }),
        ap: modIconClassic('ap', { h: 220, s: 100, l: 60 }),
        so: modIconClassic('so', { h: 330, s: 100, l: 60 }),
        fi: modIconClassic('fi', { h: 40, s: 100, l: 50 }),
        cp: modIconClassic('cp', { h: 0, s: 40, l: 50 }),
        mr: modIconClassic('mr', { h: 126, s: 100, l: 35 }),
        rd: modIconClassic('rd', { h: 146, s: 100, l: 40 }),
        xk: modIconClassic('xk', { h: 0, s: 20, l: 35 }),
        v2: modIconClassic('v2', { h: 0, s: 0, l: 100 }, { h: 0, s: 0, l: 0 })
    }
    const nomodIcon = modIconClassic('nm', { h: 0, s: 0, l: 50 })
    modsContainer.addChild(
        mods.v2.component,
        mods.xk.component,
        mods.rd.component,
        mods.mr.component,
        mods.cp.component,
        mods.fi.component,
        mods.so.component,
        mods.ap.component,
        mods.rx.component,
        mods.pf.component,
        mods.sd.component,
        mods.fl.component,
        mods.nc.component,
        mods.dt.component,
        mods.hr.component,
        mods.hd.component,
        mods.ht.component,
        mods.nf.component,
        mods.ez.component,
        nomodIcon.component
    )

    function resetMods() {
        Object.values(mods).forEach((value) => {
            value.component.visible = false
        })
        nomodIcon.component.visible = true
    }
    resetMods()

    return {
        component: modsContainer,
        update(options) {
            resetMods()
            const enabledCount = toggleMods(options.mods, options.mode, (acronym) => {
                mods[acronym].component.visible = true
            })
            if (enabledCount > 1)
                nomodIcon.component.visible = false
            if (enabledCount > 7) {
                modsContainer.layout = { gap: undefined }
                Object.values(mods).forEach((value) => {
                    value.component.layout = { marginLeft: (1080 - 144 * enabledCount) / (enabledCount - 1) }
                })
            } else {
                modsContainer.layout = { gap: 12 }
                Object.values(mods).forEach((value) => {
                    value.component.layout = { marginLeft: undefined }
                })
            }
        }
    }
}

const topBarClassic = (): CoverComponentHandle<Container, { score: Score, display: CoverDisplayOptions }> => {
    const outerContainer = new Container({
        layout: {
            flex: 1,
            flexDirection: 'column'
        },
        filters: [
            new DropShadowFilter({
                alpha: .35,
                blur: 24,
                color: { h: 0, s: 0, l: 0 },
                offset: { x: 0, y: 24 },
                quality: 8
            })
        ]
    })

    const topBar = new Container({
        layout: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 48,
            paddingRight: 48,
            gap: 24
        }
    })
    outerContainer.addChild(topBar)
    const topBarMask = new Graphics()
    topBar.setMask({ mask: topBarMask })
    topBar.addChild(topBarMask)
    topBar.on('layout', (e) => {
        const cornerRadius = 48
        const { width, height } = e.computedLayout
        topBarMask
            .clear()
            .moveTo(0, 0)
            .lineTo(width, 0)
            .lineTo(width, height - cornerRadius)
            .arcTo(width, height, width - cornerRadius, height, cornerRadius)
            .lineTo(0 + cornerRadius, height)
            .arcTo(0, height, 0, height - cornerRadius, cornerRadius)
            .lineTo(0, 0)
            .fill({ h: 0, s: 0, l: 100 })
    })
    const topBarBackground = new Sprite({
        texture: Texture.from('fallback-beatmap-background'),
        layout: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }
    })
    topBar.addChild(topBarBackground)
    topBar.addChild(
        new Graphics()
            .rect(0, 0, topBarBackground.width, topBarBackground.height)
            .fill({ h: 0, s: 0, l: 0, a: .35 })
    )

    const playerCard = playerCardClassic()
    topBar.addChild(playerCard.component)

    const scoreSummary = new Container({
        layout: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 48,
            paddingBottom: 48,
            width: '100%',
            height: '100%'
        }
    })
    topBar.addChild(scoreSummary)
    const scoreSummaryTop = new Container({
        layout: {
            flexDirection: 'row-reverse',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })
    const scoreSummaryBottom = new Container({
        layout: {
            flexDirection: 'row',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })
    scoreSummary.addChild(
        scoreSummaryTop,
        scoreSummaryBottom
    )

    const scoreStatus = scoreStatusTextClassic()
    const scorePp = scorePpTextClassic()
    scoreSummaryTop.addChild(
        scoreStatus.component,
        scorePp.component
    )

    const scoreRank = scoreSummaryTextClassic('#2000', 108, { h: 0, s: 0, l: 100 })
    const scoreAccuracy = scoreSummaryTextClassic('99.97%', 108, { h: 0, s: 0, l: 100 })
    const scoreCombo = scoreSummaryTextClassic('2000x', 108, { h: 0, s: 0, l: 100 })
    scoreSummaryBottom.addChild(
        scoreRank.component,
        scoreAccuracy.component,
        scoreCombo.component
    )

    return {
        component: outerContainer,
        update(options) {
            const customBeatmapBackgroundTexture = Texture.from('custom-beatmap-background')
            if (customBeatmapBackgroundTexture)
                topBarBackground.texture = customBeatmapBackgroundTexture
            else topBarBackground.texture = Texture.from('fallback-beatmap-background')

            scorePp.component.visible = options.display.score.pp
            scorePp.update({ value: options.score.pp })
            scoreRank.component.visible = options.display.score.rank
            if (options.score.rank)
                scoreRank.component.text = '#' + options.score.rank
            else
                scoreRank.component.text = '#--'
            scoreAccuracy.component.text = options.score.accuracy * 100 + '%'
            scoreCombo.component.text = options.score.maxCombo + 'x'

            playerCard.update({ user: options.score.user, display: options.display })
            scoreStatus.update({ score: options.score })
        }
    }
}

const beatmapInfoClassic = (): CoverComponentHandle<Container, { beatmap: Beatmap, display: CoverDisplayOptions }> => {
    const beatmapInfo = new Container({
        layout: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box',
            paddingTop: 48,
            paddingBottom: 48,
            paddingLeft: 96,
            paddingRight: 96
        }
    })

    const beatmapDetailsTop = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })

    const songTitleField = new Container({
        layout: {
            flex: 0,
            alignItems: 'center',
            justifyContent: 'center',
            height: 120
        }
    })
    const songTitleFieldLayout: Pick<ComputedLayout, 'width' | 'height'> = { width: 0, height: 0 }
    songTitleField.on('layout', (e) => {
        Object.assign(songTitleFieldLayout, { ...e.computedLayout })
    })

    const beatmapDetailsBottom = new Container({
        layout: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    })
    beatmapInfo.addChild(
        beatmapDetailsTop,
        songTitleField,
        beatmapDetailsBottom
    )

    const beatmapBadge = beatmapBadgeClassic()
    const beatmapAttributes = beatmapAttributesClassic()
    beatmapDetailsTop.addChild(
        beatmapBadge.component,
        beatmapAttributes.component
    )

    const songTitleText = new Text({
        text: 'Song Title',
        style: {
            align: 'center',
            fontFamily: [
                'Quicksand Variable',
                'Noto Sans SC Variable',
                'Noto Sans TC Variable',
                'Noto Sans JP Variable',
                'Noto Sans KR Variable'
            ],
            fontSize: 96,
            fontWeight: '700',
            fill: { h: 0, s: 0, l: 100 }
        },
        resolution: 1,
        layout: true
    })
    songTitleField.addChild(songTitleText)

    const difficultyBadge = difficultyBadgeClassic()
    const mods = modsClassic()
    beatmapDetailsBottom.addChild(
        difficultyBadge.component,
        mods.component
    )

    return {
        component: beatmapInfo,
        update(options) {
            beatmapBadge.update(options)
            beatmapAttributes.update(options)

            songTitleText.text = options.beatmap.title
            truncateText(songTitleText, songTitleFieldLayout.width)

            difficultyBadge.update(options.beatmap.difficulty)
            mods.update(options.beatmap)
        }
    }
}

const commentFieldClassic = (): CoverComponentHandle<Container, { text: string }> => {
    const commentField = new Container({
        layout: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: 200
        }
    })
    const commentFieldLayout: Pick<ComputedLayout, 'width' | 'height'> = { width: 0, height: 0 }
    commentField.on('layout', (e) => {
        Object.assign(commentFieldLayout, { ...e.computedLayout })
    })

    const commentText = new Text({
        text: 'Comment',
        style: {
            align: 'center',
            fontFamily: [
                'Noto Sans SC Variable',
                'Noto Sans TC Variable',
                'Noto Sans JP Variable',
                'Noto Sans KR Variable'
            ],
            fontSize: 72,
            fontWeight: '400',
            fill: { h: 0, s: 0, l: 100 }
        },
        resolution: 1,
        layout: true
    })
    commentField.addChild(commentText)

    return {
        component: commentField,
        update(options) {
            commentText.text = options.text
            const lineWidth = commentFieldLayout.width - 192
            if (lineWidth > 0) {
                commentText.style.wordWrap = true
                commentText.style.wordWrapWidth = lineWidth
                truncateText(commentText, undefined, 2)
            }
        }
    }
}

export const coverClassic = (): Cover => {
    const cover = new Container({
        layout: {
            flexDirection: 'column',
            width: 1920,
            height: 1200,
            minHeight: 1080,
            maxHeight: 1440
        }
    })
    const coverMask = new Graphics()
    const coverBackground = new Sprite({
        texture: Texture.from('fallback-beatmap-background'),
        layout: {
            position: 'absolute',
            top: '-2.5%',
            left: '-2.5%',
            width: '105%',
            height: '105%',
            objectFit: 'cover'
        },
        filters: [
            new BlurFilter({
                strength: 24,
                quality: 8
            })
        ]
    })
    cover.setMask({ mask: coverMask })
    cover.addChild(
        coverMask,
        coverBackground,
        new Graphics()
            .rect(0, 0, coverBackground.width, coverBackground.height)
            .fill({ h: 0, s: 0, l: 0, a: .65 })
    )
    cover.on('layout', (e) => {
        const { width, height } = e.computedLayout
        coverMask
            .clear()
            .rect(0, 0, width, height)
            .fill({ h: 0, s: 0, l: 100 })
    })

    const topBar = topBarClassic()
    const beatmapInfo = beatmapInfoClassic()
    const commentField = commentFieldClassic()
    cover.addChild(
        topBar.component,
        beatmapInfo.component,
        commentField.component
    )

    return {
        theme: CoverTheme.Classic,
        availableOptions: {
            aspectRatio: true,
            beatmapAttrs: true,
            scorePp: true,
            scoreRank: true
        },
        component: cover,
        update(options) {
            const aspectRatio = options.config.options.render.aspectRatio
            cover.layout = {
                height: aspectRatio === 0 ? 1080 : aspectRatio === 2 ? 1440 : 1200
            }

            const customBeatmapBackgroundTexture = Texture.from('custom-beatmap-background')
            if (customBeatmapBackgroundTexture)
                coverBackground.texture = customBeatmapBackgroundTexture
            else coverBackground.texture = Texture.from('fallback-beatmap-background')

            topBar.update({ score: options.config.score, display: options.config.options.display })
            beatmapInfo.update({ beatmap: options.config.score.beatmap, display: options.config.options.display })
            commentField.update({ text: options.config.comment })
        }
    }
}