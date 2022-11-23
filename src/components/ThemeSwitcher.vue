<script setup>
import Icon from './Icon.vue';
</script>

<template>
    <div id="theme-switcher">
        <button type="button" role="switch" title="Dark theme" :aria-checked="this.$root.theme == 'dark'"
            :active="this.$root.theme == 'dark'" @click="this.$root.theme = 'dark'">
            <Icon>dark_mode</Icon>
        </button>
        <button type="button" role="switch" title="Light theme" :aria-checked="this.$root.theme == 'light'"
            :active="this.$root.theme == 'light'" @click="this.$root.theme = 'light'">
            <Icon>light_mode</Icon>
        </button>
        <button type="button" role="switch" title="Adapt to system theme" :aria-checked="this.$root.theme == 'auto'"
            :active="this.$root.theme == 'auto'" @click="this.$root.theme = 'auto'">
            <Icon>brightness_auto</Icon>
        </button>
    </div>
</template>

<style>
#theme-switcher {
    display: grid;
    grid-auto-flow: column;
    border: 1px solid currentColor;
}

#theme-switcher>button {
    background: none;
    outline: none;
    border: none;
    color: currentColor;
    width: 3em;
    height: 2em;
    margin: 0;
    padding: 0 0.25em;
    transition: width 200ms, padding 200ms, opacity 200ms, background-color 200ms, color 200ms;
}

#theme-switcher:hover>button[active=true] {
    background-color: rgb(var(--highlightLight));
    color: var(--txt);
}

#theme-switcher>button:hover {
    background-color: rgba(var(--highlightLight), 0.5);
}

#theme-switcher:not(:hover):not(:focus-within)>button:not([active=true]) {
    width: 0;
    padding: 0;
    opacity: 0;
    pointer-events: none;
}
</style>