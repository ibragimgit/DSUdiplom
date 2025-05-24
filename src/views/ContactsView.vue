<template>
  <div class="contacts-page">
    <div class="contacts-container">
      <div class="info-block">
        <h1>Контакты</h1>
        <hr class="divider" />
        <div class="info-item">
          <p class="phone">+7 928 777-77-77</p>
        </div>

        <div class="info-item">
          <p class="mail">E-mail: mahakala@ngaz.ru</p>
        </div>

        <div class="info-item">
          <p class="region">Адрес: г. Махачкала, ул. Дзержинского,12<br />
                Лабораторный корпус, кабинет 412.</p>
        </div>
        <div class="info-item">
          <div class="socials">
            <div class="socials-icons">
              <a href="https://vk.com" target="_blank" aria-label="VK">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vk.svg" alt="VK" class="social-icon" />
              </a>
              <a href="https://t.me" target="_blank" aria-label="Telegram">
                <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg" alt="Telegram" class="social-icon" />
              </a>
              <a href="https://rutube.ru" target="_blank" aria-label="Rutube">
                <img src="data:image/png;base64,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" alt="Rutube" class="social-icon" />
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
        balloonContent: 'г. Махачкала, ул. Дзержинского, 12',
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
  font-weight: 400;
  color: #000;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 20px;
  line-height: 1.2;
  text-transform: uppercase;
}

.phone {
  font-size: 22px;
  font-weight: 400;
  color: #000;
  font-family: 'Inter', sans-serif;
  line-height: 1.2;
  text-transform: uppercase;
}

.region,
.mail {
  font-size: 16px;
  font-weight: 400;
  color: #000;
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
  color: #000;
  font-family: 'Arial', sans-serif;
  margin: 0;
}

.socials-icons {
  display: flex;
  gap: 16px;
}

.social-icon {
  width: 28 renderex;
  height: 28px;
  filter: grayscale(100%);
  transition: opacity 0.3s ease;
  display: block;
}

.social-icon:hover {
  opacity: 0.6;
}

.social-icon[src*="rutube"] {
  background-color: #f0f0f0;
}
</style>