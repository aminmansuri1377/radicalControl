"use client";

import { cn } from "@/lib/cn";
import React from "react";

const SectionTitle = ({ children, sticky = true, className }) => {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 md:gap-4",
        sticky
          ? "sticky top-14 lg:top-20 z-30 bg-background/85 backdrop-blur-md py-4 md:py-6 transition-shadow duration-300"
          : "md:my-20 my-5",
        className,
      )}
    >
      {/* خط سمت چپ + دایره */}
      <div className="flex items-center flex-1">
        <div className="h-px flex-1 bg-primary mr-4 md:mr-14" />
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-transparent border-2 border-primary shrink-0" />
      </div>

      {/* متن با سایه */}
      <h2
        className="text-primary font-black text-2xl md:text-4xl lg:text-6xl text-center "
        style={{
          textShadow: "primary",
        }}
      >
        {children}
      </h2>

      {/* دایره + خط سمت راست */}
      <div className="flex items-center flex-1">
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-transparent border-2 border-primary shrink-0" />
        <div className="h-px flex-1 bg-primary ml-4 md:ml-14" />
      </div>
    </div>
  );
};

export default SectionTitle;
