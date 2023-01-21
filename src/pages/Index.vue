<script setup>
import Hero from '../sections/Hero.vue'
import Localisation from '@/sections/Localisation.vue'
import Projects from '@/sections/Projects.vue'
import NavigationRail from '@/components/NavigationRail.vue'
</script>

<template>
    <NavigationRail />
    <main>
        <Hero />
        <Projects />
        <Localisation />
    </main>
</template>

<style>
@import "../assets/css/base.css"
</style>