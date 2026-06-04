<template>
  <div class="news-page">
    <div class="page-header">
      <h1 class="page-title">Новости и события</h1>
      <div class="header-decoration"></div>
    </div>

    <div v-if="isLoading" class="news-grid">
      <div v-for="i in 6" :key="i" class="news-card skeleton">
        <div class="card-image skeleton-shine"></div>
        <div class="card-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text short"></div>
        </div>
      </div>
    </div>

    <div v-else-if="newsList.length > 0" class="news-grid">
      <div
        v-for="(news, index) in newsList"
        :key="index"
        class="news-card"
        @click="openNews(news.URL)"
      >
        <div class="card-image">
          <img
            :src="getImageUrl(news.URLPhoto)"
            :alt="news.Name"
            @error="handleImageError"
          />
          <span class="category-badge" :class="getCategoryClass(news.Category)">
            {{ news.Category }}
          </span>
        </div>
        <div class="card-content">
          <h3 class="news-title">{{ news.Name }}</h3>
          <div class="news-meta">
            <span class="news-date">{{ news.Date }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">📭</div>
      <p>Новостей пока нет</p>
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <button 
        class="page-arrow" 
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      
      <div class="page-numbers">
        <button
          v-for="page in displayedPages"
          :key="page"
          class="page-num"
          :class="{ active: currentPage === page }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        class="page-arrow" 
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const newsList = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const totalPages = ref(20) 

const displayedPages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

async function loadNews() {
  isLoading.value = true
  try {
    const pageNum = currentPage.value + 1
    const response = await fetch(`https://api.rb.asu.ru/news/${pageNum}`)
    const data = await response.json()
    
    if (data && data.Data && data.Data.length > 0) {
      newsList.value = data.Data
    } else {
      newsList.value = []
    }
  } catch (error) {
    console.error('Ошибка загрузки новостей:', error)
    newsList.value = []
  } finally {
    isLoading.value = false
  }
}

function changePage(page) {
  if (page === currentPage.value) return
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  loadNews()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function getImageUrl(path) {
  if (!path) return 'https://placehold.co/400x200/e2e8f0/64748b?text=Нет+изображения'
  if (path.startsWith('http')) return path
  return `https://rb.asu.ru${path}`
}

function handleImageError(e) {
  e.target.src = 'https://placehold.co/400x200/e2e8f0/64748b?text=Изображение+не+доступно'
}

function openNews(url) {
  if (url) {
    window.open(`https://www.rb.asu.ru${url}`, '_blank')
  }
}

function getCategoryClass(category) {
  const classes = {
    'Объявления': 'category-announcement',
    'События': 'category-event',
    'Студенчество': 'category-student'
  }
  return classes[category] || 'category-default'
}

onMounted(() => {
  loadNews()
})
</script>

<style scoped>
.news-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 32px;
  text-align: center;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a2c3e;
  margin-bottom: 12px;
}

.header-decoration {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #2563eb, #7c3aed);
  border-radius: 2px;
  margin: 0 auto;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.news-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f0f4f9;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .card-image img {
  transform: scale(1.05);
}

.category-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.category-announcement {
  background: #f59e0b;
}

.category-event {
  background: #3b82f6;
}

.category-student {
  background: #8b5cf6;
}

.category-default {
  background: #6c7a8e;
}

.card-content {
  padding: 20px;
}

.news-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a2c3e;
  margin-bottom: 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #7c8b9c;
}

.news-date {
  display: flex;
  align-items: center;
  gap: 4px;
}

.news-date::before {
  font-size: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
  padding: 20px 0;
}

.page-arrow {
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5b6e;
}

.page-arrow:hover:not(:disabled) {
  background: #f5f7fa;
  border-color: #cbd5e1;
  color: #2563eb;
}

.page-arrow:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-num {
  width: 40px;
  height: 40px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  color: #4a5b6e;
}

.page-num:hover {
  background: #f5f7fa;
  border-color: #cbd5e1;
}

.page-num.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.empty-state {
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 24px;
  color: #9ca3af;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.skeleton {
  background: white;
}

.skeleton-shine {
  background: linear-gradient(90deg, #f0f4f9 25%, #e2e8f0 50%, #f0f4f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-title {
  height: 20px;
  background: #f0f4f9;
  border-radius: 8px;
  margin-bottom: 12px;
  width: 80%;
}

.skeleton-text {
  height: 14px;
  background: #f0f4f9;
  border-radius: 6px;
  margin-bottom: 8px;
  width: 100%;
}

.skeleton-text.short {
  width: 60%;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 768px) {
  .news-page {
    padding: 12px;
  }

  .page-title {
    font-size: 24px;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .card-image {
    height: 180px;
  }

  .news-title {
    font-size: 16px;
  }

  .page-numbers {
    gap: 4px;
  }

  .page-num,
  .page-arrow {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .page-numbers {
    gap: 2px;
  }

  .page-num {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  .page-arrow {
    width: 32px;
    height: 32px;
  }
}
</style>