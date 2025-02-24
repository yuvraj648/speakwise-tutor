
import { Button } from "@/components/ui/button";
import { LanguageLevelBadge } from "@/components/ui/language-level-badge";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  targetPhrase: string;
  translation: string;
}

interface TutorialsSectionProps {
  tutorials: Record<string, Tutorial[]>;
  onSelectTutorial: (id: string) => void;
}

export function TutorialsSection({ tutorials, onSelectTutorial }: TutorialsSectionProps) {
  const renderTutorialSection = (level: string) => (
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
        <LanguageLevelBadge level={level as "Beginner" | "Intermediate" | "Advanced"} />
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
                onClick={() => onSelectTutorial(tutorial.id)}
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
    <>
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
    </>
  );
}
