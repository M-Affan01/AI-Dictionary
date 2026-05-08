import { WordInsight } from "./types";

export const WORD_OF_THE_DAY: WordInsight = {
  word: "Ephemeral",
  phonetic: "/əˈfem(ə)rəl/",
  partOfSpeech: "Adjective",
  definition: "Lasting for a very short time. Derived from the Greek ephēmeros, meaning 'lasting only a day'.",
  example: "The luminous dial on his watch allowed him to see the time even in the deepest cave.",
  etymology: "Late Middle English: from Old French lumineux or Latin luminosus, from lumen, lumin- ‘light’.",
  synonyms: ["Radiant", "Glowing", "Brilliant", "Lustrous"],
  antonyms: ["Dim", "Dark", "Obscure", "Gloomy"],
  translations: [
    { lang: "DE", word: "Leuchtend" },
    { lang: "AR", word: "مضيء" }
  ],
  usageTrend: [20, 35, 55, 45, 85, 100],
  usageInsight: "Lexis AI has detected a 14% shift in the usage of 'Literal' toward hyperbole in contemporary academic texts this quarter.",
  linguisticInsight: "The root 'luc/lum' is found in over 200 English words, ranging from lucid to translucent, illustrating a pervasive human obsession with clarity.",
  timeline: [
    { period: "Late 14th Century", details: "Latin: luminosus", context: "From lumen ('light'). Originally describing a body that gives off light as a natural property." },
    { period: "Middle French", details: "lumineux", context: "Adopted by French scholars to denote intellectual clarity and spiritual enlightenment." },
    { period: "Modern Usage", details: "Luminous", context: "Now frequently used in scientific contexts (luminous intensity) and poetic descriptions of radiant beauty." }
  ],
  collocations: [
    { label: "High frequency", pair: "Luminous Sky", frequency: 90 },
    { label: "Common pair", pair: "Luminous Smile", frequency: 75 },
    { label: "Literary", pair: "Luminous Depth", frequency: 40 },
    { label: "Atmospheric", pair: "Luminous Mist", frequency: 30 }
  ]
};

export const INITIAL_LIBRARY: WordInsight[] = [
  WORD_OF_THE_DAY,
  {
    ...WORD_OF_THE_DAY,
    word: "Limerence",
    phonetic: "/ˈlimərəns/",
    partOfSpeech: "Noun",
    definition: "The state of being infatuated or obsessed with another person.",
    usageInsight: "Saved 2h ago"
  },
  {
    ...WORD_OF_THE_DAY,
    word: "Petrichor",
    phonetic: "/ˈpeˌtrīkôr/",
    partOfSpeech: "Noun",
    definition: "A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather.",
    usageInsight: "Mastered"
  }
];
