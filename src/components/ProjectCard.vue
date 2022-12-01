<script setup>
import Scrollable from "./Scrollable.vue"

defineProps({
    imageSrc: String,
    imageAlt: String
})
</script>

<template>
    <div class="card" role="listitem">
        <img class="card-image" v-if="imageSrc" :src="imageSrc" :alt="imageAlt">
        <h3 class="card-title" role="heading">
            <slot name="title"></slot>
        </h3>
        <span class="card-subtitle" role="doc-subtitle">
            <slot name="subtitle"></slot>
        </span>
        <p class="card-content">
            <slot name="content"></slot>
        </p>
        <Scrollable class="card-buttons">
            <slot name="buttons"></slot>
        </Scrollable>
    </div>
</template>

<style>
.card {
    display: grid;
    align-content: start;
    grid-template-rows: auto auto auto 1fr;
    min-width: clamp(200px, 22.5vw, 300px);
    padding: 1.2em 1em;
    background-color: rgb(var(--bgSecondary));
    color: rgb(var(--fgSecondary));
}

.card:has(.card-image) {
    grid-template-rows: auto auto auto auto 1fr;
}

.card-image {
    width: 100%;
    margin-bottom: 1em;
    outline: 1px solid rgb(var(--accentVeryLight), .5);
}

.card-title {
    color: rgb(var(--fgPrimary));
    margin: 0;
}

.card-subtitle {
    margin-bottom: 10px;
    font-size: smaller;
}

.card-content {
    margin: 0;
}

.card-buttons {
    align-self: end;
}
</style>