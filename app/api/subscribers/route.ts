import { NextRequest, NextResponse } from "next/server";

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
  workspace?: string;
}

let serverSubscribers: Subscriber[] = [
  {
    id: "sub-101",
    endpoint: "https://fcm.googleapis.com/fcm/send/f_c_m_device_token_01",
    browser: "Chrome",
    os: "Android",
    country: "India",
    subscribedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["high-value-users"],
    status: "active",
    timezone: "IST",
    workspace: "Prod Workspace - ECommerce"
  },
  {
    id: "sub-102",
    endpoint: "https://updates.safari.apple.com/send/safari_tok_9918",
    browser: "Safari",
    os: "iOS",
    country: "USA",
    subscribedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["cart-abandoners"],
    status: "active",
    timezone: "EST",
    workspace: "Prod Workspace - ECommerce"
  },
  {
    id: "sub-102-b",
    endpoint: "https://fcm.googleapis.com/fcm/send/shopify_user_0093",
    browser: "Chrome",
    os: "macOS",
    country: "India",
    subscribedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["high-value-users"],
    status: "active",
    timezone: "IST",
    workspace: "Prod Workspace - ECommerce"
  },
  {
    id: "sub-103",
    endpoint: "https://wns.windows.com/send/win_client_9281_f",
    browser: "Edge",
    os: "Windows",
    country: "Germany",
    subscribedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["high-value-users"],
    status: "active",
    timezone: "CET",
    workspace: "Blog Workspace - Devs"
  },
  {
    id: "sub-103-b",
    endpoint: "https://fcm.googleapis.com/fcm/send/dev_reader_3948",
    browser: "Firefox",
    os: "Linux",
    country: "USA",
    subscribedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["high-value-users"],
    status: "active",
    timezone: "PST",
    workspace: "Blog Workspace - Devs"
  },
  {
    id: "sub-104",
    endpoint: "https://fcm.googleapis.com/fcm/send/f_c_m_token_ghost_02",
    browser: "Firefox",
    os: "macOS",
    country: "UK",
    subscribedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    tags: [],
    status: "ghost",
    timezone: "GMT",
    workspace: "Saas App - Alpha Platform"
  },
  {
    id: "sub-105",
    endpoint: "https://fcm.googleapis.com/fcm/send/mobile_app_inst_4938",
    browser: "Chrome",
    os: "Android",
    country: "India",
    subscribedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ["high-value-users"],
    status: "active",
    timezone: "IST",
    workspace: "Saas App - Alpha Platform"
  }
];

export async function GET() {
  return NextResponse.json(serverSubscribers);
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { id, browser, os, country, tags, timezone, status, workspace } = payload;

    const newSub: Subscriber = {
      id: id || `sub-${Math.floor(100 + Math.random() * 900)}`,
      endpoint: `https://fcm.googleapis.com/send/simulated_${Math.random().toString(36).substring(7)}`,
      browser: browser || "Chrome",
      os: os || "macOS",
      country: country || "India",
      subscribedAt: new Date().toISOString(),
      tags: tags || [],
      status: status || "active",
      timezone: timezone || "IST",
      workspace: workspace || "Prod Workspace - ECommerce"
    };

    serverSubscribers = [...serverSubscribers, newSub];
    return NextResponse.json(newSub, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to subscribe device." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  // Update subscription or prune ghost subscribers
  try {
    const { action, id } = await req.json();
    if (action === "prune") {
      // Remove stale ghost subscribers
      const initialCount = serverSubscribers.length;
      serverSubscribers = serverSubscribers.filter(sub => sub.status !== "ghost");
      const prunedCount = initialCount - serverSubscribers.length;
      return NextResponse.json({ success: true, prunedCount });
    } else if (action === "toggleMuted") {
      serverSubscribers = serverSubscribers.map(sub => {
        if (sub.id === id) {
          return { ...sub, status: sub.status === "muted" ? "active" : "muted" };
        }
        return sub;
      });
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Operation failed." }, { status: 500 });
  }
}
