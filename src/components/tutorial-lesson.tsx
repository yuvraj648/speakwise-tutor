
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TutorialLessonProps {
  title: string;
  content: string;
  targetPhrase: string;
  translation: string;
  onComplete: () => void;
}

export function TutorialLesson({ title, content, targetPhrase, translation, onComplete }: TutorialLessonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStartRecording = () => {
    setIsRecording(true);
    // Will implement actual recording logic later
    setTimeout(() => {
      setProgress(100);
      setIsRecording(false);
    }, 3000);
  };

  const handlePlayAudio = () => {
    // Will implement text-to-speech later
    console.log("Playing audio");
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-zinc-600">{content}</p>
      </div>

      <div className="space-y-4 p-4 bg-zinc-50 rounded-lg">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">{targetPhrase}</p>
          <Button variant="ghost" size="icon" onClick={handlePlayAudio}>
            <Volume2 className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-sm text-zinc-500">{translation}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button
            className="flex-1"
            onClick={handleStartRecording}
            variant={isRecording ? "destructive" : "default"}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Start Speaking
              </>
            )}
          </Button>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Button 
        className="w-full" 
        variant="outline"
        onClick={onComplete}
        disabled={progress < 100}
      >
        Continue
      </Button>
    </Card>
  );
}
