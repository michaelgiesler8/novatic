<template>
  <div v-if="demo" class="bg-white rounded-lg shadow-md p-6">
    <h1 class="text-2xl font-bold mb-4">{{ demo.title }}</h1>
    <div class="prose max-w-none" v-html="demo.content" />
    <div class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Demo Instance</h2>
      <iframe
        :src="`${demo.demoUrl}?completionRedirect=/`"
        class="w-full h-96 border-2 border-gray-200 rounded"
        :title="demo.title"
      />
    </div>
  </div>
  <div v-else-if="loading" class="text-center">
    Loading...
  </div>
  <div v-else class="text-center">
    Demo not found
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { demoHandler } from '../handlers/DemoHandler'

const route = useRoute()
const demo = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    await demoHandler.getDemoById(route.params.id)
    demo.value = AppState.activeDemo
  } catch {
    // implementation without unused error variable
  } finally {
    loading.value = false
  }
})
</script>

// Remove or replace console.log on line 37
