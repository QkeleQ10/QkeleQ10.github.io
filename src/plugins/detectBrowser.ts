declare const window: any

export default {
    install: async (app: any) => {
        app.config.globalProperties.$browser = () => {
            const userAgentString = window.navigator.userAgent.toLowerCase(),
                vendor = window.navigator.vendor.toLowerCase()
            if (userAgentString.indexOf('firefox') > -1) return 'firefox'
            else if (userAgentString.indexOf("edg") > -1) return 'edge'
            // else if (userAgentString.indexOf("chrome") > -1 && vendor.indexOf("google") > -1) return 'chrome'
            else if (window.chrome) return 'chromium'
            else return undefined
        }
    }
}
