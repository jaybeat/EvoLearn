import type { PageOutline, CognitiveStep } from './types';

const JSON_RULE = `
你必须输出严格有效的 JSON，不要输出任何 Markdown 代码块标记（如 \`\`\`json），不要输出任何解释性文字，只输出纯 JSON。
所有字符串内容必须使用简体中文。
`.trim();

// ─────────────────────────────────────────────
// Step 1: 叙事分析与分页
// ─────────────────────────────────────────────

export function buildStep1SystemPrompt(): string {
  return `
你是一位拥有 20 年经验的教学设计专家，擅长将技术文章转化为可交互的微型课程。
你的任务是把一篇技术文章按"认知跃迁点"拆分为 Lesson Page。
${JSON_RULE}
`.trim();
}

export function buildStep1UserPrompt(sourceText: string, lessonTitle?: string): string {
  return `
${lessonTitle ? `课时标题：${lessonTitle}\n` : ''}原文全文：
"""
${sourceText}
"""

请根据以下 5 条判断标准把原文拆分为 Lesson Page，输出 JSON 数组。

标准 1：单一顿悟原则（最重要）
每页只讲一个"啊哈时刻"（keyInsight）。如果一页出现了两个顿悟点（比如"线性扫描慢"和"二分查找快"），立即拆成两页。

标准 2：手机一屏原则
每页总内容（所有文字+交互说明）应该控制在手机一屏到一屏半之间。
- 正文文字总量不超过 250 字。
- 任何超过 150 字的连续论述段落，都应该考虑拆页或至少在该页后续插入交互打断。
- estimatedReadSeconds 控制在 30-90 秒之间。

标准 3：交互独占原则
如果一页的核心内容是交互（演示或操作），这个交互必须是该页的"主角"。交互前后最多各配 1 段简短文字（引入+总结），不能被淹没在大段文字里。

标准 4：节奏交替原则
避免连续 3 页以上都是纯阅读。理想节奏是：文本页 → 演示交互页 → 文本页 → 检测页。
如果内容不得不连续阅读，中间至少预留一个"检测点页"（multipleChoice 或 reflection）。
在分页时你就要预判：这页是纯文本，下一页是否也大概率是纯文本？如果是，考虑把其中一个纯文本页末尾的内容改为检测点，或提前插入一个轻量交互概念。

标准 5：退出友好原则
每页结束于一个"自然的停顿点"——一个问题、一个结论、或一个交互结果。
- 不要把一个论证的"前提"和"结论"拆在两页（用户中途退出再回来会断片）。
- 也不要把两个独立的论证硬塞在一页（用户不知道这一页到底在讲什么）。

输出格式（JSON 数组）：
[
  {
    "pageNumber": 1,
    "theme": "本页主题，概括这一页在讲什么",
    "cognitiveGoal": {
      "level": "理解",
      "description": "用户能解释为什么..."
    },
    "emotionalArc": "轻松→困惑→顿悟",
    "keyInsight": "这一页最核心的顿悟点是什么",
    "sourceParagraphs": ["原文中对应段落的大意1", "大意2"],
    "estimatedReadSeconds": 45
  }
]
`.trim();
}

// ─────────────────────────────────────────────
// Step 2: 认知步骤与组件设计
// ─────────────────────────────────────────────

export function buildStep2SystemPrompt(): string {
  return `
你是一位拥有 20 年经验的教学设计专家，擅长为每一页课程内容设计认知步骤和匹配的内容组件。
${JSON_RULE}
`.trim();
}

export function buildStep2UserPrompt(
  sourceText: string,
  pageOutlines: PageOutline[],
): string {
  return `
原文全文：
"""
${sourceText}
"""

Step 1 的分页结果：
${JSON.stringify(pageOutlines, null, 2)}

请为每一页设计 3-5 个认知步骤（cognitive steps），并为每个步骤匹配最合适的内容组件。

核心方法论：从认知目标倒推组件
认知目标层级（布鲁姆简化版）决定交互需求：
- 记忆/理解 → text + illustration 即可
- 应用 → 演示交互（看一遍正确操作）
- 分析 → 演示交互 + callout 对比
- 评价/创造 → reflection（开放思考）

情绪状态质变判断：
如果用户的情绪状态发生了质变（从轻松→困惑、从困惑→顿悟、从希望→绝望），这一步必须插入 callout 或交互来标记这个转折点。

判断"是否需要交互"的三问法（对每一页都要问自己）：
1. 这页涉及动态过程吗？（随时间变化、有因果关系）→ 必须加演示交互。
2. 这页的核心概念是操作性的吗？（用户需要会做，而不只是知道）→ 当前项目暂不支持游戏型交互组件，请用 reflection 代替，让用户在脑中模拟操作。
3. 用户理解错了会影响后续所有页吗？→ 必须先演示（给正确答案），再检测。

交互独占原则：
如果一页有交互，交互是该页"主角"。其他内容最多 2 段文字（引入+总结）。

当前项目组件约束（必须严格遵循）：
- hero: 仅在每页开头使用，用于设定情境、提出核心问题。每页最多 1 个。
- text (default): 用于传递信息、解释概念。
- text (callout): 用于强调转折、冲突、关键结论。情绪质变点必须使用。
- text (tip): 用于给出实用建议、行动指南。总结页使用。
- knowledgeCard: 用于总结核心概念，以卡片形式呈现。emoji 必须简短（1-2 个字符）。
- illustration: 用于需要视觉化理解的内容。key 值用英文 camelCase 描述插画主题（如"binaryTreeStructure"）。
- interaction_placeholder (demo): 用于需要用户"观看动态过程"来理解的场景，如算法执行过程。当前项目只支持演示型交互（steppedDemo），不支持游戏型交互。
- multipleChoice: 用于检测用户是否掌握了某个明确的对错概念。只在步骤 3 中使用，这里不要出现。
- reflection: 用于引导用户联系自身经验。只在步骤 3 中使用，这里不要出现。

每个认知步骤必须包含：
- stepOrder: 步骤序号（1, 2, 3...）
- userMentalState: 用户此时的心理状态（如"刚进入，需要理解任务"、"体验中，感受挫败"）
- contentPurpose: 这一步的内容目的（如"设定情境，降低认知负荷"）
- component: 组件类型
- proposedContent: 该组件建议填充的内容（对象格式，字段因组件而异）
- interactionType: 如果是 interaction_placeholder，只能填 "demo"（当前项目不支持 game）

输出格式（JSON 数组）：
[
  {
    "pageNumber": 1,
    "steps": [
      {
        "stepOrder": 1,
        "userMentalState": "...",
        "contentPurpose": "...",
        "component": "hero",
        "proposedContent": { "title": "...", "subtitle": "..." }
      }
    ]
  }
]
`.trim();
}

// ─────────────────────────────────────────────
// Step 3: 交互与检测设计
// ─────────────────────────────────────────────

export function buildStep3SystemPrompt(): string {
  return `
你是一位拥有 20 年经验的教学设计专家，擅长把认知步骤落实为具体的可交互内容块。
你必须严格输出纯 JSON，不要输出任何解释文字或 Markdown 代码块标记。
所有文本内容使用简体中文。
`.trim();
}

function getSteppedDemoInstructions(): string {
  return `
对于 steppedDemo 组件，你必须严格按照以下格式输出：

**Array 可视化器**（visualizerType: "array"）：
- 用于展示数组/列表的动态变化过程，如搜索、排序、插入、删除。
- state 格式：
  {
    "items": [
      { "value": 50, "status": "normal" },
      { "value": 30, "status": "highlighted", "label": "mid" },
      { "value": 70, "status": "excluded" }
    ],
    "counter": { "label": "比较次数", "value": 1 }
  }
- status 可选值："normal"（普通）、"highlighted"（高亮/当前关注）、"excluded"（已排除）、"inserting"（正在插入）、"removing"（正在删除）。
- label 可选，用于标注特殊位置（如"mid""target""new""del"）。
- counter 可选，用于显示计数器。

**Tree 可视化器**（visualizerType: "tree"）：
- 用于展示树形结构的遍历、搜索、插入过程。
- state 格式：
  {
    "nodes": [
      { "id": "n50", "value": 50, "x": 50, "y": 12, "status": "normal" },
      { "id": "n30", "value": 30, "x": 25, "y": 32, "status": "highlighted" }
    ],
    "edges": [
      { "from": "n50", "to": "n30", "status": "normal" },
      { "from": "n50", "to": "n70", "status": "highlighted" }
    ]
  }
- node status 可选值："normal"、"highlighted"、"new"。
- edge status 可选值："normal"、"highlighted"。
- 坐标 x 范围 0-100，y 范围 0-70，根节点在上方（y 值小），叶子节点在下方（y 值大）。

**步骤设计原则**：
- 每个 step 必须有 narration（讲解文字，30-80 字）。
- 步骤数控制在 3-8 步，每一步展示一个状态变化。
- 第一步总是展示初始状态，最后一步展示最终结果或结论。
`.trim();
}

export function buildStep3UserPrompt(
  sourceText: string,
  step2Pages: { pageNumber: number; steps: CognitiveStep[] }[],
): string {
  return `
原文全文：
"""
${sourceText}
"""

Step 2 的认知步骤设计：
${JSON.stringify(step2Pages, null, 2)}

请把每一步认知步骤落实为具体的 content blocks。输出 JSON 数组。

可用 block 类型及格式：

1. hero: { "type": "hero", "title": "...", "subtitle": "..." }
2. text: { "type": "text", "body": "...", "variant": "default" | "callout" | "tip" }
3. knowledgeCard: { "type": "knowledgeCard", "emoji": "🧠", "title": "...", "body": "..." }
4. illustration: { "type": "illustration", "key": "camelCaseTopicName" }
5. multipleChoice: { "type": "multipleChoice", "question": "...", "options": ["A", "B", "C", "D"], "correctIndex": 1, "explanation": "..." }
   - 选项必须恰好 4 个。
   - correctIndex 是 0-based。
   - 不考死记硬背。问题必须是理解型或应用型。
6. reflection: { "type": "reflection", "prompt": "...", "sampleAnswer": "..." }
   - sampleAnswer 可选，但建议提供作为参考。
7. steppedDemo: { "type": "steppedDemo", "title": "...", "visualizerType": "array" | "tree", "steps": [{ "narration": "...", "state": {...} }] }
${getSteppedDemoInstructions()}

设计规则：

1. 每页的第一个 block 必须是 hero（标题），除非该页内容极少。

2. 手机一屏原则：每页正文文字总量（所有 text.body 字数之和）不超过 250 字。如果超过了，把多余内容拆到下一页或替换为交互。

3. 交互独占原则：如果一页包含 steppedDemo，该 demo 是该页的"主角"。demo 前后最多各配 1 段简短 text（引入+总结），不要淹没在文字里。

4. 节奏交替原则：检查是否出现连续 3 页以上都是纯阅读（没有 steppedDemo、multipleChoice 或 reflection）。如果是，请在其中某一页末尾插入一个 multipleChoice 作为"认知检查点"。

5. 演示型交互判断（当前项目只支持演示型 steppedDemo，不支持游戏型交互）：
   - 涉及动态过程（算法执行、状态变化）→ 必须转换为 steppedDemo。
   - 需要用户"动手操作"的 → 当前项目不支持，请转换为 reflection（让用户在脑中模拟）或 multipleChoice（检测理解）。

6. multipleChoice 使用标准：
   - 用户还没有可检测的知识时（如课程第一页）不用 multipleChoice。
   - 概念封装页需要静思而非选择时不用 multipleChoice。
   - 开放思考前不用 multipleChoice（避免限制思维）。
   - 在有明确对错概念的页尾使用，作为快速诊断。
   - 干扰项设计原则：
     * 干扰项 1：上一页或旧思维的锚定
     * 干扰项 2：数量级误解
     * 干扰项 3：接近正确答案但不精确

7. reflection 使用标准（三条满足至少一条即可使用）：
   - 情绪转折点（如从希望→绝望、从困惑→顿悟的前夜）。reflection 的作用是把情绪转化为求解动机。
   - 具体→抽象的跳板（如从具体算法跳到通用模型）。reflection 迫使大脑做远迁移。
   - 答案不唯一，且任何答案都有价值。reflection 是点燃思考，multipleChoice 是检测理解，二者不能互换。

8. 每页总 block 数控制在 2-6 个。

输出格式（JSON 数组）：
[
  {
    "pageNumber": 1,
    "blocks": [
      { "type": "hero", "title": "...", "subtitle": "..." },
      { "type": "text", "body": "...", "variant": "default" }
    ]
  }
]
`.trim();
}
