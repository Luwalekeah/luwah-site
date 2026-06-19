import type { Metadata } from "next";
import { OrderForm } from "./OrderForm";
import { getWebCatalog } from "@/lib/getWebCatalog";

export const metadata: Metadata = {
  title: "Order a Website",
  description:
    "Pick a website tier and add-ons, see your price, and request a quote. Fixed pricing from $300. Luwah Technologies.",
};

export const revalidate = 60;

export default async function OrderPage() {
  const catalog = await getWebCatalog();
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="mb-3 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
          Build your order
        </h1>
        <p className="mb-12 text-base" style={{ color: "var(--color-text-secondary)" }}>
          Choose an option and any add-ons. You will see a running total. Submit to get a quote
          within 24 to 48 hours. No payment is taken here.
        </p>
        <OrderForm catalog={catalog} />
      </div>
    </div>
  );
}
