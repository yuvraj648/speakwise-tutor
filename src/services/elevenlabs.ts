
interface VoiceSettings {
  stability: number;
  similarity_boost: number;
}

export async function textToSpeech(text: string, voiceId: string) {
  try {
    const { data: { secret: apiKey }, error } = await supabase.functions.invoke('getElevenLabsKey', {});
    if (error || !apiKey) throw new Error('Failed to get API key');

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        'accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    return audioUrl;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export const ELEVEN_VOICES = {
  ARIA: '9BWtsMINqrJLrRacOk9x',
  ROGER: 'CwhRBWXzGAHq8TQ4Fs17',
  SARAH: 'EXAVITQu4vr4xnSDxMaL',
  LAURA: 'FGY2WhTYpPnrIDTdsKH5',
  CHARLIE: 'IKne3meq5aSn9XLyUdCD',
  GEORGE: 'JBFqnCBsd6RMkjVDRZzb',
  CALLUM: 'N2lVS1w4EtoT3dr4eOWO',
  RIVER: 'SAz9YHcvj6GT2YYXdXww',
  LIAM: 'TX3LPaxmHKxFdv7VOQHJ',
  CHARLOTTE: 'XB0fDUnXU5powFXDhCwa'
} as const;
