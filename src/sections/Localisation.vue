<script setup>
import Scrollable from '@/components/Scrollable.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import Heading2 from '@/components/Heading2.vue';
</script>

<template>
    <section>
        <Heading2 icon="language">{{ $i18n('Localisation') }}</Heading2>
        <Scrollable data-direction="column" role="list">
            <ProjectCard>
                <template #title>QkeleQ10</template>
                <template #subtitle>{{ $i18n('Owner') }}</template>
                <template #content>{{ $i18n('qkeleqdesc') }}</template>
                <template #buttons>
                    <Button icon="volunteer_activism" href="https://crowdin.com/project/QkeleQ10">{{ $i18n('Contribute')
                    }}
                    </Button>
                </template>
            </ProjectCard>
            <ProjectCard>
                <template #title>Stats.fm</template>
                <template #subtitle>{{ $i18n('Localisation manager') }}</template>
                <template #content>{{ $i18n('spotistatsdesc') }}</template>
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
                <template #title>Hypixel</template>
                <template #subtitle>{{ $i18n('Proofreader') }}</template>
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
        </Scrollable>
        <div style="height: 150vh"></div>
    </section>
</template>