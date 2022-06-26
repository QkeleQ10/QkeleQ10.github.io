<template>
    <section id="hero">
        <h1 class="section-title">Hi, I'm Quinten.</h1>
        <p class="section-about">Korte voorbeeldtekst - uiteindelijk zal deze langer zijn dan dit</p>
        <ScrollableRow id="hero-buttons">
            <ButtonDefault icon="twitter" href="https://twitter.com/QkeleQ10">Twitter</ButtonDefault>
            <ButtonDefault icon="github" href="https://github.com/QkeleQ10">GitHub</ButtonDefault>
            <ButtonDefault icon="external-link-alt" href="https://crowdin.com/profile/QkeleQ10">Crowdin
            </ButtonDefault>
            <ButtonDefault icon="external-link-alt" href="https://premid.app/users/807917674477649943">PreMiD
            </ButtonDefault>
        </ScrollableRow>
        <Logo transparent fill="monochrome" />
    </section>
</template>

<script setup>
import Icon from "./Icon.vue";
import ScrollableRow from "./ScrollableRow.vue";
import ButtonDefault from "./ButtonDefault.vue";
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
    background: linear-gradient(300deg, var(--heroAccent1), var(--heroAccent2));
    box-sizing: border-box;
    padding: 4em 4em 2em;
}

@media (max-width: 900px) {
    #hero {
        grid-template:
            "title logo" auto
            "about logo" auto
            "buttons buttons" auto / auto 7.5em;
            padding: 2em;
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
    color: var(--heroText);
    grid-area: title;
    font-size: 3em;
}

#hero .section-about {
    color: var(--heroText);
    grid-area: about;
    font-size: 1.3em;
}

#hero #hero-buttons {
    grid-area: buttons;
}

#hero svg {
    color: var(--heroText);
    grid-area: logo;
}
</style>