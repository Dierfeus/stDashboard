<template>
  <div class="page">
    <h1 class="title">Успеваемость</h1>

    <div class="card">
      <h3>Текущий журнал</h3>
      <p>Базы данных: 5 5 4 5</p>
      <p>Программирование: 5 5 5</p>
    </div>

    <div class="card">
      <h3>Итоговая аттестация</h3>
      <p>Базы данных — Экзамен — 5</p>
      <p>Программирование — Курсовая — 5</p>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from '../components/BottomNav.vue'
</script>