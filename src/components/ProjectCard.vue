<script>
import DefaultButton from "./DefaultButton.vue";
import ScrollableRow from "./ScrollableRow.vue";
export default {
    components: { DefaultButton, ScrollableRow }
}
</script>

<template>
    <div class="card">
        <h3 class="card-title">
            <slot name="title">Title</slot>
        </h3>
        <div class="card-subtitle" role="doc-subtitle">
            <slot name="subtitle">Subtitle</slot>
        </div>
        <p class="card-content">
            <slot name="content">Content</slot>
        </p>
        <ScrollableRow>
            <slot name="buttons"></slot>
        </ScrollableRow>
    </div>
</template>

<style>
.card {
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
</style>