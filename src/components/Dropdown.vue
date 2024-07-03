<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
        if (item.value === props.selected) {
            name = item.name
            return
        }
    })
    return name
})
const isOpen = ref<boolean>(false)
const toggleOpen = () => {
    isOpen.value = !isOpen.value
}
const outsideClickHandler = (event: MouseEvent) => {
    const dropdownElement = (event.target as HTMLElement).closest('.dropdown')
    if (isOpen.value && !dropdownElement)
        toggleOpen()
}
onMounted(() => {
    document.addEventListener("click", outsideClickHandler)
})
onUnmounted(() => {
    document.removeEventListener("click", outsideClickHandler)
})
</script>
<template>
    <div class="dropdown">
        <Button @click="toggleOpen">
            <span class="dropdown-selected">
                {{ selectedOptionName }}
            </span>
            <span class="dropdown-icon" :class="{ rotated: isOpen }"></span>
        </Button>
        <Transition name="dropdown-list">
            <ul class="dropdown-list" v-if="isOpen">
                <li class="dropdown-item" v-for="option in props.options"
                    :key="'dropdown-item-' + option.value.toLowerCase()" @click="() => {
                        emit('update:selected', option.value)
                        isOpen = false
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

.dropdown-selected {
    /* box */
    max-width: 12rem;
    overflow: hidden;

    /* typo */
    text-overflow: ellipsis;
    text-wrap: nowrap;
}

.dropdown-icon {
    /* box */
    width: 1rem;
    height: 1rem;

    /* visual */
    background: url('../assets/arrow-small.svg') center/contain no-repeat;
    transition: rotate .3s ease-out;
}

.dropdown-icon.rotated {
    /* visual */
    rotate: 180deg;
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

    /* scrollbar */
    scrollbar-color: hsl(0 0 60) hsl(0 0 0 / 0);
    scrollbar-width: thin;

    /* visual */
    background-color: var(--bg3);
    filter: var(--drop-shadow);
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

@media screen and (width < 960px) {
    .dropdown-selected {
        /* box */
        max-width: 8rem;
    }
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