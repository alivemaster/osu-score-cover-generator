<script setup lang="ts">
import { computed } from 'vue'
interface Props {
    width?: string
    height?: string
    column?: boolean
    wrap?: boolean
    gap?: string
}
const props = withDefaults(defineProps<Props>(), {
    width: '100%',
    height: 'fit-content',
    direction: false,
    wrap: false,
    gap: '.375rem'
})
const flexDirection = computed(() => {
    if (props.column)
        return 'column'
    else
        return 'row'
})
const flexWrap = computed(() => {
    if (props.wrap)
        return 'wrap'
    else
        return 'nowrap'
})
const flexSpacing = computed(() => {
    if (props.gap === 'auto')
        return {
            gap: '0',
            jusyifyContent: 'space-between'
        }
    else
        return {
            gap: props.gap,
            jusyifyContent: 'flex-start'
        }
})
</script>
<template>
    <div class="flex-container">
        <slot></slot>
    </div>
</template>
<style scoped>
.flex-container {
    /* box */
    display: flex;
    flex-flow: v-bind("flexDirection + ' ' + flexWrap");
    gap: v-bind("flexSpacing.gap");
    align-items: flex-start;
    justify-content: v-bind("flexSpacing.jusyifyContent");
    width: v-bind("props.width");
    height:  v-bind("props.height");
}
</style>