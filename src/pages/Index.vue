<script setup>
import { ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import Header from '../components/Header.vue'
import Hero from '../sections/Hero.vue'
import Localisation from '@/sections/Localisation.vue'
import Projects from '@/sections/Projects.vue'
import NavigationRail from '@/components/NavigationRail.vue'
</script>

<template>
    <NavigationRail />
    <main>
        <Hero />
        <Localisation />
        <Projects />
    </main>
</template>

<style>
@import "../assets/css/base.css"
</style>