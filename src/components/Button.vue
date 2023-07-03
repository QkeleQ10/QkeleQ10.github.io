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
    <a :href="href" :target="target" tabindex="-1">
        <button type="button" role="button" class="button" v-bind="$attrs">
            <Icon v-if="icon">{{ icon }}</Icon>
            <slot></slot>
        </button>
    </a>
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

a:focus {
    outline: none;
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
    background-color: var(--accentLight);
    color: var(--fgContrast);
    box-shadow: none;
    cursor: pointer;
    transition: filter 200ms, background-color 200ms, color 200ms, box-shadow 200ms;
}

.button:hover {
    filter: brightness(0.9);
}

.button:focus,
a:focus .button {
    filter: brightness(0.8);
    box-shadow: inset 0 0 0 3px currentColor;
    outline: none;
}

.button.hero {
    background-color: var(--fgContrast);
    color: var(--bgContrast);
}

.button.secondary, .button.toggle {
    background-color: var(--bgSecondary);
    color: var(--fgPrimary);
}

.button.toggle[data-state=true] {
    background-color: var(--accentVeryLight);
}

.button.narrow {
    padding: 5px 8px;
    width: 40px;
}

.button.rail {
    padding: 0;
    margin: 0;
    color: var(--fgSecondary);
    background-color: var(--bgSecondary);
}

.button.rail[active=true] {
    background-color: var(--accentVeryLight);
}

.button[disabled] {
    pointer-events: none;
}
</style>