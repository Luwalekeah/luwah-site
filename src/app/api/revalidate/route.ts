import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * POST /api/revalidate
 *
 * Called by n8n after it mutates Sanity.io data (e.g., incrementing
 * "Hours Saved" metrics on a case study). This busts the Next.js cache
 * so the updated numbers appear on the live site without a full rebuild.
 *
 * Security: Requires x-revalidation-secret header matching env variable.
 */
export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidation-secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const path = body.path || "/work";

  revalidatePath(path);

  return NextResponse.json({ revalidated: true, path, now: Date.now() });
}
