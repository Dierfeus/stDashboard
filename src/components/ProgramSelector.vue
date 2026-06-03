<script setup>
import {ref, computed, onUnmounted, onMounted} from 'vue'

const emit = defineEmits(['change'])

const programs = [
  '2023 СПО очная 1235C9-2 Информационные системы и программирование (разработчик веб и мультимедийных приложений)',
  '2025 ДПО очная 1С - 1/25 1С:Документооборот'
]

const selected = ref(programs[0])
const isOpen = ref(false)

// обрезка текста
function shorten(text) {
  return text.slice(0, 1000) + '…'
}

function selectProgram(p) {
  selected.value = p
  isOpen.value = false
  emit('change', p)
}

const displayText = computed(() => shorten(selected.value))

function closeDropdown() {
  isOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', closeDropdown, true)
})

onUnmounted(() => {
  window.removeEventListener('scroll', closeDropdown, true)
})

</script>

<template>
  <div class="program-selector">

    <div class="box" :class="{ open: isOpen }" @click="isOpen = !isOpen">
      <div class="text">
        {{ displayText }}
      </div>

    </div>

    <div v-if="isOpen" class="dropdown">
      <div
          v-for="p in programs"
          :key="p"
          class="item"
          @click="selectProgram(p)"
      >
        {{ p }}
      </div>
    </div>

  </div>
</template>

<style>
.program-selector {
  top: 0;
  z-index: 1000;
  margin: 10px;
  color: #618FFC;
  border-radius: 12px;
  border: 1px solid #2563eb;
}

.box {
  background: #f5f6f8;
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.text {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
}

.box:after {
  content: "▼";
  font-size: 14px;
  color: #618ffc;
  transition: transform .2s;
}

.box.open:after {
  transform: rotate(180deg);
}

.dropdown {
  position: fixed;
  z-index: 1000;
  margin-top: 8px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0,0,0,.12);
  overflow: hidden;
}

.item {
  padding: 12px;
  cursor: pointer;
  font-size: 13px;
}

.item:hover {
  background: #f2f4f8;
}

</style>