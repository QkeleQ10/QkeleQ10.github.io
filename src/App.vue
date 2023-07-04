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
        <section id="hero"></section>
        <router-view v-slot="{ Component }">
            <!-- <transition name="fade"> -->
            <component :is="Component" />
            <!-- </transition> -->
        </router-view>
    </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
}

.fade-enter-active {
    transition-delay: .25s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>