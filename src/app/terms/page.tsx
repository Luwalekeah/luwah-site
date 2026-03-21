import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Luwah Technologies terms and conditions for services and website use.",
};

export default function TermsPage() {
  return (
    <div className="pt-24">
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[800px] px-6">
          <h1 className="mb-8 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-display, sans-serif)" }}>
            Terms &amp; Conditions
          </h1>
          <p className="mb-6 text-sm" style={{ color: "#6B6965" }}>Last updated: March 2026</p>

          <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: "#A8A5A0" }}>
            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>1. Services</h2>
              <p>Luwah Technologies LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) provides automation consulting, workflow development, technology advisory, and education services. All services are subject to a formal project proposal and mutual agreement before work begins.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>2. Free Consultation</h2>
              <p>The initial 30-minute discovery consultation is provided at no charge and carries no obligation. Additional consultation time beyond the initial session is billed at $30/hour.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>3. Project Engagement</h2>
              <p>All custom projects require a signed proposal before work begins. Projects follow a 50/50 payment structure: 50% deposit due before work begins, 50% balance due upon delivery. Payment is accepted via credit card, debit card, or ACH transfer.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>4. Deliverables & Ownership</h2>
              <p>Upon full payment, clients receive a perpetual, non-exclusive license to use all delivered work products. Luwah Technologies retains ownership of underlying workflow logic and methodologies. All access credentials and permissions are transferred to client ownership upon delivery.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>5. Testing & Maintenance</h2>
              <p>Each project includes a 7-day testing window following delivery, during which bugs and issues within the original scope are addressed at no additional charge. A 30-day maintenance window follows the testing period for issues arising from normal operation. Work outside the original project scope constitutes a new engagement.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>6. Limitation of Liability</h2>
              <p>Luwah Technologies LLC liability is limited to the total fees paid for the specific project. We are not liable for indirect, incidental, or consequential damages. We carry Errors &amp; Omissions (E&amp;O) and Cyber liability insurance through NEXT Insurance.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>7. Website Use</h2>
              <p>This website is provided for informational purposes. Content is owned by Luwah Technologies LLC and may not be reproduced without permission. We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of updated terms.</p>
            </section>

            <section>
              <h2 className="mb-3 text-lg font-bold" style={{ color: "#F0EDE8", fontFamily: "var(--font-display, sans-serif)" }}>8. Governing Law</h2>
              <p>These terms are governed by the laws of the State of Colorado. Any disputes shall be resolved in the courts of Arapahoe County, Colorado.</p>
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
