<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
import Heading2 from '@/components/Heading2.vue'
import statsfmImage from '@/assets/images/statsfm.webp'
</script>

<template>
    <section id="localisation">
        <Heading2 icon="language">{{ $i18n('Localisation') }}</Heading2>
        <div class="sectionGrid" role="list">
            <ProjectCard :image-src="statsfmImage" image-alt="stats.fm">
                <template #title>stats.fm</template>
                <template #subtitle>{{ $i18n('Localisation manager') }}</template>
                <template #content>{{ $i18n('statsfmdesc') }}</template>
                <template #buttons>
                    <Button icon="translate" href="https://statsfm.crowdin.com">{{
                        $i18n('Translate')
                    }}
                    </Button>
                </template>
            </ProjectCard>
            <ProjectCard>
                <template #title>PreMiD</template>
                <template #subtitle>{{ $i18n('Proofreader') }}</template>
                <template #content>{{ $i18n('premiddesc') }}</template>
                <template #buttons>
                    <Button icon="translate" href="https://crowdin.com/project/premid">{{
                        $i18n('Translate')
                    }}
                    </Button>
                </template>
            </ProjectCard>
            <ProjectCard>
                <template #title>QkeleQ10</template>
                <template #subtitle>{{ $i18n('Owner') }}</template>
                <template #content>{{ $i18n('qkeleqdesc') }}</template>
                <template #buttons>
                    <Button icon="volunteer_activism" href="https://crowdin.com/project/QkeleQ10">{{
                        $i18n('Contribute')
                    }}
                    </Button>
                </template>
            </ProjectCard>
            <ProjectCard>
                <template #title>Hypixel</template>
                <template #subtitle>{{ $i18n('Former proofreader') }}</template>
                <template #content>{{ $i18n('hypixeldesc') }}</template>
                <template #buttons>
                    <Button icon="translate" href="https://crowdin.com/project/hypixel">{{
                        $i18n('Translate')
                    }}
                    </Button>
                </template>
            </ProjectCard>
            <ProjectCard>
                <template #title>Minecraft</template>
                <template #subtitle>{{ $i18n('Translator') }}</template>
                <template #content>{{ $i18n('mcdesc') }}</template>
                <template #buttons>
                    <Button icon="translate" href="https://crowdin.com/project/minecraft">{{
                        $i18n('Translate')
                    }}
                    </Button>
                </template>
            </ProjectCard>
        </div>
    </section>
</template>

<style>
#localisation {
    display: grid;
    grid-template:
        'heading' auto
        'content' 1fr
        / 1fr;
}

#localisation>.sectionGrid {
    display: grid;
    grid-template:
        'a1 a2 a2 a3' auto
        'a1 a4 a5 a5' auto
        / 1fr 1fr 1fr 1fr;
    gap: 1em;
}

#localisation>.sectionGrid>*:nth-child(1) {
    grid-area: a1;
}

#localisation>.sectionGrid>*:nth-child(2) {
    grid-area: a2;
}

#localisation>.sectionGrid>*:nth-child(3) {
    grid-area: a3;
}

#localisation>.sectionGrid>*:nth-child(4) {
    grid-area: a4;
}

#localisation>.sectionGrid>*:nth-child(5) {
    grid-area: a5;
}

@media (max-width: 1200px) {
    #localisation>.sectionGrid {
        grid-template:
            'a1 a2 a3' auto
            'a1 a4 a5' auto
            / 1fr 1fr 1fr;
        gap: 1em;
    }
}

@media (max-width: 800px) {
    #localisation>.sectionGrid {
        grid-template:
            'a1 a2' auto
            'a1 a3' auto
            'a4 a5' auto
            / 1fr 1fr;
        gap: 1em;
    }
}

@media (max-width: 550px) {
    #localisation>.sectionGrid {
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