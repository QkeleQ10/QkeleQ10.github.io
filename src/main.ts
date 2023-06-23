import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { getCookie, setCookie } from 'typescript-cookie'
import i18nPlugin from './plugins/i18n'
import detectBrowserPlugin from './plugins/detectBrowser'
import Button from './components/Button.vue'
import Index from './pages/Index.vue'
import StudyTools from './pages/StudyTools.vue'
import StudyToolsGrades from './pages/StudyToolsGrades.vue'

initialize()

async function initialize() {
    const router = createRouter({
        history: createWebHistory(),
        routes: [
            { path: "/", component: Index },
            { path: "/studytools", component: StudyTools },
            { path: "/studytools/grades", component: StudyToolsGrades },
            { path: "/extensions/studytools", component: StudyTools },
            { path: "/extensions/studytools/update", component: StudyTools },
            { path: "/extensions/studytools/download", component: StudyTools },
            { path: "/:pathMatch(.*)*", component: Index }
        ],
        scrollBehavior(to, from, savedPosition) {
            // always scroll to top
            return { top: 0 }
        },
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

    const pinia = createPinia()
    const app = createApp({})

    app
        .use(router)
        .use(pinia)
        .use(i18nPlugin, { language, strings })
        .use(detectBrowserPlugin)
        .component('Button', Button)
        .mount('#app')

    document.documentElement.setAttribute('lang', language)
}