<template>
  <div class="video-container">
    <!-- Search and Filter Bar -->
    <div class="search-filter-wrapper">
      <div class="search-center">
        <div class="breadcrumbs-wrapper"></div>
        <div class="search-wrapper">
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            :placeholder="$t('Поиск')"
            @input="applyFilters"
          />
          <button class="search-button" @click="clearSearch">{{ $t('Очистить') }}</button>
        </div>
        <div class="year-filter">
          <div class="custom-select" :class="{ active: isOpen }" @click="toggleDropdown">
            <span class="selected-option-wrapper">
              <span class="selected-option">{{ selectedYear || $t('Все') }}</span>
            </span>
            <span class="arrow"></span>
            <div v-if="isOpen" class="options">
              <div class="option" @click.stop="selectYear('')">{{ $t('Все') }}</div>
              <div v-for="year in years" :key="year" class="option" @click.stop="selectYear(year)">
                {{ year }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video List -->
    <div v-if="isLoading" class="loading">{{ $t('Загрузка...') }}</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="paginatedVideos.length === 0" class="no-data">{{ $t('Нет данных') }}</div>
    <div v-else class="video-list">
      <VideoCard
        v-for="(video, index) in paginatedVideos"
        :key="index"
        :title="video.title"
        :url="video.url"
      />
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @update:currentPage="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import VideoCard from '../components/VideoCard.vue';
import Pagination from '../components/Pagination.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const videos = ref([]);
const searchQuery = ref('');
const selectedYear = ref('');
const isOpen = ref(false);
const currentPage = ref(1);
const videosPerPage = 20;
const isLoading = ref(false);
const error = ref(null);

// URL API
const API_URL = '/v1/video';

const fetchVideo = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const { data } = await axios.get(API_URL);
    if (data.success && Array.isArray(data.data)) {
      videos.value = data.data.map(item => ({
        title: item.description.replace(/\s+/g, ' ').trim(), 
        url: item.link,
        year: new Date(item.createdAt).getFullYear()
      }));
    } else {
      error.value = t('Неверный формат данных');
    }
  } catch (err) {
    error.value = t('Ошибка загрузки данных');
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchVideo();
  const savedYear = localStorage.getItem('selectedYear');
  if (savedYear) {
    selectedYear.value = savedYear;
  }
});

const years = computed(() => {
  return [...new Set(videos.value.map(v => v.year))].sort((a, b) => b - a);
});

const filteredVideos = computed(() => {
  let result = [...videos.value];
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase();
    result = result.filter(video => video.title.toLowerCase().includes(query));
  }
  if (selectedYear.value) {
    result = result.filter(video => video.year === Number(selectedYear.value));
  }
  return result;
});

const totalPages = computed(() =>
  Math.ceil(filteredVideos.value.length / videosPerPage)
);

const paginatedVideos = computed(() => {
  const start = (currentPage.value - 1) * videosPerPage;
  return filteredVideos.value.slice(start, start + videosPerPage);
});

const applyFilters = () => {
  currentPage.value = 1;
};

const clearSearch = () => {
  searchQuery.value = '';
  selectedYear.value = '';
  localStorage.removeItem('selectedYear');
  currentPage.value = 1;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectYear = (year) => {
  selectedYear.value = year;
  localStorage.setItem('selectedYear', year);
  isOpen.value = false;
  currentPage.value = 1;
};

const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.video-container {
  padding: 20px 100px;
  color: #000;
  line-height: 1.6;
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
}

.breadcrumbs-wrapper {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.search-wrapper {
  flex-grow: 2;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.search-input {
  width: 50%;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  background-color: #fff;
}

.search-button {
  padding: 8px 15px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #000;
  border-radius: 5px;
  background: none;
  cursor: pointer;
}

.search-button:hover {
  background: #000;
  color: #fff;
}

.year-filter {
  min-width: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.custom-select {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #fff;
  cursor: pointer;
}

.selected-option-wrapper {
  display: inline-block;
  border-bottom: 1px solid #000;
  margin-right: 10px;
}

.selected-option {
  font-size: 16px;
  font-weight: 500;
  color: #000;
}

.arrow {
  width: 6px;
  height: 6px;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
  position: relative;
  top: -1px;
}

.custom-select.active .arrow {
  transform: rotate(-135deg);
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  margin-top: 2px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
}

.option {
  padding: 8px 15px;
  font-size: 16px;
  font-weight: 400;
  color: #000;
  cursor: pointer;
  border-bottom: 1px solid #E0E0E0;
}

.option:last-child {
  border-bottom: none;
}

.option:hover {
  background-color: #f5f5f5;
}

.video-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
  text-align: center;
  justify-items: center;
}

.loading, .error, .no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #d32f2f;
}

</style>
