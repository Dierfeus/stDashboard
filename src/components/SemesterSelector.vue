<script setup>
import { ref, onUnmounted, onMounted } from 'vue'

const emit = defineEmits(['change'])

const selectedCourse = ref(3)
const selectedSemester = ref(1)

const courses = ['1 курс', '2 курс', '3 курс', '4 курс']
const semesters = ['1 семестр', '2 семестр']

const isOpenCourse = ref(false)
const isOpenSemester = ref(false)

// Рефы для элементов, чтобы правильно позиционировать дропдауны
const courseBoxRef = ref(null)
const semesterBoxRef = ref(null)

function selectCourse(course) {
  selectedCourse.value = courses.indexOf(course) + 1
  isOpenCourse.value = false
  emitChange()
}

function selectSemester(semester) {
  selectedSemester.value = semesters.indexOf(semester) + 1
  isOpenSemester.value = false
  emitChange()
}

function emitChange() {
  emit('change', {
    course: selectedCourse.value,
    semester: selectedSemester.value
  })
}

function closeDropdowns(event) {
  // Закрываем только если клик был вне дропдаунов
  if (courseBoxRef.value && !courseBoxRef.value.contains(event.target) &&
      semesterBoxRef.value && !semesterBoxRef.value.contains(event.target)) {
    isOpenCourse.value = false
    isOpenSemester.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdowns)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdowns)
})
</script>

<template>
  <div class="semester-selector">
    <div class="selector-row">
      <!-- Выбор курса -->
      <div class="selector-wrapper" ref="courseBoxRef">
        <div class="box" :class="{ open: isOpenCourse }" @click.stop="isOpenCourse = !isOpenCourse">
          <div class="selector-text">
            {{ selectedCourse }} курс
          </div>
        </div>
        <div v-if="isOpenCourse" class="selector-dropdown">
          <div
              v-for="c in courses"
              :key="c"
              class="selector-item"
              @click="selectCourse(c)"
          >
            {{ c }}
          </div>
        </div>
      </div>

      <!-- Выбор семестра -->
      <div class="selector-wrapper" ref="semesterBoxRef">
        <div class="box" :class="{ open: isOpenSemester }" @click.stop="isOpenSemester = !isOpenSemester">
          <div class="selector-text">
            {{ selectedSemester }} семестр
          </div>
        </div>
        <div v-if="isOpenSemester" class="selector-dropdown">
          <div
              v-for="s in semesters"
              :key="s"
              class="selector-item"
              @click="selectSemester(s)"
          >
            {{ s }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.semester-selector {
  margin: 10px;
  position: relative;
}

.selector-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.selector-wrapper {
  position: relative;
  flex: 1;
  min-width: 120px;
}

.box {
  background: #f5f6f8;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border: 1px solid #2563eb;
  color: #618FFC;
  width: 100%;
}

.selector-text {
  font-size: 14px;
  font-weight: 500;
}

.box:after {
  content: "▼";
  font-size: 14px;
  color: #618ffc;
  transition: transform .2s;
  margin-left: 8px;
}

.box.open:after {
  transform: rotate(180deg);
}

.selector-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: 1000;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0,0,0,.12);
  overflow: hidden;
  min-width: 100%;
  width: 100%;
}

.selector-item {
  padding: 12px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.selector-item:hover {
  background: #f2f4f8;
}
</style>