<script setup>
import { useThemeStore } from '../stores/theme'
import { ref } from 'vue'
import Localisation from '@/sections/index/Localisation.vue'
import Projects from '@/sections/index/Projects.vue'
import Logo from '@/components/Logo.vue';
import CollectionHorizontal from '@/components/CollectionHorizontal.vue';

const theme = useThemeStore()

theme.setScheme('normal')

const projects = ref()
</script>

<template>
    <Teleport to="#hero">
        <div>
            <h1 class="section-title">{{ $i18n('heroTitle') }}</h1>
            <p class="section-about">{{ $i18n('aboutme') }}</p>
        </div>
        <CollectionHorizontal id="hero-buttons">
            <Button icon="expand_more" class="hero" @click="projects.scrollIntoView({ behavior: 'smooth' })">{{
                $i18n('Projects') }}</Button>
            <Button icon="groups" class="hero" href="https://discord.gg/RVKXKyaS6y">Discord</Button>
            <Button icon="code" class="hero" href="https://github.com/QkeleQ10">GitHub</Button>
            <Button class="hero" href="https://twitter.com/QkeleQ10">Twitter</Button>
            <Button class="hero" href="https://crowdin.com/profile/QkeleQ10">Crowdin</Button>
            <Button class="hero" href="https://premid.app/users/807917674477649943">PreMiD</Button>
        </CollectionHorizontal>
        <Logo transparent fill="monochrome" />
    </Teleport>
    <section id="projects" ref="projects">
        <Projects />
    </section>
    <section id="localisation" ref="localisation">
        <Localisation />
    </section>
</template>

<style>
@import "../assets/css/base.css"
</style>