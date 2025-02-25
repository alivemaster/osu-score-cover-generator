<script setup lang="ts">
interface Props {
    enabled?: boolean
    width?: string
    height?: string
    placeholder?: string
}
const props = withDefaults(defineProps<Props>(), {
    enabled: true,
    width: '100%',
    height: '8rem',
    placeholder: '',
})
const value = defineModel<string>('value')
</script>
<template>
    <textarea class="text-area" :disabled="!props.enabled" :placeholder="props.placeholder" v-model="value"></textarea>
</template>
<style scoped>
.text-area {
    /* box */
    box-sizing: border-box;
    width: v-bind("props.width");
    height: v-bind("props.height");
    padding: .375rem .75rem;

    /* typo */
    font-family: 'Quicksand Variable', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: var(--fg3);

    /* props */
    resize: none;

    /* visual */
    background-color: var(--glass-light);
    border-color: var(--stroke);
    border-style: solid;
    border-width: .03125rem;
    border-radius: .75rem;
    transition: .15s ease-out;
}

.text-area:focus {
    /* visual */
    outline: none;
    background-color: var(--glass-dark);
    border-color: var(--stroke-lighter);
}

.text-area:disabled {
    /* typo */
    color: var(--fg1);

    /* visual */
    background-color: var(--glass-dark);
}

.text-area:enabled:hover {
    /* visual */
    border-color: var(--stroke-lighter);
}


.text-area::placeholder {
    /* typo */
    color: var(--fg2);
}

.text-area:disabled::placeholder {
    /* typo */
    color: var(--fg1);
}
</style>