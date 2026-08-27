"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    imageSrc: "/images/banner.png",
    alt: "بنر 1",
  },
  {
    id: 2,
    imageSrc: "/images/banner.png",
    alt: "بنر 2",
  },
  {
    id: 3,
    imageSrc: "/images/banner.png",
    alt: "بنر 3",
  },
  {
    id: 4,
    imageSrc: "/images/banner.png",
    alt: "بنر 4",
  },
  {
    id: 5,
    imageSrc: "/images/banner.png",
    alt: "بنر 5",
  },
];

function SliderBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleImageClick = () => {
    console.log("بنر کلیک شده:", slides[currentSlide].alt);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isSwiping.current = false;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = Math.abs(touchStartX.current - e.targetTouches[0].clientX);
    if (diff > 10) {
      isSwiping.current = true;
    }
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isSwiping.current) return;

    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, goToNext]);

  return (
    <div
      className="relative group mx-4 md:mx-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "pan-y" }}
    >
      {/* Container اسلایدر */}
      <div
        className="relative w-full overflow-hidden rounded-3xl h-[200px] md:h-[400px] lg:h-[500px]"
        style={{ touchAction: "pan-y" }}
      >
        {/* اسلایدها */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out cursor-pointer ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            onClick={handleImageClick}
            style={{ touchAction: "none" }}
          >
            <Image
              src={slide.imageSrc}
              alt={slide.alt}
              fill
              sizes="100vw"
              className="object-contain select-none"
              priority={index <= 2}
              draggable={false}
            />
          </div>
        ))}

        {/* دکمه قبلی (سمت چپ) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            goToNext();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.preventDefault();
            goToNext();
          }}
          aria-label="اسلاید قبلی"
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 
                     w-10 h-10 md:w-12 md:h-12 rounded-full 
                     bg-white/90 hover:bg-white 
                     border-2 border-primary 
                     flex items-center justify-center 
                     shadow-lg hover:shadow-xl 
                     transition-all duration-300 
                     md:opacity-0 md:group-hover:opacity-100
                     hover:scale-110 active:scale-95
                     opacity-100
                     touch-manipulation"
          style={{ touchAction: "manipulation" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* دکمه بعدی (سمت راست) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            goToPrev();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.preventDefault();
            goToPrev();
          }}
          aria-label="اسلاید بعدی"
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 
                     w-10 h-10 md:w-12 md:h-12 rounded-full 
                     bg-white/90 hover:bg-white 
                     border-2 border-primary 
                     flex items-center justify-center 
                     shadow-lg hover:shadow-xl 
                     transition-all duration-300 
                     md:opacity-0 md:group-hover:opacity-100
                     hover:scale-110 active:scale-95
                     opacity-100
                     touch-manipulation"
          style={{ touchAction: "manipulation" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center items-center gap-2 md:mt-6 mb-14">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              e.preventDefault();
              goToSlide(index);
            }}
            aria-label={`رفتن به اسلاید ${index + 1}`}
            className={`transition-all duration-300 rounded-full 
              ${
                index === currentSlide
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-primary/30 hover:bg-primary/60"
              }
              touch-manipulation`}
            style={{ touchAction: "manipulation" }}
          />
        ))}
      </div>
    </div>
  );
}

export default SliderBanner;
