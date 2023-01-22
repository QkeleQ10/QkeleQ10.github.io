<script setup>
import ProjectCard from '@/components/ProjectCard.vue'
import Heading2 from '@/components/Heading2.vue'
import NavigationRail from '@/components/NavigationRail.vue';
</script>

<template>
    <NavigationRail />
    <main>
        <section id="st">
            <Heading2 icon="extension">Study Tools voor Magister</Heading2>
            <div class="sectionGrid" role="list">
                <ProjectCard stretch-buttons :data-highlight="$browser() === 'edge'">
                    <template #title>Microsoft Edge</template>
                    <template #content>Installeer de extensie met de knop hieronder.</template>
                    <template #buttons><Button icon="shopping_cart"
                            href="https://microsoftedge.microsoft.com/addons/detail/study-tools-voor-magister/ohhafpjdnbhihibepefpcmnnodaodajc">Installeren
                            via Edge Add-ons</Button></template>
                </ProjectCard>
                <ProjectCard stretch-buttons :data-highlight="$browser() === 'firefox'">
                    <template #title>Mozilla Firefox</template>
                    <template #content>Installeer de extensie met de knop hieronder.</template>
                    <template #buttons><Button icon="shopping_cart"
                            href="https://addons.mozilla.org/nl/firefox/addon/studytools/">Installeren
                            via Firefox Add-ons</Button></template>
                </ProjectCard>
                <ProjectCard stretch-buttons disabled>
                    <template #title>Google Chrome</template>
                    <template #content>Gebruik voorlopig de installatiemethode voor andere Chromium-browsers.</template>
                </ProjectCard>
                <ProjectCard stretch-buttons :data-highlight="$browser() === 'chromium'">
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
                            target="_self">Downloaden voor Chromium</Button></template>
                </ProjectCard>
                <ProjectCard stretch-buttons data-highlight="false">
                    <template #title>Bètaversie</template>
                    <template #subtitle>Voor Chromium-browsers</template>
                    <template #buttons><Button icon="download"
                            href="https://github.com/QkeleQ10/Study-Tools/archive/refs/heads/dev.zip">Bètaversie
                            downloaden voor Chromium</Button></template>
                </ProjectCard>
            </div>
        </section>
    </main>
</template>

<style>
@import "../assets/css/base.css";

#st {
    display: grid;
    grid-template:
        'heading' auto
        'content' 1fr
        / 1fr;
}

#st>.sectionGrid {
    display: grid;
    grid-template:
        'a1 a2 a3' auto
        'a4 a4 a5' auto
        'a4 a4 a5' auto
        / 1fr 1fr 1fr;
    gap: 1em;
}

#st>.sectionGrid>*:nth-child(1) {
    grid-area: a1;
}

#st>.sectionGrid>*:nth-child(2) {
    grid-area: a2;
}

#st>.sectionGrid>*:nth-child(3) {
    grid-area: a3;
}

#st>.sectionGrid>*:nth-child(4) {
    grid-area: a4;
}

#st>.sectionGrid>*:nth-child(5) {
    grid-area: a5;
}

@media (max-width: 1100px) {
    #st>.sectionGrid {
        grid-template:
            'a1 a2' auto
            'a3 a3' auto
            'a4 a4' auto
            'a5 a5' auto
            / 1fr 1fr;
        gap: 1em;
    }
}

@media (max-width: 620px) {
    #st>.sectionGrid {
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