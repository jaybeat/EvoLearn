import type { Course, Lesson, LessonContent } from '@/types/course';

const lesson_1_1_content: LessonContent[] = [
  {
    page: 1,
    totalPages: 7,
    question: '为什么洗澡时常会突然想到难题的答案？',
    subtitle: '两种模式',
  },
  {
    page: 2,
    totalPages: 7,
    question: '专注模式与发散模式',
    subtitle: '大脑切换的奥秘',
    illustrationKey: 'brainModes',
  },
  {
    page: 3,
    totalPages: 7,
    question: '专注模式：紧密的神经路径',
    subtitle: '当你聚焦于一个清晰目标',
    illustrationKey: 'focusedDiffuseMode',
  },
  {
    page: 4,
    totalPages: 7,
    question: '发散模式:松散的远距连接',
    subtitle: '当大脑放松,创意涌现',
    illustrationKey: 'focusedDiffuseMode',
  },
  {
    page: 5,
    totalPages: 7,
    question: '为什么需要在两种模式间切换?',
    subtitle: '互补,而非对立',
  },
  {
    page: 6,
    totalPages: 7,
    question: '深度学习的循环',
    subtitle: '专注 → 发散 → 巩固',
    illustrationKey: 'deepLearningCycle',
  },
  {
    page: 7,
    totalPages: 7,
    question: '今日小结',
    subtitle: '让大脑两种模式协同工作',
  },
];

const placeholderContent = (title: string, hooking: string): LessonContent[] => [
  {
    page: 1,
    totalPages: 1,
    question: hooking,
    subtitle: title,
  },
];

const lesson = (
  id: string,
  number: string,
  title: string,
  hookingQuestion: string,
  state: Lesson['state'],
  opts: { isAdvanced?: boolean; estimatedMinutes?: number } = {},
): Lesson => ({
  id,
  number,
  title,
  hookingQuestion,
  estimatedMinutes: opts.estimatedMinutes ?? 5,
  state,
  isAdvanced: opts.isAdvanced,
  content:
    id === 'lesson-1-1'
      ? lesson_1_1_content
      : placeholderContent(title, hookingQuestion),
});

export const seedCourse: Course = {
  id: 'learning-how-to-learn',
  title: '学会如何学习:高效大脑手册',
  subtitle: '把神经科学变成你每天能用的学习习惯',
  description:
    '基于 Barbara Oakley 的《Learning How to Learn》一书,将认知科学拆成 9 节 5 分钟的微课。让你在通勤、午休、睡前都能用最少时间,练出最强学习力。',
  coverUrl: '/images/learning-how-to-learn.svg',
  source: {
    title: 'Learning How to Learn',
    author: 'Barbara Oakley',
    coverUrl: '/images/learning-how-to-learn.svg',
  },
  dailyGoalMinutes: 20,
  achievements: [
    {
      title: '切换专注与发散模式',
      body: '以突破设计或教学瓶颈',
    },
    {
      title: '利用间歇性休息',
      body: '强化大脑对复杂产品逻辑的内化',
    },
    {
      title: '克服拖延心理',
      body: '建立高效处理高难度课题的惯性',
    },
    {
      title: '构建知识组块',
      body: '提升跨学科技能的迁移与应用速度',
    },
  ],
  sections: [
    {
      id: 'section-1',
      number: 1,
      title: '思维模式',
      review: { totalSegments: 2, completedSegments: 0 },
      lessons: [
        lesson(
          'lesson-1-1',
          '1.1',
          '两种模式',
          '为什么洗澡时常会突然想到难题的答案?',
          'current',
        ),
        lesson(
          'lesson-1-2',
          '1.2',
          '大脑链接',
          '你知道学习新知识会改变大脑的物理结构吗?',
          'locked',
        ),
      ],
    },
    {
      id: 'section-2',
      number: 2,
      title: '战胜拖延',
      review: { totalSegments: 2, completedSegments: 0 },
      lessons: [
        lesson(
          'lesson-2-1',
          '2.1',
          '痛苦循环',
          '为什么一想到要开始就觉得头疼?',
          'locked',
        ),
        lesson(
          'lesson-2-2',
          '2.2',
          '番茄钟法',
          '25 分钟为何成为打败拖延的黄金时长?',
          'locked',
        ),
      ],
    },
    {
      id: 'section-3',
      number: 3,
      title: '记忆策略',
      review: { totalSegments: 3, completedSegments: 0 },
      lessons: [
        lesson(
          'lesson-3-1',
          '3.1',
          '组块构建',
          '专家是怎么把成千个细节装进脑子的?',
          'locked',
        ),
        lesson(
          'lesson-3-2',
          '3.2',
          '主动回想',
          '为什么重读笔记几乎没用?',
          'locked',
        ),
        lesson(
          'lesson-3-3',
          '3.3',
          '间隔重复',
          '艾宾浩斯曲线给我们的提示是什么?',
          'locked',
          { isAdvanced: true },
        ),
      ],
    },
    {
      id: 'section-4',
      number: 4,
      title: '深度学习',
      review: { totalSegments: 2, completedSegments: 0 },
      lessons: [
        lesson(
          'lesson-4-1',
          '4.1',
          '交替练习',
          '为什么混合训练比单项突击更有效?',
          'locked',
        ),
        lesson(
          'lesson-4-2',
          '4.2',
          '睡眠力量',
          '熬夜赶工真的是在透支学习能力吗?',
          'locked',
        ),
      ],
    },
  ],
};
