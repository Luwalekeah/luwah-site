import "server-only";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Sends a notification email to the business via Resend. Used to alert on new
 * form submissions so you do not have to watch Studio.
 *
 * Never throws: a failed notification must not break the form response. If
 * RESEND_API_KEY is unset, it logs and skips.
 *
 * Env:
 *   RESEND_API_KEY    required to send
 *   NOTIFY_EMAIL_TO   recipient (default hello@luwahtechnologies.com)
 *   NOTIFY_EMAIL_FROM verified Resend sender (default notify@luwahtechnologies.com)
 */
export async function notifyEmail(subject: string, lines: string[]): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set; skipping email notification");
    return;
  }
  const to = process.env.NOTIFY_EMAIL_TO || "hello@luwahtechnologies.com";
  const from = process.env.NOTIFY_EMAIL_FROM || "Luwah Notifications <notify@luwahtechnologies.com>";

  const html =
    `<h2 style="font-family:sans-serif">${escapeHtml(subject)}</h2>` +
    lines.map((l) => `<p style="font-family:sans-serif;margin:4px 0">${escapeHtml(l)}</p>`).join("");
  const text = `${subject}\n\n${lines.join("\n")}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, html, text }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error("Resend notification failed:", res.status, await res.text().catch(() => ""));
    }
  } catch (err) {
    console.error("Resend notification error:", err);
  }
}
