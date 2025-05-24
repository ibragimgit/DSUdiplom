<template>
  <div class="news-container">
    <!-- Панель поиска и фильтра -->
    <div class="search-filter-wrapper">
      <div class="search-center">
        <div class="breadcrumbs-wrapper"></div>
        <div class="search-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Поиск"
            @input="applyFilters"
          />
          <button class="search-clear-button" @click="clearSearch">Очистить</button>
        </div>
        <div class="year-filter">
          <div class="custom-select" :class="{ active: isOpen }" @click="toggleDropdown">
            <span class="selected-option-wrapper">
              <span class="selected-option">{{ selectedYear || 'Все' }}</span>
            </span>
            <span class="arrow"></span>
            <div v-if="isOpen" class="options">
              <div class="option" @click.stop="selectYear('')">Все</div>
              <div
                v-for="year in years"
                :key="year"
                class="option"
                @click.stop="selectYear(year)"
              >
                {{ year }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Список новостей -->
    <div v-if="isLoading" class="loading">Загрузка...</div>
    <div v-else-if="paginatedNews.length === 0" class="no-news">Новости не найдены</div>
    <div v-else class="news-list">
      <div v-for="item in paginatedNews" :key="item.id" class="news-card">
        <img :src="item.image" alt="image" class="news-image" />
        <div class="news-content">
          <p class="news-date">{{ item.date }}</p>
          <p class="news-title">{{ item.title }}</p>
          <p class="news-description">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Пагинация -->
    <Pagination
      v-if="filteredNews.length > newsPerPage && !isLoading"
      class="pagination-wrapper"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Pagination from '@/components/Pagination.vue'
import { newsItems } from '@/data/newsData'

const searchQuery = ref('')
const selectedYear = ref('')
const isOpen = ref(false)
const currentPage = ref(1)
const newsPerPage = 8
const isLoading = ref(true)

onMounted(() => {
  try {
    // Проверка уникальности ID
    const ids = newsItems.map(item => item.id)
    const uniqueIds = new Set(ids)
    if (ids.length !== uniqueIds.size) {
      console.warn('[News] Duplicate IDs found:', ids.filter((id, index) => ids.indexOf(id) !== index))
    }
    console.log('[News] Data loaded, items:', newsItems.length)
  } catch (error) {
    console.error('[News] Error in onMounted:', error)
  } finally {
    isLoading.value = false
  }
})

const filteredNews = computed(() => {
  if (isLoading.value) return []
  let filtered = [...newsItems]
  const query = searchQuery.value.trim().toLowerCase()
  if (query) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    )
  }
  if (selectedYear.value) {
    filtered = filtered.filter(item => item.date.endsWith(selectedYear.value))
  }
  console.log(`[FilteredNews] ${filtered.length} items`)
  return filtered
})

const years = computed(() => {
  const allYears = newsItems.map(item => item.date.split('.').pop())
  return [...new Set(allYears)].sort((a, b) => b - a)
})

const totalPages = computed(() => {
  const pages = Math.ceil(filteredNews.value.length / newsPerPage)
  console.log(`[TotalPages] ${pages}`)
  return pages
})

const paginatedNews = computed(() => {
  if (isLoading.value) return []
  const start = (currentPage.value - 1) * newsPerPage
  const result = filteredNews.value.slice(start, start + newsPerPage)
  console.log(`[PaginatedNews] Page ${currentPage.value}: ${result.length} items`, result.map(item => item.id))
  return result
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectYear = (year) => {
  selectedYear.value = year
  isOpen.value = false
  currentPage.value = 1
  console.log(`[YearSelect] Year: ${year || 'All'}, page reset to 1`)
}

const clearSearch = () => {
  searchQuery.value = ''
  selectedYear.value = ''
  currentPage.value = 1
  console.log('[ClearSearch] Search cleared, page reset to 1')
}

const applyFilters = () => {
  currentPage.value = 1
  console.log('[ApplyFilters] Filters applied, page reset to 1')
}

const handlePageChange = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page
    console.log(`[PageChange] Changed to page ${page}, total pages: ${totalPages.value}`)
  } else {
    currentPage.value = 1
    console.log(`[PageChange] Invalid page ${page}, reset to 1`)
  }
}

watch(filteredNews, (newValue) => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1
    console.log('[WatchFilteredNews] Page reset to 1 due to filter change')
  }
  console.log(`[WatchFilteredNews] Filtered news updated: ${newValue.length} items`)
})
</script>

<style scoped>
.news-container {
  padding: 20px 100px;
  margin: 0 auto;
  background: #fff;
  color: #000;
  font-family: 'Inter', sans-serif;
}

.search-filter-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
}

.search-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
}

.breadcrumbs-wrapper {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.search-wrapper {
  flex-grow: 2;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
}

.search-input {
  width: 50%;
  padding: 10px 16px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background-color: #ffffff;
  color: #1f2937;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #2a3b5c;
}

.search-clear-button {
  padding: 10px 20px;
  background-color: #2a3b5c;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-clear-button:hover {
  background-color: #1f2c40;
}

/* Year filter dropdown */
.year-filter {
  min-width: 160px;
  display: flex;
  justify-content: flex-end;
}

.custom-select {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #ffffff;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  color: #1f2937;
}

.selected-option-wrapper {
  margin-right: 8px;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #2a3b5c;
}

.arrow {
  width: 6px;
  height: 6px;
  border-right: 1px solid #2a3b5c;
  border-bottom: 1px solid #2a3b5c;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.custom-select.active .arrow {
  transform: rotate(-135deg);
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  margin-top: 4px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.option {
  padding: 10px 15px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  color: #1f2937;
  cursor: pointer;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;
}

.option:hover {
  background-color: #f1f5f9;
}

/* Новости */
.news-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.news-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border-radius: 6px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.news-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.news-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  object-position: center;
  border-radius: 6px;
  margin-bottom: 16px;
  transition: transform 0.4s ease;
}

.news-image:hover {
  transform: scale(1.05);
}

.news-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.news-date {
  font-size: 12px;
  color: #6b7280;
}

.news-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}

.news-description {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Пагинация */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 0;
}

.loading,
.no-news {
  text-align: center;
  font-size: 16px;
  color: #4b5563;
  padding: 20px;
}

@media (max-width: 768px) {
  .news-container {
    padding: 40px 20px;
  }

  .search-input {
    width: 100%;
  }

  .news-title {
    font-size: 16px;
  }

  .news-description {
    font-size: 13px;
  }

  .news-image {
    height: 150px;
  }
}
</style>