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
    <div class="collection-vertical" :data-stretch="stretch" v-if="hasContent()">
        <slot></slot>
    </div>
</template>

<style>
.collection-vertical {
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 10px;
}

.collection-vertical[data-stretch=true] {
    width: 100%;
    place-items: stretch;
    place-content: stretch;
}
</style>