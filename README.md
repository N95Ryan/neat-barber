# 💈 Neat Barber Paris - Website

Professional website for **Neat Barber - Paris** barbershop. <br/>
A modern, fast, and user-friendly platform to showcase the salon, services, and facilitate bookings.

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
- **Contact & Booking** - Via Planity

---

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) v7
- **Package manager**: [Bun](https://bun.sh/)
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

- [Bun](https://bun.sh/) 1.3+

### Installation

```bash
# Clone the project
git clone <repository-url>
cd neat-barber

# Install dependencies
bun install
```

### Available Commands

```bash
# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview
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
bun run test

# Interactive mode with UI
bun run test:ui

# With code coverage
bun run test:coverage
```

### E2E Tests (Playwright)

```bash
# Run end-to-end tests
bun run test:e2e

# Interactive mode with UI
bun run test:e2e:ui
```

### Performance Tests (Lighthouse CI)

```bash
# Run Lighthouse audit
bun run test:lighthouse
```

Tests are automatically executed via GitHub Actions on every push.

---

## 🌐 Deployment

The site is published on Vercel.

---
