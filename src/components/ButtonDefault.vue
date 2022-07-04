<script setup>
import Icon from "./Icon.vue";
defineProps({
    type: String,
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
    <a :href="href" :v-on-click="$attrs.onClick" tabindex="-1">
        <button type="button" v-bind="$attrs" :data-button-style="style">
            <Icon :icon="icon"></Icon>
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
    gap: 5px;
    min-height: 44px;
    width: 100%;
    border: none;
    background: var(--heroText);
    color: var(--heroAccent1);
    cursor: pointer;
    font-family: "Montserrat", arial, sans-serif;
    padding: 5px 15px;
    margin: 10px 0 0;
    /* border-radius: 6px; */
    box-shadow: none;
    transition: background-color 0.1s;
}

button:hover,
button:focus {
    background: var(--buttonHover);
    color: var(--heroText);
    outline: none;
}

button:focus {
    box-shadow: inset 0 0 0 3px var(--accent);
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
    color: var(--bk2);
}

button.tight {
    margin: 0;
}
</style>