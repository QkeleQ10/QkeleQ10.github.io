import { createApp } from 'vue'
import { getCookie, setCookie } from 'typescript-cookie'
import i18nPlugin from './plugins/i18n'
import App from './App.vue'

const app = createApp(App),
    language = String(getCookie('language') || window.navigator.language || "en")

let strings

try {
    const res = await fetch(`https://raw.githubusercontent.com/QkeleQ10/Localisation/master/strings/${language}.json`),
        resJson = await res.json()
    strings = resJson
    if (!strings) throw new Error("No strings found")
} catch (err) {
    console.error(err)
    const res = await fetch(`https://raw.githubusercontent.com/QkeleQ10/Localisation/master/strings/en.json`),
        resJson = await res.json()
    strings = resJson
    if (!strings) throw new Error("No strings found")
}

app.use(i18nPlugin, { language: "nl", strings: strings })

app.mount('#app')

document.documentElement.setAttribute('lang', language)