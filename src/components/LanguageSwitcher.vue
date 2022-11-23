<script setup>
import Icon from './Icon.vue';
import { ref } from 'vue'

const pickerOpen = ref(0)
</script>

<template>
    <div id="language-button">
        <button type="button" role="switch" title="Change site language" @click="pickerOpen = 1">
            <Icon>language</Icon>
        </button>
    </div>
    <div id="language-picker" v-if="pickerOpen === 1"><div id="language-list">List of languages</div></div>
</template>

<style>
#language-button {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, minmax(auto, 1fr));
    grid-template-rows: repeat(auto-fill, minmax(auto, 1fr));
    border: 1px solid currentColor;
    max-width: calc(100vw - 4em);
}

#language-button>button {
    background: none;
    outline: none;
    border: none;
    color: currentColor;
    width: 3em;
    height: 2em;
    margin: 0;
    padding: 0 0.25em;
    transition: width 200ms, padding 200ms, opacity 200ms, background-color 200ms, color 200ms;
}

#language-button>button:hover {
    background-color: rgba(var(--highlightLight), 0.5);
}

#language-picker {
    display: grid;
    justify-content: center;
    align-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>