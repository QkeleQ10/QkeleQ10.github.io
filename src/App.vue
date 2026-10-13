<script setup>
import NavigationRail from './components/NavigationRail.vue';
import { usePageTitle } from './composables/usePageTitle';

import './assets/css/base.css';

usePageTitle('');
</script>

<template>
    <NavigationRail />
    <main>
        <router-view>
        </router-view>
    </main>
</template>