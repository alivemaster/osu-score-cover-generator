<script setup lang="ts">
interface Props {
    enabled?: boolean
    size?: 'small' | 'large'
}
const props = withDefaults(defineProps<Props>(), {
    enabled: true,
    size: 'small',
})
const checked = defineModel<boolean>('checked')
</script>
<template>
    <label class="switch" :class="[props.size, { checked: checked }, { disabled: !props.enabled }]">
        <input class="switch-input" type="checkbox" :disabled="!props.enabled" v-model="checked">
        <span class="switch-slider" :class="[props.size, { checked: checked }, { disabled: !props.enabled }]"></span>
    </label>
</template>
<style scoped>
.switch {
    /* box */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    height: fit-content;

    /* interaction */
    cursor: pointer;

    /* visual */
    background-color: var(--glass-light);
    border-color: var(--stroke);
    border-style: solid;
    border-width: .03125rem;
    border-radius: 1rem;
    transition: .15s ease-out;
}

.switch.small {
    /* box */
    width: 2rem;
    height: 1.25rem;
    padding: .21875rem;

    /* visual */
    border-radius: .625rem;
}

.switch.large {
    /* box */
    width: 3.25rem;
    height: 2rem;
    padding: .34375rem;

    /* visual */
    border-radius: 1rem;
}

.switch:hover {
    /* visual */
    filter: var(--hover-shadow);
    border-color: var(--stroke-lighter);
}

.switch.checked {
    /* visual */
    background-color: var(--glass-lighter);
}

.switch.disabled {
    /* visual */
    background-color: var(--glass-darker);
}

.switch.disabled:hover {
    /* interaction */
    cursor: default;

    /* visual */
    border-color: var(--stroke);
}

.switch-slider {
    /* visual */
    background-color: var(--fg2);
    transition: margin-left .15s ease-out;
}

.switch-slider.checked {
    /* visual */
    background-color: var(--fg3);
}

.switch-slider.disabled {
    /* visual */
    background-color: var(--fg1);
}

.switch-slider.small {
    /* box */
    width: .75rem;
    height: .75rem;

    /* visual */
    border-radius: .375rem;
}

.switch-slider.large {
    /* box */
    width: 1.25rem;
    height: 1.25rem;

    /* visual */
    border-radius: .625rem;
}

.switch-slider.small.checked {
    /* box */
    margin-left: .75rem;
}

.switch-slider.large.checked {
    /* box */
    margin-left: 1.25rem;
}

.switch-input {
    /* box */
    display: none;
    margin: 0;
}
</style>