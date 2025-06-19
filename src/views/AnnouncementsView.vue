<template>
  <div class="announcements-page">
    <div class="announcements-container">
      <div class="header-block">
        <h2>{{ $t('announcements.title') }}</h2>
        <div class="underline"></div>
      </div>
      <div v-for="item in announcementsData" :key="item.id" class="announcement">
        <p class="announcement-title">{{ item.title }}</p>
        <div class="links">
          <a v-if="item.order" :href="item.order" target="_blank">{{ $t('announcements.links.order') }}</a>
          <a v-if="item.regulation" :href="item.regulation" target="_blank">{{ $t('announcements.links.regulation') }}</a>
          <a v-if="item.participants" :href="item.participants" target="_blank">{{ $t('announcements.links.participants') }}</a>
          <a v-if="item.results" :href="item.results" target="_blank">{{ $t('announcements.links.results') }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { announcementsData } from '@/data/announcementsData'
</script>

<style scoped>
.announcements-page {
  padding: 80px 100px;
  background: #fff;
}

.announcements-container {
  max-width: 1200px;
  margin: auto;
}

.header-block {
  margin-bottom: 40px;
}

.announcements-page h2 {
  font-size: 32px;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  color: #2a3b5c;
  text-transform: uppercase;
  margin: 0 0 10px 0;
}

.underline {
  width: 100%;
  height: 2px;
  background-color: #2a3b5c;
}

.announcement {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border-radius: 6px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 30px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.announcement:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.announcement-title {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  margin: 0 0 16px 0;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.links a {
  display: inline-block;
  padding: 8px 16px;
  background-color: #2a3b5c;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.links a:hover {
  background-color: #1f2c40;
}

@media (max-width: 768px) {
  .announcements-page {
    padding: 60px 24px;
  }

  .announcements-page h2 {
    font-size: 28px;
  }

  .announcement {
    padding: 16px;
  }

  .announcement-title {
    font-size: 16px;
  }

  .links a {
    font-size: 13px;
    padding: 6px 12px;
  }
}
</style>