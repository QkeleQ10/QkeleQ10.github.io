<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
import Heading2 from '@/components/Heading2.vue'
import studytoolsImage from '@/assets/images/studytools.webp'
</script>

<template>
    <section id="projects">
        <Heading2 icon="web">{{ $i18n('Projects') }}</Heading2>
        <div class="sectionGrid" role="list">
            <ProjectCard :image-src="studytoolsImage" image-alt="stats.fm" image-backdrop>
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
            <ProjectCard>
                <template #title>Minecraft Translators Bot</template>
                <template #subtitle>{{ $i18n('Discord bot') }}</template>
                <template #content>{{ $i18n('mctdesc') }}</template>
                <template #buttons>
                    <Button icon="forum" href="https://discord.gg/wpD5sPD">{{ $i18n('Join') }}</Button>
                </template>
            </ProjectCard>
            <ProjectCard>
                <!-- <template #title></template>
                <template #subtitle></template>
                <template #content></template>
                <template #buttons>
                    <Button icon="" href=""></Button>
                </template> -->
            </ProjectCard>
            <ProjectCard>
                <!-- <template #title></template>
                <template #subtitle></template>
                <template #content></template>
                <template #buttons>
                    <Button icon="" href=""></Button>
                </template> -->
            </ProjectCard>
            <ProjectCard>
                <template #title>GitHub</template>
                <template #content>{{ $i18n('ghdesc') }}</template>
                <template #buttons>
                    <Button icon="open_in_new" href="https://github.com/QkeleQ10">GitHub</Button>
                </template>
            </ProjectCard>
        </div>
    </section>
</template>

<style>
#projects {
    display: grid;
    grid-template:
        'heading' auto
        'content' 1fr
        / 1fr;
}

#projects>.sectionGrid {
    display: grid;
    grid-template:
        'a1 a1 a2' auto
        'a1 a1 a3' auto
        'a4 a5 a5' auto
        / 1fr 1fr 1fr;
    gap: 1em;
}

#projects>.sectionGrid>*:nth-child(1) {
    grid-area: a1;
}

#projects>.sectionGrid>*:nth-child(2) {
    grid-area: a2;
}

#projects>.sectionGrid>*:nth-child(3) {
    grid-area: a3;
}

#projects>.sectionGrid>*:nth-child(4) {
    grid-area: a4;
}

#projects>.sectionGrid>*:nth-child(5) {
    grid-area: a5;
}

@media (max-width: 1100px) {
    #projects>.sectionGrid {
        grid-template:
            'a1 a2' auto
            'a1 a3' auto
            'a4 a5' auto
            / 1fr 1fr;
        gap: 1em;
    }
}

@media (max-width: 620px) {
    #projects>.sectionGrid {
        grid-template:
            'a1' auto
            'a2' auto
            'a3' auto
            'a4' auto
            'a5' auto
            / 1fr;
        gap: 1em;
    }
}
</style>