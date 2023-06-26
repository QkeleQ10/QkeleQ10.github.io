<script setup>
defineProps({
    description: String,
    extra: String,
    insignificant: Boolean,
    stretch: Boolean
})
</script>

<template>
    <div class="metric" :data-insignificant="insignificant" :data-stretch="stretch">
        <span>{{ description }}</span>
        <span>
            <slot></slot>
            <span v-if="extra"> ({{ extra }})</span>
        </span>
    </div>
</template>

<style>
.metric {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-right: 12px !important;
    color: var(--fgPrimary);
    max-width: 100%;
}

.metric>span:nth-child(1) {
    font-size: 12px;
    white-space: nowrap;
}

.metric>span:nth-child(2) {
    display: flex;
    align-items: baseline;
    gap: 4px;
    font-size: 20px;
    font-weight: 600;
}

.metric>span:nth-child(2)>span {
    font-size: 12px;
    font-weight: normal;
}

.metric[data-insignificant=true] {
    opacity: .6;
}

.metric[data-stretch=true] {
    min-width: 100%;
}
</style>