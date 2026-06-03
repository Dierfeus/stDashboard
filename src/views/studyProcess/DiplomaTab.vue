<template>
  <div class="grades-content">
    <div class="profile-card">
      <h3>Дипломное проектирование</h3>
      <div class="diploma-info">
        <div class="diploma-row">
          <span class="diploma-label">Тема:</span>
          <span class="diploma-value">- не выбрана -</span>
        </div>
        <div class="diploma-row">
          <span class="diploma-label">Руководитель:</span>
          <span class="diploma-value">- не назначен -</span>
        </div>
        <div class="diploma-row">
          <span class="diploma-label">Дата защиты:</span>
          <span class="diploma-value">- не назначена -</span>
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

.diploma-info {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.diploma-row {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.diploma-label {
  width: 120px;
  font-weight: 500;
  color: #666;
}

.diploma-value {
  flex: 1;
}
</style>