# To-Do List - Neat Barber

## 🚨 **PRIORITÉ 1 - Modifications Client**

### ✅ **Bannière "Prendre RDV" fixe**

- [x] Créer un composant `<FixedBookingBanner>` sticky
- [x] Positionner la bannière en `position: fixed` (top ou bottom selon design)
- [x] Assurer la visibilité sur toutes les pages et breakpoints
- [x] Gérer le z-index pour qu'elle reste au-dessus de tout contenu
- [x] Tester le comportement lors du scroll (smooth, pas de flicker)
- [x] S'assurer que le bouton "Prendre RDV" reste centré et accessible

### 📈 **Remonter les avis clients**

- [ ] Identifier l'emplacement actuel de la section avis
- [ ] Déplacer la section avis plus haut dans la structure (idéalement après hero/services)
- [ ] Vérifier que le design s'adapte bien à la nouvelle position
- [ ] Tester l'impact visuel et la cohérence du parcours utilisateur

### ✍️ **Refonte des textes**

- [ ] **Récupérer le contenu existant :**
  - [ ] Extraire les textes du site NEAT 1 (actuel)
  - [ ] Récupérer les descriptions de la fiche Google My Business
- [ ] **Harmoniser le contenu :**
  - [ ] Adapter les textes pour la nouvelle charte graphique
  - [ ] Optimiser pour le SEO (mots-clés pertinents)
  - [ ] Garder le ton premium et professionnel
- [ ] **Pages concernées :**
  - [ ] Page d'accueil (hero, présentation)
  - [ ] Page services/prestations
  - [ ] À propos / équipe
  - [ ] Meta descriptions et titres

### 📝 **Optimisation section prestations**

- [ ] **Réduire l'espace occupé :**
  - [ ] Condenser la présentation (grille plus compacte ?)
  - [ ] Raccourcir les descriptions si nécessaire
  - [ ] Optimiser la typography (taille, line-height)
- [ ] **Améliorer la lisibilité :**
  - [ ] Garder les informations essentielles (nom, prix, durée)
  - [ ] Utiliser des icônes ou visuels pour gagner de l'espace
  - [ ] Tester sur mobile (responsive)

---

## 🔧 **TÂCHES TECHNIQUES - Astro**

### 🏗️ **Structure & Components**

- [x] Créer le composant `<FixedBookingBanner>`
- [ ] Refactoriser le composant `<Reviews>` pour la nouvelle position
- [ ] Optimiser le composant `<Services>` pour l'affichage compact
- [ ] Créer/adapter les layouts Astro pour la nouvelle structure

### 🎨 **CSS & Responsive**

- [x] Styles pour la bannière fixe (desktop + mobile)
- [ ] Adapter le CSS de la section avis pour sa nouvelle position
- [ ] Optimiser les styles de la section prestations (compact)
- [ ] Tester le responsive sur tous les breakpoints
- [ ] Vérifier que la bannière fixe n'interfère pas avec le contenu

### ⚡ **Performance & SEO**

- [ ] Vérifier que les modifications n'impactent pas les performances
- [ ] Mettre à jour les meta-descriptions avec les nouveaux textes
- [ ] Tester les Core Web Vitals après modifications
- [ ] Optimiser le chargement de la bannière fixe (éviter le CLS)

---

## 📋 **VALIDATION & TESTS**

### 🖥️ **Tests Cross-Browser**

- [ ] Tester la bannière fixe sur Chrome, Firefox, Safari
- [ ] Vérifier le comportement sur iOS/Android
- [ ] Valider l'affichage sur différentes tailles d'écran

### 👤 **Tests Utilisateur**

- [ ] Parcours complet : navigation avec bannière fixe
- [ ] Tester la prise de RDV via Planity depuis la bannière
- [ ] Vérifier la lisibilité des nouvelles prestations
- [ ] Validation client sur les textes modifiés

### 🚀 **Mise en ligne**

- [ ] Backup du site actuel
- [ ] Déploiement des modifications
- [ ] Tests post-déploiement
- [ ] Suivi analytics (impact sur conversions)

## 📊 **DOCUMENTATION & AUDIT**

### 📝 **Documentation**

- [ ] Mettre à jour la documentation technique avec les nouveaux composants
- [ ] Documenter la structure modifiée du site
- [ ] Créer un guide pour les futures mises à jour de contenu

### 🔍 **Audit de code**

- [ ] Vérifier la qualité du code (linting)
- [ ] Optimiser les performances (lazy loading, minification)
- [ ] Audit d'accessibilité (WCAG)
- [ ] Vérifier la sécurité des formulaires et intégrations

### 📱 **Optimisations mobiles**

- [ ] Tester la vitesse de chargement sur réseaux mobiles
- [ ] Optimiser les images pour le mobile
- [ ] Vérifier l'expérience utilisateur sur petits écrans
- [ ] Tester les interactions tactiles (boutons, menus)
