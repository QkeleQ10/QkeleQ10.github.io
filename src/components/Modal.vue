
import Heading2 from './Heading2.vue';

<template>
    <div class="modal-backdrop">
        <dialog class="modal" role="dialog" tabindex="0">
            <slot></slot>
        </dialog>
    </div>
</template>

<style>
.modal-backdrop {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(var(--fgTertiary), 0.5);
    backdrop-filter: blur(0.5em);
    animation: fadeIn 200ms;
    z-index: 99;
}

.modal {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: clamp(150px, 75%, 750px);
    max-height: 90vh;
    background-color: rgb(var(--bgPrimary));
    padding: 20px;
    box-shadow: 0 0 5px rgba(var(--fgPrimary), 0.5);
    outline: none;
    border: none;
    border-radius: 6px;
    color: rgb(var(--fgPrimary));
    overflow-wrap: normal;
    overflow: auto;
    z-index: 100;
}

.modal-title {
    color: rgb(var(--fgPrimary));
    margin: 0;
}

.modal-close {
    position: absolute;
    height: 0;
    width: 0;
    opacity: 0;
}
</style>