<template>
  <section id="hero">
    <!-- Left col -->
    <div class="hero-left">
      <div class="hero-badge">
        <span class="dot" />
        ✦ AI × 创意 × 行动
      </div>

      <h1 class="hero-title">
        <span class="line1">AI 驱动</span>
        <span class="line2">无限可能</span>
      </h1>

      <p class="hero-sub">
        融合人工智能与脑洞大开的创意，打造令人印象深刻的数字体验。
        专注于用最新最好用的AI工具进行提效与内容产出。
      </p>

      <div class="hero-cta">
        <a href="#portfolio" class="btn-primary">查看作品集</a>
        <a href="#tools" class="btn-outline">AI 工具箱</a>
      </div>

      <div class="stats-row">
        <div v-for="s in stats" :key="s.label" class="stat-item">
          <div class="stat-num">{{ s.display }}</div>
          <div class="stat-label">{{ s.label }}</div>
        </div>
      </div>
    </div>

    <!-- Right col -->
    <div class="hero-right">
      <div class="right-inner">

        <!-- cat video card -->
        <div class="video-card">
          <video
            :src="catVideo"
            class="cat-video"
            autoplay muted loop playsinline
          />
          <div class="video-label">
            <span class="video-tag">🐱 Pika · AI 生成</span>
            <span class="video-hint">来~过来~欢迎联系⬇️下方小哥</span>
          </div>
        </div>

        <!-- profile card -->
        <div class="profile-card">
          <div class="avatar">
            <div class="avatar-ring" />
            <div class="avatar-inner">
              <img :src="avatarImg" alt="马天乐" class="avatar-photo" />
            </div>
          </div>
          <div class="profile-info">
            <div class="profile-name">马天乐</div>
            <div class="profile-role">AIGC 工程师</div>
            <div class="profile-tags">
              <span class="ptag">图片</span>
              <span class="ptag">视频</span>
              <span class="ptag">代码编程</span>
              <span class="ptag">工作流</span>
            </div>
          </div>
          <div class="status-dot-wrap">
            <span class="status-dot" />
            <span class="status-text">欢迎联系</span>
          </div>
        </div>

        <!-- skill bars -->
        <div class="skill-list">
          <div class="skill-list-title">核心技能</div>
          <div v-for="s in skills" :key="s.name" class="skill-row">
            <div class="skill-left">
              <span class="skill-dot" :style="{ background: s.color }" />
              <span class="skill-name">{{ s.name }}</span>
            </div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" :style="{ width: s.pct + '%', background: s.color }" />
            </div>
            <span class="skill-pct">{{ s.pct }}%</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import avatarImg from '../assets/头像.png'
import catVideo  from '../assets/pika猫.mp4'

const skills = [
  { name: '文生图',  pct: 95, color: '#f97316' },
  { name: '图生视频', pct: 88, color: '#e11d48' },
  { name: '编程语言JS',    pct: 98, color: '#f59e0b' },
  { name: 'comfy工作流', pct: 90, color: '#fb7185' },
  { name: 'Photoshop', pct: 85, color: '#abcdef' }
]

const stats = reactive([
  { target: 6, display: '0+', label: '年互联网经验' },
  { target: 3,  display: '0+', label: '年 AI 经验' },
  { target: 20, display: '0+', label: 'AI 工具' },
])

onMounted(() => {
  const el = document.getElementById('hero')
  const obs = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return
    stats.forEach(s => {
      let cur = 0
      const step = s.target / 60
      const t = setInterval(() => {
        cur += step
        if (cur >= s.target) { cur = s.target; clearInterval(t) }
        s.display = Math.floor(cur) + '+'
      }, 20)
    })
    obs.disconnect()
  }, { threshold: 0.3 })
  obs.observe(el)
})
</script>

<style scoped>
section {
  position: relative; z-index: 2;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
  padding: 120px 8% 80px;
  max-width: 1400px;
  margin: 0 auto;
}

/* ── LEFT ── */
.hero-left { display: flex; flex-direction: column; }

.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 18px;
  background: rgba(249,115,22,0.10);
  border: 1px solid rgba(249,115,22,0.25);
  border-radius: 100px;
  font-size: 12px; color: var(--accent);
  font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
  margin-bottom: 32px; width: fit-content;
  animation: fadeInUp .8s ease both;
}
.dot {
  width: 6px; height: 6px;
  background: var(--accent); border-radius: 50%;
  animation: pulse 2s infinite;
}

.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(44px, 5.5vw, 90px);
  font-weight: 700; line-height: .95;
  letter-spacing: -3px; margin-bottom: 28px;
  animation: fadeInUp .8s .1s ease both;
}
.line1 { display: block; color: var(--text); }
.line2 {
  display: block;
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 55%, var(--accent3) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-size: 200%;
  animation: gradientShift 5s ease infinite, fadeInUp .8s .2s ease both;
}

.hero-sub {
  font-size: 16px; color: var(--muted);
  line-height: 1.8; margin-bottom: 40px;
  animation: fadeInUp .8s .3s ease both;
  max-width: 480px;
}

.hero-cta {
  display: flex; gap: 14px;
  animation: fadeInUp .8s .4s ease both;
}

.btn-primary {
  padding: 13px 32px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border-radius: 100px; color: #fff;
  font-size: 15px; font-weight: 600;
  transition: all .3s;
  box-shadow: 0 8px 32px rgba(249,115,22,0.35);
  position: relative; overflow: hidden;
}
.btn-primary::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.25), transparent);
  opacity: 0; transition: opacity .3s;
}
.btn-primary:hover::before { opacity: 1; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 48px rgba(249,115,22,0.5); }

.btn-outline {
  padding: 13px 32px;
  background: rgba(255,255,255,0.6);
  border: 1.5px solid rgba(249,115,22,0.3);
  border-radius: 100px; color: var(--accent);
  font-size: 15px; font-weight: 600;
  transition: all .3s; backdrop-filter: blur(8px);
}
.btn-outline:hover { background: rgba(249,115,22,0.08); border-color: var(--accent); }

.stats-row {
  display: flex; gap: 40px; margin-top: 56px;
  animation: fadeInUp .8s .5s ease both;
  flex-wrap: wrap;
}
.stat-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 40px; font-weight: 700;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  line-height: 1;
}
.stat-label { font-size: 12px; color: var(--muted); margin-top: 5px; font-weight: 500; }

/* ── RIGHT ── */
.hero-right {
  display: flex; align-items: center; justify-content: center;
  animation: fadeInUp .8s .35s ease both;
}

.right-inner {
  width: 100%; max-width: 400px;
  display: flex; flex-direction: column; gap: 16px;
}

/* Video card */
.video-card {
  position: relative;
  border-radius: 20px; overflow: hidden;
  border: 1.5px solid rgba(249,115,22,0.14);
  box-shadow: 0 8px 32px rgba(249,115,22,0.10);
  background: #111;
  aspect-ratio: 16/9;
}
.cat-video {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}
.video-label {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 20px 16px 14px;
  background: linear-gradient(to top, rgba(28,10,0,0.72), transparent);
  display: flex; align-items: center; justify-content: space-between;
}
.video-tag {
  font-size: 12px; font-weight: 600; color: #fff;
  background: rgba(249,115,22,0.35);
  border: 1px solid rgba(249,115,22,0.5);
  padding: 3px 10px; border-radius: 100px;
  backdrop-filter: blur(6px);
}
.video-hint {
  font-size: 11px; color: rgba(255,255,255,0.55);
  letter-spacing: .3px;
}

/* Profile card */
.profile-card {
  background: rgba(255,255,255,0.65);
  border: 1.5px solid rgba(249,115,22,0.14);
  border-radius: 20px; padding: 24px;
  backdrop-filter: blur(14px);
  box-shadow: 0 8px 32px rgba(249,115,22,0.08);
  display: flex; flex-direction: column; align-items: center; gap: 14px;
  text-align: center;
}
.avatar {
  position: relative; width: 100px; height: 100px;
}
.avatar-ring {
  position: absolute; inset: -3px; border-radius: 50%;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  padding: 2px;
}
.avatar-inner {
  position: relative; z-index: 1;
  width: 100px; height: 100px; border-radius: 50%;
  background: #fff8f0;
  display: flex; align-items: center; justify-content: center;
  font-size: 32px;
  border: 2px solid #fff;
  overflow: hidden;
}
.avatar-photo {
  width: 100%; height: 100%;
  object-fit: cover; object-position: center;
  border-radius: 50%;
}
.profile-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 20px; font-weight: 700; color: var(--text);
}
.profile-role { font-size: 13px; color: var(--muted); margin-top: -2px; }
.profile-tags { display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-top: 5px; }
.ptag {
  padding: 3px 12px; border-radius: 100px; font-size: 12px; font-weight: 500;
  background: rgba(249,115,22,0.08); border: 1px solid rgba(249,115,22,0.15);
  color: var(--accent);
}
.status-dot-wrap {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--muted);
}
.status-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
  animation: pulse 2s infinite;
}
.status-text { font-weight: 500; color: #16a34a; }

/* Skill bars */
.skill-list {
  background: rgba(255,255,255,0.65);
  border: 1.5px solid rgba(249,115,22,0.12);
  border-radius: 20px; padding: 22px 24px;
  backdrop-filter: blur(14px);
  box-shadow: 0 8px 32px rgba(249,115,22,0.07);
  display: flex; flex-direction: column; gap: 14px;
}
.skill-list-title {
  font-size: 12px; font-weight: 600; color: var(--muted);
  letter-spacing: 1px; text-transform: uppercase; margin-bottom: 2px;
}
.skill-row { display: flex; align-items: center; gap: 12px; }
.skill-left {
  display: flex; align-items: center; gap: 8px;
  width: 96px; flex-shrink: 0;
}
.skill-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }
.skill-name { font-size: 13px; font-weight: 500; color: var(--text); white-space: nowrap; }
.skill-bar-track {
  flex: 1; height: 5px;
  background: rgba(249,115,22,0.10); border-radius: 100px; overflow: hidden;
}
.skill-bar-fill {
  height: 100%; border-radius: 100px; opacity: 0.8;
  transition: width 1.2s cubic-bezier(0.16,1,0.3,1);
}
.skill-pct { font-size: 12px; color: var(--muted); font-weight: 600; width: 32px; text-align: right; flex-shrink: 0; }

@media (max-width: 1024px) {
  section { grid-template-columns: 1fr; padding: 120px 8% 60px; }
  .hero-right { display: none; }
}
@media (max-width: 768px) {
  section { padding: 100px 24px 60px; }
  .stats-row { gap: 24px; }
}
</style>
