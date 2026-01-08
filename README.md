# 💈 Neat Barber Paris - Website

Professional website for **Neat Barber - Paris** barbershop. A modern, fast, and user-friendly platform to showcase the salon, services, and facilitate bookings.

---

## 📋 Overview

### 🎯 Objective

Create an attractive online presence that:

- Showcases the salon and its services
- Improves online visibility (SEO)
- Facilitates bookings via Planity
- Builds customer trust

### ✨ Key Features

- **Modern Design** - Elegant and professional
- **Fast Loading** - Optimized for a great user experience
- **Mobile Responsive** - Works perfectly on all devices
- **Photo Gallery** - Showcase of the salon's work
- **Integrated Blog** - Share tips and news
- **Online Booking** - Planity integration for appointments

---

## 📝 Site Sections

- **Home** - Salon presentation with visuals
- **Services** - Catalog of services and pricing
- **Gallery** - Photos of achievements
- **Blog** - Articles and tips
- **Client Reviews** - Testimonials and ratings
- **Gift Cards** - Available offers
- **Contact & Booking** - Via Planity

---

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) v5.12
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3.4 + Typography plugin
- **Language**: TypeScript
- **Images**: [Cloudinary](https://cloudinary.com/)
- **Blog**: WordPress Headless CMS (GraphQL)
- **Tests**: Vitest (unit) + Playwright (E2E) + Lighthouse CI (performance)
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

---

## 🚀 Installation & Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the project
git clone <repository-url>
cd neat-barber

# Install dependencies
npm install
# or
yarn install
```

### Available Commands

```bash
# Start development server
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build

# Preview production build
npm run preview
# or
yarn preview
```

---

## 📁 Project Structure

```
neat-barber/
├── public/              # Static files (images, custom CSS)
│   ├── css/
│   └── images/
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── Index/       # Homepage components
│   │   └── Le Mag/      # Blog components
│   ├── data/            # Static data (images, config)
│   ├── layouts/         # Astro layouts
│   ├── lib/             # Utilities and API
│   │   ├── api/         # External integrations (Cloudinary)
│   │   └── utils/       # Helper functions
│   ├── pages/           # Site pages (Astro routing)
│   │   ├── le-mag/      # Blog with pagination
│   │   ├── index.astro  # Homepage
│   │   ├── booking.astro
│   │   └── 404.astro
│   ├── styles/          # Global styles and overrides
│   └── types/           # TypeScript types
├── tests/
│   └── e2e/             # End-to-end Playwright tests
├── .github/
│   └── workflows/       # CI/CD (tests, Lighthouse)
└── ...config files
```

---

## 🧪 Tests

The project uses three levels of testing:

### Unit Tests (Vitest)

```bash
# Run unit tests
npm run test
# or
yarn test

# Interactive mode with UI
npm run test:ui
# or
yarn test:ui

# With code coverage
npm run test:coverage
# or
yarn test:coverage
```

### E2E Tests (Playwright)

```bash
# Run end-to-end tests
npm run test:e2e
# or
yarn test:e2e

# Interactive mode with UI
npm run test:e2e:ui
# or
yarn test:e2e:ui
```

### Performance Tests (Lighthouse CI)

```bash
# Run Lighthouse audit
npm run test:lighthouse
# or
yarn test:lighthouse
```

Tests are automatically executed via GitHub Actions on every push.

---

## 🌐 Deployment

The site is published on Vercel.

---
