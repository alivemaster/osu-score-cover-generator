<template>
    <header>
        <h1 class="logo" id="logo">
            <img class="logo-img" src="../assets/logo.svg" alt="osu! score cover generator">
        </h1>
        <a class="header-link" id="github-link" href="https://github.com/alivemaster/osu-score-cover-generator"
            target="_blank">
            <img class="link-img" src="../assets/github-mark-white.svg" alt="github logo">
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
    padding: 1rem 3rem;
}

header>* {
    /* box */
    height: fit-content;
    margin: 0;
}

.logo-img {
    /* box */
    height: 4rem;
}

.link-img {
    /* box */
    height: 2rem;
}

@media screen and (width < 1080px) {
    header {
        /* box */
        padding: .5rem 1.5rem;
    }

    .logo-img {
        /* box */
        height: 2rem;
    }

    .link-img {
        /* box */
        height: 1.5rem;
    }
}
</style>