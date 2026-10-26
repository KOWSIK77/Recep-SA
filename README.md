# Sasikumar & Adithya — Wedding Reception Website

A regal, animation-rich, mobile-first single-page wedding reception website built with **Next.js (App Router)**, **Tailwind CSS**, **GSAP (ScrollTrigger)**, and **Spline 3D** with an elegant South Indian traditional gold lotus/brass lamp SVG fallback.

---

## 🏛️ Aesthetic & Design Direction

- **Theme**: Regal South Indian Traditional meets modern editorial.
- **Palette**: Deep Maroon (`#5B1020`), Ivory Cream (`#FBF3E4`), Temple Gold (`#C9A24B`, with `#E6C980` glows), Turmeric (`#E8A317`), Leaf Green (`#2F5D3A`), and Ink Brown (`#2A1A14`).
- **Typography**: Cormorant Garamond (display/names), Great Vibes (monogram/accents), Montserrat (body/UI).
- **Motifs**: South Indian temple gopuram silhouettes, brass deepam / kuthuvilakku with flickering flame, hanging jasmine garlands (poomalai), mango-leaf toranam, kolam geometric line-art dividers.

---

## 🗂️ Sections Structure

0. **Cinematic Intro Sequence (`#intro`, `IntroSequence.tsx`)**:
   - Uses an HTML5 GPU-accelerated `<canvas>` rendering 288 frames from `public/Hero/`.
   - **Phase 1 (Video Playback)**: When the guest taps "Tap to Enter", frames `ezgif-frame-001.jpg` through `097.jpg` play smoothly like a video at ~28–30 fps.
   - **Phase 2 (Scroll Animation)**: Pauses at frame `098.jpg` prompting "Scroll to Unfold", scrubbing frames `098.jpg` to `288.jpg` pinned to the screen via GSAP ScrollTrigger.
   - **Phone & Mobile Optimized**: Dynamically calculates `object-fit: cover` aspect ratio math so the canvas fills any device screen (portrait smartphone, tablet, desktop) without letterboxing or stretching.
   - **Tiered Preloader & Skip**: Preloads Tier 1 (1–97) first for instant playback, then streams Tier 2 (98–288) in the background. Includes a discreet "Skip Intro" option.
1. **Navigation (`#nav`)**: Translucent glassmorphism bar with monogram, active scroll-spy indicator with sliding gold underline, mobile full-screen drawer with body scroll-lock, and top reading progress bar. Slides into view as user enters the main site.
2. **Hero (`#home`)**: Gopuram silhouette, swaying jasmine strings & toranam, drifting gold dust particles, split-letter reveal for Sasikumar & Adithya, date/time/city pill, romantic quote, View Venue & Add to Calendar CTAs, and Spline 3D centerpiece.
3. **Countdown (`#countdown`)**: Live 4-tile timer (Days, Hours, Minutes, Seconds) with tabular numerals and three dynamic states:
   - *Before*: Live countdown ticking to 1 Nov 2026, 6:00 PM IST.
   - *During* (6:00 PM – 9:30 PM): "The celebration is happening now. Join us!" with a pulsing gold live indicator.
   - *After*: "Thank you for celebrating with us."
4. **Celebrate / Invitation Note (`#celebrate`)**: Sacred blessing verse, family tribute, ornate gold lotus and kolam dividers with staggered scroll reveals.
5. **Meet the Couple (`#couple`)**: Arched temple-window photo cards for Sasikumar and Adithya, personal bios, connecting gold lotus crest, with initial-letter fallback handling.
6. **Reception Details (`#details`)**: Traditional gold-bordered invitation card, Date/Time/Venue icon tiles, and Evening Flow vertical timeline (6:00 PM – 9:30 PM).
7. **Venue & Map (`#venue`)**: Sree Velavar Mandapam details, responsive Google Map embed with error card fallback, "Open in Google Maps", "Get Directions", and "Copy Address" with toast feedback.
8. **Footer (`#footer`)**: Deep maroon backdrop with gopuram silhouette, large script thank-you message, monogram, quick links, and WhatsApp share button.

---

## 🚀 Quick Setup & Local Development

### 1. Prerequisites
- Node.js `v18.17+` or `v20+` (tested on Node v24).
- npm `v9+` or `v10+`.

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## ⚙️ How to Edit Content (`lib/config.ts`)

All editable content is centralized in `lib/config.ts`. You do not need to hunt through component files.

```typescript
// lib/config.ts
export const siteConfig = {
  couple: {
    groom: 'Sasikumar',
    bride: 'Adithya',
    monogram: 'S & A',
    groomBio: 'The groom. Calm, kind-hearted and always the first to laugh.',
    brideBio: 'The bride. Graceful, warm and the heart of every room.',
    groomPhoto: '/assets/groom.jpg',
    bridePhoto: '/assets/bride.jpg',
  },
  event: {
    title: 'Sasikumar & Adithya Wedding Reception',
    dateFormatted: 'Sunday, 1 November 2026',
    timeFormatted: '6:00 PM to 9:30 PM (IST, UTC+05:30)',
    city: 'Dharapuram, Tamil Nadu',
    targetIso: '2026-11-01T18:00:00+05:30',
    endIso: '2026-11-01T21:30:00+05:30',
    hosts: "Groom's parents & Bride's parents", // Edit family names here
    ...
  },
  venue: {
    name: 'Sree Velavar Mandapam',
    fullAddress: 'Sree Velavar Mandapam, Pollachi Main Road, Dharapuram, Tamil Nadu 638656',
    googleMapsUrl: 'https://maps.app.goo.gl/qnZ19PVvL13PUDCz6',
    embedUrl: 'https://www.google.com/maps?q=Sree+Velavar+Mandapam+Dharapuram&output=embed',
  },
  timeline: [
    { time: '6:00 PM', title: 'Guests Arrive & Welcome', description: '...' },
    { time: '6:30 PM', title: 'Couple on Stage & Blessings', description: '...' },
    ...
  ],
};
```

---

## 🎨 How to Add or Customize the Spline 3D Scene

The hero section features a dedicated 3D slot that loads lazily when idle. If no 3D scene is provided, or on mobile/reduced-motion devices, it automatically renders an inline SVG golden lotus and brass lamp with floating GSAP animation.

### Scene Brief for Spline:
1. One slowly floating gold object (e.g. brass deepam, sacred lotus, or "S & A" monogram).
2. Warm directional lighting, soft ambient glow, subtle idle rotation.
3. Maroon (`#5B1020`) or transparent background.
4. Export the public URL from Spline (e.g., `https://prod.spline.design/.../scene.splinecode`).
5. Open `.env.local` and paste your URL:
   ```env
   NEXT_PUBLIC_SPLINE_SCENE_URL=https://prod.spline.design/your-scene-id/scene.splinecode
   ```
6. Restart your dev server (`npm run dev`).

---

## 🖼️ Assets Guide (`public/assets/`)

- `groom.jpg`: Portrait photo for Sasikumar (arched frame).
- `bride.jpg`: Portrait photo for Adithya (arched frame).
- `og-image.jpg`: 1200x630 social preview image for WhatsApp / Facebook / Twitter.
- `music.mp3` *(optional)*: Traditional instrumental audio file. When present, the floating audio toggle in the bottom right corner lets guests play and pause music.

---

## 🚢 Deployment

Deploy seamlessly to **Vercel**, **Netlify**, or any Node.js hosting platform:

### Deploying on Vercel:
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project into [Vercel](https://vercel.com).
3. Under Environment Variables, add:
   - `NEXT_PUBLIC_SPLINE_SCENE_URL` (optional)
4. Click **Deploy**.
