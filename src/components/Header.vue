<script setup>
import { reactive } from "vue";
import Logo from "../assets/Logo.vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const obj = reactive({ belowFold: document.documentElement.scrollTop > 200 })

window.onscroll = function () {
    obj.belowFold = document.documentElement.scrollTop > 200
}
</script>

<template>
    <header>
        <RouterLink to="/">
            <Logo @click="router.push('/')" v-show="windowTop > 0" transparent fill="monochrome" />
        </RouterLink>
        <nav></nav>
        <div id="controls">
            <LanguageSwitcher />
            <ThemeSwitcher />
        </div>
    </header>
</template>

<style>
header {
    position: fixed;
    display: grid;
    width: 100%;
    column-gap: 2em;
    height: 60px;
    box-sizing: border-box;
    padding: 1em 2em 2em;
    grid-template-areas: "logo nav tools";
    grid-template-columns: auto 1fr auto;
    justify-content: space-between;
    align-items: center;
    color: rgb(var(--fgTertiary));
    transition: padding 200ms;
}

header[data-hero-visible=true] {
    padding: 1em 4em 2em;
    color: rgb(var(--fgContrast));
}

header.collide+main {
    border-top: 4em solid transparent;
}

header>a {
    color: currentColor;
}

header svg {
    background-color: none;
    color: currentColor;
    height: 30px;
    cursor: pointer;
    padding: 0.5em;
    border-radius: 0.5em;
    transition: translate 200ms, color 200ms, background-color 200ms;
}

header svg:hover {
    background-color: rgb(var(--bgPrimary));
    color: rgb(var(--accentDark));
}

header[data-hero-visible=true] svg {
    translate: 0 calc(-3em - 30px);
}

header div#header-logo {
    grid-area: logo;
}

header>#controls {
    display: flex;
    gap: 6px;
}

@media (max-width: 900px) {
    header {
        padding: 1em 2em 2em;
    }
}

@media (max-width: 650px) {
    header {
        gap: 0;
    }
}
</style>