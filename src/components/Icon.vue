<script setup>
defineProps({
    icon: String
})
</script>

<template>
    <i aria-hidden="true" :class="`uil uil-${icon}`" v-if="icon"></i>
</template>

<style>
h1 .uil,
h2 .uil,
h3 .uil,
h4 .uil,
h5 .uil,
h6 .uil {
    color: var(--accent);
    margin: 0 10px 0 0;
}

button .uil {
    font-size: x-large;
}
</style>