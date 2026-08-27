"use client";
import Image from "next/image";
import { Button } from "../ui";

interface CategoryCardProps {
  imageSrc: string;
  title: string;
  imageAlt?: string;
  className?: string;
  variant?: "light" | "dark";
}

export default function CategoryCard({
  imageSrc,
  title,
  imageAlt = "دسته‌بندی",
  className = "",
  variant = "light",
}: CategoryCardProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl h-[250px] md:h-[300px] ${className}`}
    >
      {/* Background Image - کل کارت */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        priority={false}
      />

      {/* Gradient Overlay - برای خوانایی متن */}

      {/* Content - سمت راست، وسط ارتفاع */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex flex-col items-end gap-4 md:gap-6 p-6 md:p-8 w-1/2">
        {/* Title */}
        <h3
          className={`text-xl md:text-2xl font-bold text-right font-peyda-medium leading-tight ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h3>

        {/* Buttons */}
        <div className="flex flex-row gap-2 md:gap-3">
          <Button
            variant="primary"
            size="sm"
            className=" hover:bg-purple-700 px-4 md:px-6  transition-all duration-300"
            dir="rtl"
          >
            استعلام قیمت
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-2 text-primary px-4 md:px-6 transition-all duration-300"
            dir="rtl"
          >
            جزئیات
          </Button>
        </div>
      </div>
    </div>
  );
}
