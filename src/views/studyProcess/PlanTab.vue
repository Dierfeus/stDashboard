<template>
  <div class="grades-content">
    <div class="profile-card">
      <h3>План обучения на 2024-2025 учебный год</h3>

      <div class="plan-section">
        <h4>Осенний семестр</h4>
        <div class="plan-item">
          <div class="plan-checkbox"></div>
          <div>Веб-технологии (экзамен)</div>
        </div>
        <div class="plan-item">
          <div class="plan-checkbox"></div>
          <div>Базы данных (зачет)</div>
        </div>
        <div class="plan-item">
          <div class="plan-checkbox"></div>
          <div>Английский язык (зачет)</div>
        </div>
      </div>

      <div class="plan-section">
        <h4>Весенний семестр</h4>
        <div class="plan-item">
          <div class="plan-checkbox"></div>
          <div>Курсовая работа по программированию</div>
        </div>
        <div class="plan-item">
          <div class="plan-checkbox"></div>
          <div>Практика (4 недели)</div>
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

.plan-section {
  margin-bottom: 24px;
}

.plan-section h4 {
  margin-bottom: 12px;
  color: #2563eb;
}

.plan-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
}

.plan-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #ddd;
  border-radius: 4px;
}
</style>