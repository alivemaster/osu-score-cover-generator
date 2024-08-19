<script setup lang="ts">
import { computed } from 'vue'
interface Props {
    enabled?: boolean
    number?: boolean
    placeholder?: string
    // pattern?: RegExp
}
const props = withDefaults(defineProps<Props>(), {
    enabled: true,
    number: false,
    placeholder: '',
})
const emit = defineEmits<{
    (e: 'change', value: string | number): void
}>()
const value = defineModel<string | number>('value')
const inputType = computed(() => {
    if (props.number)
        return 'number'
    else
        return 'text'
})
</script>
<template>
    <input class="text-input" :disabled="!props.enabled" :type="inputType" :placeholder="props.placeholder"
        v-model="value" @change="(e) => emit('change', (e.target as HTMLInputElement).value)">
</template>
<style scoped>
.text-input {
    /* box */
    box-sizing: border-box;
    width: 100%;
    height: 2rem;
    padding: .375rem .75rem;

    /* typo */
    font-family: 'Quicksand Variable', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--fg3);

    /* props */
    appearance: textfield;

    /* visual */
    background-color: var(--glass-light);
    border-color: var(--stroke);
    border-style: solid;
    border-width: .03125rem;
    border-radius: .75rem;
    transition: .15s ease-out;
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

.text-input::-webkit-inner-spin-button,
.text-input::-webkit-outer-spin-button {
    /* props */
    appearance: none;
}
</style>