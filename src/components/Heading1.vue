<template>
    <h1>
        <slot></slot>
    </h1>
</template>

<style>
h1 {
    font-family: var(--font1);
    font-size: 7rem;
    animation: load 500ms 100ms both;
}

#hero h1 {
    color: var(--fgContrast);
}

@media (max-width: 1300px) {
    h1 {
        font-size: 6rem;
    }
}

@media (max-width: 1100px) {
    h1 {
        font-size: 4.5rem;
    }
}

@media (max-width: 620px) {
    h1 {
        font-size: 3rem;
    }
}

@keyframes load {
    0% {
        font-weight: 400;
    }

    100% {
        font-weight: 600;
    }
}
</style>