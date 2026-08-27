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

export function ProductRequestForm() {
  const router = useRouter();

  const mutation = trpc.contactRequest.create.useMutation({
    onSuccess() {
      toast.success("درخواست شما با موفقیت ثبت شد.");
      router.refresh();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactRequestFormValues>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      companyName: "",
      // این فرم زیرمجموعه‌ی همون contactRequest هست، برای اینکه توی دیتابیس
      // مشخص باشه از کجا اومده subject رو ثابت پر می‌کنیم.
      subject: "درخواست کالا",
      message: "",
    },
  });

  const onSubmit = (values: ContactRequestFormValues) => {
    mutation.mutate(values, {
      onSuccess: () => reset(),
    });
  };

  const inputClass = (hasError?: boolean) =>
    `w-full rounded-full border bg-white px-6 py-3.5 text-center text-sm text-gray-700 placeholder-gray-400 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary/40 ${
      hasError ? "border-red-400" : "border-primary/20"
    }`;

  return (
    <div className="w-full rounded-[2rem] border border-primary/10 bg-white p-8 shadow-[0_20px_45px_-20px_rgba(124,58,237,0.25)] md:p-10">
      <h3 className="mb-7 text-xl font-bold text-gray-900">فرم درخواست کالا</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            id="fullName"
            type="text"
            placeholder="نام و نام خانوادگی"
            className={inputClass(!!errors.fullName)}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1 px-4 text-xs text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <input
            id="phone"
            type="tel"
            dir="ltr"
            placeholder="شماره تماس"
            className={inputClass(!!errors.phone)}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 px-4 text-xs text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <input
            id="email"
            type="email"
            dir="ltr"
            placeholder="ایمیل"
            className={inputClass(!!errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 px-4 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            id="companyName"
            type="text"
            placeholder="نام شرکت"
            className={inputClass(!!errors.companyName)}
            {...register("companyName")}
          />
          {errors.companyName && (
            <p className="mt-1 px-4 text-xs text-red-500">
              {errors.companyName.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            id="message"
            rows={1}
            placeholder="توضیحات"
            className={`${inputClass(
              !!errors.message,
            )} resize-none rounded-full leading-6`}
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 px-4 text-xs text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="mt-2 w-full rounded-full bg-primary py-3.5 text-white hover:bg-primary/90"
        >
          {mutation.isPending ? "در حال ارسال..." : "ارسال اطلاعات"}
        </Button>
      </form>
    </div>
  );
}
