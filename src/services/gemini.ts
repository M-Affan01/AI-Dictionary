import Groq from "groq-sdk";
import { WordInsight } from "../types";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getWordInsight(word: string): Promise<WordInsight | null> {
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a linguistic expert. Provide a detailed linguistic analysis in JSON format.
          The JSON must follow this schema:
          {
            "word": string,
            "phonetic": string,
            "partOfSpeech": string,
            "definition": string,
            "example": string,
            "etymology": string,
            "synonyms": string[],
            "antonyms": string[],
            "translations": [{"lang": string, "word": string}],
            "usageTrend": number[], (6 numbers representing values from 0-100 for years 1800 to Present)
            "usageInsight": string,
            "linguisticInsight": string,
            "timeline": [{"period": string, "details": string, "context": string}],
            "collocations": [{"label": string, "pair": string, "frequency": number}]
          }`
        },
        {
          role: "user",
          content: `Provide a detailed linguistic analysis for the word: "${word}".`
        }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content) as WordInsight;
  } catch (error) {
    console.error("Groq API Error:", error);
    return null;
  }
}
