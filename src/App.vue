<script setup>
import { useMeta } from 'vue-meta'
import Hero from './components/Hero.vue'
import NavigationRail from './components/NavigationRail.vue';

useMeta({
    title: '',
    htmlAttrs: { lang: 'en', amp: true }
})
</script>

<template>
    <metainfo>
        <template #title="{ content }">{{ content ? `${content} | QkeleQ10` : `QkeleQ10` }}</template>
    </metainfo>
    <NavigationRail />
    <main>
        <router-view>
        </router-view>
    </main>
</template>