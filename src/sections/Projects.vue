<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
import Heading2 from '@/components/Heading2.vue'
</script>

<template>
    <section id="projects">
        <Heading2 icon="web">{{ $i18n('Projects') }}</Heading2>
        <div class="sectionGrid" role="list">
            <ProjectCard>
                <template #title>Minecraft Translators Bot</template>
                <template #subtitle>{{ $i18n('Discord bot') }}</template>
                <template #content>{{ $i18n('mctdesc') }}</template>
                <template #buttons>
                    <Button icon="forum" href="https://discord.gg/wpD5sPD">{{ $i18n('Join') }}</Button>
                </template>
            </ProjectCard>
            <ProjectCard>
                <template #title>Study Tools voor Magister</template>
                <template #subtitle>{{ $i18n('Browser extension') }}</template>
                <template #content>{{ $i18n('studytoolsdesc') }}</template>
                <template #buttons>
                    <RouterLink to="/extensions/studytools">
                        <Button icon="shopping_cart">{{ $i18n('Install') }}</Button>
                    </RouterLink>
                    <Button href="https://github.com/QkeleQ10/Study-Tools" icon="code">GitHub</Button>
                </template>
            </ProjectCard>
        </div>
    </section>
</template>

<style>
#projects>.sectionGrid {
    display: grid;
    height: 100%;
    grid-template:
        'a1 a1 a2' auto
        / 1fr 1fr 1fr;
    gap: 1em;
}

#projects>.sectionGrid>*:nth-child(1) {
    grid-area: a1;
}

#projects>.sectionGrid>*:nth-child(2) {
    grid-area: a2;
}

@media (max-width: 800px) {
    #projects>div {
        grid-template:
            'a1 a2' auto
            / 1fr 1fr;
        gap: 1em;
    }
}

@media (max-width: 550px) {
    #projects>div {
        grid-template:
            'a1' auto
            'a2' auto
            / 1fr;
        gap: 1em;
    }
}
</style>