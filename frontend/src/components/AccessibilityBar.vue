<template>
  <div class="accessibility-bar">
    <button class="a11y-btn" @click="increaseTextSize" title="Increase text size">
      <span>A+</span>
    </button>
    <button class="a11y-btn" @click="decreaseTextSize" title="Decrease text size">
      <span>A-</span>
    </button>
    <button class="a11y-btn" @click="toggleTextToSpeech" title="Read selected text">
      <span>🔊</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const textSize = ref(16)

const increaseTextSize = () => {
  textSize.value += 2
  document.documentElement.style.fontSize = `${textSize.value}px`
}

const decreaseTextSize = () => {
  if (textSize.value > 12) {
    textSize.value -= 2
    document.documentElement.style.fontSize = `${textSize.value}px`
  }
}

const toggleTextToSpeech = () => {
  const text = document.getSelection()?.toString()
  if (text) {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  }
}
</script>

<style scoped>
.accessibility-bar {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.9);
  padding: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.a11y-btn {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.a11y-btn:hover {
  background: #f5f5f5;
  transform: translateY(-1px);
}
</style>
