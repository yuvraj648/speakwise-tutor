
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
  language?: 'en' | 'es';
}

export function PracticeChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI language tutor. Would you like to practice English or Spanish? (¡Hola! Soy tu tutor de idiomas. ¿Te gustaría practicar inglés o español?)",
      isUser: false,
      timestamp: new Date(),
      language: 'en',
    },
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'es'>('en');

  const getLanguage = (text: string): 'en' | 'es' => {
    // Simple language detection based on common words
    const spanishWords = ['hola', 'gracias', 'por favor', 'buenos días', 'español'];
    const lowerText = text.toLowerCase();
    return spanishWords.some(word => lowerText.includes(word)) ? 'es' : 'en';
  };

  const generateAIResponse = (userMessage: string): { content: string, language: 'en' | 'es' } => {
    const lowerMessage = userMessage.toLowerCase();
    const detectedLanguage = getLanguage(userMessage);
    
    // Update current language based on user's input
    setCurrentLanguage(detectedLanguage);

    // English responses
    if (detectedLanguage === 'en') {
      if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        return {
          content: "Hello! It's great to practice English with you. What would you like to work on today?",
          language: 'en'
        };
      }
      if (lowerMessage.includes("how are you")) {
        return {
          content: "I'm doing well, thank you! Learning to express feelings is important - would you like to practice more emotion-related vocabulary?",
          language: 'en'
        };
      }
      if (lowerMessage.includes("weather")) {
        return {
          content: "Weather is a great topic! In English, we can talk about sunny, rainy, cloudy, or snowy days. What's the weather like where you are?",
          language: 'en'
        };
      }
    }
    
    // Spanish responses
    if (detectedLanguage === 'es') {
      if (lowerMessage.includes("hola")) {
        return {
          content: "¡Hola! Me alegro de practicar español contigo. ¿Qué te gustaría trabajar hoy?",
          language: 'es'
        };
      }
      if (lowerMessage.includes("gracias")) {
        return {
          content: "¡De nada! Es importante practicar las expresiones de cortesía. ¿Quieres aprender más?",
          language: 'es'
        };
      }
    }

    // Default responses based on detected language
    return detectedLanguage === 'es' 
      ? {
          content: "Entiendo que quieres hablar sobre " + userMessage + ". ¡Practiquemos juntos!",
          language: 'es'
        }
      : {
          content: "I see you want to talk about " + userMessage + ". Let's practice together!",
          language: 'en'
        };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
      language: currentLanguage,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Generate contextual AI response with a slight delay
    setTimeout(() => {
      const response = generateAIResponse(input);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        isUser: false,
        timestamp: new Date(),
        language: response.language,
      };
      setMessages((prev) => [...prev, aiResponse]);
      playAIResponse(aiResponse.content);
    }, 500); // Reduced delay for better responsiveness
  };

  const handleVoiceRecord = async () => {
    try {
      if (!isRecording) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(stream);
        setIsRecording(true);
        // Simulate voice recognition
        setTimeout(() => {
          setInput(currentLanguage === 'es' 
            ? "Hola, ¿cómo estás?" 
            : "Hello, how are you?");
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
      // Use different voices for different languages
      const voiceId = currentLanguage === 'es' ? ELEVEN_VOICES.ARIA : ELEVEN_VOICES.SARAH;
      const audioUrl = await textToSpeech(text, voiceId);
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
            placeholder={currentLanguage === 'es' ? "Escribe tu mensaje..." : "Type your message..."}
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
