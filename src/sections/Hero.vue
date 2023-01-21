<script setup>
import Logo from "../assets/Logo.vue";
import CollectionHorizontal from "@/components/CollectionHorizontal.vue";
import Icon from "@/components/Icon.vue";
</script>

<template>
    <section id="hero">
        <div>
            <h1 class="section-title">{{ $i18n('heroTitle') }}</h1>
            <p class="section-about">{{ $i18n('aboutme') }}</p>
        </div>
        <CollectionHorizontal stretch id="hero-buttons">
            <Button class="hero" href="https://discord.gg/RVKXKyaS6y">Discord</Button>
            <Button class="hero" href="https://github.com/QkeleQ10">GitHub</Button>
            <Button class="hero" href="https://twitter.com/QkeleQ10">Twitter</Button>
            <Button class="hero" href="https://crowdin.com/profile/QkeleQ10">Crowdin</Button>
            <Button class="hero" href="https://premid.app/users/807917674477649943">PreMiD</Button>
        </CollectionHorizontal>
        <Icon id="hero-scroll-down">expand_more</Icon>
        <Logo transparent fill="monochrome" />
    </section>
</template>

<style>
#hero {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    background: linear-gradient(300deg, rgb(var(--hero1)), rgb(var(--hero2)));
    color: rgb(var(--fgContrast));
    padding-top: 5em;
    overflow: hidden;
}

#hero .section-title {
    color: rgb(var(--fgContrast));
    font-size: min(7em, 15vw);
}

#hero .section-about {
    color: rgb(var(--fgContrast));
    width: 70%;
    font-size: min(2em, 5vw);
}

#hero svg {
    position: absolute;
    max-width: 90vw;
    max-height: 120vh;
    right: 0;
    bottom: 0;
    color: rgba(var(--fgContrast), 0.1);
    pointer-events: none;
}

#hero #hero-scroll-down {
    position: absolute;
    bottom: 3em;
}
</style>