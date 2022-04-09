<script>
import DefaultButton from "./DefaultButton.vue";
import ScrollableRow from "./containers/ScrollableRow.vue";
export default {
    components: { DefaultButton, ScrollableRow }
}
</script>

<template>
    <header>
        <img id="header-logo" src="../assets/logo.svg" title="QkeleQ10" />
        <DefaultButton icon="">Language</DefaultButton>
    </header>
</template>

<style>
header {
    padding: 10px 0 20px;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: center;
}

#header-logo {
    padding: 0 20px;
    fill: var(--accent);
    height: 50px;
}
</style>