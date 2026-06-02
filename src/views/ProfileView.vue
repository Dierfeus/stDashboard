<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'main' | 'contacts' | 'docs'>('main')
</script>

<template>
  <div class="tabs">
    <button
        class="tab"
        :class="{ active: activeTab === 'main' }"
        @click="activeTab = 'main'"
    >
      Основные сведения
    </button>

    <button
        class="tab"
        :class="{ active: activeTab === 'contacts' }"
        @click="activeTab = 'contacts'"
    >
      Контактная информация
    </button>

    <button
        class="tab"
        :class="{ active: activeTab === 'docs' }"
        @click="activeTab = 'docs'"
    >
      Документы
    </button>
  </div>
  <div class="page">



    <!-- основное -->
    <div v-if="activeTab === 'main'" class="profile-content">
      <div class="profile-photo">
        <img data-v-5dc11753=""
             src="data:image/jpeg;base64,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"
             alt="Фотография">
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
            <div class="profile-value">Неполная семья</div>
          </div>
        </div>

        <div class="profile-row">
          <div>
            <div class="profile-label">Специальность</div>
            <div class="profile-value">09.02.07 Информационные системы и программирование (разработчик веб и
              мультимедийных приложений)
            </div>
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

    </div>

    <!-- контактные данные -->
    <div v-if="activeTab === 'contacts'" class="profile-content">
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
            <div class="profile-value">ул Киевская, дом 23, кв 74</div>
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
            <div class="profile-value">ул Киевская, дом 23, кв 74</div>
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


    <!--документы -->
    <div v-if="activeTab === 'docs'" class="profile-content">
      <div class="profile-card">
        <div class="profile-row">
          <div class="profile-label">Студенческий билет</div>
          <div class="profile-value">1235С9/27</div>
        </div>

        <div class="profile-row">
          <div class="profile-label">Справка</div>
          <div class="profile-value">Доступна</div>
        </div>
      </div>
    </div>


  </div>
</template>

<style>

.profile-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow:
      0 8px 24px rgba(0,0,0,.08),
      0 2px 8px rgba(0,0,0,.04);
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
</style>
