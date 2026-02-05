# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page marketing website for a cosmetologist in Barnaul, Russia. Built with React 19 + TypeScript + Vite + Tailwind CSS (via CDN). The site is in Russian and uses framer-motion for animations.

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build

## Architecture

### Configuration-Driven Rendering

The site uses a centralized configuration system in `data/siteConfig.ts`. The main `App.tsx` reads `siteConfig.sections` array and renders sections in order. Each section has:
- `type`: determines which component renders
- `isVisible`: toggle section on/off
- `style`: controls visibility per breakpoint (`hiddenOnMobile`, `hiddenOnDesktop`), background, padding
- `data`: section-specific content

To add/remove/reorder sections, modify `siteConfig.sections`. Types are defined in `types.ts`.

### Routing

Client-side "routing" via React state (`currentPage` in App.tsx), not a router library. Four pages:
- `home` - main landing page built from sections
- `injections` - InjectionCosmetology page
- `esthetic` - EstheticCosmetology page
- `hardware` - HardwareCosmetology page

Navigation uses `onNavigate` prop passed through components.

### Lazy Loading

Heavy components use `React.lazy()`:
- Sub-pages: `InjectionCosmetology`, `EstheticCosmetology`, `HardwareCosmetology`
- Below-fold sections: `BeforeAfter`, `Reviews`, `FAQ`, `Blog`, `Quiz`

### Admin Mode

Access via `#admin` hash in URL. Renders `AdminPanel` component instead of the site.

### Styling

- Tailwind CSS loaded via CDN in `index.html` (not PostCSS build)
- Custom color palette: `sage` (green tones), `charcoal`
- Custom fonts: Montserrat (body), Playfair Display (headings), Alex Brush (decorative)
- Mobile-first with responsive breakpoints

### Contact Information

All contact details centralized in `siteConfig.contacts`. Components reference this for phone, address, social links.

## Key Files

- `App.tsx` - Main app with page routing and section rendering logic
- `data/siteConfig.ts` - Central configuration for all site content and sections
- `types.ts` - TypeScript interfaces for configuration and data structures
- `index.html` - Tailwind config, custom CSS animations, Schema.org markup, font loading
