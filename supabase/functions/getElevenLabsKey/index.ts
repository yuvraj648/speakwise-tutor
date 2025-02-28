
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  // Your ElevenLabs API key would be stored as an environment variable in production
  // This is a placeholder - you would need to set this in your Supabase project
  const apiKey = Deno.env.get('ELEVENLABS_API_KEY') || 'your-api-key-here';
  
  return new Response(
    JSON.stringify({
      secret: apiKey,
    }),
    { 
      headers: { 
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    },
  )
})
