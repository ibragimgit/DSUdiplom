<template>
  <section class="announcements-section">
    <div class="container">
      <div class="header-container">
        <h1>Объявления</h1>
        <RouterLink to="/announcements" class="show-all-button">Все объявления</RouterLink>
      </div>

      <transition-group name="fade" tag="div">
        <div
          v-for="(item, index) in latest"
          :key="item.id"
          class="announcement-card"
        >
          <div class="card-header" @click="toggleExpand(index)">
            <h2>{{ item.title }}</h2>
            <span>{{ expanded[index] ? '▲' : '▼' }}</span>
          </div>
          <transition name="collapse">
            <div class="card-body" v-show="expanded[index]">
              <ul>
                <li v-if="item.order">
                  <a :href="item.order" target="_blank">📄 Приказ о конкурсе</a>
                </li>
                <li v-if="item.regulation">
                  <a :href="item.regulation" target="_blank">📘 Положение</a>
                </li>
                <li v-if="item.participants">
                  <a :href="item.participants" target="_blank">👥 Участники</a>
                </li>
                <li v-if="item.results">
                  <a :href="item.results" target="_blank">🏆 Итоги</a>
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </transition-group>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { announcementsData } from '@/data/announcementsData';

const expanded = ref(announcementsData.slice(0, 2).map(() => false));

const latest = computed(() => announcementsData.slice(0, 2));

const toggleExpand = (index) => {
  expanded.value[index] = !expanded.value[index];
};

</script>

<style scoped>
.announcements-section {
  padding: 80px 100px;
  background: var(--primary-bg, #f9fafb);
}

.container {
  margin: 0 auto;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

h1 {
  font-size: 32px;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  color: #2a3b5c;
  text-transform: uppercase;
  margin: 0;
}

.announcement-card {
  max-width: 900px;
  margin: 0 auto 24px auto;
  background: var(--card-bg, #fff);
  border-radius: var(--radius, 1.25rem);
  box-shadow: var(--shadow, 0 8px 30px rgba(0, 0, 0, 0.08));
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer; 
  font-weight: 600;
  font-size: 18px;
  background: #e5e7eb;
  color: #1f2937;
  transition: background 0.3s ease;
}

.card-header:hover {
  background: #d1d5db;
}

.card-body {
  padding: 20px 24px;
  background: #f9fafb;
}

.card-body ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-body li {
  margin-bottom: 12px;
}

.card-body a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.card-body a:hover {
  color: #1d4ed8;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}
.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}
.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px;
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.show-all-button {
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

.show-all-button:hover {
  background: #1f2937;
  color: #fff;
}

@media (max-width: 768px) {
  .announcements-section {
    padding: 40px 20px;
  }

  .header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 16px;
  }

  h1 {
    font-size: 28px;
  }

  .card-header {
    font-size: 16px;
    padding: 16px;
  }

  .card-body {
    padding: 16px;
  }

  .show-all-button {
    font-size: 14px;
    padding: 8px 16px;
  }

  .announcement-card {
    margin: 0 auto 24px auto;
  }
}
</style>