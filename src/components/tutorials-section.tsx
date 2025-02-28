
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Volume2, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

interface Tutorial {
  id: string;
  title: string;
  content: string;
  targetPhrase: string;
  translation: string;
}

interface TutorialsSectionProps {
  tutorials: {
    Beginner: Tutorial[];
    Intermediate: Tutorial[];
    Advanced: Tutorial[];
  };
  onSelectTutorial: (id: string) => void;
}

export function TutorialsSection({ tutorials, onSelectTutorial }: TutorialsSectionProps) {
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Choose a Lesson
        </h2>
        <p className="text-zinc-600">
          Select a tutorial that matches your skill level
        </p>
      </div>
      
      <Tabs 
        defaultValue="Beginner" 
        onValueChange={(value) => setLevel(value as any)}
        className="space-y-8"
      >
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="Beginner" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Beginner
          </TabsTrigger>
          <TabsTrigger value="Intermediate" className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Intermediate
          </TabsTrigger>
          <TabsTrigger value="Advanced" className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Advanced
          </TabsTrigger>
        </TabsList>
        
        {["Beginner", "Intermediate", "Advanced"].map((currentLevel) => (
          <TabsContent key={currentLevel} value={currentLevel} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tutorials[currentLevel as keyof typeof tutorials].map((tutorial, index) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.1 }
                  }}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelectTutorial(tutorial.id)}>
                    <div className="border-l-4 border-primary h-full">
                      <div className="p-6 space-y-3">
                        <h3 className="font-medium text-lg">{tutorial.title}</h3>
                        <p className="text-sm text-zinc-600 line-clamp-2">{tutorial.content}</p>
                        <div className="pt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="hover:scale-105 transition-transform"
                          >
                            Start Lesson
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
