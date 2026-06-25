import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import crypto from "crypto";

/**
 * POST /api/revalidate
 *
 * Busts the Next.js cache so edits appear on the live site without a rebuild.
 * Two callers:
 *  1. A Sanity webhook on publish, sending a `{ _type, slug }` projection.
 *     The handler maps the document type to the pages that render it.
 *  2. n8n or any tool sending an explicit `{ path }`.
 *
 * Security: requires x-revalidation-secret header matching REVALIDATION_SECRET.
 * Set the same value as a custom header on the Sanity webhook.
 */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  // timingSafeEqual throws on length mismatch, so length-check first.
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

// Maps a changed document type to every route that renders it.
function pathsForType(type: string, slug?: string): string[] {
  switch (type) {
    case "siteSettings":
      return ["/", "/contact", "/services", "/pricing"];
    case "webCatalog":
      // The catalog drives the web-design page, the order form, and the
      // intake tier list. Refresh all when prices change.
      return ["/web-design", "/order", "/intake"];
    case "post":
      return slug ? ["/blog", `/blog/${slug}`] : ["/blog"];
    case "project":
      return slug ? ["/work", `/work/${slug}`] : ["/work"];
    case "review":
      // Approving or editing a review changes the reviews page and the
      // homepage testimonials marquee.
      return ["/reviews", "/"];
    case "guide":
      return slug ? ["/learn", `/learn/${slug}`] : ["/learn"];
    default:
      return [];
  }
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidation-secret") || "";
  const expected = process.env.REVALIDATION_SECRET;

  // Constant-time compare avoids leaking the secret via response timing.
  if (!expected || !safeEqual(secret, expected)) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));

  // Sanity webhook form: derive paths from the document type.
  if (typeof body._type === "string") {
    const slug = typeof body.slug === "string" ? body.slug : undefined;
    const paths = pathsForType(body._type, slug);
    paths.forEach((p) => revalidatePath(p));
    return NextResponse.json({ revalidated: true, paths, now: Date.now() });
  }

  // Explicit path form. Only accept an in-app absolute path.
  const path =
    typeof body.path === "string" && body.path.startsWith("/") ? body.path : "/work";
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, paths: [path], now: Date.now() });
}
