<template>
    <section id="hero">
        <h1 class="section-title">Hi, I'm Quinten.</h1>
        <p class="section-about">Korte voorbeeldtekst - uiteindelijk zal deze langer zijn dan dit</p>
        <Scrollable direction="column" id="hero-buttons">
            <ButtonDefault type="primary" href="https://twitter.com/QkeleQ10">Twitter</ButtonDefault>
            <ButtonDefault type="primary" href="https://github.com/QkeleQ10">GitHub</ButtonDefault>
            <ButtonDefault type="primary" href="https://crowdin.com/profile/QkeleQ10">Crowdin
            </ButtonDefault>
            <ButtonDefault type="primary" href="https://premid.app/users/807917674477649943">PreMiD
            </ButtonDefault>
        </Scrollable>
        <Logo transparent fill="monochrome" />
    </section>
</template>

<script setup>
import Icon from "../components/Icon.vue";
import Scrollable from "../components/Scrollable.vue";
import ButtonDefault from "../components/ButtonDefault.vue";
import Logo from "../assets/Logo.vue";
</script>

<style>
#hero {
    display: grid;
    grid-template:
        "title logo" auto
        "about logo" auto
        "buttons logo" auto
        / auto 10em;
    column-gap: 4em;
    background: linear-gradient(300deg, rgb(var(--darkAccent)), rgb(var(--darkAccent2)));
    color: rgb(var(--heroContent));
    box-sizing: border-box;
    padding: 5em 4em 2em;
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
    color: rgb(var(--heroContent));
    grid-area: title;
    font-size: 3em;
}

#hero .section-about {
    color: rgb(var(--heroContent));
    grid-area: about;
    font-size: 1.3em;
}

#hero #hero-buttons {
    grid-area: buttons;
    align-self: end;
}

#hero svg {
    color: rgb(var(--heroContent));
    grid-area: logo;
}
</style>