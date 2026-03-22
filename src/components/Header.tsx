"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SearchModal } from "./SearchModal";

const NAV_LINKS = [
  { href: "/#how-it-works", label: "Process" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/services#pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? "header-visible" : "header-hidden"
        }`}
        style={{
          backgroundColor: scrolled ? "rgba(12, 10, 20, 0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-6" style={{ height: "56px" }}>
          <Link href="/" className="no-underline">
            <Image
              src="/images/logo-navbar.png"
              alt="Luwah Technologies"
              width={280}
              height={70}
              priority
              style={{ height: "36px", width: "auto" }}
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium no-underline transition-colors duration-200"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <SearchModal />
            <span className="hidden lg:block">
              <Link href="/consultation" className="btn-primary">
                Get Started
              </Link>
            </span>

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
      </header>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{
            backgroundColor: "rgba(12, 10, 20, 0.98)",
            backdropFilter: "blur(20px)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-semibold no-underline"
              style={{ color: "var(--color-text-primary)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/consultation"
            onClick={() => setMobileOpen(false)}
            className="btn-primary mt-4"
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
}
