import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import en from './language/en'
import zh from './language/zh'
import "./style.css"
import '@fontsource-variable/quicksand'
import '@fontsource-variable/montserrat'
import '@fontsource-variable/noto-sans-sc'
import '@fontsource-variable/noto-sans-tc'
import '@fontsource-variable/noto-sans-jp'
import '@fontsource-variable/noto-sans-kr'

const i18n = createI18n({
    legacy: false,
    messages: {
        en,
        zh
    },
    locale: navigator.language,
    fallbackLocale: 'en'
})

createApp(App).use(i18n).mount('#app')
