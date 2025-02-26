import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { textToSpeech } from "@/services/elevenlabs";
import { ELEVEN_VOICES } from "@/services/elevenlabs";

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
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [transcription, setTranscription] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handleStartRecording = async () => {
    try {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(stream);
        setIsRecording(true);
        setTranscription("Recording in progress...");
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 10;
          setProgress(currentProgress);
          if (currentProgress >= 100) {
            clearInterval(interval);
            handleStopRecording();
            setTranscription(targetPhrase);
          }
        }, 300);
      } else {
        handleStopRecording();
      }
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      setAudioStream(null);
    }
    setIsRecording(false);
  };

  const handlePlayAudio = async () => {
    try {
      if (isPlaying && audio) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      const audioUrl = await textToSpeech(targetPhrase, ELEVEN_VOICES.SARAH);
      const newAudio = new Audio(audioUrl);
      
      newAudio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      setAudio(newAudio);
      setIsPlaying(true);
      await newAudio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
      if (audio) {
        audio.pause();
        URL.revokeObjectURL(audio.src);
      }
      window.speechSynthesis.cancel();
    };
  }, [audioStream, audio]);

  return (
    <Card className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-zinc-600">{content}</p>
      </div>

      <div className="space-y-4 p-4 bg-zinc-50 rounded-lg hover:bg-zinc-100/80 transition-colors">
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">{targetPhrase}</p>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePlayAudio}
            disabled={isLoading}
            className={`hover:scale-105 transition-transform ${isPlaying ? 'text-primary' : ''}`}
          >
            <Volume2 className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <p className="text-sm text-zinc-500">{translation}</p>
      </div>

      <div className="space-y-4">
        <Input 
          value={transcription}
          readOnly
          placeholder="Your speech will appear here..."
          className="bg-zinc-50"
        />
        <div className="flex items-center gap-4">
          <Button
            className="flex-1 hover:scale-[1.02] transition-transform"
            onClick={handleStartRecording}
            variant={isRecording ? "destructive" : "default"}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4 mr-2 animate-pulse" />
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
        <Progress 
          value={progress} 
          className="h-2 transition-all duration-300" 
        />
      </div>

      <Button 
        className="w-full hover:scale-[1.02] transition-transform"
        variant="outline"
        onClick={onComplete}
        disabled={progress < 100}
      >
        Continue
      </Button>
    </Card>
  );
}
