<script setup></script>

<script>
export default {
    methods: {
        hasContent() {
            return !!this.$slots
        }
    },
}
</script>

<template>
    <div class="scrollable-column" v-if="hasContent()">
        <slot></slot>
    </div>
</template>

<style>
.scrollable-column {
    display: grid;
    grid-template-columns: auto;
    justify-content: start;
    justify-items: stretch;
    align-items: stretch;
    gap: 10px;
}

.padded {
    padding: 10px 20px;
    margin: 5px -20px 0;
}
</style>