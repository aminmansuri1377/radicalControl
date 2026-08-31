import Image from "next/image";
import Link from "next/link";

type Props = { name: string; href: string; image?: string };
export function SubcategoryCard({
  name,
  href,
  image = "/images/product.png",
}: Props) {
  return (
    <Link
      href={href}
      className="group flex h-[205px] flex-col items-center justify-between rounded-2xl border border-[#d4d4d4] bg-white px-4 py-3 shadow-sm transition hover:-translate-y-1 hover:border-[#723ac9]"
    >
      <div className="relative h-32 w-full">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>
      <h3 className="font-PeydaBlack text-center text-lg text-black">{name}</h3>
      <span className="rounded-full bg-primary px-8 py-1 text-xs text-white">
        جزئیات
      </span>
    </Link>
  );
}
