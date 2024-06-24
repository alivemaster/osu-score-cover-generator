<script setup lang="ts">
import { ref } from 'vue'
interface Props {
    title?: string
    width?: string
}
const props = withDefaults(defineProps<Props>(), {
    title: 'Title',
    width: '100%'
})
const expanded = ref<boolean>(true)
</script>
<template>
    <div class="collapsible">
        <div class="collapsible-header" @click="() => expanded = !expanded">
            <h2 class="collapsible-title">{{ props.title }}</h2>
        </div>
        <Transition name="collapsible-container">
            <div class="collapsible-container" v-if="expanded">
                <slot></slot>
            </div>
        </Transition>
    </div>
</template>
<style scoped>
.collapsible {
    /* box */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: v-bind("props.width");
    max-height: fit-content;
    overflow: hidden;

    /* visual */
    background-color: var(--bg2);
    border: .03125rem solid var(--stroke);
    border-radius: 1.5rem;
}

.collapsible-header {
    /* box */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 4.5rem;
    padding-inline: 1.5rem;

    /* interaction */
    cursor: pointer;
    user-select: none;

    /* visual */
    background-color: var(--bg3);
    transition: background-color .2s ease-in;
}

.collapsible-title {
    /* box */
    margin: 0;

    /* typo */
    font-size: 1.5rem;
    font-weight: 500;
    color: #FFF;
}

.collapsible-container {
    /* box */
    display: flex;
    flex-direction: column;
    padding: 24px;
}

.collapsible-container-enter-from,
.collapsible-container-leave-to {
    opacity: 0;
    transform: translateY(-.25rem);
}

.collapsible-container-enter-active {
    transition: all .2s ease-out;
}

.collapsible-container-leave-active {
    transition: all .2s ease-in;
}
</style>