import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BA\u00D1ARES",
  description: "Coleccion editorial de fragancias para BA\u00D1ARES.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className="min-h-screen bg-banares-bg text-banares-ink antialiased selection:bg-[var(--accent)] selection:text-banares-bg"
        style={{
          fontFamily: "var(--font-sans)",
          backgroundImage:
            "radial-gradient(circle at top, rgba(198, 161, 110, 0.1), transparent 35%), linear-gradient(180deg, #fcfbf7 0%, var(--bg) 55%, #efe9df 100%)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
