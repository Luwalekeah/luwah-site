/**
 * Fire-and-forget partial lead capture.
 * Called when the user completes an early step of the intake form.
 * Posts to our own API route (not n8n directly), which stores the lead in
 * Sanity and forwards to n8n server-side. Does NOT block the UI.
 */
export const capturePartialLead = async (
  name: string,
  email: string,
  step: number = 1
) => {
  try {
    void fetch("/api/partial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, step }),
    });
  } catch (error) {
    // Silent fail. The full submission at the final step will catch them.
    console.error("Partial capture sync failed:", error);
  }
};
