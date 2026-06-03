<template>
  <div class="grades-content">
    <div class="profile-card">
      <h3>Демонстрационный экзамен</h3>
      <div class="exam-info">
        <div class="exam-row">
          <span class="exam-label">Статус:</span>
          <span class="exam-value">Запланирован на июнь 2025</span>
        </div>
        <div class="exam-row">
          <span class="exam-label">Компетенция:</span>
          <span class="exam-value">Веб-разработка</span>
        </div>
        <div class="exam-row">
          <span class="exam-label">Уровень:</span>
          <span class="exam-value">Базовый</span>
        </div>
        <div class="exam-progress">
          <div class="progress-label">Подготовка:</div>
          <div class="progress-bar"><div class="progress-fill" style="width: 45%"></div></div>
          <div class="progress-percent">45%</div>
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

.exam-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.exam-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.exam-label {
  width: 120px;
  font-weight: 500;
  color: #666;
}

.exam-value {
  flex: 1;
}

.exam-progress {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.progress-label {
  width: 100px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #2563eb;
  border-radius: 4px;
}
</style>