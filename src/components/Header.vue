<script setup>
import { reactive } from "vue";
import ButtonDefault from "./ButtonDefault.vue";
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
        <Logo v-show="windowTop > 0" transparent fill="monochrome" />
        <nav></nav>
        <div id="controls">
            <LanguageSwitcher />
            <ThemeSwitcher />
        </div>
    </header>
</template>

<style>
header {
    position: absolute;
    display: grid;
    width: 100%;
    column-gap: 2em;
    height: 60px;
    width: 100vw;
    box-sizing: border-box;
    padding: 1em 4em 2em;
    grid-template-areas: "logo nav tools";
    grid-template-columns: auto 1fr auto;
    justify-content: space-between;
    align-items: center;
    color: rgb(var(--bgLight));
}

header svg {
    color: var(--bg2);
    height: 30px;
    transition: height 200ms;
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