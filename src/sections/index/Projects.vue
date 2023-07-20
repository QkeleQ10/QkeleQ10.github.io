<script setup>
import Card from '@/components/Card.vue'
import Heading2 from '@/components/Heading2.vue'
import studytoolsImage from '@/assets/images/studytools/themes.webp'
</script>

<template>
    <Heading2 icon="web">{{ $i18n('Projects') }}</Heading2>
    <div class="sectionGrid" role="list">
        <Card :image-src="studytoolsImage" image-alt="stats.fm" image-position>
            <template #title>Study Tools</template>
            <template #subtitle>{{ $i18n('Browser extension') }}</template>
            <template #content>{{ $i18n('studytoolsdesc') }}</template>
            <template #buttons>
                <RouterLink to="/studytools">
                    <Button icon="install_desktop">{{ $i18n('getExtension') }}</Button>
                </RouterLink>
                <RouterLink to="/studytools/grades">
                    <Button icon="upload">{{ $i18n('Import grades') }}</Button>
                </RouterLink>
                <Button href="https://github.com/QkeleQ10/Study-Tools" icon="code">{{ $i18n('viewSource') }}</Button>
            </template>
        </Card>
        <Card>
            <template #title>Minecraft Translators Bot</template>
            <template #subtitle>{{ $i18n('Discord bot') }}</template>
            <template #content>{{ $i18n('mctdesc') }}</template>
            <template #buttons>
                <Button icon="forum" href="https://discord.gg/wpD5sPD">{{ $i18n('joinCommunity') }}</Button>
            </template>
        </Card>
        <Card>
            <!-- <template #title></template>
                <template #subtitle></template>
                <template #content></template>
                <template #buttons>
                    <Button icon="" href=""></Button>
                </template> -->
        </Card>
        <Card>
            <!-- <template #title></template>
                <template #subtitle></template>
                <template #content></template>
                <template #buttons>
                    <Button icon="" href=""></Button>
                </template> -->
        </Card>
        <Card>
            <template #title>GitHub</template>
            <template #content>{{ $i18n('ghdesc') }}</template>
            <template #buttons>
                <Button icon="code" href="https://github.com/QkeleQ10">{{ $i18n('viewSource') }}</Button>
            </template>
        </Card>
    </div>
</template>

<style>
#projects>.sectionGrid {
    grid-template:
        'a1 a1 a2' auto
        'a1 a1 a3' auto
        'a4 a5 a5' auto
        / 1fr 1fr 1fr;
}

@media (max-width: 1100px) {
    #projects>.sectionGrid {
        grid-template:
            'a1 a2' auto
            'a1 a3' auto
            'a4 a5' auto
            / 1fr 1fr;
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
    }
}
</style>