import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization");
    const { title, body, badge, image, actionButtons, segment, bypassQuietHours } = await req.json();

    if (!title || !body) {
      return NextResponse.json(
        { error: "Bad Request. Required parameters missing: 'title', 'body'." },
        { status: 400 }
      );
    }

    // Direct simulation of authorization
    const isAuthorized = authHeader?.startsWith("Bearer sdk_live_") || authHeader?.includes("sdk_live_");
    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Unauthorized. Missing or invalid Bearer API token. Use the generated SDK key from integration panel." },
        { status: 401 }
      );
    }

    const payloadResponse = {
      success: true,
      transactionId: `tx-push-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
      queuedTargets: segment === "cart-abandoners" ? 1 : 4,
      parameters: {
        title,
        body,
        badge: badge || "bulletin",
        image: image || null,
        actionButtons: actionButtons || [],
        segment: segment || "all-subscribers"
      },
      quietHoursStatus: bypassQuietHours ? "bypassed" : "evaluated",
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(payloadResponse, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Service Error triggering push" },
      { status: 500 }
    );
  }
}
