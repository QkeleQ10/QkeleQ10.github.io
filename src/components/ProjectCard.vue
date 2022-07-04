<script setup>
import Scrollable from "./Scrollable.vue";
</script>

<template>
    <div class="card" role="listitem">
        <h3 class="card-title" role="heading">
            <slot name="title"></slot>
        </h3>
        <div class="card-subtitle" role="doc-subtitle">
            <slot name="subtitle"></slot>
        </div>
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
    grid-template-rows: repeat(3, min-content) 1fr;
    min-width: clamp(200px, 22.5vw, 300px);
    padding: 20px 15px;
    border-radius: 6px;
    box-shadow: 0 1px 5px var(--shadow);
    background-color: var(--bk2);
    color: var(--txt2);
}

.card-title {
    color: var(--txt);
    margin: 0;
}

.card-subtitle {
    margin: 0 0 10px;
    font-size: smaller;
}

.card-content {
    margin: 0;
}

.card-buttons {
    align-self: end;
}
</style>