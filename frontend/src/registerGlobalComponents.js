import NavatticDemo from './components/NavatticDemo.vue'
import SkeletonCard from './components/SkeletonCard.vue'
import ParticleBackground from './components/ParticleBackground.vue'

export function registerGlobalComponents(app) {
  app.component('NavatticDemo', NavatticDemo)
  app.component('SkeletonCard', SkeletonCard)
  app.component('ParticleBackground', ParticleBackground)
}
