<template>
  <canvas ref="canvasRef" class="particle-canvas" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animId = null
let W = 0, H = 0
const particles = []

class FloatCircle {
  constructor(init = false) { this.reset(init) }
  reset(init) {
    this.x = Math.random() * W
    this.y = init ? Math.random() * H : H + 60
    this.r = Math.random() * 60 + 20
    this.vx = (Math.random() - .5) * .3
    this.vy = -(Math.random() * .4 + .15)
    this.alpha = Math.random() * 0.06 + 0.02
    const cols = ['249,115,22','245,158,11','225,29,72','251,113,133','253,186,116']
    this.color = cols[Math.floor(Math.random() * cols.length)]
  }
  update() {
    this.x += this.vx; this.y += this.vy
    if (this.y + this.r < 0) this.reset(false)
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`
    ctx.fill()
  }
}

class Sparkle {
  constructor(init = false) { this.reset(init) }
  reset(init) {
    this.x = Math.random() * W
    this.y = init ? Math.random() * H : H + 10
    this.r = Math.random() * 2.5 + .5
    this.vx = (Math.random() - .5) * .5
    this.vy = -(Math.random() * .6 + .2)
    this.life = Math.random()
    this.spd = Math.random() * .004 + .002
    const cols = ['249,115,22','245,158,11','225,29,72','251,191,36']
    this.color = cols[Math.floor(Math.random() * cols.length)]
  }
  update() {
    this.x += this.vx; this.y += this.vy
    this.life += this.spd
    if (this.life > 1) this.life = 0
    if (this.y + this.r < 0) this.reset(false)
  }
  draw(ctx) {
    const a = Math.sin(this.life * Math.PI) * 0.7
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${this.color},${a})`
    ctx.fill()
  }
}

function init(canvas) {
  W = canvas.width = window.innerWidth
  H = canvas.height = window.innerHeight
  particles.length = 0
  for (let i = 0; i < 18; i++) particles.push(new FloatCircle(true))
  for (let i = 0; i < 80; i++) particles.push(new Sparkle(true))
}

function animate(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, W, H)
  particles.forEach(p => { p.update(); p.draw(ctx) })
  animId = requestAnimationFrame(() => animate(canvas))
}

onMounted(() => {
  const canvas = canvasRef.value
  init(canvas)
  animate(canvas)
  window.addEventListener('resize', () => init(canvas))
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
