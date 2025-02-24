
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatHistorySidebar } from "@/components/chat-history-sidebar";
import { LanguageSelector } from "@/components/language-selector";
import { LanguageLevelBadge } from "@/components/ui/language-level-badge";
import { BookOpen, MessageSquare } from "lucide-react";

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

export default function Index() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const [showAssessment, setShowAssessment] = useState(true);

  const handleStartAssessment = () => {
    // Will implement assessment logic later
    setShowAssessment(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100/50">
      <ChatHistorySidebar 
        history={mockHistory} 
        onSelectChat={(id) => console.log("Selected chat:", id)} 
      />
      
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          {showAssessment ? (
            <div className="text-center space-y-6 mt-20">
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome to AI Language Tutor
              </h1>
              <p className="text-zinc-600 text-lg max-w-md mx-auto">
                Let's start by assessing your current level and language learning goals.
              </p>
              <div className="flex items-center justify-center gap-4">
                <LanguageSelector onSelect={setSelectedLanguage} />
                <Button onClick={handleStartAssessment} disabled={!selectedLanguage}>
                  Start Assessment
                </Button>
              </div>
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
              
              <TabsContent value="tutorial" className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-6 rounded-xl border bg-white/50 backdrop-blur-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Basic Conversations</h3>
                      <LanguageLevelBadge level="Beginner" />
                    </div>
                    <p className="text-zinc-600">
                      Start with basic greetings and everyday conversations.
                    </p>
                    <Button>Begin Lesson</Button>
                  </div>
                  
                  <div className="p-6 rounded-xl border bg-white/50 backdrop-blur-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Intermediate Speaking</h3>
                      <LanguageLevelBadge level="Intermediate" />
                    </div>
                    <p className="text-zinc-600">
                      Practice complex conversations and improve fluency.
                    </p>
                    <Button>Begin Lesson</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="practice" className="min-h-[400px]">
                <div className="p-6 rounded-xl border bg-white/50 backdrop-blur-sm">
                  <h3 className="font-semibold text-lg mb-4">Free Conversation Practice</h3>
                  <p className="text-zinc-600 mb-6">
                    Practice freely with our AI language tutor. Speak or type in your chosen language.
                  </p>
                  <Button>Start Conversation</Button>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}
