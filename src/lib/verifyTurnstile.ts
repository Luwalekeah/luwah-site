import "server-only";

/**
 * Centralizes Cloudflare Turnstile verification so every route fails closed
 * identically. Returns true only when Cloudflare confirms the token.
 * A missing secret or missing token blocks the request rather than passing it.
 */
export async function verifyTurnstile(token: unknown): Promise<boolean> {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET;
  // Fail closed: an unset secret must block, not silently skip the check.
  if (!secret) throw new Error("CLOUDFLARE_TURNSTILE_SECRET is not set");
  if (typeof token !== "string" || token.length === 0) return false;

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(10000), // never let verification hang the route
    }
  );
  const data = await res.json().catch(() => ({ success: false }));
  return data.success === true;
}
