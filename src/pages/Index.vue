<script setup>
import { ref, reactive, inject } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import Scrollable from '../components/Scrollable.vue'
import ButtonDefault from '../components/ButtonDefault.vue'
import Header from '../components/Header.vue'
import Modals from '../components/Modals.vue'
import Icon from '../components/Icon.vue'
import Hero from '../sections/Hero.vue'
import Localisation from '@/sections/Localisation.vue'

const modals = ref(null)
function openModal(modal) { modals.value.openModal(modal) }
</script>

<template>
    <Header />
    <main>
        <Hero />
        <Localisation />
        <!-- <section>
            <h2>
                <Icon icon="compass" />
                {{ $i18n('Localisation') }}
            </h2>
            <Scrollable class="padded" role="list">
                <ProjectCard>
                    <template #title>QkeleQ10</template>
                    <template #subtitle>{{ $i18n('Owner') }}</template>
                    <template #content>{{ $i18n('qkeleqdesc') }}</template>
                    <template #buttons>
                        <ButtonDefault icon="heart" href="https://crowdin.com/project/QkeleQ10">{{ $i18n('Contribute')
                        }}
                        </ButtonDefault>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Stats.fm</template>
                    <template #subtitle>{{ $i18n('Localisation manager') }}</template>
                    <template #content>{{ $i18n('spotistatsdesc') }}</template>
                    <template #buttons>
                        <ButtonDefault icon="english-to-chinese" href="https://statsfm.crowdin.com">{{
                                $i18n('Translate')
                        }}
                        </ButtonDefault>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>PreMiD</template>
                    <template #subtitle>{{ $i18n('Proofreader') }}</template>
                    <template #content>{{ $i18n('premiddesc') }}</template>
                    <template #buttons>
                        <ButtonDefault icon="english-to-chinese" href="https://crowdin.com/project/premid">{{
                                $i18n('Translate')
                        }}
                        </ButtonDefault>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Hypixel</template>
                    <template #subtitle>{{ $i18n('Proofreader') }}</template>
                    <template #content>{{ $i18n('hypixeldesc') }}</template>
                    <template #buttons>
                        <ButtonDefault icon="english-to-chinese" href="https://crowdin.com/project/hypixel">{{
                                $i18n('Translate')
                        }}
                        </ButtonDefault>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Minecraft</template>
                    <template #subtitle>{{ $i18n('Translator') }}</template>
                    <template #content>{{ $i18n('mcdesc') }}</template>
                    <template #buttons>
                        <ButtonDefault icon="english-to-chinese" href="https://crowdin.com/project/minecraft">{{
                                $i18n('Translate')
                        }}
                        </ButtonDefault>
                    </template>
                </ProjectCard>
            </Scrollable>
        </section> -->
    </main>
    <!-- <footer>{{ $i18n('footer') }}</footer> -->
    <Modals ref="modals" />
</template>

<style>
@import "../assets/css/base.css"
</style>