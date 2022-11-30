<script setup>
import { useThemeStore } from '../stores/theme'
import Icon from './Icon.vue';

const theme = useThemeStore()

theme.set((theme.theme))
</script>

<template>
    <div id="theme-switcher">
        <button type="button" role="switch" :aria-label="$i18n('setThemeTooltip', {theme: 'dark'})" :title="$i18n('dark')"
            :aria-checked="this.$root.theme == 'dark'" :active="theme.theme === 'dark'" @click="theme.set('dark')">
            <Icon>dark_mode</Icon>
        </button>
        <button type="button" role="switch" :aria-label="$i18n('setThemeTooltip', { theme: 'light' })" :title="$i18n('light')"
            :aria-checked="this.$root.theme == 'light'" :active="theme.theme === 'light'" @click="theme.set('light')">
            <Icon>light_mode</Icon>
        </button>
        <button type="button" role="switch" :aria-label="$i18n('setThemeTooltip', { theme: 'auto' })" :title="$i18n('auto')"
            :aria-checked="this.$root.theme == 'auto'" :active="theme.theme === 'auto'" @click="theme.set('auto')">
            <Icon>brightness_auto</Icon>
        </button>
    </div>
</template>

<style>
#theme-switcher {
    display: grid;
    grid-auto-flow: column;
    border: 1px solid transparent;
    background-color: none;
    transition: border 200ms, background-color 200ms;
}

#theme-switcher:hover {
    border-color: rgb(var(--accentVeryLight));
}

header:not([data-hero-visible=true]) #theme-switcher:hover {
    background-color: rgb(var(--bgPrimary));
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
    background-color: rgb(var(--accentVeryLight));
    color: rgb(var(--fgPrimary));
}

#theme-switcher>button:hover {
    background-color: rgba(var(--accentVeryLight), 0.5);
}

#theme-switcher:not(:hover)>button:not([active=true]) {
    width: 0;
    padding: 0;
    opacity: 0;
    pointer-events: none;
}
</style>