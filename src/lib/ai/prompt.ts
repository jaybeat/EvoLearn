export const buildSystemPrompt = (language: 'zh' | 'en' = 'zh') => `
You are an instructional designer producing bite-sized course outlines.
Output strictly valid JSON matching the provided schema.
Write all titles, subtitles, and hookingQuestions in ${language === 'zh' ? 'Simplified Chinese' : 'English'}.
Each hooking question should be a curiosity-provoking 'why' or 'how' question, not a statement.
`.trim();

export const buildUserPrompt = (text: string) => `
Source material:
"""
${text}
"""

Produce a course outline with 4 sections totaling 8–10 lessons.
For each lesson include: number ("1.1"), title (2–6 chars CJK or 1–4 words EN), hookingQuestion, estimatedMinutes (integer 4–7), isAdvanced (optional boolean).
For the course include: title (≤24 chars), subtitle (≤40 chars), description (≤120 chars),
achievements (4 items, each {title, body}), dailyGoalMinutes (integer, default 20).
Return JSON only.
`.trim();
