"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { SecureEmail } from "@/components/SecureEmail";

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      setStatus("sent");
      setFormData({ fullName: "", companyName: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  const inputClassName =
    "w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 contact-input";

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--color-bg-input)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
    fontFamily: "var(--font-body)",
  };

  return (
    <section id="contact" className="py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <h2
          className="mb-14 text-3xl font-bold md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Get in touch
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-4"
          >
            <div className="card p-6">
              <Mail
                size={18}
                className="mb-3"
                style={{ color: "var(--color-copper)" }}
              />
              <h3
                className="mb-1 text-sm font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Email
              </h3>
              <SecureEmail
                className="text-sm no-underline"
                display="hello@luwahtechnologies.com"
              />
            </div>

            <div className="card p-6">
              <Phone
                size={18}
                className="mb-3"
                style={{ color: "var(--color-copper)" }}
              />
              <h3
                className="mb-1 text-sm font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Phone
              </h3>
              <a
                href="tel:+17204217184"
                className="text-sm no-underline"
                style={{ color: "var(--color-text-secondary)" }}
              >
                +1 (720) 421-7184
              </a>
            </div>

            <div className="card p-6">
              <MapPin
                size={18}
                className="mb-3"
                style={{ color: "var(--color-copper)" }}
              />
              <h3
                className="mb-1 text-sm font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Office
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Aurora, CO 80017 United States
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="card flex flex-col items-center justify-center p-12 text-center"
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: "var(--color-copper-subtle)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-copper)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Thank you!
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Your message has been received. We&apos;ll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={inputClassName}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Inc."
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className={inputClassName}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClassName}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us about your business and what you'd like to automate."
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={`${inputClassName} resize-y`}
                    style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "error" && (
                  <p className="text-sm" style={{ color: "#ef4444" }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
