<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="text-block">
        <h1>
          {{ $t('hero.titleLine1') }} <br />
          {{ $t('hero.titleLine2') }} <br />
          {{ $t('hero.titleLine3') }}
        </h1>
        <p>{{ $t('hero.subtitle') }}</p>
        <button class="hero-button" @click="scrollToAboutSection">
          {{ $t('header.about') }}
        </button>
      </div>
      <div class="model-block" v-if="!isMobile">
        <BrainModel />
      </div>
    </div>
  </section>
</template>

<script setup>
import BrainModel from '@/components/BrainModel.vue';
import { ref, onMounted, onUnmounted } from 'vue';

const isMobile = ref(false);

// Update isMobile based on window width
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});

function scrollToAboutSection() {
  document.getElementById('about-section').scrollIntoView({
    behavior: 'smooth',
  });
}
</script>

<style scoped>
.hero-section {
  width: 95%;
  min-height: 90vh; 
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  margin-top: 0;
  padding: 0 2vw;
}

.hero-content {
  max-width: 90rem;
  width: 90%;
  display: flex;
  flex-wrap: nowrap; 
  align-items: center;
  justify-content: space-between;
  gap: 1rem; 
}

.text-block {
  flex: 1 1 31.25rem;
  margin-left: clamp(0rem, 17vw, 17rem);
  text-align: left;
  transform: translateY(-1.5rem); 
}

.text-block h1 {
  font-size: clamp(1.75rem, 5vw, 2.625rem);
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.2;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
  color: #2a3b5c;
}

.text-block p {
  font-size: clamp(0.9375rem, 2.5vw, 1.125rem);
  color: #444;
  margin-bottom: 1.5rem;
  font-family: 'Montserrat', sans-serif;
}

.hero-button {
  background-color: #2a3b5c;
  border: 1px solid #2a3b5c;
  padding: clamp(0.375rem, 1vw, 0.625rem) clamp(0.625rem, 2vw, 1.25rem);
  cursor: pointer;
  font-size: clamp(0.875rem, 2.5vw, 1rem);
  font-weight: 500;
  border-radius: 0.3125rem;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-family: 'Inter', sans-serif;
  color: #fff;
}

.hero-button:hover {
  background: #1f2937;
  color: #fff;
}

.model-block {
  flex: 1 1 31.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(0.625rem);
  opacity: 0;
  transform: scale(0.9);
  animation: zoomIn 1s ease-out 0.5s forwards;
}

.text-block,
.model-block {
  flex: 1 1 24rem; /* Уменьшаем ширину */
}

@keyframes zoomIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Media Queries for Responsiveness */
@media (max-width: 640px) {
  .hero-section {
    min-height: 100vh; /* Full screen height on mobile */
    padding: 0 3vw;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem; /* Reduced gap for mobile */
  }

  .text-block {
    margin-top: clamp(2rem, 10vw, 4rem); /* Reduced margin-top */
    margin-left: 0;
  }

  .text-block h1 {
    font-size: clamp(1.5rem, 6vw, 1.75rem);
    line-height: 1.3;
  }

  .text-block p {
    font-size: clamp(0.875rem, 3vw, 1rem);
  }

  .hero-button {
    width: 100%;
    max-width: 18.75rem;
  }

  .model-block {
    display: none;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  .hero-section {
    min-height: 100vh; /* Full screen height on tablet */
    padding: 0 3vw;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem; /* Reduced gap for tablet */
  }

  .text-block {
    margin-left: 0;
  }

  .model-block {
    display: none;
  }
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .hero-content {
    width: 95%;
    gap: 1rem; /* Reduced gap for this breakpoint */
  }

  .text-block {
    margin-left: clamp(3rem, 6vw, 6rem);
  }
}
</style>