<template>
  <section id="portfolio">
    <div class="section-header reveal">
      <div class="section-tag">精选作品</div>
      <h2 class="section-title">创意<span>作品集</span></h2>
    </div>
    <div class="portfolio-grid reveal">
      <div
        v-for="item in works"
        :key="item.title"
        class="portfolio-card"
        :class="[item.cls, { clickable: item.modal }]"
        @mouseenter="item.hovered = true"
        @mouseleave="item.hovered = false"
        @click="item.modal && openModal(item.modalType)"
      >
        <div
          class="portfolio-thumb"
          :style="item.cover ? { backgroundImage: `url(${item.cover})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
        >
          <div class="thumb-glow" />
          <div v-if="item.icon" class="thumb-icon">{{ item.icon }}</div>
        </div>
        <!-- click hint for modal cards -->
        <div v-if="item.modal" class="click-hint">
          <span>查看详情</span>
          <span class="hint-arrow">↗</span>
        </div>
        <div class="portfolio-label">
          <div class="portfolio-label-cat">{{ item.cat }}</div>
          <div class="portfolio-label-title">{{ item.title }}</div>
        </div>
        <Transition name="overlay">
          <div v-if="item.hovered" class="portfolio-overlay">
            <div class="portfolio-cat">{{ item.catLabel }}</div>
            <div class="portfolio-title">{{ item.title }}</div>
            <div class="portfolio-desc">{{ item.desc }}</div>
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
import { reactive, ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import lolCover     from '../assets/英雄联盟-封面.png'
import elderlyCover from '../assets/适老化家居-封面.png'
import jingtianCover from '../assets/景田-封面.jpg'
import oldPhotoCover from '../assets/老照片-封面.png'
import openclawCover from '../assets/龙虾-封面.png'
import WorkDetailModal   from './WorkDetailModal.vue'
import ElderlyHomeModal  from './ElderlyHomeModal.vue'
import DigitalHumanModal from './DigitalHumanModal.vue'
import PhotoRestoreModal from './PhotoRestoreModal.vue'
import OpenClawModal     from './OpenClawModal.vue'

useReveal()

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

const works = reactive([
  {
    cls: 'p1', icon: null, cover: lolCover, modal: true, modalType: 'lol',
    cat: 'AI 生成艺术 · 2026', catLabel: 'AI 视频',
    title: '《英雄联盟》系列视觉作品',
    desc: '以英雄联盟世界观为主题创作的系列视觉海报，融合真实人物与游戏角色，呈现史诗对决感。',
    hovered: false,
  },
  {
    cls: 'p2', icon: null, cover: elderlyCover, modal: true, modalType: 'elderly',
    cat: 'AI 落地案例', catLabel: '图片设计',
    title: '适老化家居配图讲解',
    desc: '为适老化家居场景设计的配套图文物料，从画风固定到 AI 生图再到样板间落地。',
    hovered: false,
  },
  {
    cls: 'p3', icon: null,cover: jingtianCover, modal: true, modalType: 'digital',
    cat: 'AI 数字人 · 2026', catLabel: 'AI 带货视频',
    title: 'AI 数字人带货视频',
    desc: '借助「即创」数字人工具 + ChatGPT/Kimi 脚本 + 寻鱼素材，智能生成口型对准的带货视频。',
    hovered: false,
  },
  {
    cls: 'p4', icon: null,cover: oldPhotoCover, modal: true, modalType: 'photo',
    cat: 'AI 修复 · 2026', catLabel: 'AI 老照片修复',
    title: 'AI 老照片高清修复',
    desc: '以 ComfyUI 工作流为主、PS 为辅，高清放大修复老照片，可配合 AI 视频实现商业变现。',
    hovered: false,
  },
  {
    cls: 'p5', icon: null,cover: openclawCover, modal: true, modalType: 'openclaw',
    cat: 'AI 自动化 · 2026', catLabel: 'AI 远程操控',
    title: '养龙虾 OpenClaw',
    desc: '腾讯云部署 OpenClaw，通过 QQ 聊天远程操控电脑，多 Skills 组合完成复杂自动化任务。',
    hovered: false,
  },
])
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
.thumb-icon { font-size: 64px; position: relative; z-index: 1; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15)); }

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
