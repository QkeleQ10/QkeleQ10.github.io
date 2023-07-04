<script setup>
</script>

<template>
    <main>
        <div id="error">
            <h1>404</h1>
            <p>This page doesn't exist.</p>
            <RouterLink to="/">
                <Button icon="home" class="">Main page</Button>
            </RouterLink>
        </div>
    </main>
</template>

<style>
@import "../assets/css/base.css";

#error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    height: 100svh;
    font-size: 32px;
}
</style>