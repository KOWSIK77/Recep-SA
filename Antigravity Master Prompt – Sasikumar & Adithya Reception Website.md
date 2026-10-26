# Antigravity Master Prompt: Sasikumar & Adithya Reception Website

Paste everything below the line into Antigravity (Gemini) and attach **Site Reference.txt** to the same message. Anything marked **\[EDIT\]** is a placeholder you can replace later.

---

## 0. ROLE AND OPERATING RULES

You are an elite frontend engineer, motion designer and wedding-website art director. Build a **single-page, mobile-first, animation-rich wedding RECEPTION website** in **English**.

**Working method (agent mode):**

1. First read the attached `Site Reference.txt`. Open every reference link in the browser and note layout patterns, motion style and ornament usage. Do not copy their code, text or imagery; borrow only the feel.
2. **Use `Site Reference.txt` for look and feel only.** Ignore every section list, feature list, itinerary and form spec inside it, including its base structure prompt and its "Needs and levelling" block: they describe a larger multi-event wedding site. **Build only the eight sections in Section 3 of this prompt** and add nothing from the file beyond the visual style of the reference links.
3. Produce a short **plan and task list artifact** before writing code. Then build in the phases listed in Section 14.
4. After each phase, open the site in the browser, test at 375px, 768px and 1440px widths, and fix problems before moving on.

**Tech stack (fixed, do not substitute):**

- **Framework:** Next.js (latest stable) with the App Router and TypeScript. One route, `app/page.tsx`, holds every section in order.
- **Styling:** Tailwind CSS as installed by `create-next-app`. Put the colours, fonts and shadows from Section 2 into the Tailwind theme (CSS `@theme` for Tailwind v4, `tailwind.config.ts` for v3, whichever is installed). No other CSS framework or component library.
- **Animation:** GSAP with ScrollTrigger through the `@gsap/react` `useGSAP` hook. No Framer Motion, AOS or other animation libraries. Simple hover and state transitions may use Tailwind classes.
- **3D:** Spline through `@splinetool/react-spline`, for one hero scene.
- **Fonts:** `next/font/google` for Cormorant Garamond, Great Vibes and Montserrat.
- **Images and icons:** `next/image` with a fallback component for missing files, and `lucide-react` for icons.
- **Dependencies:** nothing else unless essential. If you add a package, say which one and why.
- Detailed rules follow in Sections 0.1 to 0.4.

### 0.1 Project setup and structure

Scaffold with `npx create-next-app@latest` (TypeScript, Tailwind CSS, ESLint, App Router, no `src/` folder), then install `gsap @gsap/react @splinetool/react-spline @splinetool/runtime lucide-react`. After installing, run `npm ls` and report the versions you ended up with. Use this structure:

```text
app/
  layout.tsx        // fonts, metadata, Open Graph, <html lang="en">
  page.tsx          // renders all sections in order
  globals.css       // Tailwind import, theme tokens, base styles
components/
  sections/         // Navbar.tsx, Hero.tsx, Countdown.tsx, Celebrate.tsx,
                    // Couple.tsx, ReceptionDetails.tsx, VenueMap.tsx, Footer.tsx
  ui/               // Button, SectionHeading, Ornament, KolamDivider, Toast, SafeImage
  three/            // SplineScene.tsx, SplineFallback.tsx
hooks/              // useCountdown, useActiveSection, useReducedMotion, useMediaQuery
lib/                // config.ts, gsap.ts, ics.ts, whatsapp.ts
public/assets/      // images, optional music.mp3
.env.local.example  // NEXT_PUBLIC_SPLINE_SCENE_URL=
README.md           // setup, how to edit config, how to add a Spline scene, deploy
```

### 0.2 Next.js rules

- Server components by default. Add `"use client"` only to components that use state, effects, GSAP or browser APIs.
- The countdown and any time-based UI render a stable placeholder on the server and start ticking only after mount (`useEffect`), so there is no hydration mismatch.
- Use the Metadata API in `layout.tsx`: title "Sasikumar & Adithya | Wedding Reception | 1 November 2026", a description, and Open Graph and Twitter tags using `/assets/og-image.jpg`.
- One route only. In-page links use smooth scrolling with `scroll-margin-top` so the fixed nav never covers a heading.
- Put the mobile-menu scroll lock in a hook, not inline.
- `npm run build` and `npm run lint` must pass with no errors. Lazy-load below-the-fold images and load Spline only when the page is idle.

### 0.3 GSAP rules

- Register ScrollTrigger once in `lib/gsap.ts` (and SplitText if the installed `gsap` includes it; otherwise write a small word and letter splitter). Import that file only from client components.
- Use the `useGSAP` hook with a scoped container ref, so every tween and ScrollTrigger is cleaned up on unmount, including React Strict Mode's double mount in development.
- Use `gsap.matchMedia()` to separate three modes: desktop (full parallax, cursor glow), mobile (lighter effects), and `prefers-reduced-motion: reduce` (no parallax, particles or split text; simple fades only).
- Animate only `transform` and `opacity`. Use `scrub` for parallax and `ScrollTrigger.batch` for repeated reveals. Pin only the hero-to-countdown transition.
- Call `ScrollTrigger.refresh()` after fonts, images and the Spline scene have loaded.
- Keep shared ease and duration constants in `lib/gsap.ts`.

### 0.4 Spline rules

- Use exactly one Spline scene, in the hero, behind or beside the names. `components/three/SplineScene.tsx` is a client component that loads `@splinetool/react-spline` with `next/dynamic` and `ssr: false`, and reads the scene URL from `NEXT_PUBLIC_SPLINE_SCENE_URL`.
- **The site must look complete with no scene at all.** If the URL is empty, loading fails or takes longer than 6 seconds, the screen is narrower than 768px, data-saver is on, or reduced motion is set, render `SplineFallback`: an inline SVG gold lotus or brass lamp with a gentle GSAP float.
- Start loading only after first paint and when idle. Spline must never block the first paint or the page content.
- Give the canvas a fixed aspect-ratio container to avoid layout shift. Mark it `aria-hidden="true"`: it is decorative.
- Pause or unmount the scene when the hero leaves the viewport (IntersectionObserver). Subtle scroll-linked scale or movement can be driven by GSAP on the container. Mouse-follow only on desktop.
- **Scene brief for the couple to build in Spline \[EDIT\]:** one slowly floating gold object (brass lamp, lotus, or an "S & A" monogram), warm light, soft glow, gentle idle rotation, maroon or transparent background to match the hero. Keep it light: one object, few lights, no physics. Export the public URL and paste it into `.env.local`.

> Every `assets/...` path elsewhere in this prompt means `public/assets/...` in this project, referenced in code as `/assets/...`.

---

## 1. CORE DATA (single source of truth)

Put all of this in one typed `siteConfig` object in `lib/config.ts` so it can be edited in one place, and read every piece of text from it where practical.

| Field | Value |
| --- | --- |
| Groom | Sasikumar |
| Bride | Adithya |
| Event | Wedding Reception |
| Date | Sunday, 1 November 2026 |
| Time | 6:00 PM to 9:30 PM (IST, UTC+05:30) |
| Venue | Sree Velavar Mandapam, Dharapuram, Tamil Nadu |
| Google Maps link | https://maps.app.goo.gl/qnZ19PVvL13PUDCz6 |
| Countdown target | `2026-11-01T18:00:00+05:30` |
| Couple order on site | Sasikumar & Adithya |
| Monogram | S & A |
| Hosts / families | \[EDIT\] Parents' names |

---

## 2. DESIGN DIRECTION

**Aesthetic:** Regal South Indian Traditional meets modern editorial. Think temple-town elegance: warm, rich, luminous, never cluttered.

**Colour system (define as Tailwind tokens):**

- Primary: Deep Maroon `#5B1020`
- Secondary: Ivory Cream `#FBF3E4`
- Accent: Temple Gold `#C9A24B` (with a lighter `#E6C980` for glows)
- Support: Jasmine White `#FFFDF8`, Turmeric `#E8A317`, Leaf Green `#2F5D3A` (sparingly)
- Text: Ink Brown `#2A1A14`

**Typography:** Cormorant Garamond (display headings, couple names), a calligraphic script such as Great Vibes only for the monogram and accent words, and Montserrat or Inter for body and UI.

**Motifs to use as inline SVG or CSS patterns:** kolam line-work borders, temple gopuram silhouette, brass lamp (kuthuvilakku), jasmine strings, mango-leaf toranam, lotus, subtle mandala watermark. Use motifs as dividers and corner ornaments, never as noise behind text.

**Motion philosophy:** cinematic and smooth, but purposeful. Every animation should reveal, guide or delight.

---

## 3. SECTION-BY-SECTION SPECIFICATION

Build **only these eight sections**, in this order, one component each. Do not add any other section (no preloader, Our Story, Travel, Dress Code, RSVP or FAQ). Each is a `<section>` with a stable `id` used by the navigation.

### 3.1 Navigation (`#nav`, `Navbar.tsx`)

- Fixed glassmorphism bar (`backdrop-blur-md`, translucent ivory), monogram on the left.
- Links: Home, Celebrate, Couple, Details, Venue.
- Scroll-spy highlights the active section with a gold underline that slides between links.
- Mobile: burger menu opening a full-screen overlay with staggered link animation. Lock body scroll while open and close on link tap or Esc.
- A slim scroll-progress bar sits at the very top.

### 3.2 Hero (`#home`, `Hero.tsx`)

- Full-viewport frame with layered parallax: gopuram silhouette, hanging jasmine strings and mango-leaf toranam swaying gently, drifting gold dust particles.
- Small caps line: **"Together with their families"**
- Names: **Sasikumar** & **Adithya** with a split-letter reveal.
- Headline line: **"Invite you to their Wedding Reception"**
- Meta row: **Sunday, 1 November 2026** | **6:00 PM onwards** | **Dharapuram**
- Romantic quote (italic, centred): *"Two hearts, one journey, and an evening of blessings to begin it."*
- Two buttons: **View Venue** (solid gold) and **Add to Calendar** (outline).
- A "scroll" hint with a bouncing arrow.

**3D layer:** place the Spline scene from Section 0.4 as the hero's centrepiece, with the SVG fallback. The names, date and buttons must stay readable over it.

### 3.3 Countdown (`#countdown`, `Countdown.tsx`, inside or directly below the hero)

- Four tiles: **Days | Hours | Minutes | Seconds**, driven by `setInterval` at 1 second and the target in Section 1.
- Use tabular numerals and fixed-width tiles so the layout does not shift. Flip or slide animation only on the digit that changes.
- Label above: **"Counting down to our celebration"**.
- **Three states:**
  - Before: live countdown.
  - During (6:00 PM to 9:30 PM on 1 Nov 2026, IST): show **"The celebration is happening now. Join us!"** with a pulsing gold dot.
  - After: show **"Thank you for celebrating with us."** and hide the tiles gracefully.
- Always compute from the fixed IST timestamp so it is correct for guests in any time zone.
- Include an **Add to Calendar** button that generates and downloads an `.ics` file (event title, time, venue, map link, reminder one day before).

### 3.4 Invitation Note (`#celebrate`, `Celebrate.tsx`)

- Short blessing-style welcome, centred, with a gold ornament divider.
- Copy: *"With the blessings of our elders and the love of our family and friends, we joyfully invite you to share the evening as we begin our married life together. Your presence and good wishes will make our celebration complete."*
- Under it, a line for the families: **"\[EDIT\] Groom's parents & Bride's parents"**.
- Text lines fade up on scroll, word by word.

### 3.5 Meet the Couple (`#couple`, `Couple.tsx`)

- Two side-by-side cards on desktop, stacked on mobile. Each has an arched (temple-window shaped) photo frame, name, a one-line description, and a decorative border.
- Sasikumar: **"The groom. Calm, kind-hearted and always the first to laugh."** \[EDIT\]
- Adithya: **"The bride. Graceful, warm and the heart of every room."** \[EDIT\]
- Photos: `assets/groom.jpg`, `assets/bride.jpg`. If missing, show an elegant initial-letter placeholder.
- Cards slide in from opposite sides and a gold heart or lotus connects them.

### 3.6 Reception Details (`#details`, `ReceptionDetails.tsx`)

- One premium event card (not tabs), styled like a traditional invitation with a gold double border and corner ornaments.
- Contents: event name, **Sunday, 1 November 2026**, **6:00 PM to 9:30 PM**, **Sree Velavar Mandapam, Dharapuram**.
- Three icon tiles beneath: Date, Time, Venue, each with a short line.
- **Evening Flow** vertical mini-timeline, using these placeholder slots \[EDIT\] times:
  - 6:00 PM Guests arrive and welcome
  - 6:30 PM Couple on stage and blessings
  - 7:30 PM Photos with the couple
  - 8:00 PM Dinner
  - 9:30 PM Warm farewell
- Buttons: Add to Calendar and Share on WhatsApp (pre-filled message with the site URL).

### 3.7 Venue and Map (`#venue`, `VenueMap.tsx`)

- Two-column layout: left, venue info; right, map.
- Heading: **"Find Us"**.
- Venue block: **Sree Velavar Mandapam**, Dharapuram, Tamil Nadu \[EDIT full street address and PIN code\].
- Map: embed `https://www.google.com/maps?q=Sree+Velavar+Mandapam+Dharapuram&output=embed` in an `<iframe>` (lazy loaded, rounded, gold border, with a graceful fallback card if it fails).
- Note: the short Maps link cannot be embedded directly, so use it as the target of the buttons.
- Buttons: **Open in Google Maps** (opens `https://maps.app.goo.gl/qnZ19PVvL13PUDCz6` in a new tab with `rel="noopener"`), **Get Directions**, **Copy Address** (clipboard with a "Copied" toast).

### 3.8 Footer and Thank You (`#footer`, `Footer.tsx`)

- Dark maroon background with a gold gopuram silhouette and a subtle starfield or lamp glow.
- Large script line: **"Thank you for being part of our story."**
- Repeat date and venue, the monogram, quick links, and the **Share on WhatsApp** button.
- Small credit line: "Made with love for Sasikumar & Adithya."

---

## 4. ANIMATION SYSTEM (heavy, but controlled)

- **GSAP + ScrollTrigger** for scroll-linked animation: parallax layers, section reveals (fade, rise and clip-path), and pinned moments where they genuinely help (for example, the hero-to-countdown transition).
- Split-text reveals on the names and section headings.
- Continuous ambient motion: floating gold particles, swaying toranam and jasmine, soft lamp-glow pulse.
- Hover micro-interactions: magnetic buttons, card lift with shadow scaling, image zoom on hover.
- A custom cursor glow on desktop only (hidden on touch devices).
- Smooth, consistent easing across the site (define shared ease and duration constants).
- **Performance:** animate only `transform` and `opacity`, use `will-change` sparingly, pause off-screen animations, throttle scroll handlers, and keep the page smooth on a mid-range Android phone.
- **Accessibility:** wrap everything in a `prefers-reduced-motion` check that disables parallax, particles and split-text, leaving simple fades.

---

## 5. OPTIONAL EXTRAS (include if they do not hurt performance)

- Background music toggle (off by default, never autoplay) that plays `assets/music.mp3` if present.
- An `og:image`, title and description set through the Next.js Metadata API so the WhatsApp link preview looks great.

---

## 6. RESPONSIVE RULES

- Mobile-first. Containers use `w-full px-4 md:px-12 lg:px-24` with a max width on large screens.
- Hero text must scale fluidly with `clamp()` and never overflow at 320px.
- Tap targets are at least 44px. No horizontal scroll at any width.
- Test at 320, 375, 768, 1024 and 1440px.

---

## 7. ACCESSIBILITY AND SEO

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`, logical heading order.
- Colour contrast at least WCAG AA, visible focus rings, full keyboard operation for the nav, mobile menu and buttons.
- Alt text on all images, and `aria-live` for countdown state changes (not every tick).
- Meta title: "Sasikumar & Adithya | Wedding Reception | 1 November 2026".

---

## 8. ASSET LIST (create placeholders so nothing breaks)

`public/assets/groom.jpg`, `public/assets/bride.jpg`, `public/assets/hero-bg.jpg` (optional), `public/assets/og-image.jpg`, `public/assets/music.mp3` (optional). The Spline scene is not a file: set `NEXT_PUBLIC_SPLINE_SCENE_URL` in `.env.local`. Use gradient or initial-letter fallbacks when an image is missing.

---

## 9. CONTENT TONE

Warm, respectful, joyful and concise. Written in clear English, suitable for elders and friends alike. No slang, no heavy jargon.

---

## 10. EDGE CASES TO HANDLE

- Countdown reaches zero while the page is open (switch state without reload).
- User's device clock or time zone differs (always use the fixed IST timestamp).
- Map iframe blocked or offline (fallback card with the Maps button).
- Clipboard API unavailable (fallback to a selectable text box).

---

## 11. CODE QUALITY

- TypeScript strict mode, descriptive names, and a short comment explaining each section.
- All editable content lives in `lib/config.ts`; components read from it.
- One component per section in `components/sections`, shared pieces in `components/ui`, logic in `hooks/` and `lib/` (`useCountdown`, `useActiveSection`, `useReducedMotion`, `ics.ts`).
- No console errors, hydration warnings or ESLint errors.

---

## 12. WHAT NOT TO DO

- Build only the eight sections in Section 3: no preloader, Our Story, Travel, Dress Code, RSVP or FAQ, and no multi-event tabs.
- No stock-photo clutter, no autoplaying audio, no pop-ups.
- No libraries outside the stack in Section 0 (no Framer Motion, no extra UI kits, no paid APIs).

---

## 13. FINAL CHECKLIST (verify in the browser before finishing)

- [ ] All eight sections render in order with working nav and scroll-spy
- [ ] Countdown ticks and all three states work (test by temporarily changing the target)
- [ ] Map button opens the exact Maps link, and Copy Address works
- [ ] Add to Calendar downloads a valid `.ics` file
- [ ] Mobile menu works
- [ ] Reduced-motion mode works
- [ ] No horizontal scroll at 320px
- [ ] No console errors or hydration warnings
- [ ] `npm run build` and `npm run lint` pass
- [ ] Spline loads lazily, and the fallback shows when the scene is missing, disabled or on mobile
- [ ] GSAP animations clean up on unmount and ScrollTrigger refreshes after fonts and Spline load

---

## 14. BUILD PHASES (stop and show a screenshot after each)

1. **Setup and structure:** scaffold the project, install the stack, create the folder structure and `lib/config.ts`, and add a component for each of the eight sections (`Navbar`, `Hero`, `Countdown`, `Celebrate`, `Couple`, `ReceptionDetails`, `VenueMap`, `Footer`) with its id, heading and placeholder text.
2. **Content:** fill in all the copy from Section 3 and wire it to `siteConfig`.
3. **Design system:** Tailwind theme tokens, `next/font`, ornaments, layout and responsive behaviour.
4. **Interactivity:** nav and scroll-spy, mobile menu, countdown hook, calendar file, copy-address, WhatsApp share.
5. **Animation and 3D:** GSAP (parallax, scroll reveals, ambient effects, micro-interactions) and the Spline hero scene with its fallback.
6. **QA:** run the checklist in Section 13, fix issues, and finish with a README covering setup, editing `siteConfig`, adding the Spline URL and deploying.

Begin with the plan artifact, then Phase 1.
