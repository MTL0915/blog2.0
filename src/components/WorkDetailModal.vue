<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal-panel">

          <!-- Close -->
          <button class="close-btn" @click="$emit('close')">✕</button>

          <!-- ── Hero video ── -->
          <div class="modal-hero">
            <video
              ref="videoRef"
              class="hero-video"
              :src="mp4"
              autoplay
              muted
              loop
              playsinline
            />
            <div class="hero-overlay" />
            <div class="hero-meta">
              <span class="hero-cat">AI 视频创作</span>
              <h2 class="hero-title">《英雄联盟》系列视觉作品</h2>
              <p class="hero-sub">Arena Night: Rivalry of Runeterra</p>
            </div>
          </div>

          <!-- ── Body ── -->
          <div class="modal-body">

            <!-- 制作流程标题 -->
            <div class="body-header">
              <div class="section-tag">制作流程</div>
              <h3 class="body-title">从一张照片到史诗级电影海报</h3>
              <p class="body-desc">
                将两张普通的人物照片，借助 <strong>Google Gemini</strong> 的多模态理解能力与
                <strong>Seedance</strong> 的视频生成技术，转化为一部充满游戏感与电影质感的创意短片。
              </p>
            </div>

            <!-- 步骤流程 -->
            <div class="steps">
              <!-- Step 1 -->
              <div class="step">
                <div class="step-num">01</div>
                <div class="step-content">
                  <div class="step-title">素材准备 · 人物照片</div>
                  <div class="step-desc">选取两张真实人物照片作为基础素材，分别扮演「对立双方」的角色原型，为后续 AI 理解提供视觉锚点。</div>
                  <div class="people-row">
                    <div class="people-card">
                      <img :src="p01" alt="people01" />
                      <div class="people-label">
                        <span class="people-role">蓝方阵营</span>
                        <span class="people-name">People 01</span>
                      </div>
                    </div>
                    <div class="arrow">→</div>
                    <div class="people-card">
                      <img :src="p02" alt="people02" />
                      <div class="people-label">
                        <span class="people-role">红方阵营</span>
                        <span class="people-name">People 02</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="step">
                <div class="step-num">02</div>
                <div class="step-content">
                  <div class="step-title">Gemini · 场景理解与 Prompt 生成</div>
                  <div class="step-desc">将两张人物图片同时输入 Google Gemini，描述英雄联盟「擂台之夜」的叙事背景，由 Gemini 输出高质量的视频生成 Prompt，包含构图、光效、角色动作等细节指令。</div>
                  <div class="prompt-box">
                    <div class="prompt-header">
                      <span class="prompt-dot g" /><span class="prompt-dot g" /><span class="prompt-dot g" />
                      <span class="prompt-model">Gemini 2.0 Flash</span>
                    </div>
                    <div class="prompt-text">
                      "Two men facing each other in a boxing ring under dramatic spotlight. Left figure wearing glasses with blue energy glow in eyes, right figure with orange/red energy. League of Legends champions emerging from shadows behind them. Cinematic film poster style, dark atmospheric background, crowd silhouettes, epic tension…"
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="step">
                <div class="step-num">03</div>
                <div class="step-content">
                  <div class="step-title">Seedance · AI 视频生成</div>
                  <div class="step-desc">将 Gemini 生成的 Prompt 与原始人物照片一同输入 <strong>Seedance</strong> 视频模型，通过 Image-to-Video 技术，生成兼具真人质感与游戏视觉风格的创意视频。</div>
                  <div class="tool-badges">
                    <div class="tool-badge">
                      <span class="badge-icon">🎬</span>
                      <div>
                        <div class="badge-name">Seedance</div>
                        <div class="badge-sub">Image to Video</div>
                      </div>
                    </div>
                    <div class="tool-badge">
                      <span class="badge-icon">✨</span>
                      <div>
                        <div class="badge-name">Google Gemini</div>
                        <div class="badge-sub">Prompt Engineering</div>
                      </div>
                    </div>
                    <div class="tool-badge">
                      <span class="badge-icon">🎮</span>
                      <div>
                        <div class="badge-name">League of Legends</div>
                        <div class="badge-sub">Visual Reference</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="step">
                <div class="step-num">04</div>
                <div class="step-content">
                  <div class="step-title">最终成片</div>
                  <div class="step-desc">生成完成的英雄联盟主题视频，真实人物与游戏角色完美融合，电影级光影与构图，全流程无需传统拍摄，仅用 AI 工具链完成。</div>
                  <div class="final-video-wrap">
                    <video
                      class="final-video"
                      :src="mp4"
                      controls
                      playsinline
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- 工具总结 -->
            <div class="summary-bar">
              <div class="summary-item">
                <div class="summary-num">2</div>
                <div class="summary-label">张原始照片</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">2</div>
                <div class="summary-label">个 AI 工具</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">0</div>
                <div class="summary-label">传统拍摄</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">∞</div>
                <div class="summary-label">创意可能性</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import p01 from '../assets/people01.jpg'
import p02 from '../assets/people02.png'
import mp4 from '../assets/英雄联盟.mp4'

const props = defineProps({ visible: Boolean })
defineEmits(['close'])

// Lock body scroll when modal is open
watch(() => props.visible, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<style scoped>
/* ── Backdrop ── */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(28, 10, 0, 0.7);
  backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}

/* ── Panel ── */
.modal-panel {
  position: relative;
  width: 100%; max-width: 860px;
  max-height: 90vh;
  background: #fffaf4;
  border-radius: 28px;
  overflow: hidden;
  overflow-y: auto;
  box-shadow: 0 40px 120px rgba(249,115,22,0.25), 0 0 0 1px rgba(249,115,22,0.12);
  scrollbar-width: thin;
  scrollbar-color: rgba(249,115,22,0.3) transparent;
}
.modal-panel::-webkit-scrollbar { width: 4px; }
.modal-panel::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.3); border-radius:2px; }

/* ── Close ── */
.close-btn {
  position: sticky; top: 16px; left: 100%;
  float: right; margin: 16px 16px -48px 0;
  width: 40px; height: 40px; border-radius: 50%;
  border: 1.5px solid rgba(249,115,22,0.2);
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(8px);
  color: var(--muted); font-size: 14px;
  cursor: pointer; z-index: 10;
  transition: all .2s;
  display: flex; align-items: center; justify-content: center;
}
.close-btn:hover { background: var(--accent); color: #fff; border-color: var(--accent); transform: rotate(90deg); }

/* ── Hero video ── */
.modal-hero {
  position: relative; width: 100%;
  aspect-ratio: 16/9; overflow: hidden;
}
.hero-video {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(28,10,0,0.85) 0%, rgba(28,10,0,0.1) 50%, transparent 100%);
}
.hero-meta {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 32px 36px;
}
.hero-cat {
  display: inline-block;
  padding: 4px 14px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  background: rgba(249,115,22,0.3); border: 1px solid rgba(249,115,22,0.5);
  color: #ffd0a8; margin-bottom: 10px;
}
.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 32px; font-weight: 700; color: #fff;
  letter-spacing: -1px; margin-bottom: 6px;
}
.hero-sub { font-size: 14px; color: rgba(255,255,255,0.6); font-weight: 400; letter-spacing: 1px; }

/* ── Body ── */
.modal-body { padding: 40px 40px 48px; }

.body-header { margin-bottom: 48px; }
.section-tag {
  font-size: 11px; color: var(--accent); font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.section-tag::before { content:''; width:24px; height:1.5px; background:var(--accent); border-radius:1px; }
.body-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 26px; font-weight: 700; color: var(--text);
  letter-spacing: -.8px; margin-bottom: 12px;
}
.body-desc { font-size: 15px; color: var(--muted); line-height: 1.75; }
.body-desc strong { color: var(--accent); font-weight: 600; }

/* ── Steps ── */
.steps { display: flex; flex-direction: column; gap: 48px; }

.step { display: flex; gap: 24px; }
.step-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 48px; font-weight: 700; line-height: 1;
  background: linear-gradient(135deg, rgba(249,115,22,0.15), rgba(225,29,72,0.08));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  min-width: 56px; padding-top: 2px;
  flex-shrink: 0;
}
.step-content { flex: 1; }
.step-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 17px; font-weight: 700; color: var(--text);
  margin-bottom: 10px;
}
.step-desc { font-size: 14px; color: var(--muted); line-height: 1.7; margin-bottom: 20px; }
.step-desc strong { color: var(--accent); font-weight: 600; }

/* ── People row ── */
.people-row {
  display: flex; align-items: center; gap: 16px;
}
.people-card {
  flex: 1; border-radius: 16px; overflow: hidden;
  border: 1.5px solid rgba(249,115,22,0.15);
  background: #fff;
  box-shadow: 0 4px 20px rgba(249,115,22,0.08);
  transition: transform .3s, box-shadow .3s;
}
.people-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(249,115,22,0.18); }
.people-card img {
  width: 100%; aspect-ratio: 3/4;
  object-fit: cover; object-position: top;
  display: block;
}
.people-label {
  padding: 12px 14px;
  display: flex; flex-direction: column; gap: 2px;
}
.people-role { font-size: 11px; color: var(--accent); font-weight: 600; letter-spacing: 1px; text-transform: uppercase; }
.people-name { font-size: 14px; font-weight: 600; color: var(--text); font-family: 'Space Grotesk', sans-serif; }

.arrow {
  font-size: 28px; color: var(--accent); font-weight: 300;
  flex-shrink: 0;
}

/* ── Prompt box ── */
.prompt-box {
  background: #1c0a00;
  border-radius: 14px; overflow: hidden;
  border: 1px solid rgba(249,115,22,0.2);
}
.prompt-header {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 16px;
  background: rgba(255,255,255,0.04);
  border-bottom: 1px solid rgba(249,115,22,0.1);
}
.prompt-dot {
  width: 10px; height: 10px; border-radius: 50%;
}
.prompt-dot.g:nth-child(1) { background: #ef4444; }
.prompt-dot.g:nth-child(2) { background: #f59e0b; }
.prompt-dot.g:nth-child(3) { background: #10b981; }
.prompt-model {
  margin-left: auto; font-size: 11px;
  color: rgba(255,255,255,0.35); font-weight: 500; letter-spacing: .5px;
}
.prompt-text {
  padding: 16px 20px;
  font-size: 13px; line-height: 1.8;
  color: rgba(255,220,180,0.85);
  font-family: 'SF Mono', 'Fira Code', monospace;
  white-space: pre-wrap;
}

/* ── Tool badges ── */
.tool-badges { display: flex; flex-wrap: wrap; gap: 12px; }
.tool-badge {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 18px;
  background: rgba(255,255,255,0.7);
  border: 1.5px solid rgba(249,115,22,0.15);
  border-radius: 14px;
  backdrop-filter: blur(8px);
  transition: all .3s;
}
.tool-badge:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(249,115,22,0.15); }
.badge-icon { font-size: 24px; }
.badge-name { font-size: 14px; font-weight: 600; color: var(--text); font-family: 'Space Grotesk',sans-serif; }
.badge-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }

/* ── Final video ── */
.final-video-wrap {
  border-radius: 16px; overflow: hidden;
  border: 1.5px solid rgba(249,115,22,0.15);
  box-shadow: 0 8px 40px rgba(249,115,22,0.12);
}
.final-video { width: 100%; display: block; }

/* ── Summary bar ── */
.summary-bar {
  display: flex; align-items: center; justify-content: space-around;
  margin-top: 48px; padding: 28px 32px;
  background: linear-gradient(135deg, rgba(249,115,22,0.06), rgba(225,29,72,0.04));
  border: 1.5px solid rgba(249,115,22,0.15);
  border-radius: 20px;
}
.summary-item { text-align: center; }
.summary-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 36px; font-weight: 700;
  background: linear-gradient(135deg, var(--accent), var(--accent2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  line-height: 1;
}
.summary-label { font-size: 12px; color: var(--muted); margin-top: 6px; font-weight: 500; }
.summary-divider { width: 1px; height: 40px; background: rgba(249,115,22,0.15); }

/* ── Transition ── */
.modal-enter-active { transition: all .4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-leave-active { transition: all .25s ease; }
.modal-enter-from { opacity: 0; }
.modal-leave-to   { opacity: 0; }
.modal-enter-from .modal-panel { transform: translateY(40px) scale(0.97); }
.modal-leave-to   .modal-panel { transform: translateY(20px) scale(0.98); }

@media (max-width: 640px) {
  .modal-backdrop { padding: 0; align-items: flex-end; }
  .modal-panel { border-radius: 24px 24px 0 0; max-height: 95vh; }
  .modal-body { padding: 24px 24px 40px; }
  .people-row { flex-direction: column; }
  .arrow { transform: rotate(90deg); }
  .summary-bar { flex-wrap: wrap; gap: 20px; }
  .summary-divider { display: none; }
}
</style>
