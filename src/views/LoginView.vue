<!-- LoginView.vue -->
<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="title">Личный кабинет студента</h1>

      <input v-model="login" class="input" placeholder="Логин">
      <div v-if="errors.login" class="error">{{ errors.login }}</div>

      <input v-model="password" type="password" class="input" placeholder="Пароль">
      <div v-if="errors.password" class="error">{{ errors.password }}</div>

      <button class="btn" :disabled="isLoading" @click="handleLogin">
        {{ isLoading ? 'Вход...' : 'Войти' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const login = ref('')
const password = ref('')
const isLoading = ref(false)
const errors = ref({})

function handleLogin() {
  errors.value = {}

  if (!login.value) errors.value.login = 'Введите логин'
  if (!password.value) errors.value.password = 'Введите пароль'

  if (errors.value.login || errors.value.password) return

  isLoading.value = true
  setTimeout(() => {
    router.push('/home')
  }, 500)
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f6f8;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow: 0 8px 24px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.04);
}

.title {
  text-align: center;
  margin-bottom: 32px;
  font-size: 24px;
  font-weight: bold;
}

.input {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 8px;
  border: 1px solid #e0e7ef;
  border-radius: 12px;
  font-size: 15px;
  box-sizing: border-box;
}

.input:focus {
  outline: none;
  border-color: #2563eb;
}

.btn {
  width: 100%;
  padding: 14px;
  margin-top: 16px;
  background: #2563eb;
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.6;
}

.error {
  color: #dc2626;
  font-size: 12px;
  margin-bottom: 12px;
  padding-left: 4px;
}
</style>