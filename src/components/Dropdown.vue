<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from './Button.vue'
const props = defineProps<{
    options: {
        name: string
        value: string
    }[],
    selected: string
}>()
const emit = defineEmits<{
    (e: 'update:selected', value: string): void
}>()
const selectedOptionName = computed(() => {
    let name = '--'
    props.options.forEach((item) => {
        if (item.value === props.selected)
            name = item.name
    })
    return name
})
const expanded = ref<boolean>(false)
</script>
<template>
    <div class="dropdown">
        <Button @click="() => expanded = !expanded">{{ selectedOptionName }}</Button>
        <Transition name="dropdown-list">
            <ul class="dropdown-list" v-if="expanded">
                <li class="dropdown-item" v-for="option in props.options"
                    :key="'dropdown-item-' + option.value.toLowerCase()" @click="() => {
                        emit('update:selected', option.value)
                        expanded = false
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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: .375rem;
    max-width: 18rem;
    max-height: 15rem;
    padding: .375rem;
    margin-top: .375rem;
    overflow-y: auto;

    /* visual */
    background-color: var(--bg3);
    border-color: var(--stroke);
    border-style: solid;
    border-width: .03125rem;
    border-radius: .75rem;
}

.dropdown-item {
    /* box */
    padding: .375rem .75rem;

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