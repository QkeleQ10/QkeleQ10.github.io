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
        <div class="modal-background"></div>
    </dialog>
</template>

<style>
dialog {
    position: fixed;
    left: 0;
    height: calc(100dvh - 64px);
    min-height: 100dvh;
    max-height: 100dvh;
    min-width: 450px;
    margin: 0;
    padding: 0;
    border: none;
    margin-right: 64px;
    overflow: hidden;
    background-color: transparent;
}

@media (max-width: 620px) {
    dialog {
        min-width: 85vw;
        max-width: none;
    }
}

dialog[open] {
    animation: modal-shadow-open 200ms both;
}

dialog.closing {
    animation: modal-shadow-close 200ms both;
}

dialog::backdrop {
    background-color: var(--bgContrast);
    opacity: .5;
}

dialog[open]::backdrop {
    animation: modal-backdrop-open 500ms both;
}

dialog.closing::backdrop {
    animation: modal-backdrop-close 200ms both;
}

dialog[open]>.modal-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--bgPrimary);
    z-index: -1;
    animation: modal-background-open 250ms both;
}

dialog.closing>.modal-background {
    animation: modal-background-close 200ms both;
}

dialog[open]>.modal-inner {
    height: 100%;
    width: 100%;
    padding: 32px;
    box-sizing: border-box;
}

dialog[open]>.modal-inner>*,
dialog[open]>.modal-inner>ul>li {
    animation: modal-content-open 250ms both;
    animation-delay: calc(var(--animation-order) * 7ms);
}

dialog.closing[open]>.modal-inner>*,
dialog.closing[open]>.modal-inner>ul>li {
    animation: modal-content-close 200ms both;
}

@keyframes modal-backdrop-open {
    from {
        opacity: 0;
    }
}

@keyframes modal-backdrop-close {
    to {
        opacity: 0;
    }
}

@keyframes modal-background-open {
    from {
        top: -100vh;
    }

    to {
        top: 0;
    }
}

@keyframes modal-background-close {
    from {
        top: 0;
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.75);
    }

    to {
        top: -100vh;
    }
}

@keyframes modal-shadow-open {
    to {
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.75);
    }
}

@keyframes modal-shadow-close {
    from {
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.75);
    }
}

@keyframes modal-content-open {
    from {
        translate: -150%;
    }
}

@keyframes modal-content-close {
    to {
        translate: -150%;
    }
}
</style>