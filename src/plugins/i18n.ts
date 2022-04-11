export default {
    install: async (app: any, options: { language: string, strings: any }) => {
        app.config.globalProperties.$i18n = (key: string) => {
            return options.strings?.[key] || key
        }
    }
}
