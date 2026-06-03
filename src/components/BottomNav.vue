<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { House, Calendar, ChartColumn, User } from 'lucide-vue-next'

const route = useRoute()

const tabs = ['/home', '/schedule', '/grades', '/profile']

const activeIndex = computed(() => {
  const index = tabs.indexOf(route.path)
  return index === -1 ? 0 : index
})

const translateX = computed(() => {
  return `${activeIndex.value * 100}%`
})
</script>

<template>
  <nav class="bottom-nav">

    <div
        class="active-pill"
        :style="{
    transform: `translateX(${translateX})`
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

<style>

.bottom-nav {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  height: 72px;
  background: white;
  border-radius: 24px;
  display: flex;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,.3);
}

.active-pill {
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 8px;
  width: calc(25% - 4px);
  border-radius: 18px;
  background: #618ffc;
  transition: transform .25s cubic-bezier(.4,0,.2,1);
}

.nav-item {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.router-link-active {
  color: white;
}
</style>


