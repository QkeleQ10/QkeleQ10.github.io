<script setup>
import path from 'path'
import { useMeta } from 'vue-meta'
import { useThemeStore } from '../stores/theme'
import { ref, computed } from 'vue'

import Card from '@/components/Card.vue'
import Heading2 from '@/components/Heading2.vue'
import Icon from '@/components/Icon.vue';

useMeta({ title: "Graphic Design" })

const theme = useThemeStore()
theme.setScheme('graphic')

const portfolio = ref()

// const imageFiles = import.meta.glob('@/assets/images/graphicdesign/*.*', { eager: true })
// const images = computed(() => {
//     const object = {}
//     for (const path in imageFiles) {
//         const name = path.substring(path.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, "").replace(/\s(P|L)\d+$/i, ""),
//             number = path.match(/\d+$/i),
//             orientation = path.match(/(?<=\s)(P|L)(?=(\d+))/i)[0].toLowerCase() === 'p' ? 'portrait' : 'landscape'
//         if (!object[name]) object[name] = { name, paths: [] }
//         object[name].paths.push({ path, number, orientation })
//     }
//     return object
// })
</script>

<template>
    <Teleport to="#hero-title">I design stuff.</Teleport>
    <Teleport to="#hero-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras imperdiet, nunc et ullamcorper pharetra, dui tellus
        sagittis nisl, eu placerat mi elit in sem.
    </Teleport>
    <Teleport to="#hero-buttons">
        <Button icon="expand_more" class="hero" @click="portfolio.scrollIntoView({ behavior: 'smooth' })">
            Portfolio
        </Button>
        <Button icon="expand_more" class="hero" @click="portfolio.scrollIntoView({ behavior: 'smooth' })">
            Contact
        </Button>
    </Teleport>
    <Teleport to="#hero-icon">
        <Icon>school</Icon>
    </Teleport>

    <section ref="portfolio" id="portfolio">
        <Heading2 icon="palette">Portfolio</Heading2>
        <div class="sectionGrid" role="list">
            <!-- <Card v-for="image in images" stretch-buttons
                :image-src="image.paths[Math.floor(Math.random() * image.paths.length)].path" :image-alt="image.name"
                image-position="reverse-hover">
                <template #title>
                    {{ image.name }}
                </template>
            </Card> -->
        </div>
    </section>
</template>

<style></style>