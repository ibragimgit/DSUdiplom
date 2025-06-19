<template>
  <div class="news-container">
    <div class="search-filter-wrapper">
      <div class="search-center">
        <div class="search-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            :placeholder="$t('news.search')"
            @input="applyFilters"
          />
          <button class="search-button" @click="clearSearch">{{ $t('news.clear') }}</button>
        </div>
        <div class="year-filter">
          <div class="custom-select" :class="{ active: isOpen }" @click="toggleDropdown">
            <span class="selected-option-wrapper">
              <span class="selected-option">{{ selectedYear || $t('news.all') }}</span>
            </span>
            <span class="arrow"></span>
            <div v-if="isOpen" class="options">
              <div class="option" @click.stop="selectYear('')">{{ $t('news.all') }}</div>
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

    <div v-if="isLoading" class="loading">{{ $t('news.loading') }}</div>
    <div v-else-if="!filteredNews || filteredNews.length === 0" class="no-news">
      {{ $t('news.notFound') }}
    </div>
    <div v-else class="news-list">
      <div v-for="(item, i) in paginatedNews" :key="i" class="news-card">
        <template v-if="item.image">
          <img 
            :src="item.image" 
            :alt="`${$t('news.newsPreview')} ${item.title}`" 
            class="news-preview"
          />
        </template>
        <template v-else>
          <div class="news-preview-placeholder">
            <span class="preview-number">{{ i + 1 + (currentPage.value - 1) * newsPerPage }}</span>
          </div>
        </template>
        <div class="news-content">
          <p class="news-date">{{ item.date }}</p>
          <p class="news-title">{{ item.title }}</p>
          <p class="news-description">{{ item.description }}</p>
          <a 
            v-if="item.textFile" 
            :href="item.textFile" 
            target="_blank" 
            rel="noopener noreferrer"
            class="presentation-download-link"
          >
            {{ $t('news.readMore') }}
          </a>
        </div>
      </div>
    </div>

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
import { ref, computed, onMounted, watch } from 'vue'
import Pagination from '@/components/Pagination.vue'
import { newsItems } from '@/data/newsData'

const searchQuery = ref('')
const selectedYear = ref('')
const isOpen = ref(false)
const currentPage = ref(1)
const newsPerPage = 8
const isLoading = ref(true)

onMounted(() => {
  isLoading.value = false
})

const years = computed(() => {
  if (!Array.isArray(newsItems) || newsItems.length === 0) {
    return []
  }
  const allYears = newsItems.map(item => item.date.split('.').pop())
  return [...new Set(allYears)].sort((a, b) => parseInt(b, 10) - parseInt(a, 10))
})

const filteredNews = computed(() => {
  if (!Array.isArray(newsItems)) {
    console.error("Данные 'newsItems' не являются массивом.")
    return []
  }
  let list = [...newsItems]
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(item =>
      (item.title && item.title.toLowerCase().includes(q)) || 
      (item.description && item.description.toLowerCase().includes(q))
    )
  }
  if (selectedYear.value) {
    list = list.filter(item => item.date && item.date.endsWith(selectedYear.value))
  }
  return list
})

const totalPages = computed(() => {
  if (!filteredNews.value || filteredNews.value.length === 0) {
    return 0
  }
  return Math.ceil(filteredNews.value.length / newsPerPage)
})

const paginatedNews = computed(() => {
  if (!filteredNews.value || filteredNews.value.length === 0) {
    return []
  }
  const start = (currentPage.value - 1) * newsPerPage
  return filteredNews.value.slice(start, start + newsPerPage)
})

const toggleDropdown = () => { isOpen.value = !isOpen.value }
const selectYear = (year) => { 
  selectedYear.value = year
  isOpen.value = false
  currentPage.value = 1
}
const clearSearch = () => { 
  searchQuery.value = ''
  currentPage.value = 1
}
const applyFilters = () => { 
  currentPage.value = 1
}
const handlePageChange = (page) => { 
  currentPage.value = page
}

watch(filteredNews, () => {
  if (totalPages.value > 0 && currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value
  } else if (totalPages.value === 0) {
    currentPage.value = 1
  }
}, { immediate: true })

watch(selectedYear, () => {
  applyFilters()
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
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
}

.search-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  width: 700px;
  max-width: 90%;
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

.search-button {
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

.search-button:hover {
  background-color: #1f2c40;
}

.year-filter {
  min-width: 160px;
  display: flex;
  justify-content: flex-end;
  margin-left: 100px;
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

.news-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.news-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.news-preview {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 12px;
}

.news-preview-placeholder {
  width: 100%;
  height: 160px;
  background-color: #2a3b5c;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-number {
  color: #ffffff;
  font-size: 48px;
  font-weight: 600;
}

.news-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.news-date {
  font-size: 12px;
  color: #6b7280;
}

.news-title {
  font-size: 17px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
}

.news-description {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
  margin-bottom: 12px;
}

.presentation-download-link {
  display: inline-block;
  padding: 10px 15px;
  background-color: #2a3b5c;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s ease-in-out;
  margin-top: auto;
  text-align: center;
}

.presentation-download-link:hover {
  background-color: #1f2c40;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 0;
}

.loading, .no-news {
  text-align: center;
  padding: 20px;
  color: #666;
}

.no-news {
  font-size: 16px;
  padding: 40px 20px;
}

@media (max-width: 640px) {
  .news-container {
    padding: 0 2vw;
  }
  .search-center {
    flex-direction: column;
    gap: 1.25rem;
    justify-content: center;
  }
  .search-wrapper {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
  .search-input {
    width: 100%;
  }
  .search-button {
    width: 100%;
    max-width: 18.75rem;
  }
  .year-filter {
    width: 100%;
    justify-content: center;
    margin-left: 0px;
  }
  .news-list {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .news-container {
    padding: 0 3vw;
  }
  .search-input {
    width: 400px;
  }
  .news-list {
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .search-input {
    width: 600px;
  }
  .news-list {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
}
</style>