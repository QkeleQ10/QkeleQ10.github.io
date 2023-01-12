<script setup>
defineProps({
    vertical: Boolean
})
</script>

<template>
    <div class="expanding-switcher" :data-vertical="vertical ? true : false">
        <slot></slot>
    </div>
</template>

<style>
.expanding-switcher {
    display: grid;
    grid-auto-flow: column;
    border: 1px solid transparent;
    background-color: none;
    transition: border 200ms, background-color 200ms;
}

.expanding-switcher[data-vertical=true] {
    grid-auto-flow: row;
}

.expanding-switcher:hover {
    border-color: rgb(var(--accentVeryLight));
}

header:not([data-hero-visible=true]) .expanding-switcher:hover {
    background-color: rgb(var(--bgPrimary));
}

.expanding-switcher>button {
    background: none;
    outline: none;
    border: none;
    color: currentColor;
    padding: 0 0.25em;
    transition: width 200ms, height 200ms, padding 200ms, opacity 200ms, background-color 200ms, color 200ms, scale 200ms;
}

.expanding-switcher[data-vertical=false]>button {
    width: 40px;
    height: 50px;
    padding: 0 0.25em;
}

.expanding-switcher[data-vertical=true]>button {
    height: 50px;
    width: 40px;
    padding: 0.25em 0;
}

.expanding-switcher:hover>button[active=true] {
    background-color: rgb(var(--accentVeryLight));
    color: rgb(var(--fgPrimary));
}

.expanding-switcher>button:hover {
    background-color: rgba(var(--accentVeryLight), 0.5);
}

.expanding-switcher:not(:hover)>button:not([active=true]) {
    padding: 0;
    opacity: 0;
    pointer-events: none;
}

.expanding-switcher[data-vertical=false]:not(:hover)>button:not([active=true]) {
    width: 0;
    scale: 0 1;
}

.expanding-switcher[data-vertical=true]:not(:hover)>button:not([active=true]) {
    height: 0;
    scale: 1 0;
}
</style>