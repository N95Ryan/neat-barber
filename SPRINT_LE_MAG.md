# 🚀 Sprint : Finaliser "Le Mag"

## 🎯 Sprint Goal

Connecter la page "Le Mag" à l'API GraphQL WordPress et rendre le tout fonctionnel en production.

**Endpoint GraphQL** : `https://admin.neatparis.fr/graphql`  
**Branche de travail** : `feature/le-mag`  
**Workflow** : `feature/le-mag → sandbox → main`

---

## 📦 Backlog Tickets

### Epic 1 : Infrastructure & Setup

#### ✅ Ticket #1 : Créer la branche feature/le-mag

- **Type** : `chore`
- **Priorité** : 🔴 Critique
- **Description** : Créer la branche de travail depuis `main` ou `sandbox`
- **Estimation** : 2 min

**Acceptance Criteria :**

- [x] Branche `feature/le-mag` créée
- [x] Branche poussée sur le remote

**Commandes** :

```bash
git checkout -b feature/le-mag
git push -u origin feature/le-mag
```

---

#### ✅ Ticket #2 : Créer le client GraphQL

- **Type** : `feat`
- **Priorité** : 🔴 Critique
- **Description** : Créer un utilitaire réutilisable pour interroger l'API WordPress GraphQL
- **Fichier** : `src/lib/graphql.ts` (ou `src/utils/graphql.ts`)
- **Estimation** : 15-20 min

**Acceptance Criteria :**

- [x] Fonction `fetchGraphQL(query, variables)` créée
- [x] Gestion des erreurs HTTP
- [x] Types TypeScript pour les réponses (Post, FeaturedImage, etc.)
- [x] Endpoint configuré via variable d'environnement ou constante

**Exemple de structure attendue** :

```typescript
export async function fetchGraphQL(query: string, variables = {}) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  // Gestion des erreurs...
  return response.json();
}
```

---

#### ✅ Ticket #3 : Définir les types TypeScript

- **Type** : `feat`
- **Priorité** : 🔴 Critique
- **Description** : Créer les interfaces TypeScript pour les données WordPress
- **Fichier** : `src/types/wordpress.ts` (ou dans `graphql.ts`)
- **Estimation** : 10 min

**Acceptance Criteria :**

- [x] Type `Post` avec tous les champs nécessaires (id, title, slug, excerpt, content, date, featuredImage)
- [x] Type `FeaturedImage`
- [x] Type `PostsResponse` pour la pagination

**Exemple** :

```typescript
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}
```

---

### Epic 2 : Pages dynamiques

#### ⬜ Ticket #4 : Intégrer GraphQL dans [slug].astro

- **Type** : `feat`
- **Priorité** : 🔴 Critique
- **Description** : Récupérer un article individuel via son slug et générer les routes statiques
- **Fichier** : `src/pages/le-mag/[slug].astro`
- **Estimation** : 30-40 min

**Acceptance Criteria :**

- [ ] `getStaticPaths()` implémenté avec GraphQL
- [ ] Récupération de l'article par slug
- [ ] Données passées aux composants
- [ ] Gestion du 404 si slug inexistant
- [ ] Meta tags SEO dynamiques (title, description, og:image)

**Requête GraphQL nécessaire** :

```graphql
query GetAllSlugs {
  posts(first: 100) {
    nodes {
      slug
    }
  }
}

query GetPostBySlug($slug: ID!) {
  post(id: $slug, idType: SLUG) {
    id
    title
    slug
    content
    excerpt
    date
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
  }
}
```

---

#### ⬜ Ticket #5 : Intégrer GraphQL dans page/[page].astro

- **Type** : `feat`
- **Priorité** : 🔴 Critique
- **Description** : Récupérer la liste paginée des articles
- **Fichier** : `src/pages/le-mag/page/[page].astro`
- **Estimation** : 30-40 min

**Acceptance Criteria :**

- [ ] `getStaticPaths()` implémenté avec pagination
- [ ] Récupération des articles (ex: 9 par page)
- [ ] Données passées à `BlogCard` et autres composants
- [ ] Navigation pagination fonctionnelle
- [ ] Meta tags SEO

**Requête GraphQL nécessaire** :

```graphql
query GetPaginatedPosts($first: Int!, $after: String) {
  posts(first: $first, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      id
      title
      slug
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
}
```

---

#### ⬜ Ticket #6 : Créer la page d'accueil /le-mag

- **Type** : `feat`
- **Priorité** : 🟠 Haute
- **Description** : Page d'entrée du blog (soit redirection vers `/le-mag/page/1`, soit page custom)
- **Fichier** : `src/pages/le-mag/index.astro`
- **Estimation** : 15-20 min

**Acceptance Criteria :**

- [ ] Page `/le-mag` accessible
- [ ] Affiche les derniers articles ou redirige vers `/le-mag/page/1`
- [ ] Composants `BlogHeader` et `BlogNavbar` intégrés

---

### Epic 3 : Composants & UI

#### ⬜ Ticket #7 : Adapter BlogCard.astro aux données GraphQL

- **Type** : `refactor`
- **Priorité** : 🟠 Haute
- **Description** : S'assurer que le composant reçoit et affiche correctement les props de l'API
- **Fichier** : `src/components/Le Mag/BlogCard.astro`
- **Estimation** : 15 min

**Acceptance Criteria :**

- [ ] Props typées (title, slug, excerpt, featuredImage, date)
- [ ] Gestion du HTML dans excerpt (strip tags ou affichage sécurisé)
- [ ] Image affichée avec alt text
- [ ] Lien vers `/le-mag/[slug]` fonctionnel

---

#### ⬜ Ticket #8 : Adapter LatestPosts.astro

- **Type** : `refactor`
- **Priorité** : 🟡 Moyenne
- **Description** : Composant pour afficher les derniers articles (si utilisé ailleurs que dans la page)
- **Fichier** : `src/components/Le Mag/LatestPosts.astro`
- **Estimation** : 15 min

**Acceptance Criteria :**

- [ ] Fetch GraphQL interne ou props passées
- [ ] Affichage des N derniers articles
- [ ] Utilise `BlogCard` en interne

---

#### ⬜ Ticket #9 : Gérer le contenu HTML des articles

- **Type** : `feat`
- **Priorité** : 🟠 Haute
- **Description** : Sanitiser et afficher proprement le HTML de WordPress (content & excerpt)
- **Fichier** : `[slug].astro` et `BlogCard.astro`
- **Estimation** : 15 min

**Acceptance Criteria :**

- [ ] HTML WordPress affiché correctement (pas d'échappement)
- [ ] Styles Tailwind appliqués au contenu (prose, etc.)
- [ ] Sécurité : utiliser `set:html` avec précaution

**Note** : Utiliser la directive `set:html` d'Astro pour le contenu HTML :

```astro
<div class="prose" set:html={content} />
```

---

### Epic 4 : Optimisations & Assets

#### ⬜ Ticket #10 : Optimiser les images WordPress

- **Type** : `perf`
- **Priorité** : 🟡 Moyenne
- **Description** : Lazy-loading et optimisation des images provenant de admin.neatparis.fr
- **Estimation** : 15 min

**Acceptance Criteria :**

- [ ] Attributs `loading="lazy"` sur les images
- [ ] WebP si possible (via Cloudinary ou autre)
- [ ] Dimensions `width` et `height` définies pour éviter CLS

---

#### ⬜ Ticket #11 : Configuration des variables d'environnement

- **Type** : `chore`
- **Priorité** : 🟠 Haute
- **Description** : Ajouter l'endpoint GraphQL dans `.env` et `.env.example`
- **Fichiers** : `.env`, `.env.example`
- **Estimation** : 5 min

**Acceptance Criteria :**

- [ ] Variable `WORDPRESS_GRAPHQL_ENDPOINT` définie
- [ ] Exemple ajouté dans `.env.example`
- [ ] Documentation dans README si nécessaire

**Exemple** :

```env
WORDPRESS_GRAPHQL_ENDPOINT=https://admin.neatparis.fr/graphql
```

---

### Epic 5 : Tests & QA

#### ⬜ Ticket #12 : Test de l'affichage des 10 articles

- **Type** : `test`
- **Priorité** : 🟠 Haute
- **Description** : Vérifier que les 10 articles WordPress s'affichent correctement
- **Estimation** : 20 min

**Acceptance Criteria :**

- [ ] Build Astro réussi (`npm run build`)
- [ ] Tous les articles accessibles via leur slug
- [ ] Pagination fonctionnelle
- [ ] Images chargées

**Commandes de test** :

```bash
npm run build
npm run preview
```

---

#### ⬜ Ticket #13 : Test SEO et meta tags

- **Type** : `test`
- **Priorité** : 🟡 Moyenne
- **Description** : Vérifier que les meta tags sont correctement générés depuis GraphQL
- **Estimation** : 15 min

**Acceptance Criteria :**

- [ ] `<title>` dynamique par article
- [ ] Meta description générée depuis excerpt
- [ ] Open Graph image (og:image) depuis featuredImage
- [ ] Test avec Lighthouse ou outils SEO

---

#### ⬜ Ticket #14 : Test de performance Lighthouse

- **Type** : `test`
- **Priorité** : 🟡 Moyenne
- **Description** : Vérifier les scores de performance sur les pages "Le Mag"
- **Estimation** : 10 min

**Acceptance Criteria :**

- [ ] Score Performance > 90
- [ ] Score Accessibility > 90
- [ ] Score SEO > 90
- [ ] Pas de CLS majeur

---

#### ⬜ Ticket #15 : Gestion des erreurs et cas limites

- **Type** : `fix`
- **Priorité** : 🟡 Moyenne
- **Description** : Tester les cas d'erreur (API down, slug invalide, etc.)
- **Estimation** : 15 min

**Acceptance Criteria :**

- [ ] Page 404 si slug inexistant
- [ ] Message d'erreur si API GraphQL inaccessible
- [ ] Fallback gracieux (image par défaut, etc.)

---

### Epic 6 : Finalisation & Merge

#### ⬜ Ticket #16 : Documentation

- **Type** : `docs`
- **Priorité** : 🟢 Basse
- **Description** : Documenter l'intégration GraphQL dans le README
- **Fichier** : `README.md`
- **Estimation** : 10 min

**Acceptance Criteria :**

- [ ] Section "Le Mag" ajoutée
- [ ] Endpoint GraphQL documenté
- [ ] Instructions pour ajouter/modifier des articles

---

#### ⬜ Ticket #17 : Merge dans sandbox

- **Type** : `chore`
- **Priorité** : 🔴 Critique
- **Description** : Merger `feature/le-mag` dans `sandbox` pour tests en pré-prod
- **Estimation** : 10 min

**Acceptance Criteria :**

- [ ] PR créée et reviewée
- [ ] Tests passés sur sandbox
- [ ] Pas de régression sur les autres pages

**Commandes** :

```bash
git checkout sandbox
git merge feature/le-mag
git push origin sandbox
```

---

#### ⬜ Ticket #18 : Merge dans main

- **Type** : `chore`
- **Priorité** : 🔴 Critique
- **Description** : Merger `sandbox` dans `main` et déployer en production
- **Estimation** : 10 min

**Acceptance Criteria :**

- [ ] PR créée et reviewée
- [ ] Déploiement production OK
- [ ] Monitoring post-déploiement (pas d'erreurs)

**Commandes** :

```bash
git checkout main
git merge sandbox
git push origin main
```

---

## 📊 Statistiques

### Par priorité

- **🔴 Critique** : 5 tickets (~3h)
- **🟠 Haute** : 5 tickets (~2h)
- **🟡 Moyenne** : 6 tickets (~1h30)
- **🟢 Basse** : 1 ticket (~10 min)

### Par type

- **feat** : 6 tickets
- **refactor** : 2 tickets
- **test** : 4 tickets
- **chore** : 4 tickets
- **perf** : 1 ticket
- **docs** : 1 ticket

### Estimation totale

**~5h30** (pour un dev focus)

---

## 🎯 Ordre d'exécution recommandé

1. **Phase 1 - Setup** (Tickets #1-3) → ~30 min
2. **Phase 2 - Pages dynamiques** (Tickets #4-6) → ~1h30
3. **Phase 3 - Composants** (Tickets #7-9) → ~45 min
4. **Phase 4 - Config** (Ticket #11) → ~5 min
5. **Phase 5 - Optimisations & Tests** (Tickets #10, #12-15) → ~1h15
6. **Phase 6 - Finalisation** (Tickets #16-18) → ~30 min

---

## 📝 Notes importantes

- **Endpoint GraphQL** : `https://admin.neatparis.fr/graphql`
- **10 articles disponibles** avec toutes les métadonnées
- **Wordfence configuré** pour autoriser `/graphql`
- **Images hébergées** sur `admin.neatparis.fr/wp-content/uploads/`

---

## ✅ Progression

- [x] Epic 1 : Infrastructure & Setup (3/3)
- [ ] Epic 2 : Pages dynamiques (0/3)
- [ ] Epic 3 : Composants & UI (0/3)
- [ ] Epic 4 : Optimisations & Assets (0/2)
- [ ] Epic 5 : Tests & QA (0/4)
- [ ] Epic 6 : Finalisation & Merge (0/3)

**Total : 3/18 tickets complétés**

---

🚀 **Prêt à démarrer le sprint !**
