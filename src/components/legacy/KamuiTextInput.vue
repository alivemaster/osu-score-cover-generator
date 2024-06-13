<script setup lang="ts">
const props = defineProps<{
    type: 'text' | 'number'
    placeholder: string
    // pattern?: RegExp
}>()
const value = defineModel<string>('value')
const enabled = defineModel<boolean>('enabled', { default: true })
</script>
<template>
    <input class="text-input" :type="props.type" :placeholder="props.placeholder" v-model="value" :disabled="!enabled">
</template>
<style scoped>
.text-input {
    /* box */
    padding: .375rem .75rem;

    /* typo */
    font-family: 'Quicksand Variable', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--fg3);

    /* visual */
    background-color: var(--glass-light);
    border-color: var(--stroke);
    border-style: solid;
    border-width: .03125rem;
    border-radius: .75rem;
    transition: border-color .15s ease-out;
}

.text-input:focus {
    /* visual */
    background-color: var(--glass-dark);
    border-color: var(--stroke-lighter);
    outline: none;
}

.text-input:disabled {
    /* typo */
    color: var(--fg1);
    
    /* visual */
    background-color: var(--glass-dark);
}

.text-input:enabled:hover {
    /* visual */
    border-color: var(--stroke-lighter);
}


.text-input::placeholder {
    /* typo */
    color: var(--fg2);
}

.text-input:disabled::placeholder {
    /* typo */
    color: var(--fg1);
}
</style>