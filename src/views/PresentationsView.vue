<template>
  <div class="news-container">
    <!-- Search and Filter Bar -->
    <div class="search-filter-wrapper">
      <div class="search-center">
        <div class="breadcrumbs-wrapper"></div>
        <div class="search-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            :placeholder="$t('present.searchPlaceholder')"
            @input="applyFilters"
          />
          <button class="search-clear-button" @click="clearSearch">
            {{ $t('present.clear') }}
          </button>
        </div>
        <div class="year-filter">
          <div class="custom-select" :class="{ active: isOpen }" @click="toggleDropdown">
            <span class="selected-option-wrapper">
              <span class="selected-option">{{ selectedYear || $t('present.all') }}</span>
            </span>
            <span class="arrow"></span>
            <div v-if="isOpen" class="options">
              <div class="option" @click.stop="selectYear('')">{{ $t('present.all') }}</div>
              <div v-for="year in years" :key="year" class="option" @click.stop="selectYear(year)">
                {{ year }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- News List -->
    <div v-if="isLoading" class="loading">{{ $t('present.loading') }}</div>
    <div v-else-if="paginatedPresentations.length === 0" class="no-news">
      {{ $t('present.noPresentationsFound') }}
    </div>
    <div v-else class="news-list">
      <div v-for="(item, i) in paginatedPresentations" :key="item.id" class="news-card">
        <div v-if="item.preview" class="news-preview">
          <img :src="item.preview" :alt="$t('present.presentationPreview')" class="news-preview-img" />
        </div>
        <template v-else>
          <div class="news-preview-placeholder">
            <span class="preview-number">{{
              i + 1 + (currentPage.value - 1) * presentationsPerPage
            }}</span>
          </div>
        </template>
        <div class="news-content">
          <p class="news-date">{{ item.date }}</p>
          <p class="news-title">{{ item.title }}</p>
          <p class="news-description">{{ item.description }}</p>
          <a
            :href="item.file"
            download
            class="presentation-download-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ $t('present.download') }}
          </a>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="filteredPresentations.length > presentationsPerPage && !isLoading"
      class="pagination-wrapper"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Pagination from '@/components/Pagination.vue';
import { presentations } from '@/data/presentations.js';

const searchQuery = ref('');
const selectedYear = ref('');
const isOpen = ref(false);
const currentPage = ref(1);
const presentationsPerPage = 8;
const isLoading = ref(true);

onMounted(() => {
  isLoading.value = false;
});

const years = computed(() => {
  if (!Array.isArray(presentations) || presentations.length === 0) {
    return [];
  }
  const allYears = presentations.map(p => p.date.split('-')[0]);
  return [...new Set(allYears)].sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
});

const filteredPresentations = computed(() => {
  if (!Array.isArray(presentations)) {
    console.error("Данные 'presentations' не являются массивом.");
    return [];
  }
  let list = [...presentations];
  const q = searchQuery.value.trim().toLowerCase();
  if (q) {
    list = list.filter(p =>
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }
  if (selectedYear.value) {
    list = list.filter(p => p.date && p.date.startsWith(selectedYear.value));
  }
  return list;
});

const totalPages = computed(() => {
  if (!filteredPresentations.value || filteredPresentations.value.length === 0) {
    return 0;
  }
  return Math.ceil(filteredPresentations.value.length / presentationsPerPage);
});

const paginatedPresentations = computed(() => {
  if (!filteredPresentations.value || filteredPresentations.value.length === 0) {
    return [];
  }
  const start = (currentPage.value - 1) * presentationsPerPage;
  return filteredPresentations.value.slice(start, start + presentationsPerPage);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
const selectYear = (year) => {
  selectedYear.value = year;
  isOpen.value = false;
  currentPage.value = 1;
};
const clearSearch = () => {
  searchQuery.value = '';
  currentPage.value = 1;
};
const applyFilters = () => {
  currentPage.value = 1;
};
const handlePageChange = (page) => {
  currentPage.value = page;
};

watch(filteredPresentations, () => {
  if (totalPages.value > 0 && currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  } else if (totalPages.value === 0) {
    currentPage.value = 1;
  }
}, { immediate: true });

watch(selectedYear, () => {
  applyFilters();
});
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

/* Основной контейнер */
.news-container {
  padding: 20px 100px;
  margin: 0 auto;
  background: #fff;
  color: #000;
}

/* Поиск и фильтр */
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

.search-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-left: auto; /* Выравнивание вправо */
}

.search-input {
  width: 735px; /* Уменьшенная ширина, как в примере */
  max-width: 100%;
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

/* Фильтр по году */
.year-filter {
  min-width: 160px;
  display: flex;
  justify-content: flex-end;
  margin-left: 100px; /* Как в примере */
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

.selected-option {
  display: inline-block;
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

/* Список новостей */
.news-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
  text-align: center;
  justify-items: center;
}

.news-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  width: 100%;
  max-width: 350px;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.news-preview {
  width: 100%;
  height: 160px;
  border-radius: 6px;
  margin-bottom: 12px;
  overflow: hidden;
}

.news-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  margin-bottom: 8px;
}

.news-title {
  font-size: 17px;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
  margin-bottom: 8px;
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

/* Пагинация */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 0;
}

/* Состояния загрузки и отсутствия данных */
.loading,
.no-news {
  text-align: center;
  font-size: 16px;
  color: #666;
  padding: 40px 20px;
}

/* Адаптивные стили */
@media (max-width: 640px) {
  .news-container {
    padding: 20px 2vw;
  }

  .search-center {
    flex-direction: column;
    gap: 1.25rem;
  }

  .search-wrapper {
    flex-direction: column;
    width: 100%;
    margin-left: 0;
    align-items: center;
  }

  .search-input {
    width: 100%;
  }

  .search-clear-button {
    width: 100%;
    max-width: 18.75rem;
  }

  .year-filter {
    width: 100%;
    justify-content: center;
    margin-left: 0;
  }

  .news-list {
    grid-template-columns: 1fr;
  }

  .news-card {
    max-width: 100%;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .news-container {
    padding: 20px 3vw;
  }

  .search-wrapper {
    justify-content: center;
    width: auto;
  }

  .search-input {
    width: 400px;
  }

  .news-list {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }

  .news-card {
    max-width: 300px;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .search-input {
    width: 600px;
  }

  .news-list {
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  }

  .news-card {
    max-width: 320px;
  }
}
</style>