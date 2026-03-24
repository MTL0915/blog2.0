<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal-panel">

          <!-- Close -->
          <button class="close-btn" @click="$emit('close')">✕</button>

          <!-- ── Hero ── -->
          <div class="modal-hero">
            <div class="hero-bg" />
            <div class="hero-overlay" />
            <div class="hero-meta">
              <span class="hero-cat">AI 数字人 · 2026</span>
              <h2 class="hero-title">AI 数字人带货视频</h2>
              <p class="hero-sub">即创 × ChatGPT/Kimi × 寻鱼素材 · 全自动口型对准</p>
            </div>
          </div>

          <!-- ── Body ── -->
          <div class="modal-body">

            <div class="body-header">
              <div class="section-tag">制作流程</div>
              <h3 class="body-title">3 个工具，零出镜，生成带货视频</h3>
              <p class="body-desc">
                无需真人出镜，借助 <strong>即创</strong> AI 数字人平台，结合
                <strong>ChatGPT / Kimi</strong> 生成的带货脚本，以及小程序
                <strong>寻鱼</strong> 提供的免费商品素材，智能驱动数字人口型同步，
                一键输出可直接发布的带货短视频。
              </p>
            </div>

            <div class="steps">

              <!-- Step 1 -->
              <div class="step">
                <div class="step-num">01</div>
                <div class="step-content">
                  <div class="step-title">货物素材准备 · 寻鱼小程序</div>
                  <div class="step-desc">
                    在微信小程序「寻鱼」中找到目标商品，一键获取商品主图、详情图等免费可用素材，
                    无需自行拍摄，快速积累带货物料库。
                  </div>
                  <div class="media-wrap">
                    <img v-if="goodsImg" :src="goodsImg" alt="货物图片" class="media-img" />
                    <div v-else class="media-placeholder">
                      <span class="ph-icon">📦</span>
                      <span class="ph-text">货物图片 01</span>
                      <span class="ph-hint">（引入后替换占位符）</span>
                    </div>
                    <div class="media-badge">商品素材 · 寻鱼小程序</div>
                  </div>
                  <div class="tool-badges">
                    <div class="tool-badge teal">
                      <span class="badge-icon">🐟</span>
                      <div>
                        <div class="badge-name">寻鱼小程序</div>
                        <div class="badge-sub">免费商品素材</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="step">
                <div class="step-num">02</div>
                <div class="step-content">
                  <div class="step-title">脚本生成 · ChatGPT / Kimi</div>
                  <div class="step-desc">
                    将商品信息与卖点输入 <strong>ChatGPT</strong> 或 <strong>Kimi</strong>，
                    由 AI 生成结构完整、节奏流畅的带货口播脚本，包含开场钩子、产品亮点、促销话术与结尾引导。
                  </div>
                  <div class="script-box">
                    <div class="script-header">
                      <span class="script-dot r" /><span class="script-dot y" /><span class="script-dot g" />
                      <span class="script-model">ChatGPT / Kimi · 带货脚本生成</span>
                    </div>
                    <div class="script-label">Prompt 输入</div>
                    <div class="script-text input-text">"帮我为以下商品写一段 30 秒的带货口播脚本：[商品名称+核心卖点]。
要求：开头 3 秒有钩子，突出差异化卖点，结尾引导点击购买，口语化表达。"</div>
                    <div class="script-divider" />
                    <div class="script-label output">脚本输出示例</div>
                    <div class="script-text output-text">"姐妹们注意了！今天这个宝贝真的绝了——
[商品亮点]，用了两周皮肤状态肉眼可见的变化！
现在下单还有限时折扣，库存不多，点下面链接直接拍！"</div>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="step">
                <div class="step-num">03</div>
                <div class="step-content">
                  <div class="step-title">即创 · AI 数字人视频生成</div>
                  <div class="step-desc">
                    将脚本文本上传至抖音旗下 <strong>即创</strong> 平台，选择合适的 AI 数字人形象，
                    系统自动完成 TTS 语音合成与口型驱动对齐，结合商品素材自动排版，
                    输出画面完整、口型精准的带货视频。
                  </div>
                  <div class="tool-badges">
                    <div class="tool-badge blue">
                      <span class="badge-icon">🤖</span>
                      <div>
                        <div class="badge-name">即创</div>
                        <div class="badge-sub">AI 数字人生成</div>
                      </div>
                    </div>
                    <div class="tool-badge purple">
                      <span class="badge-icon">🎙️</span>
                      <div>
                        <div class="badge-name">TTS 语音合成</div>
                        <div class="badge-sub">口型自动对齐</div>
                      </div>
                    </div>
                    <div class="tool-badge orange">
                      <span class="badge-icon">✂️</span>
                      <div>
                        <div class="badge-name">自动剪辑排版</div>
                        <div class="badge-sub">一键生成成片</div>
                      </div>
                    </div>
                  </div>
                  <div class="flow-row">
                    <div class="flow-item">📝<span>脚本文本</span></div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-item">🤖<span>数字人 + 口型</span></div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-item">📦<span>商品素材</span></div>
                    <div class="flow-arrow">→</div>
                    <div class="flow-item final-item">🎬<span>带货视频</span></div>
                  </div>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="step">
                <div class="step-num">04</div>
                <div class="step-content">
                  <div class="step-title">最终成片展示</div>
                  <div class="step-desc">
                    AI 数字人口型精准同步，商品画面自然穿插，完整呈现带货视频的最终效果。
                    全程零出镜，从素材到成片最快 10 分钟完成。
                  </div>
                  <div class="media-wrap">
                    <video
                      v-if="resultVideo"
                      :src="resultVideo"
                      class="result-video"
                      controls
                      playsinline
                    />
                    <div v-else class="media-placeholder video-ph">
                      <span class="ph-icon">🎬</span>
                      <span class="ph-text">最终效果视频 02</span>
                      <span class="ph-hint">（引入后替换占位符）</span>
                    </div>
                    <div class="media-badge">最终成片 · 即创输出</div>
                  </div>
                </div>
              </div>

            </div>

            <!-- 总结 -->
            <div class="summary-bar">
              <div class="summary-item">
                <div class="summary-num">3</div>
                <div class="summary-label">个 AI 工具</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">0</div>
                <div class="summary-label">真人出镜</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">10<span class="unit">min</span></div>
                <div class="summary-label">从素材到成片</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">∞</div>
                <div class="summary-label">可复制选品</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'

// 引入图片/视频说明：
import goodsImg    from '../assets/数字人-货物图片01.jpg'
import resultVideo from '../assets/数字人-最终效果视频02.mp4'
// const goodsImg    = null
// const resultVideo = null

const props = defineProps({ visible: Boolean })
defineEmits(['close'])
watch(() => props.visible, v => { document.body.style.overflow = v ? 'hidden' : '' })
</script>

<style scoped>
.modal-backdrop {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0, 8, 20, 0.75);
  backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.modal-panel {
  position: relative;
  width: 100%; max-width: 860px; max-height: 90vh;
  background: #f0f8ff;
  border-radius: 28px; overflow: hidden; overflow-y: auto;
  box-shadow: 0 40px 120px rgba(14,165,233,0.22), 0 0 0 1px rgba(14,165,233,0.12);
  scrollbar-width: thin; scrollbar-color: rgba(14,165,233,0.3) transparent;
}
.modal-panel::-webkit-scrollbar { width: 4px; }
.modal-panel::-webkit-scrollbar-thumb { background: rgba(14,165,233,0.3); border-radius:2px; }

.close-btn {
  position: sticky; top: 16px; left: 100%;
  float: right; margin: 16px 16px -48px 0;
  width: 40px; height: 40px; border-radius: 50%;
  border: 1.5px solid rgba(14,165,233,0.25);
  background: rgba(255,255,255,0.9); backdrop-filter: blur(8px);
  color: #64748b; font-size: 14px; cursor: pointer; z-index: 10;
  transition: all .2s; display: flex; align-items: center; justify-content: center;
}
.close-btn:hover { background: #0ea5e9; color: #fff; border-color: #0ea5e9; transform: rotate(90deg); }

.modal-hero {
  position: relative; width: 100%; height: 220px; overflow: hidden;
  background: linear-gradient(135deg, #0c1a2e 0%, #0f3460 50%, #1a6b9e 100%);
  display: flex; align-items: flex-end;
}
.hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(14,165,233,0.3) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 30%, rgba(99,102,241,0.25) 0%, transparent 55%);
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,8,20,0.85) 0%, rgba(0,8,20,0.1) 60%, transparent 100%);
}
.hero-meta { position: relative; z-index: 1; padding: 32px 36px; }
.hero-cat {
  display: inline-block; padding: 4px 14px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  background: rgba(14,165,233,0.3); border: 1px solid rgba(14,165,233,0.5);
  color: #7dd3fc; margin-bottom: 10px;
}
.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 32px; font-weight: 700; color: #fff;
  letter-spacing: -1px; margin-bottom: 6px;
}
.hero-sub { font-size: 14px; color: rgba(255,255,255,0.55); font-weight: 400; letter-spacing: .5px; }

.modal-body { padding: 40px 40px 48px; }
.body-header { margin-bottom: 48px; }
.section-tag {
  font-size: 11px; color: #0ea5e9; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.section-tag::before { content:''; width:24px; height:1.5px; background:#0ea5e9; border-radius:1px; }
.body-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 26px; font-weight: 700; color: #0f172a;
  letter-spacing: -.8px; margin-bottom: 12px;
}
.body-desc { font-size: 15px; color: #475569; line-height: 1.75; }
.body-desc strong { color: #0ea5e9; font-weight: 600; }

.steps { display: flex; flex-direction: column; gap: 48px; }
.step { display: flex; gap: 24px; }
.step-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 48px; font-weight: 700; line-height: 1;
  background: linear-gradient(135deg, rgba(14,165,233,0.18), rgba(99,102,241,0.1));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  min-width: 56px; padding-top: 2px; flex-shrink: 0;
}
.step-content { flex: 1; }
.step-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 10px;
}
.step-desc { font-size: 14px; color: #475569; line-height: 1.7; margin-bottom: 20px; }
.step-desc strong { color: #0ea5e9; font-weight: 600; }

/* media */
.media-wrap {
  position: relative; border-radius: 16px; overflow: hidden;
  border: 1.5px solid rgba(14,165,233,0.18);
  box-shadow: 0 4px 20px rgba(14,165,233,0.1);
  background: #fff; margin-bottom: 16px;
}
.media-img { width: 100%; max-height: 280px; object-fit: cover; display: block; }
.result-video { width: 100%; display: block; max-height: 30rem;}
.media-placeholder {
  width: 100%; height: 200px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  background: linear-gradient(135deg, #e0f2fe, #bae6fd);
}
.video-ph { height: 240px; }
.ph-icon { font-size: 40px; }
.ph-text { font-size: 15px; font-weight: 600; color: rgba(15,23,42,0.5); font-family: 'Space Grotesk', sans-serif; }
.ph-hint { font-size: 12px; color: rgba(15,23,42,0.3); }
.media-badge {
  position: absolute; bottom: 12px; left: 12px;
  padding: 4px 12px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 1px;
  background: rgba(255,255,255,0.88); backdrop-filter: blur(6px);
  color: #0ea5e9; border: 1px solid rgba(14,165,233,0.2);
}

/* script box */
.script-box {
  background: #0c1a2e; border-radius: 14px; overflow: hidden;
  border: 1px solid rgba(14,165,233,0.2);
}
.script-header {
  display: flex; align-items: center; gap: 6px;
  padding: 10px 16px;
  background: rgba(255,255,255,0.04);
  border-bottom: 1px solid rgba(14,165,233,0.1);
}
.script-dot { width: 10px; height: 10px; border-radius: 50%; }
.script-dot.r { background: #ef4444; }
.script-dot.y { background: #f59e0b; }
.script-dot.g { background: #10b981; }
.script-model { margin-left: auto; font-size: 11px; color: rgba(255,255,255,0.3); font-weight: 500; letter-spacing: .5px; }
.script-label {
  padding: 10px 20px 0;
  font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  color: rgba(14,165,233,0.5);
}
.script-label.output { color: rgba(16,185,129,0.6); padding-top: 4px; }
.script-divider { margin: 10px 20px; height: 1px; background: rgba(14,165,233,0.1); }
.script-text {
  padding: 8px 20px 16px; font-size: 13px; line-height: 1.8;
  font-family: 'SF Mono', 'Fira Code', monospace; white-space: pre-wrap;
}
.input-text { color: rgba(186,230,253,0.85); }
.output-text { color: rgba(167,243,208,0.85); }

/* tool badges */
.tool-badges { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
.tool-badge {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 18px;
  border-radius: 14px;
  backdrop-filter: blur(8px);
  transition: all .3s;
  border: 1.5px solid transparent;
  background: rgba(255,255,255,0.7);
}
.tool-badge:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,165,233,0.15); }
.tool-badge.teal  { border-color: rgba(20,184,166,0.25); }
.tool-badge.blue  { border-color: rgba(14,165,233,0.25); }
.tool-badge.purple{ border-color: rgba(99,102,241,0.25); }
.tool-badge.orange{ border-color: rgba(249,115,22,0.25); }
.badge-icon { font-size: 24px; }
.badge-name { font-size: 14px; font-weight: 600; color: #0f172a; font-family: 'Space Grotesk',sans-serif; }
.badge-sub  { font-size: 11px; color: #64748b; margin-top: 2px; }

/* flow */
.flow-row {
  display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
  padding: 16px 20px;
  background: rgba(14,165,233,0.05);
  border: 1.5px solid rgba(14,165,233,0.12);
  border-radius: 14px;
}
.flow-item {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 8px 14px;
  background: #fff; border-radius: 10px;
  font-size: 20px;
  border: 1px solid rgba(14,165,233,0.15);
}
.flow-item span { font-size: 11px; color: #475569; font-weight: 500; white-space: nowrap; }
.flow-item.final-item { background: #0ea5e9; border-color: #0ea5e9; }
.flow-item.final-item span { color: #fff; }
.flow-arrow { font-size: 18px; color: #94a3b8; font-weight: 300; }

/* summary */
.summary-bar {
  display: flex; align-items: center; justify-content: space-around;
  margin-top: 48px; padding: 28px 32px;
  background: linear-gradient(135deg, rgba(14,165,233,0.07), rgba(99,102,241,0.05));
  border: 1.5px solid rgba(14,165,233,0.15);
  border-radius: 20px;
}
.summary-item { text-align: center; }
.summary-num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 36px; font-weight: 700;
  background: linear-gradient(135deg, #0ea5e9, #6366f1);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  line-height: 1;
}
.summary-num .unit { font-size: 18px; }
.summary-label { font-size: 12px; color: #64748b; margin-top: 6px; font-weight: 500; }
.summary-divider { width: 1px; height: 40px; background: rgba(14,165,233,0.15); }

.modal-enter-active { transition: all .4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-leave-active { transition: all .25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-panel { transform: translateY(40px) scale(0.97); }
.modal-leave-to   .modal-panel { transform: translateY(20px) scale(0.98); }

@media (max-width: 640px) {
  .modal-backdrop { padding: 0; align-items: flex-end; }
  .modal-panel { border-radius: 24px 24px 0 0; max-height: 95vh; }
  .modal-body { padding: 24px 24px 40px; }
  .flow-row { gap: 6px; }
  .summary-bar { flex-wrap: wrap; gap: 20px; }
  .summary-divider { display: none; }
}
</style>
