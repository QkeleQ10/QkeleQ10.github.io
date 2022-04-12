import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { getCookie, setCookie } from 'typescript-cookie'
import i18nPlugin from './plugins/i18n'
import Index from './pages/Index.vue'

initialize()

async function initialize() {
    const
        router = createRouter({
            history: createWebHistory(),
            routes: [
                { path: "/", component: Index }
            ],
        }),
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

    createApp({})
        .use(router)
        .use(i18nPlugin, { language: getCookie('language'), strings: strings })
        .mount('#app')

    document.documentElement.setAttribute('lang', language)
}