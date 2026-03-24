<template>
  <section id="contact">
    <div class="contact-wrapper reveal">
      <div class="hero-badge">
        <span class="dot" />
        ✦ 期待与你合作
      </div>
      <h2 class="contact-title">
        有好项目？<br>
        <span class="gradient-text">一起来聊聊</span>
      </h2>
      <p class="contact-sub">无论是 AI 工具整合、UI 设计还是创意内容，我都很乐意帮助你实现想法。</p>
      <a href="mailto:hello@alex.ai" class="btn-primary">发送邮件 →</a>
      <div class="social-links">
        <a v-for="s in socials" :key="s.label" href="#" class="social-link" :title="s.label">{{ s.icon }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useReveal } from '../composables/useReveal'
useReveal()

const socials = [
  { icon:'🐙', label:'GitHub' },
  { icon:'🐦', label:'Twitter' },
  { icon:'💼', label:'LinkedIn' },
  { icon:'💬', label:'微信' },
  { icon:'📖', label:'小红书' },
]
</script>

<style scoped>
section {
  position: relative; z-index: 2;
  padding: 120px 60px; max-width: 1200px; margin: 0 auto;
}

.contact-wrapper {
  background: linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,243,220,0.8));
  border: 1.5px solid rgba(249,115,22,0.18);
  border-radius: 28px; padding: 80px;
  text-align: center; position: relative; overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 60px rgba(249,115,22,0.10);
}
.contact-wrapper::before {
  content:''; position:absolute; top:-120px; left:50%; transform:translateX(-50%);
  width:600px; height:350px;
  background: radial-gradient(ellipse, rgba(249,115,22,0.10), transparent 70%);
  pointer-events:none;
}

.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 18px;
  background: rgba(249,115,22,0.10); border: 1px solid rgba(249,115,22,0.25);
  border-radius: 100px; font-size: 12px; color: var(--accent);
  font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
  margin: 0 auto 32px; width: fit-content;
}
.dot { width:6px; height:6px; background:var(--accent); border-radius:50%; animation:pulse 2s infinite; }

.contact-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 52px; font-weight: 700;
  letter-spacing: -2px; margin-bottom: 20px; color: var(--text);
}
.gradient-text {
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.contact-sub { font-size: 18px; color: var(--muted); margin-bottom: 40px; }

.btn-primary {
  display: inline-block;
  padding: 16px 40px;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  border-radius: 100px; color: #fff;
  font-size: 16px; font-weight: 600;
  transition: all .3s; position: relative; overflow: hidden;
  box-shadow: 0 8px 32px rgba(249,115,22,0.35);
}
.btn-primary::before {
  content:''; position:absolute; inset:0;
  background: linear-gradient(135deg, rgba(255,255,255,0.25), transparent);
  opacity:0; transition:opacity .3s;
}
.btn-primary:hover::before { opacity:1; }
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 14px 48px rgba(249,115,22,0.5); }

.social-links { display:flex; gap:14px; justify-content:center; margin-top:48px; }
.social-link {
  width:48px; height:48px; border-radius:14px;
  background: rgba(255,255,255,0.7); border:1.5px solid rgba(249,115,22,0.15);
  display:flex; align-items:center; justify-content:center;
  font-size:20px; transition:all .3s;
}
.social-link:hover { background:rgba(249,115,22,0.1); border-color:var(--accent); transform:translateY(-3px); }

.reveal { opacity:0; transform:translateY(36px); transition:opacity .8s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1); }
.reveal.visible { opacity:1; transform:translateY(0); }

@media (max-width:768px) {
  section { padding:80px 24px; }
  .contact-wrapper { padding:40px 24px; }
  .contact-title { font-size:36px; }
}
</style>
