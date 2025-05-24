<template>
    <div class="page-wrapper">
      <div class="content-placeholder">
        <slot></slot>
      </div>
  
      <footer class="footer">
        <div class="footer-container">
          <!-- Левая часть -->
          <div class="footer-left">
            <div class="logo">
              <img :src="logo" alt="Логотип" />
              <span class="logo-text">{{ $t('orgName') }}</span>
            </div>
            <span class="copyright">© {{ $t('orgName') }} 2024</span>
          </div>
  
          <!-- Центральная часть -->
          <div class="footer-center">
            <div class="footer-item address-block">
              <span class="icon">
                <!-- Иконка адреса -->
                <svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                </svg>
              </span>
              <span class="text">
                г. Махачкала ул. Дзержинского 12<br /> Лаб корпус кабинет 412
              </span>
            </div>
            <div class="contact-group">
              <div class="footer-item phone-block">
                <span class="icon">
                  <!-- Иконка телефона -->
                  <svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.91.76 1 1 0 011 1v3.5a1 1 0 01-1 1A16 16 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.76 3.91 1 1 0 01-.21 1.11l-2.2 2.2z"/>
                  </svg>
                </span>
                <span class="text phone">+7 928 777-77-77</span>
              </div>
              <div class="footer-item email-block">
                <span class="icon">
                  <!-- Иконка email -->
                  <svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 7l8-5H4l8 5zm-8 7h16V8l-8 5-8-5v10z"/>
                  </svg>
                </span>
                <span class="text email">maryamr@mail.ru</span>
              </div>
            </div>
          </div>
  
          <!-- Правая часть -->
          <div class="footer-right">
            <a href="#" class="footer-link">О компании</a>
            <a href="#" class="footer-link">Контакты</a>
            <button class="footer-button">Связаться</button>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n'
  import logo from '../assets/logo.svg'
  
  const { locale } = useI18n()
  </script>
  
  <style scoped>
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-placeholder {
  flex: 1;
}

/* Футер */
footer {
  background: linear-gradient(145deg, #e2eaf5, #e2eaf5);
  padding: 32px 100px;
  color: #1f2937;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.04);
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  flex-wrap: wrap;
}

.footer-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  margin-right: 10px;
}

.logo-text {
  font-size: 0.8em;
  line-height: 1.3;
  font-weight: 600;
  color: #1f2937;
  margin-left: 12px;
  width: 18ch;
  white-space: normal;
  word-break: keep-all;
}

.copyright {
  font-size: 14px;
  color: #4b5563;
  padding-top: 5px;
}

.footer-center {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  flex-wrap: wrap;
}

.contact-group {
  display: flex;
  flex-direction: column;
}

.footer-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  max-width: 300px;
  margin-top: 10px;
}

.address-block {
  margin-right: 80px;
}

.icon-svg {
  width: 20px;
  height: 20px;
  color: #1f2937;
  flex-shrink: 0;
}

.footer-right {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
}

.footer-link {
  font-size: 16px;
  color: #1f2937;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #374151;
  text-decoration: underline;
}

/* Стилизованная кнопка "Связаться" как в хедере */
.footer-button {
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #1f2937;
  background-color: #2a3b5c;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
}

.footer-button:hover {
  background: #1f2937;
  color: #fff;
}
  </style>  