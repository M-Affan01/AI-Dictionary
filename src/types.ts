export interface WordInsight {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  etymology: string;
  synonyms: string[];
  antonyms: string[];
  translations: { lang: string; word: string }[];
  usageTrend: number[];
  usageInsight: string;
  linguisticInsight: string;
  timeline: { period: string; details: string; context: string }[];
  collocations: { label: string; pair: string; frequency: number }[];
}

export type AppView = 'home' | 'details' | 'library' | 'insights';
