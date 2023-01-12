<script setup>
import { useThemeStore } from '../stores/theme'
import ExpandingSwitcher from './ExpandingSwitcher.vue';
import Icon from './Icon.vue';

const theme = useThemeStore()

theme.set((theme.theme))
</script>

<template>
    <ExpandingSwitcher id="theme-switcher">
        <button type="button" role="switch" :aria-label="$i18n('setThemeTooltip', { theme: 'dark' })"
            :title="$i18n('dark')" :aria-checked="theme.theme === 'dark'" :active="theme.theme === 'dark'"
            @click="theme.set('dark')">
            <Icon>dark_mode</Icon>
        </button>
        <button type="button" role="switch" :aria-label="$i18n('setThemeTooltip', { theme: 'light' })"
            :title="$i18n('light')" :aria-checked="theme.theme === 'light'" :active="theme.theme === 'light'"
            @click="theme.set('light')">
            <Icon>light_mode</Icon>
        </button>
        <button type="button" role="switch" :aria-label="$i18n('setThemeTooltip', { theme: 'auto' })"
            :title="$i18n('auto')" :aria-checked="theme.theme === 'auto'" :active="theme.theme === 'auto'"
            @click="theme.set('auto')">
            <Icon>brightness_auto</Icon>
        </button>
    </ExpandingSwitcher>
</template>

<style>

</style>