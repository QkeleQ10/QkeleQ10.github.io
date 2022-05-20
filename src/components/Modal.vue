<script setup>
const emit = defineEmits(['close-modal'])
function closeModal(event) { emit('close-modal', event?.currentTarget?.id || 'all') }

document.onkeyup = (e) => {
    if (e.key === 'Escape') closeModal('all')
}
</script>

<template>
    <div class="modal-backdrop" @click.self="closeModal($event)">
        <dialog class="modal" role="dialog" tabindex="0">
            <h2 class="modal-title">
                <slot name="title"></slot>
            </h2>
            <slot name="content"></slot>
            <a class="modal-close" tabindex="0" role="button">{{ $i18n('Close modal') }}</a>
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
    background: rgba(0, 0, 0, 0.5);
}

.modal {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: clamp(150px, 75%, 750px);
    max-height: 90vh;
    background-color: var(--bk2);
    padding: 20px;
    box-shadow: 0 0 5px var(--shadow);
    outline: none;
    border: none;
    border-radius: 6px;
    color: var(--txt2);
    overflow-wrap: normal;
    overflow: auto;
}

.modal-title {
    color: var(--txt);
    margin: 0;
}

.modal-close {
    height: 0;
    width: 0;
    opacity: 0;
    margin: -20px 0 0 0;

}
</style>