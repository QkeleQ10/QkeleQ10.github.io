<script setup>
import Logo from "../assets/Logo.vue";
import CollectionVertical from "./CollectionVertical.vue";
import LanguageSwitcher from './LanguageSwitcher.vue';
import ThemeSwitcher from './ThemeSwitcher.vue';
</script>

<template>
    <div id="navigation-rail">
        <RouterLink :aria-label="$i18n('navigateHome')" role="navigation" to="/" id="navigation-rail-logo">
            <Logo aria-hidden @click="router.push('/')" transparent fill="monochrome" />
        </RouterLink>
        <CollectionVertical role="menubar" id="navigation-rail-controls">
            <ThemeSwitcher />
            <LanguageSwitcher />
        </CollectionVertical>
    </div>
</template>

<style>
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
    color: rgb(var(--fgTertiary));
}

#navigation-rail-logo {
    grid-row: logo-start / nav-start;
}

#navigation-rail-logo svg {
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    color: rgb(var(--fgSecondary));
}

#navigation-rail-controls {
    grid-row: controls;
}
</style>