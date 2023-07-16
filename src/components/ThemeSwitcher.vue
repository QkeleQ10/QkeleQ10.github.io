<script setup>
import { useThemeStore } from '../stores/theme'
import Button from './Button.vue';
import Icon from './Icon.vue';

const theme = useThemeStore()

theme.set((theme.theme))
</script>

<template>
    <div id="theme-switcher">
        <Button class="rail" :aria-label="$i18n('setThemeTooltip', { theme: 'dark' })" :title="$i18n('dark')"
            :aria-checked="theme.theme === 'dark'" :active="theme.theme === 'dark'" :disabled="theme.theme === 'dark'"
            @click="theme.set('dark')">
            <Icon :filled="theme.theme === 'dark'">dark_mode</Icon>
        </Button>
        <Button class="rail" :aria-label="$i18n('setThemeTooltip', { theme: 'light' })" :title="$i18n('light')"
            :aria-checked="theme.theme === 'light'" :active="theme.theme === 'light'" :disabled="theme.theme === 'light'"
            @click="theme.set('light')">
            <Icon :filled="theme.theme === 'light'">light_mode</Icon>
        </Button>
        <Button class="rail" :aria-label="$i18n('setThemeTooltip', { theme: 'auto' })" :title="$i18n('auto')"
            :aria-checked="theme.theme === 'auto'" :active="theme.theme === 'auto'" :disabled="theme.theme === 'auto'"
            @click="theme.set('auto')">
            <Icon :filled="theme.theme === 'auto'">brightness_auto</Icon>
        </Button>
    </div>
</template>

<style></style>