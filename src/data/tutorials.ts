
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
      },
      {
        id: "basic-4",
        title: "Numbers and Counting",
        description: "Master the basics of counting in English.",
        content: "Numbers are essential for shopping, telling time, and more. Practice counting clearly.",
        targetPhrase: "I need two tickets for Friday, please.",
        translation: "Using numbers in a practical context",
      },
      {
        id: "basic-5",
        title: "Present Simple Tense",
        description: "Learn to form basic sentences in present tense.",
        content: "The present simple tense is used to talk about regular actions and facts. Practice this fundamental grammar pattern.",
        targetPhrase: "She works at a hospital every day.",
        translation: "Example of present simple tense with third person singular",
      },
      {
        id: "basic-6",
        title: "Family Vocabulary",
        description: "Learn words for family members.",
        content: "Practice vocabulary related to family members and relationships.",
        targetPhrase: "This is my sister, she's a teacher.",
        translation: "Introducing a family member with their profession",
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
      },
      {
        id: "int-2",
        title: "Future Plans",
        description: "Discuss future plans using 'going to' and 'will'.",
        content: "In English, we have multiple ways to talk about the future. Practice both 'going to' and 'will' forms.",
        targetPhrase: "I'm going to travel to Japan next summer.",
        translation: "Expressing future plans with 'going to'",
      },
      {
        id: "int-3",
        title: "Giving Opinions",
        description: "Learn to express and justify your opinions.",
        content: "Being able to share your thoughts is essential for meaningful conversations. Practice these useful phrases.",
        targetPhrase: "I think this movie is interesting because the characters are well-developed.",
        translation: "Expressing and justifying an opinion",
      },
      {
        id: "int-4",
        title: "Present Perfect",
        description: "Master the present perfect tense.",
        content: "The present perfect connects past actions to the present. It's a key tense for intermediate English learners.",
        targetPhrase: "I have lived in this city for five years.",
        translation: "Using present perfect to describe an ongoing situation",
      },
      {
        id: "int-5",
        title: "Comparative & Superlative",
        description: "Compare things using proper grammar.",
        content: "Learn to make comparisons between two or more things using comparative and superlative forms.",
        targetPhrase: "This building is taller than my house, but the Empire State is the tallest.",
        translation: "Using both comparative and superlative in one sentence",
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
      },
      {
        id: "adv-2",
        title: "Conditional Sentences",
        description: "Master all types of conditionals.",
        content: "Conditionals are important for expressing hypothetical situations. Practice all three main types.",
        targetPhrase: "If I had studied harder, I would have passed the exam.",
        translation: "Third conditional - expressing a hypothetical past situation",
      },
      {
        id: "adv-3",
        title: "Passive Voice",
        description: "Learn when and how to use passive constructions.",
        content: "The passive voice shifts focus from the doer to the action or the receiver. It's common in academic and professional English.",
        targetPhrase: "The research was conducted by a team of experts last year.",
        translation: "Using passive voice in past tense",
      },
      {
        id: "adv-4",
        title: "Cultural Nuances",
        description: "Understand subtle cultural references.",
        content: "Advanced language skills include understanding cultural contexts and references.",
        targetPhrase: "I'll give you a rain check on that coffee date.",
        translation: "Idiom meaning: postponing an invitation to a later date",
      },
      {
        id: "adv-5",
        title: "Academic Vocabulary",
        description: "Expand your formal and academic vocabulary.",
        content: "Academic and professional settings require a different register of English.",
        targetPhrase: "The findings demonstrate a significant correlation between the variables.",
        translation: "Formal academic language for describing research results",
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
      },
      {
        id: "basic-3",
        title: "Ordering Food",
        description: "Learn phrases for restaurants and cafes.",
        content: "These phrases will help you order food and drinks in Spanish-speaking countries.",
        targetPhrase: "Quisiera un café con leche, por favor.",
        translation: "I would like a coffee with milk, please.",
      },
      {
        id: "basic-4",
        title: "Numbers 1-20",
        description: "Learn to count in Spanish.",
        content: "Numbers are essential for shopping, telling time, and more. Practice counting clearly.",
        targetPhrase: "Necesito cinco boletos para el concierto.",
        translation: "I need five tickets for the concert.",
      },
      {
        id: "basic-5",
        title: "Verb Ser vs Estar",
        description: "Understand the difference between these two verbs.",
        content: "Spanish has two verbs for 'to be': 'ser' and 'estar'. This is one of the most important distinctions to learn.",
        targetPhrase: "Soy estudiante, pero hoy estoy cansado.",
        translation: "I am a student (permanent), but today I am tired (temporary).",
      },
      {
        id: "basic-6",
        title: "Present Tense Basics",
        description: "Learn regular verb conjugations.",
        content: "Practice conjugating regular -ar, -er, and -ir verbs in the present tense.",
        targetPhrase: "Yo hablo español y tú hablas inglés.",
        translation: "I speak Spanish and you speak English.",
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
      },
      {
        id: "int-2",
        title: "Preterite vs Imperfect",
        description: "Learn when to use each past tense.",
        content: "Spanish has two main past tenses with distinct uses. Practice differentiating between them.",
        targetPhrase: "Cuando era niño, visité España con mi familia.",
        translation: "When I was a child, I visited Spain with my family.",
      },
      {
        id: "int-3",
        title: "Future Tense",
        description: "Express future plans and predictions.",
        content: "Learn both the simple future tense and the 'ir a + infinitive' construction.",
        targetPhrase: "El próximo año viajaré a México.",
        translation: "Next year I will travel to Mexico.",
      },
      {
        id: "int-4",
        title: "Subjunctive Mood",
        description: "Introduction to the subjunctive.",
        content: "The subjunctive mood is used to express wishes, doubts, and hypothetical situations.",
        targetPhrase: "Espero que tengas un buen día.",
        translation: "I hope you have a good day.",
      },
      {
        id: "int-5",
        title: "Direct & Indirect Objects",
        description: "Master object pronouns in Spanish.",
        content: "Spanish object pronouns have specific placement rules. Practice both direct and indirect objects.",
        targetPhrase: "Te lo voy a dar mañana.",
        translation: "I'm going to give it to you tomorrow.",
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
      },
      {
        id: "adv-2",
        title: "Conditional Tense",
        description: "Express hypothetical situations.",
        content: "The conditional tense is used for hypothetical scenarios and polite requests.",
        targetPhrase: "Si tuviera más tiempo, aprendería a tocar el piano.",
        translation: "If I had more time, I would learn to play the piano.",
      },
      {
        id: "adv-3",
        title: "Regional Differences",
        description: "Learn about different Spanish dialects.",
        content: "Spanish varies across different countries. Learn about key vocabulary and pronunciation differences.",
        targetPhrase: "En España dicen 'coche' pero en México dicen 'carro'.",
        translation: "In Spain they say 'coche' but in Mexico they say 'carro' (for car).",
      },
      {
        id: "adv-4",
        title: "Passive Se Construction",
        description: "Master this common passive structure.",
        content: "The 'se' passive construction is frequently used in Spanish formal writing and speech.",
        targetPhrase: "Se habla español en veinte países.",
        translation: "Spanish is spoken in twenty countries.",
      },
      {
        id: "adv-5",
        title: "Advanced Subjunctive",
        description: "Master complex subjunctive uses.",
        content: "The subjunctive has many nuanced uses in advanced Spanish.",
        targetPhrase: "Dudo que hayan terminado el proyecto para entonces.",
        translation: "I doubt they will have finished the project by then.",
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
