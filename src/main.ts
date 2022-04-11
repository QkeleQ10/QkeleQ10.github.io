import { createApp } from 'vue'
import { getCookie, setCookie } from 'typescript-cookie'
import App from './App.vue'

const app = createApp(App),
    language = String(getCookie('language') || window.navigator.language || "en")

app.mount('#app')

document.documentElement.setAttribute('lang', language)