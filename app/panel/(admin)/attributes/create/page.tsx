"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { AttributeForm } from "@/components/attribute/AttributeForm";
import type { AttributeFormValues } from "@/types/attribute";

export default function CreateAttributePage() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const createMutation = trpc.attribute.create.useMutation({
    onSuccess: async () => {
      toast.success("ویژگی با موفقیت ایجاد شد");
      await utils.attribute.getAll.invalidate();
      router.push("/panel/attributes");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (values: AttributeFormValues) => {
    createMutation.mutate(values);
  };

  return (
    <div className="font-peyda-regular text-right">
      <h1 style={{ padding: "20px 20px 0" }}>ساخت ویژگی</h1>
      <AttributeForm
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
        submitLabel="ایجاد"
      />
    </div>
  );
}
