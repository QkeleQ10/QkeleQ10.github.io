<script setup>
import { ref, reactive, inject } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import ScrollableRow from '../components/ScrollableRow.vue'
import ScrollableColumn from '../components/ScrollableColumn.vue'
import DefaultButton from '../components/DefaultButton.vue'
import Header from '../components/Header.vue'
import Modals from '../components/Modals.vue'

const modals = ref(null)
function openModal(modal) { modals.value.openModal(modal) }
</script>

<template>
    <Header @openModal="openModal" />
    <main>
        <ScrollableRow>Biography and image here!</ScrollableRow>
        <section>
            <ScrollableRow>Projects here!</ScrollableRow>
        </section>
        <section>
            <h2>Localisation</h2>
            <ScrollableRow class="padded" role="list">
                <ProjectCard>
                    <template #title>QkeleQ10</template>
                    <template #subtitle>{{ $i18n('Owner') }}</template>
                    <template #content>{{ $i18n('qkeleqdesc') }}</template>
                    <template #buttons>
                        <DefaultButton icon="puzzle-piece">Contribute</DefaultButton>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Stats.fm</template>
                    <template #subtitle>{{ $i18n('Localisation manager') }}</template>
                    <template #content>{{ $i18n('spotistatsdesc') }}</template>
                    <template #buttons>
                        <DefaultButton icon="english-to-chinese">Translate</DefaultButton>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>PreMiD</template>
                    <template #subtitle>{{ $i18n('Proofreader') }}</template>
                    <template #content>{{ $i18n('premiddesc') }}</template>
                    <template #buttons>
                        <DefaultButton icon="english-to-chinese">Translate</DefaultButton>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Hypixel</template>
                    <template #subtitle>{{ $i18n('Proofreader') }}</template>
                    <template #content>{{ $i18n('hypixeldesc') }}</template>
                    <template #buttons>
                        <DefaultButton icon="english-to-chinese">Translate</DefaultButton>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Minecraft</template>
                    <template #subtitle>{{ $i18n('Translator') }}</template>
                    <template #content>{{ $i18n('mcdesc') }}</template>
                    <template #buttons>
                        <DefaultButton icon="english-to-chinese">Translate</DefaultButton>
                    </template>
                </ProjectCard>
            </ScrollableRow>
        </section>
    </main>
    <Modals ref="modals" />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap");

:root {
    --txt: #363636;
    --txt2: #585858;
    --bk: #f7f7f7;
    --bk2: #ffffff;
    --accent: #629464;
    --accent2: #3b803f;
    --button: #ebebeb;
    --buttonHover: #dbe6dc;
    --buttonFocus: #cef0cf;
    --shadow: #aaaaaa60;
}

@media (prefers-color-scheme: dark) {
    :root {
        --txt: #eeeeee;
        --txt2: #bebebe;
        --bk: #2b2b2b;
        --bk2: #303030;
        --accent: #77bb78;
        --accent2: #7eca82;
        --button: #2b2b2b;
        --shadow: #05050560;
    }
}

body {
    background: var(--bk);
    font-family: "Montserrat", arial, sans-serif;
    font-weight: 500;
    overflow-x: hidden;
    margin: 20px min(2vw, 50px) 10px;
}

section {
    flex-grow: 4;
    min-width: clamp(150px, 25vw, 350px);
    padding: 25px 20px 10px;
    margin: 0 0 20px;
    border-radius: 6px;
    background-color: var(--bk2);
}

section>h2 {
    color: var(--txt);
    margin: 0;
}
</style>