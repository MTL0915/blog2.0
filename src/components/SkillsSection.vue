<template>
  <section id="skills">
    <div class="section-header reveal">
      <div class="section-tag">专业能力</div>
      <h2 class="section-title">我能做什么 <span>？</span></h2>
    </div>
    <div class="skills-grid">
      <div
        v-for="(skill, i) in skills"
        :key="skill.name"
        class="skill-card reveal"
        :style="{ transitionDelay: i * 80 + 'ms' }"
      >
        <div class="skill-icon" :class="skill.color">{{ skill.icon }}</div>
        <div class="skill-name">{{ skill.name }}</div>
        <div class="skill-desc">{{ skill.desc }}</div>
        <div class="skill-tags">
          <span v-for="tag in skill.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useReveal } from '../composables/useReveal'

useReveal()

const skills = [
  {
    icon: '🎨', name: '图片生成', color: 'orange',
    desc: '文生图、图生图，风格迥异的视觉内容创作，满足多样化设计需求。',
    tags: ['Midjourney', 'Stable Diffusion','ComfyUI', 'Nano Banana'],
  },
  {
    icon: '🤖', name: '视频生成', color: 'rose',
    desc: '借助 Seedance、Sora、Veo3 等工具，将创意快速转化为高质量视频内容。',
    tags: ['Seedance 2.0', 'Sora', 'Veo3'],
  },
  {
    icon: '⚡', name: '编程开发', color: 'amber',
    desc: '有前端工程师基础，熟悉 AI 模型部署和 api 调用,可以使用claude code等编程模型进行快速开发插件。',
    tags: ['JavaScript', 'claude code', 'openclaw 小龙虾'],
  },
  {
    icon: '💡', name: 'AI 产品咨询', color: 'pink',
    desc: '帮助团队制定 AI 工具集成方案，提升工作流效率，降低重复劳动成本。',
    tags: ['工作流设计', 'Prompt 工程', '效率提升'],
  },
]
</script>

<style scoped>
section {
  position: relative; z-index: 2;
  padding: 120px 60px; max-width: 1200px; margin: 0 auto;
}
.section-header { margin-bottom: 64px; }
.section-tag {
  font-size: 12px; color: var(--accent);
  font-weight: 600; letter-spacing: 2px; text-transform: uppercase;
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

.skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }

.skill-card {
  background: var(--glass);
  border: 1.5px solid rgba(249,115,22,0.12);
  border-radius: 22px; padding: 32px;
  position: relative; overflow: hidden;
  transition: all .4s; cursor: default;
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px rgba(249,115,22,0.05);
}
.skill-card::before {
  content:''; position:absolute; inset:0;
  background: linear-gradient(135deg,rgba(249,115,22,0.06),transparent);
  opacity:0; transition:opacity .4s;
}
.skill-card:hover::before { opacity:1; }
.skill-card:hover {
  border-color: rgba(249,115,22,0.35);
  transform: translateY(-5px);
  box-shadow: 0 20px 60px rgba(249,115,22,0.15);
}

.skill-icon {
  width:54px; height:54px; border-radius:16px;
  display:flex; align-items:center; justify-content:center;
  font-size:26px; margin-bottom:20px;
}
.skill-icon.orange { background:rgba(249,115,22,0.12); box-shadow:0 0 20px rgba(249,115,22,0.2); }
.skill-icon.rose   { background:rgba(225,29,72,0.10);  box-shadow:0 0 20px rgba(225,29,72,0.15); }
.skill-icon.amber  { background:rgba(245,158,11,0.12); box-shadow:0 0 20px rgba(245,158,11,0.2); }
.skill-icon.pink   { background:rgba(251,113,133,0.12);box-shadow:0 0 20px rgba(251,113,133,0.2);}

.skill-name { font-size:18px; font-weight:600; margin-bottom:8px; font-family:'Space Grotesk',sans-serif; }
.skill-desc { font-size:14px; color:var(--muted); line-height:1.65; margin-bottom:20px; }
.skill-tags { display:flex; flex-wrap:wrap; gap:8px; }
.tag {
  padding:4px 12px; border-radius:100px; font-size:12px; font-weight:500;
  background:rgba(249,115,22,0.08); border:1px solid rgba(249,115,22,0.15); color:var(--accent);
}

/* reveal animation */
.reveal { opacity:0; transform:translateY(36px); transition:opacity .8s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1); }
.reveal.visible { opacity:1; transform:translateY(0); }

@media (max-width:768px) { section { padding:80px 24px; } }
</style>
