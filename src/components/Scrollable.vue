<script setup>
defineProps({
    direction: {
        default: 'row',
        validator(value) {
            return ['row', 'column'].includes(value)
        }
    },
    stretch: Boolean,
    padded: Boolean
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
    <div class="scrollable" :data-direction="direction" :data-stretch="stretch" :data-padded="padded"
        v-if="hasContent()">
        <slot></slot>
    </div>
</template>

<style>
.scrollable {
    display: grid;
    grid-template-columns: auto;
    justify-items: stretch;
    align-items: stretch;
    overflow: auto;
    gap: 10px;
    width: max-content;
}

.scrollable[data-direction="column"] {
    grid-auto-flow: column;
}

.scrollable[data-stretch=true] {
    justify-content: stretch;
    width: auto;
}

.scrollable[data-padded=true] {
    padding: 10px 20px;
    margin: 5px -20px 0;
}
</style>