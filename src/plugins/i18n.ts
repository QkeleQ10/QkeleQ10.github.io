import IntlMessageFormat from 'intl-messageformat'
import { getCookie, setCookie } from 'typescript-cookie'

let language: string, currentLanguageData: any

export default {
    install: async (app: any, options: any) => {

        language = getCookie('language') || window.navigator.language || "en"
        currentLanguageData = options.data[language] || options.data[language.split(/[_-]/gi)[0]] || options.data['en']

        app.config.globalProperties.$i18n = (key: string, values?: any) => {
            const string = currentLanguageData.message?.[key] || key
            return new IntlMessageFormat(string, language).format(values)
        }

        app.config.globalProperties.$changeLanguage = (code: string) => {
            language = code
            currentLanguageData = options.data[language] || options.data[language.split(/[_-]/gi)[0]] || options.data['en']
            setCookie('language', language, { expires: 10000 })
            return getCookie('language')
        }

        document.documentElement.setAttribute('lang', language)

        app.provide('language', language)
        app.provide('meta', Object.assign({}, ...Object.keys(options.data).map(k => ({ [k]: { ...options.data[k].meta.data, languageName: options.data[k].message.languageName } }))))
    }
}
