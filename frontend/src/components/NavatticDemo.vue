<template>
  <div class="demo-wrapper">
    <div class="demo-card">
      <div class="image-container">
        <img 
          :src="thumbnailUrl" 
          class="card-img-top" 
          :alt="title"
          loading="lazy"
          @error="handleImageError"
        >
        <div class="image-overlay">
          <div class="overlay-content">
            <button @click="loadDemo" class="launch-btn">
              Launch Tutorial
              <span class="btn-glow"></span>
            </button>
          </div>
        </div>
      </div>

      <div class="card-content">
        <h5 class="card-title">{{ title }}</h5>
        <p class="card-text">{{ description }}</p>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDemo" class="demo-modal">
          <div class="modal-overlay" @click="closeDemo"></div>
          <div class="modal-content">
            <div class="modal-header">
              <h4>{{ title }}</h4>
              <button @click="closeDemo" class="close-btn" aria-label="Close demo">
                <span class="close-icon"></span>
              </button>
            </div>
            <iframe 
              v-if="iframeLoaded"
              :src="demoUrl"
              frameborder="0"
              allow="fullscreen"
              class="demo-iframe"
              @load="handleIframeLoad"
            ></iframe>
            <div v-else class="iframe-loader">
              <div class="loader-spinner"></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showDemo = ref(false)
const iframeLoaded = ref(false)
const hasImageError = ref(false)

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  captureUrl: { type: String, required: true },
  thumbnail: { type: String, required: true }
})

const thumbnailUrl = computed(() => {
  return hasImageError.value ? '/path-to-fallback-image.jpg' : props.thumbnail
})

const demoUrl = computed(() => {
  const baseUrl = props.captureUrl
  const redirectUrl = encodeURIComponent('https://admin.insourcetax.com/FAQTutorials')
  return `${baseUrl}?completionRedirect=${redirectUrl}&closeOnComplete=true&utm_source=navattic`
})

function loadDemo() {
  showDemo.value = true
  iframeLoaded.value = true
}

function closeDemo() {
  showDemo.value = false
  iframeLoaded.value = false
}

function handleIframeLoad() {
  // Removed isLoading reference
}

function handleImageError() {
  hasImageError.value = true
}
</script>

<style scoped>
.demo-wrapper {
  height: 100%;
  animation: cardAppear 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.demo-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  transform: translateZ(0);
  
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(205, 215, 47, 0.4);
    
    .image-overlay {
      opacity: 1;
    }
    
    .launch-btn {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.image-container {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(21, 36, 51, 0.85);
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content {
  padding: 1.5rem;
  position: relative;
}

.card-title {
  color: #CDD72F;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.card-text {
  color: #DBDCDD;
  font-size: 0.95rem;
  line-height: 1.5;
  opacity: 0.9;
}

.launch-btn {
  background: #1C90FF;
  border: none;
  padding: 0.8rem 1.5rem;
  color: white;
  border-radius: 25px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
  transform: translateY(20px);
  opacity: 0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(28, 144, 255, 0.3);
  }
}

.demo-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem; 
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(21, 36, 51, 0.95);
}

.modal-content {
  position: relative;
  width: 85%;
  height: 80vh; 
  max-height: 800px; 
  background: #152433;
  border-radius: 12px;
  border: 1px solid rgba(205, 215, 47, 0.1);
  overflow: hidden;
}

.modal-header {
  padding: 1rem;
  background: #0E5480;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(205, 215, 47, 0.1);
}

.close-btn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  padding: 0.5rem;
}

.close-icon {
  display: block;
  width: 20px;
  height: 20px;
  position: relative;
}

.close-icon::before,
.close-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: #CDD72F;
  top: 50%;
  left: 0;
}

.close-icon::before {
  transform: rotate(45deg);
}

.close-icon::after {
  transform: rotate(-45deg);
}

.demo-iframe {
  width: 100%;
  height: calc(100% - 60px);
  background: white;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.iframe-loader {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #152433;
}

.loader-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(205, 215, 47, 0.3);
  border-radius: 50%;
  border-top-color: #CDD72F;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
