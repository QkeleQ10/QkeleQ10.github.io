<script setup>
import { ref } from 'vue';

let modal = ref()

const dismissModal = () => {
    modal.value.classList.add('closing')
    setTimeout(() => {
        modal.value.close()
        modal.value.classList.remove('closing')
    }, 200)
}

function modalClick(event) {
    // Call dismissModal() when clicked outside .modal-inner
    if (event.target.tagName === 'DIALOG') {
        dismissModal()
    }
}

defineExpose({
    dismissModal
})
</script>

<template>
    <dialog ref="modal" @click="modalClick">
        <div class="modal-inner">
            <slot></slot>
        </div>
    </dialog>
</template>

<style>
dialog[open] {
    padding: 0;
    border: none;
    min-height: 100dvh;
    max-height: 100dvh;
}

dialog[open]>.modal-inner {
    height: 100%;
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
}

dialog::backdrop {
    background-color: var(--bgContrast);
    opacity: .5;
}

dialog[open]::backdrop {
    animation: modalBackdrop 500ms;
}

dialog.closing[open]::backdrop {
    animation: closeModalBackdrop 200ms;
}

dialog.dock-left {
    position: fixed;
    left: 0;
    height: calc(100dvh - 64px);
    margin: 0;
    margin-right: 64px;
    overflow: hidden;
    background-color: transparent;
    background-size: 100% 200%;
    background-image: linear-gradient(to bottom, transparent 50%, var(--bgPrimary) 50%);
    transition: background-position 2000ms cubic-bezier(0, 0, 0, 1), box-shadow 200ms;
    animation: dockedModal 250ms both;
}

dialog.dock-left[open]>.modal-inner>*,
dialog.dock-left[open]>.modal-inner>ul>li {
    animation: dockedModalContent 250ms both;
    animation-delay: calc(var(--animation-order) * 7ms);
}

dialog.dock-left.closing {
    animation: closeDockedModal 200ms both;
}

dialog.dock-left.closing[open]>.modal-inner>*,
dialog.dock-left.closing[open]>.modal-inner>ul>li {
    animation: closeDockedModalContent 200ms both;
}

@keyframes modalBackdrop {
    from {
        opacity: 0;
    }
}

@keyframes closeModalBackdrop {
    to {
        opacity: 0;
    }
}

@keyframes dockedModal {
    to {
        background-position: 0 -100%;
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.75);
    }
}

@keyframes closeDockedModal {
    from {
        background-position: 0 -100%;
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.75);
    }
}

@keyframes dockedModalContent {
    from {
        translate: -150%;
    }
}

@keyframes closeDockedModalContent {
    to {
        translate: -150%;
    }
}
</style>