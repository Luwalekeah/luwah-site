import type { Metadata } from "next";
import { ReviewForm } from "./ReviewForm";

export const metadata: Metadata = {
  title: "Leave a Review",
  description: "Share your experience working with Luwah Technologies.",
  robots: { index: false, follow: false }, // private link for clients, keep out of search
};

export default function ReviewPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-xl px-6">
        <h1 className="mb-3 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Leave a review
        </h1>
        <p className="mb-10 text-base" style={{ color: "var(--color-text-secondary)" }}>
          Thanks for working with us. Rate each area out of 5 and share a few words.
          We review every submission before it appears on the site.
        </p>
        <ReviewForm />
      </div>
    </div>
  );
}
