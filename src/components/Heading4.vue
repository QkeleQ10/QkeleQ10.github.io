<template>
    <h4>
        <slot></slot>
    </h4>
</template>

<style>
h4 {
    font-size: 16px;
    margin-bottom: 1rem !important;
}

h4:has(em) {
    color: var(--greyLight);
}

h4>em {
    color: var(--fgPrimary);
    font-style: normal;
}
</style>