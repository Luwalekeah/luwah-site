import Link from "next/link";
import { Star } from "lucide-react";
import {
  RATING_CATEGORIES,
  aggregateReviews,
  type Review,
} from "@/lib/reviews";

/** Read-only star row. Fills to the rounded value out of 5. */
function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const filled = Math.round(value);
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          style={{ color: "var(--color-copper)" }}
          fill={n <= filled ? "var(--color-copper)" : "none"}
        />
      ))}
    </span>
  );
}

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const agg = aggregateReviews(reviews);

  if (agg.count === 0) {
    return (
      <section className="py-24 text-center">
        <div className="mx-auto max-w-xl px-6">
          <h2 className="mb-3 text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Reviews
          </h2>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Client reviews will appear here soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        {/* Aggregate header */}
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <div className="flex items-end gap-3">
            <span className="text-5xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              {agg.overall.toFixed(1)}
            </span>
            <span className="pb-2 text-sm" style={{ color: "var(--color-text-muted)" }}>out of 5</span>
          </div>
          <Stars value={agg.overall} size={22} />
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            Based on {agg.count} client review{agg.count === 1 ? "" : "s"}
          </p>
        </div>

        {/* Per-category averages */}
        <div className="mx-auto mb-16 grid max-w-2xl gap-3 sm:grid-cols-2">
          {RATING_CATEGORIES.map((c) => (
            <div key={c.key} className="card flex items-center justify-between p-4">
              <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>{c.label}</span>
              <span className="flex items-center gap-2">
                <Stars value={agg.categories[c.key]} size={13} />
                <span className="text-xs font-semibold">{agg.categories[c.key].toFixed(1)}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Individual reviews */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div key={r._id} className="card flex flex-col p-6">
              <div className="mb-3 flex items-center justify-between">
                <Stars value={r.overall} size={15} />
                <span className="text-xs font-semibold" style={{ color: "var(--color-text-muted)" }}>
                  {r.overall.toFixed(1)}
                </span>
              </div>
              <p className="mb-4 flex-1 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                &ldquo;{r.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {r.reviewerName}
                </p>
                {(r.company || r.role) && (
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {[r.role, r.company].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/review" className="btn-secondary">Worked with us? Leave a review</Link>
        </div>
      </div>
    </section>
  );
}
