<template>
  <section class="error-section">
    <div class="text-block">
      <h1>{{ $t(`error.${errorCode}.title`) }}</h1>
      <p>{{ $t(`error.${errorCode}.subtitle`) }}</p>
      <router-link to="/" class="error-button">{{ $t('error.backToHome') }}</router-link>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const errorCode = route.params.errorCode || '403'; // По умолчанию 403, если параметр не передан
</script>

<style scoped>
.error-section {
  width: 100%;
  min-height: 100vh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 20px 300px;
  box-sizing: border-box;
}

.text-block {
  max-width: 600px;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  animation: zoomIn 1s ease-out 0.5s forwards;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.error-button {
  display: inline-block;
  background-color: #2a3b5c;
  border: 1px solid #2a3b5c;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  font-family: 'Inter', sans-serif;
  color: #fff;
  text-decoration: none;
}

.error-button:hover {
  background: #1f2937;
  color: #fff;
}

@keyframes zoomIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .text-block {
    padding: 0 15px;
  }

  .text-block h1 {
    font-size: 28px;
    line-height: 1.3;
  }

  .text-block p {
    font-size: 16px;
  }

  .error-button {
    font-size: 14px;
    padding: 6px 16px;
  }
}
</style>