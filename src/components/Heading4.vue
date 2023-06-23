<script setup>
import Icon from "./Icon.vue";

defineProps({
    icon: String
})
</script>

<template>
    <h4>
        <Icon>{{ icon }}</Icon>
        <slot></slot>
    </h4>
</template>

<style>
h4 {
    font-size: 1.5rem;
}

h4:has(em) {
    color: var(--greyLight);
}

h4>em {
    color: var(--fgPrimary);
    font-style: normal;
}

h4>.icon {
    position: relative;
    translate: 0 11.5%;
    margin-right: 0.3em;
    font-size: 1em;
    color: var(--fgPrimary);
}

@media (max-width: 1100px) {
    h4 {
        font-size: 1.4rem;
    }
}

@media (max-width: 620px) {
    h4 {
        font-size: 1.1rem;
    }
}
</style>