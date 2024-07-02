<script setup lang="ts">
import { reactive, onMounted, watchEffect, watch } from 'vue'
import CoverData from './cover/CoverData'
import CoverAssets from './cover/CoverAssets'
import CoverRender from './cover/CoverRender'
import initAssets from './cover/utils/initAssets'
import flagIcon from './cover/utils/flagIcon'
import exportCover from './cover/utils/exportCover'
import loadImgFile from './utils/loadImgFile'
import countryList from './assets/countries.json'
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

// Dropdown Options
const dropDownOptions = {
    countryCode: [
        {
            name: "None",
            value: ""
        }
    ],
    scoreStatus: [
        {
            name: 'SS',
            value: 'ss'
        },
        {
            name: 'FC',
            value: 'fc'
        },
        {
            name: 'Failed',
            value: 'fail'
        },
        {
            name: 'Miss',
            value: 'miss'
        },
        {
            name: 'SliderBreak',
            value: 'sb'
        },
    ],
    beatmapState: [
        {
            name: 'Ranked',
            value: 'ranked'
        },
        {
            name: 'Approved / Qualified',
            value: 'approved'
        },
        {
            name: 'Loved',
            value: 'loved'
        },
        {
            name: 'Pending / WIP / Graveyard / Not Submitted',
            value: 'unranked'
        }
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
    const newFlagOption = {
        name: item.name,
        value: item.code
    }
    dropDownOptions.countryCode.push(newFlagOption)
})
// Cover
const coverData: CoverData = reactive({
    user: {
        userName: 'player',
        code: ''
    },
    score: {
        pp: {
            value: '0',
            enabled: true
        },
        status: {
            type: 'fc',
            value: '0'
        },
        rank: {
            value: '0',
            enabled: true
        },
        accuracy: '0',
        maxCombo: {
            value: '0',
            perfect: false
        },
    },
    beatmap: {
        title: 'Song Title',
        state: 'ranked',
        stats: {
            time: {
                enabled: false,
                value: '0:00'
            },
            bpm: {
                enabled: false,
                value: '0'
            },
            ar: {
                enabled: true,
                value: '0'
            },
            cs: {
                enabled: true,
                value: '0'
            },
            od: {
                enabled: false,
                value: '0'
            },
            hp: {
                enabled: false,
                value: '0'
            }
        },
        difficulty: {
            star: '0',
            name: 'Easy'
        },
        mods: {
            ez: {
                enabled: false
            },
            nf: {
                enabled: false
            },
            ht: {
                enabled: false
            },
            hd: {
                enabled: false
            },
            hr: {
                enabled: false
            },
            dt: {
                enabled: false
            },
            nc: {
                enabled: false
            },
            fl: {
                enabled: false
            },
            sd: {
                enabled: false
            },
            pf: {
                enabled: false
            },
            rx: {
                enabled: false
            },
            ap:
            {
                enabled: false
            },
            so: {
                enabled: false
            },
            v2: {
                enabled: false
            }
        }
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
        stateIcons: {
            ranked: new Image(),
            approved: new Image(),
            loved: new Image(),
            unranked: new Image()
        },
        defaults: {
            background: new Image()
        }
    }
})
const coverPreview = new CoverRender()
const renderOptions = reactive({
    ratio: '16by10',
    scale: '1',
    type: 'png'
})
// Cover methods
const changeAvatar = async (file: File) => {
    coverAssets.user.avatar = await loadImgFile(file)
}
const changeBeatmapBackground = async (file: File) => {
    coverAssets.beatmap.background = await loadImgFile(file)
}
const downloadCover = async () => {
    const data = coverData
    const assets = coverAssets
    const options = renderOptions
    const fileName = () => {
        const username = data.user.userName
        const beatmapTitle = '-' + data.beatmap.title
        const diffName = '[' + data.beatmap.difficulty.name + ']'
        const mods = () => {
            let str = ''
            const modsKeys = Object.keys(data.beatmap.mods)
            modsKeys.forEach((key) => {
                const item = data.beatmap.mods[key as keyof typeof data.beatmap.mods]
                if (item.enabled)
                    str += key.toUpperCase()
            })
            if (str !== '') str = '-' + str
            return str
        }
        const scoreStatus = '-' + (data.score.status.type === 'miss' || data.score.status.type === 'sb' ? data.score.status.value : '') + data.score.status.type.toUpperCase()
        const accuracy = '-' + data.score.accuracy + '%'
        const pp = () => {
            if (data.score.pp.enabled)
                return '-' + data.score.pp.value + 'PP'
            else return ''
        }
        return username + beatmapTitle + diffName + mods() + scoreStatus + accuracy + pp() + '-' + options.ratio + '-' + options.scale + 'x'
    }
    try {
        const blob = await exportCover(data, assets, options.ratio, Number(options.scale), options.type)
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = fileName()
        a.click()
        URL.revokeObjectURL(url)
    } catch (err) {
        console.log(`Download failed! ${err}`)
    }
}
const copyCover = async () => {
    const data = coverData
    const assets = coverAssets
    const options = renderOptions
    try {
        const blob = await exportCover(data, assets, options.ratio, Number(options.scale), 'png')
        const cp = [new ClipboardItem({ [blob.type]: blob })]
        navigator.clipboard.write(cp)
    } catch (err) {
        console.log(`Copy failed! ${err}`)
    }
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
watchEffect(() => coverPreview.draw(coverData, coverAssets))
watch(
    renderOptions,
    (options) => {
        coverPreview.ratio = options.ratio as typeof coverPreview.ratio
        coverPreview.draw(coverData, coverAssets)
    }
)
</script>
<template>
    <div class="cover-generator">
        <div class="cover-preview" id="cover-preview"></div>
        <div class="cover-settings">
            <div class="cover-settings-half">
                <Collapsible title="Player" id="cover-settings-user">
                    <Flex gap=".75rem">
                        <Flex width="fit-content" :column="true">
                            <PropTitle>Avatar</PropTitle>
                            <DragDrop width="6.375rem" height="6.375rem" @change="changeAvatar"></DragDrop>
                        </Flex>
                        <Flex :column="true" gap=".75rem">
                            <Flex :column="true">
                                <PropTitle>Username</PropTitle>
                                <TextInput placeholder="alivemaster" v-model:value="coverData.user.userName">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>Flag</PropTitle>
                                <Dropdown :options="dropDownOptions.countryCode" v-model:selected="coverData.user.code">
                                </Dropdown>
                            </Flex>
                        </Flex>
                    </Flex>
                </Collapsible>
                <Collapsible title="Score" id="cover-settings-score">
                    <Flex :column="true" gap=".75rem">
                        <Flex :column="true">
                            <Flex gap="auto">
                                <PropTitle>PP</PropTitle>
                                <Switch v-model:checked="coverData.score.pp.enabled"></Switch>
                            </Flex>
                            <TextInput :enabled="coverData.score.pp.enabled" :number="true" placeholder="0"
                                v-model:value="coverData.score.pp.value">
                            </TextInput>
                        </Flex>
                        <Flex :column="true">
                            <PropTitle>Score Status</PropTitle>
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
                                    <PropTitle>Rank</PropTitle>
                                    <Switch v-model:checked="coverData.score.rank.enabled"></Switch>
                                </Flex>
                                <TextInput :enabled="coverData.score.rank.enabled" :number="true" placeholder="0"
                                    v-model:value="coverData.score.rank.value">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>Accuracy</PropTitle>
                                <TextInput :number="true" placeholder="0" v-model:value="coverData.score.accuracy">
                                </TextInput>
                            </Flex>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex width="fit-content" :column="true">
                                <PropTitle>Perfect</PropTitle>
                                <Switch size="large" v-model:checked="coverData.score.maxCombo.perfect"></Switch>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>Max Combo</PropTitle>
                                <TextInput :number="true" placeholder="0"
                                    v-model:value="coverData.score.maxCombo.value">
                                </TextInput>
                            </Flex>
                        </Flex>
                    </Flex>
                </Collapsible>
                <Collapsible title="Beatmap" id="cover-settings-beatmap">
                    <Flex :column="true" gap=".75rem">
                        <Flex :column="true">
                            <PropTitle>Title</PropTitle>
                            <TextInput placeholder="No Title" v-model:value="coverData.beatmap.title">
                            </TextInput>
                        </Flex>
                        <Flex :column="true">
                            <PropTitle>Background</PropTitle>
                            <DragDrop width="100%" @change="changeBeatmapBackground"></DragDrop>
                        </Flex>
                        <Flex :column="true">
                            <PropTitle>Beatmap State</PropTitle>
                            <Dropdown :options="dropDownOptions.beatmapState"
                                v-model:selected="coverData.beatmap.state">
                            </Dropdown>
                        </Flex>
                    </Flex>
                </Collapsible>
            </div>
            <div class="cover-settings-half">
                <Collapsible title="Difficulty" id="cover-settings-difficulty">
                    <Flex :column="true" gap=".75rem">
                        <Flex gap=".75rem">
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>Time</PropTitle>
                                    <Switch v-model:checked="coverData.beatmap.stats.time.enabled"></Switch>
                                </Flex>
                                <TextInput :enabled="coverData.beatmap.stats.time.enabled" placeholder="00:00"
                                    v-model:value="coverData.beatmap.stats.time.value">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>BPM</PropTitle>
                                    <Switch v-model:checked="coverData.beatmap.stats.bpm.enabled"></Switch>
                                </Flex>
                                <TextInput :enabled="coverData.beatmap.stats.bpm.enabled" :number="true" placeholder="0"
                                    v-model:value="coverData.beatmap.stats.bpm.value">
                                </TextInput>
                            </Flex>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>AR</PropTitle>
                                    <Switch v-model:checked="coverData.beatmap.stats.ar.enabled"></Switch>
                                </Flex>
                                <TextInput :enabled="coverData.beatmap.stats.ar.enabled" :number="true" placeholder="0"
                                    v-model:value="coverData.beatmap.stats.ar.value">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>CS</PropTitle>
                                    <Switch v-model:checked="coverData.beatmap.stats.cs.enabled"></Switch>
                                </Flex>
                                <TextInput :enabled="coverData.beatmap.stats.cs.enabled" :number="true" placeholder="0"
                                    v-model:value="coverData.beatmap.stats.cs.value">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>OD</PropTitle>
                                    <Switch v-model:checked="coverData.beatmap.stats.od.enabled"></Switch>
                                </Flex>
                                <TextInput :enabled="coverData.beatmap.stats.od.enabled" :number="true" placeholder="0"
                                    v-model:value="coverData.beatmap.stats.od.value">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <Flex gap="auto">
                                    <PropTitle>HP</PropTitle>
                                    <Switch v-model:checked="coverData.beatmap.stats.hp.enabled"></Switch>
                                </Flex>
                                <TextInput :enabled="coverData.beatmap.stats.hp.enabled" :number="true" placeholder="0"
                                    v-model:value="coverData.beatmap.stats.hp.value">
                                </TextInput>
                            </Flex>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex :column="true">
                                <PropTitle>Star</PropTitle>
                                <TextInput :number="true" v-model:value="coverData.beatmap.difficulty.star"
                                    placeholder="0">
                                </TextInput>
                            </Flex>
                            <Flex :column="true">
                                <PropTitle>Diff Name</PropTitle>
                                <TextInput v-model:value="coverData.beatmap.difficulty.name" placeholder="Easy">
                                </TextInput>
                            </Flex>
                        </Flex>
                        <Flex :column="true">
                            <PropTitle>Mods</PropTitle>
                            <Flex :wrap="true">
                                <ModSelect v-for="(item, key) in coverData.beatmap.mods" :type="key"
                                    v-model:checked="item.enabled">
                                </ModSelect>
                            </Flex>
                        </Flex>
                    </Flex>
                </Collapsible>
                <Collapsible title="Comment" id="cover-settings-comment">
                    <TextArea v-model:value="coverData.comment" placeholder="WYSI"></TextArea>
                </Collapsible>
                <Collapsible title="Export" id="cover-settings-export">
                    <Flex :column="true" gap=".75rem">
                        <Flex :column="true">
                            <PropTitle>Aspect Ratio</PropTitle>
                            <Dropdown :options="dropDownOptions.aspectRatio" v-model:selected="renderOptions.ratio">
                            </Dropdown>
                        </Flex>
                        <Flex gap=".75rem">
                            <Flex :column="true">
                                <PropTitle>Scale</PropTitle>
                                <TextInput :number="true" v-model:value="renderOptions.scale" placeholder="1">
                                </TextInput>
                            </Flex>
                            <Flex :column="true" width="fit-content">
                                <PropTitle>Type</PropTitle>
                                <Dropdown :options="dropDownOptions.exportType" v-model:selected="renderOptions.type">
                                </Dropdown>
                            </Flex>
                        </Flex>
                        <Flex>
                            <Button @click="downloadCover">Download</Button>
                            <Button @click="copyCover">Copy</Button>
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