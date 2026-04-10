import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="grid min-h-screen place-items-center px-8 py-10">
      <div className="grid w-full max-w-[72rem] gap-[clamp(2rem,5vw,5rem)] md:grid-cols-2 md:items-center">
        <div>
          <p className="text-[0.72rem] uppercase tracking-[0.3em]">{"BA\u00D1ARES / Parfums"}</p>
          <h1
            className="mt-1.5 mb-4 text-[clamp(3rem,10vw,5.5rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-editorial)" }}
          >
            {product.name}
          </h1>
          <p className="max-w-[34rem] leading-[1.65] text-[rgba(17,17,17,0.72)]">{product.description}</p>
          <div className="mt-8 flex items-center gap-4">
            <p className="text-2xl tracking-[-0.04em] text-banares-ink" style={{ fontFamily: "var(--font-editorial)" }}>
              {product.price}
            </p>
            <span className="text-[0.72rem] uppercase tracking-[0.3em] text-[rgba(17,17,17,0.55)]">Precio final</span>
          </div>
          <ul className="mt-8 mb-8 flex flex-wrap gap-3" aria-label="Fragrance notes">
            {product.notes.map((note) => (
              <li
                key={note}
                className="rounded-full border border-[rgba(17,17,17,0.14)] px-4 py-3 text-[0.7rem] uppercase tracking-[0.18em]"
              >
                {note}
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Link
              href={`/checkout/${product.id}`}
              className="inline-flex min-w-44 items-center justify-center rounded-full bg-banares-ink px-7 py-3 text-[0.78rem] uppercase tracking-[0.28em] text-banares-bg transition-transform duration-300 hover:scale-[1.02]"
            >
              Comprar
            </Link>
            <Link href="/" className="inline-block border-b border-current pb-1 text-[0.72rem] uppercase tracking-[0.3em]">
              Back to collection
            </Link>
          </div>
        </div>

        <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-[0_30px_70px_rgba(17,17,17,0.2)]">
          <img src={product.media.src} alt={product.name} className="h-full w-full object-cover" />
        </div>
      </div>
    </main>
  );
}
