-- CreateTable
CREATE TABLE "public"."Attribute" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "filterable" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AttributeTranslation" (
    "id" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AttributeTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AttributeValue" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "attributeId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AttributeValueTranslation" (
    "id" TEXT NOT NULL,
    "valueId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "AttributeValueTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductAttributeValue" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "valueId" TEXT NOT NULL,

    CONSTRAINT "ProductAttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_slug_key" ON "public"."Attribute"("slug");

-- CreateIndex
CREATE INDEX "Attribute_published_idx" ON "public"."Attribute"("published");

-- CreateIndex
CREATE INDEX "Attribute_filterable_idx" ON "public"."Attribute"("filterable");

-- CreateIndex
CREATE UNIQUE INDEX "AttributeTranslation_attributeId_languageId_key" ON "public"."AttributeTranslation"("attributeId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "AttributeValue_slug_key" ON "public"."AttributeValue"("slug");

-- CreateIndex
CREATE INDEX "AttributeValue_attributeId_idx" ON "public"."AttributeValue"("attributeId");

-- CreateIndex
CREATE UNIQUE INDEX "AttributeValueTranslation_valueId_languageId_key" ON "public"."AttributeValueTranslation"("valueId", "languageId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttributeValue_productId_valueId_key" ON "public"."ProductAttributeValue"("productId", "valueId");

-- CreateIndex
CREATE INDEX "ProductAttributeValue_productId_idx" ON "public"."ProductAttributeValue"("productId");

-- CreateIndex
CREATE INDEX "ProductAttributeValue_valueId_idx" ON "public"."ProductAttributeValue"("valueId");

-- AddForeignKey
ALTER TABLE "public"."AttributeTranslation" ADD CONSTRAINT "AttributeTranslation_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "public"."Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AttributeTranslation" ADD CONSTRAINT "AttributeTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AttributeValue" ADD CONSTRAINT "AttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "public"."Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AttributeValueTranslation" ADD CONSTRAINT "AttributeValueTranslation_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "public"."AttributeValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AttributeValueTranslation" ADD CONSTRAINT "AttributeValueTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "public"."AttributeValue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
