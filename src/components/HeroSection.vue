<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="text-block">
        <h1>
          ЦЕНТР СОВРЕМЕННЫХ <br />
          ОБРАЗОВАТЕЛЬНЫХ <br />
          ТЕХНОЛОГИЙ
        </h1>
        <p>ИМЕНИ С.М. ОМАРОВА</p>
        <button class="hero-button" @click="scrollToAboutSection">
          О центре
        </button>
      </div>
      <div class="model-block">
        <BrainModel />
      </div>
    </div>
  </section>
</template>

<script setup>
import BrainModel from '@/components/BrainModel.vue';

function scrollToAboutSection() {
  document.getElementById('about-section').scrollIntoView({
    behavior: 'smooth',
  });
}
</script>

<style scoped>
.hero-section {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px 80px; /* Добавлен нижний отступ */
  box-sizing: border-box;
  position: relative;
  margin-top: -30px;
}

.hero-content {
  max-width: 1200px;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 60px; /* Увеличен зазор между блоками */
}

.text-block {
  flex: 1 1 500px;
  margin-bottom: 0; /* Убрали лишний margin-bottom */
}

.text-block h1 {
  font-size: 42px;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.2;
  text-transform: uppercase;
  margin-bottom: 20px;
  color: #2a3b5c;
}

.text-block p {
  font-size: 18px;
  color: #444;
  margin-bottom: 24px;
  font-family: 'Montserrat', sans-serif;
}

.hero-button {
  background-color: #2a3b5c;
  border: 1px solid #2a3b5c;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-family: 'Inter';
  color: #fff;
}

.hero-button:hover {
  background: #1f2937;
  color: #fff;
}

.model-block {
  flex: 1 1 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(20px);
  opacity: 0;
  transform: scale(0.9);
  animation: zoomIn 1s ease-out 0.5s forwards;
}

@keyframes zoomIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 40px; /* Уменьшен зазор для мобильных устройств */
  }

  .text-block h1 {
    font-size: 28px;
  }

  .text-block p {
    font-size: 16px;
  }

  .model-block {
    margin-left: 0;
    transform: translateY(10px);
  }
}
</style>