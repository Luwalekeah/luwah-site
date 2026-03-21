/**
 * Fire-and-forget partial lead capture.
 * Called when user completes Step 1 of the intake form.
 * Does NOT block the UI — the user moves to Step 2 instantly.
 */
export const capturePartialLead = async (
  name: string,
  email: string,
  step: number = 1
) => {
  try {
    fetch(
      `${process.env.NEXT_PUBLIC_N8N_PARTIAL_WEBHOOK_URL}/intake-step-${step}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          step,
          timestamp: new Date().toISOString(),
        }),
      }
    );
  } catch (error) {
    // Silent fail. If the tunnel is down, we don't block the user.
    // The full submission at Step 4 will catch them.
    console.error("Partial capture sync failed:", error);
  }
};
