<template>
  <section id="tools">
    <div class="section-header reveal">
      <div class="section-tag">工具生态</div>
      <h2 class="section-title">常用 <span>AI 工具</span></h2>
    </div>

    <div v-if="loading" class="loading-state reveal">
      <div class="loading-spinner"></div>
      <p>正在加载工具...</p>
    </div>

    <div v-else-if="error" class="error-state reveal">
      <p>⚠️ 加载失败:{{ error }}</p>
    </div>

    <div v-else class="tools-grid reveal">
      <a
        v-for="tool in tools"
        :key="tool.id"
        :href="tool.url"
        target="_blank"
        rel="noopener noreferrer"
        class="tool-card"
        :style="{ '--c': tool.color }"
      >
        <div class="tool-logo">{{ tool.logo }}</div>
        <div class="tool-name">{{ tool.name }}</div>
        <div class="tool-desc">{{ tool.description }}</div>
        <span
          v-if="tool.tag"
          class="tool-tag"
          :style="{ background: tool.color + '18', color: tool.color, border: '1px solid ' + tool.color + '33' }"
        >
          {{ tool.tag }}
        </span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useReveal } from '../composables/useReveal'
import { fetchTools } from '../api'

useReveal()

const tools = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    tools.value = await fetchTools()
  } catch (err) {
    error.value = err.message || '网络错误'
  } finally {
    loading.value = false
    await nextTick()
    window.dispatchEvent(new Event('scroll'))
  }
})
</script>

<style scoped>
section {
  position: relative; z-index: 2;
  padding: 120px 60px; max-width: 1200px; margin: 0 auto;
}
.section-header { margin-bottom: 64px; }
.section-tag {
  font-size: 12px; color: var(--accent); font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
  margin-bottom: 16px; display: flex; align-items: center; gap: 12px;
}
.section-tag::before { content:''; width:32px; height:1.5px; background:var(--accent); border-radius:1px; }
.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(32px, 4vw, 52px); font-weight: 700;
  letter-spacing: -1.5px; line-height: 1.1;
}
.section-title span {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}

.loading-state, .error-state {
  text-align: center; padding: 60px 20px; color: var(--muted); font-size: 14px;
}
.loading-spinner {
  width: 36px; height: 36px; border: 3px solid rgba(249,115,22,0.15);
  border-top-color: var(--accent); border-radius: 50%;
  animation: spin 0.9s linear infinite; margin: 0 auto 16px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 16px; }

.tool-card {
  background: rgba(255,255,255,0.65);
  border: 1.5px solid rgba(249,115,22,0.12);
  border-radius: 18px; padding: 24px 20px;
  color: var(--text);
  transition: all .3s; position: relative; overflow: hidden;
  display: flex; flex-direction: column; gap: 12px;
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 16px rgba(249,115,22,0.05);
}
.tool-card::before {
  content:''; position: absolute; top:0; left:0; right:0; height:2px;
  background: linear-gradient(90deg, transparent, var(--c), transparent);
  opacity: 0; transition: opacity .3s;
}
.tool-card:hover::before { opacity: 1; }
.tool-card:hover {
  transform: translateY(-5px);
  border-color: rgba(249,115,22,0.28);
  box-shadow: 0 16px 50px rgba(249,115,22,0.15);
  background: rgba(255,255,255,0.9);
}

.tool-logo { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:22px; background:rgba(249,115,22,0.08); }
.tool-name { font-size:15px; font-weight:600; font-family:'Space Grotesk',sans-serif; }
.tool-desc { font-size:12px; color:var(--muted); line-height:1.55; flex:1; }
.tool-tag { display:inline-block; padding:3px 10px; border-radius:100px; font-size:11px; font-weight:600; width:fit-content; letter-spacing:.5px; }

.reveal { opacity:0; transform:translateY(36px); transition:opacity .8s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1); }
.reveal.visible { opacity:1; transform:translateY(0); }

@media (max-width:768px) { section { padding:80px 24px; } }
</style>