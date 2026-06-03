<script setup lang="ts">
import { ref, computed } from 'vue'

// Данные из ваших оценок
const allGrades = ref([
  // 3 курс, 2 семестр
  { course: 3, semester: 2, subject: 'Безопасность жизнедеятельности', type: 'Зачет', grade: 'Зачтено', teacher: 'Комарова Татьяна Владимировна' },
  { course: 3, semester: 2, subject: 'Иностранный язык в профессиональной деятельности (английский)', type: 'Зачет', grade: 'Зачтено', teacher: 'Числина Мария Анатольевна' },
  { course: 3, semester: 2, subject: 'Физическая культура', type: 'Зачет', grade: 'Зачтено', teacher: 'Калинникова Наталья Яновна' },

  // 3 курс, 1 семестр
  { course: 3, semester: 1, subject: 'Учебная практика', type: 'Практики', grade: 'Отлично', teacher: 'Костенко Наталья Николаевна' },
  { course: 3, semester: 1, subject: 'Разработка мобильных приложений', type: 'Экзамен', grade: 'Отлично', teacher: 'Скрипченко Сергей Дмитриевич' },
  { course: 3, semester: 1, subject: 'Технология разработки программного обеспечения', type: 'Экзамен', grade: 'Отлично', teacher: 'Скрипченко Сергей Дмитриевич' },
  { course: 3, semester: 1, subject: 'Веб-дизайн', type: 'Зачет', grade: 'Зачтено', teacher: 'Костенко Виталий Витальевич' },
  { course: 3, semester: 1, subject: 'Графический дизайн и мультимедиа', type: 'Экзамен', grade: 'Отлично', teacher: 'Рязанова Ольга Валентиновна' },
  { course: 3, semester: 1, subject: 'Разработка приложений БД', type: 'Зачет', grade: 'Зачтено', teacher: 'Рязанова Ольга Валентиновна' },
  { course: 3, semester: 1, subject: 'Физическая культура', type: 'Зачет', grade: 'Зачтено', teacher: 'Калинникова Наталья Яновна' },

  // 2 курс, 2 семестр
  { course: 2, semester: 2, subject: 'Операционные системы и среды', type: 'Экзамен', grade: 'Отлично', teacher: 'Гаськов Александр Вячеславович' },
  { course: 2, semester: 2, subject: 'Менеджмент в профессиональной деятельности', type: 'Зачет', grade: 'Зачтено', teacher: 'Машуков Владимир Иванович' },
  { course: 2, semester: 2, subject: 'Основы проектирования баз данных', type: 'Зачет', grade: 'Зачтено', teacher: 'Кирибаев Естай Иержанович' },
  { course: 2, semester: 2, subject: 'Технологии компьютерной графики', type: 'Экзамен', grade: 'Отлично', teacher: 'Рязанова Ольга Валентиновна' },
  { course: 2, semester: 2, subject: 'Компьютерные сети', type: 'Экзамен', grade: 'Отлично', teacher: 'Дергилев Олег Викторович' },
  { course: 2, semester: 2, subject: 'Основы алгоритмизации и программирования', type: 'Экзамен', grade: 'Отлично', teacher: 'Бочкарь Виталина Сергеевна' },
  { course: 2, semester: 2, subject: 'Информационные технологии', type: 'Экзамен', grade: 'Отлично', teacher: 'Краснослободцева Ирина Сергеевна' },
  { course: 2, semester: 2, subject: 'Численные методы', type: 'Зачет', grade: 'Зачтено', teacher: 'Бочкарь Виталина Сергеевна' },
  { course: 2, semester: 2, subject: 'Стандартизация, сертификация и техническое документоведение', type: 'Зачет', grade: 'Зачтено', teacher: 'Гаськов Александр Вячеславович' },
  { course: 2, semester: 2, subject: 'Экономика отрасли', type: 'Зачет', grade: 'Зачтено', teacher: 'Бахирева Анна Алексеевна' },
  { course: 2, semester: 2, subject: 'Правовое обеспечение профессиональной деятельности', type: 'Зачет', grade: 'Зачтено', teacher: 'Кирибаев Естай Иержанович' },
  { course: 2, semester: 2, subject: 'Иностранный язык в профессиональной деятельности (английский)', type: 'Зачет', grade: 'Зачтено', teacher: 'Числина Мария Анатольевна' },
  { course: 2, semester: 2, subject: 'Физическая культура', type: 'Зачет', grade: 'Зачтено', teacher: 'Калинникова Наталья Яновна' },

  // 2 курс, 1 семестр
  { course: 2, semester: 1, subject: 'Архитектура аппаратных средств', type: 'Зачет', grade: 'Зачтено', teacher: 'Гаськов Александр Вячеславович' },
  { course: 2, semester: 1, subject: 'Психология общения', type: 'Зачет', grade: 'Зачтено', teacher: 'Иванова Ольга Юрьевна' },
  { course: 2, semester: 1, subject: 'История', type: 'Экзамен', grade: 'Хорошо', teacher: 'Ионова Татьяна Владимировна' },
  { course: 2, semester: 1, subject: 'Основы философии', type: 'Экзамен', grade: 'Отлично', teacher: 'Чусовитина Оксана Евгеньевна' },
  { course: 2, semester: 1, subject: 'Физическая культура', type: 'Зачет', grade: 'Зачтено', teacher: 'Калинникова Наталья Яновна' },
  { course: 2, semester: 1, subject: 'Теория вероятностей и математическая статистика', type: 'Экзамен', grade: 'Отлично', teacher: 'Файзиева Галина Николаевна' },
  { course: 2, semester: 1, subject: 'Элементы высшей математики', type: 'Экзамен', grade: 'Отлично', teacher: 'Файзиева Галина Николаевна' },
  { course: 2, semester: 1, subject: 'Дискретная математика с элементами математической логики', type: 'Зачет', grade: 'Зачтено', teacher: 'Палкина Светлана Михайловна' },
  { course: 2, semester: 1, subject: 'Введение в профессию', type: 'Зачет', grade: 'Зачтено', teacher: 'Данилова Наталья Александровна' },

  // 1 курс, 2 семестр
  { course: 1, semester: 2, subject: 'Физика', type: 'Экзамен', grade: 'Отлично', teacher: 'Анисимова Елена Александровна' },
  { course: 1, semester: 2, subject: 'Информатика', type: 'Экзамен', grade: 'Отлично', teacher: 'Буш Валерия Викторовна' },
  { course: 1, semester: 2, subject: 'История', type: 'Экзамен', grade: 'Отлично', teacher: 'Романова Галина Вячеславовна' },
  { course: 1, semester: 2, subject: 'Химия', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Бочкарь Виталина Сергеевна' },
  { course: 1, semester: 2, subject: 'Математика', type: 'Экзамен', grade: 'Отлично', teacher: 'Файзиева Галина Николаевна' },
  { course: 1, semester: 2, subject: 'Иностранный язык (английский)', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Числина Мария Анатольевна' },
  { course: 1, semester: 2, subject: 'Основы безопасности жизнедеятельности', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Тушова Тамара Михайловна' },
  { course: 1, semester: 2, subject: 'Русский язык', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Васильева Ирина Геннадьевна' },
  { course: 1, semester: 2, subject: 'Обществознание', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Романова Галина Вячеславовна' },
  { course: 1, semester: 2, subject: 'Литература', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Лямина Ольга Николаевна' },
  { course: 1, semester: 2, subject: 'Физическая культура', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Калинникова Наталья Яновна' },

  // 1 курс, 1 семестр
  { course: 1, semester: 1, subject: 'Основы финансовой грамотности', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Бочкарь Виталина Сергеевна' },
  { course: 1, semester: 1, subject: 'Физическая культура', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Калинникова Наталья Яновна' },
  { course: 1, semester: 1, subject: 'Конструирование и 3D-моделирование', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Гаськов Александр Вячеславович' },
  { course: 1, semester: 1, subject: 'Биология', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Мозер Ксения Олеговна' },
  { course: 1, semester: 1, subject: 'География', type: 'Дифференцированный зачет', grade: 'Отлично', teacher: 'Захарова Ольга Руслановна' }
])

// Вычисление статистики
const stats = computed(() => {
  const totalGrades = allGrades.value.length
  const excellent = allGrades.value.filter(g => g.grade === 'Отлично').length
  const good = allGrades.value.filter(g => g.grade === 'Хорошо').length
  const passed = allGrades.value.filter(g => g.grade === 'Зачтено').length

  // Подсчет долгов (есть ли незачеты/неудовлетворительно)
  const debts = allGrades.value.filter(g => g.grade === 'Незачет' || g.grade === 'Неудовлетворительно').length

  // Расчет среднего балла (Отлично=5, Хорошо=4, Зачтено=5)
  let totalScore = 0
  allGrades.value.forEach(g => {
    if (g.grade === 'Отлично') totalScore += 5
    else if (g.grade === 'Хорошо') totalScore += 4
    else if (g.grade === 'Зачтено') totalScore += 5
  })

  const avgGrade = (totalScore / totalGrades).toFixed(2)

  return {
    avgGrade,
    excellent,
    good,
    passed,
    debts,
    totalGrades
  }
})

// Группировка по курсам и семестрам для детального просмотра
const gradesByCourse = computed(() => {
  const grouped: Record<string, any[]> = {}
  allGrades.value.forEach(g => {
    const key = `${g.course} курс, ${g.semester} семестр`
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(g)
  })
  return grouped
})
</script>

<template>
  <div class="grades-content">
    <!-- Статистические карточки -->
    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-value">{{ stats.avgGrade }}</div>
        <div class="stat-label">Средний балл</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats.excellent + stats.good + stats.passed }}</div>
        <div class="stat-label">Сдано</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats.debts }}</div>
        <div class="stat-label">Долги</div>
      </div>
    </div>

    <!-- Дополнительные карточки с подробной статистикой -->
    <div class="stats-details">
      <div class="stat-detail-card">
        <div class="stat-detail-value excellent">{{ stats.excellent }}</div>
        <div class="stat-detail-label">Отлично</div>
      </div>
      <div class="stat-detail-card">
        <div class="stat-detail-value good">{{ stats.good }}</div>
        <div class="stat-detail-label">Хорошо</div>
      </div>
      <div class="stat-detail-card">
        <div class="stat-detail-value passed">{{ stats.passed }}</div>
        <div class="stat-detail-label">Зачтено</div>
      </div>
    </div>

    <!-- Список всех оценок по курсам и семестрам -->
    <div class="profile-card">
      <h3>Все оценки</h3>
      <div v-for="(grades, key) in gradesByCourse" :key="key" class="course-section">
        <h4 class="course-title">{{ key }}</h4>
        <div v-for="grade in grades" :key="grade.subject" class="grade-item">
          <div class="grade-info">
            <div class="grade-subject">{{ grade.subject }}</div>
            <div class="grade-meta">
              <span class="grade-type">{{ grade.type }}</span>
              <span class="grade-teacher">{{ grade.teacher }}</span>
            </div>
          </div>
          <div class="grade-value" :class="{
            'grade-excellent': grade.grade === 'Отлично',
            'grade-good': grade.grade === 'Хорошо',
            'grade-passed': grade.grade === 'Зачтено'
          }">
            {{ grade.grade }}
          </div>
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

.stats-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 20px 0;
}

.stat-detail-card {
  background: white;
  border-radius: 20px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
}

.stat-detail-value {
  font-size: 28px;
  font-weight: bold;
}

.stat-detail-value.excellent {
  color: #10b981;
}

.stat-detail-value.good {
  color: #3b82f6;
}

.stat-detail-value.passed {
  color: #8b5cf6;
}

.stat-detail-label {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.course-section {
  margin-bottom: 24px;
}

.course-title {
  font-size: 16px;
  font-weight: 600;
  color: #2563eb;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #eef2f6;
}

.grade-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f4f9;
  gap: 12px;
  flex-wrap: wrap;
}

.grade-info {
  flex: 1;
}

.grade-subject {
  font-weight: 600;
  font-size: 15px;
  color: #1a2c3e;
  margin-bottom: 4px;
}

.grade-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #7c8b9c;
  flex-wrap: wrap;
}

.grade-type {
  background: #f0f4f9;
  padding: 2px 8px;
  border-radius: 12px;
}

.grade-teacher {
  color: #7c8b9c;
}

.grade-value {
  font-weight: 700;
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 20px;
  min-width: 80px;
  text-align: center;
}

.grade-excellent {
  color: #10b981;
  background: #e9f9f0;
}

.grade-good {
  color: #3b82f6;
  background: #eef3ff;
}

.grade-passed {
  color: #10b981;
  background: #f0e9ff;
}

@media (max-width: 768px) {
  .stats-cards, .stats-details {
    grid-template-columns: 1fr;
  }

  .grade-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .grade-value {
    align-self: flex-start;
  }
}
</style>