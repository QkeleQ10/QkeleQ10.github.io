<script setup>
import { ref } from 'vue'
import { vElementVisibility } from '@vueuse/components'
import Logo from "../assets/Logo.vue";
import CollectionVertical from "./CollectionVertical.vue";
import LanguageSwitcher from './LanguageSwitcher.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';

const target = ref()
const isVisible = ref(false)

function onElementVisibility(state) {
    isVisible.value = state
}

</script>

<template>
    <div id="navigation-detector" ref="target" v-element-visibility="onElementVisibility"></div>
    <div id="navigation-rail">
        <RouterLink :aria-label="$i18n('navigateHome')" role="navigation" to="/" id="navigation-rail-logo"
            :data-contrast="isVisible">
            <Logo aria-hidden @click="router.push('/')" transparent fill="monochrome" />
        </RouterLink>
        <CollectionVertical role="menubar" id="navigation-rail-controls">
            <ThemeSwitcher />
            <LanguageSwitcher />
        </CollectionVertical>
    </div>
</template>

<style>
#navigation-detector {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
    top: 95vh;
}

#navigation-rail {
    position: fixed;
    right: 0;
    top: 0;
    height: calc(100vh - 4em);
    width: 40px;
    padding: 2em 22px 2em 10px;
    display: grid;
    grid-template-rows: [logo-start] auto [nav-start] auto [nav-end] 1fr [controls-start] auto [controls-end];
    justify-content: center;
    z-index: 9999;
    color: var(--fgTertiary);
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

#navigation-rail-logo[data-contrast=true] svg {
    color: var(--fgContrast);
}

#navigation-rail-controls {
    grid-row: controls;
}
</style>