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
            :placeholder="$t('video.search.placeholder')"
            @input="applyFilters"
          />
          <button class="search-button" @click="clearSearch">{{ $t('video.search.clear') }}</button>
        </div>
        <div class="year-filter">
          <div class="custom-select" :class="{ active: isOpen }" @click="toggleDropdown">
            <span class="selected-option-wrapper">
              <span class="selected-option">{{ selectedYear || $t('video.filter.all') }}</span>
            </span>
            <span class="arrow"></span>
            <div v-if="isOpen" class="options">
              <div class="option" @click.stop="selectYear('')">{{ $t('video.filter.all') }}</div>
              <div v-for="year in years" :key="year" class="option" @click.stop="selectYear(year)">
                {{ year }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video List -->
    <div v-if="isLoading" class="loading">{{ $t('video.loading') }}</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="paginatedVideos.length === 0" class="no-data">{{ $t('video.noData') }}</div>
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
  margin: 0 auto;
  background: #fff;
  color: #000;
  font-family: 'Inter', sans-serif;
}

/* Поиск + фильтр обертка */
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

/* Поиск */
.search-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-left: auto; /* толкает к фильтру */
}

.search-input {
  width: 735px; /* уменьшенная ширина */
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

/* Фильтр по году */
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

/* Прочее */
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

@media (max-width: 640px) {
  .video-container {
    padding: 0 2vw;
  }

  .search-center {
    flex-direction: column;
    gap: 1.25rem;
  }

  .search-wrapper {
    flex-direction: column;
    width: 100%;
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

  .video-list {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .video-container {
    padding: 0 3vw;
  }

  .video-list {
    grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  }

  .search-wrapper {
    justify-content: center;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .video-list {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
}
</style>
