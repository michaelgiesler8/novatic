import { reactive } from 'vue'

export const AppState = reactive({
  user: {},
  demos: [],
  activeDemo: null,
  activeCategory: 'all'
})

