<script setup>
defineProps({
    icon: String
})
</script>

<template>
    <span aria-hidden="true" class="icon material-symbols-rounded">
        <slot></slot>
    </span>
</template>

<style>
button .icon:not(:last-child) {
    margin-right: 6px;
}
</style>