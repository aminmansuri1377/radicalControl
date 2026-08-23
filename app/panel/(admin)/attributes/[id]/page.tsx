"use client";

import { useMemo } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { AttributeForm } from "@/components/attribute/AttributeForm";
import type { AttributeFormValues } from "@/types/attribute";

export default function EditAttributePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const utils = trpc.useUtils();

  const { data, isLoading } = trpc.attribute.getById.useQuery(
    { id },
    { enabled: !!id },
  );

  const updateMutation = trpc.attribute.update.useMutation({
    onSuccess: async () => {
      toast.success("ویژگی بروزرسانی شد");
      await utils.attribute.getAll.invalidate();
      await utils.attribute.getById.invalidate({ id });
      router.push("/panel/attributes");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const defaultValues = useMemo<AttributeFormValues | undefined>(() => {
    if (!data) return undefined;
    return {
      slug: data.slug,
      published: data.published,
      filterable: data.filterable,
      sortOrder: data.sortOrder,
      translations: data.translations.map((t) => ({
        languageId: t.languageId,
        name: t.name,
      })),
      values: data.values.map((v) => ({
        id: v.id,
        slug: v.slug,
        sortOrder: v.sortOrder,
        translations: v.translations.map((vt) => ({
          languageId: vt.languageId,
          label: vt.label,
        })),
      })),
    };
  }, [data]);

  const handleSubmit = (values: AttributeFormValues) => {
    updateMutation.mutate({ id, ...values });
  };

  if (!id) return <div>Invalid ID</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h1 style={{ padding: "20px 20px 0" }}>ویرایش ویژگی</h1>
      <AttributeForm
        key={data?.id}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        isLoading={updateMutation.isPending}
        submitLabel="بروزرسانی"
      />
    </>
  );
}
