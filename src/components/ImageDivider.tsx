"use client";

import Image from "next/image";

export function ImageDivider({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="mx-auto max-w-[var(--container-max)] px-6 py-8">
      <div
        className="relative h-[200px] w-full overflow-hidden md:h-[300px]"
        style={{ borderRadius: "var(--radius-xl)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-bg-primary) 0%, transparent 25%, transparent 75%, var(--color-bg-primary) 100%)",
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
}
