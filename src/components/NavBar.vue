<template>
  <nav :class="{ scrolled: isScrolled }">
    <div class="logo">马天乐的 AI 网站</div>
    <ul class="nav-links">
      <li v-for="item in links" :key="item.href">
        <a :href="item.href" :class="{ active: activeSection === item.id }">{{ item.label }}</a>
      </li>
    </ul>
    <button class="menu-toggle" @click="menuOpen = !menuOpen">☰</button>
  </nav>

  <!-- Mobile menu -->
  <div class="mobile-menu" :class="{ open: menuOpen }">
    <a v-for="item in links" :key="item.href" :href="item.href" @click="menuOpen = false">{{ item.label }}</a>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const activeSection = ref('hero')
const menuOpen = ref(false)

const links = [
  { href: '#skills',    id: 'skills',    label: '技能' },
  { href: '#portfolio', id: 'portfolio', label: '作品集' },
  { href: '#tools',     id: 'tools',     label: 'AI工具' },
]

function onScroll() {
  isScrolled.value = window.scrollY > 20
  const y = window.scrollY + 120
  const sections = document.querySelectorAll('section[id]')
  sections.forEach(s => {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      activeSection.value = s.id
    }
  })
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 60px;
  background: rgba(254,247,238,0.75);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid transparent;
  transition: all .3s;
}
nav.scrolled {
  background: rgba(254,247,238,0.92);
  border-bottom-color: rgba(249,115,22,0.12);
  box-shadow: 0 2px 24px rgba(249,115,22,0.06);
}
.logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 22px; font-weight: 700;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  letter-spacing: -.5px;
}
.nav-links { display: flex; gap: 36px; list-style: none; }
.nav-links a {
  color: var(--muted); font-size: 14px; font-weight: 500;
  transition: color .3s; letter-spacing: .4px;
}
.nav-links a:hover, .nav-links a.active { color: var(--accent); }
.btn-primary {
  padding: 10px 24px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border-radius: 100px; color: #fff;
  font-size: 13px; font-weight: 600;
  transition: all .3s;
  box-shadow: 0 4px 20px rgba(249,115,22,0.3);
}
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(249,115,22,0.45); }
.nav-cta { white-space: nowrap; }
.menu-toggle {
  display: none;
  background: none; border: none;
  font-size: 22px; cursor: pointer; color: var(--text);
}
.mobile-menu {
  position: fixed; top: 65px; left: 0; right: 0; z-index: 99;
  display: flex; flex-direction: column; gap: 8px;
  padding: 20px 24px;
  background: rgba(254,247,238,0.97);
  border-bottom: 1px solid rgba(249,115,22,0.12);
  backdrop-filter: blur(20px);
  transform: translateY(-20px); opacity: 0; pointer-events: none;
  transition: all .3s;
}
.mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: all; }
.mobile-menu a { padding: 10px 0; color: var(--text); font-weight: 500; border-bottom: 1px solid rgba(249,115,22,0.08); }
.mobile-menu .btn-primary { text-align: center; margin-top: 8px; }

@media (max-width: 768px) {
  nav { padding: 16px 24px; }
  .nav-links, .nav-cta { display: none; }
  .menu-toggle { display: block; }
}
</style>
