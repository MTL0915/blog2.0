<template>
  <div id="app-root">
    <!-- Cursor glow -->
    <div class="cursor-glow" :style="{ left: cursor.x + 'px', top: cursor.y + 'px' }" />

    <!-- Particle background -->
    <ParticleCanvas />

    <!-- Layout -->
    <NavBar />
    <main>
      <HeroSection />
      <SiteDivider />
      <SkillsSection />
      <SiteDivider />
      <PortfolioSection />
      <SiteDivider />
      <ToolsSection />
    </main>
    <footer>
      <p>© 2026 马天乐的 AI 网站 — 用 AI 创造更好的数字世界 ✦</p>
    </footer>
  </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'
import ParticleCanvas   from './components/ParticleCanvas.vue'
import NavBar           from './components/NavBar.vue'
import HeroSection      from './components/HeroSection.vue'
import SkillsSection    from './components/SkillsSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import ToolsSection     from './components/ToolsSection.vue'
import SiteDivider      from './components/SiteDivider.vue'

const cursor = reactive({ x: -500, y: -500 })
function onMouseMove(e) { cursor.x = e.clientX; cursor.y = e.clientY }
onMounted(() => window.addEventListener('mousemove', onMouseMove))
onUnmounted(() => window.removeEventListener('mousemove', onMouseMove))
</script>

<style>
#app-root { position: relative; }

.cursor-glow {
  position: fixed; pointer-events: none;
  width: 350px; height: 350px; border-radius: 50%;
  background: radial-gradient(circle, rgba(249,115,22,0.06), transparent 70%);
  transform: translate(-50%, -50%);
  transition: left .25s ease, top .25s ease;
  z-index: 1;
}

footer {
  position: relative; z-index: 2; text-align: center;
  padding: 40px; color: var(--muted); font-size: 13px;
  border-top: 1px solid rgba(249,115,22,0.12);
  background: rgba(254,247,238,0.6);
}
</style>
