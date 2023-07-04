import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { getCookie, setCookie } from 'typescript-cookie'
import i18nPlugin from './plugins/i18n'
import detectBrowserPlugin from './plugins/detectBrowser'
import Button from './components/Button.vue'
import Home from './views/Home.vue'
import App from './App.vue'

initialise()

async function initialise() {
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

    createApp(App)
        .use(createRouter({
            history: createWebHistory(),
            routes: [
                { path: "/", name: "Home", component: Home },
                { path: "/studytools", name: "Study Tools voor Magister", component: () => import('./views/StudyTools.vue'), alias: ['/extensions/studytools', '/extensions/studytools/update', '/extensions/studytools/download'] },
                { path: "/studytools/grades", name: "Cijferback-up", component: () => import('./views/StudyToolsGrades.vue') },
                { path: "/:pathMatch(.*)*", name: "Not Found", component: () => import('./views/404.vue') }
            ],
            scrollBehavior(to, from, savedPosition) {
                if (savedPosition) {
                    savedPosition.behavior = "smooth"
                    return savedPosition
                } else {
                    return {
                        top: 0,
                        behavior: 'smooth',
                    }
                }
            },
        }))
        .use(createMetaManager())
        .use(createPinia())
        .use(i18nPlugin, { language, strings })
        .use(detectBrowserPlugin)
        .component('Button', Button)
        .mount('#app')

    document.documentElement.setAttribute('lang', language)
}