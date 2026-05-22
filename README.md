# ⬡ BaseCompass

**A cyber street map for exploring the Base ecosystem.**

> "Find your way through Base — dApps, tools, safety routes and beginner missions without the noise."

BaseCompass combines beginner-friendly Base education with a distinctive **cyberpunk street-map interface** designed to make onboarding feel exciting instead of intimidating. Built as an open ecosystem hub for Base users and builders.

---

## ✦ What It Is

BaseCompass is a no-backend, fully static web app that helps beginners:

- **Discover** trusted dApps across 8 districts of the Base ecosystem
- **Understand** risk levels, beginner scores, and safety notes before interacting
- **Follow** a 7-day beginner mission path from wallet setup to builder grants
- **Choose** their route with an interactive quiz
- **Build** using curated developer resources and tooling guides

---

## ✦ Features

| Feature | Description |
|---|---|
| **56+ dApp Directory** | Scored, risk-rated, and categorised across 8 ecosystem districts |
| **Street Intel Cards** | Each dApp displayed as a mission brief with first safe action |
| **7-Day Roadmap** | Metro-style mission path from wallet setup to rewards terminal |
| **Route Quiz** | Choose your path — 6 routes, personalised recommendations |
| **City District Grid** | DeFi District, Social Alley, NFT Yard, Builder Lab and more |
| **Boot Terminal** | Animated system terminal in the hero section |
| **Tagged Van Panel** | CSS van illustration with ecosystem stats and graffiti overlays |
| **Safety Rules** | "Don't Get Robbed" — 8 essential street rules for Base |
| **Builder Lab** | Terminal panels, build steps, and grant resources for developers |
| **Search + Filters** | Filter by category, level, risk. Sort by beginner score |
| **Cyberpunk UI** | Dark navy, Base blue neon, glitch text, scanlines, animated grid |

---

## ✦ Tech Stack

- **Vite** — build tool
- **React 18** — UI framework
- **TypeScript** — type safety
- **Tailwind CSS v3** — styling with custom cyberpunk tokens
- **Framer Motion** — entrance animations, hover effects, terminal reveals
- **lucide-react** — icon system
- **React Router v6** — client-side routing
- **No backend** — all data in local TypeScript files
- **No env variables required**

---

## ✦ Local Setup

```bash
# 1. Clone
git clone https://github.com/yourname/basecompass.git
cd basecompass

# 2. Install
npm install

# 3. Dev server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

The app runs at `http://localhost:5173` by default.

---

## ✦ Deploy to Vercel

Zero configuration needed.

```bash
# Option A: Vercel CLI
npx vercel

# Option B: Push to GitHub → Import in vercel.com dashboard
# Build command:  npm run build
# Output dir:     dist
# No env vars needed
```

The included `vercel.json` handles SPA routing rewrites automatically.

---

## ✦ Project Structure

```
basecompass/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── vercel.json
└── src/
    ├── App.tsx              # Router + Layout
    ├── main.tsx             # Entry point
    ├── index.css            # Global styles, animations, noise texture
    ├── data/
    │   ├── apps.ts          # 56 Base ecosystem dApps
    │   ├── roadmap.ts       # 7-day mission roadmap
    │   └── categories.ts    # 8 district definitions
    ├── utils/
    │   ├── scoring.ts       # Score/risk color helpers
    │   └── filters.ts       # Search + filter logic
    ├── components/
    │   ├── Layout.tsx
    │   ├── Navbar.tsx
    │   ├── Hero.tsx
    │   ├── Footer.tsx
    │   ├── BootTerminal.tsx     # Animated system boot terminal
    │   ├── TaggedVanPanel.tsx   # CSS van with ecosystem stats
    │   ├── CityDistrictGrid.tsx # Neon district category cards
    │   ├── StreetIntelCard.tsx  # dApp card as intel brief
    │   ├── MetroRoadmap.tsx     # Expandable mission station list
    │   ├── RouteQuiz.tsx        # 6-path quiz + route result panel
    │   ├── SignalMeter.tsx      # Visual score bar
    │   ├── NeonCard.tsx         # Glassmorphism card wrapper
    │   ├── GlitchHeading.tsx    # CSS glitch text component
    │   ├── StreetBadge.tsx      # Sticker-style badge
    │   ├── SafetyBadge.tsx      # Risk level badge with icon
    │   ├── ScoreBadge.tsx       # Beginner score badge
    │   ├── SprayDivider.tsx     # Neon spray paint divider
    │   └── CompassRadar.tsx     # Animated SVG compass radar
    └── pages/
        ├── Home.tsx
        ├── Apps.tsx
        ├── RoadmapPage.tsx
        ├── QuizPage.tsx
        ├── BuildersPage.tsx
        └── SafetyPage.tsx
```

---

## ✦ Roadmap

- [x] v1.0 — Core app, 56 dApps, 8 districts, quiz, roadmap, safety
- [ ] v1.1 — User favourites (localStorage), shareable quiz results
- [ ] v1.2 — Onchain attestations via Base (EAS integration)
- [ ] v1.3 — Community dApp submissions (GitHub PR flow)
- [ ] v2.0 — Live on-chain data (TVL, holders) via DeFiLlama API

---

## ✦ Funding Angle

BaseCompass is an open, beginner-friendly ecosystem hub for Base users and builders. It lowers the barrier to entry for non-technical users while providing signal-to-noise filtering that the ecosystem currently lacks. Built to be submitted for **Base Builder Grants**.

---

## ✦ Disclaimer

Not financial advice. Not affiliated with Coinbase or Base.  
Always verify official links before connecting your wallet.  
DeFi involves real risk of loss — never invest more than you can afford to lose.

---

*Built on Base · Chain 8453 · Cyberpunk street map for the onchain world*
