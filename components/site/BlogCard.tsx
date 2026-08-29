import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface BlogCardProps {
  image: StaticImageData | string;
  title: string;
  description: string;
  href?: string;
}

export function BlogCard({
  image,
  title,
  description,
  href = "#",
}: BlogCardProps) {
  return (
    <Link
      href={href}
      dir="rtl"
      className="group block overflow-hidden rounded-3xl bg-white p-4 shadow-[0_3px_12px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
    >
      {/* تصویر کارت */}
      <div className="relative aspect-[1.45/1] w-full overflow-hidden rounded-2xl bg-[#d9d9d9]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* محتوای کارت */}
      <div className="px-1 pb-1 pt-4 text-center">
        <h3 className="line-clamp-2 min-h-[56px] text-base font-peyda-bold leading-7 text-foreground">
          {title}
        </h3>

        <p className="mt-2 line-clamp-3 min-h-[72px] text-xs leading-6 text-foreground/70 font-peyda-regular">
          {description}
        </p>

        <div className="mt-4 flex justify-center">
          <span className="rounded-full bg-primary px-8 py-2 text-xs text-white transition-colors group-hover:bg-primary/90">
            اطلاعات بیشتر
          </span>
        </div>
      </div>
    </Link>
  );
}
