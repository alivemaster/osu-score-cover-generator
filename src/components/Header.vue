<template>
    <header></header>
</template>
<style scoped>
header {
    /* box */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    height: 6rem;
    margin: 0 1rem 1.5rem;

    /* visual */
    background-color: var(--bg3);
    border: .03125rem solid var(--stroke);
    border-radius: 0 0 1.5rem 1.5rem;
}

@media screen and (width < 1080px) {
    header {
    /* box */
    height: 4rem;
    margin: 0;

    /* visual */
    border-radius: 0;
}
}
</style>