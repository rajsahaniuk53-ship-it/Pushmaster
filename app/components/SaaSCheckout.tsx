"use client";

import React, { useState } from "react";
import { 
  Check, 
  ShoppingBag, 
  CreditCard, 
  Wallet, 
  Lock, 
  Star, 
  Percent, 
  ChevronRight, 
  Clock, 
  Activity, 
  DollarSign, 
  ShieldCheck, 
  Building,
  ArrowRight,
  Sparkles,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Plan {
  id: string;
  name: string;
  price: number;
  limit: string;
  features: string[];
  popular?: boolean;
  priceUSD?: number;
  priceINR?: number;
}

interface SaaSCheckoutProps {
  isDarkMode: boolean;
  plans: Plan[];
  lifetimePlans?: Plan[];
  lastClickedButtonId: string | null;
  handleButtonClickEffect: (id: string, callback?: () => void) => void;
  currentSubscriptionTier: string;
  setCurrentSubscriptionTier: (tier: string) => void;
  playPhysicalNotificationChime: () => void;
}

export function SaaSCheckout({
  isDarkMode,
  plans,
  lifetimePlans: passedLifetimePlans,
  lastClickedButtonId,
  handleButtonClickEffect,
  currentSubscriptionTier,
  setCurrentSubscriptionTier,
  playPhysicalNotificationChime
}: SaaSCheckoutProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "lifetime">("lifetime");
  const [includePremiumAddon, setIncludePremiumAddon] = useState(false);
  
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0); // 0 to 100
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [promoApplied, setPromoApplied] = useState("");

  const fallbackLifetimePlans: Plan[] = [
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
        "Real-time Campaigns delivery logs",
        "EMIs Available & Lifetime Guarantee"
      ]
    },
    {
      id: "pro-lifetime",
      name: "Pro Lifetime",
      price: 66000, // $799 * 83
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
  ];

  const lifetimePlans = passedLifetimePlans || fallbackLifetimePlans;
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(lifetimePlans[0] || null);

  // Payment Options States - Inspired by screenshot
  const [paymentMode, setPaymentMode] = useState<"upi" | "card" | "netbank" | "wallet">("upi");
  const [upiSubBrand, setUpiSubBrand] = useState<"gpay" | "phonepe" | "paytm" | "bhim">("gpay");

  // Form Field Inputs
  const [cardHolder, setCardHolder] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [upiVpa, setUpiVpa] = useState("");

  const [checkoutStep, setCheckoutStep] = useState<"rates" | "paygate">("rates");
  const [isProcessing, setIsProcessing] = useState(false);
  const [txnSuccess, setTxnSuccess] = useState(false);
  const [generatedTxnId, setGeneratedTxnId] = useState("");
  const [activePaymentBtnId, setActivePaymentBtnId] = useState<string>("mode-upi");

  // Dynamic calculations
  const basePrice = selectedPlan ? selectedPlan.price : 0;
  const addonPrice = includePremiumAddon ? 33000 : 0;
  const originalPrice = basePrice + addonPrice;

  const baseUSD = selectedPlan ? (selectedPlan.priceUSD || Math.round(selectedPlan.price / 83)) : 0;
  const addonUSD = includePremiumAddon ? 399 : 0;
  const originalUSD = baseUSD + addonUSD;

  const discountAmt = Math.round((originalPrice * discountPercent) / 100);
  const finalPrice = Math.max(0, originalPrice - discountAmt);

  const discountAmtUSD = Math.round((originalUSD * discountPercent) / 100);
  const finalPriceUSD = Math.max(0, originalUSD - discountAmtUSD);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    const code = promoCode.trim().toUpperCase();
    if (code === "FLASH50") {
      setDiscountPercent(50);
      setPromoApplied("FLASH50");
      setPromoSuccess("🎉 Coupon 'FLASH50' applied successfully! enjoy 50% discount!");
    } else if (code === "LOVABLE10") {
      setDiscountPercent(10);
      setPromoApplied("LOVABLE10");
      setPromoSuccess("🎉 Coupon 'LOVABLE10' applied successfully! enjoy 10% discount!");
    } else if (code === "FREEPUSH") {
      setDiscountPercent(100);
      setPromoApplied("FREEPUSH");
      setPromoSuccess("🎉 Coupon 'FREEPUSH' applied successfully! enjoy 100% discount!");
    } else {
      setPromoError("❌ Invalid coupon code. Try 'FLASH50' or 'LOVABLE10'.");
    }
  };

  const handleAddToCart = (plan: Plan) => {
    setSelectedPlan(plan);
    setCheckoutStep("paygate");
    setTimeout(() => {
      const el = document.getElementById("secure-checkout-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handlePaymentModeClick = (mode: "upi" | "card" | "netbank" | "wallet", buttonId: string) => {
    setPaymentMode(mode);
    setActivePaymentBtnId(buttonId);
    handleButtonClickEffect(buttonId);
  };

  const handleUPIBrandClick = (brand: "gpay" | "phonepe" | "paytm" | "bhim", buttonId: string) => {
    setUpiSubBrand(brand);
    setActivePaymentBtnId(buttonId);
    handleButtonClickEffect(buttonId);
  };

  const executeSaaSPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setGeneratedTxnId(`TXN-INV-2026-${Math.floor(100000 + Math.random() * 900000)}`);

    setTimeout(() => {
      setIsProcessing(false);
      setTxnSuccess(true);
      setCurrentSubscriptionTier(`${selectedPlan?.name} Active`);
      playPhysicalNotificationChime();
    }, 2200);
  };

  return (
    <div className="space-y-6">
      
      {true && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-2 pb-2">
            <h2 className={`text-2xl md:text-3xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              SaaS Rate Card & License Plans
            </h2>
            <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-700 font-semibold"} leading-relaxed`}>
              Bypass expensive monthly delivery limits forever. Host PushMasterr on your own servers and scale with zero subscription limits. Compare plans below and select what fits your scale.
            </p>
          </div>

          {/* Unified Pricing Grids (Both in one single place) */}
          <div className="space-y-12">
            {/* Section 1: Self-Hosted Lifetime Licenses */}
            <div className="space-y-6">
              <div className="text-center space-y-1 max-w-lg mx-auto">
                <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-black uppercase tracking-wider">
                  💎 Lifetime Licenses (One-time Payment)
                </span>
                <h3 className={`text-xl md:text-2xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  Self-Hosted Lifetime Licenses (No Monthly Fees)
                </h3>
                <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-700"}`}>Deliver unlimited notifications natively on your own resources forever.</p>
              </div>

              <div id="pricing-lifetime-grid" className="grid grid-cols-1 md:grid-cols-2 max-w-4xl gap-6 mx-auto">
                {lifetimePlans.map(pl => {
                  return (
                    <div 
                      key={pl.id} 
                      className={`rounded-3xl border p-6 flex flex-col justify-between relative transition-all ${
                        pl.popular 
                          ? "ring-2 ring-indigo-500 bg-indigo-500/[0.02]" 
                          : ""
                      } ${
                        isDarkMode 
                          ? "bg-[#161920] border-white/5" 
                          : "bg-white border-slate-200 shadow-md hover:shadow-lg"
                      }`}
                    >
                      {pl.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold py-1 px-4 rounded-full uppercase tracking-wider shadow animate-bounce">
                          Best Value Option ★
                        </span>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}>{pl.name}</h4>
                          <p className={`text-[11px] font-bold mt-1 ${isDarkMode ? "text-slate-400" : "text-indigo-600"}`}>{pl.limit}</p>
                        </div>

                        <div className={`py-3 space-y-1.5 text-left border-b ${isDarkMode ? "border-white/5" : "border-slate-205/60"} pb-3`}>
                          {/* USD Prices */}
                          <div className="flex items-baseline gap-1 font-bold">
                            <span className="text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                              ${pl.priceUSD || 499}
                            </span>
                            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-400">
                              USD / Onetime Payment
                            </span>
                          </div>
                          
                          {/* INR Prices */}
                          <div className={`flex items-baseline gap-1 ${isDarkMode ? "text-slate-400" : "text-slate-900"} font-medium pb-1.5`}>
                            <span className={`text-base font-black font-mono ${isDarkMode ? "text-slate-100" : "text-slate-950"}`}>
                              ₹{(pl.priceINR || pl.price).toLocaleString()}
                            </span>
                            <span className={`text-[10px] tracking-wider font-extrabold uppercase ${isDarkMode ? "text-slate-400" : "text-slate-800"}`}>
                              INR Only
                            </span>
                          </div>
                        </div>

                        <ul className="space-y-2.5 pt-3 text-xs">
                          {pl.features.map((ft, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className={`${isDarkMode ? "text-slate-300" : "text-slate-800 font-bold text-[12.5px] leading-snug"}`}>
                                {ft}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`mt-6 pt-4 border-t ${isDarkMode ? "border-white/5" : "border-slate-200"}`}>
                        <button
                          onClick={() => handleButtonClickEffect(`btn-cart-${pl.id}`, () => handleAddToCart(pl))}
                          className={`w-full py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] ${
                            lastClickedButtonId === `btn-cart-${pl.id}`
                              ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-extrabold"
                              : pl.popular
                              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                              : isDarkMode
                              ? "bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300"
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart & Select Option (Lifetime)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Section 2: Cloud Monthly Subscription Plans */}
            <div className="space-y-6 pt-10 border-t border-dashed border-slate-200 dark:border-white/5">
              <div className="text-center space-y-1 max-w-lg mx-auto">
                <span className="text-[10px] bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  💳 Cloud Subscriptions (Monthly Quotas)
                </span>
                <h3 className={`text-xl md:text-2xl font-black ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                  SaaS Cloud Subscription Plans
                </h3>
                <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-700"}`}>Ideal for quick deployment without dedicated architecture. Cancel anytime.</p>
              </div>

              <div id="pricing-monthly-grid" className="grid grid-cols-1 md:grid-cols-3 max-w-6xl gap-6 mx-auto">
                {plans.map(pl => {
                  return (
                    <div 
                      key={pl.id} 
                      className={`rounded-3xl border p-6 flex flex-col justify-between relative transition-all ${
                        pl.popular 
                          ? "ring-2 ring-indigo-500 bg-indigo-500/[0.02]" 
                          : ""
                      } ${
                        isDarkMode 
                          ? "bg-[#161920] border-white/5" 
                          : "bg-white border-slate-200 shadow-md hover:shadow-lg"
                      }`}
                    >
                      {pl.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold py-1 px-4 rounded-full uppercase tracking-wider shadow animate-bounce">
                          Popular Option
                        </span>
                      )}

                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-950"}`}>{pl.name}</h4>
                          <p className={`text-[11px] font-bold mt-1 ${isDarkMode ? "text-slate-400" : "text-indigo-600"}`}>{pl.limit}</p>
                        </div>

                        <div className={`py-3 space-y-1.5 text-left border-b ${isDarkMode ? "border-white/5" : "border-slate-200"} pb-3`}>
                          {/* USD Prices */}
                          <div className="flex items-baseline gap-1 font-bold">
                            <span className="text-3xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                              ${pl.priceUSD || (pl.id === "lite" ? 12 : pl.id === "pro" ? 59 : 179)}
                            </span>
                            <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-700 dark:text-emerald-450">
                              USD / Month
                            </span>
                          </div>
                          
                          {/* INR Prices */}
                          <div className={`flex items-baseline gap-1 ${isDarkMode ? "text-slate-400" : "text-slate-900"} font-medium pb-1.5`}>
                            <span className={`text-base font-black font-mono ${isDarkMode ? "text-slate-100" : "text-slate-950"}`}>
                              ₹{(pl.priceINR || pl.price).toLocaleString()}
                            </span>
                            <span className={`text-[10px] tracking-wider font-extrabold uppercase ${isDarkMode ? "text-slate-400" : "text-slate-800"}`}>
                              INR Only
                            </span>
                          </div>
                        </div>

                        <ul className="space-y-2.5 pt-3 text-xs">
                          {pl.features.map((ft, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span className={`${isDarkMode ? "text-slate-300" : "text-slate-800 font-bold text-[12.5px] leading-snug"}`}>
                                {ft}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`mt-6 pt-4 border-t ${isDarkMode ? "border-white/5" : "border-slate-200"}`}>
                        <button
                          onClick={() => handleButtonClickEffect(`btn-cart-${pl.id}`, () => handleAddToCart(pl))}
                          className={`w-full py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] ${
                            lastClickedButtonId === `btn-cart-${pl.id}`
                              ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-extrabold"
                              : pl.popular
                              ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-650/20"
                              : isDarkMode
                              ? "bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300"
                          }`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart & Select Option (Monthly)
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Premium Add-on Interactive Block - MATCHING SCREENSHOT 2 */}
          <div className={`max-w-4xl mx-auto rounded-3xl border p-6 transition-all ${
            isDarkMode ? "bg-[#0E1015]/90 border-white/5 text-white" : "bg-[#F0F5FF] border-slate-200 shadow-md text-slate-900"
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left pricing section */}
              <div className="md:col-span-5 space-y-4">
                <div>
                  <span className="bg-indigo-600/15 border border-indigo-500/20 text-indigo-500 font-black px-2.5 py-1 rounded text-[9.5px] font-mono tracking-widest uppercase">
                    💎 EXCLUSIVE OPTIONAL MODULES
                  </span>
                  <h3 className={`text-xl md:text-2xl font-extrabold mt-1.5 ${isDarkMode ? "text-white" : "text-indigo-950"}`}>
                    Premium Add-on
                  </h3>
                </div>

                <div className="flex items-baseline gap-1.5 text-emerald-500 font-bold">
                  <span className="text-3xl font-black font-mono">$399</span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-500/80">/ Onetime cost</span>
                </div>

                {/* Big simple fast button switch */}
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setIncludePremiumAddon(!includePremiumAddon);
                      handleButtonClickEffect("toggle-premium-addon");
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer border ${
                      includePremiumAddon 
                        ? "bg-emerald-600 text-white border-emerald-500 shadow" 
                        : isDarkMode
                        ? "bg-white/5 text-slate-405 border-white/10 hover:text-white"
                        : "bg-white text-slate-800 border-slate-200 shadow-sm hover:bg-slate-50"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] ${includePremiumAddon ? "bg-white text-emerald-600" : "bg-slate-300 text-transparent"}`}>
                      ✓
                    </div>
                    {includePremiumAddon ? "Premium Add-on Added ✔" : "+ Click to Include Premium Add-on!"}
                  </button>
                  <p className={`text-[10px] mt-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-705 font-semibold"}`}>
                    {includePremiumAddon ? "🎉 Great Choice! This will automatically combine with either Startup/Pro plans." : "Combine this optional add-on to supercharge automated YouTube hooks & directory segments."}
                  </p>
                </div>
              </div>

              {/* Right Modules Included section */}
              <div className="md:col-span-7 border-t md:border-t-0 md:border-l border-slate-200/20 pt-4 md:pt-0 md:pl-6 space-y-3">
                <span className={`text-[10.5px] uppercase font-black font-mono tracking-widest ${isDarkMode ? "text-teal-400" : "text-indigo-900"}`}>
                  ✔ Modules Included in Add-on:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    "YouTube links token collection",
                    "URL shortener with subscription",
                    "Templating & cloning options",
                    "URL & directory segmentation",
                    "Automated push for YouTube",
                    "Automated Google Drive Backup",
                    "Collection through external links",
                    "Priority Phone/Email support",
                    "Real time link reports/analytics"
                  ].map((mod, mi) => (
                    <div key={mi} className="flex items-center gap-2">
                      <span className="text-emerald-500 font-extrabold">✓</span>
                      <span className={`${isDarkMode ? "text-slate-300" : "text-slate-900 font-extrabold text-[11px]"}`}>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DO THE MATH: Platform Costs Comparison Table - MATCHING SCREENSHOT 3 */}
          <div className={`max-w-4xl mx-auto rounded-3xl border p-6 ${
            isDarkMode ? "bg-[#111319] border-white/5" : "bg-white border-slate-200 shadow-lg"
          } space-y-5 overflow-hidden`}>
            
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full border border-amber-500/20 font-black">
                💰 Do the Math yourself
              </span>
              <h3 className={`text-xl font-black ${isDarkMode ? "text-white" : "text-slate-950 font-black"}`}>
                Why PushMasterr is 100x More Cost-Effective
              </h3>
              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-850 font-semibold"}`}>
                Traditional push providers lock you into expensive tiers as your users grow. PushMasterr is self-hosted with lifetime flat pricing.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto w-full">
              <table className={`w-full text-left text-xs ${isDarkMode ? "text-slate-300" : "text-slate-900"} border-collapse`}>
                <thead>
                  <tr className={`border-b ${isDarkMode ? "border-white/5 text-slate-300 bg-white/5" : "border-slate-350 text-slate-950 bg-slate-100"}`}>
                    <th className="p-3 font-black uppercase text-[10px] tracking-wider">Service Provider</th>
                    <th className="p-3 font-black uppercase text-[10px] tracking-wider text-right">Cost / 1M Subs</th>
                    <th className="p-3 font-black uppercase text-[10px] tracking-wider text-right">Estimated Subs / Year</th>
                    <th className="p-3 font-black uppercase text-[10px] tracking-wider text-right">Total Cost / Year</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Onesignal", cost: "$3,000 / month", subs: "10 Mil", total: "$30,000 + platform fee + taxes" },
                    { name: "Gravitec", cost: "$1,000 / month", subs: "10 Mil", total: "$120,000 + taxes" },
                    { name: "Notix", cost: "$1,000 / Month", subs: "10 Mil", total: "$10,000 + taxes" },
                  ].map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b ${
                        isDarkMode 
                          ? "border-white/5 text-slate-300 hover:bg-white/[0.02]" 
                          : "border-slate-200 text-slate-900 hover:bg-slate-50 font-bold"
                      }`}
                    >
                      <td className="p-3 font-extrabold">{row.name}</td>
                      <td className="p-3 text-right font-mono text-indigo-700 dark:text-indigo-400 font-extrabold">{row.cost}</td>
                      <td className="p-3 text-right font-semibold">{row.subs}</td>
                      <td className="p-3 text-right text-rose-700 dark:text-rose-450 font-mono font-extrabold">{row.total}</td>
                    </tr>
                  ))}
                  {/* PushMasterr Row */}
                  <tr className={`border-none ${isDarkMode ? "bg-emerald-500/10 animate-pulse" : "bg-emerald-500/15 border-2 border-emerald-500"}`}>
                    <td className="p-4 rounded-l-2xl font-black text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                      ★ PushMasterr (PushMasterr.com)
                    </td>
                    <td className="p-4 text-right font-mono text-emerald-800 dark:text-emerald-400 font-black leading-tight">
                      $0 Unlimited
                    </td>
                    <td className="p-4 text-right text-emerald-800 dark:text-emerald-400 font-black">
                      Unlimited Quota
                    </td>
                    <td className="p-4 text-right rounded-r-2xl text-emerald-800 dark:text-emerald-400 font-mono font-black text-sm">
                      $499 One-Time (Lifetime!)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={`p-4 rounded-xl border flex items-start gap-2.5 text-xs leading-relaxed ${
              isDarkMode ? "bg-[#0A0D14]/80 border-white/5 text-slate-300" : "bg-emerald-50/70 border-emerald-300/30 text-slate-855"
            }`}>
              <div className="text-xl shrink-0">💡</div>
              <div className={isDarkMode ? "text-slate-300" : "text-slate-800 font-extrabold text-[12.5px]"}>
                <span className="font-extrabold text-emerald-600 block text-sm">Your Estimated Cost Savings:</span>
                Do the math yourself! Traditional services command over <strong className="text-emerald-600 font-black">$30,000 annually</strong> for managing 10 Million active subscribers. Switch to PushMasterr and unlock perpetual self-hosted broadcasts for as low as a <strong className="text-emerald-600 font-black">one-time flat license of $499</strong>. Save thousands of dollars every single year with zero subscriber scale taxes!
              </div>
            </div>

          </div>

          {/* EXCLUSIVE DETAILED PLAN COMPARISON MATRIX - MATCHING SCREENSHOT 1 */}
          <div className={`max-w-4xl mx-auto rounded-3xl border p-6 ${
            isDarkMode ? "bg-[#111319] border-white/5 text-white" : "bg-white border-slate-350 shadow-xl text-slate-900"
          } space-y-5 overflow-hidden`}>
            
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-indigo-500/10 text-indigo-500 px-3 py-1 rounded-full border border-indigo-500/20 font-black">
                📊 DETAILED LICENSE SPECIFICATION
              </span>
              <h3 className={`text-xl md:text-2xl font-black ${isDarkMode ? "text-white" : "text-indigo-950 font-black"}`}>
                Plan Specific Feature Comparison Page
              </h3>
              <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-700 font-semibold"}`}>
                Detailed breakdown of exact enterprise-level features included with each one-time payment license plan.
              </p>
            </div>

            {/* Matrix comparison table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={`border-b ${isDarkMode ? "border-white/5 text-slate-205 bg-white/5" : "border-slate-200 text-slate-950 bg-slate-100"}`}>
                    <th className="p-3 font-black uppercase text-[10px] tracking-wider w-[40%]">Capability / Feature</th>
                    <th className="p-3 font-black uppercase text-[10px] tracking-wider text-center bg-indigo-500/5 text-indigo-700 dark:text-indigo-400 font-black">Startup Lifetime <span className="block text-[9px] font-mono font-bold text-indigo-800 dark:text-indigo-300">₹41,500 ($499)</span></th>
                    <th className="p-3 font-black uppercase text-[10px] tracking-wider text-center bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 font-black font-extrabold">Pro Lifetime <span className="block text-[9px] font-mono font-bold text-emerald-800 dark:text-emerald-350">₹66,050 ($799)</span></th>
                    <th className="p-3 font-black uppercase text-[10px] tracking-wider text-center text-rose-700 dark:text-rose-450 font-bold">Competitors<span className="block text-[9px] font-mono">(Onesignal/etc)</span></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feat: "Unlimited Connected Domains", startup: "✓ Included", pro: "★ Included", other: "X Pay per Domain" },
                    { feat: "Unlimited Subscribers list size", startup: "✓ Unlimited Slots", pro: "★ Unlimited Slots", other: "X Hard tier caps" },
                    { feat: "Customisable Prompt Panel", startup: "✓ Fully Included", pro: "★ Fully Included", other: "✓ Basic layout" },
                    { feat: "Project Cloning & Retargeting", startup: "✓ Included", pro: "★ Included", other: "X Enterprise only" },
                    { feat: "Campaign Delivery Analytics", startup: "✓ Basic insights", pro: "★ Advance Analytics", other: "✓ Checked logs" },
                    { feat: "Developer API & Secure Sync", startup: "X Not included", pro: "★ Full API support", other: "X Extra charges" },
                    { feat: "Twin-Node High Speed Push engines", startup: "X Standard delivery", pro: "★ Dual-node Turbo Speed", other: "X Not available" },
                    { feat: "Anti-Spam Link Safety crawler", startup: "X Not included", pro: "★ Included", other: "X Not available" },
                    { feat: "Priority Customer chat Support SLA", startup: "Standard Email SLA", pro: "★ 24/7 Slack & VIP Call", other: "Slow tick queues" },
                    { feat: "EMIs & Lifetime Guarantee", startup: "✓ Standard Guarded", pro: "★ VIP SLA Covered", other: "X Termed monthly" },
                  ].map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b ${
                        isDarkMode 
                          ? "border-white/5 text-slate-300 hover:bg-white/[0.02]" 
                          : "border-slate-200 text-slate-900 hover:bg-slate-50 font-bold"
                      }`}
                    >
                      <td className="p-3 font-extrabold leading-tight text-slate-800 dark:text-slate-200">{row.feat}</td>
                      <td className="p-3 text-center font-extrabold text-indigo-800 dark:text-indigo-400 bg-indigo-500/5">{row.startup}</td>
                      <td className="p-3 text-center font-black text-emerald-800 dark:text-emerald-400 bg-emerald-500/5">{row.pro}</td>
                      <td className="p-3 text-center text-rose-700 dark:text-rose-400 font-extrabold">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Rapid direct checkout select CTA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <button
                type="button"
                onClick={() => handleButtonClickEffect("compare-buy-startup", () => handleAddToCart(lifetimePlans[0]))}
                className={`py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs cursor-pointer transition-all hover:scale-[1.01] text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/20`}
              >
                <span>Select Startup Lifetime License (₹41,500)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleButtonClickEffect("compare-buy-pro", () => handleAddToCart(lifetimePlans[1]))}
                className={`py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs cursor-pointer transition-all hover:scale-[1.01] text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20`}
              >
                <span>★ Select Pro Lifetime License (₹66,050)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Coupon / Promo info helper banner */}
          <div className={`p-4 rounded-2xl border flex items-center gap-3 text-xs leading-relaxed ${
            isDarkMode ? "bg-indigo-500/10 border-indigo-500/15 text-indigo-200" : "bg-indigo-50 border-indigo-300 text-indigo-800 font-semibold shadow-sm"
          }`}>
            <Percent className="w-5 h-5 shrink-0 text-indigo-500 animate-bounce" />
            <div>
              <span className="font-black text-indigo-600">Special License Promo Code Active!</span> Apply coupon code <code className="bg-indigo-500/15 border border-indigo-500/20 px-1.5 py-0.5 rounded font-black font-mono text-[10.5px] select-all">FLASH50</code> at checkout to unlock an instant 50% discount on either Startup or Pro Lifetime License! Enjoy premium control for half-price!
            </div>
          </div>
        </motion.div>
      )}

      {/* SECURE BILLING & TRANSACTION HUB (Always visible below the rate card) */}
      {selectedPlan && !txnSuccess && (
        <div id="secure-checkout-section" className="pt-12 border-t border-dashed border-slate-200/50 dark:border-white/5 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-3 pb-2">
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3.5 py-1.5 rounded-full font-black uppercase tracking-wider">
              🔒 SECURE TRANSACTION GATEWAY
            </span>
            <h2 className={`text-xl md:text-2xl font-black tracking-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              Direct Checkout & Billing Hub
            </h2>
            <p className={`text-xs ${isDarkMode ? "text-slate-400" : "text-slate-705 font-bold"} leading-relaxed`}>
              Validate your selection and process payments cleanly. Enjoy perpetual software ownership with zero recurring subscriber traps.
            </p>

            {/* Premium Interactive Back / Deselect selection button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedPlan(null);
                  setTimeout(() => {
                    const el = document.getElementById("saas-pricing-header");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }, 50);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold cursor-pointer transition-all duration-200 hover:scale-102 border shadow-sm ${
                  isDarkMode 
                    ? "bg-[#161920]/80 border-white/5 text-slate-300 hover:text-white hover:bg-[#1C202B]/90 focus:ring-1 focus:ring-indigo-500/50" 
                    : "bg-white border-slate-205/60 text-slate-700 hover:text-slate-900 hover:bg-slate-50 focus:ring-1 focus:ring-indigo-500/25"
                }`}
              >
                <span>← Change / Deselect Plan & View Billing Grid</span>
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* LEFT COLUMN: Checkout Details and Promo applying (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Cart overview summary card */}
              <div className={`p-5 rounded-2xl border ${
                isDarkMode ? "bg-[#161920] border-white/5 text-slate-200" : "bg-white border-slate-200 text-slate-800 shadow-md"
              }`}>
              <h3 className={`text-sm font-black border-b border-dashed border-slate-300/20 pb-2 mb-3 ${isDarkMode ? "text-white" : "text-slate-950"}`}>
                SaaS Cart Invoice Details
              </h3>
              <div className="space-y-3.5 text-xs">
                
                {/* Base tier */}
                <div className="flex justify-between items-center">
                  <span className={`font-black ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>{selectedPlan.name} License</span>
                  <div className="text-right">
                    <div className={`font-mono font-bold ${isDarkMode ? "text-white" : "text-slate-950 lg:text-sm"}`}>₹{(selectedPlan.priceINR || selectedPlan.price).toLocaleString()}</div>
                    <div className={`text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-600 font-bold"} font-mono`}>${selectedPlan.priceUSD || Math.round(selectedPlan.price / 83)} USD</div>
                  </div>
                </div>

                {/* Optional Add-on info */}
                {includePremiumAddon && (
                  <div className={`flex justify-between items-center pt-2.5 border-t border-dashed ${isDarkMode ? "border-white/5 text-teal-400" : "border-slate-300 text-indigo-950 font-bold"}`}>
                    <span className="font-extrabold">🎁 Premium optional addon</span>
                    <div className="text-right">
                      <div className="font-mono font-black">₹33,000</div>
                      <div className={`text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-600 font-bold"} font-mono`}>$399 USD</div>
                    </div>
                  </div>
                )}

                <div className={`flex justify-between items-center text-[11px] ${isDarkMode ? "text-slate-400" : "text-slate-700 font-bold"}`}>
                  <span>Connected app slots</span>
                  <span>Unlimited ready</span>
                </div>

                {/* Coupons box */}
                <form onSubmit={applyCoupon} className="pt-2 border-t border-dashed border-slate-200/20">
                  <label className={`block text-[10px] font-black uppercase tracking-widest mb-1.5 ${isDarkMode ? "text-slate-400" : "text-slate-700"}`}>
                    Apply Coupon Code (Test FLASH50)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="e.g. FLASH50"
                      className={`w-full text-xs font-black font-mono uppercase rounded-lg p-2.5 focus:outline-none focus:ring-1 ${
                        isDarkMode 
                          ? "bg-[#0D0F14]/70 border-white/5 text-white focus:border-indigo-500 focus:ring-indigo-500/30" 
                          : "bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20"
                      }`}
                    />
                    <button
                      type="submit"
                      onClick={() => handleButtonClickEffect("btn-apply-promo")}
                      className={`text-xs font-black px-4 py-2.5 rounded-lg cursor-pointer transition-all ${
                        lastClickedButtonId === "btn-apply-promo"
                          ? "bg-amber-500 text-slate-950 scale-95 border border-amber-400 font-extrabold"
                          : "bg-indigo-600 hover:bg-indigo-500 text-white"
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && <p className="text-[10px] text-rose-500 mt-1.5 font-black">{promoError}</p>}
                  {promoSuccess && <p className="text-[10px] text-emerald-500 mt-1.5 font-black">{promoSuccess}</p>}
                </form>

                {/* Final calculations layout */}
                <div className={`pt-3 border-t border-dashed ${isDarkMode ? "border-white/5" : "border-slate-300"} space-y-2.5`}>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className={isDarkMode ? "text-slate-400" : "text-slate-800"}>Base Price Subtotal</span>
                    <div className="text-right">
                      <div className="font-mono">₹{originalPrice.toLocaleString()}</div>
                      <div className="text-[9px] text-slate-500 font-mono">${originalUSD.toLocaleString()} USD</div>
                    </div>
                  </div>
                  {discountPercent > 0 && (
                     <div className="flex justify-between items-center text-[11px] text-emerald-500 font-black mb-1">
                      <span>Discount Coupon ({discountPercent}%)</span>
                      <div className="text-right">
                        <div className="font-mono">-₹{discountAmt.toLocaleString()}</div>
                        <div className="text-[9px] text-emerald-450 font-mono">-${discountAmtUSD.toLocaleString()} USD</div>
                      </div>
                    </div>
                  )}
                  <div className={`flex justify-between items-center pt-2.5 border-t border-slate-200/20 font-black`}>
                    <div className="flex flex-col">
                      <span className={isDarkMode ? "text-white" : "text-slate-950"}>Final Amount due</span>
                      <span className="text-[9.5px] uppercase text-emerald-700 dark:text-emerald-400 tracking-wider">Secure Payment Gateway</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-indigo-700 dark:text-indigo-400 text-lg font-black block">₹{finalPrice.toLocaleString()}</span>
                      <span className="font-mono text-slate-500 text-[10.5px] block font-extrabold">${finalPriceUSD.toLocaleString()} USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Highly Polished AI PayHub Checkout Page (7 columns) - Matching Screenshot */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* AI PayHub Layout Box */}
            <div className="bg-[#0D0F14] text-white border border-white/10 rounded-[28px] p-6 shadow-2xl relative overflow-hidden font-sans select-none my-payhub-box">
              
              {/* Top ambient glow bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-indigo-500 to-purple-600" />

              {/* Header section identical to screenshot */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 flex items-center justify-center font-bold text-xs shadow-md shadow-teal-400/20 text-slate-950">
                    AI
                  </div>
                  <div>
                    <h1 className="text-sm font-extrabold tracking-wide uppercase text-teal-400">PayHub SaaS</h1>
                    <p className="text-[8px] text-slate-400 font-semibold tracking-wider flex items-center gap-1 uppercase">
                      <Lock className="w-2.5 h-2.5 text-teal-400" />
                      Secure Checkout Page
                    </p>
                  </div>
                </div>
                
                <span className="text-[8px] bg-slate-800 text-teal-400 border border-teal-500/20 px-2.5 py-1 rounded-full font-mono font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-teal-400 animate-ping" />
                  Live Platform Payment
                </span>
              </div>

              {/* Dynamic Amount Due - Inspired by screenshot */}
              <div className="space-y-1 mb-6 text-center sm:text-left">
                <p className="text-[10px] uppercase font-bold text-slate-450 tracking-widest italic">Amount due</p>
                <div className="flex items-baseline justify-center sm:justify-start gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold tracking-tight text-teal-450 font-mono">
                    ₹{finalPrice.toLocaleString()}.00
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">INR</span>
                </div>
                <p className="text-[9px] text-slate-500 font-mono font-semibold">
                  Order #INV-2026-{selectedPlan.price === 4999 ? "1247" : String((selectedPlan.price * 3) % 9000 + 1000)}
                </p>
              </div>

              {/* Payment Methods selector row 1 - Inspired by screenshot */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[8px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 font-mono">
                    Select Gateway Payment Method
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => handlePaymentModeClick("upi", "mode-upi")}
                      className={`py-2 px-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMode === "upi" && activePaymentBtnId === "mode-upi"
                          ? "bg-teal-500/15 text-teal-400 border-teal-450 shadow-md shadow-teal-400/10 scale-95"
                          : activePaymentBtnId === "mode-upi"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500 font-extrabold scale-95"
                          : "bg-[#161920]/60 text-slate-400 border-white/5 hover:text-white"
                      }`}
                    >
                      <Wallet className="w-3.5 h-3.5" />
                      UPI Nodes
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePaymentModeClick("card", "mode-card")}
                      className={`py-2 px-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMode === "card" && activePaymentBtnId === "mode-card"
                          ? "bg-teal-500/15 text-teal-400 border-teal-450 shadow-md shadow-teal-400/10 scale-95"
                          : activePaymentBtnId === "mode-card"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500 font-extrabold scale-95"
                          : "bg-[#161920]/60 text-slate-400 border-white/5 hover:text-white"
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePaymentModeClick("netbank", "mode-netbank")}
                      className={`py-2 px-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMode === "netbank" && activePaymentBtnId === "mode-netbank"
                          ? "bg-teal-500/15 text-teal-400 border-teal-450 shadow-md shadow-teal-400/10 scale-95"
                          : activePaymentBtnId === "mode-netbank"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500 font-extrabold scale-95"
                          : "bg-[#161920]/60 text-slate-400 border-white/5 hover:text-white"
                      }`}
                    >
                      <Building className="w-3.5 h-3.5" />
                      NetBanking
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePaymentModeClick("wallet", "mode-wallet")}
                      className={`py-2 px-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                        paymentMode === "wallet" && activePaymentBtnId === "mode-wallet"
                          ? "bg-teal-500/15 text-teal-400 border-teal-450 shadow-md shadow-teal-400/10 scale-95"
                          : activePaymentBtnId === "mode-wallet"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500 font-extrabold scale-95"
                          : "bg-[#161920]/60 text-slate-400 border-white/5 hover:text-white"
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Wallets
                    </button>
                  </div>
                </div>

                {/* Sub row UPI providers buttons identical to screenshot */}
                {paymentMode === "upi" && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="space-y-3"
                  >
                    <label className="block text-[8px] font-bold uppercase tracking-widest text-slate-400 font-mono">
                      Select UPI App Provider Target
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => handleUPIBrandClick("gpay", "btn-upi-gpay")}
                        className={`py-2 px-1 rounded-lg text-[9px] font-extrabold border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          upiSubBrand === "gpay" && activePaymentBtnId === "btn-upi-gpay"
                            ? "bg-teal-500/15 text-teal-400 border-teal-400 shadow-sm scale-95"
                            : activePaymentBtnId === "btn-upi-gpay"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500 font-extrabold scale-95"
                            : "bg-[#161920]/60 text-slate-400 border-white/5 hover:text-white"
                        }`}
                      >
                        🔵 GPay
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUPIBrandClick("phonepe", "btn-upi-phonepe")}
                        className={`py-2 px-1 rounded-lg text-[9px] font-extrabold border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          upiSubBrand === "phonepe" && activePaymentBtnId === "btn-upi-phonepe"
                            ? "bg-teal-500/15 text-teal-400 border-teal-400 shadow-sm scale-95"
                            : activePaymentBtnId === "btn-upi-phonepe"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500 font-extrabold scale-95"
                            : "bg-[#161920]/60 text-slate-400 border-white/5 hover:text-white"
                        }`}
                      >
                        🟣 PhonePe
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUPIBrandClick("paytm", "btn-upi-paytm")}
                        className={`py-2 px-1 rounded-lg text-[9px] font-extrabold border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          upiSubBrand === "paytm" && activePaymentBtnId === "btn-upi-paytm"
                            ? "bg-teal-500/15 text-teal-400 border-teal-400 shadow-sm scale-95"
                            : activePaymentBtnId === "btn-upi-paytm"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500 font-extrabold scale-95"
                            : "bg-[#161920]/60 text-slate-400 border-white/5 hover:text-white"
                        }`}
                      >
                        🔵 Paytm
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUPIBrandClick("bhim", "btn-upi-bhim")}
                        className={`py-2 px-1 rounded-lg text-[9px] font-extrabold border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          upiSubBrand === "bhim" && activePaymentBtnId === "btn-upi-bhim"
                            ? "bg-teal-500/15 text-teal-400 border-teal-400 shadow-sm scale-95"
                            : activePaymentBtnId === "btn-upi-bhim"
                            ? "bg-amber-500/10 text-amber-500 border-amber-500 font-extrabold scale-95"
                            : "bg-[#161920]/60 text-slate-400 border-white/5 hover:text-white"
                        }`}
                      >
                        🟢 BHIM
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Gateway Specific Input Forms with high fidelity parameters */}
                <form onSubmit={executeSaaSPurchase} className="pt-2">
                  <div className={`p-4 rounded-xl border ${isDarkMode ? "bg-[#161920]/30 border-white/5" : "bg-[#161920]/50 border-white/10"}`}>
                    {paymentMode === "upi" ? (
                      <div className="space-y-3">
                        <label className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest font-mono">
                          Enter your VPA / UPI ID Address
                        </label>
                        <input
                          type="text"
                          value={upiVpa}
                          onChange={(e) => setUpiVpa(e.target.value)}
                          placeholder="e.g. pushmaster@okaxis"
                          className="w-full text-xs font-mono font-bold bg-[#0D0F14] border border-white/10 focus:border-teal-400 rounded-lg p-2.5 text-white placeholder-slate-600 focus:outline-none"
                          required
                        />
                        <span className="text-[8px] text-slate-500 italic">Example: UPI PIN auth requested post dispatch trigger</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest font-mono mb-1">Cardholder Name</label>
                            <input
                              type="text"
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value)}
                              placeholder="e.g. Push Master"
                              className="w-full text-xs font-semibold bg-[#0D0F14] border border-white/10 focus:border-teal-400 rounded-lg p-2 text-white focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest font-mono mb-1">16-Digit Card Number</label>
                            <input
                              type="text"
                              maxLength={16}
                              value={cardNo}
                              onChange={(e) => setCardNo(e.target.value)}
                              placeholder="4111 2222 3333 4444"
                              className="w-full text-xs font-mono bg-[#0D0F14] border border-white/10 focus:border-teal-400 rounded-lg p-2 text-white focus:outline-none"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest font-mono mb-1">Expiry Date (MM/YY)</label>
                            <input
                              type="text"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="09/28"
                              className="w-full text-xs font-mono bg-[#0D0F14] border border-white/10 focus:border-teal-400 rounded-lg p-2 text-white focus:outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest font-mono mb-1">CVV Security Code</label>
                            <input
                              type="password"
                              maxLength={3}
                              value={cardCVV}
                              onChange={(e) => setCardCVV(e.target.value)}
                              placeholder="•••"
                              className="w-full text-xs font-mono bg-[#0D0F14] border border-white/10 focus:border-teal-400 rounded-lg p-2 text-white focus:outline-none"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit CTA - Large button similar to screenshot */}
                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      onClick={() => handleButtonClickEffect("btn-pay-hub-submit")}
                      className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        isProcessing
                          ? "bg-slate-800 text-teal-400 border border-teal-500/20"
                          : activePaymentBtnId === "btn-pay-hub-submit"
                          ? "bg-amber-500 hover:bg-amber-500 text-slate-950 border border-amber-400 font-extrabold scale-95 shadow-amber-500/30"
                          : "bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold shadow-teal-400/20 hover:scale-[1.01]"
                      }`}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>Processing Secure Payment Token...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <span>Pay ₹{finalPrice.toLocaleString()} Securely</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  </div>
                </form>

                {/* Secure Gateway Footer - Styled exactly as screenshot */}
                <div className="flex flex-col items-center justify-center gap-1.5 opacity-85 border-t border-white/5 pt-4 text-[9px] font-mono tracking-widest uppercase text-slate-450">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                      🛡️ SECURED BY RAZORPAY GATEWAY
                    </span>
                  </div>
                  <div className="flex items-center gap-2 opacity-50 text-[8px]">
                    <span>VISA</span> • <span>MASTERCARD</span> • <span>UPI INTENT</span> • <span>RUPAY</span> • <span>CREDIT CARD</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </motion.div>
        </div>
      )}

      {/* Payment Success Invoice Receipt Popup Screen */}
      {txnSuccess && selectedPlan && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-6 md:p-8 rounded-3xl border text-center space-y-5 max-w-md mx-auto shadow-2xl transition-all ${
            isDarkMode ? "bg-slate-900 border-indigo-500/20 text-white" : "bg-white border-slate-200 text-slate-800"
          }`}
        >
          <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h3 className={`text-base md:text-lg font-bold ${isDarkMode ? "text-white" : "text-slate-950"}`}>
              Payment Authorized Successfully!
            </h3>
            <p className="text-xs text-slate-400 font-medium">Thank you! Your PushMasterr.com plan has been upgraded.</p>
          </div>

          <div className={`p-4 rounded-xl text-left text-xs font-semibold font-mono space-y-2 border ${
            isDarkMode ? "bg-[#161920]/60 border-white/5" : "bg-slate-50 border-slate-200/50"
          }`}>
            <div className="flex justify-between text-slate-500 text-[10px]">
              <span>TRANSACTION ID</span>
              <span className="text-slate-400 font-bold select-all">{generatedTxnId}</span>
            </div>
            <div className="flex justify-between text-[11px] pt-1">
              <span className="text-slate-500">SUBSCRIBED PLAN</span>
              <span className={isDarkMode ? "text-white" : "text-slate-900"}>{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">PAID AMOUNT</span>
              <span className="text-indigo-500 font-extrabold">₹{finalPrice.toLocaleString()} INR</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-500">PAYMENT NODE</span>
              <span className="text-slate-400 font-extrabold uppercase">PayHub SSL Verified</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic">Connected API token has been rolled and upgraded with infinite subscribers dispatch priority.</p>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleButtonClickEffect("btn-succ-download", () => {
                alert(`Downloaded SaaS Receipt: Invoice ${generatedTxnId} - ₹${finalPrice}`);
              })}
              className={`py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer border ${
                lastClickedButtonId === "btn-succ-download"
                  ? "bg-amber-500 text-slate-950 border border-amber-400 font-extrabold scale-95"
                  : "bg-white/5 hover:bg-white/10 text-slate-200 border-white/10"
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              Download Receipt Invoice PDF
            </button>
            
            <button
              onClick={() => {
                setCheckoutStep("rates");
                setSelectedPlan(null);
                setTxnSuccess(false);
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 px-4 rounded-xl text-xs font-extrabold cursor-pointer"
            >
              Back to Rates Dashboard
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
