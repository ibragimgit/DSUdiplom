<template>
  <section class="about-section" id="about-section">
    <div class="about-content">
      <h1>{{ $t('about.title') }}</h1>
      <p>{{ $t('about.description') }}</p>
    </div>
  </section>
</template>

<script setup>
// Пока логика не используется, но может быть добавлена позже.
</script>

<style scoped>
.about-section {
  padding: 80px 500px;
  background: linear-gradient(145deg, #f1f5f9, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
}

.about-content {
  max-width: 800px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  padding: 48px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(16px);
}

.about-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.about-content h1 {
  font-size: 32px;
  margin-bottom: 32px;
  color: #2a3b5c;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.about-content p {
  font-size: 18px;
  color: #4b5563;
  line-height: 1.8;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

@media (max-width: 768px) {
  .about-section {
    padding: 60px 24px;
  }

  .about-content {
    padding: 32px 24px;
  }

  .about-content h1 {
    font-size: 28px;
  }

  .about-content p {
    font-size: 16px;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 60px 24px; /* Уменьшен padding для мобильных устройств */
  }

  .about-content {
    padding: 32px 24px;
  }

  .about-content h1 {
    font-size: 28px;
  }

  .about-content p {
    font-size: 16px;
  }
}
</style>