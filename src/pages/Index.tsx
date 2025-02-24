import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatHistorySidebar } from "@/components/chat-history-sidebar";
import { LanguageSelector } from "@/components/language-selector";
import { LanguageLevelBadge } from "@/components/ui/language-level-badge";
import { BookOpen, MessageSquare, GraduationCap, Sparkles } from "lucide-react";
import { TutorialLesson } from "@/components/tutorial-lesson";
import { PracticeChat } from "@/components/practice-chat";

const mockHistory = [
  {
    id: "1",
    timestamp: new Date(),
    preview: "Basic greetings in Spanish",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 3600000),
    preview: "Past tense practice",
  },
];

const tutorials = {
  Beginner: [
    {
      id: "basic-1",
      title: "Basic Greetings",
      description: "Learn essential greetings and introductions.",
      content: "Let's start with the most common greeting in your chosen language. Listen to the pronunciation and practice speaking.",
      targetPhrase: "¡Hola! ¿Cómo estás?",
      translation: "Hello! How are you?",
    },
    {
      id: "basic-2",
      title: "Numbers 1-10",
      description: "Master counting in your target language.",
      content: "Practice pronunciation of numbers, essential for daily conversations.",
      targetPhrase: "uno, dos, tres...",
      translation: "one, two, three...",
    },
    {
      id: "basic-3",
      title: "Everyday Phrases",
      description: "Essential phrases for daily communication.",
      content: "Learn common phrases you'll use in everyday situations.",
      targetPhrase: "Por favor, gracias, de nada",
      translation: "Please, thank you, you're welcome",
    }
  ],
  Intermediate: [
    {
      id: "intermediate-1",
      title: "Past Tense Practice",
      description: "Master the past tense in conversations.",
      content: "Let's practice describing what you did yesterday.",
      targetPhrase: "Ayer fui al mercado.",
      translation: "Yesterday I went to the market.",
    },
  ],
  Advanced: [
    {
      id: "advanced-1",
      title: "Idiomatic Expressions",
      description: "Learn native-like expressions and idioms.",
      content: "Common Spanish idioms and their meanings.",
      targetPhrase: "Meter la pata",
      translation: "To put one's foot in it (to make a mistake)",
    },
  ],
};

export default function Index() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const [showAssessment, setShowAssessment] = useState(true);
  const [currentTutorial, setCurrentTutorial] = useState<string | null>(null);

  const handleStartAssessment = () => {
    setShowAssessment(false);
  };

  const renderTutorialSection = (level: keyof typeof tutorials) => (
    <div className="p-6 rounded-xl border bg-white/50 backdrop-blur-sm space-y-6 hover:bg-white/60 transition-colors animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">{level} Level</h3>
          <p className="text-sm text-zinc-500">
            {level === "Beginner"
              ? "Perfect for starting your language journey"
              : level === "Intermediate"
              ? "Build upon your foundation"
              : "Master advanced concepts"}
          </p>
        </div>
        <LanguageLevelBadge level={level} />
      </div>

      <div className="grid gap-4">
        {tutorials[level].map((tutorial) => (
          <div
            key={tutorial.id}
            className="p-4 rounded-lg border bg-white/80 hover:bg-white/90 transition-all hover:scale-[1.02] duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">{tutorial.title}</h4>
                <p className="text-sm text-zinc-600">{tutorial.description}</p>
              </div>
              <Button
                size="sm"
                onClick={() => setCurrentTutorial(tutorial.id)}
                className="hover:scale-105 transition-transform"
              >
                Start
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100/50">
      <ChatHistorySidebar 
        history={mockHistory} 
        onSelectChat={(id) => console.log("Selected chat:", id)} 
      />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          {showAssessment ? (
            <div className="text-center space-y-6 mt-20 animate-fade-in">
              <GraduationCap className="w-12 h-12 mx-auto text-primary animate-scale-in" />
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome to AI Language Tutor
              </h1>
              <p className="text-zinc-600 text-lg max-w-md mx-auto">
                Let's start by assessing your current level and language learning goals.
              </p>
              <div className="flex items-center justify-center gap-4">
                <LanguageSelector onSelect={setSelectedLanguage} value={selectedLanguage} />
                <Button 
                  onClick={handleStartAssessment} 
                  disabled={!selectedLanguage}
                  className="hover:scale-105 transition-transform"
                >
                  Start Assessment
                </Button>
              </div>
            </div>
          ) : currentTutorial ? (
            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={() => setCurrentTutorial(null)}
                className="mb-4 hover:scale-105 transition-transform"
              >
                ← Back to Tutorials
              </Button>
              <TutorialLesson
                {...tutorials.Beginner.find((t) => t.id === currentTutorial) ||
                  tutorials.Intermediate.find((t) => t.id === currentTutorial) ||
                  tutorials.Advanced.find((t) => t.id === currentTutorial) ||
                  tutorials.Beginner[0]}
                onComplete={() => setCurrentTutorial(null)}
              />
            </div>
          ) : (
            <Tabs defaultValue="tutorial" className="space-y-6">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="tutorial" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  AI Tutorials
                </TabsTrigger>
                <TabsTrigger value="practice" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Free Practice
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tutorial" className="space-y-6">
                <div className="text-center mb-8 animate-fade-in">
                  <h2 className="text-2xl font-bold mb-2">
                    Structured Learning Path
                  </h2>
                  <p className="text-zinc-600">
                    Follow our AI-guided tutorials to master your target language
                  </p>
                </div>

                <div className="grid gap-6">
                  {renderTutorialSection("Beginner")}
                  {renderTutorialSection("Intermediate")}
                  {renderTutorialSection("Advanced")}
                </div>
              </TabsContent>
              
              <TabsContent value="practice" className="space-y-6">
                <div className="text-center mb-8 animate-fade-in">
                  <h2 className="text-2xl font-bold mb-2">
                    Free Conversation Practice
                  </h2>
                  <p className="text-zinc-600">
                    Chat freely with our AI tutor to improve your skills
                  </p>
                </div>
                <PracticeChat />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}
