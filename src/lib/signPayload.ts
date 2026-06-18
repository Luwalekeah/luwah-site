import "server-only";
import crypto from "crypto";

/**
 * HMAC-signs a payload for n8n to verify authenticity.
 * Fails closed: signing with an empty key produces a signature any attacker
 * could forge, so a missing secret must throw rather than sign with "".
 */
export function signPayload(payload: unknown): string {
  const secret = process.env.WEBHOOK_HMAC_SECRET;
  if (!secret) throw new Error("WEBHOOK_HMAC_SECRET is not set");
  return crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("hex");
}
