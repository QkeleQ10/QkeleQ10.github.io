<script setup>
import Icon from "./Icon.vue";
defineProps({
    icon: String,
    href: String
})
</script>

<script>
export default {
    inheritAttrs: false
}
</script>

<template>
    <a :href="href" tabindex="-1">
        <button type="button" v-bind="$attrs" :data-button-style="style">
            <Icon>{{ icon }}</Icon>
            <slot>Button</slot>
        </button> </a>
</template>

<style>
@import 'https://unicons.iconscout.com/release/v4.0.0/css/line.css';

a {
    display: block;
    min-width: fit-content;
    height: fit-content;
    text-decoration: none;
    margin: 0;
}

button {
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    align-items: center;
    min-height: 44px;
    width: 100%;
    border: none;
    background-color: rgb(var(--lightAccent));
    color: rgb(var(--bgLight));
    font-family: "Montserrat", arial, sans-serif;
    padding: 5px 15px;
    margin: 10px 0 0;
    box-shadow: none;
    cursor: pointer;
    transition: background-color 200ms;
}

#hero button {
    background-color: rgb(var(--bgLight));
    color: rgb(var(--darkAccent));
}

button:hover,
button:focus {
    background: rgb(var(--highlightLight));
    color: rgb(var(--bgLight));
    outline: none;
}

#hero button:hover,
#hero button:focus {
    background: rgb(var(--highlightLight));
    color: rgb(var(--fgDark));
}

button:focus {
    box-shadow: inset 0 0 0 3px rgb(var(--lightAccent));
    outline: none;
}

button[disabled] {
    background: var(--button);
    color: var(--shadow);
    box-shadow: none;
    cursor: default;
}

button.primary {
    background: var(--accent);
    color: var(--bg2);
}
</style>