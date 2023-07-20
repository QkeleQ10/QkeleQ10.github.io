import { ref } from 'vue'
import IntlMessageFormat from 'intl-messageformat'
import { getCookie, setCookie } from 'typescript-cookie'

// Predefine the currentLanguage and currentLanguageData variables
let currentLanguage = ref(), currentLanguageData = ref()

export default {
    install: async (app: any, options: any) => {
        // Set the currentLanguage variable to the language ID
        currentLanguage.value = getCookie('language') || window.navigator.language || "en"

        // Set the currentLanguageData variable to the options.data object that should be used
        currentLanguageData.value = options.data[currentLanguage.value] || options.data[currentLanguage.value.split(/[_-]/gi)[0]] || options.data['en']

        // Set the HTML language
        document.documentElement.setAttribute('lang', currentLanguage.value)

        // $i18n function
        app.config.globalProperties.$i18n = (key: string, values?: any) => {
            // Define the string and format it using intl-messageformat
            const string = currentLanguageData.value.message?.[key] || key
            return new IntlMessageFormat(string, currentLanguage.value).format(values)
        }

        // $changeLanguage function
        app.config.globalProperties.$changeLanguage = (code: string) => {
            // Set the currentLanguage and currentLanguageData variables
            currentLanguage.value = code
            currentLanguageData.value = options.data[currentLanguage.value] || options.data[currentLanguage.value.split(/[_-]/gi)[0]] || options.data['en']
            setCookie('language', currentLanguage.value, { expires: 10000 })
        }

        // Provide variables for current language and some other stuff that I've written in a stupid way
        app.provide('language', currentLanguage.value)
        app.provide('meta', Object.assign({}, ...Object.keys(options.data).map(k => ({ [k]: { ...options.data[k].meta.data, languageName: options.data[k].message.languageName } }))))
        app.provide('changeLanguage', app.config.globalProperties.$changeLanguage)
    }
}
