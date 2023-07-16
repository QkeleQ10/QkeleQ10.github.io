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
    user-select: none;
    font-variation-settings: 'FILL' 0;
    transition: font-variation-settings 200ms ease-out;
}

.icon.fill {
    font-variation-settings: 'FILL' 1;
}

button .icon:not(:last-child) {
    margin-right: 6px;
}
</style>