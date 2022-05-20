<script setup>
import { reactive } from "vue";
import DefaultButton from "./DefaultButton.vue";
import Logo from "../assets/Logo.vue";

const obj = reactive({ scrollTop: document.documentElement.scrollTop < 1 })

window.onscroll = function () {
    obj.scrollTop = document.documentElement.scrollTop < 1
}
</script>

<template>
    <header :class="{ 'page-top': obj.scrollTop }" >
        <Logo transparent fill="monochrome" id="header-logo" />
        <DefaultButton icon="globe" @click="$emit('openModal', 'language')">{{ $i18n('Language') }}</DefaultButton>
    </header>
</template>

<style>
header {
    position: fixed;
    display: grid;
    height: 60px;
    width: 100vw;
    box-sizing: border-box;
    padding: 30px min(2vw, 50px) 10px;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: start;
}

header svg {
    padding: 0 20px;
    color: var(--bk2);
    height: 50px;
    transition: height 200ms;
}

header.page-top svg {
    height: 200px;
}
</style>