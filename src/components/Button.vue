<script setup>
import Icon from "./Icon.vue";

defineProps({
    icon: String,
    href: String,
    target: { type: String, default: '_blank' },
    style: String
})
</script>

<script>
export default {
    inheritAttrs: false
}
</script>

<template>
    <a :href="href" :target="target" role="listitem" tabindex="-1">
        <button type="button" role="button" class="button" v-bind="$attrs">
            <Icon v-if="icon">{{ icon }}</Icon>
            <slot>Button</slot>
        </button></a>
</template>

<style>
@import 'https://unicons.iconscout.com/release/v4.0.0/css/line.css';

a {
    display: block;
    min-width: fit-content;
    height: fit-content;
    text-decoration: none;
    margin: 0;
}

a:has(.button) {
    height: auto;
}

.button {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    height: calc(100% - 10px);
    min-height: 44px;
    width: 100%;
    padding: 5px 15px;
    margin: 10px 0 0;
    font-family: "Montserrat", arial, sans-serif;
    font-weight: 600;
    border: none;
    background-color: rgb(var(--accentLight));
    color: rgb(var(--fgContrast));
    box-shadow: none;
    cursor: pointer;
    transition: background-color 200ms, color 200ms;
}

.button:hover,
.button:focus,
.button:active,
.button[active=true] {
    background: rgb(var(--accentDark));
    color: rgb(var(--bgPrimary));
    outline: none;
}

.button.hero {
    background-color: rgb(var(--fgContrast));
    color: rgb(var(--accentDark));
}

.button.hero:hover,
.button.hero:focus {
    background: rgb(var(--accentVeryLight));
    color: rgb(var(--fgPrimary));
}

.button:focus {
    box-shadow: inset 0 0 0 3px rgb(var(--accentLight));
    outline: none;
}

.button[active=true] {
    cursor: default;
}

.button[disabled] {
    background: rgb(var(--bgTertiary));
    color: var(rgba(var(--greyLight), 0.4));
    box-shadow: none;
    cursor: default;
}
</style>