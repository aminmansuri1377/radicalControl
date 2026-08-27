import Image from "next/image";

import Kala from "@/public/images/kalakaj.png";
import ObjectBg from "@/public/images/Objets.png";

import { ProductRequestForm } from "../contact/Productrequestform";

function WeProvide() {
  return (
    <section dir="rtl" className="overflow-x-clip px-4 py-16 md:pb-24">
      {/* متن بالای بخش */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-peyda-bold text-xl leading-loose text-gray-800 md:text-2xl">
          ما میتوانیم برای شما تامین کنیم! نام و مشخصات{" "}
          <span className="text-primary">کالای موردنیازتان</span> را ارسال کنید؛
          رادیکال کنترل آن را از{" "}
          <span className="text-primary">بهترین منابع</span> و با بهترین قیمت
          بازار تأمین می‌کند. درخواست کالا را ثبت کنید و بگذارید{" "}
          <span className="text-primary">ما آن را برای شما پیدا کنیم!</span>
        </p>
      </div>

      {/* رَپر بیرونی = مرجع پوزیشن برای بک‌گراند دسکتاپ */}
      <div className="relative mx-auto mt-14 max-w-6xl">
        {/* بک‌گراند Objects — فقط دسکتاپ: پشتِ کادر و بیرون‌زده از سمت چپ */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -left-24 z-0 hidden -translate-y-1/2 md:block lg:-left-36"
        >
          <Image
            src={ObjectBg}
            alt=""
            sizes="(min-width:1024px) 460px, 380px"
            className="h-auto w-[380px] object-contain lg:w-[460px]"
          />
        </div>

        {/* کادر فرم: در دسکتاپ بوردر + بک‌گراند سفید می‌گیرد و روی بک‌گراند می‌نشیند */}
        <div className="relative z-10 md:rounded-4xl md:border md:border-gray-200 md:bg-white md:px-10 md:py-12 md:shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)]">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-8">
            {/* فرم سمت راست (اول توی DOM میاد تا توی چیدمان rtl سمت راست بشینه) */}
            <ProductRequestForm />

            {/* عکس محصول، سمت چپ و داخل همان کادر */}
            <div className="relative mx-auto flex h-[320px] w-[320px] items-center justify-center md:h-[420px] md:w-full">
              {/* دایره‌ی پس‌زمینه فقط برای موبایل (چیدمان موبایل دست‌نخورده) */}
              <Image
                src={ObjectBg}
                alt=""
                aria-hidden="true"
                fill
                sizes="320px"
                className="object-contain md:hidden"
              />
              <Image
                src={Kala}
                alt="محصول"
                width={340}
                height={340}
                className="relative z-10 w-[78%] object-contain drop-shadow-2xl md:w-[88%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeProvide;
