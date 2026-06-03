<script setup lang="ts">
import { ref } from 'vue'

const practices = ref([
  { name: 'Учебная практика', period: 'Июнь 2024', result: 'Зачтено', hours: 72 },
  { name: 'Производственная практика', period: 'Сентябрь 2024', result: 'Ожидается', hours: 108 },
])
</script>

<template>
  <div class="grades-content">
    <div class="profile-card">
      <h3>Практики</h3>
      <div v-for="practice in practices" :key="practice.name" class="practice-item">
        <div class="practice-title">{{ practice.name }}</div>
        <div class="practice-details">
          <span>Период: {{ practice.period }}</span>
          <span>Часов: {{ practice.hours }}</span>
          <span class="practice-result">{{ practice.result }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grades-content {
  margin-top: 20px;
}

.profile-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.04);
  margin: 20px 0;
  padding: 20px;
}

.profile-card h3 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 600;
}

.practice-item {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.practice-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.practice-details {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}
</style>