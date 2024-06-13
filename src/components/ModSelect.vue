<script setup lang="ts">
const props = defineProps<{
    name: string
}>()
const checked = defineModel<boolean>('checked')
const inputName = 'mod-' + props.name.toLowerCase()
</script>
<template>
    <label :for="inputName" class="mod-select" :class="{ active: checked }" @click="() => checked = !checked">
        <input type="checkbox" :name="inputName" class="mod-select-checkbox" v-model="checked">
        {{ props.name.toUpperCase() }}
    </label>
</template>
<style scoped>
.mod-select {
    /* box */
    padding-block: .375rem;
    padding-inline: .75rem;

    /* typo */
    font-family: 'Montserrat Variable', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: hsl(0 0 60);

    /* visual */
    cursor: pointer;
    background-color: hsl(0 0 15);
    border-radius: .75rem;
    transition: .2s;
}

.active {
    /* typo */
    font-weight: bolder;
    color: hsl(0 0 100);

    /* visual */
    background-color: hsl(0 0 20);
}

.mod-select-checkbox {
    /* box */
    display: none;
}
</style>