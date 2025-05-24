<template>
  <div id="app">
    <HeaderComponent />
    <Breadcrumbs v-if="$route.path !== '/'" /> <!-- Скрываем Breadcrumbs на главной странице -->
    <FooterComponents>
      <main>
        <router-view />
      </main>
    </FooterComponents>
  </div>
</template>

<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'
import FooterComponents from './components/FooterComponents.vue'
import { useRoute } from 'vue-router' // Импортируем useRoute для доступа к текущему маршруту

const $route = useRoute() // Получаем текущий маршрут
</script>

<style>
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Предотвращаем горизонтальный скролл */
}

#app {
  height: 100vh; /* Фиксируем высоту на 100% области просмотра */
  display: flex;
  flex-direction: column; /* Вертикальное расположение содержимого */
  overflow-x: hidden; /* Предотвращаем горизонтальный скролл */
}

main {
  flex: 1; /* Растягиваем main, чтобы он занимал оставшееся пространство */
  overflow-y: auto; /* Прокрутка только внутри main */
}

.router-view-content {
  padding: 40px 100px; /* Отступы для контента внутри блоков */
}

::-webkit-scrollbar {
  width: 6px; /* толщина вертикального скроллбара */
  height: 6px; /* толщина горизонтального скроллбара */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3); /* цвет ползунка */
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background-color: transparent; /* фон полосы прокрутки */
}

/* Для Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) transparent;
}

</style>