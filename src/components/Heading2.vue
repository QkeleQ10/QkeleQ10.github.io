<script setup>
import Icon from "./Icon.vue";

defineProps({
    icon: String
})
</script>

<template>
    <div class="h2">
        <Icon>{{ icon }}</Icon>
        <h2>
            <slot></slot>
        </h2>
    </div>
</template>

<style>
.h2 {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: 0.5em;
    height: 1em;
    font-size: 36px;
}

.h2>h2 {
    font-size: 1em;
}

.h2>h2:has(em) {
    color: var(--greyLight);
}

.h2>h2>em {
    color: var(--fgPrimary);
    font-style: normal;
}

.h2>.icon {
    position: relative;
    --size: 1em;
    color: var(--fgPrimary);
}

.h2>.icon:hover {
    font-variation-settings: 'FILL' 1;
}

@media (width <=1100px) {
    .h2 {
        font-size: 32px;
    }
}

@media (width <=620px) {
    .h2 {
        font-size: 22px;
    }
}
</style>