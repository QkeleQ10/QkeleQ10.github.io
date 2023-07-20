<script setup>
import { useMouse, useWindowSize } from '@vueuse/core'

import CollectionHorizontal from "@/components/CollectionHorizontal.vue";
import Heading1 from "./Heading1.vue";

defineProps({
    icon: String
})

const { x, y, sourceType } = useMouse(),
    { width, height } = useWindowSize()
</script>

<template>
    <section id="hero">
        <!--:style="{ transform: `translateX(${((x - width / 2) * 10 / width)}px) translateY(${((y - height / 2) * 10 / height)}px)` }"-->
        <div>
            <Heading1 class="section-title" id="hero-title"></Heading1>
            <p class="section-about" id="hero-description"></p>
        </div>
        <CollectionHorizontal id="hero-buttons"></CollectionHorizontal>
        <div id="hero-icon"
            :style="{ transform: `translateX(${-((x - width / 2) * 50 / width)}px) translateY(${-((y - height / 2) * 50 / height)}px)` }">
        </div>
    </section>
</template>

<style>
@property --hueValue {
    syntax: '<number>';
    initial-value: 130;
    inherits: false;
}

@property --sat1Value {
    syntax: '<percentage>';
    initial-value: 40%;
    inherits: false;
}

@property --sat2Value {
    syntax: '<percentage>';
    initial-value: 36%;
    inherits: false;
}

@property --lumValue {
    syntax: '<percentage>';
    initial-value: 30%;
    inherits: false;
}

#hero {
    --hueValue: var(--hue);
    --sat1Value: var(--sat1);
    --sat2Value: var(--sat2);
    --lumValue: var(--lum);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    background: linear-gradient(300deg, hsl(var(--hueValue) var(--sat1Value) var(--lumValue)), hsl(var(--hueValue) var(--sat2Value) var(--lumValue)));
    color: var(--fgContrast);
    padding-top: 5em;
    overflow: hidden;
    transition: --hueValue 1000ms, --sat1Value 1000ms, --sat2Value 1000ms, --lumValue 1000ms;
}

#hero>* {
    transition: transform 200ms ease-out;
}

#hero-description {
    color: var(--fgContrast);
    width: 70%;
    font-size: min(2em, 5vw);
}

#hero-icon {
    display: flex;
    place-items: center;
    place-content: center;
    position: absolute;
    max-width: 80vmax;
    max-height: 100vmin;
    width: 100%;
    height: 100%;
    right: 0;
    top: 50%;
    translate: 0 -50%;
    font-size: 120svh;
    color: var(--fgContrast);
    opacity: .1;
    pointer-events: none;
    user-select: none;
}

#hero-icon>* {
    width: 100%;
    aspect-ratio: 1;
    font-size: 100%;
    display: flex;
    place-items: center;
    place-content: center;
}
</style>