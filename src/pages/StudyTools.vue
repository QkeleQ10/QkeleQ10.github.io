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
</script>

<template>
    <Header class="collide" />
    <main>
        <section>
            <Heading2 icon="download">Study Tools voor Magister</Heading2>
            <p>Gebruik de knop hieronder om de laatste versie van <u>Study Tools voor Magister</u> te installeren. Gebruik je de downloadknop? Volg dan de stappen hieronder.
            </p>
            <ol>
                <li>Download het .ZIP-bestand met de knop hieronder en open deze in Windows Verkenner. Het venster dat
                    opent
                    bevat één map.</li>
                <li>Sleep deze map naar de locatie waar je hem al eens eerder naartoe hebt gesleept, zoals je map
                    'Documenten'.</li>
                <li>De updates zullen worden toegepast wanneer je je browser opnieuw start.</li>
            </ol>
            <Scrollable direction="column" stretch="true">
                <Button icon="shopping_cart"
                    href="https://microsoftedge.microsoft.com/addons/detail/study-tools-voor-magister/ohhafpjdnbhihibepefpcmnnodaodajc"
                    target="_blank">Installeren via Edge Add-ons</Button>
                <Button icon="download"
                    href="https://github.com/QkeleQ10/Study-Tools/archive/refs/heads/main.zip">Downloaden voor andere
                    Chromium-browsers</Button>
            </Scrollable>
        </section>
    </main>
    <!-- <footer>{{ $i18n('footer') }}</footer> -->
</template>

<style>
@import "../assets/css/base.css"
</style>