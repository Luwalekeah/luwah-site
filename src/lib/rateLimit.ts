import "server-only";

/**
 * In-memory fixed-window rate limiter.
 *
 * Tradeoff: state lives in this process only. It resets on deploy and is not
 * shared across instances. That is acceptable here because the site runs as a
 * single Render instance, and this layer sits behind Cloudflare and Turnstile.
 * If the app scales to multiple instances, move this to Upstash Redis or
 * Cloudflare Rate Limiting and keep the same call signature.
 */
interface Window {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Window>();

// Periodic cleanup so abandoned keys do not grow the map without bound.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, win] of buckets) {
    if (win.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfter: number; // seconds until the window resets
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const win = buckets.get(key);
  if (!win || win.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  win.count += 1;
  if (win.count > limit) {
    return { allowed: false, retryAfter: Math.ceil((win.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfter: 0 };
}

/**
 * Derives a client key from the forwarded IP. Falls back to a constant so a
 * missing header still shares one bucket rather than bypassing the limit.
 */
export function clientKey(request: Request, scope: string): string {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  return `${scope}:${ip}`;
}
