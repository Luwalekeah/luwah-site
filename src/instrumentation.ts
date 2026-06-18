export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");

    // Report missing config once at boot. Skipped during the build phase so
    // build logs are not polluted by secrets that only exist at runtime.
    if (process.env.NEXT_PHASE !== "phase-production-build") {
      const { checkEnv } = await import("./lib/checkEnv");
      checkEnv();
    }
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export const onRequestError = (await import("@sentry/nextjs")).captureRequestError;
