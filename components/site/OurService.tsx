import React from "react";
import Image from "next/image";
import ServiceCard from "./ServiceCard";

// Fake data برای سرویس‌ها
const servicesData = [
  {
    id: 1,
    title: "تشخیص و مشاوره",
    description:
      "راديكال كنترل مرجع تأمين، فروش و نصب تخصصي تجهيزات و قطعات برق صنعتي را از انتخاب دقیق محصول تا اجراي حرفه‌اي و راه‌اندازي نهايي، در كنار شما انجام مي‌دهد.",
    imageSrc: "/images/service1.png",
    imageAlt: "تشخیص و مشاوره",
  },
  {
    id: 2,
    title: "تأمین قطعات",
    description:
      "راديكال كنترل مرجع تأمين، فروش و نصب تخصصي تجهيزات و قطعات برق صنعتي را از انتخاب دقیق محصول تا اجراي حرفه‌اي و راه‌اندازي نهايي، در كنار شما انجام مي‌دهد.",
    imageSrc: "/images/service3.png",
    imageAlt: "تأمین قطعات",
  },
  {
    id: 3,
    title: "نصب - راه‌اندازی - سرویس",
    description:
      "راديكال كنترل مرجع تأمين، فروش و نصب تخصصي تجهيزات و قطعات برق صنعتي را از انتخاب دقیق محصول تا اجراي حرفه‌اي و راه‌اندازي نهايي، در كنار شما انجام مي‌دهد.",
    imageSrc: "/images/service2.png",
    imageAlt: "نصب و راه‌اندازی",
  },
];

function OurService() {
  return (
    <div className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* هدر بخش */}
      <div className="relative z-10 text-center mb-12 md:mb-16 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-4 font-peyda-medium">
          رادیکال کنترل فقط محصول ارائه نمی‌دهد
        </h2>
        <p className="text-neutral-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          رادیکال کنترل مرجع تأمین، فروش و نصب تخصصی تجهیزات و قطعات برق صنعتی
          <br />
          را از انتخاب دقیق محصول تا اجرای حرفه‌ای و راه‌اندازی نهایی، در کنار
          شما انجام می‌دهد.
        </p>
      </div>

      {/* تصاویر دایره‌ای پس‌زمینه */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 md:w-96  pointer-events-none -z-10">
        <Image
          src="/images/Objets.png"
          alt=""
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </div>

      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 md:w-96  pointer-events-none -z-10">
        <Image
          src="/images/Objets.png"
          alt=""
          width={400}
          height={400}
          className="w-full h-auto"
        />
      </div>

      {/* کارت‌های سرویس */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-4 md:px-8">
        {servicesData.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            imageSrc={service.imageSrc}
            imageAlt={service.imageAlt}
          />
        ))}
      </div>
    </div>
  );
}

export default OurService;
