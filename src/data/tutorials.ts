
interface Tutorial {
  id: string;
  title: string;
  content: string;
  targetPhrase: string;
  translation: string;
}

interface TutorialsByLevel {
  Beginner: Tutorial[];
  Intermediate: Tutorial[];
  Advanced: Tutorial[];
}

interface TutorialsByLanguage {
  [key: string]: TutorialsByLevel;
}

export const tutorials: TutorialsByLanguage = {
  en: {
    Beginner: [
      {
        id: "en-beg-1",
        title: "Basic Greetings",
        content: "Let's start with basic greetings in English. Repeat the following phrase:",
        targetPhrase: "Hello, how are you today?",
        translation: "A common greeting used to ask about someone's well-being.",
      },
      {
        id: "en-beg-2",
        title: "Introducing Yourself",
        content: "Now let's practice introducing yourself. Repeat the phrase:",
        targetPhrase: "My name is... and I'm from...",
        translation: "A basic introduction formula where you state your name and origin.",
      },
      {
        id: "en-beg-3",
        title: "Numbers 1-10",
        content: "Let's practice counting in English. Repeat the numbers from one to ten:",
        targetPhrase: "One, two, three, four, five, six, seven, eight, nine, ten",
        translation: "The basic counting numbers from 1 to 10 in English.",
      },
    ],
    Intermediate: [
      {
        id: "en-int-1",
        title: "Making Plans",
        content: "Let's practice making plans in English. Try saying this phrase:",
        targetPhrase: "Would you like to have dinner with me on Saturday?",
        translation: "A polite invitation to have a meal together on a specific day.",
      },
      {
        id: "en-int-2",
        title: "Giving Directions",
        content: "Now let's practice giving directions. Repeat this common phrase:",
        targetPhrase: "Go straight ahead, then turn right at the traffic light.",
        translation: "Basic directions to guide someone to a location.",
      },
      {
        id: "en-int-3",
        title: "Weather Expressions",
        content: "Let's talk about the weather. Practice this useful expression:",
        targetPhrase: "It looks like it's going to rain later today.",
        translation: "A prediction about upcoming weather based on current conditions.",
      },
    ],
    Advanced: [
      {
        id: "en-adv-1",
        title: "Business Negotiations",
        content: "Let's practice professional language. Try this business negotiation phrase:",
        targetPhrase: "I believe we can reach a mutually beneficial agreement.",
        translation: "A diplomatic statement used in business negotiations suggesting a win-win outcome.",
      },
      {
        id: "en-adv-2",
        title: "Expressing Complex Opinions",
        content: "Now let's practice expressing nuanced opinions. Repeat this phrase:",
        targetPhrase: "While I see your point, I think we should consider alternative perspectives.",
        translation: "A respectful way to disagree while acknowledging someone else's viewpoint.",
      },
      {
        id: "en-adv-3",
        title: "Idiomatic Expressions",
        content: "Let's practice some idiomatic expressions. Try saying this common idiom:",
        targetPhrase: "Don't put all your eggs in one basket.",
        translation: "A saying that means don't risk everything on a single opportunity or possibility.",
      },
    ],
  },
  es: {
    Beginner: [
      {
        id: "es-beg-1",
        title: "Basic Greetings",
        content: "Let's start with basic greetings in Spanish. Repeat the following phrase:",
        targetPhrase: "Hola, ¿cómo estás hoy?",
        translation: "Hello, how are you today?",
      },
      {
        id: "es-beg-2",
        title: "Introducing Yourself",
        content: "Now let's practice introducing yourself in Spanish. Repeat the phrase:",
        targetPhrase: "Me llamo... y soy de...",
        translation: "My name is... and I'm from...",
      },
      {
        id: "es-beg-3",
        title: "Numbers 1-10",
        content: "Let's practice counting in Spanish. Repeat the numbers from one to ten:",
        targetPhrase: "Uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez",
        translation: "One, two, three, four, five, six, seven, eight, nine, ten",
      },
    ],
    Intermediate: [
      {
        id: "es-int-1",
        title: "Making Plans",
        content: "Let's practice making plans in Spanish. Try saying this phrase:",
        targetPhrase: "¿Te gustaría cenar conmigo el sábado?",
        translation: "Would you like to have dinner with me on Saturday?",
      },
      {
        id: "es-int-2",
        title: "Giving Directions",
        content: "Now let's practice giving directions in Spanish. Repeat this common phrase:",
        targetPhrase: "Sigue recto, luego gira a la derecha en el semáforo.",
        translation: "Go straight ahead, then turn right at the traffic light.",
      },
      {
        id: "es-int-3",
        title: "Weather Expressions",
        content: "Let's talk about the weather in Spanish. Practice this useful expression:",
        targetPhrase: "Parece que va a llover más tarde hoy.",
        translation: "It looks like it's going to rain later today.",
      },
    ],
    Advanced: [
      {
        id: "es-adv-1",
        title: "Business Negotiations",
        content: "Let's practice professional language in Spanish. Try this business negotiation phrase:",
        targetPhrase: "Creo que podemos llegar a un acuerdo mutuamente beneficioso.",
        translation: "I believe we can reach a mutually beneficial agreement.",
      },
      {
        id: "es-adv-2",
        title: "Expressing Complex Opinions",
        content: "Now let's practice expressing nuanced opinions in Spanish. Repeat this phrase:",
        targetPhrase: "Aunque entiendo tu punto de vista, creo que deberíamos considerar perspectivas alternativas.",
        translation: "While I see your point, I think we should consider alternative perspectives.",
      },
      {
        id: "es-adv-3",
        title: "Idiomatic Expressions",
        content: "Let's practice some idiomatic expressions in Spanish. Try saying this common idiom:",
        targetPhrase: "No pongas todos tus huevos en la misma canasta.",
        translation: "Don't put all your eggs in one basket.",
      },
    ],
  },
};
