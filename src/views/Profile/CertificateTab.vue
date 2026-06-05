<!-- components/profile/CertificateTab.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const showOrderForm = ref(false)
const selectedPlace = ref('')
const customPlace = ref('')
const isLoading = ref(false)
const successMessage = ref('')

const certificates = ref([
  {
    id: 1,
    place: 'ГУ ПФР РФ',
    status: 'completed',
    statusText: 'Завершено',
    date: '19.09.2024'
  },
  {
    id: 2,
    place: 'Другое',
    customPlace: 'Социальный фонд',
    status: 'pending',
    statusText: 'Не рассмотрено',
    date: '09.03.2025'
  },
  {
    id: 3,
    place: 'Другое',
    customPlace: 'Банк для кредита',
    status: 'pending',
    statusText: 'Не рассмотрено',
    date: '10.03.2025'
  }
])

const places = ['ГУ ПФР РФ', 'Управление социальной защиты', 'Военкомат', 'Банк', 'Другое']

const getPlaceDisplay = (cert: any) => {
  if (cert.place === 'Другое' && cert.customPlace) return cert.customPlace
  return cert.place
}

function orderCertificate() {
  if (!selectedPlace.value) {
    alert('Пожалуйста, выберите место требования')
    return
  }

  isLoading.value = true

  setTimeout(() => {
    certificates.value.unshift({
      id: Date.now(),
      place: selectedPlace.value,
      customPlace: selectedPlace.value === 'Другое' ? customPlace.value : undefined,
      status: 'pending',
      statusText: 'Не рассмотрено',
      date: new Date().toLocaleDateString('ru-RU')
    })

    selectedPlace.value = ''
    customPlace.value = ''
    showOrderForm.value = false
    isLoading.value = false
    successMessage.value = 'Справка успешно заказана'

    setTimeout(() => { successMessage.value = '' }, 3000)
  }, 800)
}

function cancelCertificate(id: number) {
  if (confirm('Вы уверены, что хотите отменить заказ справки?')) {
    certificates.value = certificates.value.filter(c => c.id !== id)
  }
}
</script>

<template>
  <div class="certificate-content">
    <div class="info-card">
      <div class="info-text">
        <strong>Выдача справок</strong> осуществляется по вторникам в 200 аудитории (первый корпус)
      </div>
    </div>

    <div class="order-button-wrapper">
      <button class="order-btn" @click="showOrderForm = true">
        Заказать справку
      </button>
    </div>

    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

    <!-- Модальное окно -->
    <div v-if="showOrderForm" class="modal-overlay" @click="showOrderForm = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Заказ справки</h3>
          <button class="modal-close" @click="showOrderForm = false">×</button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Место требования</label>
            <select v-model="selectedPlace" class="form-select">
              <option value="" disabled>Выберите место требования</option>
              <option v-for="place in places" :key="place" :value="place">{{ place }}</option>
            </select>
          </div>

          <div v-if="selectedPlace === 'Другое'" class="form-group">
            <label class="form-label">Укажите организацию</label>
            <input type="text" v-model="customPlace" class="form-input" placeholder="Например: ООО Ромашка" />
          </div>

          <div class="form-note">
            Выдача справок осуществляется только по вторникам.
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-cancel" @click="showOrderForm = false">Отмена</button>
          <button class="btn-submit" :disabled="isLoading" @click="orderCertificate">
            {{ isLoading ? 'Отправка...' : 'Заказать' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Список справок -->
    <div class="profile-card">
      <div class="card-header">
        <h3>Список заказанных справок</h3>
      </div>

      <div v-if="certificates.length === 0" class="empty-certificates">
        <div class="empty-icon">📄</div>
        <p>У вас нет заказанных справок</p>
      </div>

      <div v-else class="certificates-list">
        <div v-for="cert in certificates" :key="cert.id" class="certificate-item">
          <div class="certificate-info">
            <div class="certificate-place">
              <span class="place-icon"></span>
              <span class="place-name">{{ getPlaceDisplay(cert) }}</span>
            </div>
            <div class="certificate-date">
              <span class="date-icon"></span>
              {{ cert.date }}
            </div>
          </div>

          <div class="certificate-status-wrapper">
            <span :class="['status-badge', cert.status === 'completed' ? 'status-completed' : 'status-pending']">
              {{ cert.statusText }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.certificate-content {
  margin-top: 20px;
}

.info-card {
  background: linear-gradient(135deg, #eef3ff 0%, #e0e9ff 100%);
  border-radius: 20px;
  padding: 16px 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-left: 4px solid #2563eb;
}

.info-text { font-size: 14px; color: #1e3a5f; line-height: 1.4; }
.info-text strong { color: #2563eb; }
.info-text strong { color: #2563eb; }

.order-button-wrapper { margin-bottom: 20px; }

.order-btn {
  width: 100%;
  padding: 14px 20px;
  background: #10b981;
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.order-btn:hover {
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.4); }

.success-message {
  background: #d1fae5;
  color: #059669;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal-content {
  background: white;
  border-radius: 28px;
  width: 90%;
  max-width: 400px;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border-bottom: 1px solid #eef2f6;
}

.modal-header h3 { font-size: 18px; font-weight: 600; color: #1a2c3e; margin: 0; }

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: #f0f4f9;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  color: #6c7a8e;
}

.modal-body { padding: 20px; }
.form-group { margin-bottom: 20px; }

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1a2c3e;
  margin-bottom: 8px;
}

.form-select, .form-input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e0e7ef;
  border-radius: 12px;
  font-size: 14px;
}

.form-select:focus, .form-input:focus {
  outline: none;
  border-color: #2563eb;
}

.form-note {
  font-size: 12px;
  color: #7c8b9c;
  background: #f8fafd;
  padding: 12px;
  border-radius: 12px;
  margin-top: 16px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  background: #f8fafd;
  border-top: 1px solid #eef2f6;
}

.btn-cancel, .btn-submit {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.btn-cancel { background: #f0f4f9; color: #6c7a8e; }
.btn-submit { background: #2563eb; color: white; }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

/* Карточка списка */
.profile-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,.08), 0 2px 8px rgba(0,0,0,.04);
  margin: 20px 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eef2f6;
}

.card-header h3 { font-size: 18px; font-weight: 600; color: #1a2c3e; margin: 0; }


.empty-certificates { text-align: center; padding: 48px 20px; color: #9ca3af; }
.empty-icon { font-size: 48px; margin-bottom: 12px; opacity: 0.6; }

.certificates-list { padding: 8px 0; }

.certificate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f4f9;
}

.certificate-place { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.place-name { font-weight: 600; font-size: 15px; color: #1a2c3e; }
.certificate-date { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #7c8b9c; }
.place-icon, .date-icon { font-size: 14px; opacity: 0.7; }

.certificate-status-wrapper { display: flex; align-items: center; gap: 8px; }

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .certificate-item { flex-direction: column; align-items: flex-start; gap: 12px; }
  .certificate-status-wrapper { width: 100%; justify-content: space-between; }
}
</style>