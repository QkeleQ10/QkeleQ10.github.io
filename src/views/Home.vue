<script setup>
import Heading1 from '@/components/Heading1.vue'
import { useThemeStore } from '../stores/theme'
import { ref } from 'vue'

const theme = useThemeStore()
theme.setScheme('normal')

const projects = ref()
</script>

<template>
    <section class="centre">
        <div>
            <Heading1>{{ $i18n('welcomeHero') }}</Heading1>
            <p>{{ $i18n('underConstruction') }}</p>
        </div>
        <div class="flex">
            <div class="card">
                <h2>{{ $i18n('socials') }}</h2>
                <Button icon="groups" href="https://discord.gg/RVKXKyaS6y">Discord</Button>
                <Button icon="code" href="https://github.com/QkeleQ10">GitHub</Button>
            </div>
            <div class="card">
                <h2>Study Tools</h2>
                <RouterLink to="/studytools">
                    <Button icon="install_desktop">{{ $i18n('getExtension') }}</Button>
                </RouterLink>
                <RouterLink to="/studytools/grades">
                    <Button icon="upload">{{ $i18n('importGrades') }}</Button>
                </RouterLink>
            </div>
            <div class="card">
                <h2>Pathé Tools</h2>
                <Button icon="arrow_forward" onclick="window.location = 'http:\/\/qkeleq10.github.io/Pathe-Tools'">
                    {{ $i18n('goThere') }}
                </Button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.centre {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    text-align: center;
}

.flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
}

.card {
    position: relative;
    display: grid;
    align-content: start;
    grid-template-rows: auto auto auto 1fr;
    min-width: clamp(200px, 20vw, 300px);
    padding: 1.25em 1em;
    background-color: var(--bgSecondary);
    color: var(--fgSecondary);
    transition: opacity 200ms;
}
</style>