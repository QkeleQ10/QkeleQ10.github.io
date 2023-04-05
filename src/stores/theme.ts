import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCookie, setCookie } from 'typescript-cookie'

export const useThemeStore = defineStore('theme', {
    state: () => ({ theme: getCookie('theme') || 'auto', scheme: 'normal' }),
    actions: {
        set(theme: string) {
            document.documentElement.setAttribute('data-theme', theme)
            this.theme = theme
            setCookie('theme', theme, { expires: 730 })
        },
        setScheme(scheme: string) {
            document.documentElement.setAttribute('data-color-scheme', scheme)
            this.scheme = scheme
        }
    }
})