// --- helper های مشترک برای ویژگی‌های محصول ---

type WithLanguage = { languageId: string; language?: { code: string } };
type AttributeTr = WithLanguage & { name: string };
type AttributeValueTr = WithLanguage & { label: string };

/**
 * کد زبانی که برای نمایش نام/برچسب در پنل مدیریت استفاده می‌شود.
 * پنل تحت [locale] نیست، پس یک اولویت ثابت داریم.
 */
export const PANEL_DEFAULT_LANG = "fa";

/** اولین ترجمه‌ی موجود طبق اولویت زبان (پیش‌فرض fa، سپس اولین موجود). */
export function pickAttributeTranslation(
  translations: AttributeTr[] = [],
  preferred = PANEL_DEFAULT_LANG,
): AttributeTr | undefined {
  if (!translations.length) return undefined;
  return (
    translations.find((t) => t.languageId === preferred) ??
    translations.find((t) => t.language?.code === preferred) ??
    translations[0]
  );
}

export function pickValueTranslation(
  translations: AttributeValueTr[] = [],
  preferred = PANEL_DEFAULT_LANG,
): AttributeValueTr | undefined {
  if (!translations.length) return undefined;
  return (
    translations.find((t) => t.languageId === preferred) ??
    translations.find((t) => t.language?.code === preferred) ??
    translations[0]
  );
}

export function attributeName(
  attribute: { translations: AttributeTr[] },
  preferred = PANEL_DEFAULT_LANG,
): string {
  return pickAttributeTranslation(attribute.translations, preferred)?.name ??
    attribute.translations[0]?.name ??
    "";
}

export function valueLabel(
  value: { translations: AttributeValueTr[] },
  preferred = PANEL_DEFAULT_LANG,
): string {
  return pickValueTranslation(value.translations, preferred)?.label ??
    value.translations[0]?.label ??
    "";
}
