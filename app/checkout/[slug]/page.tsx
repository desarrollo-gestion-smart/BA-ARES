import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";

type CheckoutPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { slug } = await params;
  const product = getProductById(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="grid min-h-screen place-items-center px-8 py-10">
      <div className="w-full max-w-3xl rounded-[2rem] border border-[rgba(17,17,17,0.08)] bg-[rgba(255,255,255,0.55)] p-8 shadow-[0_30px_80px_rgba(17,17,17,0.08)] backdrop-blur-sm md:p-12">
        <p className="text-[0.72rem] uppercase tracking-[0.3em]">Checkout / {product.name}</p>
        <h1
          className="mt-3 text-[clamp(2.8rem,8vw,4.8rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-editorial)" }}
        >
          Finalizar compra
        </h1>
        <p className="mt-4 max-w-2xl leading-[1.65] text-[rgba(17,17,17,0.72)]">
          Seleccionaste {product.name}. Esta vista deja listo el flujo inicial de compra con el precio visible y un CTA
          principal para continuar.
        </p>

        <div className="mt-8 grid gap-6 rounded-[1.5rem] border border-[rgba(17,17,17,0.08)] bg-banares-bg p-6 md:grid-cols-[160px_1fr] md:items-center">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl">
            <img src={product.media.src} alt={product.name} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.3em] text-[rgba(17,17,17,0.55)]">Producto</p>
            <h2 className="mt-2 text-4xl" style={{ fontFamily: "var(--font-editorial)" }}>
              {product.name}
            </h2>
            <p className="mt-2 text-xl text-banares-ink">{product.price}</p>
            <p className="mt-4 leading-[1.65] text-[rgba(17,17,17,0.72)]">{product.description}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <button
            type="button"
            className="inline-flex min-w-52 items-center justify-center rounded-full bg-banares-ink px-7 py-3 text-[0.78rem] uppercase tracking-[0.28em] text-banares-bg transition-transform duration-300 hover:scale-[1.02]"
          >
            Confirmar compra
          </button>
          <Link href={`/product/${product.id}`} className="inline-block border-b border-current pb-1 text-[0.72rem] uppercase tracking-[0.3em]">
            Volver al producto
          </Link>
        </div>
      </div>
    </main>
  );
}
