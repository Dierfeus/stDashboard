<script setup lang="ts">
import { ref } from 'vue'

const subjects = ref([
  { name: 'Основы программирования', grade: '5', attendance: 95, teacher: 'Иванов И.И.' },
  { name: 'Веб-технологии', grade: '4', attendance: 88, teacher: 'Петров П.П.' },
  { name: 'Базы данных', grade: '5', attendance: 92, teacher: 'Сидоров С.С.' },
  { name: 'Операционные системы', grade: '4', attendance: 85, teacher: 'Козлов А.А.' },
])
</script>

<template>
  <div class="grades-content">
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-value">4.6</div>
        <div class="stat-label">Средний балл</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">12</div>
        <div class="stat-label">Долгов</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">3</div>
        <div class="stat-label">Пересдачи</div>
      </div>
    </div>

    <div class="profile-card">
      <h3>Оценки по предметам</h3>
      <div class="grades-list">
        <div v-for="subject in subjects" :key="subject.name" class="grade-row">
          <div class="grade-subject">{{ subject.name }}</div>
          <div class="grade-info">
            <span class="grade-badge">{{ subject.grade }}</span>
            <span class="attendance">Посещаемость: {{ subject.attendance }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-card">
      <h3>Успеваемость по семестрам</h3>
      <div class="semester-chart">
        <div class="semester-bar">
          <div class="semester-label">1 семестр</div>
          <div class="bar-bg"><div class="bar-fill" style="width: 85%"></div></div>
          <div class="semester-grade">4.2</div>
        </div>
        <div class="semester-bar">
          <div class="semester-label">2 семестр</div>
          <div class="bar-bg"><div class="bar-fill" style="width: 88%"></div></div>
          <div class="semester-grade">4.4</div>
        </div>
        <div class="semester-bar">
          <div class="semester-label">3 семестр</div>
          <div class="bar-bg"><div class="bar-fill" style="width: 92%"></div></div>
          <div class="semester-grade">4.6</div>
        </div>
        <div class="semester-bar">
          <div class="semester-label">4 семестр</div>
          <div class="bar-bg"><div class="bar-fill" style="width: 78%"></div></div>
          <div class="semester-grade">3.9</div>
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

.stats-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 20px 0;
}

.stat-card {
  background: white;
  border-radius: 20px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
}

.stat-value {
  font-size: 32px;
  font-weight: bold;
  color: #2563eb;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}

.grades-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.grade-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.grade-subject {
  font-weight: 500;
}

.grade-info {
  display: flex;
  gap: 16px;
  align-items: center;
}

.grade-badge {
  background: #e8f0fe;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: bold;
  color: #2563eb;
}

.attendance {
  font-size: 14px;
  color: #666;
}

.semester-chart {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.semester-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.semester-label {
  width: 100px;
  font-size: 14px;
}

.bar-bg {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: #2563eb;
  border-radius: 4px;
}

.semester-grade {
  width: 40px;
  font-weight: bold;
  text-align: right;
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>