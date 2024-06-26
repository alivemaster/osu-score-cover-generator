<script setup lang="ts">
interface Props {
    enabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
    enabled: true
})
const emit = defineEmits<{
    (e: 'click'): void
}>()
</script>
<template>
    <button class="button" @click="() => {
        if (props.enabled)
            emit('click')
    }">
        <span class="button-box" :class="{ disabled: !props.enabled }">
            <slot></slot>
        </span>
    </button>
</template>
<style scoped>
.button {
    /* box */
    padding: 0;
    overflow: hidden;

    /* visual */
    background-color: var(--button);
    border: none;
    border-radius: .75rem;
}

.button-box {
    /* box */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap: .375rem;
    align-items: center;
    justify-content: flex-start;
    width: fit-content;
    height: 2rem;
    padding: .375rem .75rem;

    /* typo */
    font-family: 'Quicksand Variable', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--fg3);

    /* interaction */
    cursor: pointer;
    user-select: none;

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

.button-box.disabled {
    /* typo */
    color: var(--fg2);

    /* interaction */
    cursor: default;

    /* visual */
    background-color: var(--glass-dark);
}
</style>