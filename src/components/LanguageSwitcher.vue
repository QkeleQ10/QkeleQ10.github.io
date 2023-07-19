<script setup>
import { computed, ref, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router'

import Icon from './Icon.vue';
import Modal from './Modal.vue';
import Button from './Button.vue';
import Heading2 from './Heading2.vue';

import CollectionHorizontal from './CollectionHorizontal.vue';

const router = useRouter()
const route = useRoute()

const modal = ref()

let allMeta = ref(inject('meta'))
let currentLanguage = ref(inject('language'))

// Remove English for now, so that it can be added at the top later
let meta = computed(() => {
    return (({ en, ...o }) => o)(allMeta.value)
})

function applyLanguage() {
    window.location.reload()
    modal.value.dismissModal()
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
            <!-- {{ $changeLanguage('fr') }} -->
            <li v-for="(language, key, i) in { en: allMeta.en, ...meta }" v-show="language.translationProgress > 20"
                class="language-item" :style="{ '--animation-order': i }">
                <div class="language-item-container">
                    <Button class="secondary left" :aria-label="language.languageName" :title="language.languageName"
                        :id="'language-option-' + language.languageId" :key="language.languageId"
                        :active="currentLanguage === language.languageId"
                        @click="$changeLanguage(language.languageId); currentLanguage = language.languageId; applyLanguage()">
                        <div class="language-details">
                            <img :src="`https://raw.githubusercontent.com/QkeleQ10/http-resources/main/flags/${language.languageId}.png`"
                                width="26" height="26" :alt="language.languageName" aria-hidden="true">
                            <span>{{ language.languageName }}</span>
                            <span>{{ $i18n('translationProgress', {
                                percentage: Number(language.translationProgress /
                                    100).toLocaleString(currentLanguage, { style: 'percent' })
                            }) }}</span>
                        </div>
                    </Button>
                    <Button v-show="language.translationProgress < 100" class="secondary insignificant" icon="edit"
                        :active="currentLanguage === language.languageId" :filled="currentLanguage === language.languageId"
                        :title="$i18n('helpTranslate')"
                        :href="`https://crowdin.com/project/QkeleQ10/${language.languageId}`"></Button>
                </div>
            </li>
        </ul>
        <CollectionHorizontal class="wrap no-row-gap align-right" :style="{ '--animation-order': meta.length }">
            <Button class="secondary" icon="edit" href="https://crowdin.com/project/QkeleQ10/">
                {{ $i18n('helpTranslate') }}</Button>
            <Button class="primary" icon="close" @click="modal.dismissModal()">
                {{ $i18n('close') }}</Button>
        </CollectionHorizontal>
    </Modal>
</template>

<style>
#modal-language>.modal-inner {
    grid-template-rows: auto 1fr auto;
    gap: 6px;
}

#modal-language[open]>.modal-inner {
    display: grid;
}

#modal-language[open]>.modal-inner>h2 {
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
    justify-content: stretch;
    width: 100%;
}

.language-item-container>* {
    height: 100%;
}

.language-item-container>*:first-child {
    flex: 1;
}

.language-details {
    display: grid;
    grid-template-columns: auto max-content auto auto;
    overflow-x: hidden;
    align-items: center;
    gap: 12px;
}

.language-details>span:nth-child(n+3) {
    opacity: 0;
    transition: opacity 200ms;
}

li:hover .language-details>span:nth-child(n+3) {
    opacity: .4;
}
</style>