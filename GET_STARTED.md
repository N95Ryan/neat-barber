# 🎨 Glimy - Guide de Prise en Main

## 📋 Vue d'ensemble du projet

**Glimy** est un template HTML moderne et élégant conçu pour les salons de coiffure et barbiers. Ce template offre une expérience utilisateur exceptionnelle avec des animations fluides, un design responsive et une structure de code bien organisée.

### ✨ Caractéristiques principales

- 🎯 **Design moderne et unique** - Interface épurée et professionnelle
- 📱 **Fully Responsive** - Compatible mobile, tablette et desktop
- ⚡ **Animations fluides** - GSAP, WOW.js et effets CSS avancés
- 🎨 **Bootstrap 5** - Framework CSS robuste et flexible
- 🔧 **Facilement personnalisable** - Code bien structuré et commenté
- 📧 **Formulaire de contact fonctionnel** - Avec validation AJAX
- 🚀 **Performance optimisée** - Chargement rapide et SEO-friendly

## 🗂️ Structure du projet

```
template-glimy/
├── 📁 html/                    # Dossier principal du template
│   ├── 📄 index.html          # Page d'accueil
│   ├── 📄 about.html          # Page À propos
│   ├── 📄 services.html       # Page Services
│   ├── 📄 service-single.html # Page Service individuel
│   ├── 📄 pricing.html        # Page Tarifs
│   ├── 📄 blog.html           # Page Blog
│   ├── 📄 blog-single.html    # Page Article de blog
│   ├── 📄 faq.html            # Page FAQ
│   ├── 📄 contact.html        # Page Contact
│   ├── 📄 404.html            # Page 404
│   ├── 📄 form-process.php    # Traitement formulaire contact
│   ├── 📁 css/                # Styles CSS
│   ├── 📁 js/                 # Scripts JavaScript
│   ├── 📁 images/             # Images et icônes
│   └── 📁 webfonts/           # Polices FontAwesome
└── 📁 documentation/          # Documentation complète
```

## 🚀 Installation et démarrage

### 1. Prérequis

- Serveur web local (XAMPP, WAMP, MAMP) ou hébergement en ligne
- Navigateur web moderne
- Éditeur de code (VS Code, Sublime Text, etc.)

### 2. Installation locale

#### Option A : Serveur local

```bash
# 1. Copiez le dossier html/ dans votre serveur web
# 2. Accédez via : http://localhost/template-glimy/html/

# Avec XAMPP (Windows)
# Placez le dossier dans C:\xampp\htdocs\

# Avec MAMP (Mac)
# Placez le dossier dans /Applications/MAMP/htdocs/
```

#### Option B : Serveur de développement simple

```bash
# Dans le dossier html/
python -m http.server 8000
# Puis accédez à : http://localhost:8000

# Ou avec Node.js
npx serve .
```

### 3. Configuration du formulaire de contact

⚠️ **Important** : Le formulaire de contact nécessite un serveur PHP pour fonctionner.

1. Ouvrez `html/form-process.php`
2. Modifiez la ligne suivante :

```php
$EmailTo = "votre-email@domaine.com"; // Remplacez par votre email
```

## 🎨 Personnalisation

### 1. Couleurs principales

Les couleurs sont définies dans `css/custom.css` :

```css
:root {
  --primary-color: #222222; /* Couleur principale */
  --secondary-color: #f5f5f5; /* Couleur secondaire */
  --text-color: #777777; /* Couleur du texte */
  --accent-font: "Hanken Grotesk"; /* Police d'accent */
  --default-font: "DM Sans"; /* Police par défaut */
}
```

### 2. Logo et branding

- Remplacez `images/logo.svg` par votre logo
- Modifiez le titre dans `<title>` de chaque page HTML
- Ajustez les métadonnées pour le SEO

### 3. Contenu

- **Page d'accueil** : `html/index.html`
- **Services** : Modifiez `html/services.html` et `html/service-single.html`
- **Tarifs** : Personnalisez `html/pricing.html`
- **Blog** : Adaptez `html/blog.html` et `html/blog-single.html`

### 4. Images

- Remplacez les images dans `html/images/`
- Optimisez les images pour le web (format WebP recommandé)
- Respectez les dimensions originales pour maintenir le design

## 🔧 Technologies utilisées

### CSS

- **Bootstrap 5** - Framework CSS responsive
- **FontAwesome** - Icônes vectorielles
- **Animate.css** - Animations CSS
- **Swiper** - Carousel et slider
- **Magnific Popup** - Galeries et popups

### JavaScript

- **jQuery 3.7.1** - Bibliothèque JavaScript
- **GSAP** - Animations avancées
- **WOW.js** - Animations au scroll
- **SlickNav** - Menu mobile responsive
- **CounterUp** - Compteurs animés

### Fonctionnalités avancées

- **Magic Cursor** - Curseur personnalisé
- **Text Animations** - Effets de texte avec SplitType
- **Scroll Triggers** - Animations déclenchées au scroll
- **Smooth Scrolling** - Défilement fluide

## 📱 Responsive Design

Le template est optimisé pour :

- 📱 **Mobile** : 320px - 767px
- 📱 **Tablette** : 768px - 991px
- 💻 **Desktop** : 992px+

### Breakpoints principaux

```css
@media only screen and (max-width: 991px) {
  /* Tablette */
}
@media only screen and (max-width: 767px) {
  /* Mobile */
}
```

## 🎯 Sections principales

### Page d'accueil (`index.html`)

1. **Header** - Navigation et logo
2. **Hero Section** - Section principale avec CTA
3. **Features Ticker** - Bandeau de services défilant
4. **About Us** - Présentation de l'entreprise
5. **Services** - Liste des services
6. **Why Choose Us** - Avantages concurrentiels
7. **Fun Facts** - Statistiques animées
8. **Photo Gallery** - Galerie photos
9. **Pricing** - Tarifs
10. **Testimonials** - Témoignages clients
11. **Latest Posts** - Articles récents
12. **Footer** - Informations de contact

## 🔍 SEO et Performance

### Optimisations incluses

- ✅ Balises meta optimisées
- ✅ Structure HTML sémantique
- ✅ Images avec attributs alt
- ✅ URLs propres et descriptives
- ✅ Schema.org markup (à ajouter)

### Recommandations

1. **Optimisez les images** avec WebP
2. **Ajoutez des données structurées** (Schema.org)
3. **Configurez Google Analytics**
4. **Optimisez la vitesse de chargement**

## 🐛 Dépannage

### Problèmes courants

#### Le formulaire de contact ne fonctionne pas

- ✅ Vérifiez que PHP est activé sur votre serveur
- ✅ Configurez l'email dans `form-process.php`
- ✅ Testez sur un serveur en ligne (pas en local)

#### Les animations ne se déclenchent pas

- ✅ Vérifiez que tous les fichiers JS sont chargés
- ✅ Ouvrez la console pour détecter les erreurs
- ✅ Assurez-vous que GSAP et WOW.js sont bien inclus

#### Problèmes d'affichage mobile

- ✅ Vérifiez les media queries
- ✅ Testez sur différents appareils
- ✅ Utilisez les outils de développement du navigateur

## 📚 Ressources utiles

### Documentation

- 📖 **Documentation complète** : `documentation/index.html`
- 🌐 **Demo en ligne** : https://demo.awaikenthemes.com/html-preview/glimy/

### Support

- 📧 **Email support** : support@awaiken.com
- 🎥 **Tutoriels vidéo** : Disponibles dans la documentation

### Outils recommandés

- 🎨 **Éditeur** : Visual Studio Code
- 🖼️ **Images** : TinyPNG, Squoosh.app
- 🚀 **Performance** : Google PageSpeed Insights
- 📱 **Test responsive** : Responsively App

## 🎉 Prochaines étapes

1. **Explorez la documentation** dans `documentation/index.html`
2. **Personnalisez les couleurs** dans `css/custom.css`
3. **Remplacez le contenu** par vos informations
4. **Testez sur différents appareils**
5. **Optimisez pour le SEO**
6. **Déployez sur votre hébergement**

---

**Bonne chance avec votre projet ! 🚀**

_Template créé par Awaiken - Support : support@awaiken.com_
