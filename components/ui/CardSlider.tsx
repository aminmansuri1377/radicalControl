"use client";

import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/cn";

interface CardSliderProps {
  /** هر children یک اسلاید/کارت است */
  children: ReactNode;
  className?: string;
  /** کلاس عرض هر اسلاید، پیش‌فرض یک کارت + کمی نمایش کارت بعدی */
  itemClassName?: string;
  /** فاصله بین کارت‌ها (px) */
  gap?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

/**
 * اسلایدر سبک و کاستوم مبتنی بر CSS scroll-snap (بدون کتابخانه‌ی خارجی).
 * برای استفاده در حالت موبایل روی هر لیستی از کارت‌ها (دسته‌بندی، پیشنهاد ویژه و ...).
 */
export function CardSlider({
  children,
  className,
  itemClassName,
  gap = 16,
  showDots = true,
  showArrows = true,
}: CardSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children).filter(isValidElement);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(index, track.children.length - 1));
    const child = track.children[clamped] as HTMLElement | undefined;
    if (!child) return;

    track.scrollTo({
      left: child.offsetLeft - (track.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  const syncActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(track.children).forEach((child, i) => {
      const rect = (child as HTMLElement).getBoundingClientRect();
      const childCenter = rect.left + rect.width / 2;
      const distance = Math.abs(childCenter - trackCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        syncActiveIndex();
        ticking = false;
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [syncActiveIndex]);

  if (items.length === 0) return null;

  const isFirst = activeIndex <= 0;
  const isLast = activeIndex >= items.length - 1;

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={trackRef}
        dir="rtl"
        className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-1"
        style={{ gap: `${gap}px`, scrollPaddingInline: "24px" }}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className={cn("shrink-0 snap-center", itemClassName ?? "w-[86%]")}
          >
            {child}
          </div>
        ))}
      </div>

      {(showDots || showArrows) && items.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          {showArrows && (
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              aria-label="اسلاید بعدی"
              disabled={isLast}
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary text-primary transition-opacity disabled:opacity-30"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          {showDots && (
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`رفتن به اسلاید ${i + 1}`}
                  onClick={() => scrollToIndex(i)}
                  className={cn(
                    "h-2 rounded-full bg-primary transition-all duration-300",
                    activeIndex === i ? "w-6 opacity-100" : "w-2 opacity-30",
                  )}
                />
              ))}
            </div>
          )}

          {showArrows && (
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex - 1)}
              aria-label="اسلاید قبلی"
              disabled={isFirst}
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary text-primary transition-opacity disabled:opacity-30"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CardSlider;
