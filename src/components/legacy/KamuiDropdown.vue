<script setup lang="ts">
import { ref } from 'vue'
import KamuiButton from './KamuiButton.vue'
const props = defineProps<{
    options: {
        name: string
        value: string
    }[]
}>()
const emit = defineEmits<{
    (e: 'change', value: string): void
}>()
const current = ref<string>(props.options[0].name)
const listShown = ref<boolean>(false)
</script>
<template>
    <div class="dropdown">
        <KamuiButton @click="() => listShown = !listShown">{{ current }}</KamuiButton>
        <Transition name="dropdown-list">
            <ul class="dropdown-list" v-if="listShown">
                <li class="dropdown-item" v-for="option in props.options" :key="'dropdown-item-' + option.value.toLowerCase()" @click="() => {
                    current = option.name
                    emit('change', option.value)
                    listShown = !listShown
                }">
                    {{ option.name }}
                </li>
            </ul>
        </Transition>
    </div>
</template>
<style scoped>
.dropdown {
    /* box */
    display: block;
}

.dropdown-list {
    /* box */
    position: absolute;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: .375rem;
    padding: .375rem;
    margin-top: .375rem;

    /* visual */
    background-color: var(--bg3);
    border-color: var(--stroke);
    border-style: solid;
    border-width: .03125rem;
    border-radius: .75rem;
}

.dropdown-item {
    /* box */
    padding: .375rem;

    /* typo */
    font-size: 1rem;
    font-weight: 500;
    color: var(--fg3);

    /* visual */
    list-style: none;
    border-radius: .75rem;
}

.dropdown-item:hover {
    /* visual */
    cursor: pointer;
    background-color: var(--glass-lighter);
}

.dropdown-list-enter-from,
.dropdown-list-leave-to {
    opacity: 0;
    transform: translateY(-.25rem);
}

.dropdown-list-enter-active {
    transition: all .2s ease-out;
}

.dropdown-list-leave-active {
    transition: all .2s ease-in;
}
</style>