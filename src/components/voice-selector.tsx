
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tutorials } from "@/data/tutorials";

interface VoiceSelectorProps {
  language: string;
  onSelect: (voiceId: string) => void;
  value?: string;
}

export function VoiceSelector({ language, onSelect, value }: VoiceSelectorProps) {
  const voices = tutorials[language]?.voiceOptions || [];

  return (
    <Select onValueChange={onSelect} value={value}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select AI Voice" />
      </SelectTrigger>
      <SelectContent>
        {voices.map((voice) => (
          <SelectItem key={voice.id} value={voice.id}>
            {voice.name} ({voice.accent})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
