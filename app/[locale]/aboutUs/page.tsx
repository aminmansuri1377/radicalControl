"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import StickySection from "@/components/ui/StickySection";
import { useCountUp, formatLocaleNumber } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import StoryImage from "@/public/images/ourStory.png";
import ObjectsImage from "@/public/images/Objets.png";
import { Button } from "@/components/ui";

const copy =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می‌باشد. کتاب‌های زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می‌طلبد.";

function Stat({
  value,
  label,
  enabled,
}: {
  value: number;
  label: string;
  enabled: boolean;
}) {
  const count = useCountUp(value, 1400, 100, enabled);
  return (
    <div className="rounded-xl border border-primary/50 px-5 py-3 text-center min-w-[105px]">
      <b className="block text-2xl font-peyda-bold">
        +{formatLocaleNumber(count, "fa")}
      </b>
      <span className="text-xs font-peyda-regular">{label}</span>
    </div>
  );
}

export default function AboutUs({ locale }: { locale: string }) {
  const router = useRouter();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  return (
    <div
      dir="rtl"
      className="mx-auto max-w-6xl px-2 pb-20 pt-16 md:px-12 lg:px-20"
    >
      <section className="grid items-center gap-10 py-10 md:grid-cols-2 md:py-14">
        <div className="order-2 md:order-1">
          <h1 className="mb-5 text-2xl font-peyda-bold md:text-3xl">
            درباره رادیکال کنترل:
          </h1>
          <p className="text-justify text-sm leading-8 font-peyda-regular">
            {copy}
          </p>
          <div ref={ref} className="mt-6 flex gap-3">
            <Stat value={50} label="پروژه موفق" enabled={inView} />
            <Stat value={10} label="سال تجربه" enabled={inView} />
            <Stat value={1000} label="محصول" enabled={inView} />
          </div>
        </div>
        <Image
          src={StoryImage}
          alt="مهندس رادیکال کنترل"
          className="order-1 h-[250px] w-full rounded-3xl object-cover md:order-2 md:h-[310px]"
          priority
        />
      </section>
      <StickySection title="OUR STORY" sticky={true}>
        <section className="py-5">
          <h2 className="mb-7 text-center text-lg font-peyda-bold">
            داستان ما چگونه شروع شد ؟
          </h2>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Image
              src={StoryImage}
              alt="داستان ما"
              className="h-[275px] w-full rounded-3xl object-cover"
            />
            <p className="text-justify text-sm leading-8 font-peyda-regular">
              {copy} {copy}
            </p>
          </div>
        </section>
      </StickySection>
      <StickySection title="OUR VISION" sticky={true}>
        <section className="py-5">
          <h2 className="mb-7 text-center text-lg font-peyda-bold">
            ما موفقیت را چگونه میبینیم ؟
          </h2>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <p className="order-2 text-justify text-sm leading-8 font-peyda-regular md:order-1">
              {copy} {copy}
            </p>
            <Image
              src={StoryImage}
              alt="چشم انداز ما"
              className="order-1 h-[275px] w-full rounded-3xl object-cover md:order-2"
            />
          </div>
        </section>
      </StickySection>
      <section className="relative mt-10 overflow-visible rounded-3xl border border-gray-300 bg-white px-7 py-10 md:px-16">
        <Image
          src={ObjectsImage}
          alt=""
          className="pointer-events-none absolute -bottom-10 -left-28 z-0 h-72 w-72 object-contain opacity-40 md:-left-40 md:h-80 md:w-80"
        />

        <div className="relative z-10">
          <h2 className="text-xl font-peyda-bold">
            ما آماده همکاری با شما هستیم
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-8 font-peyda-regular">
            {copy}
          </p>

          <Button onClick={() => router.push(`/${locale}/contact`)}>
            تماس با ما
          </Button>
        </div>
      </section>
    </div>
  );
}
