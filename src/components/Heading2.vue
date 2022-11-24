<script setup>
import Icon from "./Icon.vue";

defineProps({
    icon: String
})
</script>

<template>
    <h2>
        <Icon>{{ icon }}</Icon>
        <slot></slot>
    </h2>
</template>

<style>
h2 {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

h2>icon {
    position: relative;
    top: 11.5%;
}
</style>