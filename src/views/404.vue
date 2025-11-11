<script setup>
import { useMeta } from 'vue-meta'
import { useThemeStore } from '../stores/theme'

import Icon from '@/components/Icon.vue';

useMeta({ title: "Study Tools" })

const theme = useThemeStore()
theme.setScheme('error')
</script>

<template>
    <section class="centre">
        <h1>Oops.</h1>
        <p>This page doesn't exist.</p>
    </section>
</template>

<style>
@import "../assets/css/base.css";

#hero:has(#error) {
    justify-content: space-around;
}

#error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    height: 100%;
    font-size: 32px;
}

#error p {
    color: var(--fgContrast);
}
</style>