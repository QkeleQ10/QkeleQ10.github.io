<script setup>
import Icon from './Icon.vue';
import Modal from './Modal.vue';
import LanguageList from './LanguageList.vue';
import { ref } from 'vue'

const pickerOpen = ref(0)

function helpTranslate() { window.open('https://crowdin.com/project/QkeleQ10', '_blank') }
</script>

<template>
    <div id="language-buttons">
        <button type="button" role="link" :title="$i18n('helpTranslate')" @click="helpTranslate()">
            <Icon>volunteer_activism</Icon>
        </button>
        <button class="shown" type="button" role="button" :title="$i18n('changeLanguage')" @click="pickerOpen = 1">
            <Icon>language</Icon>
        </button>
    </div>
    <Modal v-if="pickerOpen === 1" id="modal-language" @click.self="pickerOpen = 0">
        <template #title>{{ $i18n('selectLanguage') }}</template>
        <template #content>
            <LanguageList />
            <Button class="tight primary" icon="volunteer_activism" href="https://crowdin.com/project/QkeleQ10">
                {{ $i18n('helpTranslate') }}</Button>
        </template>
    </Modal>
</template>

<style>
#language-buttons {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, minmax(auto, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(auto, 1fr));
    max-width: calc(100vw - 4em);
    border: 1px solid transparent;
    background-color: none;
    transition: border 200ms, background-color 200ms;
}

#language-buttons:hover {
    border-color: rgb(var(--accentVeryLight));
}

header:not([data-hero-visible=true]) #language-buttons:hover {
    background-color: rgb(var(--bgPrimary));
}

#language-buttons>button {
    background: none;
    outline: none;
    border: none;
    color: currentColor;
    width: 3em;
    height: 2em;
    margin: 0;
    padding: 0 0.25em;
    transition: width 200ms, padding 200ms, opacity 200ms, background-color 200ms, color 200ms;
}

#language-buttons>button:hover {
    background-color: rgba(var(--accentVeryLight), 0.5);
}

#language-buttons:not(:hover)>button:not(.shown) {
    width: 0;
    padding: 0;
    opacity: 0;
    pointer-events: none;
}
</style>