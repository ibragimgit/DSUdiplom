<template>
  <div class="carousel">
    <div class="carousel-container">
      <div class="header-block">
        <h2>Наша команда</h2>
        <hr class="divider" />
      </div>
      <div v-if="isLoading" class="loading">Загрузка...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="employees.length === 0" class="no-data">Нет данных</div>
      <div v-else class="carousel-inner">
        <button 
          @click="prev" 
          :disabled="currentStartIndex === 0"
          class="carousel-button prev-button"
          aria-label="Предыдущий сотрудник"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="carousel-items">
          <div 
            class="carousel-item" 
            v-for="(employee, index) in visibleEmployees" 
            :key="index"
          >
            <img :src="employee.image || 'https://via.placeholder.com/200x300'" :alt="employee.name">
            <h3>{{ employee.name }}</h3>
            <p>{{ employee.position }}</p>
          </div>
        </div>
        <button 
          @click="next" 
          :disabled="currentStartIndex + itemsPerPage >= employees.length"
          class="carousel-button next-button"
          aria-label="Следующий сотрудник"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Состояние компонента
const employees = ref([]);
const isLoading = ref(false);
const error = ref(null);
const currentStartIndex = ref(0);
const itemsPerPage = 4;

// URL API
const API_URL = 'http://192.168.1.100:5000/api/Employees';

// Стандартизированный шаблон ответа
const handleApiResponse = (response) => {
  if (!response.data || !Array.isArray(response.data)) {
    return { success: false, error: 'Данные некорректны или отсутствуют' };
  }
  return { success: true, data: response.data };
};

// Загрузка данных с API
const fetchEmployees = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await axios.get(API_URL);
    const result = handleApiResponse(response);
    if (result.success) {
      employees.value = result.data.filter(employee =>
        typeof employee.name === 'string' &&
        typeof employee.position === 'string' &&
        typeof employee.image === 'string'
      );
      if (employees.value.length === 0) {
        error.value = 'Нет данных, соответствующих ожидаемому формату';
      }
    } else {
      error.value = result.error;
    }
  } catch (err) {
    error.value = 'Не удалось загрузить данные. Проверьте подключение к серверу.';
    console.error('Ошибка при загрузке данных:', err);
  } finally {
    isLoading.value = false;
  }
};

// Загрузка данных при монтировании
onMounted(() => {
  fetchEmployees();
});

// Вычисляемые данные для отображения
const visibleEmployees = computed(() => {
  return employees.value.slice(currentStartIndex.value, currentStartIndex.value + itemsPerPage);
});

// Навигация по карусели
const prev = () => {
  if (currentStartIndex.value > 0) {
    currentStartIndex.value -= 1;
  }
};

const next = () => {
  if (currentStartIndex.value + 1 < employees.value.length) {
    currentStartIndex.value += 1;
  }
};
</script>

<style scoped>
.carousel {
  padding: 0px 20px;
  margin-top: 100px;
  font-family: 'Arial', sans-serif;
}

.carousel-container {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 32px;
  max-width: 1200px;
  margin: auto;
}

.header-block {
  margin-bottom: 24px;
}

.carousel h2 {
  font-size: 32px;
  font-weight: 400;
  color: #000;
  font-family: 'Montserrat', sans-serif;
  margin: 0 0 20px 0;
  line-height: 1.2;
  text-transform: uppercase;
}

.divider {
  border: 0;
  border-top: 1px solid #000;
  margin: 0;
}

.carousel-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 20px;
}

.carousel-items {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  transition: opacity 0.2s ease-in-out;
}

.carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;
}

.carousel-item img {
  width: 200px;
  height: 300px;
  object-fit: cover;
  object-position: center;
  border-radius: 6px;
}

.carousel-item h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

.carousel-item p {
  margin: -5px 0 0;
  color: #666;
  font-size: 12px;
  text-align: center;
  line-height: 1.4;
  min-height: 50px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.carousel-button {
  border: 1px solid #000;
  padding: 10px;
  background: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-button svg {
  width: 20px;
  height: 20px;
}

.carousel-button:hover:not(:disabled) {
  background: #000;
}

.carousel-button:hover:not(:disabled) svg path {
  stroke: #fff;
}

.carousel-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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