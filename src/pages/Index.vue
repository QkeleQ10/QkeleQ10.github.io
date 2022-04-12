<script setup>
import { ref, reactive, inject } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import ScrollableRow from '../components/ScrollableRow.vue'
import Header from '../components/Header.vue'
import DefaultButton from '../components/DefaultButton.vue'
import Modals from '../components/Modals.vue'

const modals = ref(null)
function openModal(modal) { modals.value.openModal(modal) }
</script>

<template>
    <Header @openModal="openModal" />
    <main>
        <section>
            <ScrollableRow class="padded">
                <ProjectCard>
                    <template #title>QkeleQ10</template>
                    <template #subtitle>{{ $i18n('Owner') }}</template>
                    <template #content>Test content</template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Test title</template>
                    <template #subtitle>Test subtitle</template>
                    <template #content>Test content</template>
                </ProjectCard>
            </ScrollableRow>
        </section>
        <section>
            <ScrollableRow class="padded">
                <ProjectCard>
                    <template #title>Test title</template>
                    <template #subtitle>Test subtitle</template>
                    <template #content>Test content</template>
                    <template #buttons>
                        <DefaultButton>Sample button</DefaultButton>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Test title</template>
                    <template #subtitle>Test subtitle</template>
                    <template #content>Test content</template>
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
</style>