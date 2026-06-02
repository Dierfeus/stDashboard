<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth">←</button>

      <span>
        {{ monthNames[currentMonth] }} {{ currentYear }}
      </span>

      <button @click="nextMonth">→</button>
    </div>

    <div class="weekdays">
      <div v-for="day in weekdays" :key="day">
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

const today = new Date()

const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

const calendarDays = computed(() => {
  const firstDay = new Date(
      currentYear.value,
      currentMonth.value,
      1
  )

  let firstWeekDay = firstDay.getDay()

  if (firstWeekDay === 0) firstWeekDay = 7

  const daysInMonth = new Date(
      currentYear.value,
      currentMonth.value + 1,
      0
  ).getDate()

  const result = []

  for (let i = 1; i < firstWeekDay; i++) {
    result.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    result.push(day)
  }

  return result
})

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
  const date =
      `${currentYear.value}-` +
      `${String(currentMonth.value + 1).padStart(2, '0')}-` +
      `${String(day).padStart(2, '0')}`

  console.log(date)

  emit('select', date)
}
</script>

<style scoped>
.calendar {
  width: 100%;
  max-width: 400px;
  margin: auto;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.weekdays,
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.weekdays div {
  text-align: center;
  font-weight: bold;
}

.day-cell {
  min-height: 40px;
}

.day-btn {
  width: 100%;
  height: 40px;
  cursor: pointer;
}
</style>