import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const observedElements = ref<Element[]>([])
  const observer = ref<IntersectionObserver | null>(null)

  const initObserver = () => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.value?.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    })
  }

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return {
    observer,
    observedElements
  }
}
