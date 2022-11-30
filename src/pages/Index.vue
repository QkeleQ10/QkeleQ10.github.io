<script setup>
import { ref, reactive, inject } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import ProjectCard from '../components/ProjectCard.vue'
import Scrollable from '../components/Scrollable.vue'
import Header from '../components/Header.vue'
import Icon from '../components/Icon.vue'
import Hero from '../sections/Hero.vue'
import Localisation from '@/sections/Localisation.vue'

const target = ref(null)
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
    </main>
    <!-- <footer>{{ $i18n('footer') }}</footer> -->
</template>

<style>
@import "../assets/css/base.css"
</style>