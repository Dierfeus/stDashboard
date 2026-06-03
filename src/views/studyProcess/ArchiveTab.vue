<template>
  <div class="grades-content">
    <div class="profile-card">
      <h3>Архив успеваемости</h3>
      <div class="archive-year">
        <h4>2023-2024 учебный год</h4>
        <div class="archive-subject">Основы программирования - 5</div>
        <div class="archive-subject">Математика - 4</div>
        <div class="archive-subject">Физика - 4</div>
      </div>
      <div class="archive-year">
        <h4>2022-2023 учебный год</h4>
        <div class="archive-subject">Информатика - 5</div>
        <div class="archive-subject">Русский язык - 4</div>
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

.archive-year {
  margin-bottom: 20px;
}

.archive-year h4 {
  margin-bottom: 12px;
  color: #4b5563;
}

.archive-subject {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}
</style>