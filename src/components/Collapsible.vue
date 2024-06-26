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
            <span class="collapsible-icon" :class="{ rotated: expanded }">
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 8.99997L12 15L18 8.99997" stroke="white" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </span>
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
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

.collapsible-icon {
    /* box */
    width: 1.5rem;
    height: 1.5rem;

    /* visual */
    transition: rotate .3s ease-out;
}

.collapsible-icon.rotated{
    /* visual */
    rotate: 180deg;
}

.collapsible-container {
    /* box */
    box-sizing: border-box;
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