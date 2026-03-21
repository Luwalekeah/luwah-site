import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Luwah Technologies privacy policy. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[800px] px-6">
          <h1 className="mb-8 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-display, sans-serif)" }}>
            Privacy Policy
          </h1>
          <p className="mb-6 text-sm" style={{ color: "#6B6965" }}>Last updated: March 2026</p>

          <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: "#A8A5A0" }}>
            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>Information We Collect</h2>
              <p>When you use our consultation intake form, we collect: your name, email address, phone number (optional), business name, industry, current tools you use, your business challenges, budget range, scheduling preferences, and how you found us. We also collect your IP address (hashed for rate limiting) and Cloudflare Turnstile verification status for bot prevention.</p>
              <p className="mt-3"><strong style={{ color: "#F0EDE8" }}>Progressive Form Data:</strong> Our consultation intake form utilizes progressive data capture. If you begin filling out our intake form, we may securely capture and store the information provided in the initial steps (such as your Name and Email) to facilitate follow-up communications, even if the final submission is not completed.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>How We Use Your Information</h2>
              <p>We use your information to: prepare for and schedule your consultation, communicate with you about our services, improve our website and services, and send you relevant follow-up communications. We do not sell, rent, or share your personal information with third parties.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>Data Storage & Security</h2>
              <p>Your data is stored in a secure MySQL database and mirrored to Microsoft Excel via OneDrive for operational redundancy. All data is transmitted over encrypted connections (HTTPS/TLS). Our infrastructure uses Cloudflare for DNS, CDN, and DDoS protection. Transactional emails are processed through Resend, which processes but does not retain message content.</p>
              <p className="mt-3"><strong style={{ color: "#F0EDE8" }}>Self-Hosted Infrastructure:</strong> To ensure the highest level of security and data sovereignty, Luwah Technologies processes operational data and webhook submissions on our private, self-hosted infrastructure (Proxmox) located in Aurora, Colorado, secured via Cloudflare zero-trust tunnels. We do not default to shared, public-cloud databases for core workflow processing.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>Third-Party Processing</h2>
              <p><strong style={{ color: "#F0EDE8" }}>Data Enrichment:</strong> When you submit a business email to Luwah Technologies, we may use secure third-party APIs (such as Clearbit or Hunter.io) to append publicly available professional context (e.g., company industry, company size) to your inquiry so we can better prepare for your consultation. This enrichment uses only publicly available business information and does not access private data.</p>
              <p className="mt-3"><strong style={{ color: "#F0EDE8" }}>Email Delivery:</strong> Transactional emails (confirmation messages, follow-ups) are sent via Resend. Resend processes the email content for delivery but does not store or analyze message content beyond what is necessary for delivery.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>Data Retention</h2>
              <p>Consultation records are retained for 2 years from the date of submission. After this period, records are archived or deleted. You may request deletion of your data at any time by contacting us at hello@luwahtechnologies.com.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>Cookies & Tracking</h2>
              <p>We use Plausible Analytics, a privacy-friendly analytics tool that does not use cookies and does not collect personal data. Cloudflare Turnstile is used for bot prevention and is cookieless. We do not use tracking cookies, retargeting pixels, or third-party advertising scripts.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>Your Rights</h2>
              <p>You have the right to: access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, and withdraw consent for communications at any time. To exercise any of these rights, contact us at hello@luwahtechnologies.com.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>Contact</h2>
              <p>Luwah Technologies LLC<br />Aurora, CO 80017<br />hello@luwahtechnologies.com<br />+1 (720) 421-7184</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
