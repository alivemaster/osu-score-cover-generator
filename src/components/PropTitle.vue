<template>
    <h3 class="prop-title">
        <slot></slot>
    </h3>
</template>
<style scoped>
.prop-title {
    /* box */
    height: 1.25rem;
    margin: 0;
    
    /* typo */
    font-size: 1rem;
    font-weight: 500;
    color: var(--fg3);
    text-wrap: nowrap;
}
</style>