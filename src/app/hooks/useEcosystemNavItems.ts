import { useState, useEffect } from "react";

export type EcosystemNavItem = {
  id: string;
  label: string;
  href?: string;
  isActive?: boolean;
};

// Credenciais via variáveis de ambiente (sem hardcode)
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

const fallbackItems: EcosystemNavItem[] = [
  { id: "loja", label: "Loja", href: "https://loja-bibliotecacatolica-proto.vercel.app/" },
  { id: "clube", label: "Clube", href: "https://bibliotecacatolica.com.br/clube/" },
  { id: "peregrino", label: "Peregrino", href: "https://peregrino-proto.vercel.app/" },
  { id: "ia", label: "IA da MBC", href: "https://bibliotecacatolica.com.br/ia/" },
  { id: "capela", label: "Capela", href: "https://capela-web-omega.vercel.app/" },
  { id: "blog", label: "Blog", href: "/" },
  { id: "formacao", label: "Área de Formação", href: "https://formacao-bibliotecacatolica-proto.vercel.app/" },
];

function applyActive(items: EcosystemNavItem[]): EcosystemNavItem[] {
  return items.map((item) => ({
    ...item,
    isActive: item.id === "blog",
    href: item.id === "blog" ? "/" : item.href,
  }));
}

export function useSubscriptionCtaUrl() {
  const [ctaUrl, setCtaUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;

    let cancelled = false;

    fetch(
      `${SUPABASE_URL}/rest/v1/settings?select=value&key=eq.subscription_cta_url`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled) setCtaUrl(data?.[0]?.value ?? null);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return ctaUrl;
}

export function useEcosystemNavItems() {
  const [items, setItems] = useState<EcosystemNavItem[]>([]);

  useEffect(() => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setItems(applyActive(fallbackItems));
      return;
    }

    let cancelled = false;

    fetch(
      `${SUPABASE_URL}/rest/v1/ecosystem_menu_items?select=id,label,href,display_order&is_enabled=eq.true&order=display_order.asc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { id: string; label: string; href: string | null }[] | null) => {
        if (cancelled) return;
        setItems(
          applyActive(
            Array.isArray(data) && data.length > 0
              ? data.map((item) => ({ id: item.id, label: item.label, href: item.href ?? undefined }))
              : fallbackItems
          )
        );
      })
      .catch(() => {
        if (!cancelled) setItems(applyActive(fallbackItems));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { items };
}
