<script setup>
import { useThemeStore } from '../stores/theme'
import { ref } from 'vue'

import Localisation from '@/sections/index/Localisation.vue'
import Projects from '@/sections/index/Projects.vue'
import Logo from '@/components/Logo.vue';

const theme = useThemeStore()
theme.setScheme('normal')

const projects = ref()
</script>

<template>
    <section class="centre">
        <div>
            <h1>Welcome!</h1>
            <p>This page is under construction. For now:</p>
        </div>
        <div class="grid-3">
            <div class="card">
                <h2>Socials</h2>
                <Button icon="groups" href="https://discord.gg/RVKXKyaS6y">Discord</Button>
                <Button icon="code" href="https://github.com/QkeleQ10">GitHub</Button>
            </div>
            <div class="card">
                <h2>Study Tools</h2>
                <RouterLink to="/studytools">
                    <Button icon="install_desktop">{{ $i18n('getExtension') }}</Button>
                </RouterLink>
                <RouterLink to="/studytools/grades">
                    <Button icon="upload">{{ $i18n('Import grades') }}</Button>
                </RouterLink>
            </div>
            <div class="card">
                <h2>Pathé Tools</h2>
                <Button onclick="window.location = 'http:\/\/qkeleq10.github.io/Pathe-Tools'">Go there</Button>
            </div>
        </div>
    </section>
</template>

<style>
@import "../assets/css/base.css";

.centre {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    text-align: center;
}

.grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: .25rem;
}

.grid-3 {
    display: grid;
    grid-template-columns: 350px 350px 350px;
    gap: 1.5rem;
}
</style>