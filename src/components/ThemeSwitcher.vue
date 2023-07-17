<script setup>
import { useThemeStore } from '../stores/theme'
import Icon from './Icon.vue';

const theme = useThemeStore()

theme.set((theme.theme))
</script>

<template>
    <div id="theme-switcher" role="radiogroup" :aria-label="$i18n('themeSwitcherAria')">
        <div :title="$i18n('dark')">
            <input :aria-label="$i18n('dark')" type="radio" id="theme-dark" :checked="theme.theme === 'dark'"
                @click="theme.set('dark')">
            <label for="theme-dark" aria-hidden="true">
                <Icon aria-hidden="true" :filled="theme.theme === 'dark'">dark_mode</Icon>
            </label>
        </div>
        <div :title="$i18n('light')">
            <input :aria-label="$i18n('light')" type="radio" id="theme-light" :checked="theme.theme === 'light'"
                @click="theme.set('light')">
            <label for="theme-light" aria-hidden="true">
                <Icon aria-hidden="true" :filled="theme.theme === 'light'">light_mode</Icon>
            </label>
        </div>
        <div :title="$i18n('auto')">
            <input :aria-label="$i18n('auto')" type="radio" id="theme-auto" :checked="theme.theme === 'auto'"
                @click="theme.set('auto')">
            <label for="theme-auto" aria-hidden="true">
                <Icon aria-hidden="true" :filled="theme.theme === 'auto'">brightness_auto</Icon>
            </label>
        </div>
    </div>
</template>

<style>
#theme-switcher>div {
    color: var(--fgSecondary);
    background-color: var(--bgSecondary);
    height: 44px;
    box-shadow: none;
    transition: filter 200ms, background-color 200ms, color 200ms, box-shadow 200ms;
}

:root:not([data-menu-collapsed]) *[data-contrast=true] .button.rail {
    background-color: var(--fgContrast);
    color: var(--bgContrast);
}

#theme-switcher>div>input {
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    pointer-events: none;
}

#theme-switcher>div>label {
    height: 100%;
    width: 100%;
    display: flex;
    place-items: center;
    place-content: center;
    cursor: pointer;
}

#theme-switcher>div:has(:focus-visible) {
    filter: brightness(0.8);
    box-shadow: inset 0 0 0 3px currentColor;
    outline: none;
}

:root:not([data-menu-collapsed]) *[data-contrast=true] #theme-switcher>div {
    background-color: var(--fgContrast);
    color: var(--bgContrast);
}

#theme-switcher>div:has(input:checked) {
    background-color: var(--accentVeryLight);
}

:root:not([data-menu-collapsed]) *[data-contrast=true] #theme-switcher>div:has(input:checked) {
    background-color: var(--accentVeryLightContrast);
    color: var(--bgContrast);
}

#theme-switcher>div:hover {
    filter: brightness(0.9);
}
</style>