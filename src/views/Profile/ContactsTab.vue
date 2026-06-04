<!-- components/profile/ContactsTab.vue -->
<template>
  <div class="profile-content">
    <div class="profile-card">
      <div class="profile-row">
        <div>
          <div class="profile-label">Место рождения</div>
          <div class="profile-value">Россия, Алтайский край, г Рубцовск</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Гражданство</div>
          <div class="profile-value">Гражданин Российской Федерации</div>
        </div>
      </div>
    </div>

    <h3>Адрес прописки</h3>
    <div class="profile-card">
      <div class="profile-row">
        <div>
          <div class="profile-label">Населенный пункт</div>
          <div class="profile-value">Россия, Алтайский край, г Рубцовск</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Адрес</div>
          <div class="profile-value">ул Пушкина, дом 50, кв 100</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Индекс</div>
          <div class="profile-value">658204</div>
        </div>
      </div>
    </div>

    <h3>Адрес проживания</h3>
    <div class="profile-card">
      <div class="profile-row">
        <div>
          <div class="profile-label">Населенный пункт</div>
          <div class="profile-value">Россия, Алтайский край, г Рубцовск</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Адрес</div>
          <div class="profile-value">ул Пушкина, дом 50, кв 100</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Индекс</div>
          <div class="profile-value">658204</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-content {
  margin-top: 20px;
}

.profile-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.04);
  margin: 20px 0;
}

.profile-row {
  min-height: 40px;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ececec;
}

.profile-row:last-child {
  border-bottom: none;
}

.profile-label {
  font-size: 14px;
  color: #8b8b8b;
  margin-bottom: 8px;
}

.profile-value {
  font-size: 20px;
  font-weight: 500;
  color: #222;
}

h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1a2c3e;
  margin: 0 0 8px 4px;
}
</style>