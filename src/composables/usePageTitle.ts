import { onBeforeMount } from 'vue'

export function usePageTitle(title: string) {
    onBeforeMount(() => {
        document.title = title ? `${title} | QkeleQ10` : 'QkeleQ10'
    })
}