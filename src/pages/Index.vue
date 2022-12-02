<script setup>
import { ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import Header from '../components/Header.vue'
import Hero from '../sections/Hero.vue'
import Localisation from '@/sections/Localisation.vue'
import Projects from '@/sections/Projects.vue'

const heroVisible = ref(false)

function onElementVisibility(state) {
    heroVisible.value = state
}

</script>

<template>
    <Header :data-hero-visible="heroVisible ? true : false" />
    <main>
        <Hero v-element-visibility="onElementVisibility" />
        <Localisation :data-hero-visible="heroVisible ? true : false" />
        <Projects :data-hero-visible="heroVisible ? true : false" />
    </main>
</template>

<style>
@import "../assets/css/base.css"
</style>