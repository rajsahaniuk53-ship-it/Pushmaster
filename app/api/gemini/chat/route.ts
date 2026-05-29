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
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Graceful fallback for demo if API key is not present
      const lastMsg = messages[messages.length - 1]?.text || "";
      let reply = "Hello! I am your PushMasterr Expert Assistant. ";
      if (lastMsg.toLowerCase().includes("price") || lastMsg.toLowerCase().includes("rate") || lastMsg.toLowerCase().includes("plan")) {
        reply += "PushMasterr plans are super affordable: Startup Lifetime is just ₹41,500 ($499), and Pro Lifetime is ₹66,050 ($799). You can click the 'Add to Cart' options displayed immediately inside this chat! [ACTION_CTA: startup-lifetime] [ACTION_CTA: pro-lifetime]";
      } else if (lastMsg.toLowerCase().includes("onesignal") || lastMsg.toLowerCase().includes("migrate")) {
        reply += "Yes! Migrating to PushMasterr is extremely easy and saves you 95% of your costs. You can add the Startup Lifetime plan to cart and import everything via active API keys! [ACTION_CTA: startup-lifetime]";
      } else {
        reply += "PushMasterr is a high-speed self-hosted web push platform with dual-node delivery and anti-spam protection. Let me know if you would like to checkout our premium plans!";
      }
      return NextResponse.json({ text: reply });
    }

    // Prepare conversation logs for context
    const formattedHistory = messages.map(msg => {
      const roleName = msg.sender === "user" ? "user" : "model";
      return {
        role: roleName,
        parts: [{ text: msg.text }]
      };
    });

    const systemInstruction = `You are the ultimate expert AI Support Bot at PushMasterr.com (formerly PushSuite). 
Your tone should be professional, confident, helpful, and premium. Speak in pure, crisp, professional English suitable for a global corporate/developer audience in the international market.
Founder & CEO of PushMasterr.com is Push Master. 

Key core facts about PushMasterr:
1. It is a premium self-hosted perpetual push notification platform. You pay ONCE, use for lifetime.
2. Google OneSignal and other tools charge expensive monthly rates based on subscriber growth (e.g., up to $30,000/year for 500k-10Mil subs). With PushMasterr, you pay once ($499) and send UNLIMITED push notifications.
3. Plans available:
   - Startup Lifetime ($499 USD or ₹41,500 onetime): Unlimited domains, unlimited list size, customization, real-time analytics.
   - Pro Lifetime ($799 USD or ₹66,050 onetime): Adds dual-node extreme turbo speed engines, Developer API, integrated anti-spam safety crawler, priority 24/7 Slack and VIP support.
   - Lite Starter Monthly ($12 / ₹999): Up to 5k subs.
   - Pro Premium Monthly ($59 / ₹4,999): Up to 25k subs.

Make your answers concise, clear, and focused on helping the user convert to a perpetual customer.
CRITICAL MANDATE:
- If the user asks about price, rate card, cost, buying, features, comparison, WordPress, Laravel, or migration, ALWAYS encourage them and provide options to get started.
- ALWAYS append the exact code tag "[ACTION_CTA: startup-lifetime]" or "[ACTION_CTA: pro-lifetime]" at the very end of your response if relevant, so the website can render direct 'Add to Cart / Buy Now' buttons inside the chat widget.
- Do not explain this tag to the user; just append it seamlessly. Example: "You can click below to purchase: [ACTION_CTA: startup-lifetime] [ACTION_CTA: pro-lifetime]"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedHistory.map(h => ({ role: h.role, parts: h.parts })),
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ text: response.text || "PushMasterr is ready!" });

  } catch (error: any) {
    console.error("Gemini Chat API error:", error);
    return NextResponse.json({
      error: "Connection lag occurred",
      text: "Understood! Let's get you set up with PushMasterr. You can click 'SaaS Checkout' and select our Lifetime plans to instantly launch Campaign segments! [ACTION_CTA: startup-lifetime]"
    });
  }
}
