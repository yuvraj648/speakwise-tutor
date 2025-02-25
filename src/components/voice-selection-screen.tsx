
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Speaker, Globe2, Play, Square } from "lucide-react";

interface Voice {
  id: string;
  name: string;
  description: string;
  sampleText?: string;
}

const aiVoices: Voice[] = [
  { id: "ursa", name: "Ursa", description: "Mid-range voice", sampleText: "Hello, I'm Ursa, your language learning assistant." },
  { id: "eclipse", name: "Eclipse", description: "Energetic mid-range voice", sampleText: "Hi! I'm Eclipse, ready to help you learn!" },
  { id: "orion", name: "Orion", description: "Bright deeper voice", sampleText: "Greetings, I'm Orion, let's start our learning journey." },
  { id: "vega", name: "Vega", description: "Bright higher voice", sampleText: "Hi there! I'm Vega, excited to teach you!" },
  { id: "dipper", name: "Dipper", description: "Engaged deeper voice", sampleText: "Hello, I'm Dipper, your dedicated language tutor." },
  { id: "lyra", name: "Lyra", description: "Bright higher voice", sampleText: "Hi! I'm Lyra, ready to guide you through your lessons." },
  { id: "pegasus", name: "Pegasus", description: "Engaged deeper voice", sampleText: "Greetings! I'm Pegasus, let's learn together." },
  { id: "nova", name: "Nova", description: "Calm mid-range voice", sampleText: "Hello, I'm Nova, here to help you learn." },
  { id: "orbit", name: "Orbit", description: "Energetic deeper voice", sampleText: "Hi! I'm Orbit, excited to start our lessons!" },
  { id: "capella", name: "Capella", description: "Serene higher voice", sampleText: "Hello, I'm Capella, your language learning companion." }
];

interface VoiceSelectionScreenProps {
  onLanguageSelect: (language: string) => void;
  onVoiceSelect: (voiceId: string) => void;
  onComplete: () => void;
}

export function VoiceSelectionScreen({ 
  onLanguageSelect, 
  onVoiceSelect,
  onComplete
}: VoiceSelectionScreenProps) {
  const [step, setStep] = useState<'language' | 'voice' | 'skills'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<string>();
  const [selectedVoice, setSelectedVoice] = useState<string>();
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth] = useState(() => window.speechSynthesis);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    onLanguageSelect(language);
    setStep('voice');
  };

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
    onVoiceSelect(voiceId);
    setStep('skills');
  };

  const playVoiceSample = () => {
    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(aiVoices[currentVoiceIndex].sampleText);
    utterance.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    synth.speak(utterance);
  };

  useEffect(() => {
    if (step === 'voice') {
      const interval = setInterval(() => {
        setCurrentVoiceIndex((prev) => (prev + 1) % aiVoices.length);
      }, 5000); // Increased time to allow for voice preview
      return () => clearInterval(interval);
    }
  }, [step]);

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      synth.cancel();
    };
  }, [synth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl w-full space-y-8">
        <AnimatePresence mode="wait">
          {step === 'language' && (
            <motion.div
              key="language"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 text-center"
            >
              <div className="relative mx-auto w-32 h-32 mb-8">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-blue-500/10 rounded-full"
                />
                <motion.div
                  animate={{
                    scale: [1.1, 1.3, 1.1],
                    rotate: [180, 540]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.2
                  }}
                  className="absolute inset-0 bg-indigo-500/10 rounded-full"
                />
                <Globe2 className="w-32 h-32 text-primary relative z-10" />
              </div>
              <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Select Your Language
              </h1>
              <p className="text-zinc-600 text-lg">Choose the language you want to learn</p>
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  onClick={() => handleLanguageSelect('en')}
                  className="hover:scale-105 transition-transform text-lg px-8 py-6"
                >
                  English
                </Button>
                <Button
                  size="lg"
                  onClick={() => handleLanguageSelect('es')}
                  className="hover:scale-105 transition-transform text-lg px-8 py-6"
                >
                  Spanish
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'voice' && (
            <motion.div
              key="voice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 text-center"
            >
              <div className="relative mx-auto w-32 h-32 mb-8">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-blue-500/10 rounded-full"
                />
                <Speaker className="w-32 h-32 text-primary relative z-10" />
              </div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-8">
                Select Your AI Assistant
              </h2>
              <motion.div
                key={currentVoiceIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/80 backdrop-blur-lg p-8 rounded-xl border shadow-lg max-w-md mx-auto"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: isPlaying ? [1, 1.05, 1] : 1
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: isPlaying ? Infinity : 0
                    }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <h3 className="text-4xl font-bold text-white">
                      {aiVoices[currentVoiceIndex].name.charAt(0)}
                    </h3>
                  </motion.div>
                </div>
                <div className="mt-16">
                  <h3 className="text-2xl font-semibold mb-2">{aiVoices[currentVoiceIndex].name}</h3>
                  <p className="text-zinc-600 mb-6">{aiVoices[currentVoiceIndex].description}</p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={playVoiceSample}
                      className="hover:scale-105 transition-transform"
                    >
                      {isPlaying ? (
                        <Square className="w-4 h-4 mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {isPlaying ? "Stop" : "Preview Voice"}
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => handleVoiceSelect(aiVoices[currentVoiceIndex].id)}
                      className="hover:scale-105 transition-transform"
                    >
                      Select Voice
                    </Button>
                  </div>
                </div>
              </motion.div>
              <div className="flex justify-center gap-2 mt-6">
                {aiVoices.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentVoiceIndex ? 'bg-primary' : 'bg-zinc-300'
                    }`}
                    animate={{
                      scale: index === currentVoiceIndex ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6 text-center"
            >
              <div className="relative mx-auto w-32 h-32 mb-8">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-blue-500/10 rounded-full"
                />
                <Mic className="w-32 h-32 text-primary relative z-10" />
              </div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Let's Assess Your Skills
              </h2>
              <p className="text-zinc-600 text-lg">
                We'll ask you a few questions to understand your current level
              </p>
              <Button 
                size="lg"
                onClick={onComplete}
                className="hover:scale-105 transition-transform text-lg px-8 py-6"
              >
                Start Assessment
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
