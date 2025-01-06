import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./pages/DemoList.vue'),
    props: route => ({ 
      category: route.query.category || 'all',
      search: route.query.search || '' 
    }),
    beforeEnter: (to, from, next) => {
      if (to.query.category) {
        next()
      } else {
        next({ name: 'Home', query: { category: 'all' } })
      }
    }
  },
  {
    path: '/demo/:id',
    name: 'Demo',
    component: () => import('./pages/DemoDetail.vue'),
    props: true,
    meta: { transition: 'slide' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./pages/AboutPage.vue'),
    meta: { transition: 'fade' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { 
      top: 0,
      behavior: 'smooth'
    }
  }
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
