"use client";

import Image from "next/image";
import { getMessages } from "@/messages";
import { Button } from "../ui/Button";
import { ProductSearch } from "@/components/site/ProductSearch";
import { useRouter } from "next/navigation";

export function Hero({ locale }: { locale: string }) {
  const t = getMessages(locale).hero;
  const router = useRouter();

  return (
    <section className="relative isolate flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-white mt-10">
      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>

      <div className="mx-auto md:mx-0 grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-24 lg:px-0">
        {/* Text Content */}
        <div className="order-2 flex flex-col items-start gap-6 text-right md:order-1">
          <h1
            className="hero-reveal text-3xl font-peyda-bold font-bold leading-snug tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] lg:text-4xl"
            style={{ animationDelay: "1s" }}
          >
            {t.tagline}
          </h1>

          <p
            className="hero-reveal max-w-xl text-base leading-7 text-slate-600 font-peyda-regular md:text-lg"
            style={{ animationDelay: "2s" }}
          >
            {t.description}
          </p>

          <div
            className="hero-reveal mt-2 w-full max-w-md"
            style={{ animationDelay: "2.3s" }}
          >
            <ProductSearch locale={locale} />
          </div>
        </div>

        {/* Image Stack */}
        <div className="order-1 relative flex items-center justify-center md:order-2">
          <div className="relative aspect-[4/3] w-full max-w-[560px]">
            {/* Black lines / circuit background - ثابت */}
            <Image
              src="/images/Objets.png"
              alt=""
              fill
              priority
              className="object-contain"
              aria-hidden="true"
            />
            {/* Purple capsule hero - با انیمیشن شناور */}
            <div
              className="absolute inset-0"
              style={{ animation: "float 4s ease-in-out infinite" }}
            >
              <Image
                src="/images/hero.png"
                alt="Hero"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
