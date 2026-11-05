# Shreyas M Chanabasannavar — Portfolio

Interactive 3D creative developer portfolio, live at: https://shreyas-m.is-a.dev

## Overview
High-performance motion and WebGL-driven personal portfolio engineered with Three.js shaders, DOM-mirrored 3D typography, smooth inertial drag physics, shared-element transition flights, and Nuxt 3 hydration architecture.

## Tech Stack
- **Rendering & Shaders**: Three.js, WebGL 2.0, Custom GLSL Vertex & Fragment Shaders, Basis Universal KTX2 / WASM texture pipeline
- **Framework & Router**: Nuxt 3, Vue 3 Composition API, Static SSR Hydration
- **Animation & Physics**: Custom inertial delta momentum controller, GSAP eases, responsive WebGL typography rasterization
- **Styling**: Tailwind utility baseline, custom CSS fluid typography clamp system

## Features
- **Interactive 3D Carousel**: Drag, wheel, and touch-driven momentum track with dynamic tilt perspective and card magnification.
- **Shared-Element Flight Transitions**: Smooth expansion flight transitions from card preview to full case study view.
- **Dynamic Profile & Newsletter Drawers**: Circular viewport-masked modal portals with live clipboard copy and social links.
- **Dual View Modes**: Seamless toggle between Featured WebGL card stream and Full index.

## Running Locally
To test the site locally:
```bash
python -m http.server 7000
# or
node tools/serve.mjs
```
Then visit `http://localhost:7000` in your browser.
