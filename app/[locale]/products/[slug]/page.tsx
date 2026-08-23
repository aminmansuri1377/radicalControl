"use client";

import { useParams } from "next/navigation";

import { trpc } from "@/lib/trpc/client";
import { useDecodedParams } from "@/hooks/useDecodedParam";

export default function ProductPage() {
  const params = useDecodedParams<{ locale: string; slug: string }>();

  const locale = params.locale as string;
  const slug = params.slug as string;

  console.log("locale", locale);
  console.log("slug", slug);

  const { data, isLoading, error } = trpc.public.getProductBySlug.useQuery({
    locale,
    slug,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error.message}
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        Product Not Found
        <br />
        slug: {slug}
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>{data.name}</h1>

      <hr />

      <p>
        <strong>Slug:</strong> {data.slug}
      </p>

      <p>
        <strong>Language:</strong> {data.language.code}
      </p>

      <hr />

      <div>{data.description}</div>

      <hr />

      <div>{data.specifications}</div>

      {data.product.attributeValues &&
        data.product.attributeValues.length > 0 && (
          <>
            <hr />
            <h2>ویژگی‌ها</h2>
            <table
              className="w-full max-w-md border-collapse text-sm"
              style={{ direction: "rtl" }}
            >
              <tbody>
                {data.product.attributeValues.map((av) => {
                  const attrName = av.value.attribute.translations[0]?.name;
                  const valLabel = av.value.translations[0]?.label;
                  if (!attrName || !valLabel) return null;
                  return (
                    <tr key={av.id} className="border-b border-border">
                      <td className="py-2 ps-2 font-medium">{attrName}</td>
                      <td className="py-2 ps-2">{valLabel}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
    </div>
  );
}
