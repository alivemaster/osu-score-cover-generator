import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import '@fontsource-variable/quicksand'
import '@fontsource-variable/montserrat'
import '@fontsource-variable/noto-sans-sc'
import '@fontsource-variable/noto-sans-tc'
import '@fontsource-variable/noto-sans-jp'
import '@fontsource-variable/noto-sans-kr'

import { createI18n } from 'vue-i18n';
import en from './language/en'
import zh from './language/zh'

const messages = {
    en,
    zh
}

const i18n = createI18n({
    legacy: false,
    messages,
    locale: navigator.language
})

const app = createApp(App);

app.use(i18n);

app.mount('#app')
