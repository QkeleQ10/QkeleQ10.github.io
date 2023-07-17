<script setup>
import { ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import Logo from "../components/Logo.vue";
import CollectionVertical from "./CollectionVertical.vue";
import LanguageSwitcher from './LanguageSwitcher.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';
import Icon from './Icon.vue';

const navigationDetector1 = ref()
const navigationDetector2 = ref()
const isVisible1 = ref(true)
const isVisible2 = ref(true)
const collapsed = ref(document.documentElement.dataset.menuCollapsed)

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
    collapsed.value = state
}

if (window.innerWidth < 620) {
    menuCollapse(true)
}

window.addEventListener("resize", () => {
    if (window.innerWidth < 620) {
        menuCollapse(true)
    } else {
        document.documentElement.removeAttribute('data-menu-collapsed')
        collapsed.value = undefined
    }
})
</script>

<template>
    <div class="navigation-detector" id="navigation-detector-1" ref="navigationDetector1"
        v-element-visibility="onElementVisibility1"></div>
    <div class="navigation-detector" id="navigation-detector-2" ref="navigationDetector2"
        v-element-visibility="onElementVisibility2"></div>
    <div id="navigation-rail">
        <Icon id="navigation-rail-collapser" :data-contrast="isVisible2" @click="menuCollapse('toggle')"
            @keyup.enter="menuCollapse('toggle')" @keyup.space="menuCollapse('toggle')" aria-hidden="false" tabindex="0">
            {{ collapsed ? 'menu' : 'close' }}</Icon>
        <RouterLink aria-hidden="false" tabindex="0" :aria-label="$i18n('navigateHome')" role="navigation" to="/"
            id="navigation-rail-logo" :data-contrast="isVisible1">
            <Logo aria-hidden="true" @click="router.push('/')" transparent fill="monochrome" />
        </RouterLink>
        <CollectionVertical role="menubar" id="navigation-rail-controls" :data-contrast="isVisible2">
            <ThemeSwitcher />
            <LanguageSwitcher />
        </CollectionVertical>
    </div>
    <div id="navigation-rail-dismiss" @click="menuCollapse(true)"></div>
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
    background-color: var(--bgPrimary);
    text-align: center;
    line-height: 40px;
    height: 40px;
    grid-row: hamburger-start / logo-start;
    cursor: pointer;
    border-radius: 6px;
    transition: color 200ms, background-color 200ms, translate 200ms, box-shadow 200ms;
}

:root[data-menu-collapsed] #navigation-rail-dismiss {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100lvh;
    z-index: 9998;
    pointer-events: none;
    background-color: var(--bgContrast);
    opacity: 0;
    transition: opacity 200ms;
}

:root[data-menu-collapsed=false] #navigation-rail-dismiss {
    pointer-events: all;
    opacity: .5;
}

:root[data-menu-collapsed=true] #navigation-rail-collapser {
    translate: -10px -20px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}

#navigation-rail-collapser:focus-visible {
    color: var(--accentDark);
    background-color: var(--accentVeryLight);
    outline: none;
}

:root[data-menu-collapsed] #navigation-rail-collapser {
    display: block;
    pointer-events: auto;
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
    color: var(--fgSecondary);
    border-radius: 6px;
    height: 40px;
    transition: color 200ms, background-color 200ms, translate 200ms;
}

:root[data-menu-collapsed] #navigation-rail-logo {
    margin-top: 12px;
}

#navigation-rail-logo svg {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
}

#navigation-rail-logo:focus-visible {
    color: var(--accentDark) !important;
    background-color: var(--accentVeryLight) !important;
}

:root:not([data-menu-collapsed=false]) #navigation-rail-collapser[data-contrast=true],
:root:not([data-menu-collapsed]) #navigation-rail-logo[data-contrast=true] {
    color: var(--fgContrast);
    background-color: transparent;
    translate: 0;
    box-shadow: none;
}

#navigation-rail-controls {
    grid-row: controls;
}

:root:not([data-menu-collapsed]) *[data-contrast=true] .button.rail {
    background-color: var(--fgContrast);
    color: var(--bgContrast);
}
</style>