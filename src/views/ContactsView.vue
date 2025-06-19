<template>
  <div class="contacts-page">
    <div class="contacts-container">
      <div class="info-block">
        <h1>{{ $t('contacts.title') }}</h1>
        <hr class="divider" />
        <div class="info-item">
          <p class="phone">{{ $t('contacts.phone') }}</p>
        </div>
        <div class="info-item">
          <p class="mail">{{ $t('contacts.email') }}</p>
        </div>
        <div class="info-item">
          <p class="region" v-html="$t('contacts.address')"></p>
        </div>
        <div class="info-item">
          <div class="socials">
            <div class="socials-icons">
              <a href="https://vk.com" target="_blank" aria-label="VK">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vk.svg"
                  alt="VK"
                  class="social-icon"
                />
              </a>
              <a href="https://rutube.ru" target="_blank" aria-label="Rutube">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"
                  alt="Rutube"
                  class="social-icon"
                />
              </a>
              <a href="https://t.me" target="_blank" aria-label="Telegram">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg"
                  alt="Telegram"
                  class="social-icon"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="map-block">
        <div id="map" class="map-container"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// Access i18n instance
const { t } = useI18n();

// Переменная для хранения карты
let myMap = null;
// Флаг для отслеживания статуса загрузки карты
const isMapLoaded = ref(false);

function loadYandexMapScript() {
  return new Promise((resolve, reject) => {
    if (typeof ymaps !== 'undefined') {
      return resolve();
    }
    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=fdde0f79-3266-48c0-94ba-f888146ba0e9&lang=ru_RU';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Ошибка загрузки Яндекс.Карт'));
    document.head.appendChild(script);
  });
}

function initMap() {
  if (typeof ymaps === 'undefined' || !ymaps.Map) {
    console.error('Яндекс.Карты API не загружен');
    return false;
  }

  try {
    myMap = new ymaps.Map('map', {
      center: [42.9785, 47.4995],
      zoom: 16,
      controls: ['zoomControl', 'fullscreenControl'],
    });

    const placemark = new ymaps.Placemark(
      [42.9785, 47.4995],
      {
        balloonContent: t('contacts.map_balloon'), // Use translated content
      },
      {
        preset: 'islands#blueDotIcon',
      }
    );

    myMap.geoObjects.add(placemark);

    myMap.events.add('boundschange', () => {
      myMap.container.fitToViewport();
    });

    isMapLoaded.value = true;
    return true;
  } catch (e) {
    console.error('Ошибка инициализации карты:', e);
    return false;
  }
}

async function tryInitMap(retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      await loadYandexMapScript();
      await ymaps.ready();
      if (initMap()) {
        return;
      }
    } catch (e) {
      console.warn(`Попытка ${i + 1} не удалась:`, e);
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  console.error('Не удалось загрузить карту после всех попыток');
  isMapLoaded.value = false;
}

onMounted(() => {
  tryInitMap();
});

onUnmounted(() => {
  if (myMap) {
    try {
      myMap.destroy();
      myMap = null;
    } catch (e) {
      console.error('Ошибка при уничтожении карты:', e);
    }
  }
});
</script>

<style scoped>
.contacts-page {
  padding: 0px 20px;
  margin-top: 100px;
}

.contacts-container {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 32px;
  gap: 24px;
  max-width: 1200px;
  margin: auto;
}

@media (min-width: 992px) {
  .contacts-container {
    flex-direction: row;
    gap: 40px;
  }
}

.info-block {
  flex: 1;
}

.map-block {
  flex: 1;
  position: relative;
  min-width: 0; /* Предотвращает растягивание в flex */
}

h1 {
 font-size: 32px;
  font-weight: 800;
  font-family: 'Montserrat', sans-serif;
  color: #2a3b5c;
  text-transform: uppercase;
  margin: 0 0 20px 0;
}

.phone {
  font-size: 22px;
  font-weight: 400;
  color: #6b7280;
  font-family: 'Inter', sans-serif;
  line-height: 1.2;
  text-transform: uppercase;
}

.region,
.mail {
  font-size: 16px;
  font-weight: 400;
  color: #6b7280;
  font-family: 'Inter', sans-serif;
  line-height: 1.2;
}

.info-item {
  margin-bottom: 40px;
}

.info-item .label {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.map-container {
  width: 100%;
  max-width: 100%;
  height: 400px;
  min-height: 400px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
  position: relative;
  box-sizing: border-box;
  flex-shrink: 0; 
}


.map-container > div,
.map-container .ymaps {
  width: 100% !important;
  height: 100% !important;
}

.socials {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.socials-title {
  font-size: 16px;
  font-weight: 600;
  color: #2a3b5c;
  font-family: 'Inter', sans-serif;
  margin: 0;
}

.socials-icons {
  display: flex;
  gap: 16px;
}

.social-icon {
  width: 28px;
  height: 28px;
  filter: brightness(0) saturate(100%) invert(19%) sepia(18%) saturate(647%) hue-rotate(171deg) brightness(92%) contrast(90%);
  transition: opacity 0.3s ease;
  display: block;
}

.social-icon:hover {
  opacity: 0.6;
}

.social-icon[src*="rutube"] {
  background-color: #f0f0f0;
}

@media (max-width: 576px) {
  .contacts-page {
    margin-top: 40px;
    padding: 0 10px;
  }

  .contacts-container {
    padding: 12px;
    gap: 12px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 12px;
  }

  .phone {
    font-size: 16px;
  }

  .region,
  .mail {
    font-size: 12px;
  }

  .info-item {
    margin-bottom: 16px;
  }

  .map-container {
    height: 200px;
    min-height: 150px;
  }

  .socials-icons {
    gap: 8px;
  }

  .social-icon {
    width: 20px;
    height: 20px;
  }
}

@media (min-width: 577px) and (max-width: 991px) {
  .contacts-container {
    padding: 20px;
    gap: 20px;
  }

  .map-container {
    height: 250px;
    min-height: 200px;
  }

  h1 {
    font-size: 26px;
  }

  .phone {
    font-size: 17px;
  }

  .region,
  .mail {
    font-size: 14px;
  }

  .social-icon {
    width: 22px;
    height: 22px;
  }
}
</style>

