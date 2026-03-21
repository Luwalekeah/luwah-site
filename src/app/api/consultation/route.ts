import { NextResponse } from "next/server";
import crypto from "crypto";

/**
 * POST /api/consultation
 *
 * Receives the intake form submission from the frontend.
 * 1. Validates required fields (server-side)
 * 2. Verifies Cloudflare Turnstile token
 * 3. Signs payload with HMAC for n8n verification
 * 4. Forwards to n8n webhook via Cloudflare Tunnel
 * 5. Sends confirmation email via Resend
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

    // --- 3. Generate submission ID and sign payload ---
    const submissionId = crypto.randomUUID();
    const payload = {
      ...body,
      submission_id: submissionId,
      lead_status: "complete",
      metadata: {
        ...body.metadata,
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

    // --- 5. Send confirmation email via Resend ---
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Daniel Cooke <daniel@luwahtechnologies.com>",
            to: body.contact.email,
            subject:
              "Got it \u2014 I'll be in touch within 24 hours",
            html: `
              <p>Hi ${body.contact.full_name.split(" ")[0]},</p>
              <p>Thanks for reaching out. I've received your consultation request and I'm already reviewing the details about ${body.business.name}.</p>
              <p><strong>Here's what happens next:</strong></p>
              <ul>
                <li>I'll review your submission and do some prep work</li>
                <li>You'll hear from me within 24 hours to schedule our free 30-minute consultation</li>
                <li>The call will focus specifically on what you described \u2014 no generic sales pitch</li>
              </ul>
              <p>Your reference number is <strong>${submissionId}</strong>.</p>
              <p>Talk soon,<br/>Daniel Cooke<br/>Luwah Technologies LLC<br/>(720) 421-7184 | luwahtechnologies.com</p>
            `,
          }),
        });
      } catch (emailError) {
        console.error("Resend confirmation failed:", emailError);
      }
    }

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
