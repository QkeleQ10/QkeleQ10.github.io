<script setup>
import CollectionHorizontal from "./CollectionHorizontal.vue";
import Scrollable from "./Scrollable.vue"

defineProps({
    imageSrc: String,
    imageAlt: String,
    imageBackdrop: Boolean
})
</script>

<template>
    <div class="card" role="listitem">
        <img class="card-image" v-if="imageSrc" :src="imageSrc" :alt="imageAlt" :data-backdrop="imageBackdrop">
        <h3 class="card-title" role="heading">
            <slot name="title"></slot>
        </h3>
        <span class="card-subtitle" role="doc-subtitle">
            <slot name="subtitle"></slot>
        </span>
        <p class="card-content">
            <slot name="content"></slot>
        </p>
        <CollectionHorizontal role="menubar" class="card-buttons">
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
    background-color: rgb(var(--bgSecondary));
    color: rgb(var(--fgSecondary));
    transition: opacity 200ms;
}

.card[disabled] {
    opacity: 0.5;
    pointer-events: none;
}

.card[data-highlight=false]:not(:hover, :focus-within) {
    opacity: 0.5;
}

.card:has(.card-image:not([data-backdrop])) {
    grid-template-rows: auto auto auto auto 1fr;
}

.card>*:not(image[data-backdrop=true]) {
    z-index: 1;
}

.card-image {
    width: 100%;
    margin-bottom: 1em;
    outline: 1px solid rgb(var(--accentVeryLight), .5);
    object-fit: cover;
    pointer-events: none;
}

.card-image[data-backdrop=true] {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0.1;
}

.card-title {
    color: rgb(var(--fgPrimary));
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