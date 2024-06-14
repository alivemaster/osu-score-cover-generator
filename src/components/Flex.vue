<script setup lang="ts">
const props = defineProps<{
    direction: 'row' | 'column'
    gap: string
}>()
</script>
<template>
    <div class="flex">
        <slot></slot>
    </div>
</template>
<style scoped>
.flex {
    /* box */
    display: flex;
    flex-direction: v-bind("props.direction");
    gap: v-bind("props.gap");
    height: fit-content;
}
</style>