
<script setup>
import { ref, reactive } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import ScrollableRow from './components/containers/ScrollableRow.vue'
import Header from './components/Header.vue'
import Modal from './components/Modal.vue'
import LanguageList from './components/LanguageList.vue'
import DefaultButton from './components/DefaultButton.vue'

let modals = reactive({
    language: false
})

function toggleModal(modal) {
    modals[modal] = !modals[modal]
}
</script>

<template>
    <Header @toggleModal="toggleModal" />
    <main>
        <section>
            <ScrollableRow class="padded">
                <ProjectCard>
                    <template #title>Test title</template>
                    <template #subtitle>Test subtitle</template>
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
    <div>
        <Modal v-if="modals.language" id="language-modal">
            <template #title>Select a language</template>
            <template #content>
                <LanguageList></LanguageList>
                <DefaultButton icon="" href="https://crowdin.com/project/QkeleQ10">Help translate</DefaultButton>
            </template>
        </Modal>  </div>
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
    --button: #d8d8d860;
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
        --button: #3f3f3f60;
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