<script setup lang="ts">
import { ref, computed } from 'vue'
import SemesterSelector from "@/components/SemesterSelector.vue";

// Локальное состояние для выбора курса и семестра
const currentSelection = ref({ course: 3, semester: 1 })

// Данные по предметам и оценкам для разных семестров
const subjectsData: Record<string, any[]> = {
  '3-1': [
    {
      name: 'Информационные системы и программирование',
      teacher: 'Краснослободцева И.С.',
      avgGrade: 4.8,
      marks: [
        { date: '14.01.2026', title: 'Лабораторное занятие №1', grade: null },
        { date: '20.01.2026', title: 'Лабораторное занятие №2', grade: 5 },
        { date: '21.01.2026', title: 'Лабораторное занятие №3', grade: null },
        { date: '28.01.2026', title: 'Контрольная работа', grade: 4 }
      ]
    },
    {
      name: 'Веб-технологии',
      teacher: 'Иванов А.А.',
      avgGrade: 4.5,
      marks: [
        { date: '10.01.2026', title: 'Практическая работа №1', grade: 5 },
        { date: '17.01.2026', title: 'Практическая работа №2', grade: 4 },
        { date: '24.01.2026', title: 'Лабораторная работа', grade: 5 }
      ]
    },
    {
      name: 'Базы данных',
      teacher: 'Петрова Е.В.',
      avgGrade: 5.0,
      marks: [
        { date: '12.01.2026', title: 'Лабораторная №1 (SQL)', grade: 5 },
        { date: '19.01.2026', title: 'Лабораторная №2 (JOIN)', grade: 5 },
        { date: '26.01.2026', title: 'Курсовая работа', grade: 5 }
      ]
    }
  ],
  '3-2': [
    {
      name: 'Архитектура ЭВМ',
      teacher: 'Смирнов Д.А.',
      avgGrade: 4.2,
      marks: [
        { date: '05.02.2026', title: 'Лабораторная работа №1', grade: 4 },
        { date: '12.02.2026', title: 'Лабораторная работа №2', grade: null },
        { date: '19.02.2026', title: 'Контрольная работа', grade: 4 }
      ]
    },
    {
      name: 'Компьютерные сети',
      teacher: 'Козлов И.И.',
      avgGrade: 4.7,
      marks: [
        { date: '07.02.2026', title: 'Практическое занятие', grade: 5 },
        { date: '14.02.2026', title: 'Лабораторная работа', grade: 5 },
        { date: '21.02.2026', title: 'Тестирование', grade: 4 }
      ]
    },
    {
      name: 'Объектно-ориентированное программирование',
      teacher: 'Новикова М.С.',
      avgGrade: 4.9,
      marks: [
        { date: '06.02.2026', title: 'Лабораторная №1 (Классы)', grade: 5 },
        { date: '13.02.2026', title: 'Лабораторная №2 (Наследование)', grade: 5 },
        { date: '20.02.2026', title: 'Лабораторная №3 (Полиморфизм)', grade: 4 }
      ]
    },
    {
      name: 'Безопасность жизнедеятельности',
      teacher: 'Морозов В.В.',
      avgGrade: 5.0,
      marks: [
        { date: '08.02.2026', title: 'Тест №1', grade: 5 },
        { date: '15.02.2026', title: 'Практическая работа', grade: 5 }
      ]
    }
  ]
}

const displayedSubjects = computed(() => {
  const key = `${currentSelection.value.course}-${currentSelection.value.semester}`
  return subjectsData[key] || subjectsData['3-1']
})

function handleSemesterChange(selection: { course: number, semester: number }) {
  currentSelection.value = selection
}
</script>

<template>
  <div class="grades-content">
    <SemesterSelector @change="handleSemesterChange" />
    <div class="profile-card">
      <div class="journal-list">
        <details v-for="subject in displayedSubjects" :key="subject.name" class="subject-card">
          <summary class="subject-summary">
            <div class="subject-info">
              <span class="subject-name">{{ subject.name }}</span>
              <span class="subject-teacher">{{ subject.teacher }}</span>
            </div>
            <div class="subject-grade-badge">{{ subject.avgGrade }}</div>
          </summary>
          <div class="marks-table">
            <div class="mark-row header">
              <div class="mark-date">Дата</div>
              <div class="mark-title">Занятие</div>
              <div class="mark-value">Оценка</div>
            </div>
            <div v-for="mark in subject.marks" :key="mark.title" class="mark-row">
              <div class="mark-date">{{ mark.date }}</div>
              <div class="mark-title">{{ mark.title }}</div>
              <div class="mark-value">
                <span v-if="mark.grade" :class="mark.grade >= 4 ? 'grade-excellent' : 'grade-good'">
                  {{ mark.grade }}
                </span>
                <span v-else class="grade-none">—</span>
              </div>
            </div>
          </div>
        </details>
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

.journal-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subject-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #eef2f6;
  transition: all 0.2s ease;
}

.subject-card[open] {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-color: #cbdffc;
}

.subject-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  list-style: none;
  gap: 12px;
}

.subject-summary::-webkit-details-marker {
  display: none;
}

.subject-summary::after {
  content: "▼";
  font-size: 14px;
  color: #618ffc;
  transition: transform 0.2s;
}

.subject-card[open] .subject-summary::after {
  transform: rotate(180deg);
}

.subject-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.subject-name {
  font-weight: 700;
  font-size: 16px;
  color: #1a2c3e;
}

.subject-teacher {
  font-size: 13px;
  color: #7c8b9c;
}

.subject-grade-badge {
  background: #eef3ff;
  padding: 6px 12px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 700;
  color: #2563eb;
  white-space: nowrap;
}

.marks-table {
  border-top: 1px solid #eef2f6;
  background: #fafcff;
  padding: 8px 0;
}

.mark-row {
  display: grid;
  grid-template-columns: 85px 1fr 48px;
  padding: 12px 16px;
  gap: 8px;
  font-size: 14px;
  border-bottom: 1px solid #f0f4f9;
  align-items: center;
}

.mark-row.header {
  color: #6c7a8e;
  font-weight: 600;
  font-size: 12px;
  padding-top: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e6edf4;
}

.mark-date {
  color: #4a5b6e;
}

.mark-title {
  color: #1e2f3f;
  word-break: break-word;
}

.mark-value {
  text-align: center;
  font-weight: 600;
}

.grade-excellent {
  color: #10b981;
  background: #e9f9f0;
  padding: 2px 6px;
  border-radius: 24px;
  display: inline-block;
  min-width: 32px;
}

.grade-good {
  color: #3b82f6;
  background: #eef3ff;
  padding: 2px 6px;
  border-radius: 24px;
  display: inline-block;
  min-width: 32px;
}

.grade-none {
  color: #9ca3af;
}
</style>