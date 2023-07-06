<script setup>
import { useMeta } from 'vue-meta'
import { useThemeStore } from '../stores/theme'
import { useMouse, useWindowSize } from '@vueuse/core'

import Icon from '@/components/Icon.vue';

useMeta({ title: "Study Tools" })

const theme = useThemeStore()
theme.setScheme('error')

const { x, y, sourceType } = useMouse(),
    { width, height } = useWindowSize()
</script>

<template>
    <main>
        <Teleport to="#hero">
            <div id="error"
                :style="{ transform: `translateX(${((x - width / 2) * 10 / width)}px) translateY(${((y - height / 2) * 10 / height)}px)` }">
                <h1 class="section-title">Oops.</h1>
                <p>This page doesn't exist.</p>
                <RouterLink to="/">
                    <Button icon="home" class="">Main page</Button>
                </RouterLink>
            </div>
            <Icon
                :style="{ transform: `translateX(${-((x - width / 2) * 50 / width)}px) translateY(${-((y - height / 2) * 50 / height)}px)` }">
                warning</Icon>
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

#error>h1,
#error>p {
    color: var(--fgContrast);
}
</style>