<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref<'journal' | 'grades' | 'plan' | 'courses' | 'practise' | 'demoexam' | 'diploma' | 'archive' >('journal')
</script>

<template>
  <div class="page">
    <div class="tabs">
      <button
          class="tab"
          :class="{ active: activeTab === 'journal' }"
          @click="activeTab = 'journal'"
      >
        Электронный журнал
      </button>

      <button
          class="tab"
          :class="{ active: activeTab === 'grades' }"
          @click="activeTab = 'grades'"
      >
        Успеваемость
      </button>

      <button
          class="tab"
          :class="{ active: activeTab === 'plan' }"
          @click="activeTab = 'plan'"
      >
        Индивидуальный план
      </button>

      <button
          class="tab"
          :class="{ active: activeTab === 'courses' }"
          @click="activeTab = 'courses'"
      >
        Курсовые
      </button>

      <button
          class="tab"
          :class="{ active: activeTab === 'practise' }"
          @click="activeTab = 'practise'"
      >
        Практики
      </button>

      <button
          class="tab"
          :class="{ active: activeTab === 'demoexam' }"
          @click="activeTab = 'demoexam'"
      >
        Демо-экзамен
      </button>

      <button
          class="tab"
          :class="{ active: activeTab === 'diploma' }"
          @click="activeTab = 'diploma'"
      >
        Диплом
      </button>

      <button
          class="tab"
          :class="{ active: activeTab === 'archive' }"
          @click="activeTab = 'archive'"
      >
        Архив
      </button>

    </div>

  </div>
</template>
