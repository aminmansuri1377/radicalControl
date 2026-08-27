"use client";

import { getMessages } from "@/messages";
import React from "react";
import Image from "next/image";
import OurStoryImage from "../../public/images/ourStory.png";
import Outlook from "../../public/images/Outlook.png";
import { Button } from "../ui";
import { useRouter } from "next/navigation";
import SectionBorderTitle from "./SectionBorderTitle";

function OurStory({ locale }: { locale: string }) {
  const t = getMessages(locale);
  const router = useRouter();

  return (
    <div className="my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch lg:mx-40 md:mx-10 mx-5">
        <div className="flex flex-col justify-center h-full">
          <div className="lg:px-10">
            <h1 className=" font-peyda-black text-3xl">داستان رادیکال کنترل</h1>{" "}
            <p className="font-peyda-regular text-justify mt-5">
              {t.hero.ourStoryDescription}
            </p>
            <div className="text-right">
              <Button
                onClick={() => router.push(`/${locale}/contact`)}
                className="px-14 mt-10"
              >
                {t.contactus}
              </Button>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
          {" "}
          <Image
            src={OurStoryImage}
            alt="Our Story"
            fill
            className="object-cover rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}

export default OurStory;
