"use client";

import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Send, 
  Users, 
  Code, 
  Sparkles, 
  ShieldAlert, 
  Smartphone, 
  Laptop, 
  Plus, 
  Trash2, 
  Settings, 
  Key, 
  RefreshCw, 
  Play, 
  Pause,
  TrendingUp, 
  MousePointer, 
  Activity, 
  Clock, 
  Copy, 
  Check, 
  CheckCircle, 
  Moon, 
  Sun, 
  ChevronRight, 
  SlidersHorizontal,
  Terminal,
  ShieldCheck,
  Zap,
  BookOpen,
  Star,
  Globe,
  Lock,
  FileText,
  X,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CustomerAdminPanel, SuperAdminPanel, StarRatingsForm, TermsConditionsPage, ClientPortalLogin } from "./components/SaaSAdminPanels";
import { SaaSCheckout } from "./components/SaaSCheckout";

// Types
interface Campaign {
  id: string;
  title: string;
  body: string;
  badge: string;
  image?: string;
  actionButtons: string[];
  sentAt: string;
  clicks: number;
  impressions: number;
  segment: string;
  ctr: number;
  antiChurnDelayed: boolean;
}

interface Subscriber {
  id: string;
  endpoint: string;
  browser: string;
  os: string;
  country: string;
  subscribedAt: string;
  tags: string[];
  status: "active" | "ghost" | "muted";
  timezone: string;
}

export default function PushNotificationSaaS() {
  // Navigation & Interactive states
  const [activeTab, setActiveTab] = useState<"showcase" | "overview" | "aiwriter" | "campaign" | "segments" | "integrations" | "customer-admin" | "super-admin" | "pricing" | "terms" | "guide" | "portal">("showcase");
  const [selectedOS, setSelectedOS] = useState<"ios" | "android" | "macos" | "windows">("android");
  const language = "EN";
  
  // Custom Dynamic SaaS states
  const [isDarkMode, setIsDarkMode] = useState(true); // Locked in Dark Mode as requested: "Dark mod mein Khali kar dijiye"
  const [currentSubscriptionTier, setCurrentSubscriptionTier] = useState("Lite Starter Active");
  const [targetAppUrl, setTargetAppUrl] = useState("https://pushmasterr.com");
  const [lastClickedButtonId, setLastClickedButtonId] = useState<string | null>(null);

  // Razorpay global state registers
  const [razorpayKeyId, setRazorpayKeyId] = useState("rzp_test_Sv6JUzmpW6LOtn");
  const [razorpaySecret, setRazorpaySecret] = useState("zzsJTV7bs1m1CIDUZpDds5Ot");
  const [razorpayIsLive, setRazorpayIsLive] = useState(false);

  // Link safety anti-spam crawler registers
  const [spamStatus, setSpamStatus] = useState<"clean" | "checking" | "spam_detected" | "idle">("clean");
  const checkUrlSafety = (url: string) => {
    if (!url) {
      setSpamStatus("idle");
      return;
    }
    setSpamStatus("checking");
    setTimeout(() => {
      const toxicWords = ["spam", "scam", "phishing", "malware", "win-money", "get-rich", "free-cash", "hack", "virus", "free-gift"];
      const lower = url.toLowerCase();
      const containsToxic = toxicWords.some(word => lower.includes(word));
      if (containsToxic) {
        setSpamStatus("spam_detected");
      } else {
        setSpamStatus("clean");
      }
    }, 450);
  };

  const [connectedSites, setConnectedSites] = useState<any[]>([
    { id: "site-1", name: "My E-Commerce Hub", url: "https://mygrocery-bazaar.co.in", subscribedCount: 124, apiKey: "sdk_live_push_a59d9c24b11e2e", status: "active" },
    { id: "site-2", name: "Tech Blog Portal", url: "https://infotechblog.net", subscribedCount: 45, apiKey: "sdk_live_push_b77v9c31b88e0dc1", status: "active" },
  ]);

  const [reviews, setReviews] = useState<any[]>([
    { id: "rev-1", name: "Push Master", email: "contact@pushmasterr.com", rating: 5, feedback: "This is hand-down the cleanest Push Notification tool. Truly premium developer UI and lightning-fast AI optimizer!", date: "2026-05-26" },
    { id: "rev-2", name: "Amit Kumar", email: "amit.k@webtech.in", rating: 5, feedback: "Add-to-cart & checkout integration flows are fantastic. Payment was super secure through PayHub!", date: "2026-05-25" },
    { id: "rev-3", name: "Priya Sharma", email: "priya@reactdev.io", rating: 4, feedback: "Awesome anti-churn quiet hours protection. Saved our unsubscribe rate of users in USA!", date: "2026-05-24" }
  ]);

  const [plans, setPlans] = useState<any[]>([
    { id: "lite", name: "Lite Starter", price: 999, priceUSD: 12, priceINR: 999, limit: "Up to 5,000 active subscribers", features: ["1 Connected App/Website slot", "Standard notification constructor", "Web channels delivery", "SLA: 99.0% lifetime guarantee"] },
    { id: "pro", name: "Pro Premium", price: 4999, priceUSD: 59, priceINR: 4999, limit: "Up to 25,000 active subscribers", features: ["5 Connected Apps/Websites slots", "Twin-node delivery nodes", "Full AI Click-Through Optimizer access", "Anti-Churn timezone protection sleep-guard", "Priority developer support"] , popular: true },
    { id: "enterprise", name: "Ultimate Enterprise", price: 14999, priceUSD: 179, priceINR: 14999, limit: "Unlimited subscribers", features: ["Unlimited connected apps/websites", "Dedicated push network nodes", "Dedicated AI writer quotas", "Multi-team user seats", "Custom Domain tracking links", "24/7 Phone & Slack Support"] }
  ]);

  const [lifetimePlans, setLifetimePlans] = useState<any[]>([
    {
      id: "startup-lifetime",
      name: "Startup Lifetime",
      price: 41500, // $499 * 83
      priceUSD: 499,
      priceINR: 41500,
      limit: "Unlimited Domains & Unlimited Subscribers for Life",
      features: [
        "Unlimited Connected Domains",
        "Unlimited Subscribers quota list",
        "Fully Customizable Prompt constructor",
        "Project Cloning & Retargeting APIs",
        "Campign Delivery speed metrics",
        "EMIs Available & Lifetime Guarantee"
      ]
    },
    {
      id: "pro-lifetime",
      name: "Pro Lifetime",
      price: 66000, 
      priceUSD: 799,
      priceINR: 66050,
      limit: "Unlimited Domains + Unlimited Subscribers + Developer APIs",
      features: [
        "Everything in Startup Lifetime plan",
        "Full Developer API & secure payload sync",
        "Twin-Node high-speed push engines",
        "Integrated Anti-Spam Link Safety crawler",
        "Priority 24/7 Slack & Phone Support",
        "SLA: 100% Delivery Delivery success",
      ],
      popular: true
    }
  ]);

  const handleButtonClickEffect = (id: string, callback?: () => void) => {
    setLastClickedButtonId(id);
    // synthesize a micro audio beep safely!
    try {
      if (typeof window !== "undefined") {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(650, ctx.currentTime);
          gain.gain.setValueAtTime(0.015, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
        }
      }
    } catch (e) {
      console.log("Mini audio beep failed or gesture required", e);
    }
    if (callback) callback();
    setTimeout(() => {
      setLastClickedButtonId(prev => prev === id ? null : prev);
    }, 800);
  };
  
  const handleLoomMessageSend = (customPromptText?: string) => {
    const prompt = customPromptText || loomUserMessage;
    if (!prompt.trim()) return;

    const userMsg = { sender: "user", text: prompt };
    setLoomChatMessages(prev => [...prev, userMsg]);
    if (!customPromptText) setLoomUserMessage("");

    // Simulate Push Master replying with extremely premium professional advice in 500ms
    setTimeout(() => {
      let replyText = "";
      const lower = prompt.toLowerCase();
      if (lower.includes("onesignal") || lower.includes("migrate")) {
        replyText = "Yes! Simply go to SaaS Checkout, grab our FLAT Perpetual license, and our migration pipeline imports all targets instantly with zero downtime.";
      } else if (lower.includes("pushmasterr") || lower.includes("price") || lower.includes("pricing") || lower.includes("license")) {
        replyText = "PushMasterr models start at a onetime $499 flat pricing limit. Complete control, host-on-your-own cloud, with unlimited notification broadcasts!";
      } else if (lower.includes("wordpress") || lower.includes("wordpress plugin") || lower.includes("laravel")) {
        replyText = "We fully support seamless integrations. Your customized API keys can be copied under the 'Integration SDK' panel anytime.";
      } else {
        replyText = `That is fantastic! As founder of PushMasterr.com, I ensure our millisecond latency scales up to billions of targets. Ask me more or try our checkouts.`;
      }
      setLoomChatMessages(prev => [...prev, { sender: "raj", text: replyText }]);
    }, 600);
  };

  const [isSupportChatTyping, setIsSupportChatTyping] = useState(false);

  const handleSupportMessageSend = async () => {
    if (!supportChatMessageText.trim()) return;

    const userMsg = { sender: "user", text: supportChatMessageText };
    const updatedHistory = [...supportChatHistory, userMsg];
    setSupportChatHistory(updatedHistory);
    setSupportChatMessageText("");
    setIsSupportChatTyping(true);

    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedHistory })
      });
      const data = await res.json();
      if (data.text) {
        setSupportChatHistory(prev => [...prev, { sender: "support", text: data.text }]);
      } else {
        setSupportChatHistory(prev => [...prev, { 
          sender: "support", 
          text: "Thanks! I am a powerful AI bot. I am processing your inquiry and connecting you to Push Master right away." 
        }]);
      }
    } catch (e) {
      console.error(e);
      setSupportChatHistory(prev => [...prev, { 
        sender: "support", 
        text: "Understood! Our dynamic team has received your ticket details. We'll assist you immediately. Try choosing a checkout plan above!" 
      }]);
    } finally {
      setIsSupportChatTyping(false);
    }
  };
  
  // New Interactive Marketing & Explanations states
  const [rcsStatus, setRcsStatus] = useState<"initial" | "tracked" | "cancelled">("initial");
  const [activeNotifications, setActiveNotifications] = useState<any[]>([
    { id: 1, title: "🚀 Campaign Dispatched", body: "120k push nodes processed on core server.", time: "Just now", category: "Core Node" },
    { id: 2, title: "💰 Pro Member Checkout", body: "License generated for rajsahaniuk53@gmail.com", time: "2m ago", category: "Transaction" },
    { id: 3, title: "🎯 Smart Segment Recovery", body: "Re-engagement active for 45 passive browser tokens", time: "5m ago", category: "Automation" }
  ]);
  const [webPushSimulatorOS, setWebPushSimulatorOS] = useState<"chrome" | "safari" | "edge font">("chrome");
  const [isLoomAssistantOpen, setIsLoomAssistantOpen] = useState(false);
  const [isPlayingLoomVideo, setIsPlayingLoomVideo] = useState(false);
  const [loomVideoTime, setLoomVideoTime] = useState(0);

  // Auto-played video simulator driver
  useEffect(() => {
    let interval: any = null;
    if (isPlayingLoomVideo) {
      interval = setInterval(() => {
        setLoomVideoTime(prev => {
          if (prev >= 40) {
            return 0; // Loop the video simulation
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlayingLoomVideo]);

  const [loomChatMessages, setLoomChatMessages] = useState<any[]>([
    { sender: "raj", text: "Hey! Push Master here from PushMasterr.com, built for ultimate deliverability. Ask me anything about OneSignal migrations, Laravel/WordPress plugins, or custom campaigns!" }
  ]);
  const [loomUserMessage, setLoomUserMessage] = useState("");

  const [isSupportWidgetOpen, setIsSupportWidgetOpen] = useState(false);
  const [supportChatHistory, setSupportChatHistory] = useState<any[]>([
    { sender: "support", text: "Welcome to PushMasterr.com! Write your email or any questions about PushMasterr setup or integration API keys below..." }
  ]);
  const [supportChatMessageText, setSupportChatMessageText] = useState("");

  // Simulated database states
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isSubscribedSim, setIsSubscribedSim] = useState(true);
  const [prunedGhosts, setPrunedGhosts] = useState(false);
  const [isAuditingSegs, setIsAuditingSegs] = useState(false);
  const [isAuditingDone, setIsAuditingDone] = useState(false);
  
  // API credentials demo state
  const [apiKey, setApiKey] = useState("sdk_live_push_a59d9c24b11e2efd973ff");
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCodeTab, setCopiedCodeTab] = useState<string | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<"js" | "react" | "laravel" | "curl">("js");

  // Notifications system event
  const [notificationEvent, setNotificationEvent] = useState<{
    id: string;
    title: string;
    body: string;
    badge: string;
    image?: string;
    actionButtons: string[];
    sentAt: Date;
  } | null>(null);

  // Form input states
  const [campaignForm, setCampaignForm] = useState({
    title: "⚡ Final Call: Spring Sale Ends!",
    body: "Use premium code FLASH50 at checkout for immediate 50% discount. Free delivery.",
    badge: "deals",
    image: "https://picsum.photos/seed/cyber/800/400",
    actionButton1: "Buy Now",
    actionButton2: "Remind Later",
    deepLink: "/checkout?promo=FLASH50",
    segment: "all-subscribers",
    quietHoursAutoDelay: true
  });

  // AI copywriter custom prompts state
  const [aiPrompt, setAiPrompt] = useState("An invitation to join beta testing for our new mobile app, offering free lifetime updates.");
  const [aiTone, setAiTone] = useState("fomo");
  const [aiBadge, setAiBadge] = useState("updates");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiGeneratedSuccess, setAiGeneratedSuccess] = useState(false);
  const [aiResponseTip, setAiResponseTip] = useState("");

  const [workspace, setWorkspace] = useState("Prod Workspace - ECommerce");
  const [time, setTime] = useState("");

  // Sync internal digital clock
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch initial campaign logging & subscriber data on bootstrap
  useEffect(() => {
    async function initData() {
      try {
        const campRes = await fetch("/api/campaigns");
        if (campRes.ok) {
          const cData = await campRes.json();
          setCampaigns(cData);
        }
        
        const subRes = await fetch("/api/subscribers");
        if (subRes.ok) {
          const sData = await subRes.json();
          setSubscribers(sData);
        }
      } catch (err) {
        console.error("Failed to load initial APIs:", err);
      }
    }
    initData();
  }, []);

  // Synthesize soft audio confirmation chime inside the client browser safely without external files
  function playPhysicalNotificationChime() {
    if (typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // Node 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, ctx.currentTime); 
      gain1.gain.setValueAtTime(0.06, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.12);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.12);

      // Node 2 (slightly offset for clean modern chime feeling)
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(1174.66, ctx.currentTime); 
        gain2.gain.setValueAtTime(0.06, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.22);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.22);
      }, 95);
    } catch (e) {
      console.log("Audio session gesture required for audio playback.");
    }
  }

  // Handle manual subscriber creation from virtual opt-in prompt
  async function handleSimulatedSubscribe() {
    try {
      const randomBrowser = selectedOS === "ios" ? "Safari" : selectedOS === "macos" ? "Chrome" : selectedOS === "windows" ? "Edge" : "Chrome";
      const osName = selectedOS === "ios" ? "iOS" : selectedOS === "android" ? "Android" : selectedOS === "macos" ? "macOS" : "Windows";
      
      const payload = {
        id: `sim-${Math.floor(200 + Math.random() * 799)}`,
        browser: randomBrowser,
        os: osName,
        country: "India",
        tags: ["high-value-users"],
        status: "active",
        timezone: "IST"
      };

      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newSub = await res.json();
        setSubscribers(prev => [...prev, newSub]);
        setIsSubscribedSim(true);
        playPhysicalNotificationChime();
      }
    } catch (err) {
      console.error("Error creating subscriber tag:", err);
    }
  }

  // Handle clearing simulated push popup on device click
  function handleNotificationClick(isPrimaryAction: boolean = true) {
    if (!notificationEvent) return;
    
    // Simulate updating analytics report when user interacts with simulated toast/iOS push banner
    setCampaigns(prev => {
      return prev.map((camp, index) => {
        if (index === 0) { // update the latest campaign's click interactions
          const newClicks = camp.clicks + (isPrimaryAction ? 1 : 0);
          const newImpressions = camp.impressions + 1;
          return {
            ...camp,
            clicks: newClicks,
            impressions: newImpressions,
            ctr: parseFloat(((newClicks / newImpressions) * 100).toFixed(2))
          };
        }
        return camp;
      });
    });

    setNotificationEvent(null);
  }

  // Programmatic custom campaign posting handler
  async function triggerPushDelivery() {
    try {
      // Pack action buttons
      const actionButtons = [];
      if (campaignForm.actionButton1) actionButtons.push(campaignForm.actionButton1);
      if (campaignForm.actionButton2) actionButtons.push(campaignForm.actionButton2);

      const payload = {
        title: campaignForm.title,
        body: campaignForm.body,
        badge: campaignForm.badge,
        image: campaignForm.image || undefined,
        actionButtons,
        segment: campaignForm.segment,
        antiChurnDelayed: campaignForm.quietHoursAutoDelay
      };

      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newCamp = await res.json();
        setCampaigns(prev => [newCamp, ...prev]);
        
        // Instantly invoke simulation event so subscriber device visualizes landing!
        setNotificationEvent({
          id: newCamp.id,
          title: newCamp.title,
          body: newCamp.body,
          badge: newCamp.badge,
          image: newCamp.image,
          actionButtons: newCamp.actionButtons,
          sentAt: new Date()
        });

        // Trigger sound confirmation
        playPhysicalNotificationChime();
        
        // Auto-switch to overview or show notification panel so user is immediately aware
        setActiveTab("overview");
      }
    } catch (err) {
      console.error("Campaign API delivery log error:", err);
    }
  }

  // Call Gemini proxy server routes to create optimized notification details
  async function askGeminiToGenerateCopy() {
    setIsGeneratingAI(true);
    setAiGeneratedSuccess(false);
    try {
      const res = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          concept: aiPrompt,
          tone: aiTone,
          platform: selectedOS === "ios" ? "iOS Mobile" : selectedOS === "android" ? "Android Phone" : "Web Chrome Browser",
          badgeWord: aiBadge
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Update campaigns state & input forms instantly
        setCampaignForm(prev => ({
          ...prev,
          title: data.headline || prev.title,
          body: data.body || prev.body,
          badge: aiBadge,
          actionButton1: data.actionButtons?.[0] || prev.actionButton1,
          actionButton2: data.actionButtons?.[1] || prev.actionButton2
        }));

        setAiResponseTip(data.ctrBoostTip || "Try capitalizing localized badges to invite higher retention!");
        setAiGeneratedSuccess(true);
        // Switch tab to builder so they can preview/tweak and launch instantly
        setActiveTab("campaign");
      }
    } catch (err) {
      console.error("AI copywriter generation error:", err);
    } finally {
      setIsGeneratingAI(false);
    }
  }

  // Segment audit cleaner for ghost entries
  async function executePruningAudit() {
    setIsAuditingSegs(true);
    setIsAuditingDone(false);
    setTimeout(async () => {
      try {
        const res = await fetch("/api/subscribers", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "prune" })
        });
        if (res.ok) {
          const data = await res.json();
          setSubscribers(prev => prev.filter(sub => sub.status !== "ghost"));
          setPrunedGhosts(true);
        }
      } catch (err) {
        console.error("Subscriber pruning error:", err);
      } finally {
        setIsAuditingSegs(false);
        setIsAuditingDone(true);
      }
    }, 1800);
  }

  function toggleSubscriberMuted(id: string) {
    setSubscribers(prev => prev.map(sub => {
      if (sub.id === id) {
        return { ...sub, status: sub.status === "muted" ? "active" : "muted" };
      }
      return sub;
    }));
  }

  // Key Copy helpers
  function copyToClipboard(text: string, keyName: string) {
    navigator.clipboard.writeText(text);
    if (keyName === "api") {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedCodeTab(keyName);
      setTimeout(() => setCopiedCodeTab(null), 2000);
    }
  }

  // Custom SDK integration code templates
  const getIntegrationCode = () => {
    switch (activeLangTab) {
      case "js":
        return `// 1. Place this client SDK initialization script in your header
<script>
  (function(p,u,s,h){
    window.PushFlow = window.PushFlow || [];
    window.PushFlow.push(["init", {
      appId: "pf_app_90074",
      publicKey: "BPa97E_X6e243cbqhkP..."
    }]);
    var s = u.createElement("script");
    s.src = "https://cdn.pushflow.io/sdk/v2.js";
    s.async = true;
    u.head.appendChild(s);
  })(window, document);

  // 2. Trigger opt-in prompt anywhere
  PushFlow.push(["promptForSubscription", function(permission) {
    console.log("Web Push Registered status:", permission);
  }]);
</script>`;
      case "react":
        return `import { useEffect } from 'react';

export default function PushNotificationManager() {
  useEffect(() => {
    // Import lightweight Web Push Flow SDK client
    import('@pushflow/web-sdk').then((PushFlow) => {
      PushFlow.init({
        appId: "pf_app_90074",
        autoPrompt: true,
        tags: ["beta-tenant", "premium-ecommerce"]
      });
    });
  }, []);

  return (
    <button onClick={() => window.PushFlow?.prompt()}>
      🔔 Subscribe to Dev Room Notifications
    </button>
  );
}`;
      case "laravel":
        return `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\Http;

class NotificationController extends Controller
{
    public function sendCampaignPush(Request $request)
    {
        // One-click programmatic trigger to standard subscriber cohorts
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ${apiKey}',
            'Content-Type' => 'application/json'
        ])->post('https://push-api.pushflow.io/api/notify/send', [
            'title' => '⚡ Flash Cyber Sale: 70% Off',
            'body' => 'Only 2 hours remaining! Access VIP developer discount code instantly.',
            'badge' => 'deals',
            'actionButtons' => ['Claim Off', 'Snooze'],
            'segment' => 'high-value-users'
        ]);

        return response()->json($response->json());
    }
}`;
      case "curl":
        return `curl -X POST "https://push-api.pushflow.io/api/notify/send" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "${campaignForm.title}",
    "body": "${campaignForm.body}",
    "badge": "${campaignForm.badge}",
    "image": "${campaignForm.image || ""}",
    "actionButtons": ["${campaignForm.actionButton1}", "${campaignForm.actionButton2}"],
    "segment": "${campaignForm.segment}"
  }'`;
    }
  };

  // Safe variables calculation for dynamic counters
  const totalSubsCount = subscribers.length;
  const activeSubsCount = subscribers.filter(s => s.status === "active").length;
  const ghostCount = subscribers.filter(s => s.status === "ghost").length;
  const deliveryRate = totalSubsCount > 0 ? parseFloat(((activeSubsCount / totalSubsCount) * 100).toFixed(1)) : 100;

  // Aggregate stats from mock db
  const totalImpressionsSum = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicksSum = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const averageCTR = totalImpressionsSum > 0 ? parseFloat(((totalClicksSum / totalImpressionsSum) * 100).toFixed(2)) : 0;

  return (
    <div id="saas-container" className={`min-h-screen relative overflow-hidden flex flex-col font-sans transition-colors duration-300 ${
      isDarkMode ? "bg-[#0A0B0E] text-slate-200" : "bg-[#F8FAFC] text-slate-800"
    }`}>
      
      {/* Premium background color glows / lighting effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-45 mix-blend-screen transition-colors duration-300 ${
          isDarkMode ? "bg-indigo-900/15" : "bg-indigo-300/30"
        }`} />
        <div className={`absolute top-[400px] right-10 w-[400px] h-[400px] rounded-full blur-[140px] opacity-35 mix-blend-screen transition-colors duration-300 ${
          isDarkMode ? "bg-purple-900/15" : "bg-purple-300/25"
        }`} />
        <div className={`absolute bottom-20 left-10 w-[600px] h-[500px] rounded-full blur-[150px] opacity-30 mix-blend-screen transition-colors duration-300 ${
          isDarkMode ? "bg-blue-950/15" : "bg-blue-300/20"
        }`} />
      </div>
      
      {/* SaaS Main Topbar */}
      <header id="saas-header" className={`sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-4 border-b transition-all duration-300 ${
        isDarkMode 
          ? "bg-[#0D0F14]/95 border-white/5" 
          : "bg-white/95 border-slate-200/80 shadow-xs"
      }`}>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 text-white p-2.5 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Bell className="w-6 h-6 animate-pulse" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className={`text-lg md:text-xl font-extrabold tracking-tight flex items-center gap-2 justify-center sm:justify-start ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}>
              PushMasterr.com ⚡
              <span className={`text-[10px] font-mono uppercase font-bold tracking-widest px-2.5 py-0.5 rounded border animate-bounce ${
                isDarkMode ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30" : "bg-indigo-50 text-indigo-700 border-indigo-200/80"
              }`}>
                {currentSubscriptionTier === "Free" ? "LITE STARTER ACTIVE" : currentSubscriptionTier.toUpperCase()}
              </span>
            </h1>
            <p className={`text-[11px] font-semibold italic mt-0.5 ${isDarkMode ? "text-slate-500" : "text-slate-700"}`}>Intelligent opt-in, segment delivery, quiet-hours protection, and instant mockup simulation & optimization</p>
          </div>
        </div>

        {/* Global Control Bar */}
        <div className="flex items-center flex-wrap justify-center gap-3 shrink-0">
          
          <div className={`flex items-center border rounded-lg px-3 py-1.5 text-xs ${
            isDarkMode ? "bg-white/5 border-white/10 text-slate-350" : "bg-slate-100 border-slate-300 text-slate-700"
          }`}>
            <SlidersHorizontal className="w-3.5 h-3.5 mr-2" />
            <span className="text-slate-400 mr-1.5 font-medium italic">Workspace:</span>
            <select 
              value={workspace} 
              onChange={(e) => setWorkspace(e.target.value)} 
              className={`font-semibold bg-transparent border-none p-0 focus:outline-none cursor-pointer ${
                isDarkMode ? "text-white [&>option]:bg-[#0D0F14]" : "text-slate-900 [&>option]:bg-white"
              }`}
            >
              <option value="Prod Workspace - ECommerce">🛒 Production Store</option>
              <option value="Blog Workspace - Devs">📝 Technical Blog</option>
              <option value="Saas App - Alpha Platform">⚡ SaaS Application</option>
            </select>
          </div>

          <div className={`flex items-center border rounded-lg px-3 py-1.5 text-xs font-mono select-none ${
            isDarkMode ? "bg-slate-950 border-white/5 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-800"
          }`}>
            <Clock className="w-3.5 h-3.5 text-indigo-500 mr-2 animate-spin-slow" />
            <span>UTC: {time || "00:00:00"}</span>
          </div>

          <span className={`border px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-xs ${
            isDarkMode ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-emerald-50 text-emerald-600 border-emerald-300"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            Online Service
          </span>
        </div>
      </header>

      {/* Main SaaS Workspace layout */}
      <main id="saas-main" className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDE NAVIGATION CONSOLE PANEL: One side navigation panel (3 Columns) */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-4">
            <div className={`p-4 rounded-2xl border shadow-sm transition-all duration-300 ${
              isDarkMode ? "bg-[#0B0C10] border-white/5" : "bg-white border-slate-200/90"
            }`}>
              <div className="flex items-center gap-2 mb-3.5 px-1 pb-3 border-b border-dashed border-slate-200/40">
                <div className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold">🎯</div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-500 dark:text-indigo-450">Dash Console Gateway</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:flex-col gap-1.5 w-full">
                <button
                  id="tab-btn-showcase"
                  onClick={() => handleButtonClickEffect("tab-btn-showcase", () => setActiveTab("showcase"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "showcase" 
                      ? isDarkMode 
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shadow-xs font-bold" 
                        : "bg-indigo-50 text-indigo-750 border border-indigo-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-showcase"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-500 animate-pulse" />
                  <span className="font-bold">✨ Premium Showcase</span>
                </button>

                <button
                  id="tab-btn-overview"
                  onClick={() => handleButtonClickEffect("tab-btn-overview", () => setActiveTab("overview"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "overview" 
                      ? isDarkMode 
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shadow-xs font-bold" 
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-overview"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                  <span>Overview Analytics</span>
                </button>
                
                <button
                  id="tab-btn-aiwriter"
                  onClick={() => handleButtonClickEffect("tab-btn-aiwriter", () => setActiveTab("aiwriter"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "aiwriter" 
                      ? isDarkMode 
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shadow-xs font-bold" 
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-aiwriter"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-550 shrink-0" />
                  <span>AI Writer</span>
                </button>

                <button
                  id="tab-btn-campaign"
                  onClick={() => handleButtonClickEffect("tab-btn-campaign", () => setActiveTab("campaign"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "campaign" 
                      ? isDarkMode 
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shadow-xs font-bold" 
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-campaign"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span>Campaign Creator</span>
                </button>

                <button
                  id="tab-btn-segments"
                  onClick={() => handleButtonClickEffect("tab-btn-segments", () => setActiveTab("segments"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "segments" 
                      ? isDarkMode 
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shadow-xs font-bold" 
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-segments"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <Users className="w-3.5 h-3.5 shrink-0" />
                  <span>Segments</span>
                </button>

                <button
                  id="tab-btn-integrations"
                  onClick={() => handleButtonClickEffect("tab-btn-integrations", () => setActiveTab("integrations"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "integrations" 
                      ? isDarkMode 
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shadow-xs font-bold" 
                        : "bg-indigo-550/10 text-indigo-700 border border-indigo-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-integrations"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <Code className="w-3.5 h-3.5 shrink-0" />
                  <span>SDK Copy</span>
                </button>

                <button
                  id="tab-btn-cust-admin"
                  onClick={() => handleButtonClickEffect("tab-btn-cust-admin", () => setActiveTab("customer-admin"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "customer-admin" 
                      ? isDarkMode 
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shadow-xs font-bold" 
                        : "bg-indigo-50 text-indigo-750 border border-indigo-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-cust-admin"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Customer Sites</span>
                </button>

                <button
                  id="tab-btn-super-admin"
                  onClick={() => handleButtonClickEffect("tab-btn-super-admin", () => setActiveTab("super-admin"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "super-admin" 
                      ? isDarkMode 
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shadow-xs font-bold" 
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-super-admin"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-amber-550 shrink-0" />
                  <span>My Admin</span>
                </button>

                <button
                  id="tab-btn-pricing"
                  onClick={() => handleButtonClickEffect("tab-btn-pricing", () => setActiveTab("pricing"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "pricing" 
                      ? isDarkMode 
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shadow-xs font-bold" 
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-pricing"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-indigo-455 shrink-0" />
                  <span>SaaS Checkout</span>
                </button>

                <button
                  id="tab-btn-guide"
                  onClick={() => handleButtonClickEffect("tab-btn-guide", () => setActiveTab("guide"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "guide" 
                      ? isDarkMode 
                        ? "bg-emerald-100/15 text-emerald-400 border border-emerald-500/25 shadow-xs font-bold" 
                        : "bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-guide"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>📖 Customer Guide</span>
                </button>

                <button
                  id="tab-btn-terms"
                  onClick={() => handleButtonClickEffect("tab-btn-terms", () => setActiveTab("terms"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "terms" 
                      ? isDarkMode 
                        ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shadow-xs font-bold" 
                        : "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-terms"
                      ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>{language === "EN" ? "Trust & Legal" : "ट्रस्ट और नियम"}</span>
                </button>

                <button
                  id="tab-btn-portal"
                  onClick={() => handleButtonClickEffect("tab-btn-portal", () => setActiveTab("portal"))}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer lg:w-full lg:justify-start lg:text-left ${
                    activeTab === "portal" 
                      ? isDarkMode 
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/25 shadow-xs font-bold" 
                        : "bg-amber-50 text-amber-800 border border-amber-200 shadow-xs font-bold"
                      : lastClickedButtonId === "tab-btn-portal"
                      ? "bg-emerald-500 text-white scale-95 border border-emerald-400 font-bold"
                      : isDarkMode 
                      ? "text-slate-400 hover:text-white hover:bg-white/5" 
                      : "text-slate-600 hover:text-amber-600 hover:bg-slate-100"
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 shrink-0 text-amber-500 animate-pulse" />
                  <span>🔐 {language === "EN" ? "Client Portal (OTP)" : "क्लाइंट लॉग-इन (OTP)"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* CENTER: Central Workspace Active Component (6 Columns) */}
          <div className="lg:col-span-6 space-y-8">

            {/* TAB PANEL 0: LIVE REVOLUTIONARY PRODUCT SHOWCASE (INSPIRED BY ONESIGNAL & LARAPUSH) */}
            {activeTab === "showcase" && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10 animate-fade-in text-slate-800"
              >
                {/* 1. HERO RECOGNITION G2 BADGES ROW */}
                <div className={`p-6 rounded-2xl border text-center space-y-4 ${
                  isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-white border-slate-200/80 shadow-sm"
                }`}>
                  <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 font-extrabold text-[11px] px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-spin-slow" />
                    Rated 4.7/5 Stars on G2 Crowd Authentication
                  </div>
                  
                  <h2 className={`text-2xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    Real Results from Enterprise Teams
                  </h2>
                  <p className="text-xs text-slate-500 max-w-xl mx-auto">
                    From high-growth mobile startups to trusted global fintech networks, our deliverability infrastructure secures instant retention.
                  </p>

                  {/* 4 Custom Illustrated Spring 2026 Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4">
                    {/* Badge 1 */}
                    <div className="p-4 bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-transparent border border-amber-500/30 rounded-2xl flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden group hover:scale-105 transition-all">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-amber-500 rounded-full blur-xl opacity-35" />
                      <span className={`text-[10px] font-extrabold uppercase font-mono tracking-wider ${isDarkMode ? "text-amber-400" : "text-amber-800"}`}>Spring 2026</span>
                      <p className={`text-base font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-950 font-black"}`}>Leader</p>
                      <div className="flex gap-0.5 text-amber-500 pt-1 justify-center">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <Star className="w-2.5 h-2.5 fill-current" />
                        <Star className="w-2.5 h-2.5 fill-current" />
                      </div>
                    </div>

                    {/* Badge 2 */}
                    <div className="p-4 bg-gradient-to-br from-blue-500/10 via-sky-500/5 to-transparent border border-blue-500/30 rounded-2xl flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden group hover:scale-105 transition-all">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500 rounded-full blur-xl opacity-35" />
                      <span className={`text-[10px] font-extrabold uppercase font-mono tracking-wider ${isDarkMode ? "text-blue-400" : "text-blue-800"}`}>Spring 2026</span>
                      <p className={`text-xs font-black tracking-tight text-center ${isDarkMode ? "text-white" : "text-slate-950 font-black"}`}>Fastest Implementation</p>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full mt-1 ${isDarkMode ? "bg-blue-500/15 text-blue-400" : "bg-blue-100 text-blue-900 font-extrabold"}`}>Mid-Market</span>
                    </div>

                    {/* Badge 3 */}
                    <div className="p-4 bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/30 rounded-2xl flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden group hover:scale-105 transition-all">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-yellow-500 rounded-full blur-xl opacity-35" />
                      <span className={`text-[10px] font-extrabold uppercase font-mono tracking-wider ${isDarkMode ? "text-amber-400" : "text-amber-800"}`}>Spring 2026</span>
                      <p className={`text-base font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-950 font-black"}`}>Easiest To Use</p>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full mt-1 ${isDarkMode ? "bg-yellow-500/15 text-yellow-400" : "bg-yellow-100 text-yellow-900 font-extrabold"}`}>Enterprise</span>
                    </div>

                    {/* Badge 4 */}
                    <div className="p-4 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/30 rounded-2xl flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden group hover:scale-105 transition-all">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500 rounded-full blur-xl opacity-35" />
                      <span className={`text-[10px] font-extrabold uppercase font-mono tracking-wider ${isDarkMode ? "text-emerald-400" : "text-emerald-800"}`}>Spring 2026</span>
                      <p className={`text-base font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-950 font-black"}`}>Easiest Admin</p>
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full mt-1 ${isDarkMode ? "bg-emerald-500/15 text-emerald-400" : "bg-emerald-100 text-emerald-900 font-extrabold"}`}>Enterprise</span>
                    </div>
                  </div>
                </div>

                {/* 2. REAL RESULTS CUSTOMER QUOTATION BANNERS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Quote 1: Taptap Send */}
                  <div className={`p-6 rounded-3xl border space-y-4 hover:shadow-md transition-shadow ${
                    isDarkMode ? "bg-[#161920] border-white/5" : "bg-white border-slate-200 shadow-sm"
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white shadow-md">
                        🕊️
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Taptap Send</h4>
                        <span className="text-[10px] text-slate-400">Mobile Global Remittances</span>
                      </div>
                    </div>
                    <blockquote className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                      &ldquo;We use PushMasterr because it&apos;s simple to configure and there&apos;s the genuine possibility of scaling our web channels instantly. Our delivery latency dropped down to milliseconds.&rdquo;
                    </blockquote>
                  </div>

                  {/* Quote 2: Bitcoin.com */}
                  <div className={`p-6 rounded-3xl border space-y-4 hover:shadow-md transition-shadow ${
                    isDarkMode ? "bg-[#161920] border-white/5" : "bg-white border-slate-200"
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center font-bold text-white shadow-md">
                        🪙
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bitcoin.com</h4>
                        <span className="text-[10px] text-slate-400">Fintech & Crypto Media</span>
                      </div>
                    </div>
                    <blockquote className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                      &ldquo;Bitcoin.com turns messaging into an active growth lever—engaging, educating, and launching notifications cleanly. The campaign optimization module pays back on day one.&rdquo;
                    </blockquote>
                  </div>
                </div>

                {/* 3. MULTI-CHANNEL INTERACTIVE SIMULATORS (SMS/RCS, LIVE ACTIVITIES, WEB PUSH) */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      All-In-One Unified Engagement Channels
                    </h3>
                    <p className="text-xs text-slate-500">
                      Deliver hyper-personalized payloads on every screen, responsive to live user interactions.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Channel 1: SMS/RCS simulator */}
                    <div className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 relative overflow-hidden min-h-[460px] ${
                      isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-gradient-to-b from-indigo-50 to-white border-slate-200/80 shadow-sm"
                    }`}>
                      <div>
                        <span className="bg-indigo-600 text-white font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">SMS / RCS Channels</span>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1.5">Interactive SMS Dialogues</h4>
                        <p className="text-[11px] text-slate-500">Enable automated responses with customizable conversion paths.</p>
                      </div>

                      {/* Phone enclosure mimicking the user photo */}
                      <div className="bg-slate-900 p-4 rounded-3xl border-4 border-slate-800 h-[240px] flex flex-col justify-between text-xs my-2 relative text-white">
                        {/* Speaker notch */}
                        <div className="w-12 h-2.5 bg-slate-800 rounded-full mx-auto mb-2" />
                        
                        <div className="flex-1 space-y-2 overflow-y-auto pr-1">
                          <div className="bg-slate-800 text-slate-200 p-2.5 rounded-xl rounded-tl-none max-w-[85%] text-[10px] leading-snug">
                            <span className="font-bold text-[8px] text-indigo-400 block mb-0.5">eShoppe Service</span>
                            New promotional items have arrived! What are you shopping for today?
                          </div>

                          {/* Interactive user reply */}
                          {rcsStatus !== "initial" && (
                            <motion.div 
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="bg-indigo-600 text-white p-2 rounded-xl rounded-tr-none max-w-[80%] ml-auto text-[10px] text-right font-mono"
                            >
                              {rcsStatus.toUpperCase()}
                            </motion.div>
                          )}

                          {rcsStatus !== "initial" && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-slate-800 text-slate-250 p-2 text-[9px] rounded-xl rounded-tl-none max-w-[85%] border border-indigo-500/20"
                            >
                              🤖 Order dispatched or logged for <span className="text-amber-400 font-bold font-mono">{rcsStatus.toUpperCase()}</span>. Coupon check: SUITE50 active!
                            </motion.div>
                          )}
                        </div>

                        {/* Interactive prompt buttons simulating real touch as in photo */}
                        <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-800">
                          <button 
                            onClick={() => setRcsStatus("tracked")}
                            className="bg-indigo-600/30 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 text-indigo-400 font-semibold rounded p-1 text-[9px] text-center transition-all cursor-pointer"
                          >
                            📱 PHONES
                          </button>
                          <button 
                            onClick={() => setRcsStatus("cancelled")}
                            className="bg-indigo-600/30 hover:bg-indigo-600 hover:text-white border border-indigo-500/30 text-indigo-400 font-semibold rounded p-1 text-[9px] text-center transition-all cursor-pointer"
                          >
                            💻 LAPTOPS
                          </button>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 text-center font-medium">
                        💡 Click buttons in mobile device above to retry!
                      </div>
                    </div>

                    {/* Channel 2: Live Notifications Feed Center */}
                    <div className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 relative overflow-hidden min-h-[460px] ${
                      isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-gradient-to-b from-teal-50 to-white border-slate-200/80 shadow-sm"
                    }`}>
                      <div>
                        <span className="bg-[#10B981] text-slate-950 font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">Notification Center</span>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1.5">Live Delivery Feed</h4>
                        <p className="text-[11px] text-slate-500">Real-time alerts broadcasted instantly to subscriber list.</p>
                      </div>

                      {/* Phone screen with interactive alerts */}
                      <div className="bg-slate-950 p-4 border border-zinc-800 rounded-3xl h-[240px] flex flex-col justify-between my-2 relative text-slate-100 font-sans select-none shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between border-b border-white/10 pb-1.5 mb-1">
                          <span className="text-[8px] font-black text-amber-400 uppercase tracking-widest font-mono">📱 Notification Feed</span>
                          <span className="bg-indigo-600/30 text-indigo-400 text-[6.5px] font-mono px-1.5 py-0.5 rounded-full font-bold">Live Synced</span>
                        </div>

                        {/* Interactive List of Notifications */}
                        <div className="flex-1 space-y-2 overflow-y-auto pr-0.5 text-left scrollbar-thin scrollbar-thumb-slate-800">
                          {activeNotifications.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 text-[9px] italic">
                              No active notifications. Trigger one below!
                            </div>
                          ) : (
                            activeNotifications.map((notif) => (
                              <motion.div 
                                key={notif.id}
                                layoutId={`notif-${notif.id}`}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className="bg-[#11141D] border border-white/5 rounded-xl p-2.5 relative hover:border-indigo-500/20 transition-all duration-200"
                              >
                                <div className="flex justify-between items-start">
                                  <span className="text-[7px] text-amber-400 font-bold tracking-wider uppercase font-mono bg-amber-400/5 px-1 rounded border border-amber-400/10">
                                    {notif.category}
                                  </span>
                                  <span className="text-[7px] text-slate-500 font-mono">{notif.time}</span>
                                </div>
                                <h5 className="font-bold text-[8.5px] text-slate-100 mt-1">{notif.title}</h5>
                                <p className="text-[8px] text-slate-400 leading-snug mt-0.5">{notif.body}</p>
                              </motion.div>
                            ))
                          )}
                        </div>

                        {/* Status tag */}
                        <div className="text-[7.5px] text-slate-500 text-center uppercase tracking-widest font-mono pt-1.5 border-t border-white/5 mt-1.5">
                          PushMasterr High-Delivery Node Active
                        </div>
                      </div>

                      {/* Interactive triggers at bottom of card */}
                      <div className="grid grid-cols-3 gap-1.5 pt-2">
                        <button 
                          onClick={() => {
                            const id = Date.now();
                            const titles = ["🚀 Broadcast Dispatched", "📢 System Upgrade", "🔥 Global Notification Launched", "💡 Flash Sale Live"];
                            const bodies = ["Dispatched campaigns targeting 500k subscribers in 0.4s", "Core cluster software successfully provisioned", "Lifetime customers notified regarding upgrade", "Instant 20% discount coupon distributed to active cart owners"];
                            const cats = ["Broadcast", "System", "Promo"];
                            const randomIdx = Math.floor(Math.random() * titles.length);
                            setActiveNotifications(prev => [
                              { 
                                id, 
                                title: titles[randomIdx], 
                                body: bodies[randomIdx], 
                                time: "Just now", 
                                category: cats[Math.floor(Math.random() * cats.length)] 
                              },
                              ...prev.slice(0, 2)
                            ]);
                          }}
                          className="bg-indigo-650/40 hover:bg-indigo-600 text-white border border-indigo-500/20 font-extrabold rounded py-1 px-0.5 text-[8.5px] text-center transition-all cursor-pointer leading-tight"
                        >
                          📢 Broadcast
                        </button>
                        <button 
                          onClick={() => {
                            const id = Date.now();
                            const names = ["amit@gmail.com", "deepak_kumar@yahoo.com", "vikram_singh_uk@live.com", "raj_sahani_dev@outlook.com"];
                            const models = ["Pro Lifetime License", "Startup Lifetime Pack", "Enterprise Dev Node Addon"];
                            const randomName = names[Math.floor(Math.random() * names.length)];
                            const randomModel = models[Math.floor(Math.random() * models.length)];
                            setActiveNotifications(prev => [
                              { 
                                id, 
                                title: "💰 Checkout Success", 
                                body: `automatic clearance validated for ${randomName} buying ${randomModel}!`, 
                                time: "Just now", 
                                category: "Transaction" 
                              },
                              ...prev.slice(0, 2)
                            ]);
                          }}
                          className="bg-emerald-650/45 hover:bg-emerald-600 text-white border border-emerald-500/25 text-emerald-400 font-extrabold rounded py-1 px-0.5 text-[8.5px] text-center transition-all cursor-pointer leading-tight"
                        >
                          💸 Checkout
                        </button>
                        <button 
                          onClick={() => setActiveNotifications([])}
                          className="bg-slate-800 hover:bg-rose-600 hover:text-white border border-slate-705 text-slate-300 font-extrabold rounded py-1 px-0.5 text-[8.5px] text-center transition-all cursor-pointer leading-tight"
                        >
                          🧹 Clear Feed
                        </button>
                      </div>

                      <div className="text-[10px] text-slate-400 text-center font-medium">
                        💡 Click buttons above to trigger live high-priority demo notifications!
                      </div>
                    </div>

                    {/* Channel 3: Web Push notifications with computer mockup */}
                    <div className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 relative overflow-hidden min-h-[460px] ${
                      isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-gradient-to-b from-sky-50 to-white border-slate-200/80 shadow-sm"
                    }`}>
                      <div>
                        <span className="bg-sky-600 text-white font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">Web Push Notifications</span>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1.5">Direct Browser Pushes</h4>
                        <p className="text-[11px] text-slate-500">Engage customers directly on Chrome, Safari, and Microsoft Edge.</p>
                      </div>

                      {/* Desktop/browser simulated mockup */}
                      <div className="bg-[#1c1c1e] p-3 rounded-2xl border-4 border-slate-800 h-[240px] flex flex-col justify-between my-2 relative text-white">
                        <div className="flex gap-1.5 border-b border-white/5 pb-2 text-[8px] text-slate-400 font-mono">
                          <span className="text-rose-500">●</span>
                          <span className="text-amber-500">●</span>
                          <span className="text-emerald-500">●</span>
                          <span className="ml-auto flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded">
                            OS: {webPushSimulatorOS === "chrome" ? "Chrome UI" : webPushSimulatorOS === "safari" ? "macOS Safari" : "Windows Edge"}
                          </span>
                        </div>

                        {/* Interactive System Notification Popup */}
                        <div className="flex-1 flex flex-col justify-center">
                          <motion.div 
                            key={webPushSimulatorOS}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-[#242426]/90 border border-white/10 p-2.5 rounded-xl hover:bg-[#2c2c2e] transition-colors text-left"
                          >
                            <div className="flex justify-between items-center text-[8px] text-indigo-400 mb-1 font-mono uppercase tracking-widest">
                              <span>🔔 {webPushSimulatorOS === "chrome" ? "Google Chrome" : webPushSimulatorOS === "safari" ? "macOS Safari" : "Edge System Alert"}</span>
                              <span>now</span>
                            </div>
                            <h5 className="font-bold text-[9px] text-white">🎁 Special Discount active!</h5>
                            <p className="text-[8px] text-slate-300 leading-snug mt-0.5">Your shopping cart expires soon. Use code RECOVERY for 25% off checkout.</p>
                          </motion.div>
                        </div>

                        {/* Interactive toggle for browser mode */}
                        <div className="grid grid-cols-3 gap-1">
                          <button 
                            onClick={() => setWebPushSimulatorOS("chrome")}
                            className={`text-[8px] font-bold py-1 px-1 rounded transition-colors ${webPushSimulatorOS === "chrome" ? "bg-white/20 text-white" : "text-slate-500 hover:text-white bg-transparent"}`}
                          >
                            Chrome
                          </button>
                          <button 
                            onClick={() => setWebPushSimulatorOS("safari")}
                            className={`text-[8px] font-bold py-1 px-1 rounded transition-colors ${webPushSimulatorOS === "safari" ? "bg-white/20 text-white" : "text-slate-500 hover:text-white bg-transparent"}`}
                          >
                            Safari
                          </button>
                          <button 
                            onClick={() => setWebPushSimulatorOS("edge font")}
                            className={`text-[8px] font-bold py-1 px-1 rounded transition-colors ${webPushSimulatorOS === "edge font" ? "bg-white/20 text-white" : "text-slate-500 hover:text-white bg-transparent"}`}
                          >
                            Edge
                          </button>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 text-center font-medium">
                        💡 Visual platform distribution previewer
                      </div>
                    </div>
                  </div>

                  {/* 4. REAL ONESIGNAL MULTI-TRILLION STATS ROW */}
                  <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl border border-dashed text-center ${
                    isDarkMode ? "bg-[#161920]/80 border-white/10 text-white" : "bg-zinc-50 border-slate-200 text-slate-800"
                  }`}>
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-indigo-600 dark:text-indigo-450 font-mono">1 in 4</p>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">App Publishers Partnered</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-indigo-600 dark:text-indigo-455 font-mono">1.3 Trillion</p>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Sent Messages Annually</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-indigo-600 dark:text-indigo-455 font-mono">1.5 Billion</p>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Active MAU Powered</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-black text-indigo-600 dark:text-indigo-455 font-mono">200k +</p>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Live Sites Running Pushes</p>
                    </div>
                  </div>
                </div>

                {/* 5. WE GOT ALL OF THE FEATURES IN THE INDUSTRY (BENTO GRID - HIGH CONTRAST) */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      All Features Available in the Industry
                    </h3>
                    <p className="text-xs text-slate-500 max-w-lg mx-auto">
                      Built to make sure you never have to think even once about database limitations, API routes, or complex integrations.
                    </p>
                  </div>

                  {/* Bento Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Bento Card 1 */}
                    <div className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 ${
                      isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-white border-slate-200 hover:shadow-md"
                    }`}>
                      <span className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-lg">🐘</span>
                      <h5 className="font-extrabold text-xs text-slate-900 dark:text-white mt-3">WordPress / Laravel Plugin</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug text-left">
                        Send automated push notifications to subscribers in real-time instantly when publishing articles or dispatching events.
                      </p>
                    </div>

                    {/* Bento Card 2 */}
                    <div className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 ${
                      isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-white border-slate-200 hover:shadow-md"
                    }`}>
                      <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-lg">⏱️</span>
                      <h5 className="font-extrabold text-xs text-slate-900 dark:text-white mt-3">Fastest Delivery Guarantee</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug text-left">
                        Optimized concurrent sockets distribute up to 150,000 pushes per second under extreme transaction bounds.
                      </p>
                    </div>

                    {/* Bento Card 3 */}
                    <div className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 ${
                      isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-white border-slate-200 hover:shadow-md"
                    }`}>
                      <span className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center font-bold text-lg">📊</span>
                      <h5 className="font-extrabold text-xs text-slate-900 dark:text-white mt-3">Advanced Analytical Portal</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug text-left">
                        Granular delivery logs detailing subscriber operating systems, click events, and opt-out counts.
                      </p>
                    </div>

                    {/* Bento Card 4 */}
                    <div className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 ${
                      isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-white border-slate-200 hover:shadow-md"
                    }`}>
                      <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-lg">🍎</span>
                      <h5 className="font-extrabold text-xs text-slate-900 dark:text-white mt-3">iPhones & iOS Compatible</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug text-left">
                        Fully supports native Safari APNs and dynamic iOS foreground alerts without packing native Apple build code.
                      </p>
                    </div>

                    {/* Bento Card 5 */}
                    <div className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 ${
                      isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-white border-slate-200 hover:shadow-md"
                    }`}>
                      <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-lg">🔗</span>
                      <h5 className="font-extrabold text-xs text-slate-900 dark:text-white mt-3">Subscribers Collect via Links</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug text-left">
                        Generate sharable custom URLs allowing customers to select opt-in straight from social media pages or emails.
                      </p>
                    </div>

                    {/* Bento Card 6 */}
                    <div className={`p-5 rounded-2xl border transition-all duration-200 hover:-translate-y-1 ${
                      isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-white border-slate-200 hover:shadow-md"
                    }`}>
                      <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold text-lg">🛡️</span>
                      <h5 className="font-extrabold text-xs text-slate-900 dark:text-white mt-3">Token Ghost Invalidation</h5>
                      <p className="text-[10px] text-slate-500 mt-1 leading-snug text-left">
                        Active security checks detect and prune mutated tokens automatically, preserving active transmission speed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 6. LARAPUSH COMPARATIVE LICENSING SECTION */}
                <div className="space-y-6 pt-6">
                  <div className="text-center">
                    <span className="bg-amber-100 text-amber-800 font-extrabold text-[9px] px-3 py-1 rounded-full uppercase tracking-wider border border-amber-200">Perpetual Pricing Model</span>
                    <h3 className={`text-xl font-bold tracking-tight mt-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                      One-Time Perpetual Licensing model
                    </h3>
                    <p className="text-xs text-slate-500">
                      Why pay recurring monthly volume-based scales? Get absolute enterprise utility for a flat, self-hosted onetime license.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto items-stretch">
                    {/* License 1: Startup license */}
                    <div className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 relative ${
                      isDarkMode ? "bg-[#161920] border-white/5 text-white" : "bg-white border-slate-200/80 shadow-md"
                    }`}>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-350 font-bold px-3 py-0.5 rounded-full">STARTUP</span>
                          <span className="text-[10px] text-emerald-500 font-bold">LIFETIME</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-slate-900 dark:text-white">$499</span>
                          <span className="text-xs text-slate-500">/ ONETIME</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed text-left">Perfect for single founders looking to bypass OneSignal&apos;s growth-locked pricing limits forever.</p>
                      </div>

                      <div className="space-y-2.5 border-t border-slate-100 dark:border-white/5 pt-4">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-emerald-500 flex-shrink-0 font-bold">✓</span>
                          <span>Unlimited Registered Domains</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-emerald-500 flex-shrink-0 font-bold">✓</span>
                          <span>Unlimited Active Push Subscribers</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-emerald-500 flex-shrink-0 font-bold">✓</span>
                          <span>Fully Customizable Consent prompts</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="flex-shrink-0 font-bold">✓</span>
                          <span>Campaign reports & statistics logs</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          handleButtonClickEffect("startup-buy-now", () => {
                            setActiveTab("pricing");
                          });
                        }}
                        className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                          lastClickedButtonId === "startup-buy-now" 
                            ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400" 
                            : isDarkMode 
                            ? "bg-white/5 text-white border border-white/10 hover:bg-white/10" 
                            : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-650/10"
                        }`}
                      >
                        Buy Now Instantly
                      </button>
                    </div>

                    {/* License 2: Pro license (Featuring EMI and Sticker) */}
                    <div className={`p-6 rounded-3xl border flex flex-col justify-between space-y-5 relative overflow-hidden ${
                      isDarkMode ? "bg-indigo-950/20 border-indigo-500/25 text-white" : "bg-slate-50 border-slate-350 shadow-xl"
                    }`}>
                      {/* Original diagonal Blue Sticker "EMIs Available" */}
                      <div className="absolute top-4 -right-12 bg-indigo-600 text-white font-extrabold uppercase font-mono text-[9px] tracking-widest py-1 px-12 rotate-45 text-center shadow">
                        EMIs Available
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-indigo-150 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-extrabold px-3 py-0.5 rounded-full">PRO PROFESSIONAL</span>
                          <span className="text-[10px] text-indigo-500 font-bold mr-6">POPULAR CHOICE</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-slate-900 dark:text-white">$799</span>
                          <span className="text-xs text-slate-500">/ ONETIME</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed text-left font-medium">The ultimate choice for software companies, high volume newsletters, and custom agency sites.</p>
                      </div>

                      <div className="space-y-2.5 border-t border-slate-200 dark:border-white/5 pt-4">
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <span className="text-indigo-650 dark:text-indigo-400 flex-shrink-0 font-extrabold">✓</span>
                          <span>Everything in Startup License</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-indigo-650 dark:text-indigo-400 flex-shrink-0">✓</span>
                          <span>Multi-Node Fast Sockets Connection</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-indigo-650 dark:text-indigo-400 flex-shrink-0">✓</span>
                          <span>Complete Campaign Cloning & Retargetting</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-indigo-650 dark:text-indigo-400 flex-shrink-0">✓</span>
                          <span>Premium WordPress & YouTube Collector API</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          handleButtonClickEffect("pro-buy-now", () => {
                            setActiveTab("pricing");
                          });
                        }}
                        className={`w-full py-3 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                          lastClickedButtonId === "pro-buy-now" 
                            ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-black" 
                            : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-6/20"
                        }`}
                      >
                        Acquire License Pro
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB PANEL 1: OVERVIEW ANALYTICS */}
            {activeTab === "overview" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 animate-fade-in"
              >
                {/* Stats Counters Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#161920] p-5 rounded-2xl border border-white/5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold tracking-tighter uppercase italic">Subscribers</span>
                      <span className="bg-indigo-500/10 text-indigo-400 p-1.5 rounded-lg border border-indigo-500/20">
                        <Users className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold font-mono tracking-tight text-white">{totalSubsCount}</span>
                      <p className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-0.5">
                        ↑ +12.4% this week
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#161920] p-5 rounded-2xl border border-white/5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold tracking-tighter uppercase italic">Opt-in CTR</span>
                      <span className="bg-amber-500/10 text-amber-400 p-1.5 rounded-lg border border-amber-500/20">
                        <MousePointer className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold font-mono tracking-tight text-white">{averageCTR ? `${averageCTR}%` : "35.98%"}</span>
                      <p className="text-[10px] text-indigo-400 font-semibold mt-1 flex items-center gap-0.5">
                        💡 High optimization tier
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#161920] p-5 rounded-2xl border border-white/5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold tracking-tighter uppercase italic">Deliverability</span>
                      <span className="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg border border-emerald-500/20">
                        <Activity className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold font-mono tracking-tight text-white">{deliveryRate}%</span>
                      <p className="text-[10px] text-slate-400 font-medium mt-1">
                        Active connection status
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#161920] p-5 rounded-2xl border border-white/5 shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-semibold tracking-tighter uppercase italic">Bypass Queue</span>
                      <span className="bg-rose-500/10 text-rose-400 p-1.5 rounded-lg border border-rose-500/20">
                        <ShieldAlert className="w-4 h-4" />
                      </span>
                    </div>
                    <div className="mt-4">
                      <span className="text-2xl font-bold font-mono tracking-tight text-white">{ghostCount}</span>
                      <p className="text-[10px] text-rose-400 font-semibold mt-1">
                        Ghost tokens detected
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main Visual Funnel and Device Analytics Report */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Delivery Visual Funnel using high fidelity SVG */}
                  <div className="bg-[#161920] p-6 rounded-2xl border border-white/5 shadow-sm md:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm text-white italic tracking-wide">Campaign Action Funnel</h3>
                        <p className="text-xs text-slate-400">Opt-in to click-through distribution report</p>
                      </div>
                      <span className="text-xs bg-white/5 text-slate-300 border border-white/10 px-2 py-0.5 rounded-md font-mono">Live Logs</span>
                    </div>

                    <div className="relative py-4 flex flex-col space-y-4 items-center justify-center">
                      {/* SVG Funnel Visual */}
                      <svg width="280" height="150" viewBox="0 0 280 150" className="w-full max-w-[280px]">
                        <defs>
                          <linearGradient id="funnelGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4f46e5" />
                            <stop offset="100%" stopColor="#6366f1" />
                          </linearGradient>
                          <linearGradient id="funnelGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#a5b4fc" />
                          </linearGradient>
                          <linearGradient id="funnelGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#fcd34d" />
                          </linearGradient>
                        </defs>
                        {/* Upper funnel: Delivered */}
                        <polygon points="10,0 270,0 230,50 50,50" fill="url(#funnelGrad1)" opacity="0.95" />
                        <text x="140" y="30" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          DELIVERED: {totalImpressionsSum || 690} Targets
                        </text>

                        {/* Middle funnel: Impressions */}
                        <polygon points="50,52 230,52 195,95 85,95" fill="url(#funnelGrad2)" opacity="0.9" />
                        <text x="140" y="77" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          IMPRESSIONS: {totalImpressionsSum ? Math.round(totalImpressionsSum * 0.95) : 650} (95%)
                        </text>

                        {/* Lower funnel: Clicks */}
                        <polygon points="85,97 195,97 170,140 110,140" fill="url(#funnelGrad3)" />
                        <text x="140" y="122" fill="#78350f" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                          CLICKS: {totalClicksSum || 231} (CTR: {averageCTR ? `${averageCTR}%` : "33.48%"})
                        </text>
                      </svg>
                      
                      <div className="w-full grid grid-cols-3 gap-2 text-center text-[10px] text-slate-400 font-medium">
                        <div>
                          <p className="text-white font-mono text-xs font-bold">{totalImpressionsSum || 690}</p>
                          <span>Delivered (Targeted)</span>
                        </div>
                        <div>
                          <p className="text-white font-mono text-xs font-bold">{totalImpressionsSum ? Math.round(totalImpressionsSum * 0.95) : 650}</p>
                          <span>Seen (On Device)</span>
                        </div>
                        <div>
                          <p className="text-white font-mono text-xs font-bold">{totalClicksSum || 231}</p>
                          <span>Interacted (Clicks)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Device cohort distribution */}
                  <div className="bg-[#161920] p-6 rounded-2xl border border-white/5 shadow-sm md:col-span-5 space-y-4">
                    <h3 className="font-semibold text-sm text-white italic tracking-wide">Platform Cohort Split</h3>
                    <p className="text-xs text-slate-400">Distribution of browser instances</p>
                    
                    <div className="space-y-3.5 pt-2">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                            Chrome Mobile/OS
                          </span>
                          <span className="font-mono font-bold text-white">54%</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: "54%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                            Safari (macOS/iOS)
                          </span>
                          <span className="font-mono font-bold text-white">28%</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div className="bg-sky-400 h-full rounded-full" style={{ width: "28%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            Edge (Windows 11)
                          </span>
                          <span className="font-mono font-bold text-white">12%</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: "12%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            Firefox Custom API
                          </span>
                          <span className="font-mono font-bold text-white">6%</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full rounded-full" style={{ width: "6%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sent Campaigns History Logs & Metrics */}
                <div className="bg-[#161920] rounded-2xl border border-white/5 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-white italic tracking-wide">Campaign History Logs</h3>
                      <p className="text-xs text-slate-400">Track and manage previous campaign delivery audits</p>
                    </div>
                    <span className="text-xs bg-white/5 text-slate-300 border border-white/10 px-3 py-1 rounded-full font-mono">
                      Database: {campaigns.length} Sent
                    </span>
                  </div>

                  <div className="divide-y divide-white/5">
                    {campaigns.map((camp) => (
                      <div key={camp.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                        <div className="space-y-1.5 max-w-md">
                          <div className="flex items-center gap-2">
                            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-mono uppercase font-semibold tracking-wider px-2 py-0.5 rounded">
                              {camp.badge}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              ID: {camp.id}
                            </span>
                            {camp.antiChurnDelayed && (
                              <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" /> Sleep Guard Active
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-white text-sm">{camp.title}</h4>
                          <p className="text-xs text-slate-400 line-clamp-2">{camp.body}</p>
                          <p className="text-[10px] text-slate-500">Sent on: {new Date(camp.sentAt).toLocaleString()}</p>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs text-slate-500">Target Segment</p>
                            <p className="text-xs font-semibold text-slate-200 capitalize">{camp.segment.replace("-", " ")}</p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-xs text-slate-500">CTR Metrics</p>
                            <div className="flex items-center gap-2 justify-end mt-0.5">
                              <span className="font-mono text-sm font-bold text-white">{camp.ctr}%</span>
                              <span className="text-[11px] text-slate-400">({camp.clicks} Clicks)</span>
                            </div>
                            <div className="w-24 bg-white/5 h-1.5 rounded-full overflow-hidden mt-1 ml-auto">
                              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min(camp.ctr * 2, 100)}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* TAB PANEL 2: AI COPYWRITER & GENERATOR */}
            {activeTab === "aiwriter" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#161920] p-6 md:p-8 rounded-2xl border border-white/5 space-y-6"
              >
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    AI Click-Through Optimizer
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Powered by the official server-side Gemini 3.5 model. Generate and output ultra-high performance copy that converts subscribers immediately.
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                      What is the core offer, notification launch, or dynamic alert goal?
                    </label>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g., Summer sneaker flash sale. 50% discount codes apply only until Friday mid-night, checkout link: sneaker.io"
                      className="w-full text-sm bg-[#0D0F14] border border-white/5 focus:border-indigo-500 rounded-xl p-3 min-h-[100px] hover:bg-[#0D0F14]/80 transition-all focus:outline-none text-white placeholder-slate-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                        Conversion Psychology / Tone
                      </label>
                      <select
                        value={aiTone}
                        onChange={(e) => setAiTone(e.target.value)}
                        className="w-full text-sm bg-[#0D0F14] border border-white/5 focus:border-indigo-500 rounded-xl p-3 transition-colors focus:outline-none text-white [&>option]:bg-[#0D0F14] [&>option]:text-white"
                      >
                        <option value="fomo">⚡ Extreme FOMO (Fear Of Missing Out)</option>
                        <option value="urgency">⏳ High Urgency & Timer-based</option>
                        <option value="friendly">🎉 Warm, Personal & Interactive</option>
                        <option value="professional">💼 Strict, Corporate & Informative</option>
                        <option value="playful">🎈 Conversational, Humorous & Emojis</option>
                        <option value="curious">🤔 Curiously mysterious (Teaser)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                        Target Category Badge
                      </label>
                      <select
                        value={aiBadge}
                        onChange={(e) => setAiBadge(e.target.value)}
                        className="w-full text-sm bg-[#0D0F14] border border-white/5 focus:border-indigo-500 rounded-xl p-3 transition-colors focus:outline-none text-white [&>option]:bg-[#0D0F14] [&>option]:text-white"
                      >
                        <option value="deals">🛍️ Sale & Deals Offering</option>
                        <option value="updates">📢 News & Product Updates</option>
                        <option value="alerts">🚨 Urgent System Alerts/Security</option>
                        <option value="general">📋 General Circular newsletter</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Compliant with standard Character lengths and Web Push protocols.</span>
                    </div>

                    <button
                      id="run-copywriter-btn"
                      onClick={askGeminiToGenerateCopy}
                      disabled={isGeneratingAI || !aiPrompt.trim()}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm py-3 px-6 rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-50 cursor-pointer"
                    >
                      {isGeneratingAI ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Analyzing and optimizing copywriting...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Generate Copy with Gemini AI
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Tactical Tips Box if generated */}
                {aiGeneratedSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-start gap-3"
                  >
                    <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-indigo-300 uppercase tracking-wider">CTR Conversion Boost Tip</h4>
                      <p className="text-xs text-slate-300 mt-1">{aiResponseTip || "Notification automatically parsed and transferred directly into the Campaign form. Look on the Builder to launch!"}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* TAB PANEL 3: NO-CODE CAMPAIGN BUILDER */}
            {activeTab === "campaign" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#161920] p-6 md:p-8 rounded-2xl border border-white/5 shadow-sm space-y-6"
              >
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center justify-between">
                    <span>Campaign & Notification Constructor</span>
                    <span className="text-[10px] bg-white/5 text-slate-300 border border-white/10 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                      Draft Saved
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Configure payloads with rich content, deep-linking, badge icons, and target constraints</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title and message body */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                        Notification Headline Title
                      </label>
                      <input
                        type="text"
                        value={campaignForm.title}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full text-sm bg-[#0D0F14] border border-white/5 focus:border-indigo-500 rounded-xl p-3 transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500/30 text-white"
                        maxLength={50}
                      />
                      <span className="text-[10px] text-slate-500 mt-1 text-right block">
                        {campaignForm.title.length}/50 characters (Optimized Headline size)
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                        Notification Content Text Body
                      </label>
                      <textarea
                        value={campaignForm.body}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, body: e.target.value }))}
                        className="w-full text-sm bg-[#0D0F14] border border-white/5 focus:border-indigo-500 rounded-xl p-3 h-[90px] transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-500/30 text-white"
                        maxLength={120}
                      />
                      <span className="text-[10px] text-slate-500 mt-1 text-right block">
                        {campaignForm.body.length}/120 characters max
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                          Badge Icon
                        </label>
                        <select
                          value={campaignForm.badge}
                          onChange={(e) => setCampaignForm(prev => ({ ...prev, badge: e.target.value }))}
                          className="w-full text-sm bg-[#0D0F14] border border-white/5 focus:border-indigo-500 rounded-xl p-3 focus:outline-none text-white [&>option]:bg-[#0D0F14] [&>option]:text-white"
                        >
                          <option value="deals">🛍️ Sale & Promo</option>
                          <option value="alerts">🚨 System alert</option>
                          <option value="updates">📢 News upgrade</option>
                          <option value="general">📋 Circular memo</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                          Cohort Filter
                        </label>
                        <select
                          value={campaignForm.segment}
                          onChange={(e) => setCampaignForm(prev => ({ ...prev, segment: e.target.value }))}
                          className="w-full text-sm bg-[#0D0F14] border border-white/5 focus:border-indigo-500 rounded-xl p-3 focus:outline-none text-white [&>option]:bg-[#0D0F14] [&>option]:text-white"
                        >
                          <option value="all-subscribers">🌍 All active instances</option>
                          <option value="high-value-users">💎 Target Premium Segment</option>
                          <option value="cart-abandoners">🛒 Cart recovery segment</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Rich media and interactive option buttons */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                        Banner Promotional Preview Image URL (Optional)
                      </label>
                      <input
                        type="text"
                        value={campaignForm.image}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full text-sm bg-[#0D0F14] border border-white/5 focus:border-indigo-500 rounded-xl p-3 focus:outline-none text-white placeholder-slate-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                          First CTA Action Button
                        </label>
                        <input
                          type="text"
                          value={campaignForm.actionButton1}
                          onChange={(e) => setCampaignForm(prev => ({ ...prev, actionButton1: e.target.value }))}
                          className="w-full text-sm bg-[#0D0F14] border border-white/5 focus:border-indigo-500 rounded-xl p-3 focus:outline-none text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                          Second CTA Button
                        </label>
                        <input
                          type="text"
                          value={campaignForm.actionButton2}
                          onChange={(e) => setCampaignForm(prev => ({ ...prev, actionButton2: e.target.value }))}
                          className="w-full text-sm bg-[#0D0F14] border border-white/5 focus:border-indigo-500 rounded-xl p-3 focus:outline-none text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                        Deploy Target Website or Custom App Link URL
                      </label>
                      <div className="flex gap-2">
                        <span className={`border rounded-xl p-3 text-xs flex items-center shrink-0 ${
                          isDarkMode ? "bg-[#161920] border-white/5 text-slate-400" : "bg-slate-100 border-slate-200 text-slate-600"
                        }`}>
                          <Globe className="w-4 h-4 text-indigo-500 mr-1.5" /> Direct URL Target
                        </span>
                        <input
                          type="text"
                          value={targetAppUrl}
                          onChange={(e) => {
                            setTargetAppUrl(e.target.value);
                            setCampaignForm(prev => ({ ...prev, deepLink: e.target.value }));
                            checkUrlSafety(e.target.value);
                          }}
                          placeholder="e.g. https://rajsahani.co.in/shop"
                          className={`w-full text-sm rounded-xl p-3 focus:outline-none font-semibold ${
                            isDarkMode 
                              ? "bg-[#0D0F14] border-white/5 focus:border-indigo-500 text-white placeholder-slate-650" 
                              : "bg-slate-50 border-slate-200 focus:border-indigo-550 text-slate-900 placeholder-slate-400"
                          }`}
                        />
                      </div>

                      {/* Real-time Anti-Spam Safety Badges */}
                      <div className="mt-2">
                        {spamStatus === "checking" && (
                          <div className="text-[10px] text-amber-500 animate-pulse font-bold font-mono flex items-center gap-1.5 bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                            Scrutinizing redirect parameters & crawling toxic registries...
                          </div>
                        )}
                        {spamStatus === "clean" && (
                          <div className="text-[10px] text-emerald-600 font-bold font-sans flex items-center gap-1.5 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                            <span>✓ Direct Link Cleared! No spam signatures detected on target destination.</span>
                          </div>
                        )}
                        {spamStatus === "spam_detected" && (
                          <div className="text-[10px] text-rose-550 font-bold font-sans flex flex-col gap-1 bg-rose-500/5 p-2.5 rounded-lg border border-rose-500/10 whitespace-normal leading-normal">
                            <span className="flex items-center gap-1.5">
                              ⚠️ WARNING: POTENTIAL SPAM WORDS IDENTIFIED IN TARGET URL!
                            </span>
                            <span className="font-medium text-slate-450 block text-[9.5px]">
                              Your path contains words flagged as spam (e.g. free-gift, get-rich, virus). These links may be parsed and rejected by device browser filters.
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-[10px] text-slate-500 mt-1.5 italic font-medium">When subscribers click the simulated alert window banner, they will navigate instantly to this target app link.</p>
                    </div>
                  </div>
                </div>

                {/* ADVANCED: Timezone scheduler protection module (Missing in standard platforms) */}
                <div className="bg-[#0D0F14] p-5 rounded-xl border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest italic">
                      <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                      Anti-Churn Quiet Hours Delivery Delay Protector
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={campaignForm.quietHoursAutoDelay}
                        onChange={(e) => setCampaignForm(prev => ({ ...prev, quietHoursAutoDelay: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                  
                  <p className="text-xs text-slate-400">
                    Waking up subscribers outside 9:00 AM - 9:00 PM local timezone hours causes direct unsubscriptions. 
                    Our sleep analysis automatically shifts target notifications landing times relative to their country.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-[10px] pt-1.5">
                    <div className="bg-[#161920] p-2.5 rounded-lg border border-white/5 flex flex-col justify-between">
                      <span className="font-semibold text-slate-300">USA (EST)</span>
                      <span className="text-slate-500 mt-1 text-[11px] font-mono">10:54 AM</span>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded mt-1.5 block">
                        AWAKE 🟢 Safe
                      </span>
                    </div>

                    <div className="bg-[#161920] p-2.5 rounded-lg border border-white/5 flex flex-col justify-between">
                      <span className="font-semibold text-slate-300">INDIA (IST)</span>
                      <span className="text-slate-500 mt-1 text-[11px] font-mono">8:24 PM</span>
                      <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded mt-1.5 block">
                        EVENING 🟡 Warning
                      </span>
                    </div>

                    <div className="bg-[#161920] p-2.5 rounded-lg border border-white/5 flex flex-col justify-between">
                      <span className="font-semibold text-slate-300">EUROPE (CET)</span>
                      <span className="text-slate-500 mt-1 text-[11px] font-mono">4:54 PM</span>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded mt-1.5 block">
                        AWAKE 🟢 Safe
                      </span>
                    </div>

                    <div className="bg-[#161920] p-2.5 rounded-lg border border-white/5 flex flex-col justify-between">
                      <span className="font-semibold text-slate-300">AUSTRALIA (AEST)</span>
                      <span className="text-slate-500 mt-1 text-[11px] font-mono">12:54 AM</span>
                      {campaignForm.quietHoursAutoDelay ? (
                        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded mt-1.5 block">
                          DELAYED ⏳ (+8h)
                        </span>
                      ) : (
                        <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded mt-1.5 block">
                          RISK 🔴 Sleeping
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-end gap-3">
                  <button
                    id="trigger-broadcast-btn"
                    onClick={() => handleButtonClickEffect("btn-broadcast-push", triggerPushDelivery)}
                    className={`font-semibold text-sm py-3 px-6 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
                      lastClickedButtonId === "btn-broadcast-push"
                        ? "bg-amber-500 hover:bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-extrabold shadow-lg shadow-amber-500/30"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    Broadcast Push Campaign
                  </button>
                </div>
              </motion.div>
            )}

            {/* TAB PANEL 4: ADVANCED SUBSCRIBERS SEGMENT MANAGER & GHOST INVALIDATOR */}
            {activeTab === "segments" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Audit & Clean Section (Missing elsewhere) */}
                <div className="bg-[#161920] p-6 rounded-2xl border border-white/5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-1.5 max-w-lg">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2 italic tracking-wide">
                      <ShieldCheck className="w-5 h-5 text-indigo-400" />
                      Audience Health & Inactive Ghost Token Janitor
                    </h3>
                    <p className="text-xs text-slate-400">
                      Devices that uninstall or mute pushes remain inside normal databases, causing inaccurate telemetry reporting. Run an audit cohort check below to prune stale subscriber tokens instantly.
                    </p>
                  </div>

                  <button
                    id="segment-audit-btn"
                    onClick={executePruningAudit}
                    disabled={isAuditingSegs}
                    className="shrink-0 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-3 px-5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isAuditingSegs ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Running Segment Scan...
                      </>
                    ) : (
                      <>
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        Prune Ghost Subscribers
                      </>
                    )}
                  </button>
                </div>

                {isAuditingDone && (
                  <motion.div 
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 flex items-center gap-3 text-xs"
                  >
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <div>
                      <span className="font-bold">Database Pruning Complete!</span> Scan invalidated successfully. Pruned dead ghost tokens and brought active deliverability back to 100%!
                    </div>
                  </motion.div>
                )}

                {/* Subscribers table representation */}
                <div className="bg-[#161920] rounded-2xl border border-white/5 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-white/5">
                    <h3 className="font-semibold text-sm text-white italic tracking-wide">Registered Devices & Targets</h3>
                    <p className="text-xs text-slate-400">View real-time subscriber endpoints, geolocations, and activity indicators</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#0D0F14]/70 border-b border-white/5 text-slate-400 font-semibold">
                          <th className="p-4">Subscriber ID</th>
                          <th className="p-4">OS & Browser</th>
                          <th className="p-4">Timezone / Location</th>
                          <th className="p-4">Subscribed At</th>
                          <th className="p-4">Subscriber Tag</th>
                          <th className="p-4 text-center">Audits</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {subscribers.map((sub) => (
                          <tr key={sub.id} className="hover:bg-white/5 transition-all font-medium text-slate-300">
                            <td className="p-4">
                              <div className="space-y-0.5">
                                <span className="font-mono text-white font-bold block">{sub.id}</span>
                                <span className="text-[10px] text-slate-500 font-mono truncate max-w-[120px] block">{sub.endpoint}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="flex items-center gap-1 text-slate-200">
                                {sub.os === "iOS" || sub.os === "Android" ? (
                                  <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                                ) : (
                                  <Laptop className="w-3.5 h-3.5 text-indigo-400" />
                                )}
                                {sub.os} · {sub.browser}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400">
                              <span>{sub.country} ({sub.timezone})</span>
                            </td>
                            <td className="p-4 text-slate-500 font-mono text-[11px]">
                              {new Date(sub.subscribedAt).toLocaleDateString()}
                            </td>
                            <td className="p-4">
                              <div className="flex flex-wrap gap-1">
                                {sub.tags.map(t => (
                                  <span key={t} className="bg-white/5 text-slate-300 text-[9px] px-1.5 py-0.5 rounded border border-white/10 uppercase font-mono">
                                    {t}
                                  </span>
                                ))}
                                {sub.tags.length === 0 && <span className="text-slate-500 text-[10px]">None</span>}
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                                  sub.status === "active" 
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                    : sub.status === "ghost"
                                    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                    : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                                }`}>
                                  {sub.status}
                                </span>
                                
                                {sub.status !== "ghost" && (
                                  <button
                                    onClick={() => toggleSubscriberMuted(sub.id)}
                                    className="p-1 hover:bg-white/5 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                                    title="Toggle Mute Subscriber"
                                  >
                                    {sub.status === "muted" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB PANEL 5: SDK & PROGRAMMATIC API INTEGRATION */}
            {activeTab === "integrations" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#161920] p-6 md:p-8 rounded-2xl border border-white/5 shadow-sm space-y-6"
              >
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Code className="w-5 h-5 text-indigo-400" />
                    Developer Integration Library & SDK
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Copy and paste our lightweight, battery-efficient payloads directly into your codebases.</p>
                </div>

                {/* Generate mock programmatic API keys */}
                <div className="bg-[#0D0F14] p-5 rounded-xl border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1.5 italic">
                        <Key className="w-3.5 h-3.5 text-indigo-400" />
                        Programmatic Live API Bearer Token
                      </h4>
                      <p className="text-[10px] text-slate-400">Authorization key to hit the live system endpoints externally</p>
                    </div>

                    <button
                      onClick={() => setApiKey(`sdk_live_push_${Math.random().toString(36).substring(4, 16).toLowerCase()}`)}
                      className="text-[11px] font-bold text-indigo-400 flex items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Roll Credentials
                    </button>
                  </div>

                  <div className="bg-[#161920] flex items-center justify-between gap-3 border border-white/5 rounded-lg p-3">
                    <span className="font-mono text-xs select-all text-slate-300 truncate max-w-[280px]">
                      {apiKey}
                    </span>
                    <button
                      onClick={() => copyToClipboard(apiKey, "api")}
                      className="bg-white/5 hover:bg-white/10 text-slate-200 text-xs px-3 py-1.5 rounded-md font-semibold shrink-0 transition-all flex items-center gap-1.5 border border-white/10 cursor-pointer"
                    >
                      {copiedKey ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Key Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Code
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Visual language switcher and syntax container */}
                <div className="space-y-3">
                  <div className="flex border-b border-white/5 overflow-x-auto gap-4 scrollbar-none">
                    <button
                      onClick={() => setActiveLangTab("js")}
                      className={`pb-2 text-xs font-semibold focus:outline-none transition-colors border-b-2 ${
                        activeLangTab === "js" ? "border-indigo-400 text-white" : "border-transparent text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      🌐 Vanilla JavaScript
                    </button>
                    <button
                      onClick={() => setActiveLangTab("react")}
                      className={`pb-2 text-xs font-semibold focus:outline-none transition-colors border-b-2 ${
                        activeLangTab === "react" ? "border-indigo-400 text-white" : "border-transparent text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      ⚛️ React Component
                    </button>
                    <button
                      onClick={() => setActiveLangTab("laravel")}
                      className={`pb-2 text-xs font-semibold focus:outline-none transition-colors border-b-2 ${
                        activeLangTab === "laravel" ? "border-indigo-400 text-white" : "border-transparent text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      🐘 PHP Laravel
                    </button>
                    <button
                      onClick={() => setActiveLangTab("curl")}
                      className={`pb-2 text-xs font-semibold focus:outline-none transition-colors border-b-2 ${
                        activeLangTab === "curl" ? "border-indigo-400 text-white" : "border-transparent text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      🐚 cURL Command
                    </button>
                  </div>

                  <div className="relative">
                    <pre className="bg-[#0D0F14] text-slate-200 p-5 rounded-xl text-left overflow-x-auto font-mono text-xs leading-relaxed max-h-[340px] border border-white/5">
                      <code>{getIntegrationCode()}</code>
                    </pre>

                    <button
                      onClick={() => copyToClipboard(getIntegrationCode(), activeLangTab)}
                      className="absolute top-4 right-4 bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-white/20 text-xs px-3 py-1.5 rounded-md transition-all flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      {copiedCodeTab === activeLangTab ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Copy Code
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-[#0D0F14] rounded-xl border border-white/5 flex items-start gap-3">
                  <Terminal className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-1">
                      Programmatic Webhook Trigger Endpoints
                    </h5>
                    <p className="text-xs text-slate-400 mt-1">
                      Post your notification request payloads programmatically to <code className="bg-white/5 px-1.5 py-0.5 border rounded border-white/10 font-mono text-[10px] text-white">POST /api/notify/send</code>. Authenticate with standard Header <code className="bg-white/5 px-1.5 py-0.5 border rounded border-white/10 font-mono text-[10px] text-white">Authorization: Bearer sdk_live_...</code>. Try hitting this route directly inside terminal!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "customer-admin" && (
              <CustomerAdminPanel
                isDarkMode={isDarkMode}
                connectedSites={connectedSites}
                setConnectedSites={setConnectedSites}
                campaignForm={campaignForm}
                setCampaignForm={setCampaignForm}
                setActiveTab={setActiveTab}
                lastClickedButtonId={lastClickedButtonId}
                handleButtonClickEffect={handleButtonClickEffect}
                targetAppUrl={targetAppUrl}
                setTargetAppUrl={setTargetAppUrl}
              />
            )}

            {activeTab === "super-admin" && (
              <SuperAdminPanel
                isDarkMode={isDarkMode}
                connectedSites={connectedSites}
                setConnectedSites={setConnectedSites}
                reviews={reviews}
                setReviews={setReviews}
                campaignForm={campaignForm}
                setCampaignForm={setCampaignForm}
                setActiveTab={setActiveTab}
                plans={plans}
                setPlans={setPlans}
                lifetimePlans={lifetimePlans}
                setLifetimePlans={setLifetimePlans}
                lastClickedButtonId={lastClickedButtonId}
                handleButtonClickEffect={handleButtonClickEffect}
                targetAppUrl={targetAppUrl}
                setTargetAppUrl={setTargetAppUrl}
                razorpayKeyId={razorpayKeyId}
                setRazorpayKeyId={setRazorpayKeyId}
                razorpaySecret={razorpaySecret}
                setRazorpaySecret={setRazorpaySecret}
                razorpayIsLive={razorpayIsLive}
                setRazorpayIsLive={setRazorpayIsLive}
              />
            )}

            {activeTab === "pricing" && (
              <div className="space-y-8">
                <SaaSCheckout
                  isDarkMode={isDarkMode}
                  plans={plans}
                  lifetimePlans={lifetimePlans}
                  lastClickedButtonId={lastClickedButtonId}
                  handleButtonClickEffect={handleButtonClickEffect}
                  currentSubscriptionTier={currentSubscriptionTier}
                  setCurrentSubscriptionTier={setCurrentSubscriptionTier}
                  playPhysicalNotificationChime={playPhysicalNotificationChime}
                />
                <StarRatingsForm
                  isDarkMode={isDarkMode}
                  reviews={reviews}
                  setReviews={setReviews}
                  lastClickedButtonId={lastClickedButtonId}
                  handleButtonClickEffect={handleButtonClickEffect}
                />
              </div>
            )}

            {activeTab === "terms" && (
              <TermsConditionsPage isDarkMode={isDarkMode} language={language} />
            )}

            {activeTab === "portal" && (
              <ClientPortalLogin isDarkMode={isDarkMode} language={language} />
            )}

            {activeTab === "guide" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Header Section */}
                <div className="text-center max-w-xl mx-auto space-y-2 pb-4">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                    📖 Complete Customer Journey Map
                  </span>
                  <h2 className={`text-xl md:text-2xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    How To Use PushMasterr.com Notifications
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Follow this simple step-by-step visual training map to connect your sites, configure payment triggers, protect link safety, and broadcast campaigns instantly.
                  </p>
                </div>

                {/* Steps Accordion / Carousel Visual Layout */}
                <div className="space-y-6">
                  {/* Step 1 Card */}
                  <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-[#161920] border-white/5" : "bg-white border-slate-200/60 shadow-md"} transition-all`}>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-1 space-y-3">
                        <span className="text-3xl">🔌</span>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold">Step 01 - One-Click Integrations</span>
                          <h3 className={`text-base font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Connect Apps, WordPress or Social Media</h3>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Navigate to the <strong className="text-indigo-650">🔌 Connection Admin</strong> page. Simply select one of our prepackaged 1-click templates for <strong className="text-slate-700">WordPress, YouTube, Shopify, iOS, or Android</strong>. PushMasterr instantly generates target configurations and injects high-speed delivery nodes directly.
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="bg-slate-100 text-[9px] uppercase font-bold py-1 px-2.5 rounded text-slate-500">WordPress Ready</span>
                          <span className="bg-slate-100 text-[9px] uppercase font-bold py-1 px-2.5 rounded text-slate-500">YouTube Ready</span>
                          <span className="bg-slate-100 text-[9px] uppercase font-bold py-1 px-2.5 rounded text-slate-550">Shopify Ready</span>
                        </div>
                      </div>
                      
                      {/* Visual Mock Illustration */}
                      <div className="w-full md:w-64 bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-2 font-mono text-[9px]">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-teal-400 font-bold">⚡ PUSH TEMPLATE GATE</span>
                          <span className="text-[8px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-bold">1-CLICK</span>
                        </div>
                        <div className="space-y-1 bg-[#161920]/60 p-2.5 rounded-lg border border-white/5">
                          <div className="flex justify-between items-center text-white font-bold">
                            <span>WordPress Connected</span>
                            <span className="text-emerald-450 font-bold">● Active</span>
                          </div>
                          <span className="text-slate-500 text-[8px] block">Target Domain: my-wordpress.org</span>
                        </div>
                        <div className="p-2 py-1 flex justify-center gap-1">
                          <span className="text-[14px]">📝</span>
                          <span className="text-slate-400 font-sans font-bold flex items-center">Auto-Configured API Hooks Injected</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 Card */}
                  <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-[#161920] border-white/5" : "bg-white border-slate-200/60 shadow-md"} transition-all`}>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      {/* Visual Mock Illustration left */}
                      <div className="w-full md:w-64 bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-2.5 font-mono text-[9px] order-2 md:order-1">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-amber-400 font-bold">🛡️ anti-spam safety module</span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-400 px-1 rounded">DEEP EXT</span>
                        </div>
                        <div className="bg-[#161920]/60 p-2.5 rounded-lg border border-white/5 text-slate-300">
                          <div className="flex items-center gap-1.5 text-emerald-455 font-bold">
                            <span>✓ SECURE PROTOCOLS VERIFIED</span>
                          </div>
                          <p className="text-[8px] text-slate-500 mt-1">Deep Link redirect scanned: No spam payload detected on target destination host.</p>
                        </div>
                        <div className="text-center font-sans">
                          <span className="text-[10px] text-emerald-450 font-bold">Passed Google Safebrowsing Standards ✓</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-3 order-1 md:order-2">
                        <span className="text-3xl">🛡️</span>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">Step 02 - Safety & Protection</span>
                          <h3 className={`text-base font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Link Protection & Anti-Spam Crawler</h3>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          To protect client deliverability rates and guarantee trust, our integrated <strong className="text-amber-600">Anti-Spam Target Scanner</strong> parses all Deep Links automatically before launch. It inspects redirects, blocks toxic keywords, rejects raw dynamic domains, and prevents harmful redirects so target notification channels never get blacklisted by devices.
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          <span className="bg-emerald-500/10 text-[9px] uppercase font-bold py-1 px-2.5 rounded text-emerald-600">Safebrowsing Cleared</span>
                          <span className="bg-amber-500/10 text-[9px] uppercase font-bold py-1 px-2.5 rounded text-amber-600">Phishing Protection API</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 Card */}
                  <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-[#161920] border-white/5" : "bg-white border-slate-200/60 shadow-md"} transition-all`}>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="flex-1 space-y-3">
                        <span className="text-3xl">💳</span>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Step 03 - Quick Plan Activating</span>
                          <h3 className={`text-base font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Add to Cart & Instant UPI Checkout</h3>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Select your desired notification plan in the <strong className="text-indigo-600">⚡ SaaS Checkout</strong> tab. Review dynamic price quotes matching both INR and USD exchange parameters, insert customized promotional coupon keys, and pay in one click through the Razorpay Payment screen. Your quota increments instantly!
                        </p>
                        <div className="flex gap-2">
                          <span className="bg-blue-500/10 text-[9px] uppercase font-bold py-1 px-2 rounded text-blue-600">Instant Activation</span>
                          <span className="bg-emerald-500/10 text-[9px] uppercase font-bold py-1 px-2 rounded text-emerald-600">Razorpay Tokenized</span>
                        </div>
                      </div>

                      {/* Visual Mock Illustration right */}
                      <div className="w-full md:w-64 bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-2.5 font-mono text-[9px]">
                        <div className="flex justify-between items-center text-teal-400 font-bold border-b border-white/5 pb-2">
                          <span>💰 ORDER INVOICE INSTANT</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-slate-350">
                            <span>SaaS Upgrade Request</span>
                            <span className="font-bold text-white">PRO PREMIUM</span>
                          </div>
                          <div className="flex justify-between text-emerald-400 font-bold">
                            <span>Authorized Token Pay</span>
                            <span>₹4,999.00</span>
                          </div>
                        </div>
                        <span className="block text-[8px] bg-emerald-500/15 text-emerald-450 p-1.5 rounded text-center font-bold">✔ PLAN INJECTED SECURELY IN <span className="underline">0.2s</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 Card */}
                  <div className={`p-6 rounded-3xl border ${isDarkMode ? "bg-[#161920] border-white/5" : "bg-white border-slate-200/60 shadow-md"} transition-all`}>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      {/* Visual Mock Illustration left */}
                      <div className="w-full md:w-64 bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-2 font-mono text-[9px] order-2 md:order-1">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-indigo-400 font-bold">🚀 CAMPAIGN BROADCASTER</span>
                        </div>
                        <div className="space-y-1.5 text-slate-500">
                          <span className="text-[8px] block uppercase text-slate-400">Dispatch Status Queue:</span>
                          <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                            <div className="bg-indigo-505 h-full w-[85%] animate-pulse" />
                          </div>
                          <div className="flex justify-between text-[7.5px] font-mono text-slate-400 font-semibold">
                            <span>Dispatched: 4,250 / 5,000</span>
                            <span className="text-emerald-450">85% Sent ✓</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 space-y-3 order-1 md:order-2">
                        <span className="text-3xl">🚀</span>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-purple-500 font-bold">Step 04 - Launching Campaigns</span>
                          <h3 className={`text-base font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Send Live Push Alerts instantly</h3>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Enter your notification headline, text content, and target destination link. Press the <strong className="text-indigo-650">Dispatch Push Launch</strong> button located under the Campaigns dashboard! Live subscribers worldwide receive instantaneous system prompts on both native desktop and mobile screens within seconds.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </div>

          {/* RIGHT: Live Handheld Handset / Desktop Device Simulator (3 Columns) */}
          <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-indigo-600" />
                    Interactive Simulator
                  </h3>
                  <p className="text-[10px] text-slate-455">Test client notifications in real time</p>
                </div>
                
                <span className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded font-mono uppercase tracking-widest border border-white/10">
                  OS Bridge
                </span>
              </div>

              {/* OS Select Buttons representing Chrome/Safari/Banners */}
              <div className="grid grid-cols-4 gap-1.5 bg-[#0D0F14] p-1 rounded-lg border border-white/5">
                <button
                  onClick={() => setSelectedOS("android")}
                  className={`py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    selectedOS === "android" ? "bg-[#161920] text-indigo-400 border border-white/10 shadow" : "text-slate-400 hover:text-white"
                  }`}
                  title="Android Mobile Device Style"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Android
                </button>
                <button
                  onClick={() => setSelectedOS("ios")}
                  className={`py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    selectedOS === "ios" ? "bg-[#161920] text-indigo-400 border border-white/10 shadow" : "text-slate-400 hover:text-white"
                  }`}
                  title="iOS Apple iPhone Device Style"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  iPhone
                </button>
                <button
                  onClick={() => setSelectedOS("macos")}
                  className={`py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    selectedOS === "macos" ? "bg-[#161920] text-indigo-400 border border-white/10 shadow" : "text-slate-400 hover:text-white"
                  }`}
                  title="macOS Browser Banner notification popup"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  Safari
                </button>
                <button
                  onClick={() => setSelectedOS("windows")}
                  className={`py-1.5 rounded-md text-[10px] font-bold uppercase transition-all flex flex-col items-center gap-1 cursor-pointer ${
                    selectedOS === "windows" ? "bg-[#161920] text-indigo-400 border border-white/10 shadow" : "text-slate-400 hover:text-white"
                  }`}
                  title="Windows 11 toast popup notification style"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  Windows
                </button>
              </div>

              {/* High Fidelity CSS Frame Platform Renderers */}
              <div className="bg-[#0D0F14] p-4 rounded-xl flex items-center justify-center border border-white/5 min-h-[380px] relative overflow-hidden">
                
                {/* 1. iOS lockscreen view */}
                {selectedOS === "ios" && (
                  <div className="w-[230px] h-[370px] bg-indigo-950 text-white border-4 border-slate-950 rounded-[35px] shadow-2xl relative overflow-hidden flex flex-col justify-between p-3 select-none">
                    {/* Top camera Island notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-950 w-20 h-5 rounded-full z-10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-slate-800/80 mr-1.5" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                    </div>

                    {/* Lock details */}
                    <div className="text-center pt-8 space-y-0.5">
                      <p className="text-[9px] uppercase tracking-widest text-indigo-200/90 font-bold">Tuesday, May 26</p>
                      <h3 className="text-3xl font-light font-sans tracking-tighter">04:12</h3>
                    </div>

                    {/* Floating Web Push notification drawer on lockscreen */}
                    <div className="space-y-2 pb-6 z-10">
                      <AnimatePresence>
                        {notificationEvent ? (
                          <motion.div
                            initial={{ y: 80, scale: 0.9, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1, x: [0, -4, 4, -2, 2, 0] }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-950/85 backdrop-blur-md rounded-2xl p-3 border border-indigo-500/10 shadow-lg text-slate-100 flex flex-col cursor-pointer"
                          >
                            <div className="flex justify-between items-center text-[10px] text-indigo-300 font-semibold mb-1">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                PUSHFLOW SaaS
                              </span>
                              <span>now</span>
                            </div>
                            <h4 className="font-semibold text-[11px] leading-tight text-white">{notificationEvent.title}</h4>
                            <p className="text-[10px] text-slate-300/95 leading-snug mt-0.5 line-clamp-2">{notificationEvent.body}</p>
                            
                            {notificationEvent.image && (
                              <img src={notificationEvent.image} alt="Rich Banner" className="w-full h-16 rounded-lg object-cover mt-2 border border-white/10" referrerPolicy="no-referrer" />
                            )}

                            {/* Options action buttons */}
                            {notificationEvent.actionButtons.length > 0 && (
                              <div className="grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-white/10 text-center">
                                <button
                                  onClick={() => handleNotificationClick(true)}
                                  className="text-[9px] font-bold bg-indigo-600/60 hover:bg-indigo-600 p-1 rounded-md transition-all text-white cursor-pointer"
                                >
                                  {notificationEvent.actionButtons[0]}
                                </button>
                                <button
                                  onClick={() => handleNotificationClick(false)}
                                  className="text-[9px] font-semibold bg-white/5 hover:bg-white/10 p-1 rounded-md transition-all text-slate-300 cursor-pointer"
                                >
                                  {notificationEvent.actionButtons[1]}
                                </button>
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          <div className="text-center bg-white/5 backdrop-blur-sm px-3 py-4 rounded-xl text-[10px] text-indigo-200">
                            No notifications on Lockscreen. Broadcast or trigger one to witness live arrival.
                          </div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom Home Indicator */}
                    <div className="absolute bottom-1 bg-white/60 w-16 h-1 rounded-full left-1/2 -translate-x-1/2" />
                  </div>
                )}

                {/* 2. Android Device view */}
                {selectedOS === "android" && (
                  <div className="w-[230px] h-[370px] bg-[#0c0d11] text-white border-4 border-slate-900 rounded-[35px] shadow-2xl relative overflow-hidden flex flex-col justify-between p-3 select-none">
                    {/* Top status bar details */}
                    <div className="flex justify-between items-center px-1 py-0.5 text-[8px] text-zinc-500 font-mono">
                      <span>16:54</span>
                      <div className="flex items-center gap-1">
                        <span>5G</span>
                        <div className="w-4 h-2 border border-zinc-600 rounded-sm relative flex items-center pr-px">
                          <div className="h-full bg-zinc-500 w-3" />
                        </div>
                      </div>
                    </div>

                    {/* Screen Core Mock content */}
                    <div className="flex-1 flex flex-col justify-center items-center text-center p-2">
                      <div className="flex items-center gap-2 mb-2 justify-center">
                        <div className="w-7 h-7 rounded-lg bg-[#161920] border border-white/10 flex items-center justify-center text-indigo-400">
                          <Smartphone className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-zinc-500 text-[10px]">➔</span>
                        <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 animate-bounce">
                          <Bell className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h4 className="text-[11px] font-bold text-zinc-300">Google Pixel</h4>
                      <p className="text-[9px] text-zinc-500 mt-1">Simulator Sandbox mode</p>
                    </div>

                    {/* Material theme push pullout */}
                    <div className="space-y-2 pb-6 z-10">
                      <AnimatePresence>
                        {notificationEvent ? (
                          <motion.div
                            initial={{ y: -60, scale: 0.95, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1, x: [0, -3, 3, -1, 1, 0] }}
                            className="bg-[#161920]/90 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-xl"
                          >
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="bg-indigo-600 text-white p-0.5 rounded text-[8px] font-bold">PF</div>
                              <span className="text-[9px] font-bold text-zinc-300 mr-auto">PushFlow Suite</span>
                              <span className="text-[8px] text-zinc-400">now</span>
                            </div>
                            
                            <h4 className="font-bold text-[11px] text-white leading-tight">{notificationEvent.title}</h4>
                            <p className="text-[9px] text-zinc-400 leading-snug mt-1">{notificationEvent.body}</p>

                            {notificationEvent.image && (
                              <img src={notificationEvent.image} alt="Banner" className="w-full h-16 rounded-lg object-cover mt-2" referrerPolicy="no-referrer" />
                            )}

                            {/* Buttons actions styles */}
                            {notificationEvent.actionButtons.length > 0 && (
                              <div className="flex gap-2 justify-end mt-2 pt-2 border-t border-white/5">
                                <button
                                  onClick={() => handleNotificationClick(true)}
                                  className="text-[9px] font-extrabold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                                >
                                  {notificationEvent.actionButtons[0]}
                                </button>
                                <button
                                  onClick={() => handleNotificationClick(false)}
                                  className="text-[9px] font-semibold text-zinc-400 hover:text-zinc-200 cursor-pointer"
                                >
                                  {notificationEvent.actionButtons[1]}
                                </button>
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          <div className="text-center bg-white/5 p-3 rounded-lg text-[9px] text-zinc-500 border border-white/5">
                            Android handset safe. No notification events pushed.
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* 3. macOS Safari Desktop view */}
                {selectedOS === "macos" && (
                  <div className="w-[230px] h-[340px] bg-[#1c1c1e] text-slate-100 border-2 border-white/10 rounded-xl relative overflow-hidden flex flex-col justify-between p-2 select-none">
                    {/* Fake mac header with options buttons */}
                    <div className="flex items-center gap-1.5 border-b border-white/5 pb-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-[9px] text-slate-500 ml-auto font-mono">Safari Web Env</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center text-center p-2">
                      <Laptop className="w-8 h-8 text-indigo-400 mb-1" />
                      <span className="text-[10px] text-slate-400">macOS Desktop Platform</span>
                    </div>

                    {/* Floating Web Slide Toast alert (Sonoma layout) */}
                    <div className="space-y-2 z-10 max-h-[160px] pb-2">
                      <AnimatePresence>
                        {notificationEvent ? (
                          <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-[#1c1c1e]/90 backdrop-blur-md rounded-xl p-3 shadow-lg border border-white/10 text-white flex flex-col"
                          >
                            <div className="flex items-center gap-2 text-[8px] text-slate-400 mb-1 font-mono">
                              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 animate-pulse" />
                              <span>SAFARI PUSH</span>
                              <span className="ml-auto">now</span>
                            </div>
                            
                            <h4 className="font-extrabold text-[10px] text-white">{notificationEvent.title}</h4>
                            <p className="text-[9px] text-slate-300 leading-tight mt-0.5">{notificationEvent.body}</p>

                            {notificationEvent.image && (
                              <img src={notificationEvent.image} alt="Rich Banner" className="w-full h-12 rounded mt-1.5 object-cover" referrerPolicy="no-referrer" />
                            )}

                            {/* CTAs */}
                            {notificationEvent.actionButtons.length > 0 && (
                              <div className="flex items-center justify-end gap-2 mt-2 pt-2 border-t border-white/5">
                                <button
                                  onClick={() => handleNotificationClick(true)}
                                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[8px] px-2 py-0.5 font-bold cursor-pointer"
                                >
                                  {notificationEvent.actionButtons[0]}
                                </button>
                                <button
                                  onClick={() => handleNotificationClick(false)}
                                  className="bg-white/10 hover:bg-white/15 text-slate-200 rounded text-[8px] px-2 py-0.5 cursor-pointer"
                                >
                                  {notificationEvent.actionButtons[1]}
                                </button>
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          <div className="text-center p-2 bg-white/5 rounded text-[9px] text-slate-500 border border-white/5">
                            Desktop notification feed clean.
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* 4. Windows 11 Toast alert panel */}
                {selectedOS === "windows" && (
                  <div className="w-[230px] h-[340px] bg-[#0d1424] text-white border-2 border-white/10 rounded-xl relative overflow-hidden flex flex-col justify-between p-2 select-none">
                    <div className="flex items-center justify-between border-b border-white/5 pb-1.5 text-[8px] text-indigo-300">
                      <span>Windows Shell Terminal</span>
                      <span>16:54 ⚡</span>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center text-center p-2">
                      <p className="text-[10px] text-indigo-400 font-mono">Fluent Design Handset</p>
                    </div>

                    {/* Bottom pop toast (Win11 layout) */}
                    <div className="space-y-2 z-10 pb-2">
                      <AnimatePresence>
                        {notificationEvent ? (
                          <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-[#161920]/95 backdrop-blur-md rounded-lg p-3 border border-indigo-500/10 shadow-xl flex flex-col"
                          >
                            <div className="flex items-center justify-between text-[8px] text-indigo-400 mb-1 tracking-wider">
                              <span>WINDOWS NOTIFIER</span>
                              <span>now</span>
                            </div>
                            
                            <h4 className="font-bold text-[10px] text-white">{notificationEvent.title}</h4>
                            <p className="text-[9px] text-slate-300 leading-snug mt-0.5">{notificationEvent.body}</p>

                            {notificationEvent.image && (
                              <img src={notificationEvent.image} alt="Banner" className="w-full h-12 object-cover rounded mt-1.5 border border-white/5" referrerPolicy="no-referrer" />
                            )}

                            {/* Windows Action buttons */}
                            {notificationEvent.actionButtons.length > 0 && (
                              <div className="flex justify-end gap-1.5 mt-2 pt-2 border-t border-white/5">
                                <button
                                  onClick={() => handleNotificationClick(true)}
                                  className="bg-indigo-650 text-white hover:bg-indigo-600 px-2 py-0.5 rounded text-[8px] font-extrabold cursor-pointer"
                                >
                                  {notificationEvent.actionButtons[0]}
                                </button>
                                <button
                                  onClick={() => handleNotificationClick(false)}
                                  className="bg-white/5 text-slate-300 px-2 py-0.5 rounded text-[8px] font-semibold cursor-pointer"
                                >
                                  {notificationEvent.actionButtons[1]}
                                </button>
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          <div className="text-center p-2 bg-white/5 rounded text-[9px] text-indigo-300/60 border border-white/5">
                            Win11 toast queue is clear.
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

              </div>

              {/* Opt-in controller simulation toggle */}
              <div className="bg-[#0D0F14]/60 p-4 rounded-xl border border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">Subscription State</span>
                  <p className="text-[10px] text-slate-400">Simulate browser opt-in permission prompts</p>
                </div>
                
                {isSubscribedSim ? (
                  <button
                    onClick={() => {
                      setIsSubscribedSim(false);
                      // Remove simulated subscriber target to let user practice subscribing
                      setSubscribers(prev => prev.filter(sub => !sub.id.startsWith("sim-")));
                    }}
                    className="bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                  >
                    Unsubscribe
                  </button>
                ) : (
                  <button
                    onClick={handleSimulatedSubscribe}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-1.5 px-3 rounded-lg flex items-center gap-1 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                  >
                    Subscribe
                  </button>
                )}
              </div>

            </div>

            {/* Quick Helper Cards */}
            <div className="bg-[#161920]/80 text-slate-300 p-5 rounded-2xl border border-white/5 space-y-3.5 shadow-md">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <h4 className="font-bold text-xs uppercase tracking-widest text-indigo-400 italic">Simulator Guide</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clicking <span className="text-white font-semibold">Subscribe</span> above adds an active virtual target to your dashboard. Under <span className="text-white font-semibold">Campaign Creator</span>, hit broadcast to make the notification arrive real-time with sound confirmations on your simulated operating system!
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* Footer detailing project specifications */}
      <footer id="saas-footer" className="bg-[#0D0F14] border-t border-white/5 py-6 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400">© 2026 PushMasterr. All Rights Reserved. Dedicated premium UI designed for ultimate push deliverability and OneSignal migrations.</p>
          <div className="flex items-center gap-4">
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded px-2.5 py-0.5 font-mono text-[10px] uppercase font-bold tracking-widest">
              Gemini Integrated
            </span>
            <span className="text-slate-500 font-mono text-[11px]">UTC: 2026-05-26 14:54</span>
          </div>
        </div>
      </footer>

      {/* FLOATING INTERACTIVE COMPONENT 1: PUSH MASTER LOOM ASSISTANT BUBBLE (BOTTOM LEFT) */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
        {isLoomAssistantOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`w-80 rounded-2xl border p-4 shadow-2xl flex flex-col space-y-3 ${
              isDarkMode ? "bg-[#161920] border-white/10 text-white" : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2 border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
                  👨‍💻
                </div>
                <div>
                  <h5 className="font-bold text-xs">Push Master</h5>
                  <span className="text-[9px] text-emerald-500 font-semibold block uppercase">Founder · Online</span>
                </div>
              </div>
              <button 
                onClick={() => setIsLoomAssistantOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Micro Video Loom Player - Interactive with captioning */}
            <div 
              onClick={() => setIsPlayingLoomVideo(!isPlayingLoomVideo)}
              className="bg-slate-950 rounded-xl overflow-hidden min-h-[144px] relative flex flex-col justify-between p-2.5 cursor-pointer border border-white/10 group select-none shadow-inner"
            >
              {!isPlayingLoomVideo ? (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-4 h-4 fill-slate-950 ml-0.5 text-slate-950" />
                    </div>
                  </div>
                  <div className="z-20 flex justify-between items-start w-full">
                    <span className="bg-amber-550/90 text-[7px] bg-amber-500 text-slate-950 font-mono font-black px-2 py-0.5 rounded-full uppercase tracking-widest active-pulse leading-none shadow">
                      Loom Video
                    </span>
                    <span className="bg-black/50 text-white/90 text-[7.5px] font-mono px-1 rounded">
                      0:40
                    </span>
                  </div>
                  <div className="z-20 text-left pt-6">
                    <p className="text-[10px] font-extrabold text-white leading-tight">
                      🎥 Play Video Tour: &ldquo;PushMasterr Self-Hosted Edge Nodes&rdquo;
                    </p>
                    <p className="text-[8px] text-amber-505 font-bold text-amber-400">
                      Walkthrough by Raj Sahani
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between z-10 h-full">
                  {/* Playing Loom Video Simulation view */}
                  <div className="absolute inset-0 bg-[#070A11] z-0 flex flex-col justify-between p-2.5">
                    
                    {/* Visualizer content representing what Raj is showing */}
                    <div className="flex-1 flex flex-col items-center justify-center p-1 text-center scale-95 origin-center">
                      {loomVideoTime >= 0 && loomVideoTime < 5 && (
                        <div className="animate-pulse space-y-1">
                          <div className="text-xl">👋 💼</div>
                          <span className="text-[7.5px] bg-indigo-500/10 text-indigo-400 px-1.5 py-0.5 rounded font-black border border-indigo-500/20 uppercase tracking-widest block">
                            Raj Sahani Welcome
                          </span>
                        </div>
                      )}
                      {loomVideoTime >= 5 && loomVideoTime < 10 && (
                        <div className="space-y-1 animate-pulse">
                          <div className="text-[9px] font-bold text-rose-400">$30,000/yr saving potential</div>
                          <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500" style={{ width: "85%" }} />
                          </div>
                          <p className="text-[6.5px] text-slate-400">OneSignal Taxes vs $499 Lifetime</p>
                        </div>
                      )}
                      {loomVideoTime >= 10 && loomVideoTime < 18 && (
                        <div className="space-y-1 text-center font-mono">
                          <div className="text-[7.5px] text-emerald-400 font-extrabold">🚀 Dispatching 1.5M Broadcast...</div>
                          <div className="flex justify-center gap-1">
                            <span className="bg-slate-900 border border-emerald-500/20 text-emerald-400 font-bold px-1 rounded text-[6px]">API OK</span>
                            <span className="bg-slate-900 border border-emerald-500/20 text-emerald-400 font-bold px-1 rounded text-[6px]">EDGE NODE</span>
                          </div>
                        </div>
                      )}
                      {loomVideoTime >= 18 && loomVideoTime < 25 && (
                        <div className="space-y-1">
                          <div className="text-[8px] font-black text-indigo-400 tracking-tighter">⚡ Fast Broadcast Engine</div>
                          <div className="text-xs font-black text-emerald-400 font-mono animate-bounce">
                            120,000 / sec
                          </div>
                        </div>
                      )}
                      {loomVideoTime >= 25 && loomVideoTime < 33 && (
                        <div className="space-y-1 font-mono text-left scale-90">
                          <div className="text-[5.5px] text-indigo-300">
                            {"import { PushMasterr } from '@pushmasterr/sdk';"}
                          </div>
                          <div className="text-[5.5px] text-slate-400">
                            {"const client = new PushMasterr({ apiKey });"}
                          </div>
                          <span className="text-[6px] bg-slate-900 text-teal-400 border border-teal-500/25 px-1 rounded block text-center mt-1">
                            Laravel + WordPress plugins
                          </span>
                        </div>
                      )}
                      {loomVideoTime >= 33 && loomVideoTime <= 40 && (
                        <div className="space-y-1 text-center">
                          <div className="text-[9px] font-black text-amber-500">$499 Lifetime Option</div>
                          <div className="text-[6.5px] text-indigo-300 font-semibold animate-pulse">🔒 Unlocks Unlimited Channels</div>
                        </div>
                      )}
                    </div>

                    {/* Subtitle Captions overlay */}
                    <div className="bg-black/85 px-1.5 py-1 rounded border border-white/5 text-center min-h-[36px] flex items-center justify-center z-10">
                      <p className="text-[7px] leading-snug font-bold text-amber-200">
                        {loomVideoTime >= 0 && loomVideoTime < 5 && '"Hey, Raj Sahani here! Welcome to PushMasterr.com. Today I\'ll show you why enterprise brands run self-hosted nodes."'}
                        {loomVideoTime >= 5 && loomVideoTime < 10 && '"We\'re on-boarding a team that paid $2,500/mo to OneSignal. That\'s $30,000 yearly in useless subscriber taxes!"'}
                        {loomVideoTime >= 10 && loomVideoTime < 18 && '"Look at my screen: I\'m activating a dual-node broadcast system. Let\'s send a web push campaign to 1.5M devices now."'}
                        {loomVideoTime >= 18 && loomVideoTime < 25 && '"Boom! Deliveries are firing at 120,000 notifications per second. High deliverability, and full control over your private VAPID nodes."'}
                        {loomVideoTime >= 25 && loomVideoTime < 33 && '"You can fully integrate our system via Laravel, WordPress plugin, Node.js SDK, or standard Curl commands. Check your API keys."'}
                        {loomVideoTime >= 33 && loomVideoTime <= 40 && '"Ditch expensive subscriber taxes forever. Switch to PushMasterr and own your notifications permanently. Join us today!"'}
                      </p>
                    </div>

                    {/* Video Player Timeline Controls overlay */}
                    <div className="mt-1 flex items-center gap-1.5 text-[7px] font-mono text-slate-400 z-10 pt-1 border-t border-white/5">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlayingLoomVideo(false);
                        }}
                        className="hover:text-white p-0.5 rounded hover:bg-white/10"
                      >
                        <Pause className="w-2.5 h-2.5 fill-slate-300" />
                      </button>
                      <span className="text-[6.5px]">0:{loomVideoTime < 10 ? "0" + loomVideoTime : loomVideoTime}</span>
                      <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full" 
                          style={{ width: `${(loomVideoTime / 40) * 100}%` }}
                        />
                      </div>
                      <span className="text-[6.5px]">0:40</span>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Chat Body scrolling */}
            <div className="h-32 overflow-y-auto space-y-2 text-[10px] pr-1 font-sans">
              {loomChatMessages.map((msg, i) => (
                <div key={i} className={`p-2 rounded-xl max-w-[85%] ${
                  msg.sender === "raj" 
                    ? "bg-indigo-550/15 text-indigo-400 border border-indigo-500/10 mr-auto rounded-tl-none text-left" 
                    : "bg-indigo-600 text-white ml-auto rounded-tr-none text-right"
                }`}>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Prompt Helper Chips */}
            <div className="flex flex-col gap-1.5 pt-1.5 border-t border-slate-100 dark:border-white/5">
              <button 
                onClick={() => handleLoomMessageSend("Migrate my OneSignal targets")}
                className="text-[9px] bg-indigo-500/10 hover:bg-indigo-500 hover:text-white dark:text-indigo-400 border border-indigo-500/20 rounded py-1 px-2 text-left transition-colors cursor-pointer"
              >
                💬 Migrate from OneSignal
              </button>
              <button 
                onClick={() => handleLoomMessageSend("What is the cost of startup plan?")}
                className="text-[9px] bg-indigo-500/10 hover:bg-indigo-500 hover:text-white dark:text-indigo-400 border border-indigo-500/20 rounded py-1 px-2 text-left transition-colors cursor-pointer"
              >
                💰 PushMasterr flat licensing cost
              </button>
            </div>

            {/* Send Message Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleLoomMessageSend();
              }}
              className="flex gap-1.5 pt-1"
            >
              <input 
                type="text" 
                value={loomUserMessage}
                onChange={(e) => setLoomUserMessage(e.target.value)}
                placeholder="Ask Raj about custom triggers..."
                className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-2 py-1.5 text-[10px] outline-none text-slate-800 dark:text-white"
              />
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-1.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}

        <button 
          onClick={() => {
            handleButtonClickEffect("loom-assistant-trigger", () => {
              setIsLoomAssistantOpen(!isLoomAssistantOpen);
            });
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl transition-all hover:scale-105 border cursor-pointer ${
            isLoomAssistantOpen 
              ? "bg-slate-900 text-white border-slate-800" 
              : "bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 border-amber-300 font-bold"
          }`}
        >
          <div className="relative">
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="bg-slate-900 rounded-full w-5 h-5 flex items-center justify-center text-xs">👨‍💼</span>
          </div>
          <span className="text-xs">Raj Sahani (Loom Video)</span>
        </button>
      </div>

      {/* FLOATING INTERACTIVE COMPONENT 2: CUSTOM SUPPORT WELCOME WIDGET (BOTTOM RIGHT) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isSupportWidgetOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`w-80 rounded-2xl border p-4 shadow-2xl flex flex-col space-y-3 ${
              isDarkMode ? "bg-[#161920] border-white/10 text-white" : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-2 border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  👩‍🔧
                </div>
                <div>
                  <h5 className="font-bold text-xs text-left">Helpdesk Support</h5>
                  <span className="text-[9px] text-indigo-400 font-semibold block uppercase">Typical reply in 10m</span>
                </div>
              </div>
              <button 
                onClick={() => setIsSupportWidgetOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Chat History */}
            <div className="h-44 overflow-y-auto space-y-2 text-[10px] pr-1 font-sans">
              {supportChatHistory.map((item, id) => {
                const hasStartupCta = item.text.includes("[ACTION_CTA: startup-lifetime]");
                const hasProCta = item.text.includes("[ACTION_CTA: pro-lifetime]");
                const cleanedText = item.text
                  .replace(/\[ACTION_CTA:\s*startup-lifetime\]/gi, "")
                  .replace(/\[ACTION_CTA:\s*pro-lifetime\]/gi, "")
                  .trim();

                return (
                  <div key={id} className={`p-2 rounded-xl max-w-[85%] ${
                    item.sender === "support"
                      ? "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 mr-auto rounded-tl-none text-left"
                      : "bg-indigo-600 text-white ml-auto rounded-tr-none text-right"
                  }`}>
                    <p className="whitespace-pre-wrap">{cleanedText}</p>
                    {(hasStartupCta || hasProCta) && (
                      <div className="mt-2 pt-2 border-t border-slate-200/40 dark:border-white/10 flex flex-col gap-1.5">
                        {hasStartupCta && (
                          <button
                            type="button"
                            onClick={() => {
                              handleButtonClickEffect("btn-cta-startup", () => {
                                setActiveTab("pricing");
                                setTimeout(() => {
                                  const pr = document.getElementById("billing-period-tabs");
                                  if (pr) pr.scrollIntoView({ behavior: "smooth" });
                                }, 100);
                              });
                            }}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded px-1.5 py-1 text-[8px] uppercase tracking-wider text-center cursor-pointer transition-all"
                          >
                            💳 Checkout Startup Lifetime
                          </button>
                        )}
                        {hasProCta && (
                          <button
                            type="button"
                            onClick={() => {
                              handleButtonClickEffect("btn-cta-pro", () => {
                                setActiveTab("pricing");
                                setTimeout(() => {
                                  const pr = document.getElementById("billing-period-tabs");
                                  if (pr) pr.scrollIntoView({ behavior: "smooth" });
                                }, 100);
                              });
                            }}
                            className="bg-amber-600 hover:bg-amber-500 text-white font-bold rounded px-1.5 py-1 text-[8px] uppercase tracking-wider text-center cursor-pointer transition-all"
                          >
                            💎 Checkout Pro Lifetime (Popular)
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              {isSupportChatTyping && (
                <div className="bg-slate-100 dark:bg-white/5 text-slate-400 mr-auto rounded-xl rounded-tl-none p-2 max-w-[65%] text-left italic animate-pulse">
                  Ai Support is typing...
                </div>
              )}
            </div>

            {/* Text Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSupportMessageSend();
              }}
              className="flex gap-1.5 pt-1.5 border-t border-slate-100 dark:border-white/5"
            >
              <input 
                type="text"
                value={supportChatMessageText}
                onChange={(e) => setSupportChatMessageText(e.target.value)}
                placeholder="Ask support about checkout options..."
                className="flex-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg px-2 py-1.5 text-[10px] outline-none text-slate-800 dark:text-white"
              />
              <button 
                type="submit"
                className="bg-indigo-650 hover:bg-indigo-600 text-white p-1.5 rounded-lg flex items-center justify-center transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}

        <button 
          onClick={() => {
            handleButtonClickEffect("support-welcome-trigger", () => {
              setIsSupportWidgetOpen(!isSupportWidgetOpen);
            });
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full shadow-2xl transition-all hover:scale-105 border font-semibold cursor-pointer ${
            isSupportWidgetOpen 
              ? "bg-slate-900 text-white border-slate-800" 
              : "bg-indigo-650 hover:bg-indigo-600 text-white border-indigo-550 shadow-indigo-650/40"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-xs">Live Support Chat</span>
        </button>
      </div>

    </div>
  );
}
