<script setup>
import Hero from './components/Hero.vue'
import NavigationRail from './components/NavigationRail.vue';
import { usePageTitle } from './composables/usePageTitle'

usePageTitle('')
</script>

<template>
    <NavigationRail />
    <main>
        <router-view>
        </router-view>
    </main>
</template>