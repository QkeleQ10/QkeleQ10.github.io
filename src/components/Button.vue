<script setup>
import Icon from "./Icon.vue";

defineProps({
    icon: String,
    filled: Boolean,
    href: String,
    target: { type: String, default: '_blank' }
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
            <Icon v-if="icon" :filled="filled">{{ icon }}</Icon>
            <slot></slot>
        </button>
    </a>
</template>

<style>
a {
    display: block;
    min-width: fit-content;
    height: fit-content;
    text-decoration: none;
    margin: 0;
}

a:focus-visible {
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
    font-family: var(--font2);
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

.button:focus-visible,
a:focus-visible .button {
    filter: brightness(0.8);
    box-shadow: inset 0 0 0 3px currentColor;
    outline: none;
}

ul>li a>.button {
    margin-top: 2px;
}

.button.hero {
    background-color: var(--fgContrast);
    color: var(--bgContrast);
}

.button.secondary,
.button.toggle {
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

.button.insignificant .icon {
    opacity: .5;
}

.button.left {
    text-align: left;
    justify-content: start;
}

.button.rail {
    padding: 0;
    margin: 0;
    color: var(--fgSecondary);
    background-color: var(--bgSecondary);
}

.button.rail[active=true],
.button.secondary[active=true] {
    background-color: var(--accentVeryLight);
}

.button[disabled] {
    pointer-events: none;
}
</style>