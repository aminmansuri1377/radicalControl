import { z } from "zod";

// --- ترجمه‌ی نام ویژگی (Attribute) به ازای هر زبان ---
export const attributeTranslationSchema = z.object({
  languageId: z.string().min(1, "Required"),
  name: z.string().min(1, "نام ویژگی الزامی است"),
});

// --- ترجمه‌ی برچسبِ مقدار ویژگی (AttributeValue) به ازای هر زبان ---
export const attributeValueTranslationSchema = z.object({
  languageId: z.string().min(1, "Required"),
  label: z.string().min(1, "برچسب مقدار الزامی است"),
});

// --- یک مقدار از ویژگی (مثلاً: آبی، قرمز، مشکی) ---
export const attributeValueSchema = z.object({
  id: z.string().optional(), // فقط در حالت ویرایش برای تطبیق مقدار موجود
  slug: z.string().min(1, "Slug مقدار الزامی است"),
  sortOrder: z.number().default(0),
  translations: z.array(attributeValueTranslationSchema).min(1),
});

// --- کل فرمِ ساخت/ویرایش ویژگی ---
export const attributeSchema = z.object({
  slug: z.string().min(1, "Slug الزامی است"),
  published: z.boolean(),
  filterable: z.boolean(),
  sortOrder: z.number().default(0),
  translations: z.array(attributeTranslationSchema).min(1),
  values: z.array(attributeValueSchema),
});

export type AttributeFormValues = z.infer<typeof attributeSchema>;
export type AttributeValueFormValues = z.infer<typeof attributeValueSchema>;
