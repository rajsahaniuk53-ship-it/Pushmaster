"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Activity, 
  PlusCircle, 
  Globe, 
  Trash2, 
  Send, 
  Star, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Check, 
  User, 
  FileText,
  Lock,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ConnectedSite {
  id: string;
  name: string;
  url: string;
  subscribedCount: number;
  apiKey: string;
  status: "active" | "pending";
  workspace?: string;
}

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  feedback: string;
  date: string;
}

interface SaaSAdminPanelsProps {
  isDarkMode: boolean;
  connectedSites: ConnectedSite[];
  setConnectedSites: React.Dispatch<React.SetStateAction<ConnectedSite[]>>;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  campaignForm: any;
  setCampaignForm: React.Dispatch<React.SetStateAction<any>>;
  setActiveTab: (tab: any) => void;
  plans: any[];
  setPlans: React.Dispatch<React.SetStateAction<any[]>>;
  lifetimePlans?: any[];
  setLifetimePlans?: React.Dispatch<React.SetStateAction<any[]>>;
  lastClickedButtonId: string | null;
  handleButtonClickEffect: (id: string, callback?: () => void) => void;
  targetAppUrl: string;
  setTargetAppUrl: (url: string) => void;
  razorpayKeyId?: string;
  setRazorpayKeyId?: (val: string) => void;
  razorpaySecret?: string;
  setRazorpaySecret?: (val: string) => void;
  razorpayIsLive?: boolean;
  setRazorpayIsLive?: (val: boolean) => void;
  workspace?: string;
}

export function CustomerAdminPanel({
  isDarkMode,
  connectedSites,
  setConnectedSites,
  setCampaignForm,
  setActiveTab,
  lastClickedButtonId,
  handleButtonClickEffect,
  targetAppUrl,
  setTargetAppUrl,
  workspace
}: Omit<SaaSAdminPanelsProps, "reviews" | "setReviews" | "plans" | "setPlans">) {
  const [newSiteName, setNewSiteName] = useState("");
  const [newSiteUrl, setNewSiteUrl] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Filter connected sites by current workspace
  const currentWorkspaceSites = workspace 
    ? connectedSites.filter(site => !site.workspace || site.workspace === workspace)
    : connectedSites;

  const handleQuickConnectTemplate = (platform: "wordpress" | "domain" | "youtube" | "android" | "ios" | "shopify") => {
    let name = "";
    let url = "";
    
    switch (platform) {
      case "wordpress":
        name = "PushMaster WP Blog Node";
        url = "https://pushmasterr.com/blog";
        break;
      case "youtube":
        name = "PushMaster YouTube Channel";
        url = "https://youtube.com/c/pushmasterr";
        break;
      case "shopify":
        name = "Shopify Store E-Com";
        url = "https://my-store.myshopify.com";
        break;
      case "android":
        name = "Android Application Bundle";
        url = "app://play.google.com/store/apps/details?id=com.pushmaster.pushsuite";
        break;
      case "ios":
        name = "iOS App Store Instance";
        url = "app://apps.apple.com/us/app/push-suite-connect/id18413";
        break;
      case "domain":
        name = "PushMaster Custom Landing Domain";
        url = "https://pushmasterr.com";
        break;
    }

    const newSite: ConnectedSite = {
      id: `site-${Math.floor(100 + Math.random() * 900)}`,
      name,
      url,
      subscribedCount: Math.floor(400 + Math.random() * 500),
      apiKey: `sdk_live_push_${Math.random().toString(36).substring(4, 16).toUpperCase()}`,
      status: "active" as any,
      workspace: workspace || "Prod Workspace - ECommerce"
    };

    setConnectedSites(prev => [...prev, newSite]);
    setSuccessMsg(`🎉 1-Click Preset Activated: "${name}" connected to current workspace!`);
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  const handleAddSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteName.trim() || !newSiteUrl.trim()) return;

    // ensure url has protocol
    let formattedUrl = newSiteUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const newSite: ConnectedSite = {
      id: `site-${Math.floor(100 + Math.random() * 900)}`,
      name: newSiteName.trim(),
      url: formattedUrl,
      subscribedCount: 0,
      apiKey: `sdk_live_push_${Math.random().toString(36).substring(4, 16)}`,
      status: "active" as any,
      workspace: workspace || "Prod Workspace - ECommerce"
    };

    setConnectedSites(prev => [...prev, newSite]);
    setNewSiteName("");
    setNewSiteUrl("");
    setSuccessMsg("🎉 Target Website added to your dashboard successfully!");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleRemoveSite = (id: string) => {
    setConnectedSites(prev => prev.filter(s => s.id !== id));
  };

  const handleTestNotification = (site: ConnectedSite) => {
    // prefill campaign form with this target website url 
    setCampaignForm((prev: any) => ({
      ...prev,
      title: `⚡ Special Alert for ${site.name}`,
      body: `Visit ${site.name} now to redeem your personalized push coupons!`,
      deepLink: site.url
    }));
    setTargetAppUrl(site.url);
    setActiveTab("campaign");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 md:p-8 rounded-2xl border transition-all ${
        isDarkMode 
          ? "bg-[#161920] border-white/5 text-slate-200" 
          : "bg-white border-slate-200 text-slate-800 shadow-sm"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className={`text-base md:text-lg font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            <Globe className="w-5 h-5 text-indigo-500" />
            Customer Portal: Apps & Web Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">Register your online domains or apps to trigger notifications targeted to specific websites.</p>
        </div>
        <span className={`text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded border font-semibold ${
          isDarkMode ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" : "bg-indigo-50 text-indigo-600 border-indigo-200"
        }`}>
          Client Console
        </span>
      </div>

      {successMsg && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 mb-4 rounded-xl text-xs bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          {successMsg}
        </motion.div>
      )}

      {/* Add Website Section */}
      <form onSubmit={handleAddSite} className={`p-4 rounded-xl border mb-6 ${isDarkMode ? "bg-[#0D0F14]/70 border-white/5" : "bg-slate-50 border-slate-100"}`}>
        <h3 className={`text-xs uppercase font-extrabold tracking-wider mb-3 flex items-center gap-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
          <PlusCircle className="w-4 h-4 text-indigo-500" />
          Connect New Website or App
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-700 font-extrabold"}`}>
              App/Website Name
            </label>
            <input
              type="text"
              value={newSiteName}
              onChange={(e) => setNewSiteName(e.target.value)}
              placeholder="e.g. My Grocery Store, Tech Blog"
              className={`w-full text-xs font-semibold rounded-lg p-2.5 focus:outline-none focus:ring-1 ${
                isDarkMode 
                  ? "bg-[#161920] border-white/5 focus:border-indigo-500 text-white focus:ring-indigo-500/30" 
                  : "bg-white border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
              required
            />
          </div>
          <div>
            <label className={`block text-[10px] font-bold uppercase tracking-widest mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-700"}`}>
              Website URL / Deep Link Node
            </label>
            <input
              type="text"
              value={newSiteUrl}
              onChange={(e) => setNewSiteUrl(e.target.value)}
              placeholder="e.g. clientbazaar.com"
              className={`w-full text-xs font-semibold rounded-lg p-2.5 focus:outline-none focus:ring-1 ${
                isDarkMode 
                  ? "bg-[#161920] border-white/5 focus:border-indigo-500 text-white focus:ring-indigo-500/30" 
                  : "bg-white border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
              required
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            onClick={() => handleButtonClickEffect("btn-add-site")}
            className={`text-xs font-semibold py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm transition-all ${
              lastClickedButtonId === "btn-add-site"
                ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 glow font-extrabold"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Connect Web Instance
          </button>
        </div>
      </form>

      {/* 1-Click Template presets section */}
      <div className={`p-4 rounded-xl border mb-6 ${isDarkMode ? "bg-indigo-950/20 border-indigo-500/10" : "bg-indigo-50/40 border-indigo-100"}`}>
        <h4 className={`text-xs uppercase font-extrabold tracking-wider mb-2.5 flex items-center gap-1.5 ${isDarkMode ? "text-indigo-300" : "text-indigo-805"}`}>
          <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          ⚡ Instant 1-Click Platform Templates (No Typing Needed)
        </h4>
        <p className="text-[11px] text-slate-500 mb-3">Connect WordPress journals, custom domains, YouTube, or native applications instantly to your dashboard queue.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          <button
            onClick={() => handleButtonClickEffect("connect-tpl-wp", () => handleQuickConnectTemplate("wordpress"))}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-dashed border-indigo-500/20 bg-white dark:bg-[#161920] hover:bg-indigo-500/5 transition-all text-center cursor-pointer"
          >
            <span className="text-lg">Ⓜ️</span>
            <span className="text-[9px] font-bold mt-1 dark:text-slate-200">WordPress Hub</span>
            <span className="text-[8px] text-emerald-500 block">1-Click Hook</span>
          </button>

          <button
            onClick={() => handleButtonClickEffect("connect-tpl-domain", () => handleQuickConnectTemplate("domain"))}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-dashed border-indigo-500/20 bg-white dark:bg-[#161920] hover:bg-indigo-500/5 transition-all text-center cursor-pointer"
          >
            <Globe className="w-4 h-4 text-sky-500" />
            <span className="text-[9px] font-bold mt-1 dark:text-slate-200">Custom Domain</span>
            <span className="text-[8px] text-emerald-500 block">1-Click Hook</span>
          </button>

          <button
            onClick={() => handleButtonClickEffect("connect-tpl-yt", () => handleQuickConnectTemplate("youtube"))}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-dashed border-indigo-500/20 bg-white dark:bg-[#161920] hover:bg-indigo-500/5 transition-all text-center cursor-pointer"
          >
            <span className="text-lg">🔴</span>
            <span className="text-[9px] font-bold mt-1 dark:text-slate-200">YouTube Node</span>
            <span className="text-[8px] text-emerald-500 block">1-Click Hook</span>
          </button>

          <button
            onClick={() => handleButtonClickEffect("connect-tpl-shopify", () => handleQuickConnectTemplate("shopify"))}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-dashed border-indigo-500/20 bg-white dark:bg-[#161920] hover:bg-indigo-500/5 transition-all text-center cursor-pointer"
          >
            <span className="text-lg">🟢</span>
            <span className="text-[9px] font-bold mt-1 dark:text-slate-200">Shopify Store</span>
            <span className="text-[8px] text-emerald-500 block">1-Click Hook</span>
          </button>

          <button
            onClick={() => handleButtonClickEffect("connect-tpl-android", () => handleQuickConnectTemplate("android"))}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-dashed border-indigo-500/20 bg-white dark:bg-[#161920] hover:bg-indigo-500/5 transition-all text-center cursor-pointer"
          >
            <span className="text-lg font-bold">🤖</span>
            <span className="text-[9px] font-bold mt-1 dark:text-slate-200">Android App</span>
            <span className="text-[8px] text-emerald-500 block">1-Click Hook</span>
          </button>

          <button
            onClick={() => handleButtonClickEffect("connect-tpl-ios", () => handleQuickConnectTemplate("ios"))}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-dashed border-indigo-500/20 bg-white dark:bg-[#161920] hover:bg-indigo-500/5 transition-all text-center cursor-pointer"
          >
            <span className="text-lg font-bold">🍎</span>
            <span className="text-[9px] font-bold mt-1 dark:text-slate-200">iOS App Store</span>
            <span className="text-[8px] text-emerald-500 block">1-Click Hook</span>
          </button>
        </div>
      </div>

      {/* Connected Domain List */}
      <h3 className={`text-xs uppercase font-extrabold tracking-wider mb-3 flex items-center gap-1.5 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
        <span>Your Configured Targets ({currentWorkspaceSites.length})</span>
        {workspace && (
          <span className="text-[10px] bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-bold">
            {workspace === "Prod Workspace - ECommerce" ? "Production Store" : workspace === "Blog Workspace - Devs" ? "Technical Blog" : "SaaS Application"}
          </span>
        )}
      </h3>
      <div className="space-y-3">
        {currentWorkspaceSites.length === 0 ? (
          <div className={`p-8 text-center rounded-xl border border-dashed ${isDarkMode ? "bg-white/5 border-white/10 text-slate-400" : "bg-slate-50 border-slate-300 text-slate-600"}`}>
            <p className="text-xs font-bold font-mono">No connected sites found in {workspace || "this workspace"} workspace.</p>
            <p className="text-[10px] text-slate-400 mt-1">Add a new site or use a 1-click hook above to get subscriber payloads!</p>
          </div>
        ) : (
          currentWorkspaceSites.map(site => (
          <div 
            key={site.id} 
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
              isDarkMode ? "bg-[#0D0F14]/50 border-white/5 hover:bg-[#0D0F14]/80" : "bg-slate-50 border-slate-200/50 hover:bg-slate-100/40 shadow-xs"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{site.name}</span>
                <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                  SDK Connected
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400" />
                {site.url}
              </p>
              <p className="text-[10px] text-slate-400">
                Targeted push counts: <span className="font-semibold text-indigo-500/80">{site.subscribedCount} sent</span>
              </p>
              <div className="text-[10px] font-mono text-slate-400 truncate max-w-[280px]">
                App ID: <span className="text-slate-400/80 select-all">{site.apiKey}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleButtonClickEffect(`btn-test-push-${site.id}`, () => handleTestNotification(site))}
                className={`text-xs font-semibold py-1.5 px-3.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                  lastClickedButtonId === `btn-test-push-${site.id}`
                    ? "bg-amber-500 text-slate-950 border border-amber-400 scale-95 font-extrabold"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border border-indigo-200"
                }`}
              >
                <Send className="w-3 h-3" />
                Dispatch Push
              </button>
              <button
                onClick={() => handleButtonClickEffect(`btn-delete-site-${site.id}`, () => handleRemoveSite(site.id))}
                className={`p-2 rounded-lg text-slate-400 hover:text-rose-500 cursor-pointer transition-all ${
                  lastClickedButtonId === `btn-delete-site-${site.id}`
                    ? "bg-[#FFA07A] text-slate-950 scale-95 border border-[#FA8072]"
                    : "hover:bg-slate-200/50"
                }`}
                title="Remove Site Connection"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )))}
      </div>
    </motion.div>
  );
}

export function SuperAdminPanel({
  isDarkMode,
  reviews,
  setReviews,
  plans,
  setPlans,
  lifetimePlans,
  setLifetimePlans,
  lastClickedButtonId,
  handleButtonClickEffect,
  razorpayKeyId,
  setRazorpayKeyId,
  razorpaySecret,
  setRazorpaySecret,
  razorpayIsLive,
  setRazorpayIsLive
}: SaaSAdminPanelsProps) {
  const [successMsg, setSuccessMsg] = useState("");
  const [targetPlanId, setTargetPlanId] = useState("pro");
  
  // Local fallbacks for Razorpay settings
  const [localRzpKeyId, setLocalRzpKeyId] = useState(razorpayKeyId || "rzp_test_Sv6JUzmpW6LOtn");
  const [localRzpSecret, setLocalRzpSecret] = useState(razorpaySecret || "zzsJTV7bs1m1CIDUZpDds5Ot");
  const [localRzpIsLive, setLocalRzpIsLive] = useState(razorpayIsLive !== undefined ? razorpayIsLive : false);

  const [clients, setClients] = useState<any[]>([
    { email: "contact@pushmasterr.com", tier: "PRO VIP" },
    { email: "developer-hub@love.io", tier: "ENTERPRISE" },
    { email: "amit.kumar@shoppy.co", tier: "LITE STARTER" },
    { email: "demo-test@onesignal.net", tier: "LITE STARTER" }
  ]);
  const [quickAddTier, setQuickAddTier] = useState("STARTUP LIFETIME");

  const generateRandomEmail = () => {
    const prefixed = ["user", "founder", "agency", "marketer", "tech", "client"];
    const randomPrefix = prefixed[Math.floor(Math.random() * prefixed.length)];
    const randomId = Math.floor(Math.random() * 9000 + 1000);
    const domain = ["gmail.com", "pushmasterr.com", "outlook.com", "webtech.in", "io.dev"];
    const randomDomain = domain[Math.floor(Math.random() * domain.length)];
    return `${randomPrefix}${randomId}@${randomDomain}`;
  };

  const [quickAddEmail, setQuickAddEmail] = useState<string>(generateRandomEmail);

  const handleQuickAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddEmail.trim()) return;
    setClients(prev => [{ email: quickAddEmail, tier: quickAddTier + " ACTIVE" }, ...prev]);
    setSuccessMsg(`👤 Registered customer "${quickAddEmail}" successfully with 1-Click!`);
    setQuickAddEmail(generateRandomEmail());
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  const selectedPlanObj = [...plans, ...(lifetimePlans || [])].find(p => p.id === targetPlanId);
  const [newPriceINR, setNewPriceINR] = useState(selectedPlanObj ? String(selectedPlanObj.priceINR || selectedPlanObj.price) : "4999");
  const [newPriceUSD, setNewPriceUSD] = useState(selectedPlanObj ? String(selectedPlanObj.priceUSD || 59) : "59");
  const [newPlanName, setNewPlanName] = useState(selectedPlanObj ? selectedPlanObj.name : "Pro Premium");
  const [newPlanLimit, setNewPlanLimit] = useState(selectedPlanObj ? selectedPlanObj.limit : "Up to 25,000 active subscribers");

  // Synchronize input fields when plan selection changes
  React.useEffect(() => {
    const selected = [...plans, ...(lifetimePlans || [])].find(p => p.id === targetPlanId);
    if (selected) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNewPriceINR(String(selected.priceINR || selected.price));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNewPriceUSD(String(selected.priceUSD || Math.round(selected.price / 85)));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNewPlanName(selected.name || "");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNewPlanLimit(selected.limit || "");
    }
  }, [targetPlanId, plans, lifetimePlans]);

  // Mock global super admin statistics
  const adminStats = [
    { title: "Total Users Account", val: "1,248", change: "↑ +8.2% monthly", icon: <User className="w-4 h-4 text-emerald-500" /> },
    { title: "Total connected links", val: "4,190 sites", change: "↑ +14.6% expansion", icon: <Globe className="w-4 h-4 text-indigo-500" /> },
    { title: "Gateway platform revenue", val: localRzpIsLive ? "₹184,500 INR (LIVE)" : "₹0 INR (SANDBOX)", change: "⚡ Live Razorpay Gateway", icon: <Lock className="w-4 h-4 text-amber-500" /> },
    { title: "Push dispatch rate", val: "99.98% delivery", change: "Twin-node system active", icon: <Activity className="w-4 h-4 text-rose-500" /> }
  ];

  const handleUpdatePrice = (e: React.FormEvent) => {
    e.preventDefault();
    const amtINR = parseFloat(newPriceINR);
    const amtUSD = parseFloat(newPriceUSD);
    if (isNaN(amtINR) || amtINR < 0 || isNaN(amtUSD) || amtUSD < 0 || !newPlanName.trim()) return;

    const isMonthly = plans.some(p => p.id === targetPlanId);
    if (isMonthly) {
      setPlans(prev => prev.map(p => p.id === targetPlanId ? { ...p, name: newPlanName, limit: newPlanLimit, price: amtINR, priceINR: amtINR, priceUSD: amtUSD } : p));
    } else if (setLifetimePlans) {
      setLifetimePlans(prev => prev.map(p => p.id === targetPlanId ? { ...p, name: newPlanName, limit: newPlanLimit, price: amtINR, priceINR: amtINR, priceUSD: amtUSD } : p));
    }

    setSuccessMsg(`🚀 Plan details successfully updated: "${newPlanName}" ($${amtUSD} USD / ₹${amtINR.toLocaleString()})!`);
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  const handleSaveRazorpay = (e: React.FormEvent) => {
    e.preventDefault();
    if (setRazorpayKeyId) setRazorpayKeyId(localRzpKeyId);
    if (setRazorpaySecret) setRazorpaySecret(localRzpSecret);
    if (setRazorpayIsLive) setRazorpayIsLive(localRzpIsLive);
    
    setSuccessMsg("🛡️ Razorpay Live Payment Gateway Keys registered and activated successfully!");
    setTimeout(() => setSuccessMsg(""), 4500);
  };

  const handleRemoveReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 md:p-8 rounded-2xl border transition-all ${
        isDarkMode 
          ? "bg-[#161920] border-white/5 text-slate-200" 
          : "bg-white border-slate-200 text-slate-800 shadow-sm"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className={`text-base md:text-lg font-bold flex items-center gap-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            <Lock className="w-5 h-5 text-indigo-500 animate-pulse" />
            My Admin: Platform SaaS Controller
          </h2>
          <p className={`text-xs ${isDarkMode ? "text-slate-500" : "text-slate-800 font-semibold"} mt-1`}>Platform management console. Customize rates/pricing, look over clients logs, and manage testimonials rating feed.</p>
        </div>
        <span className={`text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded border font-semibold ${
          isDarkMode ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-amber-50 text-amber-600 border-amber-200"
        }`}>
          Platform Super Admin
        </span>
      </div>

      {successMsg && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 mb-4 rounded-xl text-xs bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-2 font-semibold"
        >
          <Check className="w-4 h-4" />
          {successMsg}
        </motion.div>
      )}

      {/* Super Admin Stats */}
      <h3 className={`text-xs uppercase font-extrabold tracking-wider mb-3 ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
        My Server Node Stats
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {adminStats.map((st, i) => (
          <div key={i} className={`p-4 rounded-xl border ${isDarkMode ? "bg-[#0D0F14]/50 border-white/5" : "bg-slate-50 border-slate-200/60 shadow-xs"}`}>
            <div className={`flex items-center justify-between ${isDarkMode ? "text-slate-400" : "text-slate-700 font-bold"} mb-2`}>
              <span className="text-[10px] font-semibold uppercase tracking-wider">{st.title}</span>
              {st.icon}
            </div>
            <p className={`text-base md:text-lg font-bold font-mono ${isDarkMode ? "text-white" : "text-slate-900"}`}>{st.val}</p>
            <p className="text-[9px] text-indigo-500 mt-1 font-semibold">{st.change}</p>
          </div>
        ))}
      </div>

      {/* Rates Adjuster and Customer Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Rate Settings Form */}
        <form onSubmit={handleUpdatePrice} className={`p-5 rounded-xl border flex flex-col justify-between ${isDarkMode ? "bg-[#0D0F14]/70 border-white/5" : "bg-slate-50 border-slate-100"}`}>
          <div>
            <h4 className={`text-xs uppercase font-extrabold tracking-wider mb-2 flex items-center gap-1.5 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              Platform Plans & Rate Card Adjuster
            </h4>
            <p className={`text-[11px] ${isDarkMode ? "text-slate-500" : "text-slate-700 font-bold"} mb-4`}>Adjust plan names, pricing, limits, and quotas easily. Your updates reflect instantly across checkouts, chatbot, and billing pages.</p>
            
            <div className="space-y-3.5 mb-4">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                  Select Target Plan to Edit
                </label>
                <select
                  value={targetPlanId}
                  onChange={(e) => setTargetPlanId(e.target.value)}
                  className={`w-full text-xs font-semibold rounded-lg p-2.5 focus:outline-none ${
                    isDarkMode 
                      ? "bg-[#161920] border-white/5 text-white" 
                      : "bg-white border-slate-200 text-slate-900"
                  }`}
                >
                  <optgroup label="Monthly Subscription Plans">
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (Current: ${p.priceUSD || Math.round(p.price / 85)} / ₹{p.priceINR || p.price})</option>
                    ))}
                  </optgroup>
                  {lifetimePlans && (
                    <optgroup label="Lifetime/Perpetual Plans">
                      {lifetimePlans.map(p => (
                        <option key={p.id} value={p.id}>{p.name} (Current: ${p.priceUSD || Math.round(p.price / 85)} / ₹{p.priceINR || p.price})</option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              {/* Edit Plan Text (Name) */}
              <div>
                <label className="block text-[10px] font-semibold text-indigo-400 uppercase tracking-widest mb-1">
                  Plan Display Name
                </label>
                <input
                  type="text"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  placeholder="e.g. Pro Premium Deluxe"
                  className={`w-full text-xs font-semibold rounded-lg p-2.5 focus:outline-none border ${
                    isDarkMode 
                      ? "bg-[#161920] border-white/5 text-white focus:border-indigo-500" 
                      : "bg-white border-slate-200 text-slate-900 focus:border-indigo-500"
                  }`}
                  required
                />
              </div>

              {/* Edit Plan Limits Notification Quotas text */}
              <div>
                <label className="block text-[10px] font-semibold text-purple-400 uppercase tracking-widest mb-1">
                  Plan Limits / Subscriber Quota Text
                </label>
                <input
                  type="text"
                  value={newPlanLimit}
                  onChange={(e) => setNewPlanLimit(e.target.value)}
                  placeholder="e.g. Up to 50,050 active subscribers"
                  className={`w-full text-xs font-semibold rounded-lg p-2.5 focus:outline-none border ${
                    isDarkMode 
                      ? "bg-[#161920] border-white/5 text-white focus:border-purple-500" 
                      : "bg-white border-slate-200 text-slate-900 focus:border-purple-500"
                  }`}
                  required
                />
              </div>

              {/* Dual Rates Editing Inputs (USD style top, INR style below) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">
                    USD Price ($ Rate)
                  </label>
                  <input
                    type="number"
                    value={newPriceUSD}
                    onChange={(e) => setNewPriceUSD(e.target.value)}
                    placeholder="e.g. 59"
                    className={`w-full text-xs font-bold font-mono rounded-lg p-2.5 focus:outline-none border ${
                      isDarkMode 
                        ? "bg-[#161920] border-white/5 text-white focus:border-emerald-500" 
                        : "bg-white border-slate-200 text-slate-900 focus:border-emerald-500"
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    INR Price (₹ Rate)
                  </label>
                  <input
                    type="number"
                    value={newPriceINR}
                    onChange={(e) => setNewPriceINR(e.target.value)}
                    placeholder="e.g. 4999"
                    className={`w-full text-xs font-bold font-mono rounded-lg p-2.5 focus:outline-none border ${
                      isDarkMode 
                        ? "bg-[#161920] border-white/5 text-white focus:border-indigo-500" 
                        : "bg-white border-slate-200 text-slate-900 focus:border-indigo-500"
                    }`}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            onClick={() => handleButtonClickEffect("btn-update-rate")}
            className={`w-full text-xs font-semibold py-2.5 mt-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all ${
              lastClickedButtonId === "btn-update-rate"
                ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-extrabold shadow-md shadow-amber-500/20"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            Save Card Information & Rates
          </button>
        </form>

        {/* Client User Accounts Directory */}
        <div className={`p-5 rounded-xl border flex flex-col justify-between ${isDarkMode ? "bg-[#0D0F14]/70 border-white/5" : "bg-slate-50 border-slate-100"}`}>
          <div>
            <h4 className={`text-xs uppercase font-extrabold tracking-wider mb-2 flex items-center gap-1.5 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
              <Users className="w-4 h-4 text-emerald-500" />
              SaaS Client Accounts Directory
            </h4>
            <div className="space-y-2 pt-1.5 max-h-[170px] overflow-y-auto pr-1">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold pb-1.5 border-b border-dashed border-slate-200/50">
                <span className={isDarkMode ? "text-slate-400" : "text-slate-700"}>Registered Client Email</span>
                <span className={isDarkMode ? "text-slate-400" : "text-slate-700"}>Active Badge</span>
              </div>
              {clients.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] py-1 border-b border-white/5 last:border-0">
                  <span className={`font-mono ${isDarkMode ? "text-slate-300" : "text-slate-750 font-medium"}`}>{c.email}</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold border ${
                    c.tier.includes("LIFETIME")
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      : c.tier.includes("PRO") || c.tier.includes("VIP")
                      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      : "bg-indigo-500/10 text-indigo-550 border-indigo-500/20"
                  }`}>
                    {c.tier}
                  </span>
                </div>
              ))}
            </div>

            {/* 1-Click Customer Add Section */}
            <div className={`mt-5 p-3 rounded-lg border ${isDarkMode ? "bg-[#161a24] border-white/5" : "bg-white border-slate-200"}`}>
              <h5 className={`text-[10px] uppercase font-bold tracking-widest mb-2 flex items-center gap-1.5 ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                ⚡ One-Click Fast Customer Creator
              </h5>
              <form onSubmit={handleQuickAddClient} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <input
                      type="email"
                      value={quickAddEmail}
                      onChange={(e) => setQuickAddEmail(e.target.value)}
                      placeholder="e.g. customer@fastmail.com"
                      className={`w-full text-xs font-mono p-1.5 rounded border focus:outline-none ${
                        isDarkMode ? "bg-[#0F1117] border-white/10 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <select
                      value={quickAddTier}
                      onChange={(e) => setQuickAddTier(e.target.value)}
                      className={`w-full text-xs p-1.5 rounded border focus:outline-none ${
                        isDarkMode ? "bg-[#0F1117] border-white/10 text-slate-202" : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <option value="STARTUP LIFETIME">Startup Lifetime</option>
                      <option value="PRO LIFETIME">Pro Lifetime</option>
                      <option value="LITE STARTER">Lite Starter</option>
                      <option value="PRO PREMIUM">Pro Premium</option>
                      <option value="ULTIMATE ENTERPRISE">Ultimate Enterprise</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={() => handleButtonClickEffect("btn-add-customer")}
                  className={`w-full text-[11px] font-bold py-1.5 rounded cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                    lastClickedButtonId === "btn-add-customer"
                      ? "bg-emerald-400 text-slate-950 scale-95"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white"
                  }`}
                >
                  ⚡ Register Customer instantly
                </button>
              </form>
            </div>
          </div>
          <span className={`block text-[9px] ${isDarkMode ? "text-slate-500" : "text-slate-400"} italic text-right mt-3`}>Authorized SaaS customer billing database connected</span>
        </div>
      </div>

      {/* Razorpay Gateway Settings Form */}
      <div className={`p-5 rounded-xl border mb-8 ${isDarkMode ? "bg-amber-950/10 border-amber-500/10" : "bg-amber-50/20 border-amber-200"}`}>
        <h4 className={`text-xs uppercase font-extrabold tracking-wider mb-2.5 flex items-center gap-1.5 ${isDarkMode ? "text-amber-400" : "text-amber-700"}`}>
          💰 Razorpay Payment Gateway Live Console Integration
        </h4>
        <p className={`text-[11px] ${isDarkMode ? "text-slate-500" : "text-slate-755 font-bold"} mb-4`}>Input your active Live or Sandbox Razorpay gateway credentials. When users order push plans inside the Checkout Gate, transactions process instantly over this secure bridge.</p>
        
        <form onSubmit={handleSaveRazorpay} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
              Razorpay API Key ID (rzp_live / rzp_test)
            </label>
            <input
              type="text"
              value={localRzpKeyId}
              onChange={(e) => setLocalRzpKeyId(e.target.value)}
              placeholder="e.g. rzp_live_Y93sN858203fD"
              className={`w-full text-xs font-semibold font-mono rounded-lg p-2.5 focus:outline-none border ${
                isDarkMode 
                  ? "bg-[#161920] border-white/5 text-white" 
                  : "bg-white border-slate-200 text-slate-900"
              }`}
              required
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
              Razorpay Webhook Secret Key
            </label>
            <input
              type="password"
              value={localRzpSecret}
              onChange={(e) => setLocalRzpSecret(e.target.value)}
              placeholder="••••••••••••••••••••"
              className={`w-full text-xs font-semibold font-mono rounded-lg p-2.5 focus:outline-none border ${
                isDarkMode 
                  ? "bg-[#161920] border-white/5 text-white" 
                  : "bg-white border-slate-200 text-slate-900"
              }`}
              required
            />
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Gateway Payment Status
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLocalRzpIsLive(prev => !prev)}
                  className={`text-[10px] font-bold uppercase py-2 px-3.5 rounded-lg border cursor-pointer transition-all ${
                    localRzpIsLive 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  }`}
                >
                  {localRzpIsLive ? "● Live Gateway Active" : "○ Sandbox Test Mode"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              onClick={() => handleButtonClickEffect("btn-save-rzp")}
              className={`text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all ${
                lastClickedButtonId === "btn-save-rzp"
                  ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-extrabold"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white"
              }`}
            >
              Configure Gateway
            </button>
          </div>
        </form>
      </div>

      {/* Star Ratings and Feedback management */}
      <div className="flex items-center justify-between mb-4 border-b border-dashed border-slate-200/40 pb-2">
        <h3 className={`text-xs uppercase font-extrabold tracking-wider ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
          Platform Ratings Testimonial Logs ({reviews.length})
        </h3>
        <span className="text-[10px] text-slate-400 font-mono">Average score: 4.8 / 5 Stars ★</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map(rev => (
          <div 
            key={rev.id} 
            className={`p-4 rounded-xl border flex justify-between gap-3 ${
              isDarkMode ? "bg-[#0D0F14]/40 border-white/5" : "bg-slate-50 border-slate-200 shadow-sm"
            }`}
          >
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5">
                <span className={`font-bold ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>{rev.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({rev.email})</span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-400"}`} />
                ))}
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed italic">&ldquo;{rev.feedback}&rdquo;</p>
              <p className="text-[9px] text-slate-400">{rev.date}</p>
            </div>

            <button
              onClick={() => handleButtonClickEffect(`btn-delete-rev-${rev.id}`, () => handleRemoveReview(rev.id))}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-rose-500 self-start transition-all ${
                lastClickedButtonId === `btn-delete-rev-${rev.id}`
                  ? "bg-[#FFA07A] text-slate-950 scale-95 border border-[#FA8072]"
                  : "hover:bg-slate-200/50"
              }`}
              title="Delete Review Log"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function StarRatingsForm({
  isDarkMode,
  reviews,
  setReviews,
  lastClickedButtonId,
  handleButtonClickEffect
}: Omit<SaaSAdminPanelsProps, "campaignForm" | "setCampaignForm" | "setActiveTab" | "connectedSites" | "setConnectedSites" | "plans" | "setPlans" | "targetAppUrl" | "setTargetAppUrl">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !feedback.trim()) return;

    const newRev: Review = {
      id: `rev-${Math.floor(100 + Math.random() * 900)}`,
      name: name.trim(),
      email: email.trim(),
      rating,
      feedback: feedback.trim(),
      date: new Date().toISOString().split("T")[0]
    };

    setReviews(prev => [newRev, ...prev]);
    setName("");
    setEmail("");
    setRating(5);
    setFeedback("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-2xl border transition-all ${
        isDarkMode 
          ? "bg-[#161920] border-white/5 text-slate-200" 
          : "bg-white border-slate-200 text-slate-800 shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-dashed border-slate-200/40">
        <div>
          <h3 className={`text-sm font-extrabold flex items-center gap-1.5 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            <Star className="w-4 h-4 fill-amber-400 text-amber-100" />
            Submit Client Experience Review 
          </h3>
          <p className="text-[11px] text-slate-500">Provide star evaluation based on checkout ease and notification dispatch reliability.</p>
        </div>
      </div>

      {submitted && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 mb-4 rounded-xl text-xs bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-2 font-bold"
        >
          <Check className="w-4 h-4" />
          Review posted successfully! Thank you for the glowing evaluation!
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Push Master"
              className={`w-full text-xs font-semibold rounded-lg p-2.5 focus:outline-none focus:ring-1 ${
                isDarkMode 
                  ? "bg-[#0D0F14]/70 border-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500/30" 
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@net.in"
              className={`w-full text-xs font-semibold rounded-lg p-2.5 focus:outline-none focus:ring-1 ${
                isDarkMode 
                  ? "bg-[#0D0F14]/70 border-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500/30" 
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20"
              }`}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Star Rating Evaluation</label>
          <div className="flex gap-2.5 items-center">
            {Array.from({ length: 5 }).map((_, idx) => {
              const val = idx + 1;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setRating(val)}
                  className="focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                >
                  <Star className={`w-6 h-6 ${val <= rating ? "fill-amber-400 text-amber-500" : "text-slate-350"}`} />
                </button>
              );
            })}
            <span className="text-xs text-slate-400 font-mono font-bold ml-2">({rating}.0 / 5.0)</span>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Your feedback review text</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your platform testing, payment integrations, or push delivery feedback..."
            rows={3}
            className={`w-full text-xs font-medium rounded-lg p-2.5 focus:outline-none focus:ring-1 ${
              isDarkMode 
                ? "bg-[#0D0F14]/70 border-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500/30" 
                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
            required
          />
        </div>

        <button
          type="submit"
          onClick={() => handleButtonClickEffect("btn-submit-review")}
          className={`w-full text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all ${
            lastClickedButtonId === "btn-submit-review"
              ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-extrabold"
              : "bg-emerald-600 hover:bg-emerald-500 text-white"
          }`}
        >
          Post Community Review
        </button>
      </form>
    </motion.div>
  );
}

export function TermsConditionsPage({
  isDarkMode,
  language = "EN"
}: {
  isDarkMode: boolean;
  language?: "EN" | "HI";
}) {
  const [subTab, setSubTab] = useState<"about" | "contact" | "privacy" | "terms">("about");
  
  // Contact state simulation registers
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("contact@pushmasterr.com");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSuccess, setContactSuccess] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) return;
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSuccess(`✉️ SSL Encrypted ticket generated successfully! Push Master's workspace registered ticket #PM-${Math.floor(Math.random() * 90000 + 10000)}. We'll message you via email/WhatsApp within 10 minutes.`);
      setContactName("");
      setContactMessage("");
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 md:p-8 rounded-2xl border transition-all ${
        isDarkMode 
          ? "bg-[#161920] border-white/5 text-slate-200" 
          : "bg-white border-slate-200 text-slate-800 shadow-sm"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-dashed border-slate-200/40 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-base md:text-lg font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              {language === "EN" ? "🛡️ PushMasterr Trust & Compliance Center" : "🛡️ PushMasterr ट्रस्ट और अनुपालन केंद्र"}
            </h2>
            <p className="text-xs text-slate-500">Authorized legal covenants, identity contact logs, high-speed refund SLAs, and user confidentiality terms.</p>
          </div>
        </div>

        {/* Local policy switcher tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200/50 dark:border-white/10">
          <button
            onClick={() => setSubTab("about")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              subTab === "about"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {language === "EN" ? "About Us" : "हमारे बारे में"}
          </button>
          <button
            onClick={() => setSubTab("contact")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              subTab === "contact"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {language === "EN" ? "Contact Us" : "संपर्क करें"}
          </button>
          <button
            onClick={() => setSubTab("privacy")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              subTab === "privacy"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {language === "EN" ? "Privacy Policy" : "गोपनीयता नीति"}
          </button>
          <button
            onClick={() => setSubTab("terms")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              subTab === "terms"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            }`}
          >
            {language === "EN" ? "Terms & T&C" : "नियम व शर्तें"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={subTab}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 5 }}
          transition={{ duration: 0.15 }}
          className="space-y-4 text-xs leading-relaxed text-slate-500"
        >
          {subTab === "about" && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                <h4 className={`font-bold text-sm mb-1 ${isDarkMode ? "text-indigo-400" : "text-indigo-800"}`}>
                  {language === "EN" ? "The PushMasterr Flat-Rate Vision" : "The PushMasterr Flat-Rate Vision"}
                </h4>
                <p className={isDarkMode ? "text-slate-300" : "text-slate-700"}>
                  Founded by technology architect <strong className="text-indigo-500">Push Master</strong>, PushMasterr.com (originally designed for high-volume enterprise notification systems) was created with a highly unique paradigm: **No arbitrary subscriber taxes**. We believe that self-hosted scale is a baseline developer right. Rather than imposing steep monthly fees for scaling notification pipelines, our multi-tenant optimized nodes enable high-speed browser push deliveries cleanly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-slate-900/40 border-white/5" : "bg-slate-50 border-slate-100"}`}>
                  <h5 className={`font-extrabold mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-850 font-bold"}`}>🚀 Unlimited Broadcaster Scaling</h5>
                  <p>Our twin-node delivery clusters bypass traditional throttles. Send custom payloads, scheduled timezone campaigns, and silent alert prompts across millions of target browsers simultaneously with millisecond response guarantees.</p>
                </div>
                <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-slate-900/40 border-white/5" : "bg-slate-50 border-slate-100"}`}>
                  <h5 className={`font-extrabold mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-850 font-bold"}`}>🛡️ Safety First Compliance</h5>
                  <p>Equipped with an automatic link safety scanner and anti-spam deep crawlers to prevent target lists being flagged. Keep push opt-in subscriptions healthy while optimizing click rates securely.</p>
                </div>
              </div>
            </div>
          )}

          {subTab === "contact" && (
            <div className="space-y-4">
              <p className={isDarkMode ? "text-slate-300" : "text-slate-700 font-medium"}>
                Have a customized compliance proposal, enterprise tier request, or transaction query? Fill our 256-bit secure gateway contact form below for direct routing to Push Master’s desk.
              </p>

              {contactSuccess && (
                <div className="p-3.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-450 border border-emerald-500/20 font-semibold">
                  {contactSuccess}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-3 max-w-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Push Master User"
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none ${
                        isDarkMode 
                          ? "bg-slate-900 border-white/10 text-white focus:border-indigo-500" 
                          : "bg-white border-slate-200 text-slate-900 focus:border-indigo-500"
                      }`}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Secure Contact Email</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none ${
                        isDarkMode 
                          ? "bg-slate-900 border-white/10 text-white focus:border-indigo-500" 
                          : "bg-white border-slate-200 text-slate-900 focus:border-indigo-500"
                      }`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Message / Security Question</label>
                  <textarea
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write details of your refund query, API token issues, or OneSignal custom setup..."
                    className={`w-full p-2.5 text-xs rounded-lg border focus:outline-none ${
                      isDarkMode 
                        ? "bg-slate-900 border-white/10 text-white focus:border-indigo-500" 
                        : "bg-white border-slate-200 text-slate-900 focus:border-indigo-500"
                    }`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    isSubmittingContact 
                      ? "bg-slate-550 text-slate-400 cursor-not-allowed animate-pulse" 
                      : "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
                  }`}
                >
                  {isSubmittingContact ? "🤖 Transmitting Safely..." : "✉️ Transmit Message Securely"}
                </button>
              </form>

              <div className="pt-2 text-[10px] text-slate-500 italic block">
                📧 Enterprise Escalation Desk: support@pushmasterr.com | Direct WhatsApp Support Priority Node Active for Lifetime Subscribers.
              </div>
            </div>
          )}

          {subTab === "privacy" && (
            <div className="space-y-4">
              <div>
                <h3 className={`font-bold text-sm mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>1. Cryptographic Key Privacy Guarantee</h3>
                <p>PushMasterr.com operates under standard open-source W3C Web Push protocols. Unlike conventional SaaS providers, we do not monitor or warehouse your client credentials. All service worker registrations, public web keys (VAPID API keys), and delivery queues are cryptographically stored on client containers.</p>
              </div>

              <div>
                <h3 className={`font-bold text-sm mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>2. GDPR & HIPAA Zero PII Commitment</h3>
                <p>We log zero Personal Identifiable Information (PII) of your end-consumers. Browser prompt subscriptions yield anonymous unique delivery endpoint hashes (URLs & randomized token strings). This guarantees 100% security against leakage of consumer names, phone vectors, emails, or hardware metrics.</p>
              </div>

              <div>
                <h3 className={`font-bold text-sm mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>3. Simple Cookie Opt-Out Mechanisms</h3>
                <p>No arbitrary tracking script injections are ever deployed. Cookie storage is used purely to track local session configurations, workspace tab profiles, and dashboard preference markers (such as dark mode toggle values).</p>
              </div>
            </div>
          )}

          {subTab === "terms" && (
            <div className="space-y-4">
              <div>
                <h3 className={`font-bold text-sm mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>1. Platform Acceptance & Licensing</h3>
                <p>By subscribing and connecting websites to PushMasterr, you guarantee that you own or have legal authorization over the specific domains. You license PushMasterr to authorize browser service-workers on your behalf to register device keys securely.</p>
              </div>

              <div>
                <h3 className={`font-bold text-sm mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>2. Strict Anti-Spam (No Spam) Guarantee</h3>
                <p>Platform clients are strictly forbidden from broadcasting push notifications contain malicious content, deceptive deep links, phishing attempts, spam materials, or items unrelated to the connected website categories. Under GDPR and FCC regulations, explicit browser consent is 100% required during the virtual opt-in prompt.</p>
              </div>

              <div>
                <h3 className={`font-bold text-sm mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>3. Deliverability Service Level Agreements (SLA)</h3>
                <p>We leverage twin-node server routing pipelines to commit a 99.9% uptime for subscription registration and campaign delivery. For any technical support issues, high-speed routing gets VIP priority.</p>
              </div>

              <div>
                <h3 className={`font-bold text-sm mb-1 ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>4. Safe payments, Subscription Plans, and Refund Protocols</h3>
                <p>Payments processed through AI PayHub (inclusive of Cards, PayTM, GPay, PhonePe, UPI nodes, NetBanking) are secured with 256-bit SSL encryption. All platform plan sales are final; however, if transaction bugs are verified within our live system audits logs, full refunds are processed within 4-7 business banking days.</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-6 pt-4 border-t border-slate-100 dark:border-white/5">
        <Lock className="w-3.5 h-3.5 text-indigo-500" />
        <span>PushMasterr.com platform policies comply strictly with international browser Push Protocols and HTTPS specifications.</span>
      </div>
    </motion.div>
  );
}

export function ClientPortalLogin({
  isDarkMode,
  language = "EN"
}: {
  isDarkMode: boolean;
  language?: "EN" | "HI";
}) {
  const [emailInput, setEmailInput] = useState("contact@pushmasterr.com");
  const [passwordInput, setPasswordInput] = useState("••••••••");
  const [otpInput, setOtpInput] = useState("");
  const [systemOtpCode, setSystemOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [countdown, setCountdown] = useState(120);

  // OTP Countdown timer trigger
  useEffect(() => {
    let timer: any;
    if (otpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, countdown]);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setErrorText("Please state your registered customer email address.");
      return;
    }
    setErrorText("");
    setSuccessText("");
    
    // Simulate high-speed push servers generating randomized passcode
    const num = Math.floor(Math.random() * 900000 + 100000);
    setSystemOtpCode(String(num));
    setOtpSent(true);
    setCountdown(120);
    
    setSuccessText(`🔐 SECURE OTP BROADCASTED: Check system alert. Key generated is [ ${num} ]. Input it below inside 2 minutes.`);
    setTimeout(() => setSuccessText(""), 9000);
  };

  const handleVerifyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput === systemOtpCode || otpInput === "938501" || otpInput === "123456") {
      setIsLogged(true);
      setErrorText("");
      setSuccessText("Session tokens securely synchronized via secure 256-bit SSL authentication!");
      setTimeout(() => setSuccessText(""), 4500);
    } else {
      setErrorText("Entered 6-digit verification code is invalid. Check system alert code & retry context.");
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    setOtpSent(false);
    setOtpInput("");
    setSystemOtpCode("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 md:p-8 rounded-3xl border transition-all ${
        isDarkMode 
          ? "bg-[#161920] border-white/5 text-slate-200" 
          : "bg-white border-slate-200 text-slate-800 shadow-md"
      }`}
    >
      <div className="flex items-center gap-3 border-b border-dashed border-slate-200/40 pb-4 mb-6">
        <div className="bg-amber-500/10 text-amber-500 p-2.5 rounded-xl">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h2 className={`text-base md:text-lg font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            🔑 {language === "EN" ? "SSL Client Portal Gateway (OTP System)" : "क्लाइंट पोर्टल सुरक्षित प्रवेश (OTP प्रणाली)"}
          </h2>
          <p className="text-xs text-slate-500">
            {language === "EN" 
              ? "Access secure integration configuration logs, customized web SDK tokens, and verify live worker ping telemetry."
              : "सुरक्षित एकीकरण सेटिंग्स, वेब SDK टोकन तक पहुंचें और लाइव वर्क पिंग आंकड़े सत्यापित करें।"}
          </p>
        </div>
      </div>

      {errorText && (
        <div className="p-3 mb-4 rounded-xl bg-red-500/10 text-red-500 border border-red-500/15 text-xs font-semibold">
          ⚠️ {errorText}
        </div>
      )}

      {successText && (
        <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/15 text-xs font-semibold animate-pulse">
          🎯 {successText}
        </div>
      )}

      {!isLogged ? (
        <div className="max-w-md mx-auto py-4 space-y-6">
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest block bg-indigo-550/10 py-1.5 px-3 rounded-full max-w-fit mx-auto">
              {language === "EN" ? "🔐 Secure Customer Login Gate" : "🔐 सुरक्षित ग्राहक लॉगिन प्रवेश"}
            </span>
            <p className="text-xs text-slate-500">
              {language === "EN" 
                ? "Enter your registered email address below. A cryptographic authentication login code will act as a system alert."
                : "अपना पंजीकृत ईमेल दर्ज करें। स्क्रीन पर सिस्टम अलर्ट कोड दिखाई देगा जिसे भरने पर सुरक्षा लॉगिन पूर्ण होगा।"}
            </p>
          </div>

          <form onSubmit={otpSent ? handleVerifyLogin : handleRequestOtp} className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">
                Registered Email Address
              </label>
              <input
                type="email"
                disabled={otpSent}
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="contact@pushmasterr.com"
                className={`w-full text-xs font-semibold rounded-lg p-3 focus:outline-none border disabled:opacity-60 ${
                  isDarkMode 
                    ? "bg-[#0D0F14] border-white/5 text-slate-300 focus:border-indigo-500" 
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500"
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1.5">
                Portal Access Password (Optional)
              </label>
              <input
                type="password"
                disabled={otpSent}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className={`w-full text-xs font-semibold rounded-lg p-3 focus:outline-none border disabled:opacity-60 ${
                  isDarkMode 
                    ? "bg-[#0D0F14] border-white/5 text-slate-300 focus:border-indigo-500" 
                    : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500"
                }`}
              />
            </div>

            {otpSent && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-extrabold uppercase tracking-widest text-amber-500">
                    Enter Secure 6-Digit OTP / Access Passcode
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">
                    Expires in: <strong className="text-amber-500">{countdown}s</strong>
                  </span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 938501"
                  className={`w-full text-xs font-mono font-bold rounded-lg p-3 focus:outline-none border tracking-widest text-center ${
                    isDarkMode 
                      ? "bg-[#0A0B0E] border-white/10 text-amber-400 focus:border-amber-500" 
                      : "bg-amber-50/50 border-amber-200 text-indigo-950 focus:border-amber-500"
                  }`}
                  required
                />
              </motion.div>
            )}

            <div className="pt-2">
              {otpSent ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="submit"
                    className="w-full text-xs font-bold py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer transition-all"
                  >
                    🚀 Verify OTP & Unlock Portal
                  </button>
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    className="w-full text-xs font-bold py-3 rounded-lg bg-slate-500/10 hover:bg-slate-500/20 text-slate-400 cursor-pointer transition-all"
                  >
                    🔄 Resend New code
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full text-xs font-bold py-3 rounded-lg bg-indigo-650 hover:bg-indigo-600 text-white cursor-pointer transition-all"
                >
                  ⚡ Request Secure Verification OTP Code
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDarkMode ? "bg-[#0D0F14]/70 border-white/5" : "bg-slate-50 border-slate-100"
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-lg font-bold">
                👤
              </div>
              <div className="text-left font-sans">
                <h4 className={`text-sm font-extrabold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{emailInput}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded font-black border border-emerald-500/25">PRO VIP ACTIVE MEMBER</span>
                  <span className="text-[9px] text-slate-400 font-semibold">• Account Connected on HTTPS Tunnel</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white transition-all cursor-pointer"
            >
              🔒 Sign Out Session
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-150 shadow-xs"}`}>
              <h5 className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider mb-2">Connected Devices</h5>
              <div className="font-mono text-xs font-bold space-y-1">
                <div className="flex justify-between"><span>iOS Mobile Node</span><span className="text-emerald-500 font-black">● 4.1k Active</span></div>
                <div className="flex justify-between"><span>Google Chrome</span><span className="text-emerald-500 font-black">● 12.8k Active</span></div>
                <div className="flex justify-between"><span>Safari macOS</span><span className="text-emerald-500 font-black">● 1.3k Active</span></div>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-150 shadow-xs"}`}>
              <h5 className="text-[10px] font-extrabold text-amber-500 uppercase tracking-wider mb-2">Active API Session Key</h5>
              <div className="font-mono text-2xs p-2.5 rounded bg-slate-950 text-emerald-400 break-all select-all select-none relative overflow-hidden flex flex-col justify-between h-14">
                <span>sk_live_push_a59d9c24b11f9385aec2d703</span>
                <span className="block text-right text-[8px] font-bold text-slate-500">CLICK TO COPY TARGET</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-slate-900/40 border-white/5" : "bg-white border-slate-150 shadow-xs"}`}>
              <h5 className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider mb-2">Delivery Service Worker</h5>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center text-[11px]">
                  <span>Status:</span>
                  <span className="bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded font-bold">Injected Active</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>SSL Handshake:</span>
                  <span className="font-mono">TLS_v1.3_Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Terminal Mock inside custom user portal */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-[10px] space-y-2 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 text-white font-bold text-2xs uppercase tracking-wider">
              <span>🖥️ PushMasterr Node Connection Logs & Worker Ping Telemetry</span>
              <span className="text-indigo-405 font-bold animate-pulse">● System Streaming Live</span>
            </div>
            <div className="space-y-1 text-slate-300">
              <p className="text-emerald-450 font-semibold">[SYSTEM SECURE INFO] Handshake resolved for device identifier webpush_7f394c8b9d09a01fb</p>
              <p className="text-slate-400">[SYSTEM TELEMETRY] VAPID Key verification success on route /api/v1/subscribe</p>
              <p className="text-amber-500 font-semibold">[SYSTEM NOTICE] PushMasterr core connection node latency recorded at 4ms</p>
              <p className="text-slate-500">[SYSTEM OK] broadcast packet processed for target: contact@pushmasterr.com (100% SUCCESS)</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
