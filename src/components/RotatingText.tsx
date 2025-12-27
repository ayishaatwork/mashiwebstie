"use client";

import { useEffect, useState } from "react";

type RotatingTextProps = {
  lines: string[];
  targetSelector: string;
  className?: string;
};

export default function RotatingText({
  lines,
  targetSelector,
  className = "",
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(targetSelector)
    );

    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const idx = items.indexOf(entry.target as HTMLElement);
          if (idx !== -1 && idx < lines.length) {
            setIndex(idx);
          }
        });
      },
      {
        root: null,
        threshold: 0.6, // triggers when image is mostly visible
      }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [lines, targetSelector]);

  return (
    <div className={`rotating-text ${className}`} aria-live="polite">
      <span className="rotating-text__line">{lines[index]}</span>
    </div>
  );
}


