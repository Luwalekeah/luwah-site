"use client";

/**
 * Renders an obfuscated email address that only assembles the real
 * mailto: link when the user clicks. Prevents scraper bots from
 * harvesting the email and hitting Resend rate limits.
 */
export function SecureEmail({
  className = "",
  display = "hello[at]luwahtechnologies.com",
}: {
  className?: string;
  display?: string;
}) {
  const handleReveal = () => {
    window.location.href = `mailto:hello${"@"}luwahtechnologies.com`;
  };

  return (
    <button
      onClick={handleReveal}
      className={`transition-colors duration-200 ${className}`}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        font: "inherit",
        color: "inherit",
      }}
      aria-label="Email Luwah Technologies"
    >
      {display}
    </button>
  );
}
