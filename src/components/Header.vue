<template>
    <header>
        <span id="logo">
            <img src="../assets/logo.svg" style="height: 6rem" alt="osu score cover generator">
        </span>
        <a id="github-link" href="https://github.com/alivemaster/osu-score-cover-generator" target="_blank">
            <img src="../assets/github-mark-white.svg" style="height: 3rem" alt="github logo">
        </a>
    </header>
</template>
<style scoped>
header {
    /* box */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 8rem;
    padding: 0 3rem;
}

@media screen and (width < 1080px) {
    header {
        /* box */
        height: 5rem;
        padding: 0 1.5rem;
    }
}
</style>