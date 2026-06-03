<script setup lang="ts">
import { ref } from 'vue'

const courseworks = ref([
  { name: 'Разработка веб-приложения', status: 'Сдана', grade: '5', deadline: '01.12.2024' },
  { name: 'Проектирование БД', status: 'В процессе', grade: '-', deadline: '15.01.2025' },
])
</script>

<template>
  <div class="grades-content">
    <div class="profile-card">
      <h3>Курсовые работы</h3>
      <div v-for="course in courseworks" :key="course.name" class="course-item">
        <div class="course-title">{{ course.name }}</div>
        <div class="course-details">
          <span class="course-status" :class="course.status === 'Сдана' ? 'status-success' : 'status-pending'">
            {{ course.status }}
          </span>
          <span class="course-grade">{{ course.grade !== '-' ? `Оценка: ${course.grade}` : '' }}</span>
          <span class="course-deadline">Срок: {{ course.deadline }}</span>
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

.course-item {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.course-title {
  font-weight: 600;
  margin-bottom: 8px;
}

.course-details {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
}

.course-status {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.status-success {
  background: #d1fae5;
  color: #059669;
}

.status-pending {
  background: #fef3c7;
  color: #d97706;
}
</style>