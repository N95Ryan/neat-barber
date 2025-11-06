export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
}

const mockupImage =
  "https://res.cloudinary.com/drhqmgbm0/image/upload/w_500,h_300,c_fill,q_80/v1762468629/DSC06124_z4bryh.jpg";

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Pourquoi nous utilisons les produits Reuzel",
    slug: "pourquoi-nous-utilisons-les-produits-reuzel",
    excerpt: "Découvrez pourquoi nous avons choisi les produits Reuzel pour nos services de coiffure et de barbier.",
    category: "LE MAG",
    image: mockupImage,
    date: "15 septembre 2025"
  },
  {
    id: 2,
    title: "Barbe et coupe : l'art de l'équilibre",
    slug: "barbe-et-coupe-art-equilibre",
    excerpt: "Comment trouver le parfait équilibre entre votre coupe de cheveux et votre barbe pour un look harmonieux.",
    category: "LE MAG",
    image: mockupImage,
    date: "10 septembre 2025"
  },
  {
    id: 3,
    title: "Pourquoi NEAT est un véritable lieu de vie !",
    slug: "pourquoi-neat-est-un-veritable-lieu-de-vie",
    excerpt: "NEAT n'est pas qu'un simple salon de coiffure, c'est un véritable lieu de vie et d'échange.",
    category: "LE MAG",
    image: mockupImage,
    date: "5 septembre 2025"
  },
  {
    id: 4,
    title: "Qu'est-ce qu'un concept store ?",
    slug: "quest-ce-quun-concept-store",
    excerpt: "Découvrez ce qui fait de NEAT un véritable concept store et pourquoi cela fait toute la différence.",
    category: "LE MAG",
    image: mockupImage,
    date: "28 août 2025"
  },
  {
    id: 5,
    title: "Quel budget pour ses cheveux ?",
    slug: "quel-budget-pour-ses-cheveux",
    excerpt: "Comment déterminer le budget idéal pour prendre soin de vos cheveux et obtenir les meilleurs résultats.",
    category: "LE MAG",
    image: mockupImage,
    date: "20 août 2025"
  },
  {
    id: 6,
    title: "Les coupes de cheveux masculines tendance 2025",
    slug: "coupes-cheveux-masculines-tendance-2025",
    excerpt: "Découvrez les coupes de cheveux qui seront tendance en 2025 et comment les adopter dès maintenant.",
    category: "LE MAG",
    image: mockupImage,
    date: "15 août 2025"
  },
  {
    id: 7,
    title: "Trouver le meilleur barbier sur Paris",
    slug: "trouver-meilleur-barbier-paris",
    excerpt: "Comment choisir le barbier qui saura répondre parfaitement à vos attentes et à vos besoins.",
    category: "LE MAG",
    image: mockupImage,
    date: "10 août 2025"
  },
  {
    id: 8,
    title: "Quelles indications donner au barbier pour obtenir le résultat escompté ?",
    slug: "indications-donner-barbier-resultat-escompte",
    excerpt: "Les conseils pour communiquer efficacement avec votre barbier et obtenir exactement la coupe que vous désirez.",
    category: "LE MAG",
    image: mockupImage,
    date: "5 août 2025"
  },
  {
    id: 9,
    title: "L'importance d'une coupe qui reflète votre personnalité",
    slug: "importance-coupe-reflete-personnalite",
    excerpt: "Pourquoi il est essentiel de choisir une coupe de cheveux qui s'accorde avec votre personnalité et votre style de vie.",
    category: "LE MAG",
    image: mockupImage,
    date: "1 août 2025"
  },
  {
    id: 10,
    title: "De la coupe à la culture : pourquoi NEAT est le nouveau repère des hommes parisiens",
    slug: "coupe-culture-neat-nouveau-repere-hommes-parisiens",
    excerpt: "Comment NEAT est devenu bien plus qu'un simple salon de coiffure pour devenir un véritable repère culturel à Paris.",
    category: "LE MAG",
    image: mockupImage,
    date: "25 juillet 2025"
  }
];

// Fonction pour récupérer tous les articles
export function getAllPosts() {
  return blogPosts;
}

// Fonction pour récupérer un article par son slug
export function getPostBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return blogPosts.find(post => post.slug === slug);
}

// Fonction pour paginer les articles
export function getPaginatedPosts(page: number, postsPerPage: number) {
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const posts = blogPosts.slice(start, end);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
}
