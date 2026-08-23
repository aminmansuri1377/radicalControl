"use client";

import { useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { trpc } from "@/lib/trpc/client";
import { attributeName, valueLabel } from "@/lib/attribute";
import { Badge } from "../ui";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/Table";

type AttributeRow = {
  id: string;
  slug: string;
  published: boolean;
  filterable: boolean;
  sortOrder: number;
  translations: { languageId: string; name: string; language?: { code: string } }[];
  values: {
    id: string;
    slug: string;
    translations: { languageId: string; label: string; language?: { code: string } }[];
  }[];
};

export function AttributeList() {
  const utils = trpc.useUtils();
  const { data: attributes = [], isLoading, error } =
    trpc.attribute.getAll.useQuery();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const deleteMutation = trpc.attribute.delete.useMutation({
    onSuccess: async () => {
      toast.success("ویژگی حذف شد");
      await utils.attribute.getAll.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <div className="font-peyda-regular">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">ویژگی‌های محصول</h1>
        <Link
          href="/panel/attributes/create"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          + ویژگی جدید
        </Link>
      </div>

      <div className="rounded-xl border border-border">
        {isLoading ? (
          <div className="p-6 text-sm text-muted-foreground">در حال بارگذاری...</div>
        ) : attributes.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              هنوز هیچ ویژگی‌ای ثبت نشده
            </p>
            <Link
              href="/panel/attributes/create"
              className="mt-2 text-sm font-medium text-primary hover:underline"
            >
              ساخت اولین ویژگی
            </Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام ویژگی</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>مقادیر</TableHead>
                <TableHead>قابل فیلتر</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attributes.map((attr: AttributeRow) => (
                <TableRow key={attr.id}>
                  <TableCell className="font-medium">
                    {attributeName(attr)}
                  </TableCell>
                  <TableCell>{attr.slug}</TableCell>
                  <TableCell>
                    {attr.values.length === 0 ? (
                      <span className="text-muted-foreground">—</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {attr.values.map((v) => (
                          <Badge key={v.id} variant="secondary" size="sm">
                            {valueLabel(v)}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {attr.filterable ? (
                      <Badge variant="success" size="sm">
                        بله
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground">خیر</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {attr.published ? (
                      <Badge variant="success" size="sm">
                        منتشر
                      </Badge>
                    ) : (
                      <Badge variant="secondary" size="sm">
                        پیش‌نویس
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/panel/attributes/${attr.id}`}
                        className="text-primary hover:underline"
                      >
                        ویرایش
                      </Link>
                      <span className="text-muted-foreground">|</span>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              `ویژگی «${attributeName(attr)}» و همه مقادیرش حذف شوند؟`,
                            )
                          ) {
                            deleteMutation.mutate({ id: attr.id });
                          }
                        }}
                        disabled={deleteMutation.isPending}
                        className="text-destructive hover:underline disabled:opacity-50"
                      >
                        حذف
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
