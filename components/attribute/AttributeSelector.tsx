"use client";

import { useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { MultiSelect } from "../ui";
import type { DropdownOption } from "../ui/Dropdown";
import { attributeName, valueLabel } from "@/lib/attribute";

interface AttributeSelectorProps {
  /** مقادیر انتخاب‌شده (valueId ها) */
  value: string[];
  onChange: (valueIds: string[]) => void;
}

type AttributeData = {
  id: string;
  slug: string;
  published: boolean;
  filterable: boolean;
  translations: { languageId: string; name: string; language?: { code: string } }[];
  values: {
    id: string;
    slug: string;
    translations: { languageId: string; label: string; language?: { code: string } }[];
  }[];
};

/**
 * نمایش همه‌ی ویژگی‌ها به‌صورت گروهی؛ هر ویژگی یک MultiSelect از مقادیرش.
 * انتخاب‌ها به‌صورت یک آرایه‌ی یکپارچه از valueId ها مدیریت می‌شود.
 */
export function AttributeSelector({ value, onChange }: AttributeSelectorProps) {
  const { data: attributes = [] } = trpc.attribute.getAll.useQuery();

  const valueSet = useMemo(() => new Set(value), [value]);

  if (attributes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        هنوز ویژگی‌ای تعریف نشده. ابتدا از بخش «ویژگی‌ها» ویژگی بسازید.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {(attributes as AttributeData[]).map((attr) => {
        const options: DropdownOption[] = attr.values.map((v) => ({
          value: v.id,
          label: valueLabel(v),
        }));
        const selected = attr.values
          .filter((v) => valueSet.has(v.id))
          .map((v) => v.id);

        return (
          <div key={attr.id} className="space-y-1">
            <label className="text-sm font-medium">{attributeName(attr)}</label>
            {options.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                این ویژگی مقداری ندارد.
              </p>
            ) : (
              <MultiSelect
                options={options}
                value={selected}
                onChange={(next) => {
                  // مقدارهای این ویژگی را با انتخاب‌های جدید جایگزین می‌کنیم و
                  // بقیه‌ی ویژگی‌ها را دست‌نخورده نگه می‌داریم.
                  const others = value.filter(
                    (id) => !options.some((o) => o.value === id),
                  );
                  onChange([...others, ...next]);
                }}
                placeholder={`انتخاب ${attributeName(attr)}`}
                searchPlaceholder="جستجو..."
                emptyMessage="مقداری موجود نیست"
                showChips
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
