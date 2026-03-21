"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "Process" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Portfolio" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setScrolled(currentY > 20);

    if (currentY < 80) {
      setVisible(true);
    } else if (currentY > lastScrollY && currentY > 100) {
      setVisible(false);
    } else if (currentY < lastScrollY) {
      setVisible(true);
    }

    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
          visible ? "header-visible" : "header-hidden"
        }`}
        style={{
          backgroundColor: scrolled
            ? "rgba(10, 15, 30, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <Image
              src="/images/Luwah Technologies LLC_LOGO D5.png"
              alt="Luwah Technologies"
              width={160}
              height={40}
              priority
              style={{ height: "auto" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm no-underline transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-copper-light)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side: Search + CTA + Mobile */}
          <div className="flex items-center gap-3">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
              style={{
                color: "var(--color-text-secondary)",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Desktop CTA */}
            <Link href="/consultation" className="btn-primary hidden lg:flex">
              Book a Consultation
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center lg:hidden"
              style={{
                color: "var(--color-text-primary)",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div
            className="border-b px-6 py-4"
            style={{
              backgroundColor: "rgba(10, 15, 30, 0.95)",
              borderColor: "var(--color-border-default)",
            }}
          >
            <div className="mx-auto max-w-[1200px]">
              <input
                type="text"
                placeholder="Search services, articles, case studies..."
                autoFocus
                className="w-full bg-transparent text-lg outline-none"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-text-primary)",
                  border: "none",
                }}
                onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{
            backgroundColor: "rgba(10, 15, 30, 0.98)",
            backdropFilter: "blur(20px)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl no-underline transition-colors duration-200"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/consultation"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-4"
          >
            Book a Free Consultation
          </Link>
        </div>
      )}
    </>
  );
}
