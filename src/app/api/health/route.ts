import { NextResponse } from "next/server";

/**
 * GET /api/health
 *
 * Simple health check endpoint for uptime monitors (UptimeRobot, Better Stack).
 * Returns 200 with basic status info.
 */
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "luwah-technologies-frontend",
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_BUILD_ID || "dev",
  });
}
