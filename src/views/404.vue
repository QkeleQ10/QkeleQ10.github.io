<script setup>
import { useMeta } from 'vue-meta'
import { useThemeStore } from '../stores/theme'

import Icon from '@/components/Icon.vue';

useMeta({ title: "Study Tools" })

const theme = useThemeStore()
theme.setScheme('error')
</script>

<template>
    <main>
        <Teleport to="#hero-title">Oops</Teleport>
        <Teleport to="#hero-description">
            This page doesn't exist.
        </Teleport>
        <Teleport to="#hero-buttons">
            <RouterLink to="/">
                <Button icon="home" class="hero">Main page</Button>
            </RouterLink>
        </Teleport>
        <Teleport to="#hero-icon">
            <Icon>warning</Icon>
        </Teleport>
    </main>
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