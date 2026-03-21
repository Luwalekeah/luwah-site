"use client";

import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = {
  explore: [
    { href: "/services", label: "Services" },
    { href: "/work", label: "Portfolio" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border-default)",
      }}
    >
      {/* Pre-footer CTA */}
      <section
        className="overflow-hidden py-8"
        style={{ borderBottom: "1px solid var(--color-border-default)" }}
      >
        <div
          className="whitespace-nowrap text-5xl font-bold opacity-10 md:text-7xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-primary)",
            animation: "scroll-left 20s linear infinite",
          }}
        >
          Work smarter, not harder. Automate the busywork. Work smarter, not
          harder. Automate the busywork.&nbsp;
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-16 text-center">
        <h2
          className="mb-4 text-2xl font-semibold md:text-3xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-primary)",
          }}
        >
          Your Business. Supercharged with Automation.
        </h2>
        <p
          className="mx-auto mb-8 max-w-lg text-base"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Save time, boost efficiency, and streamline your operations with
          workflow automation from Luwah Technologies.
        </p>
        <Link href="/consultation" className="btn-primary">
          Book a Free Consultation
        </Link>
      </section>

      {/* Footer Grid */}
      <section
        className="mx-auto max-w-[1200px] px-6 py-12"
        style={{ borderTop: "1px solid var(--color-border-default)" }}
      >
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Image
              src="/images/Luwah Technologies LLC_LOGO D5.png"
              alt="Luwah Technologies"
              width={140}
              height={35}
              style={{ height: "auto", marginBottom: "0.5rem" }}
            />
            <p
              className="text-sm italic"
              style={{ color: "var(--color-text-muted)" }}
            >
              Where Simplicity Meets Innovation.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4
              className="section-label mb-4"
              style={{ color: "var(--color-copper)" }}
            >
              Explore
            </h4>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm no-underline transition-colors duration-200"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                      ((e.target as HTMLAnchorElement).style.color =
                        "var(--color-copper-light)")
                    }
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                      ((e.target as HTMLAnchorElement).style.color =
                        "var(--color-text-secondary)")
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="section-label mb-4"
              style={{ color: "var(--color-copper)" }}
            >
              Legal
            </h4>
            <ul className="flex flex-col gap-2">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm no-underline transition-colors duration-200"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row"
          style={{ borderTop: "1px solid var(--color-border-default)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            &copy; {new Date().getFullYear()} Luwah Technologies LLC. All rights
            reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Made by{" "}
            <span style={{ color: "var(--color-copper)" }}>Daniel Cooke</span>
          </p>
        </div>
      </section>
    </footer>
  );
}
