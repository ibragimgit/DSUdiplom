<template>
  <HeroSection />
  <AboutSection />
  <DirectionsSection/>
  <NewsComponent/>
  <Announcements/>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue';
import AboutSection from '@/components/AboutSection.vue';
import DirectionsSection from '@/components/DirectionsSection.vue';
import NewsComponent from '@/components/NewsComponent.vue';
import Announcements from '@/components/Announcements.vue';

</script>

<style scoped>
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
</style>