<template>
  <div class="nav-wrapper fixed-top">
    <div class="top-spacing"></div>
    <nav class="navbar px-4 pe-5">
      <div class="container-fluid">
        <a href="https://admin.insourcetax.com/#/management/individuals/list">
          <img alt="logo" src="@/assets/img/insourcelogo.png" height="45" />
        </a>
        <div class="d-flex align-items-center">
          <button class="nav-btn" @click="setCategory('all')" :class="{ active: activeCategory === 'all' }">
            All Tutorials
          </button>
          <button class="nav-btn" @click="setCategory('getting-started')" :class="{ active: activeCategory === 'getting-started' }">
            Getting Started
          </button>
          <button class="nav-btn" @click="setCategory('tax-forms')" :class="{ active: activeCategory === 'tax-forms' }">
            Tax Forms
          </button>
          <button class="nav-btn" @click="setCategory('payroll')" :class="{ active: activeCategory === 'payroll' }">
            Payroll
          </button>
          <button class="nav-btn" @click="setCategory('reports')" :class="{ active: activeCategory === 'reports' }">
            Reports
          </button>
          <button class="nav-btn" @click="setCategory('account')" :class="{ active: activeCategory === 'account' }">
            Account
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { AppState } from '../AppState'

const router = useRouter()
const route = useRoute()
const activeCategory = ref('all')

function setCategory(category) {
  activeCategory.value = category
  AppState.activeCategory = category
  
  router.replace({ 
    path: '/',
    query: { category }
  }).then(() => {
    // Type-safe window access
    const customWindow = /** @type {any} */ (window)
    customWindow.refreshData?.()
  })
}




watch(() => route.query.category, (newCategory) => {
  activeCategory.value = newCategory?.toString() || 'all'
}, { immediate: true })
</script>






<style scoped>
.nav-wrapper {
  background: linear-gradient(90deg, #1E1E1E 0%, #2A2A2A 50%, #1E1E1E 100%);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);
  border-bottom: 1px solid rgba(205, 215, 47, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1030;
}

.top-spacing {
  height: 25px;
}

.navbar {
  height: 75px;
  padding-right: 40px !important;
}

.container-fluid {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-btn {
  background: #CDD72F;
  border: none;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: clamp(0.7rem, 1vw, 0.85rem);
  text-transform: uppercase;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  margin-left: 12px;
  height: 35px;
}

.nav-btn:hover {
  background: #d4de3a;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(205, 215, 47, 0.2);
}

.nav-btn.active {
  background: #d4de3a;
  box-shadow: 0 0 0 2px white;
  transform: translateY(-1px);
}

@media (max-width: 1200px) {
  .nav-btn {
    padding: 0.35rem 0.7rem;
    margin-left: 8px;
  }
}

@media (max-width: 992px) {
  .nav-btn {
    padding: 0.3rem 0.6rem;
    margin-left: 6px;
  }
}

@media (max-width: 768px) {
  .nav-btn {
    font-size: 0.7rem;
    padding: 0.3rem 0.5rem;
    margin-left: 4px;
    height: 30px;
  }
  
  .navbar {
    padding-right: 15px !important;
  }
}

@media (max-width: 576px) {
  .nav-btn {
    font-size: 0.65rem;
    padding: 0.25rem 0.4rem;
    margin-left: 3px;
    height: 28px;
  }
}

@media (max-width: 400px) {
  .nav-btn {
    font-size: 0.6rem;
    padding: 0.2rem 0.3rem;
    margin-left: 2px;
    height: 26px;
  }
}

</style>
