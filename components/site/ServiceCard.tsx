import React from "react";
import Image from "next/image";
import { Button } from "../ui";

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt = "سرویس",
}: ServiceCardProps) {
  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden group">
      {/* تصویر پس‌زمینه */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        priority={false}
      />

      {/* Overlay تیره برای خوانایی بهتر */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* کارت شیشه‌ای پایین */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
          {/* عنوان */}
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-peyda-medium">
            {title}
          </h3>

          {/* توضیحات */}
          <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
            {description}
          </p>

          {/* دکمه */}
          <Button
            variant="primary"
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 rounded-full transition-all duration-300 w-full md:w-auto"
            dir="rtl"
          >
            اطلاعات بیشتر
          </Button>
        </div>
      </div>
    </div>
  );
}
