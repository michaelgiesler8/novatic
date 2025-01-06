<template>
  <div class="demos-page">
    <ParticleBackground />
    <div class="demos-content">
      <div class="header-section">
        <h1>FAQ Tutorials</h1>
        <p class="hero-description">Explore our interactive tutorials to learn how to use the platform effectively</p>
        <div class="search-bar">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search demos..."
          />
        </div>
      </div>

      <div class="demos-grid">
        <template v-if="isLoading">
          <div v-for="n in 6" :key="n" class="demo-item">
            <SkeletonCard />
          </div>
        </template>
        <TransitionGroup
          name="demo-list"
          tag="div"
          class="grid-container"
        >
          <div
            v-for="demo in filteredDemos"
            :key="demo.id"
            class="demo-item"
          >
            <NavatticDemo
              :title="demo.title"
              :description="demo.description"
              :captureUrl="demo.captureUrl"
              :thumbnail="demo.thumbnail"
            />
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { demoService } from '../services/DemoService.js'
import NavatticDemo from '../components/NavatticDemo.vue'
import ParticleBackground from '../components/ParticleBackground.vue'
import Pop from '../utils/Pop.js'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import SkeletonCard from '../components/SkeletonCard.vue'

const route = useRoute()
const isLoaded = ref(false)
const isLoading = ref(true)
const searchQuery = ref('')
const { observer } = useScrollAnimation()

/**
 * An array of category objects, each with an id, label, and value property.
 * These categories are used to filter the demos displayed on the DemoList page.
 /**
 * An array of category objects, each with an id, label, and value property.
 * These categories are used to filter the demos displayed on the DemoList page.
 */

const filteredDemos = computed(() => {
  let filtered = [...AppState.demos]

  if (AppState.activeCategory && AppState.activeCategory !== 'all') {
    filtered = filtered.filter(demo => demo.category === AppState.activeCategory)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(demo =>
      demo.title.toLowerCase().includes(query) ||
      demo.description.toLowerCase().includes(query)
    )
  }

  return filtered
})
watch(() => route.query.category, (newCategory) => {
  const category = newCategory?.toString() || 'all'
  AppState.activeCategory = category
}, { immediate: true })

async function loadPageData() {
  try {
    isLoading.value = true
    await demoService.getDemos()
    await nextTick()
    isLoaded.value = true
  } catch (error) {
    Pop.error(error)
  } finally {
    isLoading.value = false
  }
}

function cleanup() {
  isLoaded.value = false
  AppState.demos = []
  searchQuery.value = ''
  AppState.activeCategory = 'all'
  observer.value?.disconnect()
}

onMounted(async () => {
  await loadPageData()
  setTimeout(() => {
    const cards = document.querySelectorAll('.card-wrapper')
    cards.forEach(card => {
      observer.value?.observe(card)
    })
  }, 100)
})

onUnmounted(() => {
  cleanup()
})
</script>

<style lang="scss" scoped>
.demo-list-move,
.demo-list-enter-active,
.demo-list-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.demo-list-enter-from,
.demo-list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.demo-list-leave-active {
  position: absolute;
}

.demos-page {
  min-height: 100vh;
  padding: 2rem;
}

.demos-content {
  max-width: 1400px;
  margin: 0 auto;
}

.header-section {
  background: linear-gradient(135deg, #0E5480, #152433),
    radial-gradient(circle at top right, rgba(205, 215, 47, 0.2), transparent 50%);
  padding: 4rem 2rem;
  text-align: center;
  border-radius: 16px;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg,
      transparent,
      rgba(205, 215, 47, 0.5),
      transparent
    );
  }

  h1 {
    color: #CDD72F;
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 30px rgba(205, 215, 47, 0.3);
    letter-spacing: -1px;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: #CDD72F;
      border-radius: 2px;
    }
  }

  .hero-description {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.4rem;
    font-weight: 300;
    max-width: 700px;
    margin: 0 auto 3rem;
    line-height: 1.6;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
}

.search-bar {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  
  &::before {
    content: '🔍';
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    opacity: 0.5;
  }
  
  input {
    width: 100%;
    padding: 1.2rem 1.5rem 1.2rem 3.5rem;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-size: 1.1rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: #CDD72F;
      box-shadow: 0 0 20px rgba(205, 215, 47, 0.2);
      transform: translateY(-2px);
    }
  }
}

.demos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
  min-height: 400px;
  
  .grid-container {
    display: contents;
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.demo-grid-move {
  transition: transform 0.4s ease-out;
}

.demo-item {
  height: 100%;
}

@for $i from 1 through 12 {
  .demo-item:nth-child(#{$i}) {
    animation-delay: #{$i * 0.1}s;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
