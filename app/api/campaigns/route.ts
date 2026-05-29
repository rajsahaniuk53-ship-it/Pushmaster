import { NextRequest, NextResponse } from "next/server";

// Simple in-memory server database for active demo logs/campaigns so it works in the container context
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
  workspace?: string;
}

// Global server memory node logic
let serverCampaigns: Campaign[] = [
  {
    id: "camp-001",
    title: "⚡ Flash Cyber Sale: 70% Off",
    body: "Only 2 hours remaining to claim your VIP developer workspace discount!",
    badge: "deals",
    image: "https://picsum.photos/seed/promo/800/400",
    actionButtons: ["Claim Discount", "Remind Me"],
    sentAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    clicks: 142,
    impressions: 480,
    segment: "high-value-users",
    ctr: 29.58,
    antiChurnDelayed: false,
    workspace: "Prod Workspace - ECommerce"
  },
  {
    id: "camp-002",
    title: "🤖 AI Assistant Ready to Build",
    body: "Your new workspace is primed and compiled. Check progress now.",
    badge: "updates",
    actionButtons: ["Launch", "Snooze"],
    sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    clicks: 89,
    impressions: 210,
    segment: "all-subscribers",
    ctr: 42.38,
    antiChurnDelayed: true,
    workspace: "Blog Workspace - Devs"
  },
  {
    id: "camp-003",
    title: "🚀 App Launch Announcement!",
    body: "The new premium mobile companion is officially live on the App Store now.",
    badge: "updates",
    actionButtons: ["Download App", "Dismiss"],
    sentAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    clicks: 432,
    impressions: 1100,
    segment: "all-subscribers",
    ctr: 39.27,
    antiChurnDelayed: false,
    workspace: "Saas App - Alpha Platform"
  }
];

export async function GET() {
  return NextResponse.json(serverCampaigns);
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { title, body, badge, image, actionButtons, segment, antiChurnDelayed, workspace } = payload;

    if (!title || !body) {
      return NextResponse.json({ error: "Title and body are required fields." }, { status: 400 });
    }

    const newCampaign: Campaign = {
      id: `camp-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      body,
      badge: badge || "general",
      image: image || undefined,
      actionButtons: actionButtons || [],
      sentAt: new Date().toISOString(),
      clicks: 0,
      impressions: segment === "high-value-users" ? 310 : segment === "cart-abandoners" ? 120 : 540,
      segment: segment || "all-subscribers",
      ctr: 0,
      antiChurnDelayed: !!antiChurnDelayed,
      workspace: workspace || "Prod Workspace - ECommerce"
    };

    serverCampaigns = [newCampaign, ...serverCampaigns];
    return NextResponse.json(newCampaign, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to log campaign text." }, { status: 500 });
  }
}
