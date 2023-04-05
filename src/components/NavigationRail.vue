<script setup>
import { ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import Logo from "../assets/Logo.vue";
import CollectionVertical from "./CollectionVertical.vue";
import LanguageSwitcher from './LanguageSwitcher.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';
import Icon from './Icon.vue';

const navigationDetector1 = ref()
const navigationDetector2 = ref()
const isVisible1 = ref(false)
const isVisible2 = ref(false)

function onElementVisibility1(state) {
    isVisible1.value = state
}
function onElementVisibility2(state) {
    isVisible2.value = state
}
function menuCollapse(state) {
    if (state === 'toggle' && document.documentElement.dataset.menuCollapsed == 'true') state = false
    else if (state === 'toggle' && document.documentElement.dataset.menuCollapsed == 'false') state = true
    document.documentElement.dataset.menuCollapsed = state
}

if (window.innerWidth < 620) {
    menuCollapse(true)
}
</script>

<template>
    <div class="navigation-detector" id="navigation-detector-1" ref="navigationDetector1"
        v-element-visibility="onElementVisibility1"></div>
    <div class="navigation-detector" id="navigation-detector-2" ref="navigationDetector2"
        v-element-visibility="onElementVisibility2"></div>
    <div id="navigation-rail">
        <Icon id="navigation-rail-collapser" :data-contrast="isVisible1" @click="menuCollapse('toggle')">menu</Icon>
        <RouterLink :aria-label="$i18n('navigateHome')" role="navigation" to="/" id="navigation-rail-logo"
            :data-contrast="isVisible1">
            <Logo aria-hidden @click="router.push('/')" transparent fill="monochrome" />
        </RouterLink>
        <CollectionVertical role="menubar" id="navigation-rail-controls" :data-contrast="isVisible2">
            <ThemeSwitcher />
            <LanguageSwitcher />
        </CollectionVertical>
    </div>
</template>

<style>
.navigation-detector {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    top: 90svh;
}

#navigation-detector-2 {
    top: 10svh;
}

#navigation-rail {
    position: fixed;
    left: 0;
    top: 0;
    height: calc(100dvh - 4em);
    width: 40px;
    padding: 2em 10px 2em 22px;
    display: grid;
    grid-template-rows: [hamburger-start] auto [logo-start] auto [nav-start] auto [nav-end] 1fr [controls-start] auto [controls-end];
    justify-content: center;
    z-index: 9999;
    color: var(--fgTertiary);
}

#navigation-rail>* {
    transition: translate 200ms;
}

:root[data-menu-collapsed=true] #navigation-rail>*:not(#navigation-rail-collapser) {
    translate: -200%;
}

#navigation-rail-collapser {
    display: none;
    color: var(--fgSecondary);
    text-align: center;
    height: 40px;
    grid-row: hamburger-start / logo-start;
    transition: color 200ms;
}

:root[data-menu-collapsed] #navigation-rail-collapser {
    display: block;pointer-events: auto;
    grid-row: hamburger-start / logo-start;
}

:root[data-menu-collapsed] #navigation-rail {
    padding-right: 22px;
    background-size: 100% 200%;
    background-image: linear-gradient(to bottom, transparent 50%, var(--bgPrimary) 50%);
    transition: background-position 200ms cubic-bezier(0, 0, 0, 1), box-shadow 200ms;
}

:root[data-menu-collapsed=true] #navigation-rail {
    pointer-events: none;
}

:root[data-menu-collapsed=false] #navigation-rail {
    background-position: 0 -100%;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.75);
}

#navigation-rail-logo {
    grid-row: logo-start / nav-start;
}

#navigation-rail-logo svg {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    color: var(--fgSecondary);
}

:root:not([data-menu-collapsed=false]) #navigation-rail-collapser[data-contrast=true],
:root:not([data-menu-collapsed]) #navigation-rail-logo[data-contrast=true] svg {
    color: var(--fgContrast);
}

#navigation-rail-controls {
    grid-row: controls;
}

:root:not([data-menu-collapsed]) *[data-contrast=true] .button.rail {
    background-color: var(--fgContrast);
    color: var(--bgContrast);
}

:root:not([data-menu-collapsed]) *[data-contrast=true] .button.rail[active=true] {
    background-color: var(--accentVeryLightContrast);
}
</style>