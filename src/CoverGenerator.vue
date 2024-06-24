<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import CoverData from './cover/CoverData'
import CoverRender from './cover/CoverRender'
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
    flag: [
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
    dropDownOptions.flag.push(newFlagOption)
})
// Cover
const coverData: CoverData = reactive({
    user: {
        avatar: new Image(),
        userName: 'player',
        flag: new Image()
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
        background: new Image(),
        title: 'Song Title',
        state: 'ranked',
        stats: [
            {
                type: 'time',
                value: '0:00',
                enabled: false
            },
            {
                type: 'bpm',
                value: '0',
                enabled: false
            },
            {
                type: 'ar',
                value: '0',
                enabled: true
            },
            {
                type: 'cs',
                value: '0',
                enabled: true
            },
            {
                type: 'od',
                value: '0',
                enabled: false
            },
            {
                type: 'hp',
                value: '0',
                enabled: false
            },
        ],
        difficulty: {
            star: '0',
            name: 'Easy'
        },
        mods: [
            {
                type: 'ez',
                enabled: false
            },
            {
                type: 'nf',
                enabled: false
            },
            {
                type: 'ht',
                enabled: false
            },
            {
                type: 'hd',
                enabled: false
            },
            {
                type: 'hr',
                enabled: false
            },
            {
                type: 'dt',
                enabled: false
            },
            {
                type: 'nc',
                enabled: false
            },
            {
                type: 'fl',
                enabled: false
            },
            {
                type: 'sd',
                enabled: false
            },
            {
                type: 'pf',
                enabled: false
            },
            {
                type: 'rx',
                enabled: false
            },
            {
                type: 'ap',
                enabled: false
            },
            {
                type: 'so',
                enabled: false
            },
            {
                type: 'v2',
                enabled: false
            },
        ]
    },
    comment: 'Comment'
})
const coverPreview = new CoverRender()
onMounted(() => {
    const previewCv = coverPreview.canvas
    previewCv.style.width = '100%'
    previewCv.style.height = '100%'
    const previewDiv = document.getElementById("cover-preview") as HTMLDivElement
    previewDiv.append(previewCv)
    coverPreview.init().then(() => coverPreview.draw(coverData))
})
watch(
    coverData,
    (data) => coverPreview.draw(data)
)
</script>
<template>
    <div id="cover-generator">
        <div id="cover-preview"></div>
        <div id="cover-settings">
            <Collapsible title="Player" id="cover-settings-user">
                <Flex gap=".75rem">
                    <Flex width="fit-content" :column="true">
                        <PropTitle>Avatar</PropTitle>
                        <DragDrop width="6.375rem" height="6.375rem"></DragDrop>
                    </Flex>
                    <Flex :column="true" gap=".75rem">
                        <Flex :column="true">
                            <PropTitle>Username</PropTitle>
                            <TextInput placeholder="alivemaster" v-model:value="coverData.user.userName">
                            </TextInput>
                        </Flex>
                        <Flex :column="true">
                            <PropTitle>Flag</PropTitle>
                            <Dropdown :options="dropDownOptions.flag" selected=""></Dropdown>
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
                            <TextInput :number="true" placeholder="0" v-model:value="coverData.score.maxCombo.value">
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
                        <DragDrop width="100%"></DragDrop>
                    </Flex>
                    <Flex :column="true">
                        <PropTitle>Beatmap State</PropTitle>
                        <Dropdown :options="dropDownOptions.beatmapState" v-model:selected="coverData.beatmap.state">
                        </Dropdown>
                    </Flex>
                </Flex>
            </Collapsible>
            <Collapsible title="Difficulty" id="cover-settings-difficulty">
                <Flex :column="true" gap=".75rem">
                    <Flex gap=".75rem">
                        <Flex :column="true">
                            <Flex gap="auto">
                                <PropTitle>Time</PropTitle>
                                <Switch v-model:checked="coverData.beatmap.stats[0].enabled"></Switch>
                            </Flex>
                            <TextInput :enabled="coverData.beatmap.stats[0].enabled" placeholder="00:00"
                                v-model:value="coverData.beatmap.stats[0].value">
                            </TextInput>
                        </Flex>
                        <Flex :column="true">
                            <Flex gap="auto">
                                <PropTitle>BPM</PropTitle>
                                <Switch v-model:checked="coverData.beatmap.stats[1].enabled"></Switch>
                            </Flex>
                            <TextInput :enabled="coverData.beatmap.stats[1].enabled" :number="true" placeholder="0"
                                v-model:value="coverData.beatmap.stats[1].value">
                            </TextInput>
                        </Flex>
                    </Flex>
                    <Flex gap=".75rem">
                        <Flex :column="true">
                            <Flex gap="auto">
                                <PropTitle>AR</PropTitle>
                                <Switch v-model:checked="coverData.beatmap.stats[2].enabled"></Switch>
                            </Flex>
                            <TextInput :enabled="coverData.beatmap.stats[2].enabled" :number="true" placeholder="0"
                                v-model:value="coverData.beatmap.stats[2].value">
                            </TextInput>
                        </Flex>
                        <Flex :column="true">
                            <Flex gap="auto">
                                <PropTitle>CS</PropTitle>
                                <Switch v-model:checked="coverData.beatmap.stats[3].enabled"></Switch>
                            </Flex>
                            <TextInput :enabled="coverData.beatmap.stats[3].enabled" :number="true" placeholder="0"
                                v-model:value="coverData.beatmap.stats[3].value">
                            </TextInput>
                        </Flex>
                        <Flex :column="true">
                            <Flex gap="auto">
                                <PropTitle>OD</PropTitle>
                                <Switch v-model:checked="coverData.beatmap.stats[4].enabled"></Switch>
                            </Flex>
                            <TextInput :enabled="coverData.beatmap.stats[4].enabled" :number="true" placeholder="0"
                                v-model:value="coverData.beatmap.stats[4].value">
                            </TextInput>
                        </Flex>
                        <Flex :column="true">
                            <Flex gap="auto">
                                <PropTitle>HP</PropTitle>
                                <Switch v-model:checked="coverData.beatmap.stats[5].enabled"></Switch>
                            </Flex>
                            <TextInput :enabled="coverData.beatmap.stats[5].enabled" :number="true" placeholder="0"
                                v-model:value="coverData.beatmap.stats[5].value">
                            </TextInput>
                        </Flex>
                    </Flex>
                    <Flex gap=".75rem">
                        <Flex :column="true">
                            <PropTitle>Star</PropTitle>
                            <TextInput :number="true" v-model:value="coverData.beatmap.difficulty.star" placeholder="0">
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
                            <ModSelect v-for="mod in coverData.beatmap.mods" :type="mod.type"
                                v-model:checked="mod.enabled"></ModSelect>
                        </Flex>
                    </Flex>
                </Flex>
            </Collapsible>
            <Collapsible title="Comment" id="cover-settings-comment">
                <TextArea placeholder="WYSI" v-model:value="coverData.comment"></TextArea>
            </Collapsible>
            <Collapsible title="Export" id="cover-settings-export">
                <Flex :column="true" gap=".75rem">
                    <Flex gap=".75rem">
                        <Flex :column="true">
                            <PropTitle>Scale</PropTitle>
                            <TextInput :number="true" placeholder="1">
                            </TextInput>
                        </Flex>
                        <Flex :column="true" width="fit-content">
                            <PropTitle>Type</PropTitle>
                            <Dropdown :options="dropDownOptions.exportType" selected="png">
                            </Dropdown>
                        </Flex>
                    </Flex>
                    <Flex>
                        <Button>Download</Button>
                        <Button>Copy</Button>
                    </Flex>
                </Flex>
            </Collapsible>
        </div>
    </div>
</template>
<style scoped>
#cover-generator {
    /* box */
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    margin: 0 3rem;
}

#cover-preview {
    /* box */
    display: flex;
    width: 100%;
    height: fit-content;

    /* visual */
    overflow: hidden;
    border-radius: 1.5rem;
}

#cover-settings {
    /* box */
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: fit-content;
    height: fit-content;
}
</style>