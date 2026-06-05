<!-- ProfileView.vue -->
<script setup lang="ts">
import { ref } from 'vue'


import ProgramSelector from "@/components/ProgramSelector.vue";
import MainInfoTab from "@/views/Profile/MainInfoTab.vue";
import ContactsTab from "@/views/Profile/ContactsTab.vue";
import DocumentsTab from "@/views/Profile/DocumentsTab.vue";
import CertificateTab from "@/views/Profile/CertificateTab.vue";

type TabType = 'main' | 'contacts' | 'docs' | 'certificates'

const activeTab = ref<TabType>('main')
</script>

<template>
  <ProgramSelector />

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

    <button
        class="tab"
        :class="{ active: activeTab === 'certificates' }"
        @click="activeTab = 'certificates'"
    >
      Заказ справок
    </button>
  </div>

  <div class="page">
    <MainInfoTab v-if="activeTab === 'main'" />
    <ContactsTab v-else-if="activeTab === 'contacts'" />
    <DocumentsTab v-else-if="activeTab === 'docs'" />
    <CertificateTab v-else-if="activeTab === 'certificates'" />
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