<script setup>
import { useMeta } from 'vue-meta'
import { useThemeStore } from '../stores/theme'
import { ref } from 'vue'

import Card from '@/components/Card.vue'
import Heading2 from '@/components/Heading2.vue'
import Icon from '@/components/Icon.vue';
import imageTheme from '@/assets/images/studytools/themes.webp'
import imageLogin from '@/assets/images/studytools/login.webp'
import imageToday from '@/assets/images/studytools/today.webp'
import imageStudyguide from '@/assets/images/studytools/studyguide.webp'
import imageGradecalculator from '@/assets/images/studytools/gradecalculator.webp'
import imageGradebackup from '@/assets/images/studytools/gradebackup.webp'
import CollectionHorizontal from '@/components/CollectionHorizontal.vue';

useMeta({ title: "Study Tools" })

const theme = useThemeStore()
theme.setScheme('st')

const installation = ref()
</script>

<template>
    <Teleport to="#hero">
        <div>
            <h1 class="section-title">Study Tools voor Magister</h1>
            <p class="section-about">Een gratis flexibele browserextensie tjokvol verbeteringen voor Magister—de
                grootste
                elektronische leeromgeving van Nederland.</p>
        </div>
        <CollectionHorizontal id="hero-buttons">
            <Button icon="expand_more" class="hero" @click="installation.scrollIntoView({ behavior: 'smooth' })">{{
                $i18n('Install') }}</Button>
            <RouterLink to="/studytools/grades">
                <Button icon="upload_file" class="hero">Cijferback-up</Button>
            </RouterLink>
            <Button icon="code" class="hero" href="https://github.com/QkeleQ10/Study-Tools">GitHub</Button>
            <Button icon="volunteer_activism" class="hero" href="https://paypal.me/QkeleQ10">PayPal</Button>
        </CollectionHorizontal>
        <Icon>school</Icon>
    </Teleport>
    <section ref="installation" id="installation" class="half">
        <Heading2 icon="install_desktop">{{ $i18n('Install') }}</Heading2>
        <div class="sectionGrid" role="list">
            <Card stretch-buttons :data-highlight="$browser() === 'chromium' || $browser() === 'edge'">
                <template #title>Chrome Web Store</template>
                <template #subtitle>Voor Chromium-browsers zoals Microsoft Edge, Google Chrome, Brave en
                    Opera</template>
                <template #content>Aanbevolen. Installeer de extensie met de knop hieronder.</template>
                <template #buttons><Button icon="shopping_cart"
                        href="https://chrome.google.com/webstore/detail/study-tools-voor-magister/hacjodpccmeoocakiahjfndppdeallak">Installeren
                        via Chrome Web Store</Button></template>
            </Card>
            <Card stretch-buttons :data-highlight="$browser() === 'firefox'">
                <template #title>Firefox Add-ons</template>
                <template #content>Deze versie kan achterlopen of instabiel zijn. Het wordt aangeraden om een
                    Chromium-browser te gebruiken.</template>
                <template #buttons><Button icon="shopping_cart"
                        href="https://addons.mozilla.org/nl/firefox/addon/studytools/">Installeren
                        via Firefox Add-ons</Button></template>
            </Card>
        </div>
    </section>
    <section id="features" class="threequarters">
        <Heading2 icon="tips_and_updates">Functio&shy;naliteiten</Heading2>
        <div class="sectionGrid" role="list">
            <Card stretch-buttons :image-src="imageTheme" image-alt="Thema" image-position="hover">
                <template #title>Aangepaste thema's</template>
                <template #subtitle>Klaar met de blauwe flashbang?</template>
                <template #content>Kies je eigen thema- en accentkleur! Je kunt
                    kiezen uit een licht, donker en automatisch thema. De accentkleur kun je helemaal zelf kiezen. Je
                    mag zelfs je hele Magister gitzwart of knalroze maken. Mocht dat je ding zijn.</template>
            </Card>
            <Card stretch-buttons :image-src="imageLogin" image-alt="Inloggen" image-position="hover">
                <template #title>Automatisch inloggen</template>
                <template #subtitle>Nooit meer worden aangestaard door het inlogscherm</template>
                <template #content>Compleet instelbare automatische login. Ondersteunt inloggen met gebruikersnaam en
                    wachtwoord of via een Microsoft-account. Of zet de optie gewoon uit.</template>
            </Card>
            <Card stretch-buttons :image-src="imageToday" image-alt="Vandaag" image-position="hover">
                <template #title>Vandaag</template>
                <template #subtitle>Zie het in één oogopslag</template>
                <template #content>Geheel opnieuw opgebouwd met focus op overzichtelijkheid en aantrekkelijkheid. Je
                    kunt aanpassen hoe alles wordt weergegeven. Niet iedereen vindt dit fijn, dus je kunt het altijd
                    uitschakelen.</template>
            </Card>
            <Card stretch-buttons :image-src="imageStudyguide" image-alt="Studiewijzers" image-position="hover">
                <template #title>Studiewijzers</template>
                <template #subtitle>Geen speurtochten meer naar je huiswerk</template>
                <template #content>Kies uit 3 weergave-opties om studiewijzers overzichtelijker weer te geven. Alles is
                    natuurlijk geheel aanpasbaar en uitschakelbaar.</template>
            </Card>
            <Card stretch-buttons :image-src="imageGradecalculator" image-alt="Cijfercalculator" image-position="hover">
                <template #title>Cijfercalculator</template>
                <template #subtitle>Nooit meer cijfers overtypen op andere websites</template>
                <template #content>Laat Study Tools voor je berekenen wat je moet halen of wat je komt te staan. Je kunt
                    alles aanpassen en je krijgt zelfs een handig grafiekje!</template>
            </Card>
            <Card stretch-buttons :image-src="imageGradebackup" image-alt="Cijferback-up" image-position>
                <template #title>Cijferback-up</template>
                <template #subtitle>Omzeil de regeling van je school</template>
                <template #content>Met Study Tools kun je altijd bij je cijferlijst. Je kunt namelijk op elk moment je
                    cijfers exporteren en importeren.</template>
                <template #buttons>
                    <RouterLink to="/studytools/grades">
                        <Button icon="upload_file">Cijferback-up importeren</Button>
                    </RouterLink>
                </template>
            </Card>
        </div>
    </section>
    <section id="advanced" class="quarter">
        <Heading2 icon="science">Geavanceerd</Heading2>
        <div class="sectionGrid" role="list">
            <Card>
                <template #content>
                    Wanneer je een extensie installeert vanuit een bestand, zul je geen updates ontvangen.
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
            </Card>
            <Card stretch-buttons data-highlight="false">
                <template #title>Chromium-installatiebestand</template>
                <template #subtitle>Voor bijvoorbeeld Chrome, Edge, Brave en Opera</template>
                <template #content>De laatste stabiele versie als .ZIP-bestand.</template>
                <template #buttons><Button icon="download"
                        href="https://github.com/QkeleQ10/Study-Tools/archive/refs/heads/main.zip" target="_self">Stabiele
                        versie downloaden voor Chromium</Button></template>
            </Card>
            <Card stretch-buttons data-highlight="false">
                <template #title>Chromium-installatiebestand (dev)</template>
                <template #subtitle>Voor bijvoorbeeld Chrome, Edge, Brave en Opera</template>
                <template #content>De ontwikkelaarsversie als .ZIP-bestand. Dit is afkomstig van de branche waar
                    ik in werk, dus verwacht instabiliteit!</template>
                <template #buttons><Button icon="download"
                        href="https://github.com/QkeleQ10/Study-Tools/archive/refs/heads/dev.zip">Bètaversie
                        downloaden voor Chromium</Button></template>
            </Card>

            <Card stretch-buttons data-highlight="false">
                <template #title>Microsoft Edge Add-ons</template>
                <template #content>Deze versie kan achterlopen of instabiel zijn. De Chromium-versie bovenaan de pagina
                    werkt ook voor Microsoft Edge. Het is beter om die te installeren.</template>
                <template #buttons>
                    <Button icon="expand_less" @click="installation.scrollIntoView({ behavior: 'smooth' })">Chromium-versie
                        installeren</Button>
                    <Button icon="shopping_cart"
                        href="https://microsoftedge.microsoft.com/addons/detail/study-tools-voor-magister/ohhafpjdnbhihibepefpcmnnodaodajc">Installeren
                        via Edge Add-ons</Button>
                </template>
            </Card>
        </div>
    </section>
</template>

<style>
@import "../assets/css/base.css";

#st>#installation>.sectionGrid {
    grid-template:
        'a1 a1 a2' auto
        / 1fr 1fr 1fr;
}

#st>#features>.sectionGrid {
    grid-template:
        'a1 a1 a1 a2 a2 a3 a3' auto
        'a4 a4 a5 a5 a5 a6 a6' auto
        / 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}

#st>#advanced>.sectionGrid {
    grid-template:
        'a1 a1 a2 a3' auto
        'a1 a1 a4 a4' auto
        / 1fr 1fr 1fr 1fr;
}

@media (max-width: 1100px) {
    #st>#installation>.sectionGrid {
        grid-template:
            'a1 a1' auto
            'a2 a2' auto
            / 1fr 1fr;
    }

    #st>#features>.sectionGrid {
        grid-template:
            'a1 a2' auto
            'a3 a4' auto
            'a5 a6' auto
            / 1fr 1fr;
    }

    #st>#advanced>.sectionGrid {
        grid-template:
            'a1 a1' auto
            'a2 a3' auto
            'a4 a4' auto
            / 1fr 1fr;
    }
}

@media (max-width: 620px) {
    #st>#installation>.sectionGrid {
        grid-template:
            'a1' auto
            'a2' auto
            / 1fr;
    }

    #st>#features>.sectionGrid {
        grid-template:
            'a1' auto
            'a2' auto
            'a3' auto
            'a4' auto
            'a5' auto
            'a6' auto
            / 1fr;
    }

    #st>#advanced>.sectionGrid {
        grid-template:
            'a1' auto
            'a2' auto
            'a3' auto
            'a4' auto
            / 1fr;
    }
}
</style>