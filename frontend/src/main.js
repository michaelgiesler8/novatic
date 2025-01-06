import { createApp } from 'vue'
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents.js'
import router from './router'
import axios from 'axios'


import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'

// Configure axios with CORS settings
axios.defaults.withCredentials = true
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

/** @typedef {Object} NavatticEmbed
 * @property {Object} config
 * @property {Function} config.onComplete
 */

/** @type {Window & { NavatticEmbed?: NavatticEmbed }} */
const customWindow = window

const app = createApp(App)
registerGlobalComponents(app)
app.use(router)

// Navattic completion handler
const handleNavatticComplete = () => {
  const demoModals = document.querySelectorAll('.demo-modal')
  demoModals.forEach(modal => {
    modal.classList.add('hidden')
  })
  window.location.replace('/')
}

// Initialize Navattic configuration
customWindow.NavatticEmbed = {
  config: {
    onComplete: handleNavatticComplete
  }
}

app.mount('#app')

// Dynamic script loading for Navattic
const script = document.createElement('script')
script.src = 'https://embed.navattic.com/embed.js'
script.async = true
script.onload = () => {
  customWindow.NavatticEmbed.config.onComplete = handleNavatticComplete
}
document.head.appendChild(script)
