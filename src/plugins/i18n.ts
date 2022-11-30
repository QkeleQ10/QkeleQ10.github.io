import IntlMessageFormat from 'intl-messageformat'

export default {
    install: async (app: any, options: { language: string, strings: any }) => {
        app.config.globalProperties.$i18n = (key: string, values?: any) => {
            const string = options.strings?.[key] || key
            if (values) {
                return new IntlMessageFormat(string, options.language).format(values)
            } else {
                return new IntlMessageFormat(string, options.language).format()
            }
        }
    }
}
