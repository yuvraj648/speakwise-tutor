
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Volume2, Star, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { textToSpeech } from "@/services/elevenlabs";
import { ELEVEN_VOICES } from "@/services/elevenlabs";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showCelebration, setShowCelebration] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [currentStep, setCurrentStep] = useState<'listen' | 'practice' | 'review'>('listen');
  const recognitionRef = useRef<any>(null);
  
  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || 
                              (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      // Set language based on content
      const isSpanish = /[áéíóúñ¿¡]/i.test(targetPhrase);
      recognitionRef.current.lang = isSpanish ? 'es-ES' : 'en-US';
      
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
        
        const recognizedText = finalTranscript || interimTranscript;
        console.log("Recognized:", recognizedText); // Debug
        setTranscription(recognizedText);
        
        // Check if the transcription is close to the target phrase
        const similarity = calculateSimilarity(recognizedText.toLowerCase(), targetPhrase.toLowerCase());
        setProgress(Math.min(similarity * 100, 100));
        
        if (similarity > 0.7) {
          handleStopRecording();
          showSuccessAnimation();
          setTranscription(targetPhrase);
          setProgress(100);
        }
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
  }, [targetPhrase]);

  // Enhanced string similarity function
  const calculateSimilarity = (str1: string, str2: string): number => {
    // Simple case - exact match
    if (str1 === str2) return 1.0;
    
    // Clean strings for comparison - remove punctuation and extra spaces
    const cleanStr1 = str1.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ").trim();
    const cleanStr2 = str2.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s+/g, " ").trim();
    
    // If one string is completely contained in the other
    if (cleanStr1.includes(cleanStr2) || cleanStr2.includes(cleanStr1)) {
      return 0.8; // High similarity but not perfect
    }
    
    // Check individual words
    const words1 = cleanStr1.split(' ');
    const words2 = cleanStr2.split(' ');
    
    let matchCount = 0;
    let totalWords = Math.max(words1.length, words2.length);
    
    // For each word in the first string, check if it appears in the second string
    for (const word of words1) {
      if (word.length > 2 && words2.some(w => w.includes(word) || word.includes(w))) {
        matchCount++;
      }
    }
    
    // Calculate similarity
    return matchCount / totalWords;
  };

  const showSuccessAnimation = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  };

  const handleStartRecording = async () => {
    try {
      if (!isRecording) {
        setAttempts(prev => prev + 1);
        
        // Re-initialize speech recognition with correct language
        if (recognitionRef.current) {
          const isSpanish = /[áéíóúñ¿¡]/i.test(targetPhrase);
          recognitionRef.current.lang = isSpanish ? 'es-ES' : 'en-US';
          recognitionRef.current.start();
          console.log("Started speech recognition in", isSpanish ? "Spanish" : "English");
        }
        
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setAudioStream(stream);
        setIsRecording(true);
        setTranscription("Listening...");
        setCurrentStep('practice');
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
    setCurrentStep('review');
  };

  const handlePlayAudio = async () => {
    try {
      if (isPlaying && audio) {
        audio.pause();
        setIsPlaying(false);
        return;
      }

      setIsLoading(true);
      // Detect language for appropriate voice
      const isSpanish = /[áéíóúñ¿¡]/i.test(targetPhrase);
      const voiceId = isSpanish ? ELEVEN_VOICES.ARIA : ELEVEN_VOICES.GEORGE;
      
      const audioUrl = await textToSpeech(targetPhrase, voiceId);
      const newAudio = new Audio(audioUrl);
      
      newAudio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      setAudio(newAudio);
      setIsPlaying(true);
      await newAudio.play();
      setCurrentStep('listen');
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
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [audioStream, audio]);

  return (
    <Card className="p-6 space-y-6 animate-fade-in relative overflow-hidden">
      {/* Success animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-green-500/10 backdrop-blur-sm z-10"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.2, 1, 1.1, 1]
              }}
              transition={{ duration: 1.5 }}
              className="flex flex-col items-center"
            >
              <Star className="w-20 h-20 text-yellow-400 drop-shadow-lg" />
              <motion.span 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-green-700 mt-4"
              >
                Excellent!
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="px-2 py-1 bg-primary/10 rounded-full text-xs font-medium text-primary">
          Lesson
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2"
      >
        <p className="text-zinc-600">{content}</p>
      </motion.div>

      {/* Target phrase */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="space-y-4 p-4 bg-zinc-50 rounded-lg border-2 border-primary/20 hover:border-primary/30 transition-all"
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-medium">{targetPhrase}</p>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePlayAudio}
            disabled={isLoading}
            className={`hover:scale-105 transition-transform ${isPlaying ? 'text-primary' : ''} ${currentStep === 'listen' ? 'animate-pulse ring-2 ring-primary/50' : ''}`}
          >
            <Volume2 className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <p className="text-sm text-zinc-500">{translation}</p>
      </motion.div>

      {/* Speech input */}
      <div className="space-y-4">
        <div className="relative">
          <Input 
            value={transcription}
            readOnly
            placeholder="Your speech will appear here..."
            className={`bg-zinc-50 pr-10 transition-all ${isRecording ? 'border-red-400 animate-pulse' : progress > 0 ? 'border-green-400' : ''}`}
          />
          {progress >= 80 && (
            <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
          )}
          {progress > 0 && progress < 80 && !isRecording && (
            <XCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500" />
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            className={`flex-1 hover:scale-[1.02] transition-transform ${
              currentStep === 'practice' ? 'animate-pulse ring-2 ring-primary/50' : ''
            }`}
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
        
        {/* Progress bar with animations */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Accuracy</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="relative h-2 bg-zinc-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 100 }}
              className={`absolute inset-y-0 left-0 rounded-full ${
                progress < 30 ? 'bg-red-400' : 
                progress < 70 ? 'bg-amber-400' : 
                'bg-green-400'
              }`}
            />
          </div>
        </div>
        
        {attempts > 0 && progress < 80 && !isRecording && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-sm text-amber-600 bg-amber-50 p-2 rounded"
          >
            <p>Try again! Listen to the audio and practice your pronunciation.</p>
          </motion.div>
        )}
      </div>

      {/* Continue button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          className="w-full transition-all"
          variant={progress >= 70 ? "default" : "outline"}
          onClick={onComplete}
          disabled={progress < 70}
        >
          {progress >= 70 ? 'Continue to Next Lesson' : 'Practice More'}
        </Button>
      </motion.div>
      
      {/* Progress indicators */}
      <div className="flex justify-center gap-1 pt-2">
        {[1, 2, 3].map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === 0 ? 'bg-primary' : 'bg-zinc-200'
            }`}
            animate={i === 0 ? { 
              scale: [1, 1.2, 1],
            } : {}}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    </Card>
  );
}
