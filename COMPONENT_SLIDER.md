# Composant Slider - Carrousel de Services

## Description

Le composant `Slider.astro` est un carrousel animé qui affiche les services proposés par le salon de coiffure. Il utilise Tailwind CSS pour le styling et les animations.

## Fonctionnalités

- ✅ Défilement automatique et continu
- ✅ Animation fluide avec CSS
- ✅ Pause au survol de la souris
- ✅ Responsive design
- ✅ Personnalisable (services, vitesse, styles)
- ✅ Réutilisable dans tout le projet

## Utilisation

### Import du composant

```astro
---
import Slider from "../components/Slider.astro";
---
```

### Utilisation basique (services par défaut)

```astro
<Slider />
```

### Utilisation avec services personnalisés

```astro
---
const customServices = [
  { name: "Coupe Homme", icon: "/images/ticker-icon.svg" },
  { name: "Coupe Femme", icon: "/images/ticker-icon.svg" },
  { name: "Coloration", icon: "/images/ticker-icon.svg" },
  // ... autres services
];
---

<Slider services={customServices} />
```

### Utilisation avec toutes les options

```astro
<Slider
  services={customServices}
  speed={25}
  className="bg-blue-50"
/>
```

## Props

| Prop        | Type        | Défaut              | Description                       |
| ----------- | ----------- | ------------------- | --------------------------------- |
| `services`  | `Service[]` | Services par défaut | Liste des services à afficher     |
| `speed`     | `number`    | `30`                | Vitesse de défilement en secondes |
| `className` | `string`    | `""`                | Classes CSS supplémentaires       |

## Interface Service

```typescript
interface Service {
  name: string; // Nom du service
  icon: string; // Chemin vers l'icône
}
```

## Services par défaut

Le composant inclut une liste de services par défaut :

- Hair Cut
- Hair Dryer
- Hair Style
- Hair Coloring
- Shaving
- Organic Facial
- Eyebrow Shaping
- Natural Color
- Eyelash Tinting
- Hair Highter

## Styles et Animations

### Classes Tailwind utilisées

- `bg-gray-50` : Fond gris clair
- `py-8` : Padding vertical
- `overflow-hidden` : Cache le débordement
- `container mx-auto px-4` : Conteneur centré avec padding
- `flex items-center` : Flexbox centré verticalement
- `space-x-8` : Espacement horizontal entre éléments
- `whitespace-nowrap` : Empêche le retour à la ligne
- `text-gray-700 font-medium text-lg` : Style du texte

### Animation personnalisée

L'animation `scroll` est définie dans `tailwind.config.js` :

```javascript
keyframes: {
  scroll: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  }
}
```

## Responsive

Le composant s'adapte automatiquement aux écrans mobiles :

- Taille de police réduite sur mobile
- Espacement ajusté
- Animation maintenue

## Exemples d'utilisation

### Exemple 1 : Services de coiffure française

```astro
---
const servicesCoiffure = [
  { name: "Coupe Moderne", icon: "/images/ticker-icon.svg" },
  { name: "Coloration", icon: "/images/ticker-icon.svg" },
  { name: "Mèches", icon: "/images/ticker-icon.svg" },
  { name: "Lissage", icon: "/images/ticker-icon.svg" },
  { name: "Permanente", icon: "/images/ticker-icon.svg" },
  { name: "Soins", icon: "/images/ticker-icon.svg" }
];
---

<Slider services={servicesCoiffure} speed={20} />
```

### Exemple 2 : Services pour hommes

```astro
---
const servicesHomme = [
  { name: "Coupe Homme", icon: "/images/ticker-icon.svg" },
  { name: "Barbe", icon: "/images/ticker-icon.svg" },
  { name: "Rasage", icon: "/images/ticker-icon.svg" },
  { name: "Soins Visage", icon: "/images/ticker-icon.svg" }
];
---

<Slider services={servicesHomme} className="bg-blue-100" />
```

## Personnalisation

### Changer la vitesse

```astro
<Slider speed={15} /> <!-- Plus rapide -->
<Slider speed={45} /> <!-- Plus lent -->
```

### Ajouter des styles personnalisés

```astro
<Slider className="bg-gradient-to-r from-blue-50 to-purple-50 border-t border-b" />
```

### Combiner plusieurs sliders

```astro
<Slider services={servicesCoiffure} />
<Slider services={servicesHomme} speed={25} className="bg-gray-100" />
<Slider services={servicesSpeciaux} speed={35} className="bg-yellow-50" />
```

## Dependencies

- Astro
- Tailwind CSS
- @tailwindcss/typography (optionnel)

## Installation

Le composant nécessite Tailwind CSS. Assurez-vous que les dépendances sont installées :

```bash
npm install -D tailwindcss @astrojs/tailwind @tailwindcss/typography
```

Et que le fichier `src/styles/global.css` contient :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
