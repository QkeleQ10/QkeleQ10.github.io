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

defineExpose({
    dismissModal
})

</script>

<template>
    <dialog ref="modal">
        <slot></slot>
    </dialog>
</template>

<style>
dialog[open] {
    padding: 32px;
    border: none;
    max-height: calc(100vh - 64px);
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
    height: calc(100vh - 64px);
    margin: 0;
    animation: dockedModal 250ms both;
}

dialog.dock-left[open]>*,
dialog.dock-left[open]>ul>li {
    animation: dockedModalContent 250ms both;
    animation-delay: calc(var(--animation-order) * 7ms);
}

dialog.dock-left.closing {
    animation: closeDockedModal 200ms both;
}

dialog.dock-left.closing[open]>*,
dialog.dock-left.closing[open]>ul>li {
    animation: closeDockedModalContent 200ms both;
}

a#closer {
    position: absolute !important;
    top: -9999px !important;
    left: -9999px !important;
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