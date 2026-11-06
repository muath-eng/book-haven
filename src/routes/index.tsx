import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مكتبة الورّاق | كتب مختارة للبيع" },
      { name: "description", content: "تصفّح واشترِ أجمل الكتب العربية والعالمية من مكتبة الورّاق." },
      { property: "og:title", content: "مكتبة الورّاق" },
      { property: "og:description", content: "كتب مختارة للبيع بأسعار مناسبة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Amiri:wght@700&family=Tajawal:wght@400;700&display=swap" },
    ],
  }),
  component: Index,
});

const books = [
  { title: "مقدمة ابن خلدون", author: "ابن خلدون", price: 85, cover: "bg-cover-1" },
  { title: "الأيام", author: "طه حسين", price: 45, cover: "bg-cover-2" },
  { title: "موسم الهجرة إلى الشمال", author: "الطيب صالح", price: 50, cover: "bg-cover-3" },
  { title: "ثلاثية غرناطة", author: "رضوى عاشور", price: 70, cover: "bg-cover-4" },
  { title: "رجال في الشمس", author: "غسان كنفاني", price: 35, cover: "bg-cover-2" },
  { title: "الخيميائي", author: "باولو كويلو", price: 40, cover: "bg-cover-1" },
  { title: "عالم صوفي", author: "جوستاين غاردر", price: 60, cover: "bg-cover-3" },
  { title: "مدن الملح", author: "عبد الرحمن منيف", price: 90, cover: "bg-cover-4" },
];

function Index() {
  const [cart, setCart] = useState<string[]>([]);
  const total = cart.reduce((s, t) => s + (books.find((b) => b.title === t)?.price ?? 0), 0);

  return (
    <div dir="rtl" className="min-h-screen">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background/90 px-5 py-4 backdrop-blur">
        <span className="font-display text-2xl text-primary">الورّاق</span>
        <span className="rounded-full bg-primary px-4 py-1.5 text-sm text-primary-foreground">
          السلة: {cart.length} · {total} ر.س
        </span>
      </header>

      <section className="mx-auto max-w-5xl px-5 py-16 text-center">
        <p className="text-accent">منذ ١٤٤٨ هـ</p>
        <h1 className="mt-3 text-5xl leading-tight md:text-7xl">كل كتاب<br />حياة أخرى</h1>
        <p className="mx-auto mt-5 max-w-md text-muted-foreground">
          مكتبة مختارة من روائع الأدب والفكر، تصلك إلى باب بيتك.
        </p>
      </section>

      <main id="books" className="mx-auto grid max-w-5xl grid-cols-2 gap-x-5 gap-y-10 px-5 pb-20 md:grid-cols-4">
        {books.map((b) => {
          const inCart = cart.includes(b.title);
          return (
            <article key={b.title} className="flex flex-col">
              <div className={`book-cover ${b.cover} flex aspect-[2/3] flex-col justify-between rounded-sm p-4 text-primary-foreground`}>
                <span className="font-display text-xl leading-snug">{b.title}</span>
                <span className="text-xs opacity-80">{b.author}</span>
              </div>
              <h3 className="mt-3 text-lg">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.author}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-primary">{b.price} ر.س</span>
                <button
                  onClick={() => setCart(inCart ? cart.filter((t) => t !== b.title) : [...cart, b.title])}
                  className={`rounded-full border px-3 py-1 text-sm transition ${inCart ? "bg-primary text-primary-foreground" : "hover:border-primary"}`}
                >
                  {inCart ? "في السلة ✓" : "أضف"}
                </button>
              </div>
            </article>
          );
        })}
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © مكتبة الورّاق
      </footer>
    </div>
  );
}
