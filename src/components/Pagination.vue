<template>
  <div class="pagination" v-if="totalPages > 1">

    <button 
      @click="changePage(currentPage - 1)" 
      :disabled="currentPage === 1"
      class="pagination-button arrow"
      aria-label="Предыдущая страница"
    >
      <span class="arrow-left"></span>
    </button>
    
    <button
      v-for="page in totalPages"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="changePage(page)"
      class="pagination-button"
    >
      {{ page }}
    </button>
    
    <button 
      @click="changePage(currentPage + 1)" 
      :disabled="currentPage === totalPages"
      class="pagination-button arrow"
      aria-label="Следующая страница"
    >
      <span class="arrow-right"></span>
    </button>
  </div>
</template>

<script setup>


const props = defineProps({
  currentPage: Number,
  totalPages: Number
})

const emit = defineEmits(['update:currentPage'])

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0; /* Уменьшенное пустое пространство */
  gap: 8px; /* Ближе стрелки к цифрам */
  font-family: 'Arial', sans-serif;
}


.pagination-button {
  padding: 8px 12px;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  border: none;
  transition: color 0.3s ease;
  position: relative;
  line-height: 1; /* Уменьшение влияния текста */
  padding: 0 12px; /* Убедимся, что вертикальный padding не мешает */
}

.pagination-button:hover:not(:disabled) {
  color: #666;
}

.pagination-button.active {
  font-weight: 600;
  color: #1f2937;
}

.pagination-button.active::after {
  content: '';
  position: absolute;
  bottom: -5px; 
  left: 50%;
  transform: translateX(-50%); /* Точное центрирование */
  width: 80%; /* Укороченная линия */
  height: 1px;
  background-color: #1f2937;
  border-radius: 2px;
  display: block; /* Устранение возможных вертикальных отступов */
}



.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #666;
}

/* Стили для стрелок */
.arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px; /* Компактный размер */
  height: 20px;
  padding: 0;
}

.arrow-left,
.arrow-right {
  width: 6px;
  height: 6px;
  border-right: 1px solid #1f2937;
  border-bottom: 1px solid #1f2937;
  position: relative;
}

.arrow-left {
  transform: rotate(135deg);
}

.arrow-right {
  transform: rotate(-45deg);
}

.arrow:hover:not(:disabled) .arrow-left,
.arrow:hover:not(:disabled) .arrow-right {
  border-color: #666;
}

.arrow:disabled .arrow-left,
.arrow:disabled .arrow-right {
  border-color: #666;
}
</style>