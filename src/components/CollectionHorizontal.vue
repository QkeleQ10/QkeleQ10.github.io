<script setup>
defineProps({
    gapless: Boolean,
    stretch: Boolean,
    uniform: Boolean,
    wrap: Boolean
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
    <div class="collection-horizontal" role="list" :data-gapless="gapless" :data-stretch="stretch" :data-uniform="uniform"
        :data-wrap="wrap" v-if="hasContent()">
        <slot></slot>
    </div>
</template>

<style>
.collection-horizontal {
    display: flex;
    overflow: auto;
    gap: 18px 10px;
}

.collection-horizontal[data-gapless=true] {
    gap: 0 0;
}

.collection-horizontal.no-row-gap {
    row-gap: 0;
}

.collection-horizontal[data-stretch=true] {
    width: 100%;
    justify-content: space-between;
}

.collection-horizontal[data-stretch=true]>* {
    margin-right: 0;
}

.collection-horizontal[data-uniform=true]>* {
    flex: 1 1 0px;
}

.collection-horizontal[data-wrap=true],
.collection-horizontal.wrap {
    max-width: 100%;
    overflow: hidden;
    flex-wrap: wrap;
}

.collection-horizontal.align-right {
    justify-content: flex-end;
}
</style>