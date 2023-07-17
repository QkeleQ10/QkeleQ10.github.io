<script setup>
import { computed, ref } from 'vue';
import { setCookie, getCookie } from "typescript-cookie";

import Icon from './Icon.vue';
import Modal from './Modal.vue';
import Button from './Button.vue';
import Heading2 from './Heading2.vue';

import CollectionHorizontal from './CollectionHorizontal.vue';
const modal = ref()

let languages = ref([{ languageId: 'en', localisedName: 'English', defaultName: 'English', translationProgress: 100, approvalProgress: 100 }]),
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
        return languages.value.push({ ...l.data, ...obj })
    })
}

function setLanguage(language) {
    currentLanguage.value = language
    setCookie('language', language, { expires: 10000 })
    window.location.reload()
}

String.prototype.initial = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}
</script>

<script>
export default {
    inheritAttrs: false
}
</script>

<template>
    <div id="language-switcher" v-bind="$attrs">
        <Button class="shown rail" role="button" :title="$i18n('changeLanguage')" @click="modal.$el.showModal()"
            active="true">
            <Icon>language</Icon>
        </Button>
    </div>
    <Modal class="dock-left" id="modal-language" ref="modal">
        <Heading2 icon="language" class="modal-title"> {{ $i18n('selectLanguage') }} </Heading2>
        <ul id="language-list">
            <li v-for="(language, i) in languages" v-show="language.translationProgress > 20" class="language-item"
                :style="{ '--animation-order': i }">
                <div class="language-item-container">
                    <Button class="secondary left" :aria-label="language.defaultName"
                        :title="$i18n('changeLanguageTooltip', { language: language.defaultName })"
                        :id="'language-option-' + language.languageId" :key="language.languageId"
                        :active="currentLanguage === language.languageId" @click="setLanguage(language.languageId)">
                        <div class="language-button">
                            <img :src="`https://raw.githubusercontent.com/QkeleQ10/http-resources/main/flags/${language.languageId}.png`"
                                width="26" height="26" :alt="language.defaultName" aria-hidden="true">
                            <span>{{ language.localisedName }}</span>
                            <span>{{ language.defaultName }}</span>
                        </div>
                    </Button>
                    <Button v-show="language.translationProgress < 100" class="secondary insignificant" icon="edit"
                        :active="currentLanguage === language.languageId" :filled="currentLanguage === language.languageId"
                        :title="$i18n('helpTranslate') + ` (${language.defaultName} ${language.translationProgress}%)`"
                        :href="`https://crowdin.com/project/QkeleQ10/${language.languageId}`"></Button>
                </div>
            </li>
        </ul>
        <CollectionHorizontal class="wrap no-row-gap align-right" :style="{ '--animation-order': languages.length }">
            <Button class="secondary" icon="edit" href="https://crowdin.com/project/QkeleQ10/">
                {{ $i18n('helpTranslate') }}</Button>
            <Button class="primary" icon="close" @click="modal.dismissModal()">
                {{ $i18n('close') }}</Button>
        </CollectionHorizontal>
    </Modal>
</template>

<style>
#modal-language {
    grid-template-rows: auto 1fr auto;
    gap: 6px;
    overflow: hidden;
    background-color: transparent;
    background-size: 100% 200%;
    background-image: linear-gradient(to bottom, transparent 50%, var(--bgPrimary) 50%);
    transition: background-position 2000ms cubic-bezier(0, 0, 0, 1), box-shadow 200ms;
}

#modal-language[open] {
    display: grid;
}

#modal-language[open]>h2 {
    margin-bottom: 10px;
}

#language-list {
    list-style-type: none;
    overflow: auto;
    padding: 0;
    margin: 0;
}

.language-item {
    position: relative;
}

.language-item-container {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: stretch;
    width: 100%;
}

.language-item-container>*:first-child {
    flex: 1;
}

.language-button {
    display: flex;
    align-items: center;
    gap: 12px;
}

.language-button>span:last-child {
    opacity: 0;
    transition: opacity 200ms;
}

li:hover .language-button>span:last-child {
    opacity: .4;
}
</style>