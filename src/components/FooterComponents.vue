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
            <img :src="logo" :alt="$t('orgName')" />
            <span class="logo-text">{{ $t('orgName') }}</span>
          </div>
          <span class="copyright">{{ $t('footer.copyright') }}</span>
        </div>

        <!-- Центральная часть -->
        <div class="footer-center">
          <div class="footer-item address-block">
            <span class="icon">
              <svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                />
              </svg>
            </span>
            <span class="text">{{ $t('footer.address') }}</span>
          </div>
          <div class="contact-group">
            <div class="footer-item phone-block">
              <span class="icon">
                <svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg">
                  <path
                    d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.36 11.36 0 003.91.76 1 1 0 011 1v3.5a1 1 0 01-1 1A16 16 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.76 3.91 1 1 0 01-.21 1.11l-2.2 2.2z"
                  />
                </svg>
              </span>
              <span class="text phone">+7 928 777-77-77</span>
            </div>
            <div class="footer-item email-block">
              <span class="icon">
                <svg viewBox="0 0 24 24" fill="currentColor" class="icon-svg">
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 7l8-5H4l8 5zm-8 7h16V8l-8 5-8-5v10z"
                  />
                </svg>
              </span>
              <span class="text email">maryamr@mail.ru</span>
            </div>
          </div>
        </div>

        <!-- Модальное окно -->
        <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
          <div class="modal">
            <button class="modal-close" @click="closeModal" aria-label="Закрыть">×</button>
            <h2 class="modal-title">{{ $t('footer.connect') }}</h2>
            <form @submit.prevent="sendEmail">
              <label>
                Email:
                <input type="email" v-model="form.email" required />
              </label>
              <label>
                Сообщение:
                <textarea v-model="form.message" required></textarea>
              </label>
              <div class="modal-actions">
                <button type="submit" class="footer-button">Отправить</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Правая часть -->
        <div class="footer-right">
          <a href="#" class="footer-link">{{ $t('footer.about') }}</a>
          <a href="#" class="footer-link">{{ $t('footer.contacts') }}</a>
          <button class="footer-button" @click="showModal = true">
            {{ $t('footer.connect') }}
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import logo from '../assets/logo.svg'
import { ref } from 'vue'

const showModal = ref(false)

const form = ref({
  email: '',
  message: '',
})

function closeModal() {
  showModal.value = false
}

function sendEmail() {
  const mailtoLink = `mailto:maryamr@mail.ru?subject=Сообщение с сайта&body=От: ${form.value.email}%0A%0A${form.value.message}`
  window.location.href = mailtoLink
  closeModal()
}
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

/* Стилизованная кнопка */
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

/* Модальное окно */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal {
  position: relative;
  background: #ffffff;
  padding: 24px 28px;
  border-radius: 12px;
  max-width: 460px;
  width: 90%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  color: #1f2937;
  font-family: 'Inter', sans-serif;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 14px;
  background: transparent;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #1f2937;
  cursor: pointer;
  line-height: 1;
  transition: color 0.3s ease;
}

.modal-close:hover {
  color: #374151;
}

.modal-title {
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  color: #1f2937;
}

.modal label {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
  font-size: 14px;
  color: #1f2937;
}

.modal input,
.modal textarea {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  background: #f9fafb;
  color: #1f2937;
  transition: border 0.3s ease;
}

.modal input:focus,
.modal textarea:focus {
  border-color: #3b82f6;
  outline: none;
}

.modal textarea {
  min-height: 100px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

/* Адаптивные стили */
@media (max-width: 992px) {
  footer {
    padding: 24px 40px;
  }

  .footer-container {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .footer-left,
  .footer-center,
  .footer-right {
    width: 100%;
    max-width: 600px;
    align-items: center;
    text-align: center;
  }

  .footer-left {
    gap: 8px;
  }

  .logo-text {
    width: auto;
    margin-left: 8px;
  }

  .footer-center {
    flex-direction: column;
    gap: 20px;
  }

  .address-block {
    margin-right: 0;
  }

  .footer-item {
    justify-content: center;
    max-width: none;
  }

  .footer-right {
    align-items: center;
  }

  .footer-link {
    font-size: 14px;
  }

  .footer-button {
    width: 100%;
    max-width: 200px;
  }

  .modal {
    width: 85%;
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .footer-item {
    gap: 0.5rem;
  }

  .icon-svg {
    width: 18px;
    height: 18px;
  }

  .text {
    font-size: 14px;
  }

  .footer-button {
    padding: 6px 10px;
  }
}

@media (max-width: 480px) {
  footer {
    padding: 20px 20px;
  }

  .footer-container {
    gap: 20px;
  }

  .footer-left,
  .footer-center,
  .footer-right {
    max-width: 100%;
  }

  .logo img {
    height: 40px;
  }

  .logo-text {
    font-size: 14px;
    margin-left: 6px;
  }

  .copyright {
    font-size: 12px;
  }

  .footer-link {
    font-size: 13px;
  }

  .footer-button {
    max-width: 100%;
    font-size: 13px;
    padding: 8px 10px;
  }

  .footer-item {
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .icon-svg {
    width: 16px;
    height: 16px;
  }

  .modal {
    width: 90%;
    padding: 20px 16px;
  }

  .modal-title {
    font-size: 18px;
  }

  .modal input,
  .modal textarea {
    font-size: 13px;
    padding: 8px;
  }

  .modal-actions {
    margin-top: 10px;
  }
}
</style>