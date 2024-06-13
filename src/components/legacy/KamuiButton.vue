<script setup lang="ts">
import Wrapper from './KamuiWrapper.vue'
const emit = defineEmits<{
    (e: 'click'): void
}>()
</script>
<template>
    <button class="button" @click="() => emit('click')">
        <Wrapper direction="row" gap=".375rem" class="button-box">
            <slot></slot>
        </Wrapper>
    </button>
</template>
<style scoped>
.button {
    /* box */
    width: fit-content;
    height: fit-content;
    padding: 0;
    overflow: hidden;

    /* visual */
    background-color: var(--button);
    border: none;
    border-radius: .75rem;
}

.button-box {
    /* box */
    padding: .375rem .75rem;

    /* typo */
    font-family: 'Quicksand Variable', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--fg3);

    /* visual */
    transition: background-color .2s ease-in;
}

.button-box:hover {
    /* visual */
    background-color: var(--glass-lighter);
}

.button-box:active {
    /* visual */
    background-color: var(--glass-dark);
    transition-duration: .05s;
}
</style>