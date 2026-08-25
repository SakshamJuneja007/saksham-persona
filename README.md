# Persona-Inspired Developer Portfolio

> An immersive, cinematic developer portfolio built with React — combining modern web development with a Persona-inspired interactive interface.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square\&logo=react\&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square\&logo=vite\&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square\&logo=javascript\&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-FF0055?style=flat-square\&logo=framer\&logoColor=white)](https://motion.dev/)

---

## Overview

This project is a personal developer portfolio designed around an **interactive, game-inspired experience** rather than a conventional portfolio layout.

The interface combines:

* Cinematic background environments
* Custom animated UI
* Keyboard-driven navigation
* Interactive project presentation
* Persistent audio
* Responsive layouts
* Custom visual assets
* Social and contact interfaces

The objective is to make the portfolio feel less like a collection of static pages and more like an **interactive digital environment**.

---

## Features

### Interactive Navigation

The portfolio supports both mouse and keyboard interaction.

* Arrow-key navigation
* Context-sensitive controls
* Enter-to-select interactions
* Escape-to-return navigation
* Animated transitions between sections
* Focus-based UI navigation

### Cinematic Visual System

The interface uses video backgrounds and animated overlays to create a consistent visual atmosphere across the portfolio.

Background videos are externally hosted rather than bundled with the application, significantly reducing the deployment footprint.

### Persistent Music Player

A global music player allows audio to continue across route changes without creating multiple simultaneous audio instances.

Features include:

* Play / pause
* Persistent playback
* Progress tracking
* Custom player interface
* Route-independent audio state

### Project Showcase

Projects are presented as interactive experiences rather than simple cards.

Each project can contain:

* Project description
* Technologies used
* Visual media
* External links
* GitHub repositories
* Interactive navigation

### Social Interface

The social section provides direct access to:

* LinkedIn
* GitHub
* Instagram
* Email

The interface follows the same visual system as the rest of the portfolio.

### Responsive Design

The UI adapts to different screen sizes while preserving the overall visual language.

Responsive behavior includes:

* Desktop layouts
* Tablet layouts
* Mobile layouts
* Scaled typography
* Adaptive navigation
* Mobile-specific UI adjustments

---

## Technology Stack

| Technology           | Purpose                       |
| -------------------- | ----------------------------- |
| **React**            | UI architecture               |
| **Vite**             | Development and build tooling |
| **React Router**     | Client-side routing           |
| **Framer Motion**    | Animations and transitions    |
| **JavaScript / JSX** | Application logic             |
| **CSS**              | Layout and visual system      |
| **HTML5 Video**      | Cinematic backgrounds         |
| **Web Fonts**        | Custom typography             |

---

## Architecture

The application is structured around reusable React components and route-based pages.

```text
src/
│
├── assets/
│   ├── images/
│   ├── characters/
│   ├── icons/
│   └── ...
│
├── components/
│   ├── MusicPlayer.jsx
│   ├── Navigation.jsx
│   └── ...
│
├── pages/
│   ├── Home.jsx
│   ├── Socials.jsx
│   ├── Projects.jsx
│   └── ...
│
├── App.jsx
├── main.jsx
└── index.css
```

Components are kept modular so that individual UI systems can be modified without affecting the rest of the application.

---

# Performance & Media Strategy

Because cinematic video is a significant part of the design, media optimization is treated separately from the application bundle.

## Video Hosting

Large background videos are hosted externally and loaded through direct `.mp4` URLs.

```jsx
const BG_VIDEO_URL =
  "https://example.com/video.mp4";

<video
  src={BG_VIDEO_URL}
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
/>
```

This prevents large video assets from unnecessarily increasing the size of the deployment.

### Video Guidelines

Current background videos are optimized around the following targets:

* **Format:** MP4
* **Codec:** H.264
* **Resolution:** 1080p where appropriate
* **Frame rate:** ~30 FPS
* **Audio:** Removed from silent background videos
* **CRF:** ~18–21
* **Delivery:** External CDN/video hosting

The priority is maintaining visual quality while keeping loading and bandwidth requirements reasonable.

---

## Image Strategy

Unlike the background videos, most images remain inside the application because their file sizes are substantially smaller.

Preferred formats:

* **WebP** for general images
* **AVIF** when maximum compression is useful
* **PNG** when transparency is required
* **JPG** for photographic content

Large images should be optimized before being added to the repository.

---

# Installation

## Prerequisites

Make sure you have:

* Node.js
* npm
* Git

Check your versions:

```bash
node --version
npm --version
```

---

## Setup

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

Navigate to the project:

```bash
cd persona3-website
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available at the local development URL provided by Vite.

---

# Production Build

Generate an optimized production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

The resulting `dist` directory can be deployed to a compatible static hosting platform.

---

# Deployment

The application is designed to work with modern static hosting platforms such as:

* Vercel
* Netlify
* Cloudflare Pages

Large background videos are intentionally kept outside the deployment bundle.

This allows the application itself to remain lightweight while still supporting high-quality cinematic media.

---

# Interaction

The portfolio supports keyboard navigation throughout its interactive interfaces.

| Input   | Action                   |
| ------- | ------------------------ |
| `↑`     | Previous item            |
| `↓`     | Next item                |
| `←`     | Previous section / focus |
| `→`     | Details / next focus     |
| `Enter` | Select / open            |
| `Esc`   | Return                   |

Mouse interaction is also supported throughout the interface.

---

# Design System

The visual direction is built around a consistent set of principles:

### Typography

Large condensed typography is used to create strong visual hierarchy and emulate the feel of game interfaces.

### Geometry

Angular shapes, clipped panels, offsets, shadows, and asymmetric layouts form the primary UI language.

### Motion

Animations are intentionally short and responsive, with emphasis on:

* Slide transitions
* Scale transitions
* Directional movement
* Staggered entrances
* Focus feedback

### Color

The interface primarily uses:

* Deep blacks
* Dark blues
* White
* High-contrast accent colors
* Section-specific highlights

---

# Development Philosophy

The project focuses on three principles:

### 01 — Experience

A portfolio should communicate personality rather than simply list technical skills.

### 02 — Performance

Visual complexity should not require unnecessarily large deployments.

### 03 — Interaction

Navigation and presentation should feel intentional rather than behaving like a collection of disconnected pages.

---

# Roadmap

Potential future improvements include:

* [ ] Further mobile optimization
* [ ] Improved video loading strategy
* [ ] Adaptive video quality
* [ ] Accessibility improvements
* [ ] Reduced-motion support
* [ ] Additional interactive portfolio sections
* [ ] More advanced page transitions
* [ ] Performance monitoring
* [ ] Progressive media loading

---

# Credits & Inspiration

The visual direction is heavily inspired by the interface design and atmosphere of the **Persona** series, particularly *Persona 3*.

The implementation, portfolio content, application architecture, and original UI composition are independently developed for this project.

---

# Disclaimer

This is an independent fan-inspired project and is **not affiliated with, sponsored by, or endorsed by Atlus or SEGA**.

Persona, Persona 3, associated characters, music, artwork, and trademarks remain the property of their respective owners.

---

# Author

## Saksham Juneja

**AI/ML Developer · Software Developer**

Interested in:

* Artificial Intelligence
* Machine Learning
* Generative AI
* Computer Vision
* Full-Stack Development
* Interactive Web Experiences

### Connect

**LinkedIn**
https://www.linkedin.com/in/sakshamjuneja007/

**GitHub**
https://github.com/SakshamJuneja007/

**Instagram**
https://www.instagram.com/saksham_juneja007/

**Email**
[saksham.juneja007@gmail.com](mailto:saksham.juneja007@gmail.com)

---

## License

This project is intended primarily as a personal portfolio and learning project.

If you plan to reuse project assets, artwork, music, or other third-party materials, verify their respective licenses and permissions before redistribution.

---

<p align="center">
  Built with React · Designed with intention · Inspired by Persona
</p>
