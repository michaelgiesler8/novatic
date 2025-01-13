<template>
  <div class="accessibility-widget" :class="{ minimized: isMinimized }">
    <button class="minimize-btn" @click="toggleMenu">
      <i :class="isMinimized ? 'fas fa-universal-access' : 'fas fa-times'"></i>
      <span v-if="!isMinimized">Close</span>
    </button>
    
    <div class="widget-controls" v-show="!isMinimized">
      <button @click="speakOnHighlight = !speakOnHighlight" :class="{ active: speakOnHighlight }">
        <i class="fas fa-highlighter"></i>
        Speak on Highlight
      </button>

      <button @click="speakOnClick = !speakOnClick" :class="{ active: speakOnClick }">
        <i class="fas fa-volume-up"></i>
        Speak on Click
      </button>
      
      <button @click="isGrayscale = !isGrayscale" :class="{ active: isGrayscale }">
        <i class="fas fa-adjust"></i>
        Grayscale
      </button>
      
      <button @click="isInverted = !isInverted" :class="{ active: isInverted }">
        <i class="fas fa-circle-half-stroke"></i>
        Invert Colors
      </button>
      
      <button @click="imagesHidden = !imagesHidden" :class="{ active: imagesHidden }">
        <i class="fas fa-eye-slash"></i>
        Hide Images
      </button>
      
      <button @click="isReadableFont = !isReadableFont" :class="{ active: isReadableFont }">
        <i class="fas fa-font"></i>
        Readable Font
      </button>
      
      <button @click="isLargeText = !isLargeText" :class="{ active: isLargeText }">
        <i class="fas fa-text-height"></i>
        Large Text
      </button>

      <button @click="isHighContrast = !isHighContrast" :class="{ active: isHighContrast }">
        <i class="fas fa-sun"></i>
        High Contrast
      </button>

      <button @click="isSeizureSafe = !isSeizureSafe" :class="{ active: isSeizureSafe }">
        <i class="fas fa-shield-alt"></i>
        Seizure Safe
      </button>

      <button @click="zoomIn" :class="{ active: zoomLevel > 1 }">
        <i class="fas fa-search-plus"></i>
        Zoom In
      </button>

      <button @click="zoomOut" :class="{ active: zoomLevel < 1 }">
        <i class="fas fa-search-minus"></i>
        Zoom Out
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isMinimized = ref(true)
const speakOnClick = ref(false)
const speakOnHighlight = ref(false)
const isGrayscale = ref(false)
const isInverted = ref(false)
const imagesHidden = ref(false)
const isReadableFont = ref(false)
const isLargeText = ref(false)
const isHighContrast = ref(false)
const isSeizureSafe = ref(false)
const zoomLevel = ref(1)

function toggleMenu() {
  isMinimized.value = !isMinimized.value
}

function zoomIn() {
  zoomLevel.value = Math.min(zoomLevel.value + 0.1, 2)
  applyZoom()
}

function zoomOut() {
  zoomLevel.value = Math.max(zoomLevel.value - 0.1, 0.5)
  applyZoom()
}

function applyZoom() {
  document.documentElement.style.zoom = String(zoomLevel.value)
  applyToIframe()
}

const synth = window.speechSynthesis
let speaking = false

function handleSpeakOnClick(event) {
  if (speakOnClick.value && !speaking && event.target?.textContent) {
    speaking = true
    const utterance = new SpeechSynthesisUtterance(event.target.textContent.trim())
    utterance.onend = () => {
      speaking = false
    }
    synth.speak(utterance)
  }
}

function handleTextSelection() {
  if (!speakOnHighlight.value) return
  const selectedText = window.getSelection().toString().trim()
  if (selectedText && !speaking) {
    speaking = true
    const utterance = new SpeechSynthesisUtterance(selectedText)
    utterance.onend = () => {
      speaking = false
    }
    synth.speak(utterance)
  }
}

function applyToIframe() {
  const iframes = document.querySelectorAll('iframe')
  
  iframes.forEach(iframe => {
    if (iframe instanceof HTMLIFrameElement && iframe.contentWindow?.document) {
      try {
        const iframeDoc = iframe.contentWindow.document
        const iframeRoot = iframeDoc.documentElement
        
        Object.assign(iframeRoot.style, {
          filter: document.documentElement.style.filter,
          fontFamily: document.documentElement.style.fontFamily,
          fontSize: document.documentElement.style.fontSize,
          zoom: String(zoomLevel.value)
        })
        
        if (imagesHidden.value) {
          iframeDoc.querySelectorAll('img').forEach(img => {
            img.style.display = 'none'
          })
        }
        
        if (speakOnClick.value) {
          iframeDoc.body.style.cursor = 'help'
          iframeDoc.addEventListener('click', handleSpeakOnClick)
        } else {
          iframeDoc.body.style.cursor = ''
          iframeDoc.removeEventListener('click', handleSpeakOnClick)
        }
      } catch {
        // Silent catch for cross-origin restrictions
      }
    }
  })
}

watch(speakOnClick, (newValue) => {
  document.body.style.cursor = newValue ? 'help' : 'default'
  if (newValue) {
    document.addEventListener('click', handleSpeakOnClick)
  } else {
    document.removeEventListener('click', handleSpeakOnClick)
  }
  applyToIframe()
})

watch([isGrayscale, isInverted, isHighContrast, isSeizureSafe], 
  ([grayscale, inverted, highContrast, seizureSafe]) => {
    let filters = []
    if (grayscale) filters.push('grayscale(1)')
    if (inverted) filters.push('invert(1)')
    if (highContrast) filters.push('contrast(150%)')
    if (seizureSafe) {
      document.body.style.animation = 'none'
      document.querySelectorAll('*').forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.animation = 'none'
        }
      })
    }
    Object.assign(document.documentElement.style, { filter: filters.join(' ') })
    applyToIframe()
})

watch([isReadableFont, isLargeText], ([readable, large]) => {
  Object.assign(document.documentElement.style, {
    fontFamily: readable ? 'OpenDyslexic, Arial, sans-serif' : '',
    fontSize: large ? '120%' : ''
  })
  applyToIframe()
})

watch(imagesHidden, (hidden) => {
  document.querySelectorAll('img').forEach(img => {
    img.style.display = hidden ? 'none' : ''
  })
  applyToIframe()
})

onMounted(() => {
  const observer = new MutationObserver(() => {
    applyToIframe()
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  document.addEventListener('mouseup', handleTextSelection)
})

onUnmounted(() => {
  document.removeEventListener('mouseup', handleTextSelection)
})
</script>

<style scoped>
.accessibility-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  background: #152433;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  width: 33%;
  max-width: 400px;
}

.accessibility-widget.minimized {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  padding: 0;
}

.minimize-btn {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: #CDD72F;
  color: #152433;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.widget-controls {
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
}

button {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

button.active {
  background: #CDD72F;
  color: #152433;
}

button:hover {
  background: rgba(205, 215, 47, 0.2);
}

button i {
  width: 20px;
  text-align: center;
}

.widget-controls::-webkit-scrollbar {
  width: 6px;
}

.widget-controls::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.widget-controls::-webkit-scrollbar-thumb {
  background: #CDD72F;
  border-radius: 3px;
}
</style>
