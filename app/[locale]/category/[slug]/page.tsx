"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { trpc } from "@/lib/trpc/client";
import { ProductSearch } from "@/components/site/ProductSearch";
import { Pagination } from "@/components/site/Pagination";
import { useDebounce } from "@/hooks/useDebounce";
import toast from "react-hot-toast";
import { useDecodedParams } from "@/hooks/useDecodedParam";
import {
  AttributeFilter,
  type AttributeFilterState,
} from "@/components/attribute/AttributeFilter";
import { SubcategoryCard } from "@/components/ui/SubcategoryCard";
import { ProductCard } from "@/components/ui/ProductCard";

export default function CategoryPage() {
  const params = useDecodedParams<{ locale: string; slug: string }>();
  const locale = params.locale as string,
    slug = params.slug as string;
  const [search, setSearch] = useState(""),
    [page, setPage] = useState(1);
  const [attributeFilters, setAttributeFilters] =
    useState<AttributeFilterState>({});
  const debouncedSearch = useDebounce(search, 500);
  const { data: filterAttributes = [] } =
    trpc.public.getFilterableAttributes.useQuery({ locale });
  const { data, isLoading, isFetching, error } =
    trpc.public.getCategoryPage.useQuery(
      {
        locale,
        slug,
        search: debouncedSearch,
        attributeFilters,
        page,
        limit: 12,
      },
      { placeholderData: (p) => p },
    );
  useEffect(() => {
    if (error) toast.error(error.message || "خطا در دریافت");
  }, [error]);
  if (isLoading)
    return <div className="p-20 text-center">در حال بارگذاری...</div>;
  if (!data) return <div className="p-20 text-center">یافت نشد</div>;
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white px-5 pb-12 pt-8 font-PeydaRegular text-[#151515] lg:px-16"
    >
      <section
        className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-8 py-4 md:flex-row md:justify-between md:gap-16"
        dir="ltr"
      >
        <div className="relative h-64 w-full max-w-[420px] shrink-0">
          <Image
            src="/images/Objets.png"
            alt="تجهیزات بانک خازنی"
            fill
            className="object-contain"
          />
          <Image
            src="/images/kalakaj.png"
            alt=""
            width={250}
            height={250}
            className="absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2 object-contain"
          />
        </div>
        <div dir="rtl" className="max-w-xl text-right">
          <h1 className="font-PeydaBlack text-3xl">تجهیزات بانک خازنی</h1>
          <p className="mt-4 text-sm leading-8 text-gray-600">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چرخ‌چرخ و مینیمال نوشته و مملو از
            جزئیات برای انتخابی مطمئن و حرفه‌ای.
          </p>
          <div className="mt-5 flex gap-3">
            <button className="rounded-full bg-[#723ac9] px-8 py-2 text-sm text-white">
              استعلام قیمت
            </button>
            <ProductSearch
              value={search}
              onChange={(v) => {
                setSearch(v);
                setPage(1);
              }}
            />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl">
        <h2 className="mb-5 text-center font-PeydaBlack text-2xl">
          زیر گروه های این دسته
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3">
          {data.children.length ? (
            data.children.map((child: any, i: number) => {
              const t = child.translations[0];
              return (
                <SubcategoryCard
                  key={child.id}
                  name={t.name}
                  href={`/${locale}/category/${t.slug}`}
                  image={i % 2 ? "/images/product.png" : "/images/product2.png"}
                />
              );
            })
          ) : (
            <p>زیرگروهی وجود ندارد</p>
          )}
        </div>
      </section>
      <section className="mx-auto mt-8 max-w-6xl">
        <h2 className="mb-5 text-right font-PeydaBlack text-2xl">
          محصولات این دسته
        </h2>
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-[190px_1fr]">
          <aside className="rounded-xl">
            {" "}
            <AttributeFilter
              attributes={filterAttributes}
              value={attributeFilters}
              onChange={(next) => {
                setAttributeFilters(next);
                setPage(1);
              }}
            />
          </aside>
          <div>
            <div className="mb-3 flex items-center justify-between text-sm text-gray-500">
              <span>تعداد محصولات: {data.total}</span>
              {isFetching && <span>در حال جستجو...</span>}
            </div>
            {data.products.length ? (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {data.products.map((product: any, i: number) => {
                  const t = product.translations[0];
                  return (
                    <ProductCard
                      key={product.id}
                      name={t.name}
                      href={`/${locale}/products/${t.slug}`}
                      image={
                        i % 2 ? "/images/product.png" : "/images/product2.png"
                      }
                      available={i !== 6}
                    />
                  );
                })}
              </div>
            ) : (
              <div>محصولی یافت نشد</div>
            )}
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
