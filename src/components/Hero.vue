<script setup>
import CollectionHorizontal from "@/components/CollectionHorizontal.vue";

defineProps({
    icon: String
})
</script>

<template>
    <section id="hero">
        <slot></slot>
    </section>
</template>

<style>
@property --hueValue {
    syntax: '<number>';
    initial-value: 130;
    inherits: false;
}

#hero {
    --hueValue: var(--hue);
    --gradientTo: var(--hero2);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    background: linear-gradient(300deg, hsl(var(--hueValue), 40%, 29%), hsl(var(--hueValue), 36%, 30%));
    color: var(--fgContrast);
    padding-top: 5em;
    overflow: hidden;
    transition: --hueValue 1000ms;
}

#hero .section-title {
    color: var(--fgContrast);
    font-size: 7rem;
}

@media (max-width: 1300px) {
    #hero .section-title {
        font-size: 6rem;
    }
}

@media (max-width: 1100px) {
    #hero .section-title {
        font-size: 4.5rem;
    }
}

@media (max-width: 620px) {
    #hero .section-title {
        font-size: 3rem;
    }
}

#hero .section-about {
    color: var(--fgContrast);
    width: 70%;
    font-size: min(2em, 5vw);
}

#hero>.logo,
#hero>.icon {
    position: absolute;
    max-width: 90vw;
    max-height: 120svh;
    right: 0;
    top: 50%;
    translate: 0 -50%;
    font-size: 120svh;
    color: var(--fgContrast);
    opacity: .1;
    pointer-events: none;
    user-select: none;
}

#hero #hero-scroll-down {
    position: absolute;
    bottom: 3em;
}
</style>