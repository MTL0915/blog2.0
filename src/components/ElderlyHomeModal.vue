<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal-panel">

          <!-- Close -->
          <button class="close-btn" @click="$emit('close')">✕</button>

          <!-- ── Hero ── -->
          <div class="modal-hero">
            <div class="hero-overlay" />
            <div class="hero-meta">
              <span class="hero-cat">AI 落地案例</span>
              <h2 class="hero-title">适老化家居配图讲解</h2>
              <p class="hero-sub">从画风参考到样板间落地的全流程 AI 制作</p>
            </div>
          </div>

          <!-- ── Body ── -->
          <div class="modal-body">

            <!-- 制作流程标题 -->
            <div class="body-header">
              <div class="section-tag">制作流程</div>
              <h3 class="body-title">4 步完成适老化家居场景配图</h3>
              <p class="body-desc">
                从画风锁定到文案生成，再到 AI 效果图渲染，最终落地为实体物料并安装至样板间。
                全程借助 <strong>DeepSeek</strong> 与 <strong>Google Gemini</strong> 完成，
                无需专业设计师即可产出高质量场景配图。
              </p>
            </div>

            <!-- 步骤流程 -->
            <div class="steps">

              <!-- Step 1 -->
              <div class="step">
                <div class="step-num">01</div>
                <div class="step-content">
                  <div class="step-title">画风参考 · 锁定视觉风格</div>
                  <div class="step-desc">
                    首先收集适老化家居的画风参考图，明确整体视觉调性——温暖、明亮、易读、无障碍友好。
                    将参考图作为后续 AI 生图的风格锚点，确保所有输出图片保持统一的画面语言。
                  </div>
                  <div class="ref-block">
                    <div class="ref-image-wrap">
                      <img
                        v-if="styleRef"
                        :src="styleRef"
                        alt="画风参考图"
                        class="ref-image"
                      />
                      <div v-else class="ref-placeholder">
                        <span class="placeholder-icon">🖼️</span>
                        <span class="placeholder-text">画风参考图 01</span>
                        <span class="placeholder-hint">（请将参考图放入 assets 文件夹后引入）</span>
                      </div>
                      <div class="ref-badge">画风参考图 01</div>
                    </div>
                    <div class="ref-tags">
                      <span class="ref-tag">🌿 温暖自然</span>
                      <span class="ref-tag">☀️ 明亮通透</span>
                      <span class="ref-tag">♿ 无障碍友好</span>
                      <span class="ref-tag">🏠 居家感强</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="step">
                <div class="step-num">02</div>
                <div class="step-content">
                  <div class="step-title">DeepSeek · 生成图片文案</div>
                  <div class="step-desc">
                    将适老化家居的功能需求与使用场景输入 <strong>DeepSeek</strong>，
                    由其生成结构清晰、表达简练的图片配套文案，包括标题、说明文字与使用提示，
                    确保文字内容贴合老年用户的阅读习惯。
                  </div>
                  <div class="prompt-box">
                    <div class="prompt-header">
                      <span class="prompt-dot d" />
                      <span class="prompt-dot d" />
                      <span class="prompt-dot d" />
                      <span class="prompt-model">DeepSeek</span>
                    </div>
                    <div class="prompt-label">输入 Prompt</div>
                    <div class="prompt-text input-text">
                      "请为适老化家居产品设计一套配图文案，场景为老人在客厅使用防滑扶手。
要求：文字简洁易读，字体不低于 18px 视觉感，包含标题、功能说明、使用提示三部分，
语气温暖亲切，避免专业术语。"
                    </div>
                    <div class="prompt-divider" />
                    <div class="prompt-label output">DeepSeek 输出</div>
                    <div class="prompt-text output-text">
                      【标题】贴心守护，安心每一步
【功能说明】采用防滑纹理设计，握感稳固，帮助老人起身、行走更轻松
【使用提示】安装高度建议 85–90cm，握持时手心向下，力度适中即可
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="step">
                <div class="step-num">03</div>
                <div class="step-content">
                  <div class="step-title">Gemini · 生成家居效果图</div>
                  <div class="step-desc">
                    将画风参考图与 DeepSeek 输出的文案一同输入 <strong>Google Gemini</strong>，
                    描述具体的家居场景与光线氛围，由 Gemini 生成符合适老化风格的家居效果图，
                    真实还原温馨、安全的居住环境。
                  </div>
                  <div class="tool-badges">
                    <div class="tool-badge">
                      <span class="badge-icon">✨</span>
                      <div>
                        <div class="badge-name">Google Gemini</div>
                        <div class="badge-sub">Image Generation</div>
                      </div>
                    </div>
                    <div class="tool-badge">
                      <span class="badge-icon">🖼️</span>
                      <div>
                        <div class="badge-name">画风参考图</div>
                        <div class="badge-sub">Style Reference</div>
                      </div>
                    </div>
                    <div class="tool-badge">
                      <span class="badge-icon">📝</span>
                      <div>
                        <div class="badge-name">DeepSeek 文案</div>
                        <div class="badge-sub">Prompt Source</div>
                      </div>
                    </div>
                  </div>
                  <div class="gemini-prompt-box">
                    <div class="gemini-prompt-header">
                      <span class="gemini-label">发送给 Gemini 的生图指令</span>
                    </div>
                    <div class="gemini-prompt-text">
                      "参考上传画风图的色调与风格，生成一张适老化客厅场景图：
明亮暖光，老人站在防滑扶手旁微笑，地面铺设防滑地垫，整体温馨自然，
写实插画风格，色调以米白与木色为主。"
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="step">
                <div class="step-num">04</div>
                <div class="step-content">
                  <div class="step-title">物料制作 · 安装至样板间</div>
                  <div class="step-desc">
                    将 Gemini 生成的效果图与 DeepSeek 文案进行排版合成，输出印刷物料，
                    安装至适老化家居样板间现场。最终效果图呈现 AI 生图与实体空间的完美结合。
                  </div>
                  <div class="final-image-wrap">
                    <img
                      v-if="finalResult"
                      :src="finalResult"
                      alt="样板间最终效果图"
                      class="final-image"
                    />
                    <div v-else class="ref-placeholder final-placeholder">
                      <span class="placeholder-icon">🏠</span>
                      <span class="placeholder-text">最终效果图 02</span>
                      <span class="placeholder-hint">（请将效果图放入 assets 文件夹后引入）</span>
                    </div>
                    <div class="final-badge">样板间实装效果</div>
                  </div>
                </div>
              </div>

            </div>

            <!-- 工具总结 -->
            <div class="summary-bar">
              <div class="summary-item">
                <div class="summary-num">1</div>
                <div class="summary-label">张画风参考图</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">2</div>
                <div class="summary-label">个 AI 工具</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">4</div>
                <div class="summary-label">步完成全流程</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">0</div>
                <div class="summary-label">专业设计师</div>
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
import styleRef   from '../assets/适老化-画风参考图01.png'
import finalResult from '../assets/适老化-最终效果图02.png'


const props = defineProps({ visible: Boolean })
defineEmits(['close'])

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

/* ── Hero ── */
.modal-hero {
  position: relative; width: 100%;
  height: 220px; overflow: hidden;
  background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 40%, #f48fb1 70%, #e91e8c22 100%);
  display: flex; align-items: flex-end;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(28,10,0,0.75) 0%, rgba(28,10,0,0.05) 60%, transparent 100%);
}
.hero-meta {
  position: relative; z-index: 1;
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

/* ── Step 1: 画风参考 ── */
.ref-block { display: flex; flex-direction: column; gap: 16px; }
.ref-image-wrap {
  position: relative;
  border-radius: 16px; overflow: hidden;
  border: 1.5px solid rgba(249,115,22,0.15);
  box-shadow: 0 4px 20px rgba(249,115,22,0.08);
  background: #fff;
}
.ref-image {
  width: 100%; max-height: 280px;
  object-fit: cover; display: block;
}
.ref-placeholder {
  width: 100%; height: 200px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 8px;
  background: linear-gradient(135deg, #fce4ec, #f8bbd0);
}
.final-placeholder { height: 240px; }
.placeholder-icon { font-size: 40px; }
.placeholder-text { font-size: 15px; font-weight: 600; color: rgba(28,10,0,0.5); font-family: 'Space Grotesk', sans-serif; }
.placeholder-hint { font-size: 12px; color: rgba(28,10,0,0.35); }

.ref-badge {
  position: absolute; bottom: 12px; left: 12px;
  padding: 4px 12px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 1px;
  background: rgba(255,255,255,0.85); backdrop-filter: blur(6px);
  color: var(--accent); border: 1px solid rgba(249,115,22,0.2);
}
.ref-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.ref-tag {
  padding: 6px 14px; border-radius: 100px;
  font-size: 12px; font-weight: 500; color: var(--muted);
  background: rgba(249,115,22,0.07);
  border: 1px solid rgba(249,115,22,0.15);
}

/* ── Step 2: DeepSeek Prompt Box ── */
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
.prompt-dot.d:nth-child(1) { background: #ef4444; }
.prompt-dot.d:nth-child(2) { background: #f59e0b; }
.prompt-dot.d:nth-child(3) { background: #10b981; }
.prompt-model {
  margin-left: auto; font-size: 11px;
  color: rgba(255,255,255,0.35); font-weight: 500; letter-spacing: .5px;
}
.prompt-label {
  padding: 10px 20px 0;
  font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  color: rgba(249,115,22,0.5);
}
.prompt-label.output { color: rgba(16,185,129,0.6); padding-top: 0; }
.prompt-divider {
  margin: 12px 20px;
  height: 1px; background: rgba(249,115,22,0.1);
}
.prompt-text {
  padding: 8px 20px 16px;
  font-size: 13px; line-height: 1.8;
  color: rgba(255,220,180,0.85);
  font-family: 'SF Mono', 'Fira Code', monospace;
  white-space: pre-wrap;
}
.output-text { color: rgba(160,240,200,0.85); }
.input-text { color: rgba(255,220,180,0.85); }

/* ── Step 3: Tool badges + Gemini prompt ── */
.tool-badges { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
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

.gemini-prompt-box {
  background: linear-gradient(135deg, rgba(249,115,22,0.05), rgba(225,29,72,0.03));
  border: 1.5px solid rgba(249,115,22,0.15);
  border-radius: 14px; overflow: hidden;
}
.gemini-prompt-header {
  padding: 10px 18px;
  border-bottom: 1px solid rgba(249,115,22,0.1);
  background: rgba(249,115,22,0.05);
}
.gemini-label {
  font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
  color: var(--accent);
}
.gemini-prompt-text {
  padding: 16px 20px;
  font-size: 13px; line-height: 1.8; color: var(--muted);
  font-family: 'SF Mono', 'Fira Code', monospace;
  white-space: pre-wrap;
}

/* ── Step 4: Final image ── */
.final-image-wrap {
  position: relative;
  border-radius: 16px; overflow: hidden;
  border: 1.5px solid rgba(249,115,22,0.15);
  box-shadow: 0 8px 40px rgba(249,115,22,0.12);
  background: #fff;
}
.final-image { width: 100%; display: block; max-height: 360px; object-fit: cover; }
.final-badge {
  position: absolute; bottom: 12px; left: 12px;
  padding: 4px 12px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 1px;
  background: rgba(255,255,255,0.85); backdrop-filter: blur(6px);
  color: var(--accent); border: 1px solid rgba(249,115,22,0.2);
}

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
  .summary-bar { flex-wrap: wrap; gap: 20px; }
  .summary-divider { display: none; }
  .tool-badges { flex-direction: column; }
}
</style>
