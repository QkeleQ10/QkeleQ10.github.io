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
    font-size: 3rem;
}

h2:has(em) {
    color: var(--greyLight);
}

h2>em {
    color: var(--fgPrimary);
    font-style: normal;
}

h2>.icon {
    position: relative;
    translate: 0 11.5%;
    margin-right: 0.5em;
    font-size: 1em;
    color: var(--fgPrimary);
}

@media (max-width: 1100px) {
    h2 {
        font-size: 2.5rem;
    }
}

@media (max-width: 620px) {
    h2 {
        font-size: 1.75rem;
    }
}
</style>