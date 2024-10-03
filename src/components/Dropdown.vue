<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Button from './Button.vue'
import TextInput from './TextInput.vue'
interface Props {
    enabled: boolean
    filter: boolean
    options: {
        name: string
        value: string | number
    }[],
    selected: string | number
}
const props = withDefaults(defineProps<Props>(), {
    enabled: true,
    filter: false,
    options() {
        return [
            {
                name: '',
                value: ''
            }
        ]
    },
    selected: ''
})
const emit = defineEmits<{
    (e: 'update:selected', value: string | number): void
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
const key = ref<string>('')
const regex = computed<RegExp>(() => new RegExp(`^${key.value}`, "i"))
const isOpen = ref<boolean>(false)
const toggleOpen = () => {
    // clear filter when close
    if (isOpen.value && props.filter)
        key.value = ''
    // toggle
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
        <Button :enabled="props.enabled" @click="toggleOpen">
            <span class="dropdown-selected">
                {{ selectedOptionName }}
            </span>
            <span class="dropdown-icon" :class="{ rotated: isOpen }"></span>
        </Button>
        <Transition name="dropdown-menu">
            <div v-if="isOpen" class="dropdown-menu">
                <TextInput v-if="props.filter" v-model:value="key" placeholder="Filter..."></TextInput>
                <ul class="dropdown-list">
                    <template v-for="option in props.options"
                        :key="'dropdown-item-' + option.value.toString().toLowerCase()">
                        <li v-show="!props.filter || (regex.test(option.name) || regex.test(option.value.toString()))"
                            class="dropdown-item" @click="() => {
                                emit('update:selected', option.value)
                                toggleOpen()
                            }">
                            {{ option.name }}
                        </li>
                    </template>
                </ul>
            </div>
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

.dropdown-menu {
    /* box */
    position: absolute;
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: .75rem;
    padding: .375rem;
    margin: .375rem 0 0;

    /* visual */
    background-color: var(--bg3);
    filter: var(--drop-shadow);
    border-color: var(--stroke);
    border-style: solid;
    border-width: .03125rem;
    border-radius: .75rem;
}

.dropdown-list {
    /* box */
    display: flex;
    flex-direction: column;
    gap: .375rem;
    max-width: 15rem;
    max-height: 15rem;
    padding: 0;
    margin: 0;
    overflow-y: auto;

    /* scrollbar */
    scrollbar-color: hsl(0 0 60) hsl(0 0 0 / 0);
    scrollbar-width: thin;
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

.dropdown-menu-enter-from,
.dropdown-menu-leave-to {
    opacity: 0;
    transform: translateY(-.25rem);
}

.dropdown-menu-enter-active {
    transition: all .2s ease-out;
}

.dropdown-menu-leave-active {
    transition: all .2s ease-in;
}
</style>