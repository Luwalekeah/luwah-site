import { sanityClient } from "@/lib/sanity";

/**
 * The five categories clients grade us on, 1 to 5 each. Defined once here so
 * the form, the Sanity schema labels, and the display all stay in agreement.
 */
export const RATING_CATEGORIES = [
  { key: "communication", label: "Communication & Responsiveness" },
  { key: "expertise", label: "Technical Expertise & Quality" },
  { key: "timeliness", label: "Timeliness & Deadlines" },
  { key: "value", label: "Value for the Price" },
  { key: "recommend", label: "Overall & Likelihood to Recommend" },
] as const;

export type RatingKey = (typeof RATING_CATEGORIES)[number]["key"];

export type Ratings = Record<RatingKey, number>;

export interface Review {
  _id?: string;
  reviewerName: string;
  company?: string;
  role?: string;
  ratings: Ratings;
  overall: number;
  quote: string;
  date?: string;
}

export interface ReviewAggregate {
  count: number;
  overall: number; // average of each review's overall score
  categories: Record<RatingKey, number>; // average per category
}

/** Average of the five category scores, rounded to one decimal. */
export function computeOverall(ratings: Ratings): number {
  const vals = RATING_CATEGORIES.map((c) => ratings[c.key] || 0);
  const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
  return Math.round(avg * 10) / 10;
}

/** Site-wide aggregate shown like Uber/Airbnb: overall stars, count, per-category. */
export function aggregateReviews(reviews: Review[]): ReviewAggregate {
  const count = reviews.length;
  const categories = {} as Record<RatingKey, number>;
  for (const c of RATING_CATEGORIES) {
    const sum = reviews.reduce((a, r) => a + (r.ratings?.[c.key] || 0), 0);
    categories[c.key] = count ? Math.round((sum / count) * 10) / 10 : 0;
  }
  const overall = count
    ? Math.round((reviews.reduce((a, r) => a + (r.overall || 0), 0) / count) * 10) / 10
    : 0;
  return { count, overall, categories };
}

const reviewFields = `
  "_id": _id,
  reviewerName,
  company,
  role,
  ratings,
  overall,
  quote,
  date
`;

/** Only approved reviews ever reach the public site. */
export async function getApprovedReviews(): Promise<Review[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch<Review[]>(
      `*[_type == "review" && approved == true] | order(coalesce(featured, false) desc, date desc) { ${reviewFields} }`
    );
  } catch (err) {
    console.error("Sanity fetch (reviews) failed:", err);
    return [];
  }
}
