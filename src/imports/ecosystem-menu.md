# Arquitetura do Menu do Ecossistema MBC

Este documento explica a estrutura base do menu do ecossistema MBC no Omnia Design System. Ele serve como contexto para projetar, implementar e revisar o comportamento do menu global e do menu local em produtos com padrões diferentes de navegação.

O entendimento aqui foi refinado a partir da implementação do menu da Loja MBC, que usa o padrão `portal/topbar` no desktop e o padrão mobile compartilhado entre todos os produtos do ecossistema.

Referências no Figma:

- [Pageblock e componentes de navegação](https://www.figma.com/design/sJD7ZxZUJgW04KCm9pjH0d/Omnia-Design-System-%C2%A9?m=auto&node-id=6135-1227&t=9GgqKArIGeSRAu13-1)
- [Exemplos desktop logados](https://www.figma.com/design/sJD7ZxZUJgW04KCm9pjH0d/Omnia-Design-System-%C2%A9?m=auto&node-id=6177-18454&t=9GgqKArIGeSRAu13-1)
- [Exemplos mobile](https://www.figma.com/design/sJD7ZxZUJgW04KCm9pjH0d/Omnia-Design-System-%C2%A9?m=auto&node-id=6229-83300&t=9GgqKArIGeSRAu13-1)

## Raciocínio

O ecossistema MBC tem dois padrões de navegação:

- `portal/topbar`, usado por portais, sites, blogs e ecommerces.
- `sidebar`, usado por aplicações com comportamento de app ou software.

Além disso, a autenticação é distribuída entre produtos. Cada aplicação pode ter regras próprias de sessão, mas a experiência de entrada, avatar e troca de contexto precisa aparecer de forma previsível.

O denominador comum é um overlay de ecossistema, já estabelecido no Omnia DS como sheet/modal. Ele deve ser acionável em qualquer contexto e precisa resolver ações locais, navegação local, navegação global e estado de identidade sem depender do layout principal da aplicação.

## Camadas de informação

A arquitetura do menu resolve três camadas.

### 1. Navegação entre produtos

É a navegação global do ecossistema. Ela não pertence ao produto atual, mas à família MBC.

Exemplos de links globais:

- Loja
- Clube
- Peregrino
- IA da MBC
- Capela
- Blog
- Área de Formação

Para fins de prototipação, o menu principal usa temporariamente estes destinos:

- Loja: https://loja-bibliotecacatolica-proto.vercel.app/
- Peregrino: https://peregrino-proto.vercel.app/
- Área de Formação: https://formacao-bibliotecacatolica-proto.vercel.app/
- Capela: https://capela-web-omega.vercel.app/
- Portal: http://bibliotecacatolica-portal.figma.site/

No desktop, essa camada aparece no `principalMenu`. No mobile, ela entra no overlay aberto pelo ícone de menu depois das ações rápidas locais e antes dos links locais.

### 2. Contexto local

É a navegação e o conjunto de funções da aplicação atual.

Exemplos:

- Links de seções internas.
- Categorias, coleções, tags ou atalhos editoriais.
- Busca local.
- Carrinho.
- Favoritos, pedidos ou minha conta.
- Ações contextuais específicas do produto.

Essa camada muda por projeto. O layout base se mantém, mas os links, ações e prioridades são definidos pelo produto consumidor.

Em mobile, as ações rápidas locais aparecem antes da navegação global. Os links globais ainda devem vir antes dos links locais para preservar a leitura de ecossistema primeiro e produto atual depois.

### 3. Identidade e sessão

É a camada de autenticação distribuída.

O Omnia DS não deve assumir a regra de login de cada produto. Ele deve apenas reservar pontos consistentes para:

- Avatar ou estado de visitante.
- Entrada ou criação de conta.
- Nome de usuário, quando existir.
- Ações de sessão e conta.

No Figma, essa camada aparece no lado direito do `principalMenu` e no rodapé dos menus laterais/sheets.

Em mobile, a ação de conta/avatar também deve permanecer visível no topo compacto. O rodapé do sheet continua existindo para oferecer contexto textual, como nome do usuário, "Minha conta", "Visitante" ou "Entrar ou criar conta".

## Componentes base

### `principalMenu`

Menu principal do ecossistema.

Responsabilidades:

- Exibir a marca MBC.
- Exibir links globais entre produtos.
- Indicar o produto ativo com baixa interferência visual.
- Expor entrada/autenticação ou avatar.
- No mobile, reduzir para ícone de menu, marca e ações essenciais visíveis.

Não deve carregar funções locais como busca, carrinho ou filtros de produto. Essas funções pertencem à camada local.

Quando uma aplicação possui menu local secundário, o `principalMenu` não precisa de borda inferior. A separação visual passa a pertencer à barra local, que fica mais próxima do conteúdo e sustenta o estado sticky.

### `topbar`

Menu local para projetos com característica de portal, site, blog ou ecommerce.

Responsabilidades:

- Exibir nome ou marca do produto atual.
- Exibir links locais horizontais.
- Receber slots de busca, carrinho e ações locais.
- Sustentar o comportamento sticky em páginas com scroll.

Use `topbar` quando a navegação local for curta, horizontal e próxima da experiência de conteúdo.

No padrão observado na Loja:

- Altura local de referência: `52px` no desktop.
- Estado inicial: exibe o nome curto do produto, como "Loja".
- Estado com scroll: troca o nome curto pelo logo completo do produto.
- A troca entre nome e logo deve usar transição suave de opacidade e deslocamento.
- A topbar local permanece fixa no topo quando o `principalMenu` sobe com a rolagem.
- O efeito de glassmorphism pertence à topbar local, não ao `principalMenu`.
- O fundo translúcido deve manter aproximadamente 80% de opacidade, com blur sutil, borda inferior e sombra leve apenas quando houver scroll.
- Campos de busca dentro da topbar não devem ter preenchimento opaco; use fundo transparente para preservar o efeito de blur.

### `submenu`

Camada expandida de navegação local em projetos com `topbar`.

No Figma, o exemplo `submenu/loja` separa:

- Grupo principal, com categorias ou linhas editoriais do produto.
- Grupo secundário, com links úteis como pedidos, favoritos e minha conta.

O submenu existe apenas no padrão `portal/topbar`. Projetos com `sidebar` não devem criar submenu; a navegação local já está resolvida pela própria sidebar.

Quando o submenu usa `NavigationMenu`, os links e triggers devem seguir o visual de pílula:

- Arredondamento total.
- Estado padrão com texto secundário.
- Hover/focus com superfície neutra.
- Estado ativo ou aberto com superfície neutra e texto principal.
- Evitar `accent` para ativo/aberto quando o produto pede uma leitura cinza/neutra.
- Usar tokens do design system, como `muted`, `muted-foreground`, `foreground`, `border` e `ring`.

### `sidebar`

Menu local para projetos com característica de app ou software.

Responsabilidades:

- Ficar fixa na lateral.
- Ser colapsável.
- Exibir a navegação local principal.
- Manter identidade/conta no rodapé.
- Conviver com o `principalMenu` fixo no topo.

Quando o padrão é `sidebar`, não há submenu. A hierarquia é: `principalMenu` no topo, `sidebar` fixa na lateral e conteúdo da aplicação no restante da tela.

### Overlay de ecossistema

O overlay é o ponto comum entre `topbar` e `sidebar`.

Responsabilidades:

- Consolidar links globais e locais em telas compactas.
- Manter o mesmo modelo mental em todos os produtos.
- Exibir identidade/sessão em posição consistente.
- Adaptar o conteúdo às funções locais de cada produto.

Em mobile, todas as aplicações convergem para esse padrão: `principalMenu` compacto no topo e menu acionado por overlay. O que muda é o contexto local renderizado dentro dele.

A prioridade interna do overlay mobile é:

1. Ações locais.
2. Menu do ecossistema.
3. Menu local.
4. Identidade/sessão no rodapé.

A seção de ações locais não precisa de título. Ela deve ser rápida e operacional, com busca, carrinho, atalhos ou ações equivalentes ao produto.

## Padrões por tipo de projeto

### Projetos com `portal/topbar`

Use para:

- Portais.
- Sites institucionais.
- Blogs.
- Ecommerces.
- Experiências de conteúdo e catálogo.

Estrutura:

1. `principalMenu` no topo, com navegação global.
2. `topbar` local abaixo ou no estado sticky.
3. Submenu local quando o produto precisar de categorias ou links úteis.
4. Slots locais para busca, carrinho e ações específicas.

Comportamento de scroll:

- No estado inicial, o `principalMenu` aparece como referência global do ecossistema.
- Ao rolar a página, o menu principal pode subir com o conteúdo.
- A `topbar` ou submenu local fica fixo no topo.
- O estado fixo usa leve glassmorphism, com fundo translúcido, blur e borda inferior sutil.
- Quando a conta/avatar não está mais visível no `principalMenu`, ela pode entrar na topbar local em uma posição compacta, normalmente à direita das ações locais.
- Essa entrada deve ser animada com opacidade, deslocamento e reserva gradual de largura para evitar transição brusca.

Esse comportamento é indicado para preservar contexto local sem manter duas barras competindo no topo durante a leitura.

### Exemplo aplicado: Loja

A Loja MBC é um produto `portal/topbar`.

No desktop:

- O `principalMenu` exibe marca MBC, links globais e autenticação.
- A topbar local exibe marca/nome da Loja, navegação local, busca, carrinho e, depois do scroll, conta/avatar em formato compacto.
- Os links locais vêm da API do produto, preservando `new_tab`, categorias, selos e links personalizados.
- Links úteis autenticados, como "Compras" e "Favoritos", pertencem ao menu local.
- Busca preserva submit e query params da rota `/pesquisa`.
- Carrinho preserva abertura do drawer local.
- Login preserva o `next_url` antes de navegar para `/entrar`.

No scroll:

- O `principalMenu` deixa de ficar fixo.
- A topbar local permanece sticky.
- O nome curto "Loja" pode ser substituído pelo logo completo.
- A topbar recebe glassmorphism; o `principalMenu` não.
- O avatar/conta entra à direita do carrinho com transição suave.

O ícone de carrinho e o ícone/avatar de conta devem ter proporções homogêneas:

- Moldura visual compacta de `24px`.
- Ícone interno de `20px`.
- Mesmo peso de linha em ícones Lucide.
- Badge de quantidade discreto, posicionado no canto superior direito da moldura.

### Projetos com `sidebar`

Use para:

- Dashboards.
- Ferramentas operacionais.
- Produtos com navegação recorrente.
- Softwares com fluxos internos profundos.

Estrutura:

1. `principalMenu` fixo no topo.
2. `sidebar` fixa na lateral.
3. Conteúdo principal ocupando a área restante.
4. Footer de sessão na sidebar.

Regras:

- Não usar submenu.
- Não duplicar a navegação global dentro da sidebar fixa quando o `principalMenu` já estiver visível.
- Usar colapso para reduzir a sidebar a uma coluna de ícones.
- Manter labels e ícones locais alinhados ao contexto do produto.

No mobile, o conteúdo da sidebar migra para o overlay acionado pelo menu compacto.

## Implementação técnica na Loja MBC

Esta seção registra onde o menu está estruturado no projeto da Loja e como as responsabilidades estão separadas.

Projeto de referência:

- `/Users/victoramaral/PROJETOS/loja-mbc-web-proto`

### Composição principal

Arquivo:

- `components/header.tsx`

Responsabilidade:

- Orquestrar o `principalMenu`, a topbar local da Loja e o header mobile.
- Ler estado de carrinho com `useCart()`.
- Abrir o drawer do carrinho com `useCartDrawer()`.
- Ler estado de autenticação com `useAuth()`.
- Renderizar avatar/dropdown com `UserMenu`.
- Controlar estado de scroll para fixação, glassmorphism, troca de "Loja" para logo completo e entrada animada do avatar na topbar.
- Controlar a abertura do campo de busca visível no mobile.

Estrutura renderizada:

```tsx
Header
  desktop principalMenu
    logo MBC
    ecosystemNavItems
    authSlot
  desktop topbar local
    nome/logo da Loja
    Menu variant="desktop"
    SearchBarWrapper
    CartButton
    authSlot compacto após scroll
  mobile principalMenu compacto
    Menu variant="mobile"
    logo MBC
    botão de pesquisa
    CartButton
    authSlot compacto
    SearchBarWrapper expansível
```

### Menu do ecossistema

Arquivo:

- `lib/navigation/ecosystem.ts`

Responsabilidade:

- Centralizar a configuração dos links globais do ecossistema.
- Definir `EcosystemNavItem`.
- Marcar a Loja como produto ativo neste projeto.
- Resolver URLs a partir de variáveis públicas de ambiente.
- Permitir fallback seguro para a Loja e item desabilitado quando outros produtos não possuem URL configurada.

Itens configurados:

- Loja.
- Clube.
- Peregrino.
- IA da MBC.
- Capela.
- Blog.
- Área de Formação.

Uso no desktop:

- `components/header.tsx` importa `ecosystemNavItems`.
- O `principalMenu` desktop renderiza esses itens em uma navegação horizontal.
- Esse menu global não fica fixo quando a página rola.

Uso no mobile:

- `components/header.tsx` passa `ecosystemNavItems` para `Menu` via prop `ecosystemItems`.
- `components/menu.tsx` renderiza esses itens dentro do sheet mobile, depois das ações locais e do menu local.

### Menu local da Loja

Arquivo:

- `components/menu.tsx`

Responsabilidade:

- Renderizar o menu local da Loja em duas variantes: `desktop` e `mobile`.
- Buscar os links locais via `getMenu()`.
- Preservar tipos de link vindos do produto:
  - `personalized_link`.
  - `category`, convertido para `/pesquisa?category=...`.
  - `seal`, convertido para `/pesquisa?seal=...`.
- Preservar `new_tab` em links locais.
- Fechar o sheet mobile ao navegar.
- Renderizar links úteis autenticados, como "Compras" e "Favoritos".

Arquivos relacionados:

- `services/api/menu.ts`, contrato `MenuItem` e função `getMenu()`.
- `components/ui/navigation-menu.tsx`, base Radix/shadcn usada no desktop.
- `components/ui/sheet.tsx`, base usada no overlay mobile.

Uso no desktop:

```tsx
<Menu variant="desktop" />
```

- Renderiza `NavigationMenu`.
- Fica dentro da topbar local da Loja.
- Usa links em formato de pílula.
- Usa tokens neutros para hover, focus, ativo e aberto.
- Exibe submenus quando o item local possui `children`.
- Adiciona "Compras" e "Favoritos" quando o usuário está autenticado.

Uso no mobile:

```tsx
<Menu
  variant="mobile"
  ecosystemItems={ecosystemNavItems}
  searchSlot={<SearchBarWrapper />}
  cartCount={cartItems.length}
  isCartHydrated={isHydrated}
  onCartClick={openDrawer}
  onLoginClick={handleEntrar}
/>
```

- Renderiza o trigger do sheet no header compacto.
- O conteúdo do sheet usa a ordem:
  1. Ações locais, sem título.
  2. Menu local da Loja.
  3. Links úteis locais, quando autenticado.
  4. Menu do ecossistema.
  5. Sessão/identidade no rodapé.

### Ações locais da Loja

Busca:

- `components/search-bar.tsx`
- `components/search-bar-wrapper.tsx`

Responsabilidade:

- Submeter busca para `/pesquisa`.
- Preservar query params.
- Sincronizar valor quando a rota atual é `/pesquisa`.
- Limpar o campo sem quebrar a navegação.
- Usar fundo transparente para conviver com o glassmorphism da topbar.

Carrinho:

- `CartButton`, definido localmente em `components/header.tsx`.
- `useCart()`, para quantidade de itens.
- `useCartDrawer()`, para abertura do drawer.

Responsabilidade:

- Exibir ícone de sacola Lucide.
- Exibir badge discreto de quantidade.
- Abrir o carrinho sem alterar a rota.
- Manter proporção compacta de `24px` de moldura visual e `20px` de ícone.

Conta/avatar:

- `components/user-menu.tsx`
- `components/ui/avatar.tsx`
- `useAuth()`

Responsabilidade:

- Exibir avatar de usuário autenticado em `24px`.
- Exibir estado visitante com ícone de usuário.
- Abrir dropdown de conta quando autenticado.
- Direcionar visitante para `/entrar`, preservando `next_url` no `localStorage`.

### Separação de responsabilidades

O menu do ecossistema pertence à configuração global:

- Define produtos.
- Define URLs globais.
- Define produto ativo.
- Não conhece carrinho, busca, categorias ou pedidos.

O menu local pertence ao produto Loja:

- Lê links da API da Loja.
- Conhece categorias, selos e links personalizados.
- Renderiza busca e carrinho.
- Conhece rotas como `/pesquisa`, `/lista-desejos`, `/minha-conta/pedidos` e `/entrar`.
- Conhece o comportamento de drawer do carrinho e sessão local.

O `Header` é a ponte entre as duas camadas:

- Junta navegação global e contexto local.
- Decide o que aparece no desktop e no mobile.
- Injeta ações locais no menu mobile.
- Mantém o comportamento sticky/scroll visual da experiência `portal/topbar`.

## Mobile

Como o objetivo do ecossistema é web, o mobile assimila o mesmo padrão em todas as aplicações.

O layout base é:

1. `principalMenu` compacto no topo.
2. Ícone de menu à esquerda.
3. Marca MBC ou marca do contexto.
4. Ações essenciais visíveis à direita.
5. Overlay com ações locais, navegação local, navegação global e sessão.

As ações essenciais visíveis no topo mobile devem incluir, quando existirem no produto:

- Pesquisa.
- Carrinho ou ação transacional equivalente.
- Avatar, conta ou entrada.

Essas ações ficam visíveis no header mobile mesmo quando também aparecem dentro do overlay. O header resolve acesso rápido; o overlay resolve contexto e descoberta.

Ordem recomendada no overlay mobile:

1. Ações locais, sem título.
2. Menu local, com label do produto.
3. Links úteis locais, quando fizer sentido para o estado autenticado.
4. Menu do ecossistema.
5. Sessão/identidade no rodapé.

A diferença entre produtos está no conteúdo do overlay:

- Loja pode incluir categorias, carrinho, busca, pedidos e favoritos.
- Clube pode incluir assinatura, pedidos e conta.
- Peregrino pode incluir início, coleções, tags e ajuda.
- IA da MBC pode incluir conversas, categorias e uso do plano.
- Capela pode incluir liturgia, orações e atalhos devocionais.
- Blog pode incluir coleções, tags e artigos.

## Contrato de decisão

Use estas regras para escolher a estrutura:

- Se a experiência é conteúdo, catálogo ou ecommerce, use `portal/topbar`.
- Se a experiência é software, operação ou dashboard, use `sidebar`.
- Se existe `sidebar`, não existe submenu.
- Se existe submenu, ele pertence ao padrão `portal/topbar`.
- Busca, carrinho e filtros são funções locais, não links globais.
- Autenticação entra como slot de identidade/sessão, não como lógica interna do menu.
- Links globais devem vir de uma configuração compartilhada do ecossistema.
- Links locais devem continuar sob responsabilidade de cada aplicação.
- No mobile, ações locais visíveis no topo não contradizem a regra do `principalMenu`; elas são atalhos compactos do contexto local.
- No mobile, a ordem é local primeiro e ecossistema depois.
- Se um link global não tiver URL segura, renderize o item como desabilitado para evitar navegação quebrada.

## Relação com `OmniaAppShell`

Na implementação, o `OmniaAppShell` deve receber a configuração do produto e decidir a composição:

```ts
type NavigationMode = "topbar" | "sidebar";

type EcosystemMenuConfig = {
  application: {
    id: string;
    name: string;
    kind: "portal" | "software";
  };
  navigationMode: NavigationMode;
  globalNav: NavigationItem[];
  localNav: NavigationItem[];
  localActions?: {
    search?: React.ReactNode;
    cart?: React.ReactNode;
    primaryAction?: React.ReactNode;
    contextSwitcher?: React.ReactNode;
  };
  authSlot?: React.ReactNode;
  hasSubmenu?: boolean;
  mobile?: {
    visibleActions?: {
      search?: React.ReactNode;
      cart?: React.ReactNode;
      auth?: React.ReactNode;
    };
    overlayOrder?: Array<"localActions" | "localNav" | "utilityLinks" | "globalNav" | "session">;
  };
};
```

O DS controla estrutura, comportamento responsivo, sticky, colapso e pontos de composição. Cada produto controla rotas, permissões, busca, carrinho, autenticação e regras locais.

## Configuração global

Os links globais do ecossistema vêm de uma tabela Supabase compartilhada entre todos os produtos. Cada aplicação busca os itens no carregamento e usa um array hardcoded local como fallback em caso de falha.

### Fonte de dados: Supabase

**Projeto:** `eezbxwjohucstscdlvzp` (MBC Global)

**Tabela:** `public.ecosystem_menu_items`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | text PK | Identificador único (`loja`, `clube`, `peregrino`, etc.) |
| `label` | text | Texto exibido no menu |
| `href` | text \| null | URL de destino. `null` = item desabilitado |
| `display_order` | integer | Ordenação crescente |
| `is_enabled` | boolean | `false` = oculto na query (não aparece no menu) |

Para alterar um link, basta editar diretamente no Supabase Studio — sem necessidade de redeploy. O cache dos projetos Next.js é de 1 hora (`revalidate: 3600`); os projetos Vite buscam a cada carregamento de página.

**Itens esperados:**

- Loja
- Clube
- Peregrino
- IA da MBC
- Capela
- Blog
- Área de Formação

### Regras de configuração

- `isActive` **nunca** é armazenado no banco. Cada projeto aplica o flag no código, após o fetch, marcando apenas o próprio produto como ativo.
- O produto ativo usa `href: '/'` internamente (não sai do app atual).
- `is_enabled = false` com `href = null` é o estado padrão para produtos sem URL definida — o item aparece desabilitado na UI.
- Se o fetch falhar ou as variáveis de ambiente não estiverem configuradas, o array local `ecosystemNavItems` é usado como fallback automático.

### Variáveis de ambiente por projeto

| Projeto | Stack | Variáveis |
|---------|-------|-----------|
| `loja-mbc-web-proto` | Next.js | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `peregrino-web-homolog` | Next.js | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `mbc-ia-web-main` | Next.js | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `area-formacao-web-main` | Next.js | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `capela-web` | Vite | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` |

A Chapel usa prefixo `VITE_*` por ser um projeto Vite (não Next.js).

### Arquivo de serviço por projeto

Cada projeto Next.js tem um arquivo `ecosystem-service.ts` com a função `getEcosystemNavItems()`:

| Projeto | Caminho |
|---------|---------|
| `loja-mbc-web-proto` | `lib/navigation/ecosystem-service.ts` |
| `peregrino-web-homolog` | `src/features/navigation/services/ecosystem-service.ts` |
| `mbc-ia-web-main` | `src/features/navigation/services/ecosystem-service.ts` |
| `area-formacao-web-main` | `src/features/navigation/services/ecosystem-service.ts` |

A Chapel usa o hook `useEcosystemNavItems()` em `src/app/components/shell/useEcosystemNavItems.ts`.

### Padrão de fetch (Next.js)

```typescript
export async function getEcosystemNavItems() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return ecosystemNavItems // fallback

  try {
    const res = await fetch(
      `${url}/rest/v1/ecosystem_menu_items?select=id,label,href,display_order&is_enabled=eq.true&order=display_order.asc`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 3600 },
      },
    )
    if (!res.ok) return ecosystemNavItems
    const data = await res.json()
    if (!Array.isArray(data) || data.length === 0) return ecosystemNavItems
    return data.map((item) => ({ id: item.id, label: item.label, href: item.href ?? undefined }))
  } catch {
    return ecosystemNavItems
  }
}
```

O merge de `isActive` acontece no layout (Server Component) após o fetch:

```typescript
const rawItems = await getEcosystemNavItems()
const items = rawItems.map((item) => ({ ...item, isActive: item.id === 'loja' })) // por produto
```

### Variáveis de ambiente legadas

As variáveis `NEXT_PUBLIC_MBC_*` e `VITE_MBC_*` ainda existem nos projetos como parte do fallback hardcoded em `ecosystem.ts`. Elas não são mais lidas pelo service de fetch — a fonte primária é o Supabase. Podem ser removidas em uma limpeza futura.

## Checklist de revisão

Antes de aprovar uma aplicação usando o menu do ecossistema, valide:

- O produto usa `portal/topbar` ou `sidebar` de acordo com sua natureza.
- O `principalMenu` contém apenas navegação global e identidade.
- O menu local contém apenas navegação e funções do produto atual.
- Aplicações com `sidebar` não possuem submenu.
- Aplicações com submenu têm comportamento sticky no scroll.
- O glassmorphism está na barra local fixa, não no `principalMenu`.
- Em desktop, conta/avatar aparece no `principalMenu` e pode entrar na topbar local depois do scroll.
- Em mobile, pesquisa, carrinho/ação transacional e avatar/conta ficam visíveis no header compacto quando existirem.
- Em mobile, o overlay prioriza ações locais, menu local e só depois ecossistema.
- Estados ativos/abertos usam tokens neutros quando o produto exige leitura cinza.
- Ícones compactos de ações têm tamanho e peso consistentes.
- O estado sticky usa blur, fundo translúcido e borda sutil.
- O mobile usa o mesmo padrão de overlay em todos os produtos.
- O footer de sessão aparece de forma consistente.
- Links globais e locais não estão duplicados sem necessidade.
- A implementação não mistura regra de autenticação do produto dentro do componente base do DS.

## Implementação técnica por projeto

Esta seção registra onde o menu está estruturado em cada projeto do ecossistema. Use como referência para encontrar rapidamente o arquivo de configuração, os componentes de navegação e os layouts que os montam.

### Loja MBC (`loja-mbc-web-proto`) — portal/topbar

Projeto de referência do ecossistema. Detalhado na seção [Implementação técnica na Loja MBC](#implementação-técnica-na-loja-mbc).

- **Projeto:** `/Users/victoramaral/PROJETOS/loja-mbc-web-proto`
- **Padrão:** `portal/topbar`
- **Stack:** Next.js
- **Breakpoint:** `lg` (1024px)
- **Branch do menu:** `menu-principal`

Arquivos principais:

- `lib/navigation/ecosystem.ts` — fallback local dos itens globais, produto ativo: Loja
- `lib/navigation/ecosystem-service.ts` — busca itens do Supabase; fallback para `ecosystem.ts`
- `components/header.tsx` — aceita prop `items?: EcosystemNavItem[]`; orquestra principalMenu desktop, topbar local e header mobile
- `components/menu.tsx` — menu local da Loja em variante `desktop` e `mobile`
- `components/minha-conta-shell.tsx` — shell client para o layout de conta; aceita `ecosystemItems` prop
- `components/user-menu.tsx` — dropdown de conta ou botão de login
- `services/api/menu.ts` — contrato `MenuItem` e função `getMenu()`

Layouts que montam o header:

- `app/(loja)/layout.tsx` — Server Component async; busca itens e passa para `<Header>`
- `app/(full)/layout.tsx` — Server Component async; mesma lógica
- `app/minha-conta/layout.tsx` — Server Component async; passa itens para `<MinhaContaShell>`

---

### Peregrino (`peregrino-web-homolog`) — sidebar

- **Projeto:** `/Users/victoramaral/PROJETOS/peregrino-web-homolog`
- **Padrão:** `sidebar`
- **Stack:** Next.js
- **Breakpoint:** `md` (768px)
- **Branch do menu:** `menu-principal`

Arquivos principais:

- `src/features/navigation/config/ecosystem.ts` — fallback local dos itens globais; produto ativo: Peregrino
- `src/features/navigation/services/ecosystem-service.ts` — busca itens do Supabase; fallback para `ecosystem.ts`
- `src/features/navigation/components/header.tsx` — aceita prop `ecosystemItems?: EcosystemNavItem[]`; desktop: MbcMark + `EcosystemNav` + `UserMenu`; mobile: SidebarTrigger + logo + search + UserMenu compact
- `src/features/navigation/components/ecosystem-nav.tsx` — aceita `items?: EcosystemNavItem[]`; variante `desktop` e `mobile`; usa `useSidebar()` para fechar drawer
- `src/features/navigation/components/app-sidebar.tsx` — aceita `ecosystemItems?: EcosystemNavItem[]`; passa para `EcosystemNav variant="mobile"` na seção mobile (`md:hidden`)
- `src/features/navigation/components/sidebar-session.tsx` — footer do sidebar
- `src/features/navigation/components/user-menu.tsx` — dropdown de conta no desktop

Layouts que montam o header:

- `src/app/(peregrino)/layout.tsx` — async Server Component; busca itens, passa para `<Header>` e `<AppSidebar>`
- `src/app/(content)/layout.tsx` — mesma estrutura

---

### Área de Formação (`area-formacao-web-main`) — sidebar + navbar

- **Projeto:** `/Users/victoramaral/PROJETOS/area-formacao-web-main`
- **Padrão:** `sidebar` + navbar superior (híbrido)
- **Stack:** Next.js
- **Breakpoint:** `lg` (1024px)
- **Branch do menu:** `menu-principal`

Arquivos principais:

- `src/features/navigation/config/ecosystem.ts` — fallback local dos itens globais; produto ativo: Formação
- `src/features/navigation/services/ecosystem-service.ts` — busca itens do Supabase; fallback para `ecosystem.ts`
- `src/features/navigation/components/ecosystem-nav.tsx` — aceita `items` como prop e `onNavigate` callback; variante `desktop` e `mobile`
- `src/components/layout/navbar.tsx` — aceita `ecosystemItems?: EcosystemNavItem[]`; desktop: BrandLogo + EcosystemNav + conta; mobile: drawer com seção Ecossistema
- `src/components/layout/sidebar.tsx` — collapsível; itens locais: Início, Cursos, Admin; footer com conta
- `src/components/layout/app-layout.tsx` — aceita `ecosystemItems?: EcosystemNavItem[]`; orquestra Navbar + Sidebar + conteúdo

Layouts que montam o header:

- `src/app/(app)/layout.tsx` — async Server Component; busca itens, passa `ecosystemItems` para `<AppLayout>`
- `src/app/(account)/layout.tsx` — async Server Component; mesma lógica

---

### IA da MBC (`mbc-ia-web-main`) — sidebar

- **Projeto:** `/Users/victoramaral/PROJETOS/mbc-ia-web-main`
- **Padrão:** `sidebar`
- **Stack:** Next.js
- **Breakpoint:** `lg` (1024px)
- **Branch do menu:** `menu-principal`

Arquivos principais:

- `src/features/navigation/config/ecosystem.ts` — fallback local dos itens globais; produto ativo: IA da MBC
- `src/features/navigation/services/ecosystem-service.ts` — busca itens do Supabase; fallback para `ecosystem.ts`
- `src/features/navigation/components/ecosystem-menu.tsx` — aceita `ecosystemItems?: EcosystemNavItem[]`; desktop: EcosystemLogo + `EcosystemDesktopLinks(items)` + AccountControl; mobile: Sheet com MobileLocalActions, seção local, `MobileEcosystemLinks(items)` e MobileIdentity
- `src/components/nav-bar.tsx` — Client Component; aceita `ecosystemItems?: EcosystemNavItem[]`; conecta `useSession()` + `useSignOut()` ao `EcosystemMenu`
- `src/components/nav-bar-server.tsx` — Server Component; busca itens, aplica `isActive: 'ia'`, renderiza `<NavBar ecosystemItems={...} />`
- `src/components/app-sidebar.tsx` — quick actions, SidebarCollectionsNav, ChatHistory, NavUser no footer
- `src/components/nav-user.tsx` — dropdown de conta no footer

Layout que monta o header:

- `src/app/(ai)/layout.tsx` — usa `<NavBarServer />` em vez de `<NavBar />`

---

### Capela (`capela-web`) — portal/topbar

- **Projeto:** `/Users/victoramaral/PROJETOS/capela-web`
- **Padrão:** `portal/topbar`
- **Stack:** Vite + React Router (sem Next.js)
- **Breakpoint:** `xl` (1280px) — diferente dos outros apps do ecossistema
- **Branch do menu:** `menu-principal`

Arquivos principais:

- `src/app/components/shell/shellConfig.ts` — fallback local dos itens globais; usa `import.meta.env.VITE_MBC_*`; produto ativo: Capela (href: `/`)
- `src/app/components/shell/useEcosystemNavItems.ts` — hook React; inicia com fallback; busca do Supabase via `useEffect`; aplica `isActive: id === 'capela'` e sobrescreve `href = '/'` para o item ativo; usa `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
- `src/app/components/shell/CapelaShellHeader.tsx` — usa `useEcosystemNavItems()`; passa `items` para `DesktopPrincipalMenu` e `MobileNavigationDrawer`
- `src/app/components/shell/CapelaRootLayout.tsx` — compõe CapelaShellHeader + main + footer
- `src/app/components/shell/CapelaWordmark.tsx` — logo com transição animada

Particularidades:

- Por ser Vite, as variáveis usam prefixo `VITE_SUPABASE_*` em vez de `NEXT_PUBLIC_SUPABASE_*`
- O `MobileNavigationDrawer` é implementado manualmente com `useState` sem depender do shadcn/ui Sheet
- A topbar local (`capelaSubNavLinks`) é separada do ecossistema (`ecosystemNavItems`)
- O fetch é client-side; o menu renderiza imediatamente com fallback e atualiza silenciosamente após o fetch
