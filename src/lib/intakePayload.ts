/**
 * TypeScript interface for the consultation intake form payload.
 * This is the exact JSON structure sent to the n8n webhook via Cloudflare Tunnel.
 */
export interface IntakeFormPayload {
  lead_status: "partial" | "complete";
  contact: {
    full_name: string;
    email: string;
    phone?: string;
    preferred_contact: string;
    availability: string[];
  };
  business: {
    name: string;
    industry: string;
    industry_other?: string;
    current_tools: {
      pos: string;
      booking: string;
      accounting: string;
      email_marketing: string;
      other: string;
    };
  };
  needs: {
    biggest_challenge: string;
    help_areas: string[];
    urgency: string;
  };
  budget_range: string;
  referral_source: string;
  metadata: {
    submitted_at: string;
    turnstile_token?: string;
    source: string;
  };
}

/**
 * Submit the complete intake form to the Next.js API route.
 * The API route validates, verifies Turnstile, signs with HMAC,
 * and forwards to the n8n webhook via Cloudflare Tunnel.
 */
export const submitIntakeForm = async (
  payload: IntakeFormPayload
): Promise<{ success: boolean; submission_id?: string; error?: string }> => {
  const response = await fetch("/api/consultation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error || "Submission failed");
  }

  return response.json();
};
