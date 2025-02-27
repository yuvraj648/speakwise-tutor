
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Mic, Send, Volume2, BookOpen, Star } from "lucide-react";
import { textToSpeech } from "@/services/elevenlabs";
import { ELEVEN_VOICES } from "@/services/elevenlabs";
import { motion } from "framer-motion";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  language?: 'en' | 'es';
}

interface PracticeChatProps {
  onSaveChat?: (preview: string) => string;
}

export function PracticeChat({ onSaveChat }: PracticeChatProps) {
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
  const [userSkillLevel, setUserSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [showCelebration, setShowCelebration] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [recognizedText, setRecognizedText] = useState("");
  const recognitionRef = useRef<any>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    // Use browser's SpeechRecognition API (with fallback for different browsers)
    const SpeechRecognition = (window as any).SpeechRecognition || 
                              (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        setRecognizedText(finalTranscript || interimTranscript);
        setInput(finalTranscript || interimTranscript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Save chat messages to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      // Only save if there's more than the initial welcome message
      localStorage.setItem(`chat_messages_${chatId || 'current'}`, JSON.stringify(messages));
      
      // If we don't have a chatId yet and we have a message from the user, save this chat
      if (!chatId && messages.some(m => m.isUser) && onSaveChat) {
        // Get the first user message as preview
        const firstUserMessage = messages.find(m => m.isUser);
        if (firstUserMessage) {
          const newChatId = onSaveChat(firstUserMessage.content.substring(0, 30) + '...');
          setChatId(newChatId);
        }
      }
    }
  }, [messages, chatId, onSaveChat]);

  const getLanguage = (text: string): 'en' | 'es' => {
    // Enhanced language detection
    const spanishWords = ['hola', 'gracias', 'por favor', 'buenos días', 'español', 
                         'qué', 'cómo', 'quiero', 'hablar', 'aprender'];
    const lowerText = text.toLowerCase();
    
    // Count matches for more accurate detection
    let spanishMatches = 0;
    spanishWords.forEach(word => {
      if (lowerText.includes(word)) spanishMatches++;
    });
    
    return spanishMatches > 0 ? 'es' : 'en';
  };

  const generateAIResponse = (userMessage: string): { content: string, language: 'en' | 'es' } => {
    const lowerMessage = userMessage.toLowerCase();
    const detectedLanguage = getLanguage(userMessage);
    
    // Update current language based on user's input
    setCurrentLanguage(detectedLanguage);

    // Configure speech recognition language
    if (recognitionRef.current) {
      recognitionRef.current.lang = detectedLanguage === 'es' ? 'es-ES' : 'en-US';
    }

    // English responses based on skill level
    if (detectedLanguage === 'en') {
      // Skill level detection
      if (lowerMessage.includes("beginner") || lowerMessage.includes("new") || lowerMessage.includes("start")) {
        setUserSkillLevel('beginner');
        return {
          content: "I understand you're a beginner. Let's start with some basic phrases and vocabulary. Would you like to learn greetings or everyday expressions first?",
          language: 'en'
        };
      }
      
      if (lowerMessage.includes("intermediate") || lowerMessage.includes("some knowledge")) {
        setUserSkillLevel('intermediate');
        return {
          content: "Great! Since you have intermediate knowledge, we can work on more complex sentence structures and expand your vocabulary. Would you like to practice conversation or work on specific grammar points?",
          language: 'en'
        };
      }
      
      if (lowerMessage.includes("advanced") || lowerMessage.includes("fluent")) {
        setUserSkillLevel('advanced');
        return {
          content: "Excellent! As an advanced learner, we can focus on nuanced expressions, idioms, and cultural context. Would you like to discuss current events, literature, or professional communication?",
          language: 'en'
        };
      }

      // Topic-based responses
      if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        showSuccessAnimation();
        return {
          content: "Hello! It's great to practice English with you. What would you like to work on today?",
          language: 'en'
        };
      }
      
      if (lowerMessage.includes("how are you")) {
        showSuccessAnimation();
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
      
      if (lowerMessage.includes("learn") || lowerMessage.includes("study")) {
        return {
          content: `Based on your ${userSkillLevel} level, I recommend focusing on ${userSkillLevel === 'beginner' ? 'basic vocabulary and simple present tense' : userSkillLevel === 'intermediate' ? 'past tenses and conditionals' : 'idiomatic expressions and cultural nuances'}. Would you like a specific lesson on these topics?`,
          language: 'en'
        };
      }
    }
    
    // Spanish responses based on skill level
    if (detectedLanguage === 'es') {
      // Skill level detection in Spanish
      if (lowerMessage.includes("principiante") || lowerMessage.includes("nuevo") || lowerMessage.includes("empezar")) {
        setUserSkillLevel('beginner');
        return {
          content: "Entiendo que eres principiante. Empecemos con algunas frases básicas y vocabulario. ¿Te gustaría aprender saludos o expresiones cotidianas primero?",
          language: 'es'
        };
      }
      
      if (lowerMessage.includes("intermedio") || lowerMessage.includes("algo de conocimiento")) {
        setUserSkillLevel('intermediate');
        return {
          content: "¡Genial! Como tienes un nivel intermedio, podemos trabajar en estructuras de oraciones más complejas y ampliar tu vocabulario. ¿Te gustaría practicar conversación o trabajar en puntos gramaticales específicos?",
          language: 'es'
        };
      }
      
      if (lowerMessage.includes("avanzado") || lowerMessage.includes("fluido")) {
        setUserSkillLevel('advanced');
        return {
          content: "¡Excelente! Como estudiante avanzado, podemos centrarnos en expresiones matizadas, modismos y contexto cultural. ¿Te gustaría discutir eventos actuales, literatura o comunicación profesional?",
          language: 'es'
        };
      }

      // Topic-based responses in Spanish
      if (lowerMessage.includes("hola")) {
        showSuccessAnimation();
        return {
          content: "¡Hola! Me alegro de practicar español contigo. ¿Qué te gustaría trabajar hoy?",
          language: 'es'
        };
      }
      
      if (lowerMessage.includes("cómo estás") || lowerMessage.includes("como estas")) {
        showSuccessAnimation();
        return {
          content: "¡Estoy muy bien, gracias! Aprender a expresar sentimientos es importante. ¿Quieres practicar más vocabulario relacionado con las emociones?",
          language: 'es'
        };
      }
      
      if (lowerMessage.includes("tiempo") || lowerMessage.includes("clima")) {
        return {
          content: "¡El clima es un gran tema! En español, podemos hablar sobre días soleados, lluviosos, nublados o nevados. ¿Cómo está el clima donde estás?",
          language: 'es'
        };
      }
      
      if (lowerMessage.includes("aprender") || lowerMessage.includes("estudiar")) {
        return {
          content: `Basado en tu nivel ${userSkillLevel === 'beginner' ? 'principiante' : userSkillLevel === 'intermediate' ? 'intermedio' : 'avanzado'}, recomiendo enfocarte en ${userSkillLevel === 'beginner' ? 'vocabulario básico y presente simple' : userSkillLevel === 'intermediate' ? 'tiempos pasados y condicionales' : 'expresiones idiomáticas y matices culturales'}. ¿Te gustaría una lección específica sobre estos temas?`,
          language: 'es'
        };
      }
      
      if (lowerMessage.includes("gracias")) {
        return {
          content: "¡De nada! Es importante practicar las expresiones de cortesía. ¿Quieres aprender más frases útiles para conversaciones diarias?",
          language: 'es'
        };
      }
    }

    // Default responses based on detected language and skill level
    if (detectedLanguage === 'es') {
      let response = "";
      switch(userSkillLevel) {
        case 'beginner':
          response = "Entiendo que quieres hablar sobre " + userMessage + ". Como principiante, podemos empezar con vocabulario básico sobre este tema. ¿Te gustaría aprender algunas palabras clave primero?";
          break;
        case 'intermediate':
          response = "Veo que quieres hablar sobre " + userMessage + ". Para tu nivel intermedio, podemos practicar oraciones más complejas. ¿Prefieres enfocarte en la gramática o en la fluidez conversacional?";
          break;
        case 'advanced':
          response = "Interesante que quieras discutir sobre " + userMessage + ". Para tu nivel avanzado, podemos explorar expresiones idiomáticas y matices culturales relacionados con este tema. ¿Qué aspecto te interesa más?";
          break;
      }
      return { content: response, language: 'es' };
    } else {
      let response = "";
      switch(userSkillLevel) {
        case 'beginner':
          response = "I see you want to talk about " + userMessage + ". As a beginner, we can start with basic vocabulary on this topic. Would you like to learn some key words first?";
          break;
        case 'intermediate':
          response = "I understand you want to discuss " + userMessage + ". For your intermediate level, we can practice more complex sentences. Would you prefer to focus on grammar or conversational fluency?";
          break;
        case 'advanced':
          response = "It's interesting that you want to talk about " + userMessage + ". For your advanced level, we can explore idiomatic expressions and cultural nuances related to this topic. Which aspect interests you most?";
          break;
      }
      return { content: response, language: 'en' };
    }
  };

  const showSuccessAnimation = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
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
    setRecognizedText("");

    // Generate contextual AI response with a slight delay
    setTimeout(() => {
      const response = generateAIResponse(newMessage.content);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        isUser: false,
        timestamp: new Date(),
        language: response.language,
      };
      setMessages((prev) => [...prev, aiResponse]);
      playAIResponse(aiResponse.content, response.language);
    }, 500); // Reduced delay for better responsiveness
  };

  const handleVoiceRecord = async () => {
    try {
      if (!isRecording) {
        // Set the language for speech recognition
        if (recognitionRef.current) {
          recognitionRef.current.lang = currentLanguage === 'es' ? 'es-ES' : 'en-US';
          recognitionRef.current.start();
        }
        
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(stream);
        setIsRecording(true);
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
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    setIsRecording(false);
    
    // If we have recognized text, don't auto-submit to allow editing
    if (recognizedText && !input) {
      setInput(recognizedText);
    }
  };

  const playAIResponse = async (text: string, language: 'en' | 'es' = 'en') => {
    try {
      if (isPlaying && audio) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      // Use different voices for different languages
      // Spanish: Aria - warmer, expressive voice
      // English: Sarah - clear, articulate voice
      const voiceId = language === 'es' ? ELEVEN_VOICES.ARIA : ELEVEN_VOICES.SARAH;
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

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        URL.revokeObjectURL(audio.src);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [audio]);

  return (
    <Card className="flex flex-col h-[600px] animate-fade-in relative">
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1, 
                repeat: 1 
              }}
            >
              <Star className="w-16 h-16 text-green-500" />
            </motion.div>
          </motion.div>
        </div>
      )}
      
      <div className="bg-primary/10 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-medium">
            {currentLanguage === 'es' ? 'Práctica de español' : 'English Practice'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-zinc-500">
            {userSkillLevel === 'beginner' 
              ? (currentLanguage === 'es' ? 'Principiante' : 'Beginner') 
              : userSkillLevel === 'intermediate' 
                ? (currentLanguage === 'es' ? 'Intermedio' : 'Intermediate')
                : (currentLanguage === 'es' ? 'Avanzado' : 'Advanced')}
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <motion.div 
                key={i}
                className={`w-1.5 h-3 rounded-sm ${
                  (userSkillLevel === 'beginner' && i < 1) ||
                  (userSkillLevel === 'intermediate' && i < 3) ||
                  (userSkillLevel === 'advanced' && i < 5)
                    ? 'bg-primary' 
                    : 'bg-zinc-300'
                }`}
                animate={
                  (userSkillLevel === 'beginner' && i < 1) ||
                  (userSkillLevel === 'intermediate' && i < 3) ||
                  (userSkillLevel === 'advanced' && i < 5)
                    ? { height: ['12px', '16px', '12px'] }
                    : {}
                }
                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`group max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-zinc-100"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {!message.isUser && (
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isLoading}
                    onClick={() => playAIResponse(message.content, message.language)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Volume2 className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                )}
              </motion.div>
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
            className={`transition-all focus:scale-[1.01] ${isRecording ? 'border-red-400 animate-pulse' : ''}`}
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleVoiceRecord}
            className={`hover:scale-105 transition-transform ${isRecording ? 'bg-red-100 hover:bg-red-200 animate-pulse' : ''}`}
          >
            <Mic className={`w-4 h-4 ${isRecording ? 'text-red-500' : ''}`} />
          </Button>
          <Button 
            onClick={handleSend}
            className="hover:scale-105 transition-transform"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {isRecording && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-sm text-zinc-500"
          >
            <span className="text-red-500 font-medium">● Recording</span>
            {recognizedText && (
              <span className="ml-2 italic">"{recognizedText}"</span>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );
}
