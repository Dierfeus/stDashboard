<!-- components/profile/DocumentsTab.vue -->
<template>
  <div class="profile-content">
    <div class="profile-card">
      <div class="profile-row">
        <div class="profile-label">Серия и номер</div>
        <div class="profile-value">0123 456789</div>
      </div>

      <div class="profile-row">
        <div class="profile-label">Место выдачи</div>
        <div class="profile-value">ГУ МВД РОСИИ ПО АЛТАЙСКОМУ КРАЮ</div>
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
}

.profile-value {
  font-size: 20px;
  font-weight: 500;
  color: #222;
}
</style>