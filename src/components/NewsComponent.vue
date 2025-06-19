<template>
  <div class="news-container">
    <div class="header-line-wrapper">
      <div class="news-header">
        <h2>{{ $t('new.title') }}</h2>
        <RouterLink to="/news" class="all-news-button">
          {{ $t('new.all') }}
        </RouterLink>
      </div>
    </div>

    <div class="news-grid">
      <div v-for="item in latestNews" :key="item.id" class="news-item">
        <img :src="item.image" :alt="item.title" class="news-image" />
        <div class="news-content">
          <p class="news-date">{{ item.date }}</p>
          <p class="news-title">{{ item.title }}</p>
          <p class="news-description">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { newsItems } from '@/data/newsData'

const latestNews = computed(() => [...newsItems].slice(0, 4))
</script>

<style scoped>
.news-container {
  padding: 80px 100px;
  background: linear-gradient(145deg, #f1f5f9, #e2e8f0);
  font-family: 'Arial', sans-serif;
}

.header-line-wrapper {
  margin-bottom: 40px;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.news-header h2 {
  font-size: 32px;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  color: #2a3b5c;
  text-transform: uppercase;
  margin: 0;
}

.all-news-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #2a3b5c;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.all-news-button:hover {
  background-color: #1f2c40;
}

.underline {
  width: 100%;
  height: 2px;
  background-color: #2a3b5c;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.news-item {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border-radius: 6px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.news-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.news-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  object-position: center;
  border-radius: 6px;
  margin-bottom: 16px;
  transition: transform 0.4s ease;
}

.news-image:hover {
  transform: scale(1.05);
}

.news-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.news-date {
  font-size: 12px;
  color: #6b7280;
  font-family: 'Inter', sans-serif;
}

.news-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
}

.news-description {
  font-size: 14px;
  color: #4b5563;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .news-container {
    padding: 60px 24px;
  }

  .news-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .news-header h2 {
    font-size: 28px;
  }

  .news-grid {
    gap: 30px;
  }

  .news-title {
    font-size: 16px;
  }

  .news-description {
    font-size: 13px;
  }

  .news-image {
    height: 150px;
  }

  .all-news-button {
    font-size: 14px;
    padding: 10px 20px;
  }
}
</style>
