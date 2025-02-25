
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatHistorySidebar } from "@/components/chat-history-sidebar";
import { BookOpen, MessageSquare } from "lucide-react";
import { TutorialLesson } from "@/components/tutorial-lesson";
import { PracticeChat } from "@/components/practice-chat";
import { VoiceSelectionScreen } from "@/components/voice-selection-screen";
import { TutorialsSection } from "@/components/tutorials-section";
import { tutorials } from "@/data/tutorials";

export default function Index() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const [selectedVoice, setSelectedVoice] = useState<string>();
  const [showAssessment, setShowAssessment] = useState(true);
  const [currentTutorial, setCurrentTutorial] = useState<string | null>(null);

  const handleStartAssessment = () => {
    setShowAssessment(false);
  };

  const getCurrentTutorial = () => {
    if (!selectedLanguage) return null;
    const languageTutorials = tutorials[selectedLanguage];
    return (
      languageTutorials.Beginner.find((t) => t.id === currentTutorial) ||
      languageTutorials.Intermediate.find((t) => t.id === currentTutorial) ||
      languageTutorials.Advanced.find((t) => t.id === currentTutorial) ||
      languageTutorials.Beginner[0]
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100/50">
      <ChatHistorySidebar 
        history={[]}
        onSelectChat={(id) => console.log("Selected chat:", id)} 
      />
      
      <main className="flex-1 overflow-auto">
        <div className="h-full">
          {showAssessment ? (
            <VoiceSelectionScreen
              onLanguageSelect={setSelectedLanguage}
              onVoiceSelect={setSelectedVoice}
              onComplete={handleStartAssessment}
            />
          ) : currentTutorial ? (
            <div className="space-y-4 p-8">
              <Button
                variant="ghost"
                onClick={() => setCurrentTutorial(null)}
                className="mb-4 hover:scale-105 transition-transform"
              >
                ← Back to Tutorials
              </Button>
              <TutorialLesson
                {...getCurrentTutorial()!}
                onComplete={() => setCurrentTutorial(null)}
              />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto p-8">
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
                  {selectedLanguage && (
                    <TutorialsSection 
                      tutorials={{
                        Beginner: tutorials[selectedLanguage].Beginner,
                        Intermediate: tutorials[selectedLanguage].Intermediate,
                        Advanced: tutorials[selectedLanguage].Advanced
                      }}
                      onSelectTutorial={setCurrentTutorial}
                    />
                  )}
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
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
