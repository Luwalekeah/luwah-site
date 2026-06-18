"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Turnstile } from "@/components/Turnstile";
import {
  type WebCatalog,
  computeOrderTotal,
} from "@/lib/webCatalog";

const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

const inputStyle: React.CSSProperties = {
  backgroundColor: "var(--color-bg-input)",
  border: "1px solid var(--color-border)",
  color: "var(--color-text-primary)",
  fontFamily: "var(--font-body)",
};

export function OrderForm({ catalog }: { catalog: WebCatalog }) {
  const firstTier = catalog.tiers.find((t) => t.highlight) || catalog.tiers[0];
  const [tierKey, setTierKey] = useState(firstTier?.key || "");
  const [addonKeys, setAddonKeys] = useState<string[]>([]);
  const [extraPages, setExtraPages] = useState(0);
  const [supportPlanKey, setSupportPlanKey] = useState("");
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", businessName: "", notes: "" });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleToken = useCallback((t: string) => setTurnstileToken(t), []);
  const handleExpire = useCallback(() => setTurnstileToken(null), []);

  const tier = catalog.tiers.find((t) => t.key === tierKey);
  const included = useMemo(() => new Set(tier?.includedAddons || []), [tier]);

  const totals = useMemo(
    () => computeOrderTotal(catalog, { tierKey, addonKeys, extraPages }),
    [catalog, tierKey, addonKeys, extraPages]
  );

  const toggleAddon = (key: string) => {
    if (included.has(key)) return; // bundled, not toggleable
    setAddonKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const canSubmit =
    form.fullName.trim() && form.email.trim() && tierKey && turnstileToken && status !== "sending";

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setStatus("sending");
    try {
      // Send only add-ons that are not bundled into the tier.
      const sendAddons = addonKeys.filter((k) => !included.has(k));
      const res = await fetch("/api/web-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tierKey,
          addonKeys: sendAddons,
          extraPages: tier?.perPage ? extraPages : 0,
          supportPlanKey,
          turnstile_token: turnstileToken,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="card mx-auto mt-10 max-w-xl p-10 text-center">
        <h2 className="mb-3 text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Order received
        </h2>
        <p className="mb-6 text-sm" style={{ color: "var(--color-text-secondary)" }}>
          Thanks. We will send a quote within 24 to 48 hours. To speed up the build, complete the
          intake form next so we have your brand, pages, and content.
        </p>
        <Link href="/intake" className="btn-primary">
          Continue to build intake
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Tier selection */}
      <h2 className="mb-4 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
        1. Choose your option
      </h2>
      <div className="mb-10 grid gap-3 sm:grid-cols-2">
        {catalog.tiers.map((t) => {
          const active = t.key === tierKey;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTierKey(t.key)}
              className="card p-5 text-left transition-all"
              style={{ borderColor: active ? "var(--color-copper)" : "var(--color-border)" }}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {t.name}
                </span>
                <span className="text-lg font-bold" style={{ color: "var(--color-copper)" }}>
                  {t.priceLabel}
                </span>
              </div>
              <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                {t.pages}
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                {t.summary}
              </p>
            </button>
          );
        })}
      </div>

      {/* Extra pages */}
      {tier?.perPage && (
        <div className="mb-10">
          <label className="mb-1.5 block text-sm font-medium">
            Extra pages (beyond the 4 included) — {fmt(catalog.perPagePrice)} each
          </label>
          <input
            type="number"
            min={0}
            max={50}
            value={extraPages}
            onChange={(e) => setExtraPages(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-32 rounded-lg px-4 py-3 text-sm outline-none"
            style={inputStyle}
          />
        </div>
      )}

      {/* Add-ons */}
      <h2 className="mb-4 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
        2. Add-ons
      </h2>
      <div className="mb-10 flex flex-col gap-2">
        {catalog.addons.map((a) => {
          const isIncluded = included.has(a.key);
          const checked = isIncluded || addonKeys.includes(a.key);
          return (
            <button
              key={a.key}
              type="button"
              onClick={() => toggleAddon(a.key)}
              disabled={isIncluded}
              className="card flex items-center justify-between p-4 text-left"
              style={{
                borderColor: checked ? "var(--color-copper-border)" : "var(--color-border)",
                opacity: isIncluded ? 0.7 : 1,
                cursor: isIncluded ? "default" : "pointer",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded"
                  style={{
                    border: "1px solid var(--color-border)",
                    backgroundColor: checked ? "var(--color-copper)" : "transparent",
                  }}
                >
                  {checked && <Check size={13} color="#fff" />}
                </span>
                <span className="text-sm">{a.name}</span>
              </div>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {isIncluded ? "Included" : a.oneTimeLabel}
                {a.monthlyLabel ? ` · ${a.monthlyLabel}` : ""}
              </span>
            </button>
          );
        })}
      </div>

      {/* Support plan */}
      <h2 className="mb-4 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
        3. Ongoing support (optional)
      </h2>
      <select
        value={supportPlanKey}
        onChange={(e) => setSupportPlanKey(e.target.value)}
        className="mb-10 w-full rounded-lg px-4 py-3 text-sm outline-none"
        style={inputStyle}
      >
        <option value="">No plan / decide later</option>
        {catalog.supportPlans.map((p) => (
          <option key={p.key} value={p.key}>
            {p.name} — {p.priceLabel}
          </option>
        ))}
      </select>

      {/* Contact */}
      <h2 className="mb-4 text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
        4. Your details
      </h2>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <input placeholder="Full name *" value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="rounded-lg px-4 py-3 text-sm outline-none" style={inputStyle} />
        <input placeholder="Email *" type="email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-lg px-4 py-3 text-sm outline-none" style={inputStyle} />
        <input placeholder="Phone" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="rounded-lg px-4 py-3 text-sm outline-none" style={inputStyle} />
        <input placeholder="Business name" value={form.businessName}
          onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          className="rounded-lg px-4 py-3 text-sm outline-none" style={inputStyle} />
      </div>
      <textarea placeholder="Anything else about your project?" rows={3} value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="mb-8 w-full rounded-lg px-4 py-3 text-sm outline-none" style={inputStyle} />

      {/* Total + submit */}
      <div className="card mb-6 flex items-center justify-between p-6">
        <div>
          <p className="text-xs uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
            Estimated one-time total
          </p>
          <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            {fmt(totals.total)}
          </p>
          {totals.hasVariableItems && (
            <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
              Plus quoted items priced after we scope them.
            </p>
          )}
        </div>
      </div>

      <Turnstile onToken={handleToken} onExpire={handleExpire} />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="btn-primary mt-4 w-full"
        style={{ opacity: canSubmit ? 1 : 0.5 }}
      >
        {status === "sending" ? "Submitting..." : "Submit order request"}
      </button>
      {status === "error" && (
        <p className="mt-4 text-center text-sm" style={{ color: "#ef4444" }}>
          Something went wrong. Please try again or email hello@luwahtechnologies.com
        </p>
      )}
      <p className="mt-4 text-center text-xs" style={{ color: "var(--color-text-muted)" }}>
        {catalog.legal}
      </p>
    </div>
  );
}
