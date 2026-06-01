<template>
  <div class="page">
    <h1 class="title">Профиль</h1>

    <div class="profile-photo"></div>

    <div class="card">
      <p><b>ФИО:</b> Дмитрий Иванов</p>
      <p><b>Группа:</b> 1235С9-2</p>
      <p><b>Специальность:</b> 09.02.02 ИСиП</p>
      <p><b>Курс:</b> 3</p>
    </div>

    <BottomNav />
  </div>
</template>

<script setup>
import BottomNav from '../components/BottomNav.vue'
</script>