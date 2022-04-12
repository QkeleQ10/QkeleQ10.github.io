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
    <div class="grid-fit" v-if="hasContent()">
        <slot></slot>
    </div>
</template>

<style>
.grid-fit {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 10px;
    align-content: stretch;
}

.padded {
    padding: 10px 20px;
    margin: 5px -20px 0;
}
</style>