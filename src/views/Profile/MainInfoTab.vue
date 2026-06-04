<!-- components/profile/MainInfoTab.vue -->
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  router.push('/')
}
</script>

<template>
  <div class="profile-content">
    <div class="profile-photo">
      <!-- <img src="" alt="Фотография"> -->
    </div>

    <div class="profile-card">
      <div class="profile-row">
        <div>
          <div class="profile-label">ФИО</div>
          <div class="profile-value">Зулин Дмитрий Сергеевич</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Родился</div>
          <div class="profile-value">15.11.2006</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Группа</div>
          <div class="profile-value">1235С9-2</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Специальность</div>
          <div class="profile-value">ИСиП (разработчик) (ОЧО, СПО, 3. 10 мес.) 2023</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Вид набора</div>
          <div class="profile-value">Главный набор</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Статус</div>
          <div class="profile-value">Обучается</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Ин.Язык</div>
          <div class="profile-value">Английский</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Студ.билет</div>
          <div class="profile-value">1235С9/27</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Куратор</div>
          <div class="profile-value">Краснослободцева Ирина Сергеевна</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Льгота</div>
          <div class="profile-value">без льгот</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Специальность</div>
          <div class="profile-value">09.02.07 Информационные системы и программирование (разработчик веб и мультимедийных приложений)</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Форма Обучения</div>
          <div class="profile-value">очная</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Уровень обучения</div>
          <div class="profile-value">Среднее профессиональное образование</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Год поступления</div>
          <div class="profile-value">2023</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Лет обучения</div>
          <div class="profile-value">4</div>
        </div>
      </div>

      <div class="profile-row">
        <div>
          <div class="profile-label">Курс</div>
          <div class="profile-value">3</div>
        </div>
      </div>
    </div>

    <div class="profile-card logout-card">
      <button class="logout-btn" @click="logout">
        <span class="logout-icon">↩</span>
        Выйти из аккаунта
      </button>
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

.profile-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #ddd;
  overflow: hidden;
  margin: 20px auto 24px;
  border: 4px solid white;
  box-shadow: 0 4px 16px rgba(0,0,0,.1);
}

.profile-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.logout-card {
  margin-top: 32px;
  overflow: hidden;
}

.logout-btn {
  width: 100%;
  min-height: 64px;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 500;
  color: #e14d4d;
  cursor: pointer;
  transition: background .2s ease;
}

.logout-btn:hover {
  background: rgba(255, 77, 77, .72);
  color: #fff;
}

.logout-btn:active {
  background: rgba(255, 77, 77, .72);
  color: #fff;
}

.logout-icon {
  font-size: 22px;
}
</style>