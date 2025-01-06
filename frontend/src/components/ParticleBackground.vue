<template>
  <div class="particle-container">
    <canvas ref="particleCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const particleCanvas = ref(null)
let animationFrame
let ctx
let particles = []

const PARTICLE_COUNT = 80
const CONNECTION_DISTANCE = 150
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = Math.random() * 1.5 + 0.5 // Slightly smaller particles
    this.speedX = Math.random() * 0.3 - 0.15 // Slower movement
    this.speedY = Math.random() * 0.3 - 0.15
    this.opacity = Math.random() * 0.08 + 0.02 // Much more subtle opacity
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    
    if (this.x > window.innerWidth || this.x < 0) this.speedX *= -1
    if (this.y > window.innerHeight || this.y < 0) this.speedY *= -1
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    // Lighter, more theme-appropriate color
    ctx.fillStyle = `rgba(240, 240, 240, ${this.opacity})`
    ctx.fill()
  }
}

function init() {
  const canvas = particleCanvas.value
  if (!canvas) {
    return
  }
  
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx = canvas.getContext('2d')

  particles = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(
      new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    )
  }
}

function connectParticles(particle) {
  particles.forEach(otherParticle => {
    const dx = particle.x - otherParticle.x
    const dy = particle.y - otherParticle.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < CONNECTION_DISTANCE) {
      const opacity = 1 - (distance / CONNECTION_DISTANCE)
      ctx.beginPath()
      ctx.strokeStyle = `rgba(205, 215, 47, ${opacity * 0.2})`
      ctx.lineWidth = 1
      ctx.moveTo(particle.x, particle.y)
      ctx.lineTo(otherParticle.x, otherParticle.y)
      ctx.stroke()
    }
  })
}

function animate() {
  if (!ctx) {
    console.log('No context available')
    return
  }
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  
  particles.forEach(particle => {
    particle.update()
    particle.draw()
    connectParticles(particle)
  })

  animationFrame = requestAnimationFrame(animate)
}

onMounted(() => {
  console.log('Particle background mounted')
  init()
  animate()
  window.addEventListener('resize', init)
})

onUnmounted(() => {
  console.log('Particle background unmounted')
  cancelAnimationFrame(animationFrame)
  window.removeEventListener('resize', init)
})
</script>

<style scoped>
.particle-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  background-color: #000;
}

canvas {
  display: block;
}
</style>
