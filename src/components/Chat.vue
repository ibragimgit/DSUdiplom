<template>
  <div>
    <button class="chat-button" @click="toggleChat">
      <svg
        class="chat-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 11.5C21 16.1944 16.9706 20 12 20C10.5435 20 9.1777 19.665 7.96437 19.0672L3 20L4.02292 15.2441C3.37853 14.0249 3 12.663 3 11.5C3 6.80558 7.02944 3 12 3C16.9706 3 21 6.80558 21 11.5Z"
          stroke="#ffffff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div class="chat-container" v-if="isOpen">
      <div class="chat-header" @click="toggleChat">
        <span>{{ $t('chat.header') }}</span>
        <svg
          class="close-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div class="chat-body" ref="chatBodyRef">
        <div
          v-for="msg in chatHistory"
          :key="msg.id"
          :class="['message', getMessageClass(msg.sender)]"
        >
          <template v-if="msg.sender === 'bot'">
            <strong>{{ $t('chat.bot') }}</strong> {{ msg.text }}
          </template>
          <template v-else-if="msg.sender === 'user'">
            <strong>{{ $t('chat.you') }}</strong> {{ msg.text }}
          </template>
          <template v-else>
            {{ msg.text }}
          </template>
        </div>
      </div>

      <div class="chat-footer">
        <input
          v-model="messageInput"
          class="chat-input"
          :placeholder="$t('chat.inputPlaceholder')"
          @keyup.enter="handleSend"
          :disabled="isSending"
        />
        <button class="chat-send" @click="handleSend" :disabled="isSending">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 21L21 3M21 3H9M21 3V15"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { predefinedAnswers } from '../data/QnA.js'

const isOpen = ref(false)
const messageInput = ref('')
const chatHistory = ref([])
const chatBodyRef = ref(null)
const isSending = ref(false)

const defaultAnswer = 'Извините, я пока не знаю, как на это ответить.'

const getBotAnswer = (text) => {
  const lowerText = text.toLowerCase()
  for (const item of predefinedAnswers) {
    if (item.keywords.some((keyword) => lowerText.includes(keyword))) {
      return item.answer
    }
  }
  return defaultAnswer
}

const getMessageClass = (sender) => (sender === 'bot' ? 'message-bot' : 'message-user')

const handleSend = () => {
  const text = messageInput.value.trim()
  if (!text) return

  chatHistory.value.push({ id: Date.now(), sender: 'user', text })
  messageInput.value = ''
  isSending.value = true

  setTimeout(() => {
    const reply = getBotAnswer(text)
    chatHistory.value.push({ id: Date.now() + 1, sender: 'bot', text: reply })
    isSending.value = false
  }, 500)
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
}

watch(chatHistory, () => {
  nextTick(() => {
    if (chatBodyRef.value) {
      chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight
    }
  })
})
</script>

<style scoped>
/* Ваши стили остаются здесь (скопируйте из предыдущего ответа) */
.chat-container {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 340px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 10px 40px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  overflow: hidden;
  transition:
    transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55),
    opacity 0.3s ease;
  transform: scale(1);
  opacity: 1;
}

.chat-container.v-enter-from,
.chat-container.v-leave-to {
  transform: scale(0.95) translateY(20px);
  opacity: 0;
}

.chat-header {
  background: linear-gradient(135deg, #2a3b5c 0%, #1f2c40 100%);
  color: #ffffff;
  padding: 14px 20px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close-icon {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.chat-header:hover .close-icon {
  transform: rotate(180deg);
  opacity: 0.8;
}

.chat-body {
  padding: 20px;
  max-height: 240px;
  overflow-y: auto;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #1f2937;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.message {
  margin: 0 0 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
  word-wrap: break-word;
}

.message:hover {
  background: #f1f5f9;
}

.message-bot strong {
  font-weight: 600;
  color: #2a3b5c;
}

.message-user {
  background: #e6f0fa;
  text-align: right;
}

.message-user strong {
  font-weight: 600;
  color: #1f2c40;
}

.message-success {
  color: #38c172;
  background: #f0fdf4;
  border-left: 3px solid #38c172;
  font-size: 0.9em;
}
.message-success:hover {
  background: #e6fcf0;
}

.message-error {
  color: #e3342f;
  background: #fef2f2;
  border-left: 3px solid #e3342f;
  font-size: 0.9em;
}
.message-error:hover {
  background: #feebeb;
}

.chat-footer {
  padding: 16px 20px;
  display: flex;
  gap: 12px;
  align-items: center;
  background: #ffffff;
}

.chat-input {
  flex: 1;
  padding: 10px 16px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #f9fafb;
  color: #1f2937;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
.chat-input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.chat-send {
  padding: 10px;
  background: linear-gradient(135deg, #2a3b5c 0%, #1f2c40 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}
.chat-send:disabled {
  background: #adb5bd;
  cursor: not-allowed;
}

.chat-send:not(:disabled):hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(42, 59, 92, 0.2);
}

.chat-send svg {
  transition: transform 0.3s ease;
}

.chat-send:not(:disabled):hover svg {
  transform: translateX(2px);
}

.chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #2a3b5c 0%, #1f2c40 100%);
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  cursor: pointer;
  box-shadow: 0 8px 30px rgba(42, 59, 92, 0.2);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.chat-button:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 40px rgba(42, 59, 92, 0.3);
}

.chat-icon {
  width: 26px;
  height: 26px;
  transition: transform 0.3s ease;
}

.chat-button:hover .chat-icon {
  transform: rotate(15deg);
}
</style>
