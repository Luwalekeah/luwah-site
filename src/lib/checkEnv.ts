import "server-only";

/**
 * Startup environment check. Logs which variables are missing so a
 * misconfigured deploy is obvious in the Render logs instead of surfacing as a
 * runtime 500 on the first form submission.
 *
 * REQUIRED vars make a route fail closed when unset (Turnstile, HMAC signing,
 * Sanity writes). OPTIONAL vars degrade a feature gracefully.
 */
const REQUIRED: Record<string, string> = {
  CLOUDFLARE_TURNSTILE_SECRET: "Turnstile verification — forms reject all posts without it",
  WEBHOOK_HMAC_SECRET: "n8n payload signing — forms 500 without it",
  N8N_WEBHOOK_URL: "lead forwarding to n8n",
  SANITY_API_TOKEN: "writing submissions to Studio (must be an Editor token)",
  NEXT_PUBLIC_SANITY_PROJECT_ID: "reading and writing Sanity content",
  REVALIDATION_SECRET: "authenticating cache revalidation calls",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: "rendering the Turnstile widget in the browser",
};

const OPTIONAL: Record<string, string> = {
  NEXT_PUBLIC_N8N_PARTIAL_WEBHOOK_URL: "forwarding partial leads to n8n",
  N8N_WEB_WEBHOOK_URL: "forwarding web orders and build intakes to n8n",
};

export function checkEnv() {
  const missingRequired = Object.keys(REQUIRED).filter((k) => !process.env[k]);
  const missingOptional = Object.keys(OPTIONAL).filter((k) => !process.env[k]);

  if (missingRequired.length === 0 && missingOptional.length === 0) {
    console.log("[env] all required and optional variables are set");
    return;
  }

  if (missingRequired.length > 0) {
    console.error(
      `[env] MISSING ${missingRequired.length} REQUIRED variable(s). Affected features will fail:`
    );
    for (const k of missingRequired) console.error(`  - ${k}: ${REQUIRED[k]}`);
  }

  if (missingOptional.length > 0) {
    console.warn(`[env] missing ${missingOptional.length} optional variable(s):`);
    for (const k of missingOptional) console.warn(`  - ${k}: ${OPTIONAL[k]}`);
  }
}
