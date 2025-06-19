<template>
  <div class="page-container">
    <HeroSection />
    <AboutSection />
    <DirectionsSection />
    <GradientDivider />
    <Chrono :data="timelineEvents" />
    <NewsComponent />
    <Announcements />
  </div>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import DirectionsSection from '@/components/DirectionsSection.vue';
import NewsComponent from '@/components/NewsComponent.vue';
import Announcements from '@/components/Announcements.vue';
import Chrono from '@/components/Chrono.vue';
import GradientDivider from '@/components/GradientDivider.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const timelineEvents = ref([
  { year: '1960', text: 'timeline.event1960', image: new URL('@/assets/chrono/1975.jfif', import.meta.url).href },
  { year: '1975', text: 'timeline.event1975', image: new URL('@/assets/chrono/1960.jfif', import.meta.url).href },
  { year: '1990', text: 'timeline.event1990', image: new URL('@/assets/chrono/1990.jfif', import.meta.url).href },
  { year: '2005', text: 'timeline.event2005', image: new URL('@/assets/chrono/2005.jfif', import.meta.url).href },
  { year: '2010', text: 'timeline.event2010', image: new URL('@/assets/chrono/2010.jfif', import.meta.url).href },
  { year: '2015', text: 'timeline.event2015', image: new URL('@/assets/chrono/2015.jfif', import.meta.url).href },
  { year: '2020', text: 'timeline.event2020', image: new URL('@/assets/chrono/2020.jfif', import.meta.url).href },
  { year: '2025', text: 'timeline.event2025', image: new URL('@/assets/chrono/2025.jfif', import.meta.url).href },
]);
</script>

<style scoped>
/* Ensure the page container prevents overflow */
.page-container {
  width: 100%;
  overflow-x: hidden; /* Prevent horizontal scrolling */
  box-sizing: border-box; /* Ensure padding/borders are included in width */
}

/* General reset for all components to avoid overflow */
:deep(*) {
  box-sizing: border-box; /* Apply box-sizing globally within this component */
}

/* Ensure images and other elements don't overflow */
:deep(img),
:deep(.additional-image) {
  max-width: 100%; /* Prevent images from exceeding container width */
  height: auto; /* Maintain aspect ratio */
}

/* Ensure all sections respect the viewport */
:deep(.hero-content),
:deep(.about-content),
:deep(.additional-content),
:deep(.additional-content_1) {
  max-width: 100%; /* Prevent content from exceeding parent width */
  overflow-x: hidden; /* Hide any horizontal overflow */
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
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

  .about-content h1 {
    font-size: 24px;
  }

  .about-content p {
    font-size: 16px;
  }

  .additional-content,
  .additional-content_1 {
    flex-direction: column;
    text-align: center;
  }

  .additional-text h2 {
    font-size: 20px;
  }

  .additional-text p {
    font-size: 14px;
  }

  .additional-image {
    margin: 0 auto;
  }
}

/* Desktop styles to ensure no overflow */
@media (min-width: 769px) {
  .hero-content,
  .about-content,
  .additional-content,
  .additional-content_1 {
    max-width: 1200px; /* Set a max-width for larger screens */
    margin: 0 auto; /* Center content */
    overflow-x: hidden; /* Prevent overflow */
  }
}
</style>