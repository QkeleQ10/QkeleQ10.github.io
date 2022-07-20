import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { getCookie, setCookie } from 'typescript-cookie'
import i18nPlugin from './plugins/i18n'
import themePlugin from './plugins/theme'
import Index from './pages/Index.vue'

initialize()

async function initialize() {
    const router = createRouter({
        history: createWebHistory(),
        routes: [
            { path: "/", component: Index }
        ],
    })

    let strings,
        language = getCookie('language') || window.navigator.language || "en",
        theme = getCookie('theme') || window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' || "light"

    for (let i = 0; i < 3; i++) {
        try {
            const res = await fetch(`https://raw.githubusercontent.com/QkeleQ10/Localisation/master/strings/${language}.json`),
                resJson = await res.json()
            strings = resJson
            if (strings) break
            else throw new Error('No strings found!')
        } catch (err) {
            console.warn(`No strings found for ${language}`)
            if (language.includes('-')) language = language.split('-')[0]
            else language = 'en'
        }
    }
    if (!strings) {
        console.error(`No strings available`)
        strings = {}
    }

    console.info(`Using language ${language}`)

    createApp({})
        .use(router)
        .use(themePlugin, { theme })
        .use(i18nPlugin, { language, strings })
        .mount('#app')

    document.documentElement.setAttribute('lang', language)
}