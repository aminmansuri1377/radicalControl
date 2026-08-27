"use client";
import DotPattern from "./DotPattern";
import SectionBorderTitle from "./SectionBorderTitle";
import { Button } from "../ui";
import CategoryCard from "./CategoryCard";

interface Category {
  id: number;
  imageSrc: string;
  title: string;
  imageAlt: string;
  variant: "light" | "dark";
}

const categories: Category[] = [
  {
    id: 1,
    imageSrc: "/images/banner1.jpg",
    title: "کـلیـد هـا و سـویچ ها",
    imageAlt: "کلید و سویچ",
    variant: "light",
  },
  {
    id: 2,
    imageSrc: "/images/banner2.jpg",
    title: "تـجهیـزات بـانک خازنی",
    imageAlt: "بانک خازنی",
    variant: "light",
  },
  {
    id: 3,
    imageSrc: "/images/banner3.jpg",
    title: "درایـــو ها و ســافــت",
    imageAlt: "درایو و سافت استارتر",
    variant: "light",
  },
  {
    id: 4,
    imageSrc: "/images/banner4.jpg",
    title: "کنـتــاکتــور و رلــه هـا",
    imageAlt: "کنتاکتور و رله",
    variant: "dark",
  },
  {
    id: 5,
    imageSrc: "/images/banner5.jpg",
    title: "بدنه / مونتاژ تابلو برق",
    imageAlt: "تابلو برق",
    variant: "light",
  },
  {
    id: 6,
    imageSrc: "/images/banner6.jpg",
    title: "اتـومـاسیـون صنعتـی",
    imageAlt: "اتوماسیون",
    variant: "light",
  },
  {
    id: 7,
    imageSrc: "/images/banner7.jpg",
    title: "سیــم بـــرق و کــابـل",
    imageAlt: "سیم و کابل",
    variant: "light",
  },
];

export default function CategorySection({
  withMore = false,
}: {
  withMore?: boolean;
}) {
  return (
    <section className="relative py-10 px-6 md:px-12 lg:px-20 overflow-hidden font-peyda-medium">
      {/* Dot Pattern Background */}
      <DotPattern />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6 font-peyda-black text-2xl md:text-4xl">
            دسته بندی محصولات
          </div>
          <p
            className="text-gray-600 text-sm max-w-3xl mx-auto leading-relaxed"
            dir="rtl"
          >
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است.
          </p>
        </div>

        {/* Categories Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              imageSrc={category.imageSrc}
              title={category.title}
              imageAlt={category.imageAlt}
              variant={category.variant}
            />
          ))}
        </div>

        {/* More Button */}
        {withMore && (
          <div className="flex justify-start mt-12">
            <Button
              variant="primary"
              className="px-8 transition-all duration-300 "
              dir="rtl"
            >
              مشاهده بیشتر
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
