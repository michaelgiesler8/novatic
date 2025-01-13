<template>
  <div class="tutorial-grid">
    <div class="search-section mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search tutorials..."
        class="search-input"
      />
    </div>
    <div class="grid">
      <div
        v-for="tutorial in filteredTutorials"
        :key="tutorial.id"
        class="tutorial-card"
        @click="openTutorial(tutorial)"
      >
        <div class="image-container">
          <img 
            :src="tutorial.thumbnail" 
            class="card-img-top" 
            :alt="tutorial.title"
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
          <div class="category-tag">{{ tutorial.title }}</div>
          <h3>{{ tutorial.title }}</h3>
          <p>{{ tutorial.description }}</p>
          <div class="card-footer">
            <span class="duration">{{ tutorial.duration }} min</span>
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const tutorials = ref([])
const searchQuery = ref('')
const hasImageError = ref(false)

const filteredTutorials = computed(() => {
  return tutorials.value.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

function openTutorial(tutorial) {
  window.open(tutorial.url, '_blank')
}

function loadDemo() {
  // Demo loading logic here
}

function handleImageError() {
  hasImageError.value = true
}
</script>

<style scoped>
.tutorial-grid {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  background: rgba(255, 255, 255, 0.15);
  outline: none;
  box-shadow: 0 0 0 2px rgba(205, 215, 47, 0.3);
}

.tutorial-card {
  background: linear-gradient(135deg, #152433 0%, #0E5480 100%);
  border: 3px solid #CDD72F;
  box-shadow: 0 4px 12px rgba(12, 85, 129, 0.3);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  position: relative;
  transform: translateZ(0);
  transition: all 0.3s ease;
}

.tutorial-card:hover {
  transform: translateY(-8px);
  border-color: #CDD72F;
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
  background: linear-gradient(180deg, #152433 0%, #0E5480 100%);
  padding: 1.5rem;
}

.category-tag {
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: #CDD72F;
  color: #1E1E1E;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

h3 {
  color: #CDD72F;
  margin: 0 0 0.8rem 0;
  font-size: 1.2rem;
}

p {
  color: #DBDCDD;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #CDD72F;
  font-size: 0.9rem;
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
}

.launch-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(28, 144, 255, 0.3);
}

.overlay-content {
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.image-overlay:hover .overlay-content {
  transform: translateY(0);
}
</style>
