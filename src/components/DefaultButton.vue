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
            <span class="button-icon" v-if="icon">{{ icon }}</span>
            <slot>Button</slot>
        </button>    </a>
</template>

<style>
@font-face {
    font-family: UniconsLine;
    src: url("../assets/unicons-line.ttf");
}

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
    padding: 10px 15px;
    margin: 10px 0 0;
    border-radius: 6px;
    box-shadow: none;
    transition: box-shadow 0.2s, border 0.2s;
}

button:hover {
    box-shadow: inset 0 0 0 3px var(--shadow);
    outline: none;
}

button:focus {
    box-shadow: inset 0 0 0 3px #93d996b2;
    outline: none;
}

button[disabled] {
    color: var(--shadow);
    box-shadow: none;
    cursor: default;
}

.button-icon {
    font-family: "UniconsLine";
    font-size: x-large;
    margin: -5px 0;
}
</style>