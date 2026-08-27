"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import OfferCard from "./OfferCard";

// Fake data برای کارت‌ها
const fakeOffers = [
  {
    id: 1,
    title: "محافظ یزکرم قری 63 آمپر FIDEL",
    description:
      "مرور یپسومر متت ساخنگی با تولید سادگی. مانعومهم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    imageSrc: "/images/product.png",
    imageAlt: "محافظ یزکرم",
  },
  {
    id: 2,
    title: "محافظ یزکرم قری 63 آمپر FIDEL",
    description:
      "مرور یپسومر متت ساخنگی با تولید سادگی. مانعومهم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    imageSrc: "/images/product.png",
    imageAlt: "محافظ یزکرم",
  },
  {
    id: 3,
    title: "محافظ یزکرم قری 63 آمپر FIDEL",
    description:
      "مرور یپسومر متت ساخنگی با تولید سادگی. مانعومهم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    imageSrc: "/images/product.png",
    imageAlt: "محافظ یزکرم",
  },
];

// کامپوننت تایمر
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <div className="text-white text-2xl md:text-3xl font-bold font-mono">
      {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
      {formatTime(timeLeft.seconds)}
    </div>
  );
}

function ExclusiveSale() {
  return (
    <div className="relative rounded-3xl overflow-hidden m-2 md:m-20">
      {/* تصویر پس‌زمینه */}
      <Image
        src="/images/ExclusiveSale.png"
        alt="فروش ویژه"
        fill
        className="object-cover"
        priority
      />

      {/* لایه overlay با رنگ primary */}
      <div className="absolute inset-0 bg-primary/85" />

      {/* محتوا */}
      <div className="relative z-10 px-6 md:px-12 py-10 md:py-16">
        {/* هدر */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-peyda-medium">
            فروش ویژه رادیکال کنترل{" "}
          </h2>
          <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            دارندگی کترلر مرجع فروش و نصب تخصصی تجهیزات برق صنعتی
            <br />
            را از انتخاب دقیق محصولات تا ایجاد حفره‌ای و اندازه‌گیری نهایی، در
            کنار شما هستیم.
          </p>
        </div>

        {/* کارت‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
          {fakeOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              title={offer.title}
              description={offer.description}
              imageSrc={offer.imageSrc}
              imageAlt={offer.imageAlt}
            />
          ))}
        </div>

        {/* تایمر */}
        <div className="flex justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-12 py-4 md:py-5 flex items-center gap-4 md:gap-6 border border-white/20">
            <span className="text-white text-lg md:text-xl font-bold">
              زمان باقی مانده
            </span>
            <CountdownTimer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExclusiveSale;
