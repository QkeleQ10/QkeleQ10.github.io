<script setup>
defineProps({
    stretch: Boolean
})
</script>

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
    <div class="collection-horizontal" role="list" :data-stretch="stretch" v-if="hasContent()">
        <slot></slot>
    </div>
</template>

<style>
.collection-horizontal {
    display: flex;
    overflow: auto;
    gap: 10px;
}

.collection-horizontal[data-stretch=true] {
    width: 100%;
    place-items: stretch;
    place-content: stretch;
}
</style>