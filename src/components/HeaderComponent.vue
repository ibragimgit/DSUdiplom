<template>
  <header :class="{ hidden: isHidden }">
    <router-link to="/" class="logo" @click="resetMenu">
      <img :src="logo" alt="Логотип" />
      <span class="logo-text">{{ $t('orgName') }}</span>
    </router-link>

    <button class="burger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen">
      <span></span>
    </button>

    <nav class="nav-links" :class="{ open: menuOpen }">
      <router-link to="/" active-class="active-link">{{ $t('header.about') }}</router-link>
      <router-link to="/team" active-class="active-link">{{ $t('header.team') }}</router-link>
      <router-link to="/presentations" active-class="active-link">{{ $t('header.presentations') }}</router-link>
      <router-link to="/videomaterials" active-class="active-link">{{ $t('header.videos') }}</router-link>
      <router-link to="/calendar" active-class="active-link">{{ $t('header.materials') }}</router-link>
      <router-link to="/contacts" active-class="active-link">{{ $t('header.contacts') }}</router-link>
      <button class="language-toggle" @click="toggleLanguage">{{ currentLang }}</button>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import logo from '../assets/logo.svg'

const { locale } = useI18n()
const currentLang = ref('RU / EN')
const menuOpen = ref(false)

function toggleLanguage() {
  if (locale.value === 'ru') {
    locale.value = 'en'
    currentLang.value = 'EN / RU'
  } else {
    locale.value = 'ru'
    currentLang.value = 'RU / EN'
  }
}

function resetMenu() {
  menuOpen.value = false
}

const isHidden = ref(false)
let lastScroll = 0

const handleScroll = () => {
  const currentScroll = window.scrollY
  if (window.innerWidth <= 400) {
    isHidden.value = false
  } else {
    isHidden.value = currentScroll > lastScroll && currentScroll > 80
  }
  lastScroll = currentScroll
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Общие стили */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

header {
  padding: 20px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(145deg, #f1f5f9, #e2e8f0);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
}

header.hidden {
  transform: translateY(-100%);
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

.logo span {
  font-size: 0.8em;
  color: #1f2937;
  font-weight: 600;
}

.logo-text {
  margin-left: 12px;
  width: 18ch;
  line-height: 1.2;
  white-space: normal;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-links a {
  text-decoration: none;
  color: #1f2937;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  transition: color 0.3s;
}

.nav-links a.active-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #1f2937;
  border-radius: 2px;
}

.language-toggle {
  border: 1px solid #2a3b5c;
  padding: 6px 12px;
  background-color: #2a3b5c;
  backdrop-filter: blur(8px);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  color: #fff;
  transition: background 0.3s, color 0.3s, transform 0.2s;
}

.language-toggle:hover {
  background: #1f2937;
}

/* Бургер-меню */
.burger {
  display: none;
  position: relative;
  width: 30px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
}

.burger span,
.burger span::before,
.burger span::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: #1f2937;
  border-radius: 2px;
  transition: 0.3s ease-in-out;
}

.burger span {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.burger span::before {
  top: -10px;
}

.burger span::after {
  top: 10px;
}

.burger.open span {
  background-color: transparent;
}

.burger.open span::before {
  transform: rotate(45deg);
  top: 0;
}

.burger.open span::after {
  transform: rotate(-45deg);
  top: 0;
}

/* Адаптивные стили */
@media (max-width: 768px) {
  .burger {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    background: #fff;
    width: 100%;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    transform: translateY(-200%);
    transition: transform 0.3s ease;
    z-index: 1002;
  }

  .nav-links.open {
    transform: translateY(0);
  }
}

/* Специфичный стиль для разрешений <= 400px */
@media (max-width: 400px) {
  header {
    padding: 10px 20px; /* Уменьшаем отступы для маленьких экранов */
  }

  .burger {
    display: block !important; /* Гарантируем отображение */
    z-index: 1001 !important;
  }

  .nav-links {
    top: 60px; /* Корректируем позицию для маленьких экранов */
    padding: 15px;
  }
}
</style>