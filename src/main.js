import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createI18n } from 'vue-i18n'
import ru from './locales/ru.json'
import en from './locales/en.json'

const i18n = createI18n({
  locale: 'ru', // язык по умолчанию
  fallbackLocale: 'en',
  messages: {
    ru,
    en,
  },
})

const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')
