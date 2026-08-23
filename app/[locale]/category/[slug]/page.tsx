"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

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

export default function CategoryPage() {
  const params = useDecodedParams<{ locale: string; slug: string }>();

  const locale = params.locale as string;

  const slug = params.slug as string;

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [attributeFilters, setAttributeFilters] = useState<AttributeFilterState>(
    {},
  );

  const debouncedSearch = useDebounce(search, 500);

  // ویژگی‌های قابل‌فیلتر برای این زبان
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
      {
        placeholderData: (previousData) => previousData,
      },
    );
  useEffect(() => {
    if (error) {
      toast.error(error.message || "خطا در دریافت");
    }
  }, [error]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Not Found</div>;
  }

  return (
    <div className="m-10 lg:m-20">
      <h1>{data.category.name}</h1>

      <hr />

      <h2>Sub Categories</h2>

      {data.children.length === 0 ? (
        <div>No Sub Categories</div>
      ) : (
        data.children.map((child) => {
          const t = child.translations[0];

          return (
            <div key={child.id}>
              <Link href={`/${locale}/category/${t.slug}`}>{t.name}</Link>
            </div>
          );
        })
      )}

      <hr />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        {/* ستون فیلتر */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <AttributeFilter
            attributes={filterAttributes}
            value={attributeFilters}
            onChange={(next) => {
              setAttributeFilters(next);
              setPage(1);
            }}
          />
        </aside>

        {/* ستون محصولات */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <ProductSearch
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
            />
          </div>

          {isFetching && (
            <div style={{ marginBottom: 10 }}>Searching...</div>
          )}

          <div style={{ marginBottom: 15, fontWeight: 600 }}>
            Total Products: {data.total}
          </div>

          <h2>Products</h2>

          {data.products.length === 0 ? (
            <div>No Products Found</div>
          ) : (
            <ul className="space-y-2">
              {data.products.map((product) => {
                const t = product.translations[0];
                return (
                  <li key={product.id}>
                    <Link href={`/${locale}/products/${t.slug}`}>
                      {t.name}
                    </Link>
                    {/* نمایش ویژگی‌های محصول به‌صورت خلاصه */}
                    {product.attributeValues?.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {product.attributeValues.map((av) => {
                          const attrName =
                            av.value.attribute.translations[0]?.name;
                          const valLabel =
                            av.value.translations[0]?.label;
                          if (!attrName || !valLabel) return null;
                          return (
                            <span
                              key={av.id}
                              className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                            >
                              {attrName}: {valLabel}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
