<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
import Heading2 from '@/components/Heading2.vue'
</script>

<template>
    <section id="projects">
        <Heading2 icon="web">{{ $i18n('Projects') }}</Heading2>
        <div role="list">
            <ProjectCard id="projects1">
                <template #title>Minecraft Translators Bot</template>
                <template #subtitle>{{ $i18n('Discord bot') }}</template>
                <template #content>{{ $i18n('mctdesc') }}</template>
                <template #buttons>
                    <Button icon="forum" href="https://crowdin.com/project/premid">{{ $i18n('Join') }}</Button>
                </template>
            </ProjectCard>
            <ProjectCard id="projects2">
                <template #title>Study Tools voor Magister</template>
                <template #subtitle>{{ $i18n('Browser extension') }}</template>
                <template #content>{{ $i18n('studytoolsdesc') }}</template>
                <template #buttons>
                    <RouterLink to="/extensions/studytools">
                        <Button icon="shopping_cart">{{ $i18n('Install') }}</Button>
                    </RouterLink>
                </template>
            </ProjectCard>
        </div>
    </section>
</template>

<style>
#projects>div {
    display: grid;
    grid-template:
        'a1 a1 a2' auto
        / 1fr 1fr 1fr;
    gap: 1em;
}

#projects1 {
    grid-area: a1;
}

#projects2 {
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