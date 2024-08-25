<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
    <footer>
        <span class="footer-info">
            <p>Made with ❤️ by alivemaster</p>
            <p style="color: hsl(0 0 65)">aka <a href="https://osu.ppy.sh/users/10324621"
                    target="_blank">sb233asdf</a>
            </p>
        </span>
        <span class="footer-disclaimer">
            <p>{{ t("footer.disclaimer1") }}</p>
            <p>{{ t("footer.disclaimer2a") }}<a href="https://creativecommons.org/licenses/by/4.0/deed.en"
                    target="_blank">CC-BY 4.0</a>{{ t("footer.disclaimer2b") }}</p>
            <p style="color: hsl(95 100 65)">{{ t("footer.disclaimer3a") }}<a href="https://bot.365246692.xyz"
                    target="_blank"><b>YumuBot</b></a>{{ t("footer.disclaimer3b") }}</p>
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

.footer-info {
    /* box */
    text-align: start;
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
        align-items: center;
        padding: 1.5rem 1rem;
    }

    .footer-info,
    .footer-disclaimer {
        /* box */
        text-align: center;
    }
}
</style>