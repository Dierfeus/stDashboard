<script setup>
import { onMounted, ref, watch } from 'vue'
import CalendarPicker from "@/components/CalendarPicker.vue";

const timetabletype = ref('group')
const timetableduration = ref('day')
const selectedId = ref(null)
const dates = ref('')
const qweresult = ref(null)
const isLoading = ref(false)

const mas_group = ref([])
const mas_room = ref([])
const mas_teacherstaff = ref([])

function getTodayDate() {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}

onMounted(() => {
  dates.value = getTodayDate()
  group_list()
  room_list()
  teacherstaff_list()
})

watch([timetabletype, timetableduration, selectedId, dates], () => {
  if (selectedId.value && dates.value) {
    timetable()
  }
})

function getSelectedId(event) {
  selectedId.value = event.target.value
}

async function timetable() {
  if (!timetabletype.value || !timetableduration.value || !selectedId.value || !dates.value) {
    console.log("Не выбраны все параметры")
    return
  }

  isLoading.value = true
  
  try {
    let url
    if (timetableduration.value === 'day') {
      url = `https://api3.rb.asu.ru/api/v1/timetable/${timetabletype.value}/${timetableduration.value}/${selectedId.value}/${dates.value}`
      const response = await fetch(url)
      const data = await response.json()
      qweresult.value = { type: 'day', data: data }
    } 
    else if (timetableduration.value === 'week') {
      url = `https://api3.rb.asu.ru/api/v1/timetable/${timetabletype.value}/week/${selectedId.value}/${dates.value}`
      const response = await fetch(url)
      const data = await response.json()
      qweresult.value = { type: 'week', data: data }
    } 
    else if (timetableduration.value === 'month') {
      url = `https://api3.rb.asu.ru/api/v1/timetable/${timetabletype.value}/month/${selectedId.value}/${dates.value}`
      const response = await fetch(url)
      const data = await response.json()
      qweresult.value = { type: 'month', data: data }
    }
    
    console.log("Расписание загружено:", qweresult.value)
  } catch (error) {
    console.error("Ошибка при загрузке расписания:", error)
    qweresult.value = null
  } finally {
    isLoading.value = false
  }
}

function getFormattedLessonsForDay(dayData) {
  if (!dayData || !dayData.timeTable) {
    return []
  }
  
  const formattedLessons = []
  
  for (const timeSlot of dayData.timeTable) {
    if (timeSlot.lessons && timeSlot.lessons.length > 0) {
      for (const lesson of timeSlot.lessons) {
        formattedLessons.push({
          lessonNumber: timeSlot.lessonNumber,
          startTime: timeSlot.startTime,
          endTime: timeSlot.endTime,
          disciplineName: lesson.disciplineName || '—',
          lessonName: lesson.lessonName || '—',
          shortLessonName: lesson.shortLessonName || '—',
          room: lesson.room || '—',
          roomId: lesson.roomId,
          teachers: lesson.teachers || [],
          groups: lesson.groups || [],
          isDistant: lesson.isDistant || false,
          isHighlighted: lesson.isHighlighted || false,
          idDisciplineType: lesson.idDisciplineType
        })
      }
    }
  }
  
  return formattedLessons
}

function getGroupedLessonsForDay(dayData) {
  const lessons = getFormattedLessonsForDay(dayData)
  const grouped = {}
  
  lessons.forEach(lesson => {
    if (!grouped[lesson.lessonNumber]) {
      grouped[lesson.lessonNumber] = {
        lessonNumber: lesson.lessonNumber,
        startTime: lesson.startTime,
        endTime: lesson.endTime,
        lessons: []
      }
    }
    grouped[lesson.lessonNumber].lessons.push(lesson)
  })
  
  return Object.values(grouped)
}

function getAllScheduleData() {
  if (!qweresult.value || !qweresult.value.data || !qweresult.value.data.value) {
    return []
  }
  
  const scheduleData = []
  const days = qweresult.value.data.value
  
  for (const day of days) {
    const grouped = getGroupedLessonsForDay(day)
    if (grouped.length > 0) {
      scheduleData.push({
        date: day.date,
        groupedLessons: grouped,
        hasLessons: true
      })
    }
  }
  
  return scheduleData
}

function formatTimeRange(startTime, endTime) {
  if (!startTime || !endTime) return '—'
  
  const start = startTime.split('T')[1]?.slice(0, 5) || startTime
  const end = endTime.split('T')[1]?.slice(0, 5) || endTime
  
  return `${start} - ${end}`
}

function formatTeachers(teachers) {
  if (!teachers || teachers.length === 0) return '—'
  return teachers.map(teacher => {
    const position = teacher.position ? ` (${teacher.position})` : ''
    return `${teacher.lastName} ${teacher.firstName?.charAt(0) || ''}.${teacher.patronymic?.charAt(0) || ''}.${position}`
  }).join(', ')
}

function formatGroups(groups) {
  if (!groups || groups.length === 0) return '—'
  return groups.map(group => group.name).join(', ')
}

function handleDate(date) {
  console.log('Выбрана дата:', date)
  dates.value = date
}

function getLessonTypeBadge(lessonName, idDisciplineType) {
  if (lessonName?.includes('Консультация') || idDisciplineType === 9) {
    return { text: 'Консультация', class: 'consultation' }
  }
  if (lessonName?.includes('Экзамен') || idDisciplineType === 5) {
    return { text: 'Экзамен', class: 'exam' }
  }
  if (lessonName?.includes('Зачет') || idDisciplineType === 6) {
    return { text: 'Зачет', class: 'credit' }
  }
  if (lessonName?.includes('Лекция') || idDisciplineType === 1) {
    return { text: 'Лекция', class: 'lecture' }
  }
  if (lessonName?.includes('Практическое') || idDisciplineType === 3) {
    return { text: 'Практика', class: 'practice' }
  }
  if (lessonName?.includes('Лабораторное') || idDisciplineType === 2) {
    return { text: 'Лабораторная', class: 'lab' }
  }
  if (lessonName?.includes('Курсовая') || idDisciplineType === 4) {
    return { text: 'Курсовая', class: 'coursework' }
  }
  if (lessonName?.includes('Семинар')) {
    return { text: 'Семинар', class: 'seminar' }
  }
  return { text: 'Занятие', class: 'default' }
}

function getLessonNumber(shortLessonName) {
  if (!shortLessonName || shortLessonName === '—') return ''
  const match = shortLessonName.match(/\d+/)
  if (match) {
    return ` №${match[0]}`
  }
  return ''
}

function goToGroupSchedule(groupId) {
  if (!groupId) return
  timetabletype.value = 'group'
  selectedId.value = groupId
}

function goToTeacherSchedule(teacherId) {
  if (!teacherId) return
  timetabletype.value = 'teacher'
  selectedId.value = teacherId
}

function goToRoomSchedule(roomId) {
  if (!roomId) return
  timetabletype.value = 'room'
  selectedId.value = roomId
}

async function group_list() {
  try {
    const response = await fetch("https://api3.rb.asu.ru/api/v1/catalog/groups")
    const data = await response.json()
    
    if (data && data.value) {
      mas_group.value = data.value
      if (mas_group.value.length > 0 && !selectedId.value && timetabletype.value === 'group') {
        selectedId.value = mas_group.value[0].id
      }
    }
  } catch (error) {
    console.error("Ошибка загрузки групп:", error)
  }
}

async function room_list() {
  try {
    const response = await fetch("https://api3.rb.asu.ru/api/v1/auditorium/auditorium")
    const data = await response.json()
    
    if (data && data.value) {
      mas_room.value = data.value.map(room => ({
        ...room,
        id: room.idAuditorium
      }))
      
      if (mas_room.value.length > 0 && !selectedId.value && timetabletype.value === 'room') {
        selectedId.value = mas_room.value[0].id
      }
    }
  } catch (error) {
    console.error("Ошибка загрузки аудиторий:", error)
  }
}

async function teacherstaff_list() {
  try {
    const response = await fetch("https://api3.rb.asu.ru/api/v1/catalog/teachers")
    const data = await response.json()
    
    if (data && Array.isArray(data.value)) {
      mas_teacherstaff.value = data.value
      if (mas_teacherstaff.value.length > 0 && !selectedId.value && timetabletype.value === 'teacher') {
        selectedId.value = mas_teacherstaff.value[0].id
      }
    }
  } catch (error) {
    console.error("Ошибка загрузки преподавателей:", error)
  }
}

function getTeacherDisplayName(teacher) {
  return `${teacher.lastName} ${teacher.firstName} ${teacher.patronymic || ''}`.trim()
}

function getRoomDisplayName(room) {
  return room.title
}

function formatDateTitle(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
  
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`
}
</script>

<template>
  <div class="timetable-app">
    <div class="filters-section">
      <div class="filter-buttons">
        <button 
          @click="timetabletype = 'group'" 
          :class="['filter-btn', { active: timetabletype === 'group' }]"
        >
          Группа
        </button>
        <button 
          @click="timetabletype = 'room'" 
          :class="['filter-btn', { active: timetabletype === 'room' }]"
        >
          Аудитория
        </button>
        <button 
          @click="timetabletype = 'teacher'" 
          :class="['filter-btn', { active: timetabletype === 'teacher' }]"
        >
          Преподаватель
        </button>
      </div>

      <div class="filter-buttons">
        <button 
          @click="timetableduration = 'day'" 
          :class="['filter-btn', { active: timetableduration === 'day' }]"
        >
          День
        </button>
        <button 
          @click="timetableduration = 'week'" 
          :class="['filter-btn', { active: timetableduration === 'week' }]"
        >
          Неделя
        </button>
        <button 
          @click="timetableduration = 'month'" 
          :class="['filter-btn', { active: timetableduration === 'month' }]"
        >
          Месяц
        </button>
      </div>

      <div class="select-wrapper">
        <select 
          v-if="timetabletype === 'group' && mas_group.length" 
          @change="getSelectedId" 
          :value="selectedId"
          class="item-select"
        >
          <option v-for="item in mas_group" :key="item.id" :value="item.id">
            {{ item.name }}
          </option>
        </select>

        <select 
          v-else-if="timetabletype === 'room' && mas_room.length" 
          @change="getSelectedId" 
          :value="selectedId"
          class="item-select"
        >
          <option v-for="item in mas_room" :key="item.id" :value="item.id">
            {{ getRoomDisplayName(item) }}
          </option>
        </select>

        <select 
          v-else-if="timetabletype === 'teacher' && mas_teacherstaff.length" 
          @change="getSelectedId" 
          :value="selectedId"
          class="item-select"
        >
          <option v-for="item in mas_teacherstaff" :key="item.id" :value="item.id">
            {{ getTeacherDisplayName(item) }}
          </option>
        </select>
      </div>
    </div>

    <div class="calendar-wrapper">
      <CalendarPicker @select="handleDate" :selected-date="dates" />
    </div>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Загрузка расписания...</p>
    </div>

    <div v-else-if="getAllScheduleData().length > 0" class="schedule">
      <div v-for="(daySchedule, dayIndex) in getAllScheduleData()" :key="dayIndex" class="schedule-day">
        <div class="day-header">
          <span class="day-name">{{ formatDateTitle(daySchedule.date).split(' ')[0] }}</span>
          <span class="day-date">{{ formatDateTitle(daySchedule.date) }}</span>
        </div>
        
        <div class="schedule-table">
          <div v-for="group in daySchedule.groupedLessons" :key="group.lessonNumber" class="lesson-row">
            <div class="lesson-number">{{ group.lessonNumber }}</div>
            <div class="lesson-time">{{ formatTimeRange(group.startTime, group.endTime) }}</div>
            <div class="lesson-details">
              <div v-for="(lesson, idx) in group.lessons" :key="idx" class="lesson-card" :class="{ 'highlighted': lesson.isHighlighted }">
                <div class="lesson-header">
                  <span :class="['lesson-badge', getLessonTypeBadge(lesson.lessonName, lesson.idDisciplineType).class]">
                    {{ getLessonTypeBadge(lesson.lessonName, lesson.idDisciplineType).text }}{{ getLessonNumber(lesson.shortLessonName) }}
                  </span>
                  <span v-if="lesson.isHighlighted" class="last-lesson-badge">Последнее занятие</span>
                </div>
                <div class="lesson-title">{{ lesson.disciplineName }}</div>
                <div class="lesson-teacher">
                  <span v-if="timetabletype !== 'teacher' && lesson.teachers[0]?.id" 
                        class="link" 
                        @click="goToTeacherSchedule(lesson.teachers[0].id)">
                    {{ formatTeachers(lesson.teachers) }}
                  </span>
                  <span v-else>{{ formatTeachers(lesson.teachers) }}</span>
                </div>
                <div class="lesson-room">
                  <span v-if="timetabletype !== 'room' && lesson.roomId" 
                        class="link" 
                        @click="goToRoomSchedule(lesson.roomId)">
                    Ауд. {{ lesson.room }}
                  </span>
                  <span v-else>Ауд. {{ lesson.room }}</span>
                </div>
                <div class="lesson-groups">
                  <template v-for="(groupItem, gIdx) in lesson.groups" :key="groupItem.id">
                    <span v-if="timetabletype !== 'group'" 
                          class="link" 
                          @click="goToGroupSchedule(groupItem.id)">
                      {{ groupItem.name }}
                    </span>
                    <span v-else>{{ groupItem.name }}</span>
                    <span v-if="gIdx < lesson.groups.length - 1">, </span>
                  </template>
                  <span v-if="!lesson.groups.length">—</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="selectedId && dates && !isLoading" class="empty-state">
      <p>Нет занятий на выбранный период</p>
    </div>
  </div>
</template>

<style scoped>
.timetable-app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters-section {
  background: white;
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.04);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.filter-buttons {
  display: flex;
  background: #f0f4f9;
  padding: 4px;
  border-radius: 48px;
}

.filter-btn {
  padding: 8px 20px;
  border: none;
  background: transparent;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  color: #6c7a8e;
}

.filter-btn:hover {
  color: #2563eb;
}

.filter-btn.active {
  background: white;
  color: #2563eb;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}

.select-wrapper {
  flex: 1;
  min-width: 200px;
}

.item-select {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #e0e7ef;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.item-select:hover {
  border-color: #2563eb;
}

.calendar-wrapper {
  background: white;
  border-radius: 24px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.04);
}

.loading-state {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 24px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f0f4f9;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
 
.schedule {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.04);
  margin-bottom: 100px;
}

.schedule-day {
  border-bottom: 4px solid #eef2f6;
}

.schedule-day:last-child {
  border-bottom: none;
}

.day-header {
  background: linear-gradient(135deg, #f8fafd 0%, #f0f4f9 100%);
  padding: 20px 24px;
  border-bottom: 1px solid #e6edf4;
}

.day-name {
  font-size: 20px;
  font-weight: 700;
  color: #1a2c3e;
  display: block;
  margin-bottom: 4px;
}

.day-date {
  font-size: 14px;
  color: #7c8b9c;
}

.schedule-table {
  display: flex;
  flex-direction: column;
}

.lesson-row {
  display: flex;
  border-bottom: 1px solid #f0f4f9;
  transition: background 0.2s;
}

.lesson-row:hover {
  background: #fafcff;
}

.lesson-number {
  width: 55px;
  min-width: 55px;
  padding: 20px 12px;
  font-size: 18px;
  font-weight: 700;
  color: #2563eb;
  text-align: center;
  border-right: 1px solid #f0f4f9;
  background: #fafcff;
}

.lesson-time {
  width: 100px;
  min-width: 100px;
  padding: 20px 12px;
  font-size: 12px;
  color: #7c8b9c;
  border-right: 1px solid #f0f4f9;
  background: #fafcff;
  display: flex;
  align-items: center;
}

.lesson-details {
  flex: 1;
  padding: 16px;
  min-width: 0;
}

.lesson-card {
  margin-bottom: 16px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  position: relative;
}

.lesson-card:last-child {
  margin-bottom: 0;
}

.lesson-card.highlighted {
  background: #fff9e6;
  border-left: 3px solid #f59e0b;
  padding-left: 12px;
}

.lesson-header {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.lesson-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

.lesson-badge.lecture {
  background: #eef3ff;
  color: #2563eb;
}

.lesson-badge.practice {
  background: #e9f9f0;
  color: #10b981;
}

.lesson-badge.lab {
  background: #fff3e0;
  color: #f59e0b;
}

.lesson-badge.coursework {
  background: #f0e9ff;
  color: #8b5cf6;
}

.lesson-badge.seminar {
  background: #f0e9ff;
  color: #8b5cf6;
}

.lesson-badge.exam {
  background: #fee2e2;
  color: #dc2626;
  font-weight: 700;
  border: 1px solid #fecaca;
}

.lesson-badge.credit {
  background: #dbeafe;
  color: #2563eb;
  font-weight: 700;
  border: 1px solid #bfdbfe;
}

.lesson-badge.consultation {
  background: #e6e6fa;
  color: #7c3aed;
  font-weight: 700;
  border: 1px solid #d8b4fe;
}

.lesson-badge.default {
  background: #f0f4f9;
  color: #6c7a8e;
}

.last-lesson-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
  background: #fef3c7;
  color: #d97706;
}

.lesson-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a2c3e;
  margin-bottom: 8px;
  line-height: 1.4;
}

.lesson-teacher,
.lesson-room,
.lesson-groups {
  font-size: 13px;
  margin-bottom: 4px;
  line-height: 1.4;
}

.lesson-teacher {
  color: #7c8b9c;
}

.lesson-room {
  color: #6c7a8e;
}

.lesson-groups {
  font-size: 12px;
  color: #9ca3af;
}

.link {
  color: #2563eb;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.2s;
}

.link:hover {
  color: #1e40af;
  text-decoration: underline;
}

.empty-state {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 24px;
  color: #9ca3af;
  margin-bottom: 100px;
}

@media (max-width: 768px) {
  .timetable-app {
    padding: 12px;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
    padding: 16px;
  }

  .filter-buttons {
    justify-content: center;
  }
  
  .filter-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .lesson-row {
    flex-wrap: nowrap;
    align-items: flex-start;
  }

  .lesson-number {
    width: 45px;
    min-width: 45px;
    padding: 16px 8px;
    font-size: 16px;
  }

  .lesson-time {
    width: 75px;
    min-width: 75px;
    padding: 16px 8px;
    font-size: 10px;
  }

  .lesson-details {
    padding: 12px;
  }

  .lesson-title {
    font-size: 14px;
  }

  .lesson-teacher,
  .lesson-room,
  .lesson-groups {
    font-size: 11px;
  }
  
  .lesson-badge,
  .last-lesson-badge {
    font-size: 10px;
    padding: 2px 8px;
  }
  
  .day-header {
    padding: 12px 16px;
  }
  
  .day-name {
    font-size: 16px;
  }
  
  .day-date {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .lesson-number {
    width: 40px;
    min-width: 40px;
    padding: 12px 6px;
    font-size: 14px;
  }

  .lesson-time {
    width: 65px;
    min-width: 65px;
    padding: 12px 6px;
    font-size: 9px;
  }
  
  .lesson-details {
    padding: 10px;
  }
  
  .lesson-title {
    font-size: 13px;
  }
  
  .lesson-teacher,
  .lesson-room,
  .lesson-groups {
    font-size: 10px;
  }
}
</style>