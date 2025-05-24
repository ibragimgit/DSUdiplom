<template>
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-link">Главная</router-link>
      <span v-if="segments.length > 0"> / </span>
      <span v-for="(segment, index) in segments" :key="index">
        <router-link v-if="index !== segments.length - 1" :to="'/' + segment" class="breadcrumb-link">
          {{ getBreadcrumbLabel(segment) }}
        </router-link>
        <span v-else>{{ getBreadcrumbLabel(segment) }}</span>
        <span v-if="index !== segments.length - 1"> / </span>
      </span>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  // Словарь для хлебных крошек
  const breadcrumbLabels = {
    '': 'Главная',
    'videomaterials': 'Видеоматериалы',
    'team': 'Команда',
    'materials': 'Материалы',
    'presentations': 'Презентации',
    'contacts': 'Контакты'
  }
  
  // Получаем сегменты пути и убираем пустые элементы
  const segments = computed(() => {
    const path = route.path.split('/').filter(Boolean)
    return path
  })
  
  // Функция для получения метки хлебных крошек по сегменту
  const getBreadcrumbLabel = (segment) => {
    return breadcrumbLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
  }
  </script>
  
  <style scoped>
  /* Стили для хлебных крошек */
  .breadcrumb {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #000; /* Цвет текста */
    gap: 5px; 
    font-family: 'Inter', sans-serif;
    padding: 20px 100px;
    background: #fff;
  }
  
  .breadcrumb-link {
    text-decoration: none;
    color: #000; /* Цвет ссылок, как в навигации */
    font-weight: 500;
    transition: color 0.3s, text-decoration 0.3s;
  }
  
  .breadcrumb-link:hover {
    color: #666; /* Цвет при наведении */
    text-decoration: underline;
  }
  
  .breadcrumb span {
    color: #666; /* Цвет разделителей */
  }
  
  /* Подчеркивание на активной ссылке */
  .breadcrumb-link::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #000; /* Черное подчеркивание */
    border-radius: 2px;
    opacity: 0; /* Изначально скрыто */
  }
  
  .breadcrumb-link:hover::after {
    opacity: 1; /* Показываем подчеркивание при наведении */
  }


  </style>
  