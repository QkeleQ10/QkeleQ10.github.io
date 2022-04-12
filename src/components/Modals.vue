<script setup>
import { ref, reactive } from 'vue'
import Modal from "./Modal.vue";
import LanguageList from "./LanguageList.vue";
import DefaultButton from "./DefaultButton.vue";

let modals = reactive({
    language: false
})

function openModal(modal) {
    modals[modal] = true
}

function closeModal(modal) {
    if (modal = 'all') {
        Object.keys(modals).forEach(key => {
            modals[key] = false
        })
    } else modals[modal] = false
}

defineExpose({ openModal, closeModal })
</script>

<template>
    <div>
        <Transition>
            <Modal v-if="modals.language" id="modal-language" @close-modal="closeModal">
                <template #title>{{ $i18n('Select a language') }}</template>
                <template #content>
                    <LanguageList />
                    <DefaultButton class="tight primary" icon="english-to-chinese"
                        href="https://crowdin.com/project/QkeleQ10">{{ $i18n('Help translate') }}</DefaultButton>
                </template>
            </Modal>
        </Transition>
    </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.1s, transform 0.2s;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: scale(1.1);
}
</style>