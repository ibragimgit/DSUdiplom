<template>
  <header>
    <div class="logo">
      <img :src="logo" alt="Логотип" />
      <span class="logo-text">{{ $t('orgName') }}</span>
    </div>
    <nav class="nav-links">
      <router-link to="/" active-class="active-link">{{ $t('header.about') }}</router-link>
      <router-link to="/team" active-class="active-link">{{ $t('header.team') }}</router-link>
      <router-link to="/materials" active-class="active-link">{{ $t('header.materials') }}</router-link>
      <router-link to="/presentations" active-class="active-link">{{ $t('header.presentations') }}</router-link>
      <router-link to="/videomaterials" active-class="active-link">{{ $t('header.videos') }}</router-link>
      <router-link to="/contacts" active-class="active-link">{{ $t('header.contacts') }}</router-link>
      <button class="language-toggle" @click="toggleLanguage">{{ currentLang }}</button>
    </nav>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import logo from '../assets/logo.svg'


const { locale } = useI18n()
const currentLang = ref('RU / EN')

function toggleLanguage() {
  if (locale.value === 'ru') {
    locale.value = 'en'
    currentLang.value = 'EN / RU'
  } else {
    locale.value = 'ru'
    currentLang.value = 'RU / EN'
  }
}
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
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

.logo span {
  font-size: 0.8em;
  line-height: 1.3;
  color: #1f2937;
  font-weight: 600;
}

.logo-text {
  display: inline-block;
  margin-left: 12px;
  width: 18ch;
  line-height: 1.2;
  white-space: normal;
  word-break: keep-all;
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

.nav-links a.active-link {
  color: #1f2937;
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

.nav-links a:hover {
  color: #374151; /* Тёмно-серый */
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
  transition: background 0.3s ease, color 0.3s ease, transform 0.2s;
}

.language-toggle:hover {
  background: #1f2937;
  color: #fff;
}
</style>