<script setup>
import { ref, reactive, inject } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import ScrollableRow from '../components/ScrollableRow.vue'
import ScrollableColumn from '../components/ScrollableColumn.vue'
import DefaultButton from '../components/DefaultButton.vue'
import Header from '../components/Header.vue'
import Modals from '../components/Modals.vue'
import Icon from '../components/Icon.vue'
import Hero from '../components/Hero.vue'

const modals = ref(null)
function openModal(modal) { modals.value.openModal(modal) }
</script>

<template>
    <Header />
    <main>
        <Hero />
        <section>
            <h2>
                <Icon icon="sitemap" />
                {{ $i18n('Projects') }}
            </h2>
            <ScrollableRow class="padded">
                <ProjectCard>
                    <template #content>{{ $i18n('moreSoon') }}</template>
                    <template #buttons>
                        <DefaultButton icon="github" href="https://github.com/QkeleQ10">GitHub</DefaultButton>
                    </template>
                </ProjectCard>
            </ScrollableRow>
        </section>
        <section>
            <h2>
                <Icon icon="compass" />
                {{ $i18n('Localisation') }}
            </h2>
            <ScrollableRow class="padded" role="list">
                <ProjectCard>
                    <template #title>QkeleQ10</template>
                    <template #subtitle>{{ $i18n('Owner') }}</template>
                    <template #content>{{ $i18n('qkeleqdesc') }}</template>
                    <template #buttons>
                        <DefaultButton icon="heart" href="https://crowdin.com/project/QkeleQ10">{{ $i18n('Contribute')
                        }}
                        </DefaultButton>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Stats.fm</template>
                    <template #subtitle>{{ $i18n('Localisation manager') }}</template>
                    <template #content>{{ $i18n('spotistatsdesc') }}</template>
                    <template #buttons>
                        <DefaultButton icon="english-to-chinese" href="https://statsfm.crowdin.com">{{
                                $i18n('Translate')
                        }}
                        </DefaultButton>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>PreMiD</template>
                    <template #subtitle>{{ $i18n('Proofreader') }}</template>
                    <template #content>{{ $i18n('premiddesc') }}</template>
                    <template #buttons>
                        <DefaultButton icon="english-to-chinese" href="https://crowdin.com/project/premid">{{
                                $i18n('Translate')
                        }}
                        </DefaultButton>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Hypixel</template>
                    <template #subtitle>{{ $i18n('Proofreader') }}</template>
                    <template #content>{{ $i18n('hypixeldesc') }}</template>
                    <template #buttons>
                        <DefaultButton icon="english-to-chinese" href="https://crowdin.com/project/hypixel">{{
                                $i18n('Translate')
                        }}
                        </DefaultButton>
                    </template>
                </ProjectCard>
                <ProjectCard>
                    <template #title>Minecraft</template>
                    <template #subtitle>{{ $i18n('Translator') }}</template>
                    <template #content>{{ $i18n('mcdesc') }}</template>
                    <template #buttons>
                        <DefaultButton icon="english-to-chinese" href="https://crowdin.com/project/minecraft">{{
                                $i18n('Translate')
                        }}
                        </DefaultButton>
                    </template>
                </ProjectCard>
            </ScrollableRow>
        </section>
    </main>
    <footer>{{ $i18n('footer') }}</footer>
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
    margin: 0;
}

main {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

section {
    flex-grow: 4;
    min-width: clamp(150px, 25vw, 350px);
    padding: 25px 20px 10px;
    margin: 0 2em;
    border-radius: 6px;
    background-color: var(--bk2);
}

h1,
h2,
h3,
h4,
h5,
h6 {
    color: var(--txt);
    margin: 0;
}

p {
    color: var(--txt2);
}

footer {
    font-size: small;
    color: var(--txt2)
}
</style>