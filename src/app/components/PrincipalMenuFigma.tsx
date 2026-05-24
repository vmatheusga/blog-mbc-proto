import { useState, useEffect, useCallback } from "react";
import { X, Menu, UserRound } from "lucide-react";
import { useEcosystemNavItems, useSubscriptionCtaUrl } from "../hooks/useEcosystemNavItems";
import { categories } from "./blog-data";

const CONTAINER = "mx-auto w-full max-w-[1536px] px-4 sm:px-8 xl:px-20";

export function PrincipalMenuFigma() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const openMenu = useCallback(() => setMobileOpen(true), []);
  const closeMenu = useCallback(() => setMobileOpen(false), []);
  const { items } = useEcosystemNavItems();
  const ctaUrl = useSubscriptionCtaUrl();

  const visibleItems = items.filter((item) => item.href);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") closeMenu(); };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileOpen, closeMenu]);

  return (
    <div className="bg-white dark:bg-black w-full relative z-[3]">
      {/* Desktop layout — visível apenas em xl+ (≥1280px) */}
      <div className="hidden h-10 items-center bg-white dark:bg-black xl:flex">
        <div className={`${CONTAINER} grid h-full grid-cols-[1fr_auto_1fr] items-center`}>
          <a
            aria-label="Biblioteca Católica"
            className="flex h-5 w-fit items-center transition-opacity hover:opacity-75"
            href="/"
          >
            <img src="/mbc-simbolo.svg" alt="Biblioteca Católica" className="h-5 w-auto" />
          </a>

          <nav className="flex items-center gap-6" aria-label="Ecossistema MBC">
            {visibleItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`whitespace-nowrap text-xs font-medium leading-[1.4] transition-colors ${
                  item.isActive
                    ? "text-[var(--slate-12)]"
                    : "text-[var(--slate-9)] hover:text-[var(--slate-12)]"
                }`}
                aria-current={item.isActive ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2">
            <a
              href={ctaUrl ?? '#'}
              className="bg-primary text-primary-foreground rounded-full px-2 py-[3px] text-xs font-medium leading-[1.4] whitespace-nowrap"
            >
              Assinar
            </a>
            <a
              className="inline-flex h-7 items-center rounded-full border border-[var(--slate-6)] bg-transparent px-3 text-xs font-medium leading-[1.4] text-[var(--slate-12)] transition-colors hover:bg-[var(--slate-3)]"
              href="#"
            >
              Entrar
            </a>
          </div>
        </div>
      </div>

      {/* Mobile layout — hamburguer esquerda, logo centro, conta direita */}
      <div className="flex h-14 items-center justify-between bg-white dark:bg-black px-4 text-foreground xl:hidden">
        <button
          aria-label="Abrir menu"
          aria-haspopup="dialog"
          className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10"
          onClick={openMenu}
          type="button"
        >
          <Menu className="size-5" strokeWidth={2} />
        </button>

        <a className="flex min-w-0 flex-1 items-center justify-center" href="/">
          <img src="/mbc-simbolo.svg" alt="Biblioteca Católica" className="h-8 w-auto dark:invert" />
        </a>

        <a
          aria-label="Entrar"
          className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10"
          href="#"
        >
          <UserRound className="size-5" strokeWidth={1.9} />
        </a>
      </div>

      {/* Mobile overlay — drawer com seções e backdrop */}
      <div
        className={`fixed inset-0 z-[90] xl:hidden ${mobileOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        <button
          aria-label="Fechar menu"
          className={`absolute inset-0 bg-black/35 transition-opacity duration-200 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMenu}
          tabIndex={mobileOpen ? 0 : -1}
          type="button"
        />

        <aside
          aria-modal="true"
          role="dialog"
          aria-label="Menu de navegação"
          className={`relative flex h-full w-[min(320px,86vw)] flex-col overflow-hidden bg-white dark:bg-black shadow-[24px_0_80px_rgba(0,0,0,0.18)] transition-transform duration-200 ease-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pb-8 pt-7">
            <div className="mb-8 flex items-center justify-between gap-4">
              <img src="/mbc-simbolo.svg" alt="Biblioteca Católica" className="h-5 w-auto dark:invert" />
              <button
                aria-label="Fechar menu"
                className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10"
                onClick={closeMenu}
                type="button"
              >
                <X className="size-5" strokeWidth={1.8} />
              </button>
            </div>

            <nav className="flex flex-col gap-8" aria-label="Menu mobile">
              <div className="flex flex-col gap-3">
                <p className="px-3 font-['Inter',sans-serif] text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.12em] text-foreground">
                  Blog
                </p>
                <div className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      className="rounded-[12px] px-3 py-3 font-['Inter',sans-serif] text-[15px] font-medium leading-[1.2] text-foreground transition-colors hover:bg-foreground/10"
                      onClick={closeMenu}
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-[var(--slate-3)] pt-6">
                <p className="px-3 font-['Inter',sans-serif] text-[11px] font-semibold uppercase leading-[1.2] tracking-[0.12em] text-foreground">
                  Ecossistema
                </p>
                <div className="flex flex-col gap-1">
                  {visibleItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      className={`rounded-[12px] px-3 py-3 font-['Inter',sans-serif] text-[15px] font-medium leading-[1.2] transition-colors ${
                        item.isActive
                          ? "text-foreground"
                          : "text-foreground hover:bg-foreground/10"
                      }`}
                      onClick={closeMenu}
                      aria-current={item.isActive ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
