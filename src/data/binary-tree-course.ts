import type { Course, LessonPage } from '@/types/course';

const lesson_1_1_content: LessonPage[] = [
  {
    page: 1,
    totalPages: 7,
    blocks: [
      { id: 'bt-p1-hero', type: 'hero', title: '怎么在一堆数里快速找一个数？', subtitle: '从最简单的办法开始' },
      { id: 'bt-p1-text1', type: 'text', body: '假设你手上有这么一组数：50, 30, 70, 20, 40, 60, 80。现在的任务很单纯：判断 43 在不在里面。', variant: 'default' },
      {
        id: 'bt-p1-demo',
        type: 'steppedDemo',
        title: '逐个比对',
        visualizerType: 'array',
        steps: [
          {
            narration: '从头开始，逐个检查每个数字，看是不是 43。',
            state: {
              items: [
                { value: 50, status: 'normal' },
                { value: 30, status: 'normal' },
                { value: 70, status: 'normal' },
                { value: 20, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 60, status: 'normal' },
                { value: 80, status: 'normal' },
              ],
              counter: { label: '比较次数', value: 0 },
            },
          },
          {
            narration: '看第一个数 50。43 是目标吗？不是。',
            state: {
              items: [
                { value: 50, status: 'highlighted' },
                { value: 30, status: 'normal' },
                { value: 70, status: 'normal' },
                { value: 20, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 60, status: 'normal' },
                { value: 80, status: 'normal' },
              ],
              counter: { label: '比较次数', value: 1 },
            },
          },
          {
            narration: '继续看 30。43 是目标吗？不是。',
            state: {
              items: [
                { value: 50, status: 'normal' },
                { value: 30, status: 'highlighted' },
                { value: 70, status: 'normal' },
                { value: 20, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 60, status: 'normal' },
                { value: 80, status: 'normal' },
              ],
              counter: { label: '比较次数', value: 2 },
            },
          },
          {
            narration: '继续看 70、20、40……都不是。',
            state: {
              items: [
                { value: 50, status: 'normal' },
                { value: 30, status: 'normal' },
                { value: 70, status: 'highlighted' },
                { value: 20, status: 'highlighted' },
                { value: 40, status: 'highlighted' },
                { value: 60, status: 'normal' },
                { value: 80, status: 'normal' },
              ],
              counter: { label: '比较次数', value: 5 },
            },
          },
          {
            narration: '最后看到 80。43 是目标吗？不是。结论：不在。共比较 7 次。',
            state: {
              items: [
                { value: 50, status: 'normal' },
                { value: 30, status: 'normal' },
                { value: 70, status: 'normal' },
                { value: 20, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 60, status: 'normal' },
                { value: 80, status: 'highlighted' },
              ],
              counter: { label: '比较次数', value: 7 },
            },
          },
        ],
      },
      { id: 'bt-p1-text3', type: 'text', body: '7 个数看了 7 次。如果有一万个数，平均要看 5000 个，最坏要看一万个。这就是 O(N)，慢得让人难受。', variant: 'callout' },
    ],
  },
  {
    page: 2,
    totalPages: 7,
    blocks: [
      { id: 'bt-p2-hero', type: 'hero', title: '先排序，再查找', subtitle: '一个更快的办法' },
      { id: 'bt-p2-text1', type: 'text', body: '先把数据排好序：20, 30, 40, 50, 60, 70, 80。排好序之后，可以用二分查找。', variant: 'default' },
      {
        id: 'bt-p2-demo',
        type: 'steppedDemo',
        title: '二分查找模拟器',
        visualizerType: 'array',
        steps: [
          {
            narration: '排好序的数组：20, 30, 40, 50, 60, 70, 80。先看中间元素。',
            state: {
              items: [
                { value: 20, status: 'normal' },
                { value: 30, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 50, status: 'normal', label: 'mid' },
                { value: 60, status: 'normal' },
                { value: 70, status: 'normal' },
                { value: 80, status: 'normal' },
              ],
            },
          },
          {
            narration: '中间是 50。43 比 50 小，右边一半（60, 70, 80）全部排除。',
            state: {
              items: [
                { value: 20, status: 'normal' },
                { value: 30, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 50, status: 'highlighted', label: 'mid' },
                { value: 60, status: 'excluded' },
                { value: 70, status: 'excluded' },
                { value: 80, status: 'excluded' },
              ],
            },
          },
          {
            narration: '左半段中间是 30。43 比 30 大，左边一半（20）排除。',
            state: {
              items: [
                { value: 20, status: 'excluded' },
                { value: 30, status: 'highlighted', label: 'mid' },
                { value: 40, status: 'normal' },
                { value: 50, status: 'normal' },
                { value: 60, status: 'excluded' },
                { value: 70, status: 'excluded' },
                { value: 80, status: 'excluded' },
              ],
            },
          },
          {
            narration: '剩下 40。43 比 40 大，右边为空。结论：不在。只比较 3 次。',
            state: {
              items: [
                { value: 20, status: 'excluded' },
                { value: 30, status: 'normal' },
                { value: 40, status: 'highlighted', label: 'mid' },
                { value: 50, status: 'normal' },
                { value: 60, status: 'excluded' },
                { value: 70, status: 'excluded' },
                { value: 80, status: 'excluded' },
              ],
            },
          },
        ],
      },
      { id: 'bt-p2-quiz', type: 'multipleChoice', question: '在一万个有序数中查找，二分查找大约需要比较几次？', options: ['10次', '14次', '100次', '5000次'], correctIndex: 1, explanation: 'log₂(10000) ≈ 14。从 5000 次降到了 14 次，这就是数量级的提升。' },
    ],
  },
  {
    page: 3,
    totalPages: 7,
    blocks: [
      { id: 'bt-p3-hero', type: 'hero', title: '二分查找为什么这么快？', subtitle: '把它的精髓盯住' },
      { id: 'bt-p3-text1', type: 'text', body: '回头看刚才的过程：看到 50，一次排除了 50 右边的一半（60、70、80 都不用看了）；看到 30，一次排除了 30 左边的一半（20 不用看了）；看到 40，定位完成。', variant: 'default' },
      { id: 'bt-p3-card', type: 'knowledgeCard', emoji: '🔑', title: '快的秘诀', body: '线性扫描每看一个数，只能排除"这一个"；二分查找每看一个数，能排除"一大批"。每次排除一个 vs 每次排除一半，这就是 O(N) 和 O(log N) 的根本差异。' },
      { id: 'bt-p3-text2', type: 'text', body: '但二分查找有两个隐含的前提：第一，数据必须有序；第二，得能直接跳到"中间"那个位置。第一条决定了排除是有方向的，第二条决定了排除可以一次完成。', variant: 'default' },
      { id: 'bt-p3-text3', type: 'text', body: '到这儿故事好像已经结束了——查询问题被二分查找漂亮地解决了。我们可以收工了吗？', variant: 'tip' },
    ],
  },
  {
    page: 4,
    totalPages: 7,
    blocks: [
      { id: 'bt-p4-hero', type: 'hero', title: '但问题真的解决了吗？', subtitle: '如果数据会变呢？' },
      { id: 'bt-p4-text1', type: 'text', body: '现实中很少有"先把所有数据准备好、之后再也不变"的场景。更常见的是——数据一直在变。回到我们那一组数，现在要做两件事：插入 43，删除 50。', variant: 'default' },
      {
        id: 'bt-p4-demo',
        type: 'steppedDemo',
        title: '数组的挪动之痛',
        visualizerType: 'array',
        steps: [
          {
            narration: '初始数组：20, 30, 40, 50, 60, 70, 80',
            state: {
              items: [
                { value: 20, status: 'normal' },
                { value: 30, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 50, status: 'normal' },
                { value: 60, status: 'normal' },
                { value: 70, status: 'normal' },
                { value: 80, status: 'normal' },
              ],
            },
          },
          {
            narration: '插入 43：在 40 和 50 之间找到位置，43 挤进来。',
            state: {
              items: [
                { value: 20, status: 'normal' },
                { value: 30, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 43, status: 'inserting', label: 'new' },
                { value: 50, status: 'normal' },
                { value: 60, status: 'normal' },
                { value: 70, status: 'normal' },
                { value: 80, status: 'normal' },
              ],
            },
          },
          {
            narration: '插入完成。注意 50, 60, 70, 80 都被迫挪了一格。',
            state: {
              items: [
                { value: 20, status: 'normal' },
                { value: 30, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 43, status: 'normal' },
                { value: 50, status: 'normal' },
                { value: 60, status: 'normal' },
                { value: 70, status: 'normal' },
                { value: 80, status: 'normal' },
              ],
            },
          },
          {
            narration: '删除 50：先标记它。',
            state: {
              items: [
                { value: 20, status: 'normal' },
                { value: 30, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 43, status: 'normal' },
                { value: 50, status: 'removing', label: 'del' },
                { value: 60, status: 'normal' },
                { value: 70, status: 'normal' },
                { value: 80, status: 'normal' },
              ],
            },
          },
          {
            narration: '50 被移除，后面的元素全部左移一格填补空位。',
            state: {
              items: [
                { value: 20, status: 'normal' },
                { value: 30, status: 'normal' },
                { value: 40, status: 'normal' },
                { value: 43, status: 'normal' },
                { value: 60, status: 'normal' },
                { value: 70, status: 'normal' },
                { value: 80, status: 'normal' },
              ],
            },
          },
        ],
      },
      { id: 'bt-p4-text3', type: 'text', body: '无序数组改起来快，但查起来慢；有序数组查起来快，但改起来慢。我们陷入了两难。', variant: 'callout' },
      { id: 'bt-p4-reflection', type: 'reflection', prompt: '如果让你设计一种数据结构，既要保留"每次排除一半"的精髓，又能让插入和删除不引发大规模挪动，你会从哪个角度突破？', sampleAnswer: '也许可以不把数据挨着放，而是用某种方式"指向"下一个该看的位置，这样插入删除只要改"指向"，不用挪整片数据。' },
    ],
  },
  {
    page: 5,
    totalPages: 7,
    blocks: [
      { id: 'bt-p5-hero', type: 'hero', title: '用指针重新组织数据', subtitle: '二叉搜索树的诞生' },
      { id: 'bt-p5-text1', type: 'text', body: '挪元素的根源，是"位置是连续固定的"。那就改用指针——每个数不挨着别人放，而是用指针指向"它下一步该看哪个数"。这样插入删除只要改指针，不用挪一片数据。', variant: 'default' },
      { id: 'bt-p5-text2', type: 'text', body: '整个结构遵循一条贯穿的铁律——每一个节点，它左边那一片的所有数都比它小，右边那一片的所有数都比它大。这条规则在每一层、每一个节点上都成立。', variant: 'default' },
      {
        id: 'bt-p5-demo',
        type: 'steppedDemo',
        title: 'BST 查询路径',
        visualizerType: 'tree',
        steps: [
          {
            narration: '这就是二叉搜索树。每一个节点，左边所有数都比它小，右边所有数都比它大。',
            state: {
              nodes: [
                { id: 'n50', value: 50, x: 50, y: 12, status: 'normal' },
                { id: 'n30', value: 30, x: 25, y: 32, status: 'normal' },
                { id: 'n70', value: 70, x: 75, y: 32, status: 'normal' },
                { id: 'n20', value: 20, x: 12, y: 52, status: 'normal' },
                { id: 'n40', value: 40, x: 38, y: 52, status: 'normal' },
                { id: 'n60', value: 60, x: 62, y: 52, status: 'normal' },
                { id: 'n80', value: 80, x: 88, y: 52, status: 'normal' },
              ],
              edges: [
                { from: 'n50', to: 'n30', status: 'normal' },
                { from: 'n50', to: 'n70', status: 'normal' },
                { from: 'n30', to: 'n20', status: 'normal' },
                { from: 'n30', to: 'n40', status: 'normal' },
                { from: 'n70', to: 'n60', status: 'normal' },
                { from: 'n70', to: 'n80', status: 'normal' },
              ],
            },
          },
          {
            narration: '查 43 在不在？从根节点 50 开始。',
            state: {
              nodes: [
                { id: 'n50', value: 50, x: 50, y: 12, status: 'highlighted' },
                { id: 'n30', value: 30, x: 25, y: 32, status: 'normal' },
                { id: 'n70', value: 70, x: 75, y: 32, status: 'normal' },
                { id: 'n20', value: 20, x: 12, y: 52, status: 'normal' },
                { id: 'n40', value: 40, x: 38, y: 52, status: 'normal' },
                { id: 'n60', value: 60, x: 62, y: 52, status: 'normal' },
                { id: 'n80', value: 80, x: 88, y: 52, status: 'normal' },
              ],
              edges: [
                { from: 'n50', to: 'n30', status: 'normal' },
                { from: 'n50', to: 'n70', status: 'normal' },
                { from: 'n30', to: 'n20', status: 'normal' },
                { from: 'n30', to: 'n40', status: 'normal' },
                { from: 'n70', to: 'n60', status: 'normal' },
                { from: 'n70', to: 'n80', status: 'normal' },
              ],
            },
          },
          {
            narration: '43 比 50 小，走左边。右边整片（70, 60, 80）一次性排除。',
            state: {
              nodes: [
                { id: 'n50', value: 50, x: 50, y: 12, status: 'normal' },
                { id: 'n30', value: 30, x: 25, y: 32, status: 'highlighted' },
                { id: 'n70', value: 70, x: 75, y: 32, status: 'normal' },
                { id: 'n20', value: 20, x: 12, y: 52, status: 'normal' },
                { id: 'n40', value: 40, x: 38, y: 52, status: 'normal' },
                { id: 'n60', value: 60, x: 62, y: 52, status: 'normal' },
                { id: 'n80', value: 80, x: 88, y: 52, status: 'normal' },
              ],
              edges: [
                { from: 'n50', to: 'n30', status: 'highlighted' },
                { from: 'n50', to: 'n70', status: 'normal' },
                { from: 'n30', to: 'n20', status: 'normal' },
                { from: 'n30', to: 'n40', status: 'normal' },
                { from: 'n70', to: 'n60', status: 'normal' },
                { from: 'n70', to: 'n80', status: 'normal' },
              ],
            },
          },
          {
            narration: '43 比 30 大，走右边。左边（20）排除。',
            state: {
              nodes: [
                { id: 'n50', value: 50, x: 50, y: 12, status: 'normal' },
                { id: 'n30', value: 30, x: 25, y: 32, status: 'normal' },
                { id: 'n70', value: 70, x: 75, y: 32, status: 'normal' },
                { id: 'n20', value: 20, x: 12, y: 52, status: 'normal' },
                { id: 'n40', value: 40, x: 38, y: 52, status: 'highlighted' },
                { id: 'n60', value: 60, x: 62, y: 52, status: 'normal' },
                { id: 'n80', value: 80, x: 88, y: 52, status: 'normal' },
              ],
              edges: [
                { from: 'n50', to: 'n30', status: 'highlighted' },
                { from: 'n50', to: 'n70', status: 'normal' },
                { from: 'n30', to: 'n20', status: 'normal' },
                { from: 'n30', to: 'n40', status: 'highlighted' },
                { from: 'n70', to: 'n60', status: 'normal' },
                { from: 'n70', to: 'n80', status: 'normal' },
              ],
            },
          },
          {
            narration: '43 比 40 大，往右——空的！结论：不在。只访问了 3 个节点。',
            state: {
              nodes: [
                { id: 'n50', value: 50, x: 50, y: 12, status: 'normal' },
                { id: 'n30', value: 30, x: 25, y: 32, status: 'normal' },
                { id: 'n70', value: 70, x: 75, y: 32, status: 'normal' },
                { id: 'n20', value: 20, x: 12, y: 52, status: 'normal' },
                { id: 'n40', value: 40, x: 38, y: 52, status: 'highlighted' },
                { id: 'n60', value: 60, x: 62, y: 52, status: 'normal' },
                { id: 'n80', value: 80, x: 88, y: 52, status: 'normal' },
              ],
              edges: [
                { from: 'n50', to: 'n30', status: 'highlighted' },
                { from: 'n50', to: 'n70', status: 'normal' },
                { from: 'n30', to: 'n20', status: 'normal' },
                { from: 'n30', to: 'n40', status: 'highlighted' },
                { from: 'n70', to: 'n60', status: 'normal' },
                { from: 'n70', to: 'n80', status: 'normal' },
              ],
            },
          },
        ],
      },
      { id: 'bt-p5-text4', type: 'text', body: '每一步都在排除一大批候选——和二分查找一样的精髓，只是从"数组载体"换到了"指针载体"。', variant: 'default' },
    ],
  },
  {
    page: 6,
    totalPages: 7,
    blocks: [
      { id: 'bt-p6-hero', type: 'hero', title: '改起来也快', subtitle: '插入和删除只需要改指针' },
      { id: 'bt-p6-text1', type: 'text', body: '插入 43：按同样的路径走：50 → 30 → 40。走到 40 的右边发现是空的，把 43 挂在那儿就完了。没有挪动任何其他节点。顺着一条路径走下来，最后改一个指针。O(log N)。', variant: 'default' },
      { id: 'bt-p6-text2', type: 'text', body: '删除也类似——找到它（O(log N)），处理一下它的孩子怎么接管它的位置，全程不需要挪整片数据。我们终于做到了：查询 O(log N)，插入 O(log N)，删除 O(log N)。三件事全都快。', variant: 'default' },
      { id: 'bt-p6-quiz', type: 'multipleChoice', question: '在 BST 中插入一个新节点，最坏情况下需要修改几个指针？', options: ['1个', 'log N 个', 'N 个', 'N/2 个'], correctIndex: 0, explanation: '顺着一条路径走下来，最后只改一个指针。O(log N) 是查找路径的长度，不是修改的指针数。' },
    ],
  },
  {
    page: 7,
    totalPages: 7,
    blocks: [
      { id: 'bt-p7-hero', type: 'hero', title: '树的核心机制', subtitle: '分叉 + 有序 = 对数压缩' },
      { id: 'bt-p7-card1', type: 'knowledgeCard', emoji: '🌿', title: '分叉', body: '每个节点有多条路径可以选。没有分叉，每访问一个节点只能挪一格（像链表那样），就根本谈不上"排除一大片"。' },
      { id: 'bt-p7-card2', type: 'knowledgeCard', emoji: '📐', title: '有序', body: '路径必须有方向、有规则。知道目标在哪个分支后，能确保扔掉的分支里一定没有目标。' },
      { id: 'bt-p7-card3', type: 'knowledgeCard', emoji: '🚀', title: '对数压缩', body: '分叉 + 有序协同，N 个候选走 log N 层就压缩到 1 个。这是树存在的全部理由。' },
      { id: 'bt-p7-text1', type: 'text', body: '这些性质不限于"二叉"和"大小比较"。分叉数 k 可以是任意值；"有序"可以按字符切、按区间切、按颜色切——只要你能定一条规则告诉我"目标在哪个分支"。', variant: 'default' },
      { id: 'bt-p7-reflection', type: 'reflection', prompt: '想想你日常用的文件系统、数据库索引、DOM 树——它们符合"分叉的有序决策"这个模型吗？如果符合，它的"分叉"是什么？"有序"是什么？', sampleAnswer: '文件系统的目录结构就是一种树：分叉是子文件夹/文件，有序是文件名的字典序或路径规则。' },
      { id: 'bt-p7-quiz', type: 'multipleChoice', question: '以下哪种情况会让 BST 失去 O(log N) 的查询效率？', options: ['节点值重复', '插入顺序为 20,30,40,50,60,70,80', '删除根节点', '树中有负数'], correctIndex: 1, explanation: '按升序插入会让 BST 退化成一条链表，失去分叉，回到 O(N)。' },
    ],
  },
];

export const binaryTreeCourse: Course = {
  id: 'beauty-of-data-structures',
  title: '数据结构之美',
  subtitle: '从二叉树开始，看懂计算机世界的结构艺术',
  description:
    '用故事的方式理解数据结构。从"怎么在一堆数里快速找一个数"这个朴素问题出发，一步步推导二叉搜索树的诞生，提炼出"分叉 + 有序 = 对数压缩"的通用机制，让你从此看懂所有树形结构。',
  coverUrl: '/images/binary-tree.svg',
  source: {
    title: '二叉树的故事',
    author: 'EvoLearn',
    coverUrl: '/images/binary-tree.svg',
  },
  dailyGoalMinutes: 20,
  achievements: [
    {
      title: '理解 O(log N) 的本质',
      body: '掌握"每次排除一半"的核心思想',
    },
    {
      title: '建立 BST 心智模型',
      body: '能徒手推导查询、插入、删除的路径',
    },
    {
      title: '发现数组与树的 trade-off',
      body: '理解连续存储与指针组织各自的优劣',
    },
    {
      title: '抽象出树的通用机制',
      body: '把"分叉 + 有序 = 对数压缩"迁移到任何树形结构',
    },
  ],
  sections: [
    {
      id: 'bst-section-1',
      number: 1,
      title: '动态查找的艺术',
      review: { totalSegments: 1, completedSegments: 0 },
      lessons: [
        {
          id: 'bst-1-1',
          number: '1.1',
          title: '二叉树的故事',
          hookingQuestion: '怎么在一堆数里快速找一个数?',
          estimatedMinutes: 8,
          state: 'current',
          content: lesson_1_1_content,
        },
      ],
    },
  ],
};
