import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.fullName || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Forward to n8n webhook with HMAC signature
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("N8N webhook URL not configured");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 }
      );
    }

    const payload = {
      submission_id: crypto.randomUUID(),
      lead_status: "complete",
      fullName: body.fullName,
      email: body.email,
      phone: "",
      preferred_contact: "Email",
      companyName: body.companyName || "",
      industry: "",
      pos: "",
      booking: "",
      accounting: "",
      message: body.message,
      help_areas: [],
      urgency: "",
      budget_range: "",
      referral_source: "",
      metadata: {
        submitted_at: new Date().toISOString(),
        ip_hash: crypto
          .createHash("sha256")
          .update(request.headers.get("x-forwarded-for") || "unknown")
          .digest("hex")
          .slice(0, 16),
        source: "contact-form",
      },
    };

    const hmacSecret = process.env.WEBHOOK_HMAC_SECRET || "";
    const signature = crypto
      .createHmac("sha256", hmacSecret)
      .update(JSON.stringify(payload))
      .digest("hex");

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": signature,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook responded with ${webhookResponse.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
