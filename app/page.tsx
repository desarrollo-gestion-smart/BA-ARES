"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/products";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const centerLinkRef = useRef<HTMLAnchorElement>(null);
  const pointerRef = useRef({
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    cursorX: 0,
    cursorY: 0,
  });

  const activeProduct = products[activeIndex];
  const panelOverlayStyle = {
    background: "linear-gradient(180deg, rgba(17, 17, 17, 0.05), rgba(17, 17, 17, 0.16))",
  };
  const shellGlowStyle = {
    background:
      "radial-gradient(circle at 15% 30%, rgba(255, 255, 255, 0.85), transparent 28%), radial-gradient(circle at 85% 20%, rgba(17, 17, 17, 0.03), transparent 20%)",
  };
  const rulerStyle = {
    backgroundImage:
      "repeating-linear-gradient(90deg, #111111 0, #111111 1px, transparent 1px, transparent 12px)",
  };

  useEffect(() => {
    let frameId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      pointerRef.current.mouseX = event.clientX;
      pointerRef.current.mouseY = event.clientY;
      pointerRef.current.targetX = (event.clientX / window.innerWidth - 0.5) * 20;
      pointerRef.current.targetY = (event.clientY / window.innerHeight - 0.5) * 20;
    };

    const animate = () => {
      const pointer = pointerRef.current;

      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.05;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.05;
      pointer.cursorX += (pointer.mouseX - pointer.cursorX) * 0.15;
      pointer.cursorY += (pointer.mouseY - pointer.cursorY) * 0.15;

      const offset = window.innerWidth > 1024 ? 90 : window.innerWidth > 640 ? 70 : 60;

      if (centerLinkRef.current) {
        centerLinkRef.current.style.transform = `translate3d(${(pointer.currentX * 1.5).toFixed(2)}px, ${(
          pointer.currentY * 1.5
        ).toFixed(2)}px, 0)`;
      }

      if (leftPanelRef.current) {
        leftPanelRef.current.style.transform = `translate3d(${(-offset + pointer.currentX * -0.5).toFixed(
          2,
        )}%, ${(pointer.currentY * -0.5).toFixed(2)}px, 0) rotate(-6deg)`;
      }

      if (rightPanelRef.current) {
        rightPanelRef.current.style.transform = `translate3d(${(offset + pointer.currentX * -0.5).toFixed(
          2,
        )}%, ${(pointer.currentY * -0.5).toFixed(2)}px, 0) rotate(6deg)`;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pointer.cursorX}px, ${pointer.cursorY}px, 0)`;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-clip">
      <div className="pointer-events-none absolute inset-0" style={shellGlowStyle} />

      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[100] hidden md:block ${
          cursorVisible ? "" : ""
        }`}
      >
        <div
          className={`grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-banares-ink text-[0.7rem] uppercase tracking-[0.25em] text-banares-bg shadow-[0_25px_60px_rgba(17,17,17,0.24)] transition-all duration-300 ${
            cursorVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          comprar
        </div>
      </div>

      <header className="pointer-events-none absolute top-8 left-1/2 z-[5] flex w-full max-w-[90rem] -translate-x-1/2 flex-col items-center px-6">
        <h1
          className="bg-gradient-to-b from-[#111111] via-[rgba(17,17,17,0.85)] to-[rgba(17,17,17,0.25)] bg-clip-text text-[clamp(3rem,10vw,6rem)] leading-[0.95] font-semibold tracking-[-0.08em] text-transparent uppercase"
          style={{ fontFamily: "var(--font-editorial)" }}
        >
          {"BA\u00D1ARES"}
        </h1>
        <div className="mt-3 flex items-center gap-4 opacity-55">
          <span className="h-px w-8 bg-linear-to-r from-transparent to-banares-ink" />
          <p className="text-xs uppercase tracking-[0.35em]">Parfums</p>
          <span className="h-px w-8 bg-linear-to-r from-banares-ink to-transparent" />
        </div>
      </header>

      <section className="relative grid flex-1 place-items-center px-6 pt-32 pb-12 md:pt-36">
        <div
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-between px-[8vw] text-[clamp(4rem,16vw,12rem)] font-bold tracking-[-0.08em] opacity-[0.04]"
          aria-hidden="true"
        >
          <span>01</span>
          <span>02</span>
        </div>

        <aside className="pointer-events-none absolute top-1/2 left-[clamp(1.5rem,4vw,4rem)] z-[3] hidden -translate-y-1/2 text-banares-bg mix-blend-difference lg:block">
          <h2
            className="text-[clamp(1.5rem,3vw,2.2rem)] leading-none uppercase"
            style={{ fontFamily: "var(--font-editorial)" }}
          >
            {activeProduct.tagline}
          </h2>
          <p className="mt-1.5 text-[0.8rem] uppercase tracking-[0.3em] text-white/75">
            {activeProduct.subtitle}
          </p>
        </aside>

        <aside className="pointer-events-none absolute top-1/2 right-[clamp(1.5rem,4vw,4rem)] z-[3] hidden -translate-y-1/2 text-right text-banares-bg mix-blend-difference lg:block">
          <h2
            className="text-[clamp(1.5rem,3vw,2.2rem)] leading-none uppercase"
            style={{ fontFamily: "var(--font-editorial)" }}
          >
            {activeProduct.name}
          </h2>
          <p className="mt-1.5 text-[0.8rem] uppercase tracking-[0.3em] text-white/75">
            {activeProduct.notes.join(" / ")}
          </p>
        </aside>

        <div className="relative flex min-h-[34rem] w-full max-w-[76rem] items-center justify-center [perspective:1000px] md:min-h-[min(70vh,44rem)]">
          <div
            ref={leftPanelRef}
            className="absolute hidden aspect-[3/4] w-[min(34vw,18rem)] overflow-hidden rounded-md shadow-[0_25px_65px_rgba(17,17,17,0.18)] transition-transform duration-1000 [transform:translate3d(-60%,0,0)_rotate(-6deg)] will-change-transform md:block xl:w-[min(28vw,21rem)]"
          >
            <img
              src={activeProduct.leftImage}
              alt={`${activeProduct.name} supporting visual`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0" style={panelOverlayStyle} />
          </div>

          <div
            ref={rightPanelRef}
            className="absolute hidden aspect-[3/4] w-[min(34vw,18rem)] overflow-hidden rounded-md shadow-[0_25px_65px_rgba(17,17,17,0.18)] transition-transform duration-1000 [transform:translate3d(60%,0,0)_rotate(6deg)] will-change-transform md:block xl:w-[min(28vw,21rem)]"
          >
            <img
              src={activeProduct.rightImage}
              alt={`${activeProduct.name} supporting visual`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0" style={panelOverlayStyle} />
          </div>

          <Link
            href={activeProduct.link}
            className="relative z-[2] block aspect-[3/4] w-[min(88vw,22rem)] transition-transform duration-1000 will-change-transform md:w-[min(72vw,24rem)] md:aspect-[4/5] lg:w-[min(48vw,25rem)] xl:w-[min(36vw,28rem)]"
            ref={centerLinkRef}
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
          >
            <div className="h-full overflow-hidden rounded-md bg-[rgba(247,246,242,0.6)] shadow-[0_30px_60px_rgba(17,17,17,0.24)] backdrop-blur-md transition-transform duration-700 hover:scale-[1.02] hover:shadow-[0_34px_75px_rgba(17,17,17,0.28)]">
              <div className="h-[calc(100%-8.25rem)] md:h-[calc(100%-7.5rem)]">
                {activeProduct.media.type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={activeProduct.media.src}
                    key={activeProduct.media.src}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={activeProduct.media.src}
                    alt={activeProduct.name}
                    key={activeProduct.media.src}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="grid grid-cols-[auto_1fr] items-start gap-4 bg-linear-to-b from-[rgba(247,246,242,0.9)] to-[rgba(247,246,242,1)] px-5 py-5">
                <span className="text-[0.8rem] uppercase tracking-[0.25em] text-[rgba(17,17,17,0.55)]">
                  {`0${activeIndex + 1}`}
                </span>
                <div>
                  <h3 className="text-[1.75rem]" style={{ fontFamily: "var(--font-editorial)" }}>
                    {activeProduct.name}
                  </h3>
                  <p className="mt-1.5 leading-6 text-[rgba(17,17,17,0.72)]">
                    {activeProduct.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <nav className="relative z-[4] pb-4">
        <div className="h-2 w-full opacity-[0.15]" style={rulerStyle} />
        <div className="relative overflow-x-auto overflow-y-hidden border-y border-banares-line px-6 py-4 sm:px-[18vw] sm:py-6">
          <div className="pointer-events-none absolute top-0 left-0 bottom-0 z-[1] w-[min(8rem,15vw)] bg-linear-to-r from-banares-bg to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-[1] w-[min(8rem,15vw)] bg-linear-to-l from-banares-bg to-transparent" />
          <div className="mx-auto flex w-max items-center">
            {products.map((product, index) => (
              <button
                type="button"
                key={product.id}
                className={`cursor-pointer border-0 bg-transparent px-3 text-[clamp(2rem,12vw,5rem)] whitespace-nowrap uppercase tracking-[-0.06em] transition-all duration-500 sm:px-5 ${
                  index === activeIndex
                    ? "translate-y-[-0.1em] text-banares-ink"
                    : "text-[rgba(17,17,17,0.28)] hover:translate-y-[-0.1em] hover:text-banares-ink"
                }`}
                style={{ fontFamily: "var(--font-editorial)" }}
                onClick={() => {
                  setActiveIndex(index);
                }}
              >
                {product.name}
              </button>
            ))}
          </div>
        </div>
        <div className="h-3 w-full opacity-[0.15]" style={rulerStyle} />

        <div className="flex flex-col items-center justify-between gap-4 px-6 pt-5 text-[0.7rem] uppercase tracking-[0.18em] text-banares-muted sm:flex-row">
          <span>{"\u00A92026 BA\u00D1ARES"}</span>
          <span className="hidden text-center sm:inline">Explore the collection</span>
          <div className="inline-flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous fragrance"
              className="cursor-pointer border-0 bg-transparent p-0.5 transition-colors hover:text-banares-ink"
              onClick={() => {
                setActiveIndex((current) => (current === 0 ? products.length - 1 : current - 1));
              }}
            >
              &#8592;
            </button>
            <span>{`0${activeIndex + 1} // 0${products.length}`}</span>
            <button
              type="button"
              aria-label="Next fragrance"
              className="cursor-pointer border-0 bg-transparent p-0.5 transition-colors hover:text-banares-ink"
              onClick={() => {
                setActiveIndex((current) => (current === products.length - 1 ? 0 : current + 1));
              }}
            >
              &#8594;
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
}
