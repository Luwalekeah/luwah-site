"use client";

const TESTIMONIALS = [
  {
    quote:
      "Three subscriptions canceled. $480/year back in my pocket. And the peace of mind that my family photos aren\u2019t training someone\u2019s AI model.",
    name: "Daniel C",
    title: "Founder, Luwah Technologies LLC",
  },
  {
    quote:
      "What used to take a full day now takes 15 minutes. Leads come pre-enriched with emails, phone numbers, and owner names\u2014ready to contact.",
    name: "Musu C",
    title: "Owner, True Grace Home Care",
  },
  {
    quote:
      "From zero web presence to fully branded landing page in a weekend. No coding required. No monthly fees. No compromise on professionalism.",
    name: "Daniel C.",
    title: "Founder, Luwah Technologies LLC",
  },
  {
    quote:
      "Members get notified every single day\u2014whether the organizer is at their desk, on vacation, or sound asleep.",
    name: "Yameh O",
    title: "Communications Manager, Chess Ring",
  },
  {
    quote:
      "Upload a Word doc, automation builds the entire project board\u2014tasks, assignments, tags, everything. Hours of setup reduced to seconds.",
    name: "Daniel C",
    title: "Founder, Luwah Technologies LLC",
  },
];

export function TestimonialsSection() {
  // Duplicate for seamless loop
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-[1200px] px-6">
        <p className="section-label text-center">Testimonials</p>
        <h2
          className="text-center text-3xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What Our Clients Say
        </h2>
      </div>

      {/* Scrolling track */}
      <div className="relative w-full overflow-hidden">
        <div className="testimonial-track flex gap-6 pl-6">
          {items.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="glass-card w-[320px] flex-shrink-0 p-6 md:w-[360px]"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(135deg, rgba(184,115,51,0.12), rgba(22,30,53,0.6))"
                    : "var(--glass-bg)",
              }}
            >
              <p
                className="mb-6 text-sm leading-relaxed"
                style={{ color: "var(--color-text-primary)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: "rgba(184,115,51,0.2)",
                    color: "var(--color-copper-light)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {t.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
