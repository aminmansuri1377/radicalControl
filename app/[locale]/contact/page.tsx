import { ContactForm } from "@/components/contact/ContactForm";
import SectionTitle from "@/components/ui/SectionTitle";

const items = [
  ["0912-1234-123", "☎"],
  ["0912-1234-123", "☎"],
  ["@sample.com", "◎"],
  ["@sample.com", "◎"],
  ["@sample.com", "◎"],
];

function ContactInfo() {
  return (
    <div
      dir="rtl"
      className="rounded-3xl border border-gray-400 bg-white px-8 py-9 md:px-14"
    >
      <h2 className="text-center text-2xl font-peyda-bold md:text-3xl">
        راه های ارتباطی
      </h2>
      <div className="mt-8 space-y-5">
        {items.map(([value, icon], index) => (
          <div
            key={index}
            className="flex items-center justify-end gap-5 text-lg font-peyda-medium"
          >
            <span dir={value.startsWith("0") ? "ltr" : "rtl"}>{value}</span>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl text-white">
              {icon}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-end gap-5 pt-4 text-right text-sm leading-7 font-peyda-regular">
          <p className="max-w-sm">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و طراحی
            گرافیک است.
          </p>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-2xl text-white">
            ⌾
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background px-5 pb-24 pt-24 font-peyda-regular md:px-12 lg:px-20">
      <SectionTitle sticky={false}>CONTACT US</SectionTitle>
      <div className="mx-auto mt-8 grid max-w-6xl items-stretch gap-5 lg:grid-cols-2">
        <div className="order-2 rounded-3xl border border-gray-400 bg-white lg:order-1">
          <ContactForm />
        </div>
        <div className="order-1 lg:order-2">
          <ContactInfo />
        </div>
      </div>
    </main>
  );
}
