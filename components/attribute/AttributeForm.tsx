"use client";

import { useEffect } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { attributeSchema, type AttributeFormValues } from "@/types/attribute";
import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui";
import { TrashIcon, PlusIcon } from "../ui/icon";

interface AttributeFormProps {
  defaultValues?: AttributeFormValues;
  onSubmit: (values: AttributeFormValues) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

const buildEmptyTranslation = (languageId: string) => ({
  languageId,
  name: "",
});

const buildEmptyValue = (languages: { id: string }[]) => ({
  slug: "",
  sortOrder: 0,
  translations: languages.map((l) => ({ languageId: l.id, label: "" })),
});

export function AttributeForm({
  defaultValues,
  onSubmit,
  isLoading,
  submitLabel = "ایجاد",
}: AttributeFormProps) {
  const { data: languages = [] } = trpc.language.getAll.useQuery();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AttributeFormValues>({
    resolver: zodResolver(attributeSchema) as unknown as Resolver<AttributeFormValues>,
    defaultValues: defaultValues ?? {
      slug: "",
      published: true,
      filterable: true,
      sortOrder: 0,
      translations: [],
      values: [],
    },
  });

  const { fields: langFields, replace: replaceLangs } = useFieldArray({
    control,
    name: "translations",
  });
  const { fields: valueFields, append, remove } = useFieldArray({
    control,
    name: "values",
  });

  // وقتی لیست زبان‌ها لود شد، فیلدهای ترجمه‌ی نام را همگام می‌کنیم
  useEffect(() => {
    if (!languages.length) return;
    const merged = languages.map((lang) => {
      const existing = defaultValues?.translations?.find(
        (t) => t.languageId === lang.id,
      );
      return existing ?? buildEmptyTranslation(lang.id);
    });
    replaceLangs(merged);
  }, [languages, defaultValues, replaceLangs]);

  // هنگام ویرایش، مقدار کل فرم را با مقادیر پیش‌فرض ست می‌کنیم
  useEffect(() => {
    if (!defaultValues || !languages.length) return;
    const mergedLangs = languages.map((lang) => {
      const existing = defaultValues.translations?.find(
        (t) => t.languageId === lang.id,
      );
      return existing ?? buildEmptyTranslation(lang.id);
    });
    const mergedValues = defaultValues.values.map((v) => ({
      id: v.id,
      slug: v.slug,
      sortOrder: v.sortOrder,
      translations: languages.map((lang) => {
        const existing = v.translations.find(
          (t) => t.languageId === lang.id,
        );
        return existing ?? { languageId: lang.id, label: "" };
      }),
    }));
    reset({
      ...defaultValues,
      translations: mergedLangs,
      values: mergedValues,
    });
  }, [defaultValues, languages, reset]);

  const handleAddValue = () => {
    if (!languages.length) {
      toast.error("ابتدا منتظر بارگذاری زبان‌ها باشید");
      return;
    }
    append(buildEmptyValue(languages));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 20 }}>
      {Object.keys(errors).length > 0 && (
        <div
          style={{
            background: "#fee",
            padding: 10,
            marginBottom: 10,
            color: "red",
          }}
        >
          فرم دارای خطا است. لطفاً همه‌ی فیلدهای اجباری را پر کنید.
        </div>
      )}

      <div>
        <label>main Slug</label>
        <br />
        <input
          placeholder="مثلاً color"
          className="px-5 py-1 rounded-2xl border-2 border-primary"
          {...register("slug")}
        />
        {errors.slug && (
          <span style={{ color: "red" }}>{errors.slug.message}</span>
        )}
      </div>
      <br />

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2">
          Published
          <Controller
            name="published"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </label>

        <label className="flex items-center gap-2">
          قابل فیلتر (نمایش در صفحه محصولات)
          <Controller
            name="filterable"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </label>

        <label className="flex items-center gap-2">
          ترتیب
          <input
            type="number"
            className="w-20 px-2 py-1 rounded-2xl border-2 border-primary"
            {...register("sortOrder", { valueAsNumber: true })}
          />
        </label>
      </div>

      <hr className="my-6" />
      <h3>نام ویژگی به ازای هر زبان</h3>

      {langFields.map((field, index) => {
        const lang = languages.find((l) => l.id === field.languageId);
        const tErrors = errors.translations?.[index];
        return (
          <div
            key={field.id}
            className="my-3 flex items-center gap-3 rounded-md border border-border p-3"
          >
            <span className="min-w-28 font-medium">
              {lang ? `${lang.name ?? ""} (${lang.code})` : field.languageId}
            </span>
            <input
              type="hidden" {...register(`translations.${index}.languageId`)} />
            <input
              placeholder="مثلاً رنگ"
              className="flex-1 px-5 py-1 rounded-2xl border-2 border-primary"
              {...register(`translations.${index}.name`)}
            />
            {tErrors?.name && (
              <span style={{ color: "red", fontSize: 12 }}>
                {tErrors.name.message}
              </span>
            )}
          </div>
        );
      })}

      <hr className="my-6" />
      <div className="mb-4 flex items-center justify-between">
        <h3>مقادیر ویژگی</h3>
        <Button type="button" variant="outline" onClick={handleAddValue}>
          <PlusIcon className="me-1 size-4" />
          افزودن مقدار
        </Button>
      </div>

      {valueFields.length === 0 && (
        <p className="text-sm text-muted-foreground">
          هنوز مقداری اضافه نشده. مثلاً برای رنگ: آبی، قرمز، مشکی.
        </p>
      )}

      {valueFields.map((field, index) => {
        const tErrors = errors.values?.[index];
        return (
          <div
            key={field.id}
            className="mb-4 rounded-md border border-border p-4"
          >
            <div className="mb-3 flex items-center gap-3">
              <input
                type="hidden" {...register(`values.${index}.id`)} />
              <label className="flex items-center gap-2 text-sm">
                Slug:
                <input
                  placeholder="مثلاً blue"
                  className="px-3 py-1 rounded-2xl border-2 border-primary"
                  {...register(`values.${index}.slug`)}
                />
              </label>
              <label className="flex items-center gap-2 text-sm">
                ترتیب:
                <input
                  type="number"
                  className="w-20 px-2 py-1 rounded-2xl border-2 border-primary"
                  {...register(`values.${index}.sortOrder`, {
                    valueAsNumber: true,
                  })}
                />
              </label>
              <button
                type="button"
                onClick={() => remove(index)}
                aria-label="حذف مقدار"
                className="ms-auto inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-destructive hover:bg-destructive/10"
              >
                <TrashIcon className="size-4" />
                حذف
              </button>
            </div>

            {tErrors?.slug && (
              <span style={{ color: "red", fontSize: 12 }}>
                {tErrors.slug.message}
              </span>
            )}

            <div className="space-y-2">
              {languages.map((lang, li) => {
                const vtError = tErrors?.translations?.[li];
                return (
                  <div key={lang.id} className="flex items-center gap-3">
                    <span className="min-w-28 text-sm text-muted-foreground">
                      {lang.name ?? ""} ({lang.code})
                    </span>
                    <input
                      type="hidden"
                      {...register(`values.${index}.translations.${li}.languageId`)}
                    />
                    <input
                      placeholder="مثلاً آبی"
                      className="flex-1 px-3 py-1 rounded-2xl border-2 border-primary"
                      {...register(`values.${index}.translations.${li}.label`)}
                    />
                    {vtError?.label && (
                      <span style={{ color: "red", fontSize: 12 }}>
                        {vtError.label.message}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
