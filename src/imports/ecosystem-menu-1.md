# Menu do Ecossistema MBC — Especificação Técnica

Especificação de arquitetura e implementação do `principalMenu` do ecossistema MBC. Use este documento como contrato para implementar ou revisar o menu global em qualquer produto do ecossistema.

Referências no Figma:

- [Pageblock e componentes de navegação](https://www.figma.com/design/sJD7ZxZUJgW04KCm9pjH0d/Omnia-Design-System-%C2%A9?m=auto&node-id=6135-1227&t=9GgqKArIGeSRAu13-1)
- [Exemplos desktop logados](https://www.figma.com/design/sJD7ZxZUJgW04KCm9pjH0d/Omnia-Design-System-%C2%A9?m=auto&node-id=6177-18454&t=9GgqKArIGeSRAu13-1)
- [Exemplos mobile](https://www.figma.com/design/sJD7ZxZUJgW04KCm9pjH0d/Omnia-Design-System-%C2%A9?m=auto&node-id=6229-83300&t=9GgqKArIGeSRAu13-1)

---

## Camadas de informação

O menu resolve três camadas independentes.

### 1. Navegação global

Links entre produtos do ecossistema MBC. Não pertence ao produto atual.

Itens esperados (vindos do Supabase): Loja, Clube, Peregrino, IA da MBC, Capela, Blog, Área de Formação.

### 2. Contexto local

Navegação e funções do produto atual. Definida por cada aplicação: links de seções, categorias, busca, carrinho, atalhos. Não faz parte do `principalMenu`.

### 3. Identidade e sessão

Slots reservados para avatar, entrada, nome de usuário e ações de conta. A lógica de autenticação pertence ao produto — o menu apenas expõe os pontos de composição.

---

## Componentes

### `principalMenu`

Barra global do ecossistema. Presente em todos os produtos.

**Responsabilidades:**
- Exibir a marca MBC (logo).
- Exibir links globais entre produtos (vindos do Supabase).
- Indicar o produto ativo.
- Expor o slot de identidade/sessão.

**Restrições:**
- Não carregar busca, carrinho, filtros ou qualquer função local.
- Não ficar fixo (sticky) durante scroll — essa responsabilidade pertence à barra local.
- Não ter borda inferior quando um menu local secundário estiver presente logo abaixo.

### `topbar`

Menu local para projetos com padrão `portal/topbar` (portais, sites, blogs, ecommerces).

**Responsabilidades:**
- Exibir nome ou marca do produto.
- Exibir links locais horizontais.
- Receber slots de busca, carrinho e ações locais.
- Sustentar o comportamento sticky.
- Aplicar glassmorphism quando fixo: fundo translúcido (~80% opacidade), blur, borda inferior e sombra leve.

### `submenu`

Camada expandida de navegação local. Existe apenas no padrão `portal/topbar`. Projetos com `sidebar` não usam submenu.

### `sidebar`

Menu local para projetos com padrão `sidebar` (dashboards, ferramentas, softwares).

**Responsabilidades:**
- Ficar fixa na lateral.
- Ser colapsável a uma coluna de ícones.
- Exibir a navegação local principal.
- Manter identidade/conta no rodapé.
- Não duplicar a navegação global quando o `principalMenu` já estiver visível.

---

## Regras de cor e espaçamento

### Desktop

**Links do ecossistema:**
- Gap entre itens: `gap: calc(var(--spacing) * 4)` (equivale a `gap-4` em Tailwind v4).
- Item padrão: `text-[var(--slate-9)]` com `hover:text-[var(--slate-12)]`.
- Item ativo: `text-[var(--slate-12)]`.
- Sem uso de `accent` ou `muted` para estado ativo — usar tokens neutros.

**Logo MBC no `principalMenu` desktop:**
- Usar `logo-mbc-preto.svg` (`fill: #11181C`) sem condicionais de dark mode.
- Não usar `dark:hidden` / `hidden dark:block` — produtos sem suporte completo a dark mode perderiam o logo quando o OS do usuário estiver em dark mode via `prefers-color-scheme`.

### Mobile

O `principalMenu` mobile usa cor única, sem variações de muted ou tonalidades sutis.

**Regras:**
- Fundo: `bg-white dark:bg-black` — cor sólida, não `bg-background` (que pode resultar em cinza próximo ao branco).
- Texto e ícones: `text-foreground` — cor única em todo o header mobile.
- Hover de botões: `hover:bg-foreground/10`.
- Não usar `text-muted-foreground`, `bg-muted`, ou qualquer variação intermediária no `principalMenu` mobile.

**Logo MBC no `principalMenu` mobile:**
- Usar `logo-mbc-preto.svg` sem condicionais de dark mode (mesma regra do desktop).
- Quando o produto suportar dark mode completo (CSS vars redefinidas em `.dark` ou `@media (prefers-color-scheme: dark)`), adicionar `logo-mbc-branco.svg` com `hidden dark:block` e `dark:hidden` no preto.

---

## Integração Supabase

### Fonte de dados

**Projeto Supabase:** `eezbxwjohucstscdlvzp` (MBC Global)

**Tabela:** `public.ecosystem_menu_items`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | `text` PK | Slug do produto (`loja`, `clube`, `peregrino`, `ia`, `capela`, `blog`, `formacao`) |
| `label` | `text` | Texto exibido no menu |
| `href` | `text \| null` | URL de destino. `null` = item sem URL definida |
| `display_order` | `integer` | Ordenação crescente |
| `is_enabled` | `boolean` | `false` = excluído da query |

### Query

```
GET /rest/v1/ecosystem_menu_items
  ?select=id,label,href,display_order
  &is_enabled=eq.true
  &order=display_order.asc
```

Headers obrigatórios: `apikey` e `Authorization: Bearer <anon_key>`.

### Variáveis de ambiente

| Stack | Variáveis |
|-------|-----------|
| Next.js | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Vite | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |

### Regras de implementação

**`isActive`:** nunca armazenado no banco. Cada produto aplica o flag em código após o fetch, marcando apenas o próprio `id` como ativo. O item ativo usa `href: '/'` (não navega para fora do app atual).

**Fallback:** array local hardcoded em `ecosystem.ts` (ou equivalente). Usado quando Supabase não está configurado (variáveis ausentes) ou quando o fetch falha/retorna vazio.

**Rendering sem double render:**
- Inicializar `items` como `[]` (array vazio) — nunca com o fallback como estado inicial.
- O fetch define `items` exatamente uma vez: com dados do Supabase se bem-sucedido, com o fallback caso contrário.
- Isso evita a renderização dupla visível (fallback → API) que causa piscar na UI.

**Itens sem `href`:** não renderizar — nem como desabilitados, nem com estilo `cursor-not-allowed`. Filtrar antes de mapear: `items.filter(item => item.href)`.

**Cache:** projetos Next.js usam `next: { revalidate: 3600 }` no fetch. Projetos Vite buscam a cada carregamento de página.

### Padrão de fetch (Next.js — Server Component)

```typescript
export async function getEcosystemNavItems() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return ecosystemNavItems // fallback local

  try {
    const res = await fetch(
      `${url}/rest/v1/ecosystem_menu_items?select=id,label,href,display_order&is_enabled=eq.true&order=display_order.asc`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) return ecosystemNavItems
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return ecosystemNavItems
    return data.map(item => ({ id: item.id, label: item.label, href: item.href ?? undefined }))
  } catch {
    return ecosystemNavItems
  }
}

// No layout (Server Component):
const rawItems = await getEcosystemNavItems()
const items = rawItems.map(item => ({ ...item, isActive: item.id === '<product-id>' }))
```

### Padrão de fetch (Vite — hook React)

```typescript
export function useEcosystemNavItems() {
  const [items, setItems] = useState<EcosystemNavItem[]>([])

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL?.trim()
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

    if (!url || !key) {
      setItems(applyActive(fallbackItems))
      return
    }

    let cancelled = false

    fetch(
      `${url}/rest/v1/ecosystem_menu_items?select=id,label,href,display_order&is_enabled=eq.true&order=display_order.asc`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } }
    )
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (cancelled) return
        setItems(applyActive(
          Array.isArray(data) && data.length > 0
            ? data.map(item => ({ id: item.id, label: item.label, href: item.href ?? undefined }))
            : fallbackItems
        ))
      })
      .catch(() => { if (!cancelled) setItems(applyActive(fallbackItems)) })

    return () => { cancelled = true }
  }, [])

  return { items }
}

function applyActive(items: EcosystemNavItem[]): EcosystemNavItem[] {
  return items.map(item => ({
    ...item,
    isActive: item.id === '<product-id>',
    href: item.id === '<product-id>' ? '/' : item.href,
  }))
}
```

---

## Padrões por tipo de projeto

### `portal/topbar`

Use para portais, sites institucionais, blogs e ecommerces.

Estrutura:
1. `principalMenu` no topo — navegação global, não sticky.
2. `topbar` local abaixo — sticky durante scroll.
3. `submenu` opcional — categorias e links úteis locais.

Comportamento de scroll:
- O `principalMenu` sobe com o conteúdo ao rolar.
- A `topbar` ou submenu fica fixo no topo.
- O glassmorphism (fundo translúcido, blur, borda, sombra) pertence à barra local fixa, não ao `principalMenu`.
- Quando conta/avatar deixa de estar visível no `principalMenu` após scroll, pode entrar na topbar local com transição de opacidade.

### `sidebar`

Use para dashboards, ferramentas operacionais e softwares com navegação recorrente.

Estrutura:
1. `principalMenu` fixo no topo.
2. `sidebar` fixa na lateral, colapsável.
3. Conteúdo principal na área restante.
4. Footer de sessão na sidebar.

Sem submenu. Sem duplicação da navegação global dentro da sidebar quando o `principalMenu` já estiver visível.

---

## Mobile

Todos os produtos convergem para o mesmo padrão mobile.

**Layout do `principalMenu` compacto:**
1. Ícone de menu (trigger do overlay) — à esquerda.
2. Logo MBC ou marca do produto — centro.
3. Ações essenciais (pesquisa, carrinho/ação transacional, avatar/conta) — à direita.

As ações à direita ficam visíveis no header compacto mesmo quando também aparecem dentro do overlay. O header resolve acesso rápido; o overlay resolve contexto e descoberta.

**Ordem interna do overlay:**
1. Ações locais (busca, carrinho, atalhos) — sem título.
2. Menu local do produto.
3. Links úteis locais (estado autenticado).
4. Menu do ecossistema.
5. Identidade/sessão no rodapé.

No mobile, a navegação global (ecossistema) vem depois da navegação local dentro do overlay.

---

## Contrato de decisão

Regras binárias para implementação:

- Experiência de conteúdo, catálogo ou ecommerce → usar `portal/topbar`.
- Experiência de software, operação ou dashboard → usar `sidebar`.
- `sidebar` presente → sem submenu.
- Submenu presente → pertence exclusivamente ao padrão `portal/topbar`.
- Busca, carrinho e filtros são funções locais — não entram no `principalMenu`.
- Autenticação entra como slot de identidade — a lógica de sessão permanece no produto.
- Links globais vêm do Supabase; fallback local é reserva de última instância.
- Links locais permanecem sob responsabilidade exclusiva de cada produto.
- Item sem `href` → não renderizar.
- `isActive` → nunca persistir no banco; aplicar em código após o fetch.
- Mobile: sem `muted` ou tonalidades intermediárias no `principalMenu`.
- Desktop: gap entre links do ecossistema = `calc(var(--spacing) * 4)`.

---

## Checklist de revisão

- [ ] `principalMenu` contém apenas navegação global e identidade — sem funções locais.
- [ ] Links do ecossistema vêm do Supabase com fallback local.
- [ ] `items` inicializa como `[]`; definido uma única vez pelo fetch.
- [ ] Itens sem `href` não são renderizados.
- [ ] `isActive` aplicado em código — não armazenado no banco.
- [ ] Desktop: gap entre links = `calc(var(--spacing) * 4)`.
- [ ] Desktop: logo MBC sem `dark:hidden` quando o produto não suporta dark mode completo.
- [ ] Mobile: fundo `bg-white dark:bg-black`, texto `text-foreground`, sem variações muted.
- [ ] Glassmorphism na barra local fixa — não no `principalMenu`.
- [ ] Projetos com `sidebar` não possuem submenu.
- [ ] Navegação global não duplicada dentro da sidebar quando `principalMenu` visível.
- [ ] Overlay mobile: ações locais primeiro, ecossistema depois.
- [ ] Slot de sessão/identidade consistente em posição e conteúdo.
