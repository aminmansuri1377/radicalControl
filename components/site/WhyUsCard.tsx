import { ReactNode } from "react";

export interface BorderCardData {
  id: number | string;
  title: string;
  description: string;
  icon: ReactNode;
}

interface BorderCardProps extends BorderCardData {
  className?: string;
}

export default function WhyUsCard({
  title,
  description,
  icon,
  className = "",
}: BorderCardProps) {
  return (
    <div className={`relative w-full pt-8 ${className}`} dir="rtl">
      {/* بج دایره‌ای آیکون */}
      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
        {/* هاله‌ی نوری پشت بج */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 scale-150 rounded-full bg-primary/30 blur-md"
        />
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-[0_0_18px_rgba(124,58,237,0.55)]">
          {icon}
        </span>
      </div>

      {/* بدنه‌ی کارت: بوردر چپ/راست/پایین + پس‌زمینه اینجا کشیده می‌شه */}
      <div className="relative rounded-b-[28px] border border-t-0 border-primary/25 bg-white px-6 pb-8 pt-14 text-center shadow-[0_10px_30px_-15px_rgba(124,58,237,0.25)]">
        {/* بوردر بالای کارت + فرورفتگی دور بج (SVG) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-12 w-full"
          viewBox="0 0 300 48"
          preserveAspectRatio="none"
        >
          <path
            d="M0,48 L0,28 C0,12.5 12.5,0 28,0 L118,0 C132,0 138,22 150,22 C162,22 168,0 182,0 L272,0 C287.5,0 300,12.5 300,28 L300,48"
            className="fill-white stroke-primary/25"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <h3 className="relative z-10 text-lg font-bold leading-8 text-gray-900">
          {title}
        </h3>
        <p className="relative z-10 mt-3 text-sm leading-7 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}
