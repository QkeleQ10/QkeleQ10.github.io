<script setup>
defineProps({
    stretch: Boolean,
    uniform: Boolean
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
    <div class="collection-horizontal" role="list" :data-stretch="stretch" :data-uniform="uniform" v-if="hasContent()">
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
    justify-content: space-between;
}

.collection-horizontal[data-stretch=true]>* {
    margin-right: auto;
}

.collection-horizontal[data-uniform=true]>* {
    flex: 1 1 0px;
}
</style>