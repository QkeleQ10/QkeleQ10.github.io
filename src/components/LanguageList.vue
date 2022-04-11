<script setup>
import { reactive, ref } from 'vue';
import GridFit from "./containers/GridFit.vue";
import DefaultButton from "./DefaultButton.vue";
import { setCookie, getCookie } from "typescript-cookie";

let languages = ref([{ languageId: "en", localisedName: "English", defaultName: "English", translationProgress: 100, approvalProgress: 100 }])

getLanguages()

async function getLanguages() {
    const langNamesDefault = new Intl.DisplayNames([], { type: "language", fallback: "none", languageDisplay: 'standard' }),
        res = await fetch(`https://raw.githubusercontent.com/QkeleQ10/Localisation/master/availableLanguages.json`),
        resJson = await res.json()

    resJson.data.forEach(l => {
        let id = l.data.languageId,
            langNamesLocalised = new Intl.DisplayNames(
                [id || "en"],
                { type: "language", fallback: "none", languageDisplay: 'standard' }
            ),
            obj = {
                localisedName: (langNamesLocalised.of(id) || langNamesDefault.of(id) || id),
                defaultName: (langNamesDefault.of(id) || id)
            }
        if (l.data.translationProgress > 35) {
            return languages.value.push({ ...l.data, ...obj })
        }
        else return
    })
}

function setLanguage(language) {
    setCookie('language', language, { expires: 3650 })
    window.location.reload()
}

</script>

<template>
    <GridFit>
        <DefaultButton
            v-for="language in languages"
            :aria-label="language.defaultName"
            :id="'language-option-' + language.languageId"
            :key="language.languageId"
            @click="setLanguage(id)"
        >{{ language.localisedName }}</DefaultButton>
    </GridFit>
</template>