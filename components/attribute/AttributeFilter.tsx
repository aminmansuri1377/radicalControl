"use client";

import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { CheckIcon } from "../ui/icon";

interface FilterValue {
  id: string;
  slug: string;
  translations: { label: string }[];
}

interface FilterAttribute {
  id: string;
  slug: string;
  translations: { name: string }[];
  values: FilterValue[];
}

export interface AttributeFilterState {
  /** کلید = attributeId، مقدار = لیست valueId های انتخاب‌شده */
  [attributeId: string]: string[];
}

interface AttributeFilterProps {
  attributes: FilterAttribute[];
  value: AttributeFilterState;
  onChange: (next: AttributeFilterState) => void;
}

function firstLabel(
  translations: { name?: string; label?: string }[],
  fallback = "",
): string {
  return translations[0]?.name ?? translations[0]?.label ?? fallback;
}

/**
 * پنل فیلتر ویژگی‌ها برای صفحه نمایش محصولات. هر ویژگی به‌صورت یک گروه
 * از گزینه‌های قابل‌انتخاب (چندانتخابی) نمایش داده می‌شود.
 */
export function AttributeFilter({
  attributes,
  value,
  onChange,
}: AttributeFilterProps) {
  const selected = useMemo(() => value, [value]);

  const toggle = (attributeId: string, valueId: string) => {
    const current = new Set(selected[attributeId] ?? []);
    if (current.has(valueId)) {
      current.delete(valueId);
    } else {
      current.add(valueId);
    }
    const next = { ...selected };
    if (current.size === 0) {
      delete next[attributeId];
    } else {
      next[attributeId] = Array.from(current);
    }
    onChange(next);
  };

  const clearAll = () => onChange({});

  const totalSelected = Object.values(selected).reduce(
    (sum, ids) => sum + ids.length,
    0,
  );

  if (attributes.length === 0) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">فیلتر ویژگی‌ها</h3>
        {totalSelected > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-primary hover:underline"
          >
            پاک کردن همه ({totalSelected})
          </button>
        )}
      </div>

      {attributes.map((attr) => {
        const attrSelected = new Set(selected[attr.id] ?? []);
        return (
          <div
            key={attr.id}
            className="rounded-lg border border-border p-3"
          >
            <div className="mb-2 text-sm font-medium">
              {firstLabel(attr.translations)}
            </div>
            <div className="flex flex-wrap gap-2">
              {attr.values.map((v) => {
                const isOn = attrSelected.has(v.id);
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => toggle(attr.id, v.id)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition-colors",
                      isOn
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:bg-accent/50",
                    )}
                  >
                    {isOn && <CheckIcon className="size-3" />}
                    {firstLabel(v.translations)}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
