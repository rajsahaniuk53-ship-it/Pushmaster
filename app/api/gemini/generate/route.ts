import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini SDK with telemetry User-Agent header and API key
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const { concept, tone, platform, badgeWord } = await req.json();

    if (!concept) {
      return NextResponse.json({ error: "Concept is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Graceful fallback for demo purposes or unconfigured keys
      return NextResponse.json({
        headline: `🚀 Dynamic Notification: ${concept.slice(0, 30)}...`,
        body: `Optimized in ${tone} tone for ${platform}. Check out this limited-time alert!`,
        actionButtons: ["Explore Now", "Dismiss"],
        ctrBoostTip: "Tip: Add a custom sense of urgency to boost clicks by another 15%!"
      });
    }

    const systemPrompt = `You are an expert push notification copywriter specializing in ultra-high CTR copy for mobile devices and desktop browsers. 
You write messages that are extremely concise (Headlines < 45 chars, Body < 80 chars), compliant with web push length limits, highly clickable, and tailored exactly to the specified tone, platform style, and user intent.
Always prioritize action-inducing power verbs and subtle urgency triggers without looking spammy.`;

    const instructions = `Write a high-performance push notification matching this specifications:
- Concept/Goal: "${concept}"
- Desired Tone: "${tone}" (e.g., urgency, friendly, curious, FOMO, professional, playful)
- Platform Format: "${platform}" (e.g., iOS Mobile, Android, Safari macOS, Windows Browser)
- Custom Badge/Topic: "${badgeWord}" (e.g., flash sale, daily digest, warning)

Return your output as a strict JSON object with these EXACT keys (do not wrap in anything else than valid JSON):
{
  "headline": "A short, catchy headline (max 45 chars)",
  "body": "The main notification text body (max 80 chars)",
  "actionButtons": ["CTA Button 1 Text (max 15 chars)", "CTA Button 2 Text (max 15 chars)"],
  "ctrBoostTip": "A single-sentence tactical tip explaining why this copy will trigger high CTR and what time of day to push it"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: instructions,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.85,
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "{}";
    const cleanedText = text.replace(/```json/gi, '').replace(/```/gi, '').trim();
    
    try {
      const parsedData = JSON.parse(cleanedText);
      return NextResponse.json(parsedData);
    } catch (parseError) {
      // Fallback if parsing fails but text exists
      return NextResponse.json({
        headline: `⚡ Deal Alert: ${concept.slice(0, 25)}`,
        body: `Tap immediately to unlock this. Specially customized for ${platform}.`,
        actionButtons: ["Open Offer", "Later"],
        ctrBoostTip: "Consider using emojis at the start of the headline to increase CTR."
      });
    }

  } catch (error: any) {
    console.error("Gemini API error in route:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to generate optimized copies",
      headline: "💡 Special Notification Alert",
      body: "We created this customized backup for you. Ready to push instantly!",
      actionButtons: ["Check It", "Dismiss"],
      ctrBoostTip: "Initialize API secret credentials for live Gemini optimization."
    }, { status: 200 });
  }
}
