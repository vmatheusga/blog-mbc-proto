export type Post = {
  id: number;
  title: string;
  category: string;
  categories: string[];
  excerpt: string;
  imageUrl: string;
  link: string;
  featured?: boolean;
};

export type Columnist = {
  id: number;
  name: string;
  photoUrl: string;
  bio: string;
  pageUrl: string;
};

export const posts: Post[] = [
  {
    id: 1,
    title: "O Espírito Santo: um guia completo para católicos",
    category: "Formação",
    categories: ["Formação"],
    excerpt: "Conheça a terceira Pessoa da Santíssima Trindade, sua ação na vida da Igreja e como abrir o coração à sua presença transformadora.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2025/06/espirito-santo-1-scaled-e1748953562285.jpg",
    link: "https://bibliotecacatolica.com.br/blog/formacao/espirito-santo/",
    featured: true,
  },
  {
    id: 2,
    title: "Novena de Pentecostes",
    category: "Novenas",
    categories: ["Destaque", "Novenas"],
    excerpt: "Prepare seu coração para receber os dons do Espírito Santo nesta novena que nos conduz ao grande dia de Pentecostes.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2023/05/novena-de-pentecostes-relacionados-1.jpeg",
    link: "https://bibliotecacatolica.com.br/blog/novenas/novena-de-pentecostes/",
  },
  {
    id: 3,
    title: "Oração a Santa Rita de Cássia por causas impossíveis",
    category: "Espiritualidade",
    categories: ["Espiritualidade"],
    excerpt: "Santa Rita é a padroeira das causas impossíveis. Recorra a ela com fé e confie na misericórdia de Deus.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2023/04/Santa-Rita-cathopic.jpeg",
    link: "https://bibliotecacatolica.com.br/blog/espiritualidade/oracao-a-santa-rita-de-cassia/",
  },
  {
    id: 4,
    title: "Temperança: a virtude que ordena os desejos humanos",
    category: "Formação",
    categories: ["Formação"],
    excerpt: "A temperança é a virtude moral que modera a atração pelos prazeres e assegura o domínio da vontade sobre os instintos.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2026/05/virtude-da-temperanca.png",
    link: "https://bibliotecacatolica.com.br/blog/formacao/virtude-da-temperanca/",
  },
  {
    id: 5,
    title: "Ascensão do Senhor: a gloriosa partida de Jesus",
    category: "Formação",
    categories: ["Formação"],
    excerpt: "Quarenta dias após a Ressurreição, Jesus sobe aos céus na presença dos apóstolos, inaugurando uma nova etapa na história da salvação.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2023/05/icon-g1912f73db_1280.jpg",
    link: "https://bibliotecacatolica.com.br/blog/formacao/ascensao-do-senhor/",
  },
  {
    id: 6,
    title: "A virtude teologal da fé",
    category: "Formação",
    categories: ["Formação"],
    excerpt: "A fé é o fundamento da vida cristã: um dom de Deus e uma resposta livre do homem que o inclina a acreditar em tudo o que Ele revelou.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2025/02/virtude-teologal-da-fe-thumb-e1740667833883.jpg",
    link: "https://bibliotecacatolica.com.br/blog/formacao/virtude-teologal-da-fe/",
  },
  {
    id: 7,
    title: "Novena a Santa Rita de Cássia",
    category: "Novenas",
    categories: ["Novenas"],
    excerpt: "Reze esta novena pedindo a intercessão de Santa Rita de Cássia para as suas intenções mais difíceis e impossíveis.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2023/05/web3-saint-rita-cascia-italy.webp",
    link: "https://bibliotecacatolica.com.br/blog/novenas/novena-a-santa-rita-de-cassia/",
  },
  {
    id: 8,
    title: "A virtude teologal da caridade",
    category: "Formação",
    categories: ["Formação"],
    excerpt: "A caridade é a mais excelente das virtudes teologais: ela nos une a Deus e ao próximo, ordenando todo o amor humano ao bem supremo.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2025/03/virtude-teologal-da-caridade-e1741023264605.jpg",
    link: "https://bibliotecacatolica.com.br/blog/formacao/virtude-teologal-da-caridade/",
  },
  {
    id: 9,
    title: "Josef Pieper: vida, pensamento e principais obras",
    category: "Formação",
    categories: ["Formação"],
    excerpt: "Filósofo tomista do século XX, Josef Pieper dedicou sua vida a tornar o pensamento clássico acessível ao homem moderno.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2026/05/topbild-josef-pieper_bearb.jpg",
    link: "https://bibliotecacatolica.com.br/blog/formacao/josef-pieper/",
  },
  {
    id: 10,
    title: "Irmã Lúcia, a guardiã do terceiro segredo de Fátima",
    category: "Devoção",
    categories: ["Devoção", "Notícias"],
    excerpt: "A última vidente de Fátima viveu por décadas com o peso do segredo e a missão de transmitir a mensagem de Nossa Senhora ao mundo.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2023/06/irma-lucia-_-foto-lucia-site-oficial.png",
    link: "https://bibliotecacatolica.com.br/blog/devocao/irma-lucia/",
  },
  {
    id: 11,
    title: "Cova da Iria: o lugar das aparições de Nossa Senhora de Fátima",
    category: "Formação",
    categories: ["Formação"],
    excerpt: "Em 1917, Nossa Senhora apareceu três vezes a três pastorinhos neste simples lugar de Portugal que se tornou um dos maiores santuários do mundo.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2023/05/2305_Cova_da_Iria_Santuario.png",
    link: "https://bibliotecacatolica.com.br/blog/formacao/cova-da-iria/",
  },
  {
    id: 12,
    title: "Guia Completo sobre Nossa Senhora: a Mãe de Deus",
    category: "Formação",
    categories: ["Formação"],
    excerpt: "Maria, a Mãe de Deus, é o modelo perfeito de fé e entrega. Conheça sua história, seus títulos e sua missão na história da salvação.",
    imageUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2024/11/1559-memoria-de-nossa-senhora-rainha-frame_111138.jpg",
    link: "https://bibliotecacatolica.com.br/blog/formacao/nossa-senhora/",
  },
];

export const columnists: Columnist[] = [
  {
    id: 1,
    name: "Aline Brodbeck",
    photoUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2024/08/perfil-aline-1-150x150.jpg",
    bio: "Advogada, autora de diversos livros, professora e formadora católica em temas de família e feminilidade. Mãe de cinco filhos.",
    pageUrl: "https://bibliotecacatolica.com.br/blog/author/aline-brodbeck/",
  },
  {
    id: 2,
    name: "Dayane Dal Vesco Cardoso",
    photoUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2025/02/perfil-day-150x150.jpg",
    bio: "Psicoterapeuta com foco em simbólica, mapa natal e temperamentos, casada, mãe de 6 filhos.",
    pageUrl: "https://bibliotecacatolica.com.br/blog/author/dayane-cardoso/",
  },
  {
    id: 3,
    name: "Laise Sales",
    photoUrl: "https://bibliotecacatolica.com.br/wp-content/uploads/2024/08/perfil-laise-150x150.jpg",
    bio: "Professora, doutora em História da Cultura, esposa e mãe, fundadora da Comunidade Entre Esposas.",
    pageUrl: "https://bibliotecacatolica.com.br/blog/author/laise-sales/",
  },
];

export const categories = [
  "Todos",
  "Formação",
  "Espiritualidade",
  "Novenas",
  "Devoção",
  "Notícias",
];
