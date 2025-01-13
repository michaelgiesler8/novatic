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
import AccessibilityBar from './components/AccessibilityBar.vue'
import ParticleBackground from './components/ParticleBackground.vue'
import Navbar from './components/Navbar.vue'
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

#app {
  font-family: -apple-system, BlinkMacSystemFont, "IBM Plex Sans", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.particle-container {
  opacity: 0.3;
  background: transparent;
}

.accessibility-bar {
  position: fixed;
  top: 4.5rem;
  right: 1rem;
  z-index: 1000;
}

main {
  position: relative;
  z-index: 2;
}
</style>

// Need to check the global styles here
