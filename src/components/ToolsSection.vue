<template>
  <section id="tools">
    <div class="section-header reveal">
      <div class="section-tag">工具生态</div>
      <h2 class="section-title">常用 <span>AI 工具</span></h2>
    </div>
    <div class="tools-grid reveal">
      <a
        v-for="tool in tools"
        :key="tool.name"
        :href="tool.url"
        target="_blank"
        class="tool-card"
        :style="{ '--c': tool.color }"
      >
        <div class="tool-logo">{{ tool.logo }}</div>
        <div class="tool-name">{{ tool.name }}</div>
        <div class="tool-desc">{{ tool.desc }}</div>
        <span class="tool-tag" :style="{ background: tool.color + '18', color: tool.color, border: '1px solid ' + tool.color + '33' }">
          {{ tool.tag }}
        </span>
      </a>
    </div>
  </section>
</template>

<script setup>
import { useReveal } from '../composables/useReveal'
useReveal()

const tools = [
  { name:'Claude',      logo:'🤖', tag:'对话 AI',  color:'#f97316', url:'https://claude.ai',                    desc:'Anthropic 出品，逻辑推理与长文本处理顶尖水平。' },
  { name:'ChatGPT',     logo:'✨', tag:'对话 AI',  color:'#10b981', url:'https://chat.openai.com',              desc:'OpenAI 旗舰，支持 GPT-4o 多模态能力，生态最完善。' },
  { name:'Midjourney',  logo:'🎨', tag:'图像生成', color:'#e11d48', url:'https://www.midjourney.com',           desc:'目前画质最强的 AI 图像生成工具，商业设计首选。' },
  { name:'Runway',      logo:'🎬', tag:'视频生成', color:'#dc2626', url:'https://runway.com',                   desc:'AI 视频生成与编辑，Gen-3 模型支持精准运动控制。' },
  { name:'Figma AI',    logo:'🖼️', tag:'设计工具', color:'#f97316', url:'https://www.figma.com',               desc:'设计界标准工具，内置 AI 辅助设计和原型生成功能。' },
  { name:'Cursor',      logo:'⌨️', tag:'编程助手', color:'#7c3aed', url:'https://cursor.sh',                   desc:'AI 驱动的代码编辑器，Composer 模式可整项目生成代码。' },
  { name:'Perplexity',  logo:'🔍', tag:'AI 搜索',  color:'#0891b2', url:'https://perplexity.ai',               desc:'AI 搜索引擎，实时联网检索并给出结构化引用回答。' },
  { name:'ElevenLabs',  logo:'🎙️', tag:'语音 AI',  color:'#ea580c', url:'https://elevenlabs.io',               desc:'超拟真 AI 语音合成，支持声音克隆与多语言配音。' },
  { name:'Notion AI',   logo:'📝', tag:'效率工具', color:'#92400e', url:'https://www.notion.so/product/ai',    desc:'工作空间内置 AI，文档写作、摘要、数据库查询一站式。' },
  { name:'Pika',        logo:'🌀', tag:'视频 AI',  color:'#db2777', url:'https://pika.art',                    desc:'图生视频神器，简单操作让静态图片动起来，效果惊艳。' },
  { name:'HeyGen',      logo:'🧑‍💼', tag:'数字人',  color:'#16a34a', url:'https://www.heygen.com',              desc:'AI 数字人视频，输入文字自动生成真人口播，支持中文。' },
  { name:'Suno',        logo:'🎵', tag:'音乐生成', color:'#d97706', url:'https://suno.ai',                     desc:'AI 音乐创作，输入风格描述直接生成带歌词的完整歌曲。' },
]
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

.tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px,1fr)); gap: 16px; }

.tool-card {
  background: rgba(255,255,255,0.65);
  border: 1.5px solid rgba(249,115,22,0.12);
  border-radius: 18px; padding: 24px 20px;
  color: var(--text);
  transition: all .3s; position: relative; overflow: hidden;
  display: flex; flex-direction: column; gap: 12px;
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 16px rgba(249,115,22,0.05);
}
.tool-card::before {
  content:''; position: absolute; top:0; left:0; right:0; height:2px;
  background: linear-gradient(90deg, transparent, var(--c), transparent);
  opacity: 0; transition: opacity .3s;
}
.tool-card:hover::before { opacity: 1; }
.tool-card:hover {
  transform: translateY(-5px);
  border-color: rgba(249,115,22,0.28);
  box-shadow: 0 16px 50px rgba(249,115,22,0.15);
  background: rgba(255,255,255,0.9);
}

.tool-logo { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:22px; background:rgba(249,115,22,0.08); }
.tool-name { font-size:15px; font-weight:600; font-family:'Space Grotesk',sans-serif; }
.tool-desc { font-size:12px; color:var(--muted); line-height:1.55; flex:1; }
.tool-tag { display:inline-block; padding:3px 10px; border-radius:100px; font-size:11px; font-weight:600; width:fit-content; letter-spacing:.5px; }

.reveal { opacity:0; transform:translateY(36px); transition:opacity .8s cubic-bezier(0.16,1,0.3,1), transform .8s cubic-bezier(0.16,1,0.3,1); }
.reveal.visible { opacity:1; transform:translateY(0); }

@media (max-width:768px) { section { padding:80px 24px; } }
</style>
