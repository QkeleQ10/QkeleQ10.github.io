<script setup>
import Icon from './Icon.vue';
import Modal from './Modal.vue';
import LanguageList from './LanguageList.vue';
import { ref } from 'vue'
import ExpandingSwitcher from './ExpandingSwitcher.vue';

const pickerOpen = ref(0)

function helpTranslate() { window.open('https://crowdin.com/project/QkeleQ10', '_blank') }
</script>

<script>
export default {
    inheritAttrs: false
}
</script>

<template>
    <ExpandingSwitcher id="language-switcher" v-bind="$attrs">
        <button type="button" role="link" :title="$i18n('helpTranslate')" @click="helpTranslate()">
            <Icon>volunteer_activism</Icon>
        </button>
        <button class="shown" type="button" role="button" :title="$i18n('changeLanguage')" @click="pickerOpen = 1"
            active="true">
            <Icon>language</Icon>
        </button>
    </ExpandingSwitcher>
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

</style>