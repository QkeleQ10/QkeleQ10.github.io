<script setup>
import { ref, reactive, inject } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import ProjectCard from '@/components/ProjectCard.vue'
import Scrollable from '@/components/Scrollable.vue'
import Header from '@/components/Header.vue'
import Icon from '@/components/Icon.vue'
import Hero from '@/sections/Hero.vue'
import Localisation from '@/sections/Localisation.vue'
import Heading2 from '@/components/Heading2.vue'
import GridFit from '@/components/GridFit.vue'
</script>

<template>
    <Header class="collide" />
    <main>
        <section>
            <Heading2 icon="extension">Study Tools voor Magister</Heading2>
            <Scrollable stretch direction="column">
                <ProjectCard stretch-buttons>
                    <template #title>Microsoft Edge</template>
                    <template #content>Installeer de extensie met de knop hieronder.</template>
                    <template #buttons><Button icon="shopping_cart"
                            href="https://microsoftedge.microsoft.com/addons/detail/study-tools-voor-magister/ohhafpjdnbhihibepefpcmnnodaodajc">Installeren
                            via Edge Add-ons</Button></template>
                </ProjectCard>
                <ProjectCard stretch-buttons>
                    <template #title>Andere Chromium-browsers</template>
                    <template #subtitle>Zoals Google Chrome, Brave en Opera</template>
                    <template #content>
                        <p>Volg de stappen hieronder om de extensie te installeren.</p>
                        <ol>
                            <li><span>
                                    Download het .ZIP-bestand en open deze. Het bestand bevat één map.
                                </span></li>
                            <li><span>
                                    Sleep deze map naar de gewenste locatie, zoals je map 'Documenten'.
                                </span></li>
                        </ol>
                        <p>Als je Study Tools voor het eerst installeert:</p>
                        <ol start="3">
                            <li><span>
                                    Ga naar 'chrome://extensions' en zorg ervoor dat de 'Ontwikkelaarsmodus' is
                                    ingeschakeld.
                                </span></li>
                            <li><span>
                                    Klik op 'Uitgepakte extensie laden'. Selecteer vervolgens de map van stap 2.
                                </span></li>
                        </ol>
                        <p>Als je Study Tools al had geïnstalleerd:</p>
                        <ol start="3">
                            <li><span>
                                    Herstart je browser.
                                </span></li>
                        </ol>
                    </template>
                    <template #buttons><Button icon="download"
                            href="https://github.com/QkeleQ10/Study-Tools/archive/refs/heads/main.zip"
                            target="_self">Downloaden voor
                            andere
                            Chromium-browsers</Button></template>
                </ProjectCard>
            </Scrollable>
        </section>
    </main>
</template>

<style>
@import "../assets/css/base.css"
</style>