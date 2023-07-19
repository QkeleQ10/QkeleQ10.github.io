import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { createMetaManager } from 'vue-meta'
import { createPinia } from 'pinia'
import { getCookie, setCookie } from 'typescript-cookie'
import i18nPlugin from './plugins/i18n'
import detectBrowserPlugin from './plugins/detectBrowser'
import Button from './components/Button.vue'
import Home from './views/Home.vue'
import App from './App.vue'

initialise()

async function initialise() {
    let data = {}

    const res = await fetch(`https://raw.githubusercontent.com/QkeleQ10/Localisation/master/strings.json`),
        resJson = await res.json()
    data = resJson
    if (!data) console.error(`No strings available`)

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
        .use(i18nPlugin, { data })
        .use(detectBrowserPlugin)
        .component('Button', Button)
        .mount('#app')
}