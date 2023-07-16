<script setup>
import { ref } from 'vue';

let modal = ref(null)
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

dialog.dock-left {
    position: fixed;
    left: 0;
    height: calc(100vh - 64px);
    margin: 0;
    animation: dockedModal 250ms both;
}

dialog.dock-left[open]>*, dialog.dock-left[open]>ul>li {
    animation: dockedModalContent 250ms both;
    animation-delay: calc(var(--animation-order) * 7ms);
}

a#closer {
    position: absolute !important;
    top: -9999px !important;
    left: -9999px !important;
}

@keyframes dockedModal {
    to {
        background-position: 0 -100%;
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.75);
    }
}

@keyframes dockedModalContent {
    from {
        translate: -150%;
    }
}
</style>