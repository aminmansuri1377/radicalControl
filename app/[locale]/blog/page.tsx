"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { trpc } from "@/lib/trpc/client";
import { getMessages } from "@/messages";
import BlogImage from "@/public/images/ourStory.png";
import { BlogCard } from "@/components/site/BlogCard";
import SectionTitle from "@/components/ui/SectionTitle";
import StickySection from "@/components/ui/StickySection";

const fakeBlogs = Array.from({ length: 9 }, (_, index) => ({
  id: `fake-${index}`,
  image: BlogImage,
  title: "جدید اخبار و مقالات در حوزه برق صنعتی و الکترونیک",
  description:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و طراحی گرافیک است. این متن برای نمایش محتوا استفاده می‌شود ...",
  href: "#",
}));

export default function BlogPage() {
  const { locale: rawLocale } = useParams();
  const locale = (rawLocale as string) || "fa";
  const t = getMessages(locale);
  const { data } = trpc.public.getBlogs.useQuery({ locale });

  const apiBlogs =
    data?.flatMap((blog) => {
      const translation = blog.translations?.[0];
      if (!translation) return [];
      return [
        {
          id: blog.id,
          image: blog.coverImage || BlogImage,
          title: translation.title,
          description: translation.excerpt || "",
          href: `/${locale}/blog/${translation.slug}`,
        },
      ];
    }) ?? [];

  // در صورت خطای API یا خالی بودن پاسخ، فقط داده‌های فیک نمایش داده می‌شوند.

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background px-5 pb-20 pt-24 md:px-12 lg:px-20"
    >
      <section className="mx-auto grid max-w-6xl items-center gap-10 py-8 md:grid-cols-2 md:py-12">
        <div className="order-2 md:order-1">
          <h1 className="text-3xl font-peyda-bold md:text-4xl">
            وبلاگ های ما:
          </h1>
          <p className="mt-6 text-justify text-sm leading-8 font-peyda-regular">
            {t.hero.description}
          </p>
        </div>
        <Image
          src={BlogImage}
          alt="وبلاگ های ما"
          className="order-1 h-[220px] w-full rounded-3xl object-cover md:order-2 md:h-[280px]"
          priority
        />
      </section>

      <section className="mx-auto max-w-6xl">
        <StickySection title={t.newestBlogs || "آخرین مقالات"}>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {fakeBlogs.map((post) => (
              <BlogCard
                key={post.id}
                image={post.image}
                title={post.title}
                description={post.description}
                href={post.href}
              />
            ))}
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {apiBlogs &&
              apiBlogs.map((post) => (
                <BlogCard
                  key={post.id}
                  image={post.image}
                  title={post.title}
                  description={post.description}
                  href={post.href}
                />
              ))}
          </div>
        </StickySection>
      </section>
    </main>
  );
}
