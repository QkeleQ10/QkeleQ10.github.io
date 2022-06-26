<script setup>
import { reactive } from "vue";
import ButtonDefault from "./ButtonDefault.vue";
import Logo from "../assets/Logo.vue";

const obj = reactive({ belowFold: document.documentElement.scrollTop > 200 })

window.onscroll = function () {
    obj.belowFold = document.documentElement.scrollTop > 200
}
</script>

<template>
    <header>
        <!---->
    </header>
</template>

<style>
header {
    position: absolute;
    display: grid;
    height: 60px;
    width: 100vw;
    box-sizing: border-box;
    padding: 30px min(2vw, 50px) 10px;
    grid-template-areas: "logo nav tools";
    grid-template-columns: auto 1fr auto;
    justify-content: space-between;
    align-items: start;
}

header svg {
    padding: 0 20px;
    color: var(--bk2);
    height: 50px;
    transition: height 200ms;
}

header div#header-logo {
    grid-area: logo;
}
</style>