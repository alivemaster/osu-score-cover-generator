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
const emit = defineEmits<{
    (e: 'change', file: File): void
}>()
const fileChangeHandler = (ev: Event) => {
    const fileList = (ev.currentTarget as HTMLInputElement).files
    if (fileList && fileList[0]) {
        const file = fileList[0]
        emit('change', file)
    }
}
const dropHandler = (ev: DragEvent) => {
    ev.preventDefault()
    const dataTransfer = ev.dataTransfer
    if (dataTransfer) {
        const items = dataTransfer.items
        if (items) {
            const firstItem = items[0]
            if (firstItem.kind === 'file') {
                const file = firstItem.getAsFile()
                emit('change', file!)
            }
        } else {
            const files = dataTransfer.files
            const firstFile = files[0]
            emit('change', firstFile)
        }
    }
}
const dragOverHandler = (ev: DragEvent) => {
    ev.preventDefault()
}
</script>
<template>
    <label class="drag-drop" :class="[{ disabled: !props.enabled }]" @drop="dropHandler" @dragover="dragOverHandler">
        <input class="drag-drop-input" type="file" :disabled="!props.enabled" @change="fileChangeHandler">
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