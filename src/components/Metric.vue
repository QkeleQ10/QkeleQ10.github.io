<script setup>
defineProps({
    description: String
})
</script>

<template>
    <div class="metric">
        <span>{{ description }}</span>
        <span>
            <slot></slot>
        </span>
    </div>
</template>

<style>
.metric {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.metric>span {
    font-size: 14px;
}

.metric>span:nth-child(2) {
    font-size: 20px;
    font-weight: 600;
}

.metric.insignificant {
    opacity: .6;
}
</style>