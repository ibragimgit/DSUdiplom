<template>
    <div class="video-card">
      <div class="video-wrapper">
        <iframe
          class="video-iframe"
          :src="embedUrl"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <h3 class="title">{{ title }}</h3>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: String,
    url: String
  })
  
  // Генерируем ссылку на embed
  const embedUrl = props.url.replace('/video/', '/play/embed/')
  </script>
  
  <style scoped>
.video-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Изменяем на flex-start */
  height: 100%;
  width: 100%;
  max-width: 900px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.video-wrapper {
  position: relative;
  padding-top: 56.25%; /* 16:9 соотношение сторон */
  height: 0;
  overflow: hidden;
}

.video-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
}

.title {
  padding: 10px 10px; /* Уменьшаем верхний и нижний padding */
  font-size: 18px;
  text-align: center;
  line-height: 1.6;
  color: #111;
  font-weight: normal;
  font-family: 'Inter', sans-serif;
  background-color: #ffffff;
  margin: 0; /* Убеждаемся, что внешние отступы убраны */
  white-space: pre-line; /* Сохраняем переносы строк */
  /* Убираем margin-top: auto */
}
</style>
  