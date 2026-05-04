import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

function getClient(): GoogleGenerativeAI {
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not set in .env.local');
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function callGemini(
  systemPrompt: string,
  userPrompt: string,
  options: { temperature?: number; maxOutputTokens?: number } = {},
): Promise<string> {
  const client = getClient();
  const model = client.getGenerativeModel({
    model: 'gemini-2.0-flash',
    systemInstruction: systemPrompt,
    generationConfig: {
      temperature: options.temperature ?? 0.3,
      maxOutputTokens: options.maxOutputTokens ?? 8192,
      responseMimeType: 'application/json',
    },
  });

  const result = await model.generateContent(userPrompt);
  const text = result.response.text();
  return text;
}
