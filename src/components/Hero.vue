<template>
    <div id="hero">
            <p>{{ $i18n('aboutme') }}</p>
            <ScrollableRow>
                <DefaultButton icon="twitter" href="https://twitter.com/QkeleQ10">Twitter</DefaultButton>
                <DefaultButton icon="github" href="https://github.com/QkeleQ10">GitHub</DefaultButton>
                <DefaultButton icon="external-link-alt" href="https://crowdin.com/profile/QkeleQ10">Crowdin
                </DefaultButton>
                <DefaultButton icon="external-link-alt" href="https://premid.app/users/807917674477649943">PreMiD
                </DefaultButton>
            </ScrollableRow>
    </div>
</template>

<script setup>
import Icon from "./Icon.vue";
import ScrollableRow from "./ScrollableRow.vue";
import DefaultButton from "./DefaultButton.vue";
</script>

<style>
#hero {
    background: linear-gradient(60deg, #004529, #007a20);
    box-sizing: border-box;
    padding: 100px 2em 20px;
}

#hero h2,
#hero h2 .uil,
#hero p {
    color: var(--bk2);
}

#hero p {
    font-style: italic;
    font-size: larger;
    place-self: center;
}
</style>