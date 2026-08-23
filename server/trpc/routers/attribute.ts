import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure, adminProcedure } from "../init";

// --- اسکیمای ترجمه‌ی نام ویژگی ---
const translationInput = z.object({
  languageId: z.string(),
  name: z.string(),
});

// --- اسکیمای ترجمه‌ی برچسبِ مقدار ویژگی ---
const valueTranslationInput = z.object({
  languageId: z.string(),
  label: z.string(),
});

// --- اسکیمای یک مقدار ویژگی ---
const valueInput = z.object({
  id: z.string().optional(), // فقط هنگام ویرایش برای تطبیق
  slug: z.string(),
  sortOrder: z.number().default(0),
  translations: z.array(valueTranslationInput),
});

// تضمین یکتایی زبان داخل هر گروه ترجمه + جلوگیری از slug تکراری داخل یک ویژگی
function validateAttributeInput(input: {
  translations: { languageId: string }[];
  values: { slug: string; translations: { languageId: string }[] }[];
}) {
  // یکتایی زبان در نام ویژگی
  const langSeen = new Set<string>();
  for (const t of input.translations) {
    if (langSeen.has(t.languageId)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "برای هر زبان فقط یک نام ویژگی وارد کنید",
      });
    }
    langSeen.add(t.languageId);
  }

  // یکتایی slug مقادیر + یکتایی زبان داخل هر مقدار
  const slugSeen = new Set<string>();
  for (const v of input.values) {
    if (slugSeen.has(v.slug)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `slug تکراری برای مقدار: «${v.slug}»`,
      });
    }
    slugSeen.add(v.slug);

    const vLangSeen = new Set<string>();
    for (const vt of v.translations) {
      if (vLangSeen.has(vt.languageId)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `برای هر زبان فقط یک برچسب برای مقدار «${v.slug}» وارد کنید`,
        });
      }
      vLangSeen.add(vt.languageId);
    }
  }
}

export const attributeRouter = router({
  // لیست همه‌ی ویژگی‌ها همراه با مقادیر و ترجمه‌ها
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.attribute.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        translations: { include: { language: true } },
        values: {
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
          include: {
            translations: { include: { language: true } },
          },
        },
      },
    });
  }),

  // یک ویژگی با تمام جزئیات
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.attribute.findUnique({
        where: { id: input.id },
        include: {
          translations: { include: { language: true } },
          values: {
            orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
            include: {
              translations: { include: { language: true } },
            },
          },
        },
      });
    }),

  create: adminProcedure
    .input(
      z.object({
        slug: z.string(),
        published: z.boolean().default(true),
        filterable: z.boolean().default(true),
        sortOrder: z.number().default(0),
        translations: z.array(translationInput),
        values: z.array(valueInput).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        validateAttributeInput(input);

        return await ctx.prisma.attribute.create({
          data: {
            slug: input.slug,
            published: input.published,
            filterable: input.filterable,
            sortOrder: input.sortOrder,
            translations: { create: input.translations },
            values: {
              create: input.values.map((v) => ({
                slug: v.slug,
                sortOrder: v.sortOrder,
                translations: { create: v.translations },
              })),
            },
          },
          include: {
            translations: true,
            values: { include: { translations: true } },
          },
        });
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "خطا در ایجاد ویژگی",
        });
      }
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        slug: z.string(),
        published: z.boolean(),
        filterable: z.boolean(),
        sortOrder: z.number().default(0),
        translations: z.array(translationInput),
        values: z.array(valueInput).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        validateAttributeInput(input);

        const { id, translations, values, ...rest } = input;

        const exists = await ctx.prisma.attribute.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!exists) {
          throw new TRPCError({ code: "NOT_FOUND", message: "ویژگی پیدا نشد" });
        }

        // ۱) به‌روزرسانی فیلدهای اصلی ویژگی
        await ctx.prisma.attribute.update({ where: { id }, data: rest });

        // ۲) upsert ترجمه‌های نام ویژگی
        for (const translation of translations) {
          await ctx.prisma.attributeTranslation.upsert({
            where: {
              attributeId_languageId: {
                attributeId: id,
                languageId: translation.languageId,
              },
            },
            update: { name: translation.name },
            create: { attributeId: id, ...translation },
          });
        }

        // ۳) مدیریت مقادیر: حذفِ حذف‌شده‌ها، upsert موجودها، ساخت جدیدها
        const incomingIds = values
          .map((v) => v.id)
          .filter((v): v is string => Boolean(v));

        // مقادیری که دیگر در لیست ورودی نیستند → حذف (کِیسکِید ترجمه‌ها را هم می‌برد)
        await ctx.prisma.attributeValue.deleteMany({
          where: {
            attributeId: id,
            id: { notIn: incomingIds },
          },
        });

        for (const v of values) {
          if (v.id) {
            // مقدار موجود → به‌روزرسانی + upsert ترجمه‌ها
            await ctx.prisma.attributeValue.update({
              where: { id: v.id },
              data: { slug: v.slug, sortOrder: v.sortOrder },
            });
            for (const vt of v.translations) {
              await ctx.prisma.attributeValueTranslation.upsert({
                where: {
                  valueId_languageId: {
                    valueId: v.id,
                    languageId: vt.languageId,
                  },
                },
                update: { label: vt.label },
                create: { valueId: v.id, ...vt },
              });
            }
          } else {
            // مقدار جدید → ساخت
            await ctx.prisma.attributeValue.create({
              data: {
                attributeId: id,
                slug: v.slug,
                sortOrder: v.sortOrder,
                translations: { create: v.translations },
              },
            });
          }
        }

        // پاکسازی ترجمه‌های نامِ زبان‌هایی که دیگر در لیست نیستند (اختیاری برای تمیزی)
        const incomingLangIds = translations.map((t) => t.languageId);
        await ctx.prisma.attributeTranslation.deleteMany({
          where: { attributeId: id, languageId: { notIn: incomingLangIds } },
        });

        return true;
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "خطا در بروزرسانی ویژگی",
        });
      }
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const exists = await ctx.prisma.attribute.findUnique({
          where: { id: input.id },
          select: { id: true },
        });
        if (!exists) {
          throw new TRPCError({ code: "NOT_FOUND", message: "ویژگی پیدا نشد" });
        }

        await ctx.prisma.attribute.delete({ where: { id: input.id } });
        return true;
      } catch (error) {
        if (error instanceof TRPCError) throw error;

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "خطا در حذف ویژگی",
        });
      }
    }),
});
