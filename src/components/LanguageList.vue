<script setup>
import { reactive, ref } from 'vue';
import GridFit from "./GridFit.vue";
import { setCookie, getCookie } from "typescript-cookie";

let languages = reactive([{ languageId: 'en', localisedName: 'English', defaultName: 'English', translationProgress: 100, approvalProgress: 100 }]),
    currentLanguage = ref(getCookie('language'))

getLanguages()

async function getLanguages() {
    const langNamesDefault = new Intl.DisplayNames([], { type: "language", fallback: "none", languageDisplay: 'standard' }),
        res = await fetch(`https://raw.githubusercontent.com/QkeleQ10/Localisation/master/availableLanguages.json`),
        resJson = await res.json()

    resJson.data.forEach(l => {
        let id = l.data.languageId,
            langNamesLocalised = new Intl.DisplayNames(
                [id || 'en'],
                { type: "language", fallback: "none", languageDisplay: 'standard' }
            ),
            obj = {
                localisedName: (langNamesLocalised.of(id) || langNamesDefault.of(id) || id).initial(),
                defaultName: (langNamesDefault.of(id) || id).initial()
            }
        if (l.data.translationProgress > 35) {
            return languages.push({ ...l.data, ...obj })
        }
        else return
    })
}

function setLanguage(language) {
    setCookie('language', language, { expires: 3650 })
    window.location.reload()
}

String.prototype.initial = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}
</script>

<template>
    <GridFit role="group">
        <Button v-for="language in languages" :aria-label="language.defaultName"
            :title="$i18n('changeLanguageTooltip', { language: language.defaultName })"
            :id="'language-option-' + language.languageId" :key="language.languageId" :active="currentLanguage === language.languageId"
            @click="setLanguage(language.languageId)">
            {{ language.localisedName }}
        </Button>
    </GridFit>
</template>