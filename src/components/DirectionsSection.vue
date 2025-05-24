<template>
  <section class="directions-section">
    <div class="directions-container">
      <div class="header-block">
        <h1>Основные направления работы</h1>
        <hr class="divider" />
      </div>
      <div class="directions-grid">
        <div
          v-for="(item, index) in directions"
          :key="index"
          class="direction-card"
        >
          <div class="card-image">
            <img :src="item.img" :alt="item.alt" />
          </div>
          <div class="card-text">
            <h2>{{ item.title }}</h2>
            <p class="short-text">{{ item.short }}</p>
            <p class="full-text" v-show="expanded[index]">
              {{ item.full }}
            </p>
            <button class="toggle-button" @click="toggleExpand(index)">
              {{ expanded[index] ? 'Скрыть' : 'Подробнее' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const expanded = ref([false, false, false, false]);

const toggleExpand = (index) => {
  expanded.value[index] = !expanded.value[index];
};

const directions = [
  {
    img: '/src/assets/img1.jpg',
    alt: 'Innovative Technologies Icon',
    title: 'Инновационные технологии',
    short: 'Поиск и внедрение новых решений.',
    full:
      'Интегрируйте передовые технологии в удобном и гибком формате, чтобы эффективно поддерживать обучение в любой форме.',
  },
  {
    img: '/src/assets/img2.jpg',
    alt: 'Pedagogical Support Icon',
    title: 'Педагогические инициативы',
    short: 'Поддержка инновационных идей.',
    full:
      'Способствуйте развитию передовых образовательных идей, интегрируя их в практическую деятельность.',
  },
  {
    img: '/src/assets/img3.jpg',
    alt: 'Interactive Technologies Icon',
    title: 'Интерактивные технологии',
    short: 'Популяризация новых методов.',
    full:
      'Поддерживайте внедрение современных технологий в образовательный процесс.',
  },
  {
    img: '/src/assets/img3.jpg',
    alt: 'Digital Education Icon',
    title: 'Цифровизация образования',
    short: 'Создание онлайн-курсов.',
    full:
      'Помощь преподавателям в создании онлайн-курсов и преодолении «цифровой пропасти».',
  },
];
</script>

<style scoped>
:root {
  --bg-color: linear-gradient(145deg, #f1f5f9, #e2e8f0);
  --card-bg: rgba(255, 255, 255, 0.9);
  --text-color: #1f2937;
  --accent-color: #6366f1;
  --shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  --radius: 1.25rem;
  --btn-bg: transparent;
  --btn-color: #1e293b;
  --btn-border: #1e293b;
  --btn-hover-bg: #1e293b;
  --btn-hover-color: #fff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: linear-gradient(145deg, #1e293b, #0f172a);
    --card-bg: rgba(30, 41, 59, 0.9);
    --text-color: #f8fafc;
    --accent-color: #a78bfa;
    --shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
    --btn-bg: transparent;
    --btn-color: #e2e8f0;
    --btn-border: #e2e8f0;
    --btn-hover-bg: #e2e8f0;
    --btn-hover-color: #0f172a;
  }
}

.directions-section {
  padding: 80px 100px;
  background: var(--bg-color);
}

.directions-container {
  position: relative;
  z-index: 1; /* Изолируем контейнер заголовка */
}

.header-block {
  margin-bottom: 40px;
  text-align: center;
}

.header-block h1 {
  font-size: 32px;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  color: #2a3b5c;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.divider {
  border: 0;
  border-top: 2px solid #000;
  width: 80px;
  margin: 0 auto;
  z-index: 2; /* Подчеркивание выше карточек */
}

@media (prefers-color-scheme: dark) {
  .divider {
    border-top: 2px solid #fff; /* Контрастное подчеркивание в темной теме */
  }
}

.directions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.direction-card {
  background: var(--card-bg);
  backdrop-filter: blur(16px);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 0; /* Карточки ниже заголовка */
}

.direction-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.card-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
  border-radius: 6px;
  margin-bottom: 16px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card-image img:hover {
  transform: scale(1.05);
}

.card-text h2 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  font-family: 'Montserrat', sans-serif;
}

.card-text .short-text {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 10px;
  line-height: 1.5;
  font-family: 'Inter', sans-serif;
}

.card-text .full-text {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 12px;
  line-height: 1.6;
  font-family: 'Inter', sans-serif;
  transition: opacity 0.3s ease;
}

.toggle-button {
  border: 1px solid var(--btn-border);
  padding: 8px 16px;
  background: var(--btn-bg);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  color: var(--btn-color);
  transition: background 0.3s ease, color 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  visibility: hidden;
  transform: translateY(5px);
}

.toggle-button:hover {
  background: var(--btn-hover-bg);
  color: var(--btn-hover-color);
  transform: translateY(-1px);
}

.direction-card:hover .toggle-button {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .directions-section {
    padding: 60px 24px;
  }

  .header-block h1 {
    font-size: 28px;
  }

  .directions-grid {
    gap: 30px;
  }

  .card-text h2 {
    font-size: 18px;
  }

  .card-text .short-text,
  .card-text .full-text {
    font-size: 13px;
  }

  .card-image {
    height: 150px;
  }
}
</style>