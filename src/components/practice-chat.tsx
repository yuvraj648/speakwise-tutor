
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Mic, Send, Volume2 } from "lucide-react";
import { textToSpeech } from "@/services/elevenlabs";
import { ELEVEN_VOICES } from "@/services/elevenlabs";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export function PracticeChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "¡Hola! I'm your AI language tutor. How can I help you practice today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "That's great! Let me help you practice that phrase.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      // Play AI response
      playAIResponse(aiResponse.content);
    }, 1000);
  };

  const handleVoiceRecord = async () => {
    try {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(stream);
        setIsRecording(true);
        // Simulate voice recognition
        setTimeout(() => {
          setInput("This is a simulated voice input.");
          handleStopRecording();
        }, 2000);
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

  const playAIResponse = async (text: string) => {
    try {
      if (isPlaying && audio) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      // Using Aria's voice for chat - friendly, conversational tone
      const audioUrl = await textToSpeech(text, ELEVEN_VOICES.ARIA);
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
      if (audio) {
        audio.pause();
        URL.revokeObjectURL(audio.src);
      }
    };
  }, [audio]);

  return (
    <Card className="flex flex-col h-[600px] animate-fade-in">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`group max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-zinc-100"
                } animate-scale-in`}
              >
                <p className="text-sm">{message.content}</p>
                {!message.isUser && (
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isLoading}
                    onClick={() => playAIResponse(message.content)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Volume2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="transition-all focus:scale-[1.01]"
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleVoiceRecord}
            className={`hover:scale-105 transition-transform ${isRecording ? 'bg-red-100 hover:bg-red-200' : ''}`}
          >
            <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse text-red-500' : ''}`} />
          </Button>
          <Button 
            onClick={handleSend}
            className="hover:scale-105 transition-transform"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
