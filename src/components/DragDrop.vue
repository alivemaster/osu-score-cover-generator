<script setup lang="ts">
interface Props {
    enabled?: boolean
    width?: string
    height?: string
}
const props = withDefaults(defineProps<Props>(), {
    enabled: true,
    width: '5rem',
    height: '5rem'
})
</script>
<template>
    <label class="drag-drop" :class="[{ disabled: !props.enabled }]">
        <input class="drag-drop-input" type="file" :disabled="!props.enabled">
    </label>
</template>
<style scoped>
.drag-drop {
    /* box */
    box-sizing: border-box;
    display: flex;
    width: v-bind("props.width");
    height: v-bind("props.height");

    /* interaction */
    cursor: pointer;
    user-select: none;

    /* visual */
    background-color: var(--glass-light);
    border-color: var(--stroke);
    border-style: dashed;
    border-width: .03125rem;
    border-radius: .75rem;
    transition: .15s ease-out;
}

.drag-drop:hover {
    /* visual */
    border-color: var(--stroke-lighter);
}

.drag-drop.disabled {
    /* visual */
    background-color: var(--glass-dark);
}

.drag-drop-input {
    /* box */
    display: none;
}
</style>