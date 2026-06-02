<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  House,
  Calendar,
  ChartColumn,
  User
} from 'lucide-vue-next'

const route = useRoute()

const translateX = computed(() => {
  switch (route.path) {
    case '/home':
      return 0
    case '/schedule':
      return 108
    case '/grades':
      return 216
    case '/profile':
      return 324
    default:
      return 0
  }
})

</script>

<template>
  <nav class="bottom-nav">

    <div
        class="active-pill"
        :style="{
    transform: `translateX(${translateX}%)`
  }"
    ></div>

    <router-link to="/home" class="nav-item">
      <House :size="22" />
    </router-link>

    <router-link to="/schedule" class="nav-item">
      <Calendar :size="22" />
    </router-link>

    <router-link to="/grades" class="nav-item">
      <ChartColumn :size="22" />
    </router-link>

    <router-link to="/profile" class="nav-item">
      <User :size="22" />
    </router-link>

  </nav>
</template>




