"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { SecureEmail } from "@/components/SecureEmail";

export function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
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

    // TODO: Connect to Next.js API route → n8n webhook + Resend
    // For now, simulate submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("sent");
      setFormData({ fullName: "", companyName: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
      ref={ref}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="section-label">Get in Touch</p>
        <h2
          className="mb-16 text-3xl font-bold md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Contact
        </h2>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-card p-6">
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "rgba(184,115,51,0.15)" }}
              >
                <Mail size={18} style={{ color: "var(--color-copper)" }} />
              </div>
              <h3
                className="mb-1 text-sm font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Mail
              </h3>
              <SecureEmail
                className="text-sm no-underline"
                display="hello@luwahtechnologies.com"
              />
            </div>

            <div className="glass-card p-6">
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "rgba(74,144,164,0.15)" }}
              >
                <Phone size={18} style={{ color: "var(--color-lake)" }} />
              </div>
              <h3
                className="mb-1 text-sm font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Phone
              </h3>
              <a
                href="tel:+17204217184"
                className="text-sm no-underline transition-colors duration-200"
                style={{ color: "var(--color-text-secondary)" }}
              >
                +1 (720) 421-7184
              </a>
            </div>

            <div className="glass-card p-6">
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "rgba(184,115,51,0.15)" }}
              >
                <MapPin size={18} style={{ color: "var(--color-copper)" }} />
              </div>
              <h3
                className="mb-1 text-sm font-bold"
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

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {status === "sent" ? (
              <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
                <div
                  className="mb-4 text-4xl"
                  style={{ color: "var(--color-copper)" }}
                >
                  &#10003;
                </div>
                <h3
                  className="mb-2 text-xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Message sent!
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    className="mb-1.5 block text-sm font-semibold"
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
                    className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--color-bg-tertiary)",
                      border: "1px solid var(--color-border-default)",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="AI Innovations Inc."
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--color-bg-tertiary)",
                      border: "1px solid var(--color-border-default)",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john.doe@company.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--color-bg-tertiary)",
                      border: "1px solid var(--color-border-default)",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="mb-1.5 block text-sm font-semibold"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Hello! I'd like to learn more about your automation services."
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full resize-y rounded-lg px-4 py-3 text-sm outline-none transition-colors duration-200"
                    style={{
                      backgroundColor: "var(--color-bg-tertiary)",
                      border: "1px solid var(--color-border-default)",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-body)",
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="btn-primary w-full justify-center"
                  style={{ borderRadius: "var(--radius-md)" }}
                >
                  {status === "sending" ? "Sending..." : "Submit"}
                </button>

                {status === "error" && (
                  <p className="text-sm" style={{ color: "#ef4444" }}>
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
