<script setup lang="ts">
const props = defineProps<{
    direction: 'row' | 'column'
    gap: string
}>()
</script>
<template>
    <div class="wrapper">
        <slot></slot>
    </div>
</template>
<style scoped>
.wrapper {
    /* box */
    display: flex;
    flex-direction: v-bind("props.direction");
    gap: v-bind("props.gap");
    height: fit-content;
}
</style>