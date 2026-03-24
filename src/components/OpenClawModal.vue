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
              <span class="hero-cat">AI 自动化 · 2026</span>
              <h2 class="hero-title">养龙虾 OpenClaw 🦞</h2>
              <p class="hero-sub">腾讯轻量云 × OpenClaw × QQ 聊天远程操控电脑</p>
            </div>
          </div>

          <!-- ── Body ── -->
          <div class="modal-body">

            <div class="body-header">
              <div class="section-tag">部署与使用流程</div>
              <h3 class="body-title">用 QQ 聊天，远程操控你的电脑干活</h3>
              <p class="body-desc">
                在<strong>腾讯轻量级云服务器</strong>上部署开源 AI Agent 框架
                <strong>OpenClaw</strong>，通过配置不同的 <strong>Skills</strong> 模块，
                实现用 QQ 聊天消息远程下达指令，自动完成文件处理、网页操作、
                程序执行等复杂任务，让云服务器成为 24 小时在线的智能助理。
              </p>
            </div>

            <div class="steps">

              <!-- Step 1 -->
              <div class="step">
                <div class="step-num">01</div>
                <div class="step-content">
                  <div class="step-title">腾讯云部署 OpenClaw</div>
                  <div class="step-desc">
                    在<strong>腾讯轻量应用服务器</strong>上拉取 OpenClaw 仓库，
                    配置 Python 环境与依赖，设置 QQ Bot 接入凭证，完成服务端部署与启动。
                    轻量服务器成本低、延迟少，非常适合常驻运行 AI Agent。
                  </div>
                  <div class="media-wrap">
                    <img v-if="deployImg" :src="deployImg" alt="部署界面" class="media-img" />
                    <div v-else class="media-placeholder">
                      <span class="ph-icon">🖥️</span>
                      <span class="ph-text">部署界面截图 01</span>
                      <span class="ph-hint">（引入后替换占位符）</span>
                    </div>
                    <div class="media-badge">腾讯云 · OpenClaw 部署界面</div>
                  </div>
                </div>
              </div>

              <!-- Step 2 -->
              <div class="step">
                <div class="step-num">02</div>
                <div class="step-content">
                  <div class="step-title">Skills 模块配置</div>
                  <div class="step-desc">
                    OpenClaw 的核心能力来自可插拔的 <strong>Skills</strong> 模块。
                    不同 Skills 之间可以互相搭配调用，形成复合工作流，实现更复杂的自动化任务。
                  </div>
                  <div class="skills-grid">
                    <div class="skill-card" v-for="skill in skills" :key="skill.name">
                      <div class="skill-icon">{{ skill.icon }}</div>
                      <div class="skill-info">
                        <div class="skill-name">{{ skill.name }}</div>
                        <div class="skill-desc">{{ skill.desc }}</div>
                      </div>
                      <div class="skill-tag" :class="skill.type">{{ skill.typeLabel }}</div>
                    </div>
                  </div>
                  <div class="skills-combo">
                    <div class="combo-title">Skills 组合示例</div>
                    <div class="combo-row">
                      <div class="combo-skill">🌐 网页爬取</div>
                      <div class="combo-plus">+</div>
                      <div class="combo-skill">🤖 AI 总结</div>
                      <div class="combo-plus">+</div>
                      <div class="combo-skill">📤 文件输出</div>
                      <div class="combo-equal">=</div>
                      <div class="combo-result">📋 一键生成竞品报告</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3 -->
              <div class="step">
                <div class="step-num">03</div>
                <div class="step-content">
                  <div class="step-title">QQ 聊天远程操控</div>
                  <div class="step-desc">
                    部署完成后，直接在 <strong>QQ 对话框</strong>中发送指令，
                    OpenClaw 实时解析意图，调度对应 Skills 自动执行，
                    完成后将结果回传至 QQ，全程无需开电脑。
                  </div>
                  <div class="media-wrap">
                    <img v-if="chatImg" :src="chatImg" alt="QQ聊天操控界面" class="media-img" />
                    <div v-else class="media-placeholder chat-ph">
                      <span class="ph-icon">💬</span>
                      <span class="ph-text">QQ 聊天界面截图 02</span>
                      <span class="ph-hint">（引入后替换占位符）</span>
                    </div>
                    <div class="media-badge">QQ 聊天 · 远程指令下达</div>
                  </div>
                  <div class="chat-demo">
                    <div class="chat-msg user">
                      <div class="chat-bubble user-bubble">
                        帮我搜索今天 A 股涨幅前 10 的股票，整理成表格发给我
                      </div>
                      <div class="chat-meta">用户指令</div>
                    </div>
                    <div class="chat-msg bot">
                      <div class="chat-avatar">🦞</div>
                      <div>
                        <div class="chat-bubble bot-bubble">
                          ✅ 收到！正在调用 [网页搜索] + [数据整理] Skills...
                          <br/><br/>
                          📊 已完成，今日 A 股涨幅 Top 10 如下：
                          <br/>1. XXX +9.98%  2. XXX +9.96% ...
                          <br/><br/>
                          📎 完整表格已保存至 /output/stocks_today.xlsx
                        </div>
                        <div class="chat-meta">OpenClaw 回复</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 4 -->
              <div class="step">
                <div class="step-num">04</div>
                <div class="step-content">
                  <div class="step-title">应用场景与价值</div>
                  <div class="step-desc">一套部署，解锁多种远程自动化应用场景：</div>
                  <div class="use-cases">
                    <div class="use-card" v-for="uc in useCases" :key="uc.title">
                      <span class="use-icon">{{ uc.icon }}</span>
                      <div class="use-title">{{ uc.title }}</div>
                      <div class="use-desc">{{ uc.desc }}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <!-- 总结 -->
            <div class="summary-bar">
              <div class="summary-item">
                <div class="summary-num">24<span class="unit">h</span></div>
                <div class="summary-label">全天候在线</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">∞</div>
                <div class="summary-label">可扩展 Skills</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">1</div>
                <div class="summary-label">QQ 消息下达指令</div>
              </div>
              <div class="summary-divider" />
              <div class="summary-item">
                <div class="summary-num">0</div>
                <div class="summary-label">需要开电脑</div>
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

// 引入图片说明：
import deployImg from '../assets/openclaw-部署界面01.png'
import chatImg   from '../assets/openclaw-聊天界面02.png'
// const deployImg = null
// const chatImg   = null

const props = defineProps({ visible: Boolean })
defineEmits(['close'])
watch(() => props.visible, v => { document.body.style.overflow = v ? 'hidden' : '' })

const skills = [
  { icon: '🌐', name: '网页爬取',   desc: '自动抓取指定页面内容与数据',  type: 'base',   typeLabel: '基础' },
  { icon: '🤖', name: 'AI 总结',    desc: '调用大模型对内容进行分析处理', type: 'ai',     typeLabel: 'AI'   },
  { icon: '📁', name: '文件操作',   desc: '读写、移动、整理本地文件',     type: 'base',   typeLabel: '基础' },
  { icon: '⏰', name: '定时任务',   desc: '设定时间自动触发执行',         type: 'system', typeLabel: '系统' },
  { icon: '📤', name: '消息推送',   desc: '将结果回传至 QQ / 邮件',      type: 'output', typeLabel: '输出' },
  { icon: '🖱️', name: 'GUI 操作',  desc: '模拟鼠标键盘操作桌面程序',    type: 'system', typeLabel: '系统' },
]

const useCases = [
  { icon: '📈', title: '数据监控', desc: '定时抓取股价/汇率/竞品数据，自动推送报告' },
  { icon: '🗂️', title: '批量文件处理', desc: '远程批量重命名、格式转换、整理归档' },
  { icon: '🤖', title: '自动化工作流', desc: '多 Skills 串联，实现跨平台复杂任务自动执行' },
  { icon: '🔔', title: '信息订阅推送', desc: '关键词监控、新闻聚合，主动推送至 QQ' },
]
</script>

<style scoped>
.modal-backdrop {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0, 10, 4, 0.75); backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center; padding: 24px;
}
.modal-panel {
  position: relative; width: 100%; max-width: 860px; max-height: 90vh;
  background: #f0fdf4; border-radius: 28px; overflow: hidden; overflow-y: auto;
  box-shadow: 0 40px 120px rgba(22,163,74,0.2), 0 0 0 1px rgba(22,163,74,0.12);
  scrollbar-width: thin; scrollbar-color: rgba(22,163,74,0.3) transparent;
}
.modal-panel::-webkit-scrollbar { width: 4px; }
.modal-panel::-webkit-scrollbar-thumb { background: rgba(22,163,74,0.3); border-radius:2px; }

.close-btn {
  position: sticky; top: 16px; left: 100%;
  float: right; margin: 16px 16px -48px 0;
  width: 40px; height: 40px; border-radius: 50%;
  border: 1.5px solid rgba(22,163,74,0.25);
  background: rgba(255,255,255,0.9); backdrop-filter: blur(8px);
  color: #4b5563; font-size: 14px; cursor: pointer; z-index: 10;
  transition: all .2s; display: flex; align-items: center; justify-content: center;
}
.close-btn:hover { background: #16a34a; color: #fff; border-color: #16a34a; transform: rotate(90deg); }

.modal-hero {
  position: relative; width: 100%; height: 220px; overflow: hidden;
  background: linear-gradient(135deg, #021a08 0%, #064e1e 50%, #0d6b2c 100%);
  display: flex; align-items: flex-end;
}
.hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(ellipse at 30% 70%, rgba(22,163,74,0.4) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 25%, rgba(134,239,172,0.15) 0%, transparent 50%);
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,10,4,0.88) 0%, rgba(0,10,4,0.1) 60%, transparent 100%);
}
.hero-meta { position: relative; z-index: 1; padding: 32px 36px; }
.hero-cat {
  display: inline-block; padding: 4px 14px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
  background: rgba(22,163,74,0.3); border: 1px solid rgba(22,163,74,0.5);
  color: #86efac; margin-bottom: 10px;
}
.hero-title { font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 700; color: #fff; letter-spacing: -1px; margin-bottom: 6px; }
.hero-sub { font-size: 14px; color: rgba(255,255,255,0.55); letter-spacing: .5px; }

.modal-body { padding: 40px 40px 48px; }
.body-header { margin-bottom: 48px; }
.section-tag {
  font-size: 11px; color: #16a34a; font-weight: 600;
  letter-spacing: 2px; text-transform: uppercase;
  display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
}
.section-tag::before { content:''; width:24px; height:1.5px; background:#16a34a; border-radius:1px; }
.body-title { font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700; color: #052e16; letter-spacing: -.8px; margin-bottom: 12px; }
.body-desc { font-size: 15px; color: #374151; line-height: 1.75; }
.body-desc strong { color: #16a34a; font-weight: 600; }

.steps { display: flex; flex-direction: column; gap: 48px; }
.step { display: flex; gap: 24px; }
.step-num {
  font-family: 'Space Grotesk', sans-serif; font-size: 48px; font-weight: 700; line-height: 1;
  background: linear-gradient(135deg, rgba(22,163,74,0.18), rgba(4,120,87,0.1));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  min-width: 56px; padding-top: 2px; flex-shrink: 0;
}
.step-content { flex: 1; }
.step-title { font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 700; color: #052e16; margin-bottom: 10px; }
.step-desc { font-size: 14px; color: #374151; line-height: 1.7; margin-bottom: 20px; }
.step-desc strong { color: #16a34a; font-weight: 600; }

/* media */
.media-wrap {
  position: relative; border-radius: 16px; overflow: hidden;
  border: 1.5px solid rgba(22,163,74,0.18);
  box-shadow: 0 4px 20px rgba(22,163,74,0.1);
  background: #fff; margin-bottom: 16px;
}
.media-img { width: 100%; max-height: 280px; object-fit: cover; display: block; }
.media-placeholder {
  width: 100%; height: 200px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  background: linear-gradient(135deg, #dcfce7, #86efac);
}
.chat-ph { background: linear-gradient(135deg, #f0fdf4, #dcfce7); }
.ph-icon { font-size: 40px; }
.ph-text { font-size: 15px; font-weight: 600; color: rgba(5,46,22,0.5); font-family: 'Space Grotesk', sans-serif; }
.ph-hint { font-size: 12px; color: rgba(5,46,22,0.3); }
.media-badge {
  position: absolute; bottom: 12px; left: 12px;
  padding: 4px 12px; border-radius: 100px;
  font-size: 11px; font-weight: 600; letter-spacing: 1px;
  background: rgba(255,255,255,0.88); backdrop-filter: blur(6px);
  color: #16a34a; border: 1px solid rgba(22,163,74,0.2);
}

/* skills */
.skills-grid { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.skill-card {
  display: flex; align-items: center; gap: 14px; padding: 12px 16px;
  background: rgba(255,255,255,0.7); border-radius: 14px;
  border: 1.5px solid rgba(22,163,74,0.12); transition: all .3s;
}
.skill-card:hover { border-color: #16a34a; transform: translateX(4px); }
.skill-icon { font-size: 22px; flex-shrink: 0; }
.skill-info { flex: 1; }
.skill-name { font-size: 14px; font-weight: 600; color: #052e16; font-family: 'Space Grotesk', sans-serif; }
.skill-desc { font-size: 12px; color: #6b7280; margin-top: 2px; }
.skill-tag {
  padding: 3px 10px; border-radius: 100px;
  font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;
  flex-shrink: 0;
}
.skill-tag.base   { background: rgba(22,163,74,0.1);  color: #16a34a; }
.skill-tag.ai     { background: rgba(99,102,241,0.1); color: #6366f1; }
.skill-tag.system { background: rgba(249,115,22,0.1); color: #ea580c; }
.skill-tag.output { background: rgba(14,165,233,0.1); color: #0ea5e9; }

.skills-combo {
  background: rgba(22,163,74,0.05); border: 1.5px solid rgba(22,163,74,0.12);
  border-radius: 14px; padding: 16px 20px;
}
.combo-title { font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #16a34a; margin-bottom: 12px; }
.combo-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
.combo-skill {
  padding: 6px 14px; background: #fff; border-radius: 10px;
  font-size: 13px; font-weight: 500; color: #052e16;
  border: 1px solid rgba(22,163,74,0.2);
}
.combo-plus, .combo-equal { font-size: 16px; color: #16a34a; font-weight: 700; }
.combo-result {
  padding: 6px 14px; background: #16a34a; border-radius: 10px;
  font-size: 13px; font-weight: 600; color: #fff;
}

/* chat demo */
.chat-demo {
  background: rgba(255,255,255,0.6); border-radius: 16px; padding: 20px;
  border: 1.5px solid rgba(22,163,74,0.12); display: flex; flex-direction: column; gap: 16px;
}
.chat-msg { display: flex; gap: 10px; }
.chat-msg.user { justify-content: flex-end; }
.chat-bubble {
  max-width: 80%; padding: 12px 16px; border-radius: 16px;
  font-size: 13px; line-height: 1.7; color: #052e16;
}
.user-bubble { background: #dcfce7; border-radius: 16px 16px 4px 16px; color: #052e16; }
.bot-bubble  { background: #fff; border: 1.5px solid rgba(22,163,74,0.2); border-radius: 4px 16px 16px 16px; }
.chat-avatar { font-size: 28px; flex-shrink: 0; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; }
.chat-meta { font-size: 10px; color: #9ca3af; margin-top: 4px; text-align: right; letter-spacing: .5px; }
.chat-msg.bot .chat-meta { text-align: left; }

/* use cases */
.use-cases { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.use-card {
  padding: 18px 16px; border-radius: 16px;
  background: rgba(255,255,255,0.7);
  border: 1.5px solid rgba(22,163,74,0.15);
  transition: all .3s;
}
.use-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(22,163,74,0.15); border-color: #16a34a; }
.use-icon { font-size: 28px; display: block; margin-bottom: 10px; }
.use-title { font-size: 14px; font-weight: 700; color: #052e16; margin-bottom: 6px; font-family: 'Space Grotesk', sans-serif; }
.use-desc  { font-size: 12px; color: #6b7280; line-height: 1.6; }

/* summary */
.summary-bar {
  display: flex; align-items: center; justify-content: space-around;
  margin-top: 48px; padding: 28px 32px;
  background: linear-gradient(135deg, rgba(22,163,74,0.07), rgba(4,120,87,0.04));
  border: 1.5px solid rgba(22,163,74,0.15); border-radius: 20px;
}
.summary-item { text-align: center; }
.summary-num {
  font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700;
  background: linear-gradient(135deg, #16a34a, #047857);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1;
}
.summary-num .unit { font-size: 20px; }
.summary-label { font-size: 12px; color: #6b7280; margin-top: 6px; font-weight: 500; }
.summary-divider { width: 1px; height: 40px; background: rgba(22,163,74,0.15); }

.modal-enter-active { transition: all .4s cubic-bezier(0.16, 1, 0.3, 1); }
.modal-leave-active { transition: all .25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-panel { transform: translateY(40px) scale(0.97); }
.modal-leave-to   .modal-panel { transform: translateY(20px) scale(0.98); }

@media (max-width: 640px) {
  .modal-backdrop { padding: 0; align-items: flex-end; }
  .modal-panel { border-radius: 24px 24px 0 0; max-height: 95vh; }
  .modal-body { padding: 24px 24px 40px; }
  .use-cases { grid-template-columns: 1fr; }
  .combo-row { flex-direction: column; align-items: flex-start; }
  .summary-bar { flex-wrap: wrap; gap: 20px; }
  .summary-divider { display: none; }
}
</style>
