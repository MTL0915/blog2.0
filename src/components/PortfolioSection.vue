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
        @click="item.modal && (modalOpen = true)"
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

  <WorkDetailModal :visible="modalOpen" @close="modalOpen = false" />
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import lolCover from '../assets/英雄联盟-封面.png'
import WorkDetailModal from './WorkDetailModal.vue'

useReveal()

const modalOpen = ref(false)

const works = reactive([
  {
    cls: 'p1', icon: null, cover: lolCover, modal: true,
    cat: 'AI 生成艺术 · 2024', catLabel: 'AI 生成艺术',
    title: '《英雄联盟》系列视觉作品',
    desc: '以英雄联盟世界观为主题创作的系列视觉海报，融合真实人物与游戏角色，呈现史诗对决感。',
    hovered: false,
  },
  {
    cls: 'p2', icon: '🌸',
    cat: 'UI 设计 · 2024', catLabel: 'UI/UX 设计',
    title: 'MedAI 医疗数据平台',
    desc: '为医疗 AI 公司设计的数据可视化 Dashboard，复杂信息清晰呈现。',
    hovered: false,
  },
  {
    cls: 'p3', icon: '🎬',
    cat: 'AI 视频 · 2025', catLabel: 'AI 视频创作',
    title: '品牌宣传片 AI 制作',
    desc: '使用 Sora + Runway 为科技品牌制作的 60s 宣传片，全流程 AI 辅助。',
    hovered: false,
  },
  {
    cls: 'p4', icon: '🤝',
    cat: '产品设计 · 2024', catLabel: '产品设计',
    title: '智能客服 Bot UI',
    desc: '为电商平台设计的 AI 客服界面，NPS 提升 34%。',
    hovered: false,
  },
  {
    cls: 'p5', icon: '📊',
    cat: '数据可视化 · 2025', catLabel: '数据可视化',
    title: '实时 AI 监控看板',
    desc: '企业级 AI 模型运行状态监控系统，支持多模型并行对比。',
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

/* click hint badge */
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
.p3 .portfolio-thumb { background: linear-gradient(135deg,#fff8e1,#ffe082,#ffd54f); }
.p4 .portfolio-thumb { background: linear-gradient(135deg,#fbe9e7,#ffccbc,#ffab91); }
.p5 .portfolio-thumb { background: linear-gradient(135deg,#fff3e0,#ffe0b2,#ffcc80); }
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

/* overlay transition */
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
