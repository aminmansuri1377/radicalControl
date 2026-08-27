import React from "react";
import Image from "next/image";
import { Button } from "../ui";

interface OfferCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function OfferCard({
  title,
  description,
  imageSrc,
  imageAlt = "محصول",
}: OfferCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* تصویر محصول */}
      <div className="relative w-full h-48 md:h-56 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      {/* عنوان */}
      <h3 className="text-lg md:text-xl font-bold text-neutral-900 text-center font-peyda-medium">
        {title}
      </h3>

      {/* توضیحات */}
      <p className="text-sm md:text-base text-neutral-600 text-center leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* دکمه */}
      <Button
        variant="outline"
        size="sm"
        className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 rounded-full transition-all duration-300 mt-2"
        dir="rtl"
      >
        اطلاعات بیشتر
      </Button>
    </div>
  );
}
