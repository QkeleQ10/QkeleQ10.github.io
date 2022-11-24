import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCookie, setCookie } from 'typescript-cookie'

export const useThemeStore = defineStore('theme', {
    state: () => ({ theme: getCookie('theme') || 'auto' }),
    actions: {
        set(theme: string) {
            document.documentElement.setAttribute('class', theme)
            this.theme = theme
            setCookie('theme', theme, { expires: 365 })
        },
    }
})