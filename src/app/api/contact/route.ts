import { NextResponse } from "next/server";

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

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Send notification email to you
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Luwah Technologies <hello@luwahtechnologies.com>",
        to: "hello@luwahtechnologies.com",
        subject: `New Contact Form: ${body.fullName}`,
        reply_to: body.email,
        html: `
          <div style="font-family: sans-serif; color: #333; max-width: 560px;">
            <h2 style="color: #1a1a1a; margin-bottom: 20px;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 90px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${body.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Company</td>
                <td style="padding: 8px 0; color: #1a1a1a;">${body.companyName || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; color: #1a1a1a;"><a href="mailto:${body.email}" style="color: #D4924F;">${body.email}</a></td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
              <p style="margin: 0 0 4px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; color: #1a1a1a; line-height: 1.6;">${body.message.replace(/\n/g, "<br/>")}</p>
            </div>
            <p style="margin-top: 24px; color: #aaa; font-size: 11px;">Sent from the Luwah Technologies contact form</p>
          </div>
        `,
      }),
    });

    // Send confirmation email to the sender
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Daniel Cooke <hello@luwahtechnologies.com>",
        to: body.email,
        subject: "Thanks for reaching out — Luwah Technologies",
        html: `
          <p>Hi ${body.fullName.split(" ")[0]},</p>
          <p>Thanks for getting in touch! I've received your message and will get back to you within 24 hours.</p>
          <p>In the meantime, feel free to check out some of our recent work at <a href="https://luwahtechnologies.com/work">luwahtechnologies.com/work</a>.</p>
          <p>Talk soon,<br/>Daniel Cooke<br/>Luwah Technologies LLC<br/>(720) 421-7184 | luwahtechnologies.com</p>
        `,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
