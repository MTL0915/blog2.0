<template>
  <section id="portfolio">
    <div class="section-header reveal">
      <div class="section-tag">精选作品</div>
      <h2 class="section-title">创意<span>作品集</span></h2>
    </div>

    <!-- 加载态 -->
    <div v-if="loading" class="loading-state reveal">
      <div class="loading-spinner"></div>
      <p>正在加载作品...</p>
    </div>

    <!-- 错误态 -->
    <div v-else-if="error" class="error-state reveal">
      <p>⚠️ 加载失败:{{ error }}</p>
    </div>

    <!-- 内容 -->
    <div v-else class="portfolio-grid reveal">
      <div
        v-for="(item, idx) in works"
        :key="item.id"
        class="portfolio-card"
        :class="[`p${idx + 1}`, { clickable: item.modalType }]"
        @mouseenter="item.hovered = true"
        @mouseleave="item.hovered = false"
        @click="item.modalType && openModal(item.modalType)"
      >
        <div
          class="portfolio-thumb"
          :style="item.cover ? { backgroundImage: `url(${item.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
        >
          <div class="thumb-glow" />
        </div>
        <div v-if="item.modalType" class="click-hint">
          <span>查看详情</span>
          <span class="hint-arrow">↗</span>
        </div>
        <div class="portfolio-label">
          <div class="portfolio-label-cat">{{ item.cat }}</div>
          <div class="portfolio-label-title">{{ item.title }}</div>
        </div>
        <Transition name="overlay">
          <div v-if="item.hovered" class="portfolio-overlay">
            <div class="portfolio-cat">{{ item.cat_label }}</div>
            <div class="portfolio-title">{{ item.title }}</div>
            <div class="portfolio-desc">{{ item.description }}</div>
          </div>
        </Transition>
      </div>
    </div>
  </section>

  <WorkDetailModal    :visible="lolModalOpen"      @close="lolModalOpen = false" />
  <ElderlyHomeModal   :visible="elderlyModalOpen"  @close="elderlyModalOpen = false" />
  <DigitalHumanModal  :visible="digitalModalOpen"  @close="digitalModalOpen = false" />
  <PhotoRestoreModal  :visible="photoModalOpen"    @close="photoModalOpen = false" />
  <OpenClawModal      :visible="openclawModalOpen" @close="openclawModalOpen = false" />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useReveal } from '../composables/useReveal'
import { fetchWorks, resolveAsset } from '../api'
import WorkDetailModal   from './WorkDetailModal.vue'
import ElderlyHomeModal  from './ElderlyHomeModal.vue'
import DigitalHumanModal from './DigitalHumanModal.vue'
import PhotoRestoreModal from './PhotoRestoreModal.vue'
import OpenClawModal     from './OpenClawModal.vue'

useReveal()

const works = ref([])
const loading = ref(true)
const error = ref('')

const lolModalOpen      = ref(false)
const elderlyModalOpen  = ref(false)
const digitalModalOpen  = ref(false)
const photoModalOpen    = ref(false)
const openclawModalOpen = ref(false)

function openModal(type) {
  if (type === 'lol')      lolModalOpen.value      = true
  if (type === 'elderly')  elderlyModalOpen.value   = true
  if (type === 'digital')  digitalModalOpen.value   = true
  if (type === 'photo')    photoModalOpen.value     = true
  if (type === 'openclaw') openclawModalOpen.value  = true
}

// 根据作品标题智能匹配旧的 Modal 类型
// 规则:数据库里如果新增的作品,标题没有这些关键词,就不弹窗(将来可以做后台编辑)
function pickModalType(title) {
  if (!title) return null
  if (title.includes('英雄联盟'))   return 'lol'
  if (title.includes('适老化'))     return 'elderly'
  if (title.includes('数字人'))     return 'digital'
  if (title.includes('老照片'))     return 'photo'
  if (title.includes('OpenClaw') || title.includes('龙虾')) return 'openclaw'
  return null
}

onMounted(async () => {
  try {
    const data = await fetchWorks()
    works.value = data.map(w => ({
      ...w,
      cover: resolveAsset(w.cover_url),
      modalType: pickModalType(w.title),
      hovered: false
    }))
  } catch (err) {
    error.value = err.message || '网络错误'
  } finally {
    loading.value = false
    // 数据加载完后,再次触发 reveal 检测(因为新元素是动态插入的)
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

/* 加载/错误态 */
.loading-state, .error-state {
  text-align: center; padding: 80px 20px; color: var(--muted); font-size: 14px;
}
.loading-spinner {
  width: 36px; height: 36px; border: 3px solid rgba(249,115,22,0.15);
  border-top-color: var(--accent); border-radius: 50%;
  animation: spin 0.9s linear infinite; margin: 0 auto 16px;
}
@keyframes spin { to { transform: rotate(360deg); } }

.portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

.portfolio-card {
  border-radius: 22px; overflow: hidden; position: relative;
  aspect-ratio: 4/3; cursor: default;
  transition: transform .4s, box-shadow .4s;
  border: 1.5px solid rgba(249,115,22,0.12);
  box-shadow: 0 4px 24px rgba(249,115,22,0.06);
}
.portfolio-card:first-child { grid-column: span 2; aspect-ratio: 16/9; }
.portfolio-card:hover { transform: scale(1.025); box-shadow: 0 20px 60px rgba(249,115,22,0.2); }
.portfolio-card.clickable { cursor: pointer; }

.click-hint {
  position: absolute; top: 16px; right: 16px; z-index: 5;
  display: flex; align-items: center; gap: 6px;
  padding: 6px 14px;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 100px; backdrop-filter: blur(8px);
  font-size: 12px; font-weight: 600; color: #fff;
  opacity: 0; transform: translateY(-4px);
  transition: all .3s;
}
.hint-arrow { font-size: 14px; }
.portfolio-card.clickable:hover .click-hint { opacity: 1; transform: translateY(0); }

.portfolio-thumb {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  position: relative; overflow: hidden;
}
.p1 .portfolio-thumb { background: #111; }
.p2 .portfolio-thumb { background: linear-gradient(135deg,#fce4ec,#f8bbd0,#f48fb1); }
.p3 .portfolio-thumb { background: linear-gradient(135deg,#e0f2fe,#bae6fd,#7dd3fc); }
.p4 .portfolio-thumb { background: linear-gradient(135deg,#fef3c7,#fde68a,#c4963a); }
.p5 .portfolio-thumb { background: linear-gradient(135deg,#dcfce7,#86efac,#22c55e44); }
.thumb-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4), transparent 70%);
}
.p1 .thumb-glow { background: none; }

.portfolio-label {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 20px 24px;
  background: linear-gradient(to top, rgba(28,10,0,0.55), transparent);
}
.portfolio-label-title { font-size: 16px; font-weight: 600; font-family: 'Space Grotesk',sans-serif; color:#fff; }
.portfolio-label-cat { font-size: 12px; color: var(--accent3); margin-top: 4px; font-weight: 500; }

.portfolio-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(28,10,0,0.88) 0%, rgba(28,10,0,0.3) 55%, transparent 100%);
  display: flex; flex-direction: column; justify-content: flex-end; padding: 28px;
}
.portfolio-cat { font-size: 11px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--accent3); margin-bottom: 8px; }
.portfolio-title { font-size: 20px; font-weight: 700; font-family: 'Space Grotesk',sans-serif; color: #fff; }
.portfolio-desc { font-size: 13px; color: rgba(255,255,255,0.75); margin-top: 6px; line-height: 1.5; }

.overlay-enter-active, .overlay-leave-active { transition: opacity .35s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

.reveal { opacity:0; transform:translateY(36px); transition:opacity .8s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1); }
.reveal.visible { opacity:1; transform:translateY(0); }

@media (max-width: 768px) {
  section { padding: 80px 24px; }
  .portfolio-grid { grid-template-columns: 1fr; }
  .portfolio-card:first-child { grid-column: span 1; }
}
</style>