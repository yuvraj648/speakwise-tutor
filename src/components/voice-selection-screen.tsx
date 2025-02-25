
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Speaker, Globe2 } from "lucide-react";

interface Voice {
  id: string;
  name: string;
  description: string;
}

const aiVoices: Voice[] = [
  { id: "ursa", name: "Ursa", description: "Mid-range voice" },
  { id: "eclipse", name: "Eclipse", description: "Energetic mid-range voice" },
  { id: "orion", name: "Orion", description: "Bright deeper voice" },
  { id: "vega", name: "Vega", description: "Bright higher voice" },
  { id: "dipper", name: "Dipper", description: "Engaged deeper voice" },
  { id: "lyra", name: "Lyra", description: "Bright higher voice" },
  { id: "pegasus", name: "Pegasus", description: "Engaged deeper voice" },
  { id: "nova", name: "Nova", description: "Calm mid-range voice" },
  { id: "orbit", name: "Orbit", description: "Energetic deeper voice" },
  { id: "capella", name: "Capella", description: "Serene higher voice" }
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
  const [isAnimating, setIsAnimating] = useState(false);

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

  useEffect(() => {
    if (step === 'voice') {
      const interval = setInterval(() => {
        setCurrentVoiceIndex((prev) => (prev + 1) % aiVoices.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="min-h-screen flex items-center justify-center">
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
              <div className="relative mx-auto w-24 h-24 mb-8">
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
                >
                  <Globe2 className="w-24 h-24 text-primary" />
                </motion.div>
              </div>
              <h1 className="text-4xl font-bold">Select Your Language</h1>
              <p className="text-zinc-600">Choose the language you want to learn</p>
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  size="lg"
                  onClick={() => handleLanguageSelect('en')}
                  className="hover:scale-105 transition-transform"
                >
                  English
                </Button>
                <Button
                  size="lg"
                  onClick={() => handleLanguageSelect('es')}
                  className="hover:scale-105 transition-transform"
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
              <div className="relative mx-auto w-24 h-24 mb-8">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Speaker className="w-24 h-24 text-primary" />
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold mb-8">Select Your AI Assistant</h2>
              <motion.div
                key={currentVoiceIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white/50 backdrop-blur-sm p-8 rounded-xl border shadow-lg max-w-md mx-auto"
              >
                <h3 className="text-2xl font-semibold mb-2">{aiVoices[currentVoiceIndex].name}</h3>
                <p className="text-zinc-600 mb-6">{aiVoices[currentVoiceIndex].description}</p>
                <Button
                  size="lg"
                  onClick={() => handleVoiceSelect(aiVoices[currentVoiceIndex].id)}
                  className="hover:scale-105 transition-transform"
                >
                  Select Voice
                </Button>
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
              <div className="relative mx-auto w-24 h-24 mb-8">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Mic className="w-24 h-24 text-primary" />
                </motion.div>
              </div>
              <h2 className="text-3xl font-bold">Let's Assess Your Skills</h2>
              <p className="text-zinc-600">
                We'll ask you a few questions to understand your current level
              </p>
              <Button 
                size="lg"
                onClick={onComplete}
                className="hover:scale-105 transition-transform"
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
