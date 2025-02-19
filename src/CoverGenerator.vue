<script setup lang="ts">
import { reactive, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import CoverData from './cover/CoverData'
import CoverAssets from './cover/CoverAssets'
import RenderOptions from './cover/RenderOptions'
import RenderV1 from './cover/styles/V1'
import initAssets from './cover/utils/initAssets'
import flagIcon from './cover/utils/flagIcon'
import fileName from './cover/utils/fileName'
import exportCover from './cover/utils/exportCover'
import loadUserData from './cover/utils/loadUserData'
import loadBeatmapData from './cover/utils/loadBeatmapData'
import loadScoreData from './cover/utils/loadScoreData'
import loadImgFile from './utils/loadImgFile'
import loadImgUrl from './utils/loadImgUrl'
import Flex from './components/Flex.vue'
import Collapsible from './components/Collapsible.vue'
import PropTitle from './components/PropTitle.vue'
import Button from './components/Button.vue'
import Switch from './components/Switch.vue'
import TextInput from './components/TextInput.vue'
import TextArea from './components/TextArea.vue'
import DragDrop from './components/DragDrop.vue'
import Dropdown from './components/Dropdown.vue'
import ModSelect from './components/ModSelect.vue'
import countryList from './assets/countries.json'

// i18n
const { t } = useI18n()
// Dropdown Options
const dropDownOptions = {
    convertedBeatmap: [
        {
            name: t('dropDown.convertedBeatmap.noConvert'),
            value: ''
        },
        {
            name: 'osu!catch',
            value: 'fruits'
        },
        {
            name: 'osu!taiko',
            value: 'taiko'
        },
        {
            name: 'osu!mania',
            value: 'mania'
        }
    ],
    countryCode: [
        {
            name: t('dropDown.countryCode.none'),
            value: ''
        }
    ],
    scoreStatus: [
        {
            name: 'SS',
            value: 'ss'
        },
        {
            name: t('dropDown.scoreStatus.fc'),
            value: 'fc'
        },
        {
            name: t('dropDown.scoreStatus.fail'),
            value: 'fail'
        },
        {
            name: t('dropDown.scoreStatus.miss'),
            value: 'miss'
        },
        {
            name: t('dropDown.scoreStatus.sb'),
            value: 'sb'
        },
    ],
    beatmapStatus: [
        {
            name: t('dropDown.beatmapStatus.ranked'),
            value: 'ranked'
        },
        {
            name: t('dropDown.beatmapStatus.approved'),
            value: 'approved'
        },
        {
            name: t('dropDown.beatmapStatus.loved'),
            value: 'loved'
        },
        {
            name: t('dropDown.beatmapStatus.unranked'),
            value: 'unranked'
        }
    ],
    beatmapMode: [
        {
            name: 'osu!',
            value: 'osu'
        },
        {
            name: 'osu!catch',
            value: 'fruits'
        },
        {
            name: 'osu!taiko',
            value: 'taiko'
        },
        {
            name: 'osu!mania',
            value: 'mania'
        }
    ],
    maniaKeys: [
        {
            name: t('dropDown.maniaKeys.noChange'),
            value: 0
        },
        {
            name: '1K',
            value: 1
        },
        {
            name: '2K',
            value: 2
        },
        {
            name: '3K',
            value: 3
        },
        {
            name: '4K',
            value: 4
        },
        {
            name: '5K',
            value: 5
        },
        {
            name: '6K',
            value: 6
        },
        {
            name: '7K',
            value: 7
        },
        {
            name: '8K',
            value: 8
        },
        {
            name: '9K',
            value: 9
        },
    ],
    aspectRatio: [
        {
            name: '16:9',
            value: '16by9'
        },
        {
            name: '16:10',
            value: '16by10'
        },
        {
            name: '4:3',
            value: '4by3'
        }
    ],
    exportType: [
        {
            name: 'png',
            value: 'png'
        },
        {
            name: 'jpg',
            value: 'jpeg'
        },
        {
            name: 'webp',
            value: 'webp'
        }
    ]
}
countryList.forEach((item) => {
    const newOption = {
        name: item.name,
        value: item.code
    }
    dropDownOptions.countryCode.push(newOption)
})
// Cover
const coverData: CoverData = reactive({
    user: {
        id: 0,
        userName: 'player',
        code: '',
        globalRank: 0,
        countryRank: 0
    },
    score: {
        pp: 0,
        status: {
            type: 'fc',
            value: 0
        },
        rank: 0,
        accuracy: 0,
        maxCombo: {
            value: 0,
            perfect: false
        },
    },
    beatmap: {
        id: 0,
        title: 'Song Title',
        artist: 'Artist',
        creator: 'Mapper',
        mode: 'osu',
        status: 'ranked',
        stats: {
            time: '0:00',
            bpm: 0,
            ar: 0,
            cs: 0,
            od: 0,
            hp: 0
        },
        difficulty: {
            star: 0,
            name: 'Easy'
        },
        mods: {
            ez: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            },
            nf: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            },
            ht: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            },
            hd: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            },
            hr: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            },
            dt: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            },
            nc: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            },
            fl: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            },
            sd: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            },
            pf: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            },
            rx: {
                mode: ['osu', 'taiko', 'fruits'],
                enabled: false
            },
            ap:
            {
                mode: ['osu'],
                enabled: false
            },
            so: {
                mode: ['osu'],
                enabled: false
            },
            cp: {
                mode: ['mania'],
                enabled: false
            },
            mr: {
                mode: ['mania'],
                enabled: false
            },
            rd: {
                mode: ['mania'],
                enabled: false
            },
            v2: {
                mode: ['osu', 'taiko', 'fruits', 'mania'],
                enabled: false
            }
        },
        keys: 0
    },
    comment: 'Comment'
})
const coverAssets: CoverAssets = reactive({
    user: {
        avatar: new Image(),
        flag: new Image(),
        defaults: {
            avatar: new Image(),
            flag: new Image()
        }
    },
    beatmap: {
        background: new Image(),
        statusIcons: {
            ranked: new Image(),
            approved: new Image(),
            loved: new Image(),
            unranked: new Image()
        },
        modeIcons: {
            osu: new Image(),
            fruits: new Image(),
            taiko: new Image(),
            mania: new Image()
        },
        defaults: {
            background: new Image()
        }
    }
})
const coverOptions: { render: RenderOptions, exportType: string } = reactive({
    render: {
        ratio: '16by10',
        scale: '1',
        show: {
            pp: true,
            rank: true,
            beatmapStats: {
                time: false,
                bpm: false,
                ar: true,
                cs: true,
                od: false,
                hp: false
            }
        }
    },
    exportType: 'png'
})
const coverPreview = new RenderV1()
// Cover methods
const setAvatar = async (file: File) => {
    coverAssets.user.avatar = await loadImgFile(file)
}
const setBackground = async (file: File) => {
    coverAssets.beatmap.background = await loadImgFile(file)
}
const downloadCover = async () => {
    const data = coverData
    const assets = coverAssets
    const options = coverOptions
    try {
        const blob = await exportCover(data, assets, options.render, options.exportType)
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = fileName(data, options.render, options.exportType)
        a.click()
        URL.revokeObjectURL(url)
    } catch (err) {
        console.log(`Download failed! ${err}`)
    }
}
const copyCover = async () => {
    const data = coverData
    const assets = coverAssets
    const options = coverOptions
    try {
        const blob = await exportCover(data, assets, options.render, 'png')
        const cp = [new ClipboardItem({ [blob.type]: blob })]
        navigator.clipboard.write(cp)
    } catch (err) {
        console.log(`Copy failed! ${err}`)
    }
}
// Data fetching
const dataFetchingArgs = reactive({
    user: {
        id: 0
    },
    beatmap: {
        id: 0
    },
    score: {
        id: '865991545'
    },
    unicode: false,
    converted: ''
})
const setScoreData = async () => {
    const newData = await loadScoreData(dataFetchingArgs.score.id, dataFetchingArgs.unicode)
    if (newData) {
        Object.assign(coverData, { ...coverData, ...newData })
        coverAssets.user.avatar = await loadImgUrl(newData.avatarUrl,)
        coverAssets.beatmap.background = await loadImgUrl(newData.backgroundUrl)
    }
}
const setUserData = async () => {
    const newData = await loadUserData(dataFetchingArgs.user.id)
    if (newData) {
        Object.assign(coverData.user, newData.user)
        coverAssets.user.avatar = await loadImgUrl(newData.avatarUrl)
        coverData.user.id = dataFetchingArgs.user.id
    }
}
const setBeatmapData = async () => {
    const newData = await loadBeatmapData(dataFetchingArgs.beatmap.id, coverData.beatmap.mods, dataFetchingArgs.unicode)
    if (newData) {
        Object.assign(coverData.beatmap, newData.beatmap)
        coverAssets.beatmap.background = await loadImgUrl(newData.backgroundUrl)
        coverData.beatmap.id = dataFetchingArgs.beatmap.id
    }
}
// Misc
const checkModAvailability = (mod: CoverData['beatmap']['mods'][keyof CoverData['beatmap']['mods']], mode: CoverData['beatmap']['mode']) => {
    let available = false
    mod.mode.forEach((value) => {
        if (value === mode) {
            available = true
            return
        }
    })
    if (available === false)
        mod.enabled = false
    return available
}
// vue methods
onMounted(async () => {
    const previewCv = coverPreview.canvas
    previewCv.style.width = '100%'
    previewCv.style.height = '100%'
    const previewDiv = document.getElementById("cover-preview") as HTMLDivElement
    previewDiv.append(previewCv)
    await initAssets(coverAssets)
    coverPreview.draw(coverData, coverAssets)
})
watchEffect(async () => coverAssets.user.flag = await flagIcon(coverData.user.code))
watchEffect(() => {
    // refersh preview when any option changes
    const previewOptions = coverPreview.options
    previewOptions.ratio = coverOptions.render.ratio
    previewOptions.show = coverOptions.render.show
    coverPreview.draw(coverData, coverAssets)
})
watchEffect(
    // refresh beatmap star and stats when mod changes
    async () => {
        const newData = await loadBeatmapData(coverData.beatmap.id, coverData.beatmap.mods, false)
        if (newData) {
            Object.assign(coverData.beatmap.stats, newData.beatmap.stats)
            coverData.beatmap.difficulty.star = newData.beatmap.difficulty!.star
        }
    }
)
</script>
<template>
    <div class="cover-generator">
        <div class="cover-preview" id="cover-preview"></div>
        <div class="cover-settings">
            <div class="cover-settings-half">
                <Collapsible :title="t('collapsibleHeader.dataFetching')" id="cover-settings-data-fetching">
                    <Flex :column="true" gap=".75rem">
                        <Flex :column="true" gap=".75rem">
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.dataFetching.userId') }}</PropTitle>
                                <Flex>
                                    <TextInput :number="true" placeholder="0" v-model:value="dataFetchingArgs.user.id">
                                    </TextInput>
                                    <Button @click="setUserData">{{ t('button.ok') }}</Button>
                                </Flex>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.dataFetching.beatmapId') }}</PropTitle>
                                <Flex>
                                    <TextInput :number="true" placeholder="0"
                                        v-model:value="dataFetchingArgs.beatmap.id">
                                    </TextInput>
                                    <Button @click="setBeatmapData">{{ t('button.ok') }}</Button>
                                </Flex>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.dataFetching.scoreId') }}</PropTitle>
                                <Flex>
                                    <TextInput placeholder="865991545"
                                        v-model:value="dataFetchingArgs.score.id">
                                    </TextInput>
                                    <Button @click="setScoreData">{{ t('button.ok') }}</Button>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex width="fit-content" :column="true">
                                <PropTitle>{{ t('propTitle.dataFetching.unicode') }}</PropTitle>
                                <Switch size="large" v-model:checked="dataFetchingArgs.unicode"></Switch>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.dataFetching.convertedBeatmap') }}</PropTitle>
                                <Dropdown :options="dropDownOptions.convertedBeatmap"
                                    v-model:selected="dataFetchingArgs.converted">
                                </Dropdown>
                            </Flex>
                        </Flex>
                    </Flex>
                </Collapsible>
                <Collapsible :title="t('collapsibleHeader.player')" id="cover-settings-user">
                    <Flex gap=".75rem">
                        <Flex width="fit-content" :column="true">
                            <PropTitle>{{ t('propTitle.player.avatar') }}</PropTitle>
                            <DragDrop width="6.375rem" height="6.375rem" @change="setAvatar"></DragDrop>
                        </Flex>
                        <Flex :column="true" gap=".75rem">
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.player.userName') }}</PropTitle>
                                <TextInput placeholder="alivemaster" v-model:value="coverData.user.userName">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.player.flag') }}</PropTitle>
                                <Dropdown :filter="true" :options="dropDownOptions.countryCode" v-model:selected="coverData.user.code">
                                </Dropdown>
                            </Flex>
                        </Flex>
                    </Flex>
                </Collapsible>
                <Collapsible :title="t('collapsibleHeader.score')" id="cover-settings-score">
                    <Flex :column="true" gap=".75rem">
                        <Flex :column="true">
                            <Flex gap="auto">
                                <PropTitle>PP</PropTitle>
                                <Switch v-model:checked="coverOptions.render.show.pp"></Switch>
                            </Flex>
                            <TextInput :enabled="coverOptions.render.show.pp" :number="true" placeholder="0"
                                v-model:value="coverData.score.pp">
                            </TextInput>
                        </Flex>
                        <Flex :column="true">
                            <PropTitle>{{ t('propTitle.score.status') }}</PropTitle>
                            <Flex>
                                <Dropdown :options="dropDownOptions.scoreStatus"
                                    v-model:selected="coverData.score.status.type">
                                </Dropdown>
                                <TextInput
                                    :enabled="coverData.score.status.type === 'miss' || coverData.score.status.type === 'sb'"
                                    :number="true" placeholder="0" v-model:value="coverData.score.status.value">
                                </TextInput>
                            </Flex>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>{{ t('propTitle.score.rank') }}</PropTitle>
                                    <Switch v-model:checked="coverOptions.render.show.rank"></Switch>
                                </Flex>
                                <TextInput :enabled="coverOptions.render.show.rank" :number="true" placeholder="0"
                                    v-model:value="coverData.score.rank">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.score.accuracy') }}</PropTitle>
                                <TextInput :number="true" placeholder="0" v-model:value="coverData.score.accuracy">
                                </TextInput>
                            </Flex>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex width="fit-content" :column="true">
                                <PropTitle>{{ t('propTitle.score.perfect') }}</PropTitle>
                                <Switch size="large" v-model:checked="coverData.score.maxCombo.perfect"></Switch>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.score.maxCombo') }}</PropTitle>
                                <TextInput :number="true" placeholder="0"
                                    v-model:value="coverData.score.maxCombo.value">
                                </TextInput>
                            </Flex>
                        </Flex>
                    </Flex>
                </Collapsible>
                <Collapsible :title="t('collapsibleHeader.beatmap')" id="cover-settings-beatmap">
                    <Flex :column="true" gap=".75rem">
                        <Flex :column="true">
                            <PropTitle>{{ t('propTitle.beatmap.title') }}</PropTitle>
                            <TextInput placeholder="No Title" v-model:value="coverData.beatmap.title">
                            </TextInput>
                        </Flex>
                        <Flex :column="true">
                            <PropTitle>{{ t('propTitle.beatmap.bg') }}</PropTitle>
                            <DragDrop width="100%" @change="setBackground"></DragDrop>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex width="fit-content" :column="true">
                                <PropTitle>{{ t('propTitle.beatmap.status') }}</PropTitle>
                                <Dropdown :options="dropDownOptions.beatmapStatus"
                                    v-model:selected="coverData.beatmap.status">
                                </Dropdown>
                            </Flex>
                            <Flex width="fit-content" :column="true">
                                <PropTitle>{{ t('propTitle.beatmap.mode') }}</PropTitle>
                                <Dropdown :options="dropDownOptions.beatmapMode"
                                    v-model:selected="coverData.beatmap.mode">
                                </Dropdown>
                            </Flex>
                        </Flex>
                    </Flex>
                </Collapsible>
            </div>
            <div class="cover-settings-half">
                <Collapsible :title="t('collapsibleHeader.difficulty')" id="cover-settings-difficulty">
                    <Flex :column="true" gap=".75rem">
                        <Flex gap=".75rem">
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>{{ t('propTitle.difficulty.time') }}</PropTitle>
                                    <Switch v-model:checked="coverOptions.render.show.beatmapStats.time"></Switch>
                                </Flex>
                                <TextInput :enabled="coverOptions.render.show.beatmapStats.time" placeholder="00:00"
                                    v-model:value="coverData.beatmap.stats.time">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>BPM</PropTitle>
                                    <Switch v-model:checked="coverOptions.render.show.beatmapStats.bpm"></Switch>
                                </Flex>
                                <TextInput :enabled="coverOptions.render.show.beatmapStats.bpm" :number="true"
                                    placeholder="0" v-model:value="coverData.beatmap.stats.bpm">
                                </TextInput>
                            </Flex>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>AR</PropTitle>
                                    <Switch v-model:checked="coverOptions.render.show.beatmapStats.ar"></Switch>
                                </Flex>
                                <TextInput :enabled="coverOptions.render.show.beatmapStats.ar" :number="true"
                                    placeholder="0" v-model:value="coverData.beatmap.stats.ar">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>CS</PropTitle>
                                    <Switch v-model:checked="coverOptions.render.show.beatmapStats.cs"></Switch>
                                </Flex>
                                <TextInput :enabled="coverOptions.render.show.beatmapStats.cs" :number="true"
                                    placeholder="0" v-model:value="coverData.beatmap.stats.cs">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>OD</PropTitle>
                                    <Switch v-model:checked="coverOptions.render.show.beatmapStats.od"></Switch>
                                </Flex>
                                <TextInput :enabled="coverOptions.render.show.beatmapStats.od" :number="true"
                                    placeholder="0" v-model:value="coverData.beatmap.stats.od">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>HP</PropTitle>
                                    <Switch v-model:checked="coverOptions.render.show.beatmapStats.hp"></Switch>
                                </Flex>
                                <TextInput :enabled="coverOptions.render.show.beatmapStats.hp" :number="true"
                                    placeholder="0" v-model:value="coverData.beatmap.stats.hp">
                                </TextInput>
                            </Flex>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.difficulty.star') }}</PropTitle>
                                <TextInput :number="true" v-model:value="coverData.beatmap.difficulty.star"
                                    placeholder="0">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.difficulty.diffName') }}</PropTitle>
                                <TextInput v-model:value="coverData.beatmap.difficulty.name" placeholder="Easy">
                                </TextInput>
                            </Flex>
                        </Flex>
                        <Flex :column="true">
                            <PropTitle>{{ t('propTitle.difficulty.mods') }}</PropTitle>
                            <Flex :wrap="true">
                                <template v-for="(item, key) in coverData.beatmap.mods" :key="key">
                                    <ModSelect v-show="checkModAvailability(item, coverData.beatmap.mode)" :type="key"
                                        v-model:checked="item.enabled">
                                    </ModSelect>
                                </template>
                            </Flex>
                        </Flex>
                        <Flex v-show="coverData.beatmap.mode === 'mania'" width="fit-content" :column="true">
                            <PropTitle>{{ t('propTitle.difficulty.maniaKeys') }}</PropTitle>
                            <Dropdown :options="dropDownOptions.maniaKeys" v-model:selected="coverData.beatmap.keys">
                            </Dropdown>
                        </Flex>
                    </Flex>
                </Collapsible>
                <Collapsible :title="t('collapsibleHeader.comment')" id="cover-settings-comment">
                    <TextArea v-model:value="coverData.comment" placeholder="WYSI"></TextArea>
                </Collapsible>
                <Collapsible :title="t('collapsibleHeader.export')" id="cover-settings-export">
                    <Flex :column="true" gap=".75rem">
                        <Flex :column="true">
                            <PropTitle>{{ t('propTitle.export.aspectRatio') }}</PropTitle>
                            <Dropdown :options="dropDownOptions.aspectRatio"
                                v-model:selected="coverOptions.render.ratio">
                            </Dropdown>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex :column="true">
                                <PropTitle>{{ t('propTitle.export.scale') }}</PropTitle>
                                <TextInput :number="true" v-model:value="coverOptions.render.scale" placeholder="1">
                                </TextInput>
                            </Flex>
                            <Flex :column="true" width="fit-content">
                                <PropTitle>{{ t('propTitle.export.type') }}</PropTitle>
                                <Dropdown :options="dropDownOptions.exportType"
                                    v-model:selected="coverOptions.exportType">
                                </Dropdown>
                            </Flex>
                        </Flex>
                        <Flex>
                            <Button @click="downloadCover">{{ t('button.download') }}</Button>
                            <Button @click="copyCover">{{ t('button.copy') }}</Button>
                        </Flex>
                    </Flex>
                </Collapsible>
            </div>
        </div>
    </div>
</template>
<style scoped>
.cover-generator {
    /* box */
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 0 1rem;
}

.cover-preview {
    /* box */
    display: flex;
    width: 100%;
    height: fit-content;

    /* visual */
    overflow: hidden;
    border-radius: 1.5rem;
}

.cover-settings {
    /* box */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: 1rem;
    width: 27rem;
    height: fit-content;
}

.cover-settings-half {
    /* box */
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: fit-content;
}

@media screen and (width < 1080px) {
    .cover-generator {
        /* box */
        flex-direction: column;
        margin: 0;
    }

    .cover-preview {
        /* visual */
        border-radius: 0;
    }


    .cover-settings {
        /* box */
        width: 100%;
        padding: 0 .25rem;
    }
}

@media screen and (720px < width < 1080px) {
    .cover-settings {
        /* box */
        flex-direction: row;
    }
}
</style>