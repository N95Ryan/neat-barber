# Neat Barber Paris - Site Web

Site web moderne pour le salon de coiffure Neat Barber Paris, développé avec **Astro** et **Tailwind CSS**.

## 🚀 Structure du Projet

```text
/
├── public/
│   ├── css/          # Styles Bootstrap + Personnalisés
│   ├── js/           # Scripts JavaScript (jQuery, GSAP, etc.)
│   └── images/       # Images et assets
├── src/
│   ├── components/   # Composants réutilisables
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── About.astro
│   │   ├── Services.astro
│   │   └── SliderServices.astro
│   ├── sections/     # Sections de page
│   │   ├── About.astro
│   │   ├── ProServices.astro
│   │   ├── WhyChooseUs.astro
│   │   └── SliderServices.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

## 🧞 Commandes

Toutes les commandes sont exécutées depuis la racine du projet :

| Commande            | Action                                                 |
| :------------------ | :----------------------------------------------------- |
| `npm install`       | Installe les dépendances                               |
| `npm run dev`       | Lance le serveur de développement sur `localhost:4321` |
| `npm run build`     | Construit le site pour la production dans `./dist/`    |
| `npm run preview`   | Prévisualise le build localement avant le déploiement  |
| `npm run astro ...` | Exécute les commandes CLI Astro                        |

## 🎨 Fonctionnalités Implémentées

### ✅ Design et Interface

- **Design moderne et responsive** avec Bootstrap 5
- **Animations fluides** avec GSAP et WOW.js
- **Curseur magique personnalisé** avec MagicCursor
- **Sliders interactifs** avec Swiper.js
- **Effets de parallaxe** et scroll smooth
- **Preloader animé** au chargement

### ✅ Technologies Utilisées

#### Framework Principal

- **Astro 5.12.0** - Framework web moderne pour des sites statiques performants
- **Tailwind CSS 3.4.17** - Framework CSS utilitaire avec animations personnalisées

#### CSS & Styling

- **Bootstrap 5** - Framework CSS responsive
- **Animate.css** - Bibliothèque d'animations CSS
- **Font Awesome** - Icônes vectorielles
- **Google Fonts** - Polices web (DM Sans, Hanken Grotesk)

#### JavaScript & Interactions

- **jQuery 3.7.1** - Bibliothèque JavaScript
- **GSAP** - Animations avancées
- **Swiper.js** - Carousels et sliders
- **WOW.js** - Animations au scroll
- **MagicCursor** - Curseur personnalisé
- **SmoothScroll** - Défilement fluide

### ✅ Sections Implémentées

#### Page d'Accueil

- **Hero Section** - Section d'accueil avec titre et image
- **Slider Services** - Carousel des services proposés
- **About Section** - Présentation du salon
- **Pro Services** - Services détaillés
- **Why Choose Us** - Avantages concurrentiels

#### Composants

- **Header** - Navigation responsive avec menu mobile
- **Footer** - Informations de contact et liens
- **Layout** - Structure globale avec preloader et scripts

### ✅ Optimisations

#### Performance

- **Images optimisées** pour le web
- **CSS et JS minifiés** (Bootstrap, jQuery, etc.)
- **Chargement asynchrone** des scripts
- **Preloader** pour une meilleure UX

#### SEO & Accessibilité

- **Balises meta** optimisées
- **Structure sémantique** correcte
- **Images avec alt** pour l'accessibilité
- **Navigation au clavier** possible

## 📝 Configuration

### Dépendances Principales

```json
{
  "astro": "^5.12.0",
  "@astrojs/tailwind": "^6.0.2",
  "@tailwindcss/typography": "^0.5.16",
  "tailwindcss": "^3.4.17"
}
```

### Configuration Tailwind

- Animations personnalisées (fade-in, scroll, etc.)
- Plugin typography pour un meilleur rendu du texte
- Configuration responsive complète

## 🚀 Déploiement

Le site est prêt pour le déploiement sur n'importe quel hébergeur statique :

- **Netlify**
- **Vercel**
- **GitHub Pages**
- **Hébergement traditionnel**

## 📊 État du Projet

### ✅ Terminé

- [x] Structure Astro configurée
- [x] Page d'accueil complète
- [x] Composants réutilisables
- [x] Design responsive
- [x] Animations et interactions
- [x] Optimisations de performance

### 🔄 En cours

- [ ] Pages secondaires (À propos, Services, Contact)
- [ ] Formulaire de contact fonctionnel
- [ ] Intégration Planity pour réservations
- [ ] Tests utilisateurs complets

---

**🎯 Projet en développement actif - Version 0.0.1**
