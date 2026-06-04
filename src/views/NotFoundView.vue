<!-- src/views/NotFoundView.vue -->
<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Страница не найдена</p>

    <RouterLink to="/">
      На главную
    </RouterLink>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
}
</style>