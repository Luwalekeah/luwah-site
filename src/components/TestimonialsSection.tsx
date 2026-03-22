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
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      className="overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      <div className="mx-auto mb-14 max-w-[var(--container-max)] px-6 text-center">
        <h2
          className="mb-4 text-3xl font-bold md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          What our clients say
        </h2>
        <p
          className="mx-auto max-w-md text-base"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Real feedback from businesses we&apos;ve helped automate.
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="testimonial-track flex gap-4 pl-6">
          {items.map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="card w-[340px] flex-shrink-0 p-6"
            >
              <p
                className="mb-6 text-sm leading-relaxed"
                style={{ color: "var(--color-text-primary)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
