<template>
  <div class="calendar">
    <div class="calendar-header">
      <button class="nav-btn" @click="prevMonth">←</button>
      <span class="month-year">{{ monthNames[currentMonth] }} {{ currentYear }}</span>
      <button class="nav-btn" @click="nextMonth">→</button>
    </div>

    <div class="weekdays">
      <div v-for="day in weekdays" :key="day" class="weekday">
        {{ day }}
      </div>
    </div>

    <div class="days">
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        class="day-cell"
      >
        <button
          v-if="day"
          class="day-btn"
          :class="{ 'selected': isSelected(day) }"
          @click="selectDate(day)"
        >
          {{ day }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['select'])

const props = defineProps({
  selectedDate: {
    type: String,
    default: ''
  }
})

const today = new Date()

const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const selectedDay = ref(null)

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  let firstWeekDay = firstDay.getDay()
  if (firstWeekDay === 0) firstWeekDay = 7

  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const result = []

  for (let i = 1; i < firstWeekDay; i++) {
    result.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    result.push(day)
  }

  return result
})

function isSelected(day) {
  if (!props.selectedDate) return false
  const date = new Date(props.selectedDate)
  return date.getDate() === day && 
         date.getMonth() === currentMonth.value && 
         date.getFullYear() === currentYear.value
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function selectDate(day) {
  const date = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  selectedDay.value = day
  emit('select', date)
}
</script>

<style scoped>
.calendar {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: transparent;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
}

.nav-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  color: #4a5b6e;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-btn:hover {
  background: #f5f7fa;
  border-color: #cbd5e1;
}

.month-year {
  font-size: 15px;
  font-weight: 600;
  color: #1a2c3e;
}

.weekdays,
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  font-size: 13px;
  color: #7c8b9c;
  padding: 6px 0;
}

.day-cell {
  aspect-ratio: 1;
}

.day-btn {
  width: 100%;
  height: 100%;
  min-height: 36px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: #1a2c3e;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.day-btn:hover {
  background: #f5f7fa;
  border-color: #cbd5e1;
}

.day-btn.selected {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

@media (max-width: 600px) {
  .calendar {
    max-width: 100%;
  }

  .calendar-header {
    margin-bottom: 12px;
  }

  .nav-btn {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }

  .month-year {
    font-size: 13px;
  }

  .weekday {
    font-size: 11px;
    padding: 4px 0;
  }

  .day-btn {
    min-height: 32px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .calendar-header {
    margin-bottom: 10px;
  }

  .nav-btn {
    width: 26px;
    height: 26px;
    font-size: 12px;
  }

  .month-year {
    font-size: 12px;
  }

  .weekday {
    font-size: 10px;
    padding: 3px 0;
  }

  .day-btn {
    min-height: 28px;
    font-size: 10px;
  }

  .weekdays,
  .days {
    gap: 3px;
  }
}

@media (max-width: 400px) {
  .weekday {
    font-size: 9px;
  }

  .day-btn {
    min-height: 24px;
    font-size: 9px;
  }

  .weekdays,
  .days {
    gap: 2px;
  }
}

@media (max-width: 360px) {
  .weekday {
    font-size: 8px;
  }

  .day-btn {
    min-height: 22px;
    font-size: 8px;
  }
}
</style>