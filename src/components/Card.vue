<script setup>
import CollectionHorizontal from "./CollectionHorizontal.vue";

defineProps({
    imageSrc: String,
    imageAlt: String,
    imagePosition: String,
    small: Boolean
})
</script>

<template>
    <div class="card" role="listitem" :data-small="small">
        <img class="card-image" v-if="imageSrc" :src="imageSrc" :alt="imageAlt" :data-position="imagePosition">
        <h3 class="card-title" role="heading">
            <slot name="title"></slot>
        </h3>
        <span class="card-subtitle" role="doc-subtitle">
            <slot name="subtitle"></slot>
        </span>
        <p class="card-content">
            <slot name="content"></slot>
        </p>
        <CollectionHorizontal class="card-buttons">
            <slot name="buttons"></slot>
        </CollectionHorizontal>
    </div>
</template>

<style>
.card {
    position: relative;
    display: grid;
    align-content: start;
    grid-template-rows: auto auto auto 1fr;
    min-width: clamp(200px, 20vw, 300px);
    padding: 1.25em 1em;
    background-color: var(--bgSecondary);
    color: var(--fgSecondary);
    transition: opacity 200ms;
}

.card[data-small=true] {
    font-size: .85rem;
    min-width: 0px;
}

.card[disabled] {
    opacity: 0.5;
    pointer-events: none;
}

.card[data-highlight=false]:not(:hover, :focus-within) {
    opacity: 0.5;
}

.card:has(.card-image:not([data-position])) {
    grid-template-rows: auto auto auto auto 1fr;
}

.card>*:not(image) {
    z-index: 1;
    transition: opacity 500ms cubic-bezier(.17, .25, 0, .77);
}

.card-image {
    width: 100%;
    margin-bottom: 1em;
    outline: 1px solid var(--accentVeryLight);
    object-fit: cover;
    object-position: center;
    pointer-events: none;
}

.card-image[data-position] {
    position: absolute;
    max-height: 100%;
    min-height: 100%;
    max-width: 100%;
    min-width: 100%;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    opacity: 0.1;
    transition: opacity 500ms cubic-bezier(.17, .25, 0, .77);
}

.card:not(:hover) .card-image[data-position=reverse-hover] {
    opacity: 1 !important;
}

.card:has(.card-image[data-position=reverse-hover]):not(:hover)>* {
    opacity: 0;
}

.card:hover .card-image[data-position=hover] {
    opacity: 1 !important;
}

.card:has(.card-image[data-position=hover]):hover>* {
    opacity: 0;
}

.card-title {
    color: var(--fgPrimary);
    margin: 0;
}

.card-subtitle {
    margin-bottom: 10px;
    font-size: smaller;
}

.card-buttons {
    align-self: end;
}
</style>