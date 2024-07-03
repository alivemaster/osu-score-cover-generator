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
const isOpen = ref<boolean>(true)
const isHeaderHover = ref<boolean>(false)
const toggleOpen = () => {
    isOpen.value = !isOpen.value
}
</script>
<template>
    <div class="collapsible" :class="{ 'header-hover': isHeaderHover }">
        <div class="collapsible-header" @click="toggleOpen" @mouseenter="() => isHeaderHover = true"
            @mouseleave="() => isHeaderHover = false">
            <h2 class="collapsible-title">{{ props.title }}</h2>
            <span class="collapsible-icon" :class="{ rotated: isOpen }"></span>
        </div>
        <Transition name="collapsible-container">
            <div class="collapsible-container" v-if="isOpen">
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
    transition: border-color .15s ease-out;
}

.collapsible.header-hover {
    /* visual */
    border-color: var(--stroke-lighter);
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
    background: url('../assets/arrow-large.svg') center/contain no-repeat;
    transition: rotate .3s ease-out;
}

.collapsible-icon.rotated {
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