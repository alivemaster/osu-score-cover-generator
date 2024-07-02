<template>
    <footer>
        <span class="footer-info">
            <h4>osu! score cover generator</h4>
            <p>by alivemaster</p>
        </span>
        <span class="footer-disclaimer">
            <p>This webpage is not affiliated with "osu!" or "ppy".</p>
            <p>Flag icons are taken from Twemoji. Twemoji by Twitter are licenced under CC-BY 4.0.</p>
        </span>
    </footer>
</template>
<style scoped>
footer {
    /* box */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 3rem;
}

.footer-info {
    /* box */
    text-align: start;
}

.footer-info>h4 {
    /* typo */
    font-size: 1.5rem;
    font-weight: 700;
}

.footer-info>p {
    /* typo */
    font-weight: 500;
}

.footer-disclaimer {
    /* box */
    text-align: end;
}

.footer-info>*,
.footer-disclaimer>* {
    /* box */
    margin: 0;
}

@media screen and (width < 1080px) {
    footer {
        /* box */
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        padding: 1.5rem 1rem;
    }

    .footer-info,
    .footer-disclaimer {
        /* box */
        text-align: center;
    }
}
</style>