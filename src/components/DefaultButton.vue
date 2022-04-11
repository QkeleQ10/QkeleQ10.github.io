<script setup>
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
    <a :href="href" :v-on-click="$attrs.onClick">
        <button type="button" v-bind="$attrs">
            <i :class="`button-icon uil uil-${icon}`" v-if="icon"></i>
            <slot>Button</slot>
        </button>    </a>
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
    gap: 10px;
    min-height: 44px;
    width: 100%;
    border: none;
    background: var(--button);
    color: var(--accent);
    cursor: pointer;
    font-family: "Montserrat", arial, sans-serif;
    padding: 5px 15px;
    margin: 10px 0 0;
    border-radius: 6px;
    box-shadow: none;
    transition: background-color 0.1s;
}

button:hover,
button:focus {
    background: var(--buttonHover);
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

.button-icon {
    font-size: x-large;
    margin: -5px 0;
}
</style>