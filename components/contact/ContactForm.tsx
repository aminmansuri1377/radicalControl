"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  contactRequestSchema,
  ContactRequestFormValues,
} from "@/types/contactRequest";

import { trpc } from "@/lib/trpc/client";
import { Button } from "../ui";

export function ContactForm() {
  const router = useRouter();

  const mutation = trpc.contactRequest.create.useMutation({
    onSuccess() {
      toast.success("پیام با موفقیت ارسال شد.");
      router.refresh();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const form = useForm<ContactRequestFormValues>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = (values: ContactRequestFormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const inputClass = (error?: boolean) =>
    `w-full rounded-full border bg-white px-6 py-3 text-right text-gray-800
    placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary
    transition-all ${error ? "border-red-500" : "border-gray-900"}`;

  return (
    <section className="p-0 font-peyda-medium" dir="rtl">
      <div className="mx-auto rounded-3xl bg-white p-7 md:p-10">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-peyda-bold text-gray-900 md:text-3xl">
            فرم اطلاعات
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {Object.keys(errors).length > 0 && (
            <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-center text-sm text-red-600">
              ارسال پیام با شکست مواجه شد.
            </div>
          )}

          {/* نام و نام خانوادگی */}
          <div>
            <label htmlFor="fullName" className="sr-only">
              نام و نام خانوادگی
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="نام و نام خانوادگی"
              className={inputClass(!!errors.fullName)}
              {...register("fullName")}
            />

            {errors.fullName && (
              <p className="mt-1 text-right text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* شماره تماس */}
          <div>
            <label htmlFor="phone" className="sr-only">
              شماره تماس
            </label>

            <input
              id="phone"
              type="tel"
              dir="ltr"
              placeholder="شماره تماس"
              className={`${inputClass(!!errors.phone)} text-right`}
              {...register("phone")}
            />

            {errors.phone && (
              <p className="mt-1 text-right text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* ایمیل */}
          <div>
            <label htmlFor="email" className="sr-only">
              ایمیل
            </label>

            <input
              id="email"
              type="email"
              dir="ltr"
              placeholder="ایمیل"
              className={`${inputClass(!!errors.email)} text-right`}
              {...register("email")}
            />

            {errors.email && (
              <p className="mt-1 text-right text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* نام شرکت */}
          <div>
            <label htmlFor="companyName" className="sr-only">
              نام شرکت
            </label>

            <input
              id="companyName"
              type="text"
              placeholder="نام شرکت"
              className={inputClass(!!errors.companyName)}
              {...register("companyName")}
            />

            {errors.companyName && (
              <p className="mt-1 text-right text-sm text-red-600">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* موضوع */}
          <div>
            <label htmlFor="subject" className="sr-only">
              موضوع
            </label>

            <input
              id="subject"
              type="text"
              placeholder="موضوع پیام"
              className={inputClass(!!errors.subject)}
              {...register("subject")}
            />

            {errors.subject && (
              <p className="mt-1 text-right text-sm text-red-600">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* توضیحات */}
          <div>
            <label htmlFor="message" className="sr-only">
              توضیحات
            </label>

            <textarea
              id="message"
              rows={1}
              placeholder="توضیحات"
              className={`w-full resize-none rounded-full border bg-white px-6 py-3
              text-right text-gray-800 placeholder:text-gray-600
              focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                errors.message ? "border-red-500" : "border-gray-900"
              }`}
              {...register("message")}
            />

            {errors.message && (
              <p className="mt-1 text-right text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* دکمه ارسال */}
          <div className="pt-1">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full rounded-full bg-primary"
            >
              {mutation.isPending ? "در حال ارسال..." : "ارسال اطلاعات"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
