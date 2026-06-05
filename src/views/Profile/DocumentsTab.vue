<template>
  <div class="profile-content">
    <!-- Паспорт РФ -->
    <div class="profile-card">
      <div class="card-header">
        <h3>Паспорт гражданина РФ</h3>
      </div>

      <div class="profile-row">
        <div class="profile-label">Фамилия</div>
        <div class="profile-value">Зулин</div>
      </div>

      <div class="profile-row">
        <div class="profile-label">Имя</div>
        <div class="profile-value">Дмитрий</div>
      </div>

      <div class="profile-row">
        <div class="profile-label">Отчество</div>
        <div class="profile-value">Сергеевич</div>
      </div>

      <div class="profile-row">
        <div class="profile-label">Серия и номер</div>
        <div class="profile-value">0123 456789</div>
      </div>

      <div class="profile-row">
        <div class="profile-label">Дата выдачи</div>
        <div class="profile-value">12.05.2022</div>
      </div>

      <div class="profile-row">
        <div class="profile-label">Код подразделения</div>
        <div class="profile-value">220-123</div>
      </div>

      <div class="profile-row">
        <div class="profile-label">Место выдачи</div>
        <div class="profile-value">ГУ МВД РОССИИ ПО АЛТАЙСКОМУ КРАЮ</div>
      </div>
    </div>

    <!-- СНИЛС -->
    <div class="profile-card">
      <div class="card-header">
        <h3>СНИЛС</h3>
      </div>

      <div class="profile-row">
        <div class="profile-label">Номер</div>
        <div class="profile-value">123-456-789 00</div>
      </div>
    </div>

    <!-- ИНН -->
    <div class="profile-card">
      <div class="card-header">
        <h3>ИНН</h3>
      </div>

      <div class="profile-row">
        <div class="profile-label">Номер</div>
        <div class="profile-value">123456789012</div>
      </div>
    </div>

    <!-- Полис ОМС -->
    <div class="profile-card">
      <div class="card-header">
        <h3>Полис ОМС</h3>
      </div>

      <div class="profile-row">
        <div class="profile-label">Номер</div>
        <div class="profile-value">123 456 789 0000000</div>
      </div>

      <div class="profile-row">
        <div class="profile-label">Страховая компания</div>
        <div class="profile-value">АО «СОГАЗ-Мед»</div>
      </div>
    </div>

    <!-- Студенческий билет -->
    <div class="profile-card">
      <div class="card-header">
        <h3>Студенческий билет</h3>
      </div>

      <div class="profile-row">
        <div class="profile-label">Номер</div>
        <div class="profile-value">1235С9/27</div>
      </div>

      <div class="profile-row">
        <div class="profile-label">Дата выдачи</div>
        <div class="profile-value">01.09.2023</div>
      </div>
    </div>

    <!-- Зачётная книжка -->
    <div class="profile-card">
      <div class="card-header">
        <h3>Зачётная книжка</h3>
      </div>

      <div class="profile-row">
        <div class="profile-label">Номер</div>
        <div class="profile-value">1235С9/27</div>
      </div>

      <div class="profile-row">
        <div class="profile-label">Дата выдачи</div>
        <div class="profile-value">01.09.2023</div>
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

.card-header {
  padding: 18px 20px 12px 20px;
  border-bottom: 1px solid #ececec;
  background: #fafcff;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #2563eb;
  margin: 0;
}

.profile-row {
  min-height: 40px;
  padding: 16px 20px;
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
  font-weight: 500;
}

.profile-value {
  font-size: 16px;
  font-weight: 500;
  color: #222;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
}

@media (max-width: 768px) {
  .profile-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .profile-value {
    text-align: left;
    max-width: 100%;
  }

  .card-header {
    padding: 14px 16px 10px 16px;
  }

  .profile-label {
    font-size: 13px;
  }

  .profile-value {
    font-size: 15px;
  }
}


</style>