<script setup>
import { useRoute } from 'vue-router'
import BottomNav from './components/BottomNav.vue'

const route = useRoute()
</script>

<template>
  <router-view />

  <BottomNav v-if="!route.meta.hideNav" />
</template>