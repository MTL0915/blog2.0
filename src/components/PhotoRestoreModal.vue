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
              <span class="hero-cat">AI 修复 · 2026</span>
              <h2 class="hero-title">AI 老照片高清修复</h2>
              <p class="hero-sub">ComfyUI 工作流 × PS 精修 · 商业级高清还原</p>
            </div>
          </div>

          <!-- ── Body ── -->
          <div class="modal-body">

            <div class="body-header">
              <div class="section-tag">制作流程</div>
              <h3 class="body-title">让泛黄老照片重焕高清新生</h3>
              <p class="body-desc">
                以 <strong>ComfyUI</strong> 自定义工作流为核心，集成超分辨率放大、面部修复、
                噪点去除等节点，辅以 <strong>Photoshop</strong> 进行局部精修，
                将模糊、破损的老照片还原为高清彩色图像，可配合 AI 视频技术实现系列商业变现。
              </p>
            </div>

            <div class="steps">

              <!-- Step 1 -->
              <div class="step">
                <div class="step-num">01</div>
                <div class="step-content">
                  <div class="step-title">ComfyUI 工作流搭建</div>
                  <div class="step-desc">
                    在 <strong>ComfyUI</strong> 中搭建专用修复工作流，串联
                    <em>ESRGAN 超分放大 → GFPGAN 人脸修复 → 降噪去划痕 → 色彩还原</em>
                    等核心节点，形成可复用的一键修复流水线。
                  </div>
                  <div class="media-wrap">
                    <img v-if="workflowImg" :src="workflowImg" alt="ComfyUI工作流" class="media-img" />
                    <div v-else class="media-placeholder">
                      <span class="ph-icon">⚙️</span>
                      <span class="ph-text">工作流截图 01</span>
                      <span class="ph-hint">（引入后替换占位符）</span>
                    </div>
                    <div class="media-badge">ComfyUI 工作流节点图</div>
                  </div>
                  <div class="node-flow">
                    <div class="node">📥<span>原始老照片</span></div>
                    <div class="node-arrow">→</div>
                    <div class="node">🔍<span>超分放大</span></div>
                    <div class="node-arrow">→</div>
                    <div class="node">👤<span>人脸修复</span></div>
                    <div class="node-arrow">→</div>
                    <div class="node">🎨<span>色彩还原</span></div>
                    <div class="node-arrow">→</div>
                    <div class="node highlight">✨<span>高清成图</span></div>
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="step">
                <div class="step-num">02</div>
                <div class="step-content">
                  <div class="step-title">PS 局部精修</div>
                  <div class="step-desc">
                    ComfyUI 输出后，使用 <strong>Photoshop</strong> 对细节区域进行二次精修：
                    补全严重缺损区域、调整局部曝光、优化皮肤质感，确保最终图像达到商用级别还原效果。
                  </div>
                  <div class="tool-badges">
                    <div class="tool-badge amber">
                      <span class="badge-icon">⚙️</span>
                      <div>
                        <div class="badge-name">ComfyUI</div>
                        <div class="badge-sub">自定义修复工作流</div>
                      </div>
                    </div>
                    <div class="tool-badge blue">
                      <span class="badge-icon">🎨</span>
                      <div>
                        <div class="badge-name">Photoshop</div>
                        <div class="badge-sub">局部精修 · 细节补全</div>
                      </div>
                    </div>
                    <div class="tool-badge green">
                      <span class="badge-icon">🧠</span>
                      <div>
                        <div class="badge-name">GFPGAN / ESRGAN</div>
                        <div class="badge-sub">AI 超分 · 人脸重建</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3：修复对比滑块 -->
              <div class="step">
                <div class="step-num">03</div>
                <div class="step-content">
                  <div class="step-title">修复效果对比 · 拖动滑块查看</div>
                  <div class="step-desc">
                    拖动中间滑块，直观感受修复前后的差距。左侧为原始老照片，右侧为 AI 高清修复成果。
                  </div>

                  <!-- ── 滑动对比组件 ── -->
                  <div
                    class="compare-wrap"
                    ref="compareRef"
                    @mousedown="startDrag"
                    @touchstart.prevent="startDragTouch"
                  >
                    <!-- After (底层，全宽) -->
                    <div class="compare-after">
                      <img v-if="afterImg" :src="afterImg" alt="修复后" class="compare-img" />
                      <div v-else class="compare-placeholder after-ph">
                        <span class="ph-icon">✨</span>
                        <span class="ph-text">修复后图片 03</span>
                      </div>
                      <div class="compare-label after-label">修复后 AFTER</div>
                    </div>
                    <!-- Before (上层，按 sliderPos 裁切) -->
                    <div class="compare-before" :style="{ width: sliderPos + '%' }">
                      <img v-if="beforeImg" :src="beforeImg" alt="修复前" class="compare-img" />
                      <div v-else class="compare-placeholder before-ph">
                        <span class="ph-icon">🕰️</span>
                        <span class="ph-text">修复前图片 02</span>
                      </div>
                      <div class="compare-label before-label">修复前 BEFORE</div>
                    </div>
                    <!-- 分割线 + 手柄 -->
                    <div class="compare-handle" :style="{ left: sliderPos + '%' }">
                      <div class="handle-line" />
                      <div class="handle-btn">
                        <span class="handle-arrow left">‹</span>
                        <span class="handle-arrow right">›</span>
                      </div>
                    </div>
                  </div>
                  <p class="compare-tip">← 拖动滑块对比修复前后效果 →</p>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="step">
                <div class="step-num">04</div>
                <div class="step-content">
                  <div class="step-title">商业变现思路</div>
                  <div class="step-desc">修复完成的高清老照片，可延伸出多条商业化路径：</div>
                  <div class="monetize-grid">
                    <div class="monetize-card">
                      <span class="m-icon">🎥</span>
                      <div class="m-title">配合 AI 视频</div>
                      <div class="m-desc">老照片修复 + AI 动态化，制作「照片活起来」短视频，抖音/快手高传播率内容</div>
                    </div>
                    <div class="monetize-card">
                      <span class="m-icon">🛍️</span>
                      <div class="m-title">接单变现</div>
                      <div class="m-desc">在闲鱼、小红书接老照片修复订单，单张定价 20–200 元，可批量处理</div>
                    </div>
                    <div class="monetize-card">
                      <span class="m-icon">🖨️</span>
                      <div class="m-title">实体周边</div>
                      <div class="m-desc">高清修复后配合冲印服务，提供「修复+印刷+相册」一站式套餐</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <!-- 总结 -->
            <div class="summary-bar">
              <div class="summary-item">
                <div class="summary-num">2</div>
                <div class="summary-label">个核心工具</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">4<span class="unit">×</span></div>
                <div class="summary-label">超分放大倍率</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">3</div>
                <div class="summary-label">条变现路径</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">∞</div>
                <div class="summary-label">可复用工作流</div>
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

// 引入图片说明：
import workflowImg from '../assets/老照片-工作流图片01.png'
import beforeImg   from '../assets/老照片-修复前.png'
import afterImg    from '../assets/老照片-修复后.png'
// const workflowImg = null
// const beforeImg   = null
// const afterImg    = null

const props = defineProps({ visible: Boolean })
defineEmits(['close'])

watch(() => props.visible, v => { document.body.style.overflow = v ? 'hidden' : '' })

// ── 滑动对比逻辑 ──
const sliderPos  = ref(50)   // 0–100 百分比
const compareRef = ref(null)
let dragging = false

function getPercent(clientX) {
  const rect = compareRef.value.getBoundingClientRect()
  let p = ((clientX - rect.left) / rect.width) * 100
  return Math.max(2, Math.min(98, p))
}

function startDrag(e) {
  dragging = true
  sliderPos.value = getPercent(e.clientX)
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}
function onDrag(e)  { if (dragging) sliderPos.value = getPercent(e.clientX) }
function stopDrag() { dragging = false; window.removeEventListener('mousemove', onDrag); window.removeEventListener('mouseup', stopDrag) }

function startDragTouch(e) {
  const touch = e.touches[0]
  sliderPos.value = getPercent(touch.clientX)
  window.addEventListener('touchmove', onDragTouch, { passive: false })
  window.addEventListener('touchend', stopDragTouch)
}
function onDragTouch(e)  { e.preventDefault(); sliderPos.value = getPercent(e.touches[0].clientX) }
function stopDragTouch() { window.removeEventListener('touchmove', onDragTouch); window.removeEventListener('touchend', stopDragTouch) }
</script>

<style scoped>
.modal-backdrop {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(10, 8, 0, 0.75); backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.modal-panel {
  position: relative; width: 100%; max-width: 860px; max-height: 90vh;
  background: #fffdf0; border-radius: 28px; overflow: hidden; overflow-y: auto;
  box-shadow: 0 40px 120px rgba(202,138,4,0.2), 0 0 0 1px rgba(202,138,4,0.12);
  scrollbar-width: thin; scrollbar-color: rgba(202,138,4,0.3) transparent;
}
.modal-panel::-webkit-scrollbar { width: 4px; }
.modal-panel::-webkit-scrollbar-thumb { background: rgba(202,138,4,0.3); border-radius:2px; }

.close-btn {
  position: sticky; top: 16px; left: 100%;
  float: right; margin: 16px 16px -48px 0;
  width: 40px; height: 40px; border-radius: 50%;
  border: 1.5px solid rgba(202,138,4,0.25);
  background: rgba(255,255,255,0.9); backdrop-filter: blur(8px);
  color: #78716c; font-size: 14px; cursor: pointer; z-index: 10;
  transition: all .2s; display: flex; align-items: center; justify-content: center;
}
.close-btn:hover { background: #ca8a04; color: #fff; border-color: #ca8a04; transform: rotate(90deg); }

.modal-hero {
  position: relative; width: 100%; height: 220px; overflow: hidden;
  background: linear-gradient(135deg, #1c1400 0%, #3d2a00 50%, #5a3e00 100%);
  display: flex; align-items: flex-end;
}
.hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 25% 60%, rgba(202,138,4,0.35) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 30%, rgba(161,98,7,0.2) 0%, transparent 50%);
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(10,8,0,0.85) 0%, rgba(10,8,0,0.1) 60%, transparent 100%);
}
.hero-meta { position: relative; z-index: 1; padding: 32px 36px; }
.hero-cat {
  display: inline-block; padding: 4px 14px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  background: rgba(202,138,4,0.3); border: 1px solid rgba(202,138,4,0.5);
  color: #fde68a; margin-bottom: 10px;
}
.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 32px; font-weight: 700; color: #fff; letter-spacing: -1px; margin-bottom: 6px;
}
.hero-sub { font-size: 14px; color: rgba(255,255,255,0.55); letter-spacing: .5px; }

.modal-body { padding: 40px 40px 48px; }
.body-header { margin-bottom: 48px; }
.section-tag {
  font-size: 11px; color: #ca8a04; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.section-tag::before { content:''; width:24px; height:1.5px; background:#ca8a04; border-radius:1px; }
.body-title { font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; color: #1c1400; letter-spacing: -.8px; margin-bottom: 12px; }
.body-desc { font-size: 15px; color: #78716c; line-height: 1.75; }
.body-desc strong { color: #ca8a04; font-weight: 600; }

.steps { display: flex; flex-direction: column; gap: 48px; }
.step { display: flex; gap: 24px; }
.step-num {
  font-family: 'Space Grotesk', sans-serif; font-size: 48px; font-weight: 700; line-height: 1;
  background: linear-gradient(135deg, rgba(202,138,4,0.18), rgba(161,98,7,0.1));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  min-width: 56px; padding-top: 2px; flex-shrink: 0;
}
.step-content { flex: 1; }
.step-title { font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 700; color: #1c1400; margin-bottom: 10px; }
.step-desc { font-size: 14px; color: #78716c; line-height: 1.7; margin-bottom: 20px; }
.step-desc strong { color: #ca8a04; font-weight: 600; }
.step-desc em { color: #92400e; font-style: normal; font-weight: 500; }

/* media */
.media-wrap {
  position: relative; border-radius: 16px; overflow: hidden;
  border: 1.5px solid rgba(202,138,4,0.18);
  box-shadow: 0 4px 20px rgba(202,138,4,0.1);
  background: #fff; margin-bottom: 16px;
}
.media-img { width: 100%; max-height: 280px; object-fit: cover; display: block; }
.media-placeholder {
  width: 100%; height: 200px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
}
.ph-icon { font-size: 40px; }
.ph-text { font-size: 15px; font-weight: 600; color: rgba(28,20,0,0.5); font-family: 'Space Grotesk', sans-serif; }
.ph-hint { font-size: 12px; color: rgba(28,20,0,0.3); }
.media-badge {
  position: absolute; bottom: 12px; left: 12px;
  padding: 4px 12px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 1px;
  background: rgba(255,255,255,0.88); backdrop-filter: blur(6px);
  color: #ca8a04; border: 1px solid rgba(202,138,4,0.2);
}

/* node flow */
.node-flow {
  display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
  padding: 16px 20px;
  background: rgba(202,138,4,0.05); border: 1.5px solid rgba(202,138,4,0.12);
  border-radius: 14px;
}
.node {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 8px 14px; background: #fff; border-radius: 10px;
  font-size: 20px; border: 1px solid rgba(202,138,4,0.15);
}
.node span { font-size: 11px; color: #78716c; font-weight: 500; white-space: nowrap; }
.node.highlight { background: #ca8a04; border-color: #ca8a04; }
.node.highlight span { color: #fff; }
.node-arrow { font-size: 18px; color: #a16207; font-weight: 300; }

/* tool badges */
.tool-badges { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; }
.tool-badge {
  display: flex; align-items: center; gap: 12px; padding: 12px 18px;
  border-radius: 14px; backdrop-filter: blur(8px); transition: all .3s;
  border: 1.5px solid transparent; background: rgba(255,255,255,0.7);
}
.tool-badge:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(202,138,4,0.12); }
.tool-badge.amber  { border-color: rgba(202,138,4,0.25); }
.tool-badge.blue   { border-color: rgba(59,130,246,0.25); }
.tool-badge.green  { border-color: rgba(34,197,94,0.25); }
.badge-icon { font-size: 24px; }
.badge-name { font-size: 14px; font-weight: 600; color: #1c1400; font-family: 'Space Grotesk',sans-serif; }
.badge-sub  { font-size: 11px; color: #78716c; margin-top: 2px; }

/* ── 滑动对比 ── */
.compare-wrap {
  position: relative; width: 100%; aspect-ratio: 4/3;
  border-radius: 16px; overflow: hidden;
  border: 1.5px solid rgba(202,138,4,0.18);
  box-shadow: 0 8px 40px rgba(202,138,4,0.12);
  cursor: col-resize; user-select: none;
}
.compare-after, .compare-before {
  position: absolute; top: 0; height: 100%;
}
.compare-after { left: 0; width: 100%; }
.compare-before { left: 0; overflow: hidden; }
.compare-img {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.compare-after .compare-img  { width: 100%; }
/* .compare-before .compare-img { width: auto; min-width: 100vw; max-width: none; } */
.compare-before .compare-img { width: 100%; }

.compare-placeholder {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
}
.before-ph { background: linear-gradient(135deg, #d4c4a0, #b8a882); }
.after-ph  { background: linear-gradient(135deg, #fef3c7, #fde68a); }
.compare-placeholder .ph-icon { font-size: 48px; }
.compare-placeholder .ph-text { font-size: 16px; font-weight: 700; color: rgba(28,20,0,0.6); font-family: 'Space Grotesk', sans-serif; }

.compare-label {
  position: absolute; bottom: 14px;
  padding: 4px 12px; border-radius: 100px;
  font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
}
.before-label { left: 14px; background: rgba(0,0,0,0.55); color: #fde68a; }
.after-label  { right: 14px; background: rgba(202,138,4,0.75); color: #fff; }

.compare-handle {
  position: absolute; top: 0; height: 100%;
  transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center;
  pointer-events: none;
}
.handle-line { width: 2px; height: 100%; background: #fff; box-shadow: 0 0 8px rgba(0,0,0,0.4); }
.handle-btn {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 40px; height: 40px; border-radius: 50%;
  background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  display: flex; align-items: center; justify-content: center; gap: 2px;
}
.handle-arrow { font-size: 18px; color: #ca8a04; font-weight: 700; line-height: 1; }

.compare-tip {
  text-align: center; font-size: 12px; color: #a16207;
  margin-top: 10px; letter-spacing: .5px;
}

/* monetize */
.monetize-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.monetize-card {
  padding: 18px 16px; border-radius: 16px;
  background: rgba(255,255,255,0.7);
  border: 1.5px solid rgba(202,138,4,0.15);
  transition: all .3s;
}
.monetize-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(202,138,4,0.15); border-color: #ca8a04; }
.m-icon { font-size: 28px; display: block; margin-bottom: 10px; }
.m-title { font-size: 14px; font-weight: 700; color: #1c1400; margin-bottom: 6px; font-family: 'Space Grotesk', sans-serif; }
.m-desc  { font-size: 12px; color: #78716c; line-height: 1.6; }

/* summary */
.summary-bar {
  display: flex; align-items: center; justify-content: space-around;
  margin-top: 48px; padding: 28px 32px;
  background: linear-gradient(135deg, rgba(202,138,4,0.07), rgba(161,98,7,0.04));
  border: 1.5px solid rgba(202,138,4,0.15); border-radius: 20px;
}
.summary-item { text-align: center; }
.summary-num {
  font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700;
  background: linear-gradient(135deg, #ca8a04, #a16207);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1;
}
.summary-num .unit { font-size: 20px; }
.summary-label { font-size: 12px; color: #78716c; margin-top: 6px; font-weight: 500; }
.summary-divider { width: 1px; height: 40px; background: rgba(202,138,4,0.15); }

.modal-enter-active { transition: all .4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-leave-active { transition: all .25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-panel { transform: translateY(40px) scale(0.97); }
.modal-leave-to   .modal-panel { transform: translateY(20px) scale(0.98); }

@media (max-width: 640px) {
  .modal-backdrop { padding: 0; align-items: flex-end; }
  .modal-panel { border-radius: 24px 24px 0 0; max-height: 95vh; }
  .modal-body { padding: 24px 24px 40px; }
  .monetize-grid { grid-template-columns: 1fr; }
  .summary-bar { flex-wrap: wrap; gap: 20px; }
  .summary-divider { display: none; }
  .node-flow { gap: 6px; }
}
</style>
