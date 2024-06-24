<script setup lang="ts">
const props = defineProps<{
    type: string
}>()
const checked = defineModel<boolean>('checked')
</script>
<template>
    <label :id="'mod-select-' + props.type.toLowerCase()" class="mod-select"
        :class="[props.type, { checked: checked }]">
        <input class="mod-select-input" type="checkbox" v-model="checked">
        {{ props.type.toUpperCase() }}
    </label>
</template>
<style scoped>
.mod-select {
    /* box */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 2rem;

    /* typo */
    font-family: 'Montserrat Variable', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: hsl(0 0 60);

    /* interaction */
    cursor: pointer;
    user-select: none;

    /* visual */
    background-color: hsl(0 0 15);
    border-radius: .75rem;
    transition: color, background-color, font-weight .2s;
}

.mod-select.checked {
    /* typo */
    font-weight: bolder;
    color: hsl(0 0 100);

    /* visual */
    background-color: hsl(0 0 20);
}

.mod-select-input {
    /* box */
    display: none;
    margin: 0;
}
</style>