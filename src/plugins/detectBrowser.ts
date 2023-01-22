export default {
    install: async (app: any) => {
        app.config.globalProperties.$browser = () => {
            const userAgentString = window.navigator.userAgent.toLowerCase()
            if (userAgentString.indexOf('firefox') > -1) return 'firefox'
            else if (userAgentString.indexOf("edg") > -1) return 'edge'
            else if (window.chrome) return 'chromium'
            else return undefined
        }
    }
}
