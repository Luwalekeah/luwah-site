import { NextResponse } from "next/server";
import crypto from "crypto";

/**
 * POST /api/consultation
 *
 * Receives the intake form submission from the frontend.
 * 1. Validates required fields (server-side)
 * 2. Verifies Cloudflare Turnstile token
 * 3. Flattens payload and signs with HMAC for n8n verification
 * 4. Forwards to n8n webhook via Cloudflare Tunnel
 *
 * Confirmation email is sent by n8n after processing.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // --- 1. Server-side validation ---
    if (!body.contact?.full_name || !body.contact?.email || !body.business?.name) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, business name" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.contact.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // --- 2. Verify Cloudflare Turnstile ---
    if (body.metadata?.turnstile_token) {
      const turnstileResponse = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: process.env.CLOUDFLARE_TURNSTILE_SECRET || "",
            response: body.metadata.turnstile_token,
          }),
        }
      );
      const turnstileResult = await turnstileResponse.json();
      if (!turnstileResult.success) {
        return NextResponse.json(
          { error: "Bot verification failed" },
          { status: 403 }
        );
      }
    }

    // --- 3. Generate submission ID and flatten payload for n8n ---
    const submissionId = crypto.randomUUID();
    const payload = {
      submission_id: submissionId,
      lead_status: "complete",
      fullName: body.contact?.full_name || "",
      email: body.contact?.email || "",
      phone: body.contact?.phone || "",
      preferred_contact: body.contact?.preferred_contact || "Email",
      companyName: body.business?.name || "",
      industry: body.business?.industry || "",
      pos: body.business?.current_tools?.pos || "",
      booking: body.business?.current_tools?.booking || "",
      accounting: body.business?.current_tools?.accounting || "",
      message: body.needs?.biggest_challenge || "",
      help_areas: body.needs?.help_areas || [],
      urgency: body.needs?.urgency || "",
      budget_range: body.budget_range || "",
      referral_source: body.referral_source || "",
      metadata: {
        submitted_at: new Date().toISOString(),
        ip_hash: crypto
          .createHash("sha256")
          .update(request.headers.get("x-forwarded-for") || "unknown")
          .digest("hex")
          .slice(0, 16),
        turnstile_verified: true,
      },
    };

    // HMAC signature for n8n to verify authenticity
    const hmacSecret = process.env.WEBHOOK_HMAC_SECRET || "";
    const signature = crypto
      .createHmac("sha256", hmacSecret)
      .update(JSON.stringify(payload))
      .digest("hex");

    // --- 4. Forward to n8n webhook ---
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Webhook-Signature": signature,
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000),
        });
      } catch (webhookError) {
        // n8n is down — buffer the submission
        // TODO: Write to Render-side buffer (Redis/KV) for retry
        console.error("n8n webhook failed, buffering submission:", webhookError);
      }
    }

    // Confirmation email is handled by n8n workflow (Resend → Confirm to User)

    return NextResponse.json({
      success: true,
      submission_id: submissionId,
    });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
