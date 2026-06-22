export const profile = {
  name: '你的名字',
  role: 'AIGC 训练师 / AI 内容创作者',
  headline: '记录 AI 作品、训练方法与内容生产流程',
  summary:
    '这是一个面向简历展示的个人 AI 作品博客。我在这里整理生成式 AI 作品、Prompt 实验、模型评估方法和项目复盘，让招聘方快速了解我的审美、方法论和交付能力。',
  email: 'hello@example.com',
  phone: '+86 138 0000 0000',
  location: 'Shanghai / Remote',
  availability: 'Open to AIGC / AI Content Roles',
}

export const navItems = [
  { label: '首页', href: '#home' },
  { label: '作品', href: '#works' },
  { label: '笔记', href: '#notes' },
  { label: '经历', href: '#experience' },
]

export const metrics = [
  { label: '精选作品', value: '18+' },
  { label: 'Prompt 实验', value: '120+' },
  { label: '项目复盘', value: '9' },
]

export const categories = [
  { id: 'all', label: '全部' },
  { id: 'visual', label: '视觉作品' },
  { id: 'prompt', label: 'Prompt' },
  { id: 'workflow', label: '工作流' },
  { id: 'review', label: '复盘' },
]

export const works = [
  {
    id: 'work-001',
    type: 'visual',
    title: 'AI 产品视觉探索',
    date: '2026.05',
    tags: ['Midjourney', '产品摄影', '质感控制'],
    cover:
      'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=86',
    summary: '围绕香氛、饮品和科技产品做材质、光线与构图测试，沉淀可复用的生成模板。',
    detail:
      '这个系列关注 AI 生成图在商业产品场景中的可控性：包括材质词、布光方向、景深、背景约束和负面提示词。产出不仅是图片，也包括一套可复用的测试表。',
  },
  {
    id: 'work-002',
    type: 'prompt',
    title: '品牌风格 Prompt 矩阵',
    date: '2026.04',
    tags: ['Prompt Engineering', '品牌调性', '批量测试'],
    cover:
      'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1200&q=86',
    summary: '把品牌调性拆成镜头、色彩、材质、情绪和排除项，提升多批次输出一致性。',
    detail:
      '通过变量矩阵管理 Prompt，让团队可以对比不同关键词组合的稳定性。每次测试都记录模型版本、参数、效果评分和可复用结论。',
  },
  {
    id: 'work-003',
    type: 'workflow',
    title: 'AIGC 内容质检流程',
    date: '2026.03',
    tags: ['评估标准', '多模态', '内容安全'],
    cover:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=86',
    summary: '建立图文一致性、视觉质量、品牌边界和风险项检查表，让输出更可交付。',
    detail:
      '我将主观审美拆成可检查项，比如主体完整度、商业可用性、品牌一致性、文字风险和场景合理性。适合团队协作和后续后台管理系统沉淀。',
  },
  {
    id: 'work-004',
    type: 'visual',
    title: 'AI 角色氛围图集',
    date: '2026.02',
    tags: ['角色设定', '风格探索', '视觉叙事'],
    cover:
      'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=1200&q=86',
    summary: '探索角色设定、服饰、动作、场景情绪之间的稳定生成关系。',
    detail:
      '这个项目更偏创意实验，用于观察同一角色在不同场景和光线里的保持能力，也记录了失败样本和修正方式。',
  },
]

export const posts = [
  {
    id: 'post-001',
    category: 'review',
    title: '如何判断一张 AI 图是否能用于真实项目？',
    date: '2026.05.18',
    readTime: '6 min',
    summary: '从主体、光线、商业目的、品牌一致性和风险边界五个维度做快速判断。',
  },
  {
    id: 'post-002',
    category: 'prompt',
    title: '我的 Prompt 记录表结构',
    date: '2026.04.27',
    readTime: '4 min',
    summary: '记录模型、参数、变量、评分和复盘结论，比单纯收藏提示词更有价值。',
  },
  {
    id: 'post-003',
    category: 'workflow',
    title: 'AIGC 训练师如何和设计、运营协作？',
    date: '2026.04.08',
    readTime: '5 min',
    summary: '把业务语言翻译成生成目标，把视觉判断沉淀成团队可复用标准。',
  },
]

export const experience = [
  {
    id: 'exp-001',
    period: '2024 - Now',
    role: 'AIGC 训练师',
    company: '项目 / 团队经历',
    summary: '负责 AI 内容训练、Prompt 流程、样本评估和生成结果质检。',
  },
  {
    id: 'exp-002',
    period: '2022 - 2024',
    role: '视觉内容设计',
    company: '品牌 / 内容方向',
    summary: '参与品牌视觉、营销素材和内容栏目设计，积累商业视觉判断。',
  },
]

export const skills = ['Prompt 工程', '图像生成', '内容质检', '样本标注', '品牌视觉', '项目复盘']
