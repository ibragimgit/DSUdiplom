<template>
  <div class="partners-wrapper">
    <div class="partner-item" v-for="(partner, index) in partners" :key="index">
      <a :href="partner.link" target="_blank" rel="noopener noreferrer" class="partner-link">
        <img :src="partner.src" :alt="partner.alt" class="partner-logo" />
        <p class="partner-text" v-html="t(partner.textKey)"></p>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const partners = [
  {
    src: '/logos/rosobrnadzor.png',
    alt: 'Рособрнадзор',
    textKey: 'partners.rosobrnadzor',
    link: 'https://obrnadzor.gov.ru/',
  },
  {
    src: '/logos/minobrnauki.png',
    alt: 'Министерство науки и высшего образования РФ',
    textKey: 'partners.minobrnauki',
    link: 'https://minobrnauki.gov.ru/',
  },
  {
    src: '/logos/vak.png',
    alt: 'Высшая аттестационная комиссия',
    textKey: 'partners.vak',
    link: 'https://vak.minobrnauki.gov.ru/',
  },
  {
    src: '/logos/nacic.png',
    alt: 'Национальный центр противодействия терроризму и экстремизму',
    textKey: 'partners.nacic',
    link: 'https://nacic.ru/',
  },
  {
    src: '/logos/minpros.png',
    alt: 'Министерство просвещения РФ',
    textKey: 'partners.minpros',
    link: 'https://edu.gov.ru/',
  },
]
</script>

<style scoped>
.partners-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 100px;
  background: linear-gradient(145deg, #f1f5f9, #e2e8f0);
  animation: bgShift 10s ease-in-out infinite alternate;
  margin-bottom: 2rem;
}

.partner-item {
  display: flex;
  align-items: center;
  flex: 1 1 300px;
  max-width: 500px; /* увеличено с 400 */
}

.partner-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  flex-wrap: wrap;
}

.partner-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  flex-shrink: 0;
}

.partner-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: #334155;
  text-transform: uppercase;
  line-height: 1.4;
  max-width: 100%;
  word-break: break-word;
  white-space: normal;
  flex: 1;
}

@media (max-width: 640px) {
  .partner-link {
    flex-direction: column;
    text-align: center;
  }
}

@keyframes bgShift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
