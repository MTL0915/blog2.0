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
        :class="[`p${idx + 1}`, { clickable: item.clickable }]"
        @mouseenter="item.hovered = true"
        @mouseleave="item.hovered = false"
        @click="item.clickable && openModal(item)"
      >
        <div
          class="portfolio-thumb"
          :style="item.cover ? { backgroundImage: `url(${item.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
        >
          <div class="thumb-glow" />
        </div>
        <div v-if="item.clickable" class="click-hint">
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
  <GenericWorkModal   :visible="genericOpen"       :work="genericWork" @close="genericOpen = false" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useReveal } from '../composables/useReveal'
import { fetchWorks, resolveAsset } from '../api'
import WorkDetailModal   from './WorkDetailModal.vue'
import ElderlyHomeModal  from './ElderlyHomeModal.vue'
import DigitalHumanModal from './DigitalHumanModal.vue'
import PhotoRestoreModal from './PhotoRestoreModal.vue'
import OpenClawModal     from './OpenClawModal.vue'
import GenericWorkModal  from './GenericWorkModal.vue'

useReveal()

const works = ref([])
const loading = ref(true)
const error = ref('')

const lolModalOpen      = ref(false)
const elderlyModalOpen  = ref(false)
const digitalModalOpen  = ref(false)
const photoModalOpen    = ref(false)
const openclawModalOpen = ref(false)

// 通用 Modal
const genericOpen = ref(false)
const genericWork = ref(null)

function openModal(item) {
  // 受保护作品 → 走旧的专属 Modal
  if (item.is_locked && item.modalType) {
    if (item.modalType === 'lol')      lolModalOpen.value = true
    if (item.modalType === 'elderly')  elderlyModalOpen.value = true
    if (item.modalType === 'digital')  digitalModalOpen.value = true
    if (item.modalType === 'photo')    photoModalOpen.value = true
    if (item.modalType === 'openclaw') openclawModalOpen.value = true
    return
  }
  // 通用作品(且有内容) → 走通用 Modal
  if (item.canOpenGeneric) {
    genericWork.value = item
    genericOpen.value = true
  }
}

function pickModalType(title) {
  if (!title) return null
  if (title.includes('英雄联盟'))   return 'lol'
  if (title.includes('适老化'))     return 'elderly'
  if (title.includes('数字人'))     return 'digital'
  if (title.includes('老照片'))     return 'photo'
  if (title.includes('OpenClaw') || title.includes('龙虾')) return 'openclaw'
  return null
}

// 判断通用作品是否值得显示"查看详情"
function hasGenericContent(w) {
  if (Array.isArray(w.modal_blocks) && w.modal_blocks.length > 0) return true
  return false
}

onMounted(async () => {
  try {
    const data = await fetchWorks()
    works.value = data.map(w => {
      const isLocked = !!w.is_locked
      const modalType = isLocked ? pickModalType(w.title) : null
      const canOpenGeneric = !isLocked && hasGenericContent(w)
      return {
        ...w,
        cover: resolveAsset(w.cover_url),
        modalType,
        canOpenGeneric,
        clickable: (isLocked && modalType) || canOpenGeneric,
        hovered: false
      }
    })
  } catch (err) {
    error.value = err.message || '网络错误'
  } finally {
    loading.value = false
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