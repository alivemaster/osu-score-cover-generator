<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue'
import CoverData from './cover/CoverData'
import CoverRender from './cover/CoverRender'
import Collapsible from './components/Collapsible.vue'
import Flex from './components/Flex.vue'
import PropTitle from './components/PropTitle.vue'
import TextInput from './components/TextInput.vue'
import Dropdown from './components/Dropdown.vue'
import ModSelect from './components/ModSelect.vue'

const dataTest: CoverData = reactive({
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
      name: 'Diff Name'
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
const coverTest = new CoverRender()
onMounted(() => {
  const previewDiv = document.getElementById("preview") as HTMLCanvasElement
  previewDiv.append(coverTest.canvas)
  coverTest.init().then(() => coverTest.draw(dataTest))
})
watch(
  dataTest,
  (data) => {
    coverTest.draw(data)
    console.log('draw')
  }
)
</script>
<template>
  <div>
    <p>{{ dataTest.beatmap.title }}</p>
    <div id="preview"></div>
  </div>
  <div id="settings">
    <Collapsible title="Test">
      <Flex direction="column" gap=".75rem">
        <Flex direction="column" gap=".75rem">
          <PropTitle>Test1</PropTitle>
          <Flex direction="row" gap=".75rem">
            <TextInput type="text" placeholder="aaaaaaaaaa" v-model:value="dataTest.beatmap.title" />
          </Flex>
        </Flex>
        <Flex direction="column" gap=".75rem">
          <PropTitle>Test2</PropTitle>
          <Dropdown @change="(value) => dataTest.beatmap.state = (value as typeof dataTest.beatmap.state)" :options="[
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
              name: 'Pending / WIP / Graveyard / Not submitted',
              value: 'unranked'
            }
          ]">
          </Dropdown>
        </Flex>
        <Flex direction="row" gap=".75rem">
        </Flex>
      </Flex>
    </Collapsible>
  </div>
</template>
<style scoped></style>
