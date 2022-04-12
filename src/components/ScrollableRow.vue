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
    <div class="scrollable-row" v-if="hasContent()">
        <slot></slot>
    </div>
</template>

<style>
.scrollable-row {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: auto;
    justify-content: start;
    justify-items: stretch;
    align-items: stretch;
    overflow: auto;
    gap: 10px;
}

.padded {
    padding: 10px 20px;
    margin: 5px -20px 0;
}
</style>