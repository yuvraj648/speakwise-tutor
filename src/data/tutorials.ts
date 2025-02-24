
type LanguageTutorials = {
  [key: string]: {
    Beginner: Tutorial[];
    Intermediate: Tutorial[];
    Advanced: Tutorial[];
    voiceOptions: VoiceOption[];
  };
};

interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  targetPhrase: string;
  translation: string;
}

interface VoiceOption {
  id: string;
  name: string;
  gender: "male" | "female";
  accent: string;
}

export const tutorials: LanguageTutorials = {
  en: {
    Beginner: [
      {
        id: "basic-1",
        title: "Basic Greetings",
        description: "Learn essential English greetings and introductions.",
        content: "Let's start with common English greetings. Listen carefully to the pronunciation and practice speaking.",
        targetPhrase: "Hello! How are you?",
        translation: "A friendly greeting used in casual situations",
      },
      {
        id: "basic-2",
        title: "Self Introduction",
        description: "Learn how to introduce yourself confidently.",
        content: "Practice introducing yourself in English. Focus on clear pronunciation.",
        targetPhrase: "My name is [name], nice to meet you!",
        translation: "Basic self-introduction phrase",
      },
      {
        id: "basic-3",
        title: "Daily Expressions",
        description: "Essential phrases for everyday situations.",
        content: "These expressions will help you navigate daily conversations.",
        targetPhrase: "Could you please help me?",
        translation: "Polite way to ask for assistance",
      }
    ],
    Intermediate: [
      {
        id: "int-1",
        title: "Past Tense Stories",
        description: "Practice telling stories in the past tense.",
        content: "Let's practice describing past events with proper pronunciation.",
        targetPhrase: "Yesterday, I went to the coffee shop and met my friend.",
        translation: "Using past tense in context",
      }
    ],
    Advanced: [
      {
        id: "adv-1",
        title: "Idiomatic Expressions",
        description: "Master native-like expressions.",
        content: "Learn common English idioms and their proper usage.",
        targetPhrase: "It's raining cats and dogs!",
        translation: "Meaning: It's raining very heavily",
      }
    ],
    voiceOptions: [
      {
        id: "sarah",
        name: "Sarah",
        gender: "female",
        accent: "American"
      },
      {
        id: "james",
        name: "James",
        gender: "male",
        accent: "British"
      }
    ]
  },
  es: {
    Beginner: [
      {
        id: "basic-1",
        title: "Basic Greetings",
        description: "Learn essential Spanish greetings.",
        content: "Let's start with basic Spanish greetings. Listen and repeat.",
        targetPhrase: "¡Hola! ¿Cómo estás?",
        translation: "Hello! How are you?",
      },
      {
        id: "basic-2",
        title: "Self Introduction",
        description: "Learn to introduce yourself in Spanish.",
        content: "Practice these common introduction phrases.",
        targetPhrase: "Me llamo [nombre], ¡mucho gusto!",
        translation: "My name is [name], nice to meet you!",
      }
    ],
    Intermediate: [
      {
        id: "int-1",
        title: "Past Tense Practice",
        description: "Master the Spanish past tense.",
        content: "Practice using the past tense in conversations.",
        targetPhrase: "Ayer fui al mercado.",
        translation: "Yesterday I went to the market.",
      }
    ],
    Advanced: [
      {
        id: "adv-1",
        title: "Spanish Idioms",
        description: "Learn authentic Spanish expressions.",
        content: "Master these common Spanish idioms.",
        targetPhrase: "Meter la pata",
        translation: "To make a mistake (lit: to put your foot in it)",
      }
    ],
    voiceOptions: [
      {
        id: "maria",
        name: "María",
        gender: "female",
        accent: "Spain"
      },
      {
        id: "carlos",
        name: "Carlos",
        gender: "male",
        accent: "Mexico"
      }
    ]
  },
  // Add more languages following the same pattern
};
