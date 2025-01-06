<template>
  <div id="app">
    <AccessibilityBar />
    <ParticleBackground />
    <header>
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
    <footer></footer>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import Navbar from './components/Navbar.vue'

const AccessibilityBar = defineAsyncComponent(() => 
  import('./components/AccessibilityBar.vue')
)
const ParticleBackground = defineAsyncComponent(() => 
  import('./components/ParticleBackground.vue')
)
</script>

<style>
#app {
  min-height: 100vh;
}

.accessibility-bar {
  z-index: 9999;
}

.particle-container {
  z-index: 0;
}
</style>
