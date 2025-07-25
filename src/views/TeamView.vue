<template>
  <div class="carousel">
    <div class="carousel-container">
      <div class="header-block">
        <h2>{{ $t('team.title') }}</h2>
        <hr class="divider" />
      </div>
      <div v-if="isLoading" class="loading">{{ $t('loading') }}</div>
      <div v-else-if="error" class="error">{{ $t(error) }}</div>
      <div v-else-if="employees.length === 0" class="no-data">{{ $t('noData') }}</div>
      <div v-else class="carousel-inner">
        <button
          @click="prev"
          :disabled="currentStartIndex === 0"
          class="carousel-button prev-button"
          :aria-label="$t('aria.previousEmployee')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="carousel-items">
          <div
            class="carousel-item"
            v-for="(employee, index) in visibleEmployees"
            :key="index"
          >
            <img :src="employee.image || 'https://via.placeholder.com/200x300'" :alt="employee.name" />
            <h3>{{ employee.name }}</h3>
            <p>{{ employee.position }}</p>
          </div>
        </div>
        <button
          @click="next"
          :disabled="currentStartIndex + itemsPerPage >= employees.length"
          class="carousel-button next-button"
          :aria-label="$t('aria.nextEmployee')"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

// Access i18n instance
const { t } = useI18n();

// Component state
const employees = ref([
  {
    name: 'Сайпулаев Арслан Алиевич',
    position: 'Директор ЦСОТ',
    image: 'https://ngazcom.ru/files/gallery/49/img_preview/protopopov-a-a_1709214544.jpg'
  },
  {
    name: 'Магомедов Али Исламович',
    position: 'Зам Директора',
    image: 'https://ngazcom.ru/files/gallery/50/img_preview/vasyuhno-d-v_1709214745.jpg'
  },
  {
    name: 'Алиев Арсен Ахмедович',
    position: 'Дата Аналитик',
    image: 'https://ngazcom.ru/files/gallery/62/img_preview/maliev-n-s_1709214910.jpg'
  },
  {
    name: 'Магомедова Алина Юсуповна',
    position: 'Дизайнер',
    image: 'https://ngazcom.ru/files/gallery/51/img_preview/storozhenko-yu-v_1709277199.jpg'
  },
  {
    name: 'Идрисов Камиль Шамильевич',
    position: '1С Программист',
    image: 'https://ngazcom.ru/files/gallery/63/img_preview/forzan-s-m_1709214956.jpg'
  },
  {
    name: 'Алхасов Султан Магомедович',
    position: 'Старший программист',
    image: 'https://ngazcom.ru/files/gallery/85/img_preview/kovaldzhi-n-v_1709277507.jpg'
  }
]);
const isLoading = ref(false);
const error = ref(null);
const currentStartIndex = ref(0);
const itemsPerPage = ref(4);

// Update itemsPerPage based on window width
const updateItemsPerPage = () => {
  const width = window.innerWidth;
  if (width < 640) {
    itemsPerPage.value = 1; // Mobile
  } else if (width < 1024) {
    itemsPerPage.value = 2; // Tablet
  } else if (width < 1280) {
    itemsPerPage.value = 3; // Small desktop
  } else {
    itemsPerPage.value = 5; // Large desktop - было 4, стало 5
  }

  if (currentStartIndex.value + itemsPerPage.value > employees.value.length) {
    currentStartIndex.value = Math.max(0, employees.value.length - itemsPerPage.value);
  }
};

// Initialize and handle resize
onMounted(() => {
  updateItemsPerPage();
  window.addEventListener('resize', updateItemsPerPage);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerPage);
});

// Computed property for visible employees
const visibleEmployees = computed(() => {
  return employees.value.slice(currentStartIndex.value, currentStartIndex.value + itemsPerPage.value);
});

// Carousel navigation
const prev = () => {
  if (currentStartIndex.value > 0) {
    currentStartIndex.value -= 1;
  }
};

const next = () => {
  if (currentStartIndex.value + itemsPerPage.value < employees.value.length) {
    currentStartIndex.value += 1;
  }
};
</script>

<style scoped>
.carousel {
  padding: 0 4vw;
  margin-top: 5rem;
  font-family: 'Inter', sans-serif;
}

.carousel-container {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1.5rem rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 90rem;
  margin: 0 auto;
}

.header-block {
  margin-bottom: 1.5rem;
}

.carousel h2 {
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  color: #2a3b5c;
  text-transform: uppercase;
  margin: 0 0 1.25rem 0;
  line-height: 1.2;
}

.divider {
  border: 0;
  border-top: 1px solid #333;
  margin: 0;
}

.carousel-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 1rem;
}

.carousel-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); /* Было 180px */
  gap: 0.25rem; /* Было 0.5rem */
  width: 100%;
  transition: opacity 0.2s ease-in-out;
}

.carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 220px;
  margin: 0 auto;
}

.carousel-item img {
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  object-position: center;
  border-radius: 0.375rem;
  max-width: 180px;
}

.carousel-item h3 {
  margin: 0.5rem 0 0;
  font-size: clamp(0.875rem, 3vw, 1rem);
  font-weight: 600;
  color: #2a3b5c;
  text-transform: uppercase;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
}

.carousel-item p {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  text-align: center;
  line-height: 1.4;
  min-height: 3rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

.carousel-button {
  border: 1px solid #2a3b5c;
  padding: 0;
  width: 32px;
  height: 32px;
  background-color: #2a3b5c;
  backdrop-filter: blur(8px);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  color: #fff;
  transition: background 0.3s, color 0.3s, transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.carousel-button:hover:not(:disabled) {
  background: #1f2937;
}

.carousel-button.prev-button {
  left: 0;
}

.carousel-button.next-button {
  right: 0;
}

.carousel-button svg {
  width: 16px;
  height: 16px;
}

.carousel-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading, .error, .no-data {
  text-align: center;
  padding: 1.25rem;
  color: #666;
  font-size: clamp(0.875rem, 3vw, 1rem);
}

.error {
  color: #d32f2f;
}

/* Media Queries for Responsiveness */
@media (max-width: 640px) {
  .carousel {
    padding: 0 2vw;
    margin-top: 3rem;
  }

  .carousel-container {
    padding: 1rem;
  }

  .carousel-button {
    width: 28px;
    height: 28px;
  }

  .carousel-button svg {
    width: 14px;
    height: 14px;
  }

  .carousel-button.prev-button {
    left: 0.25rem;
  }

  .carousel-button.next-button {
    right: 0.25rem;
  }

  .carousel-items {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .carousel-item {
    max-width: 100%;
  }

  .carousel-item img {
    max-width: 60vw;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .carousel-items {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .carousel-item img {
    max-width: 160px;
  }

  .carousel-button.prev-button {
    left: 0.5rem;
  }

  .carousel-button.next-button {
    right: 0.5rem;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .carousel-items {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .carousel-item img {
    max-width: 170px;
  }

  .carousel-button.prev-button {
    left: 0.5rem;
  }

  .carousel-button.next-button {
    right: 0.5rem;
  }
}
</style>