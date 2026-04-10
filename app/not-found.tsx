import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-8 py-10">
      <div className="max-w-[40rem]">
        <p className="text-[0.72rem] uppercase tracking-[0.3em]">{"BA\u00D1ARES / 404"}</p>
        <h1
          className="mt-1.5 mb-4 text-[clamp(3rem,10vw,5.5rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-editorial)" }}
        >
          Fragancia no encontrada
        </h1>
        <p className="max-w-[34rem] leading-[1.65] text-[rgba(17,17,17,0.72)]">
          La ruta que abriste no coincide con ninguna esencia cargada en esta coleccion.
        </p>
        <Link href="/" className="mt-8 inline-block border-b border-current pb-1 text-[0.72rem] uppercase tracking-[0.3em]">
          Volver a la coleccion
        </Link>
      </div>
    </main>
  );
}
