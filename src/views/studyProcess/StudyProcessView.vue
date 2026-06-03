<script setup lang="ts">
import { ref } from 'vue'
import ProgramSelector from "@/components/ProgramSelector.vue";
import SemesterSelector from "@/components/SemesterSelector.vue";

// Импорт всех вкладок
import JournalTab from './JournalTab.vue'
import GradesTab from './GradesTab.vue'
import PlanTab from './PlanTab.vue'
import CoursesTab from './CoursesTab.vue'
import PractiseTab from './PractiseTab.vue'
import DemoexamTab from './DemoexamTab.vue'
import DiplomaTab from './DiplomaTab.vue'
import ArchiveTab from './ArchiveTab.vue'

const activeTab = ref<'journal' | 'grades' | 'plan' | 'courses' | 'practise' | 'demoexam' | 'diploma' | 'archive'>('journal')
const currentSelection = ref({ course: 3, semester: 1 })

</script>

<template>
  <ProgramSelector />

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

  <div class="page">
    <JournalTab v-if="activeTab === 'journal'" :selection="currentSelection" />
    <GradesTab v-if="activeTab === 'grades'" />
    <PlanTab v-if="activeTab === 'plan'" />
    <CoursesTab v-if="activeTab === 'courses'" />
    <PractiseTab v-if="activeTab === 'practise'" />
    <DemoexamTab v-if="activeTab === 'demoexam'" />
    <DiplomaTab v-if="activeTab === 'diploma'" />
    <ArchiveTab v-if="activeTab === 'archive'" />
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  position: sticky;
  top: 0;
  background: #f4f6f8;
  padding: 10px 10px 0 10px;
  overflow-x: auto;
  gap: 4px;
}

.tabs::-webkit-scrollbar {
  display: none;
}

.tab {
  padding: 8px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #618FFC;
  font-weight: 900;
  border-bottom: 1px solid #BBCFFE;
  white-space: nowrap;
}

.tab.active {
  border-bottom: 1px solid #2563eb;
}

.page {
  padding: 20px;
  padding-bottom: 90px;
}
</style>