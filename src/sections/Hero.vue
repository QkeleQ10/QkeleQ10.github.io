<template>
    <section id="hero">
        <h1 class="section-title">Hi, I'm Quinten.</h1>
        <p class="section-about">{{ $i18n('aboutme') }}</p>
        <Scrollable direction="column" id="hero-buttons">
            <Button class="hero" href="https://twitter.com/QkeleQ10">Twitter</Button>
            <Button class="hero" href="https://github.com/QkeleQ10">GitHub</Button>
            <Button class="hero" href="https://crowdin.com/profile/QkeleQ10">Crowdin</Button>
            <Button class="hero" href="https://premid.app/users/807917674477649943">PreMiD</Button>
        </Scrollable>
        <Logo transparent fill="monochrome" />
    </section>
</template>

<script setup>
import Icon from "../components/Icon.vue";
import Scrollable from "../components/Scrollable.vue";
import Logo from "../assets/Logo.vue";
</script>

<style>
#hero {
    display: grid;
    grid-template:
        "title ." 2em
        "title logo" auto
        "about logo" auto
        "buttons logo" auto
        / auto 10em;
    column-gap: 4em;
    background: linear-gradient(300deg, rgb(var(--hero1)), rgb(var(--hero2)));
    color: rgb(var(--fgContrast));
    box-sizing: border-box;
    padding: 3em 4em 2em;
}

@media (max-width: 900px) {
    #hero {
        grid-template:
            "title logo" auto
            "about logo" auto
            "buttons buttons" auto / auto 5em;
        padding: 5em 2em 2em;
        column-gap: 2em;
    }
}

@media (max-width: 650px) {
    #hero {
        grid-template:
            "title" auto
            "about" auto
            "buttons" auto / auto;
        gap: 0;
    }
}

#hero .section-title {
    color: rgb(var(--fgContrast));
    grid-area: title;
    font-size: 3em;
}

#hero .section-about {
    color: rgb(var(--fgContrast));
    grid-area: about;
    font-size: 1.3em;
}

#hero #hero-buttons {
    grid-area: buttons;
    align-self: end;
}

#hero svg {
    color: rgb(var(--fgContrast));
    grid-area: logo;
}
</style>