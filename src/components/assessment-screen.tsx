
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import { VoiceSelector } from "@/components/voice-selector";
import { GraduationCap } from "lucide-react";

interface AssessmentScreenProps {
  selectedLanguage?: string;
  selectedVoice?: string;
  onLanguageSelect: (language: string) => void;
  onVoiceSelect: (voiceId: string) => void;
  onStartAssessment: () => void;
}

export function AssessmentScreen({ 
  selectedLanguage, 
  selectedVoice,
  onLanguageSelect, 
  onVoiceSelect,
  onStartAssessment 
}: AssessmentScreenProps) {
  return (
    <div className="text-center space-y-6 mt-20 animate-fade-in">
      <GraduationCap className="w-12 h-12 mx-auto text-primary animate-scale-in" />
      <h1 className="text-4xl font-bold tracking-tight">
        Welcome to AI Language Tutor
      </h1>
      <p className="text-zinc-600 text-lg max-w-md mx-auto">
        Let's start by assessing your current level and language learning goals.
      </p>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <LanguageSelector onSelect={onLanguageSelect} value={selectedLanguage} />
          {selectedLanguage && (
            <VoiceSelector 
              language={selectedLanguage}
              onSelect={onVoiceSelect}
              value={selectedVoice}
            />
          )}
        </div>
        <Button 
          onClick={onStartAssessment} 
          disabled={!selectedLanguage || !selectedVoice}
          className="hover:scale-105 transition-transform"
        >
          Start Assessment
        </Button>
      </div>
    </div>
  );
}
