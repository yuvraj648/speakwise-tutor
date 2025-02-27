
import { useState } from "react";
import { LanguageLevelBadge } from "@/components/ui/language-level-badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Tutorial {
  id: string;
  title: string;
  description: string;
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
  const [selectedLevel, setSelectedLevel] = useState<"Beginner" | "Intermediate" | "Advanced">("Beginner");
  const [selectedDay, setSelectedDay] = useState<number>(1);
  
  // Calculate how many days each level should have (roughly evenly distributed)
  const beginnerDays = Math.ceil(tutorials.Beginner.length / 2);
  const intermediateDays = Math.ceil(tutorials.Intermediate.length / 2);
  const advancedDays = Math.ceil(tutorials.Advanced.length / 2);
  
  const getTutorialsForDay = (level: "Beginner" | "Intermediate" | "Advanced", day: number) => {
    const tutorialsPerDay = 2; // 2 tutorials per day
    const allTutorials = tutorials[level];
    const startIndex = (day - 1) * tutorialsPerDay;
    return allTutorials.slice(startIndex, startIndex + tutorialsPerDay);
  };
  
  const getDaysForLevel = (level: "Beginner" | "Intermediate" | "Advanced") => {
    switch(level) {
      case "Beginner": return beginnerDays;
      case "Intermediate": return intermediateDays;
      case "Advanced": return advancedDays;
    }
  };
  
  const levelTitles = {
    "Beginner": "Start with the basics",
    "Intermediate": "Build your skills",
    "Advanced": "Master complex concepts"
  };

  return (
    <div>
      <Tabs defaultValue="Beginner" onValueChange={(value) => setSelectedLevel(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Beginner">Beginner</TabsTrigger>
          <TabsTrigger value="Intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="Advanced">Advanced</TabsTrigger>
        </TabsList>
        
        {Object.entries(tutorials).map(([level, _]) => (
          <TabsContent key={level} value={level} className="space-y-6">
            <div className="text-center mb-8 animate-fade-in">
              <LanguageLevelBadge level={level as any} className="mb-2" />
              <h2 className="text-2xl font-bold mb-2">
                {levelTitles[level as keyof typeof levelTitles]}
              </h2>
              <p className="text-zinc-600">
                Complete {level === "Beginner" ? "foundational" : level === "Intermediate" ? "practical" : "advanced"} lessons 
                to build your language skills
              </p>
            </div>
            
            {/* Day selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {Array.from({ length: getDaysForLevel(level as any) }, (_, i) => i + 1).map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDay(day)}
                  className="rounded-full min-w-[40px] flex items-center gap-1"
                >
                  <Calendar className="w-3 h-3" /> Day {day}
                </Button>
              ))}
            </div>
            
            {/* Tutorials for the selected day */}
            <div className="grid gap-6 md:grid-cols-2">
              {getTutorialsForDay(level as any, selectedDay).map((tutorial) => (
                <motion.div
                  key={tutorial.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Card
                    className="h-full cursor-pointer overflow-hidden border-2 hover:border-primary/50 transition-colors"
                    onClick={() => onSelectTutorial(tutorial.id)}
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold">{tutorial.title}</h3>
                        </div>
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm text-zinc-600">{tutorial.description}</p>
                      <div className="pt-2">
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                          Day {selectedDay} Lesson
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
              
              {/* If no tutorials available for this day */}
              {getTutorialsForDay(level as any, selectedDay).length === 0 && (
                <div className="col-span-2 text-center p-8 border border-dashed rounded-lg">
                  <p className="text-zinc-500">No lessons available for this day yet. Check back soon!</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
