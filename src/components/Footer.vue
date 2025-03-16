<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
    <footer>
        <span class="footer-about">
            <p>Made with ❤️ by alivemaster</p>
            <p style="color: hsl(0 0 65)">aka <a href="https://osu.ppy.sh/users/10324621"
                    target="_blank">sb233asdf</a>
            </p>
        </span>
        <span class="footer-disclaimer">
            <p>{{ t("footer.disclaimer1") }}</p>
            <p>{{ t("footer.disclaimer2a") }}<a href="https://creativecommons.org/licenses/by/4.0/deed.en"
                    target="_blank">CC-BY 4.0</a>{{ t("footer.disclaimer2b") }}</p>
        </span>
    </footer>
</template>
<style scoped>
footer {
    /* box */
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: 2rem 3rem;
}

.footer-about {
    /* box */
    text-align: start;
}

.footer-about>p {
    /* typo */
    font-size: 1.25rem;
    font-weight: 500;
}

.footer-disclaimer {
    /* box */
    text-align: end;
}

.footer-about>*,
.footer-disclaimer>* {
    /* box */
    margin: 0;
}

@media screen and (width < 1080px) {
    footer {
        /* box */
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        padding: 1.5rem 1rem;
    }

    .footer-about,
    .footer-disclaimer {
        /* box */
        text-align: center;
    }
}
</style>