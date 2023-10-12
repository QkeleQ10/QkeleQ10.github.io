<script setup>
defineProps({
    filled: Boolean
})
</script>

<template>
    <span aria-hidden="true" class="icon material-symbols-outlined" :class="filled ? 'fill' : ''">
        <slot></slot>
    </span>
</template>

<style>
.icon {
    --size: 24px;
    -webkit-user-select: none;
    user-select: none;
    font-variation-settings: 'FILL' 0;
    font-size: var(--size);
    min-width: var(--size);
    max-width: var(--size);
    min-height: var(--size);
    max-height: var(--size);
    overflow: hidden;
    box-sizing: content-box;
    transition: font-variation-settings 200ms ease-out;
}

.icon.fill {
    font-variation-settings: 'FILL' 1;
}

button .icon:not(:last-child) {
    margin-right: 6px;
}
</style>