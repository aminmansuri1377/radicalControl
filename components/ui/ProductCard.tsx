import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";

type Props = {
  name: string;
  href: string;
  image?: string;
  available?: boolean;
  attributes?: { name?: string; label?: string }[];
};

export function ProductCard({
  name,
  href,
  image = "/images/product2.png",
  available = true,
  attributes = [],
}: Props) {
  return (
    <Link
      href={href}
      className="relative flex min-h-[315px] flex-col rounded-2xl border border-primary bg-white p-3 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <span
        className={`absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-[10px] ${available ? "bg-[#b9e8c2] text-[#23813b]" : "bg-[#ffc0c0] text-[#a52a2a]"}`}
      >
        {available ? "موجود" : "ناموجود"}
      </span>
      <div className="relative mt-4 h-36 w-full">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>
      <h3 className="mt-2 text-center text-sm font-bold text-black">{name}</h3>
      <p className="mt-1 line-clamp-2 text-center text-xs leading-5 text-gray-500">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است.
      </p>
      <Button tabIndex={-1} className="pointer-events-none mt-auto">
        اطلاعات بیشتر
      </Button>
    </Link>
  );
}
