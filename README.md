# 🍉 FRUIT SLICE RUSH

**Fruit Slice Rush** is a premium, high-octane 3D browser arcade fruit slicing game built with HTML5, CSS3, JavaScript (ES6+), Three.js, and the Web Audio API.

Designed from the ground up for desktop browsers and mobile touchscreens (Android & iOS), it delivers responsive 60 FPS gameplay, dynamic 3D fruit splitting physics, cinematic particle effects, procedural audio synthesis, and an ad monetization architecture compliant with Google AdSense and H5 Games Ads.

---

## 🌟 Key Features

### 1. 3D Graphics & Visual Design
- **Realistic Glossy 3D Fruits**: Procedural Three.js models for Watermelon, Orange, Apple, Kiwi, Banana, Pineapple, and Strawberry with realistic peel textures, seeds, rinds, and cross-sections.
- **Dynamic 3D Halves Slicing**: When sliced, fruits split along the exact blade trajectory into two halves with custom cut face textures and explosive impulse physics.
- **Atmospheric Arcade Styling**: Dark charcoal backdrop (`#0a0b10`), deep purple & black radial gradients, glowing emerald and electric orange neon accents.
- **Cinematic Lighting & Highlights**: Ambient light, warm key specular lighting, and purple/cyan rim lighting for glossy commercial-grade visuals.
- **Visual FX**: Neon blade swipe trails, juicy 3D particle bursts, 2D screen juice splatters, glowing bomb shockwaves, and smoke shrapnel.

### 2. Audio Design (Web Audio API)
- **Zero Asset Dependencies**: 100% procedurally synthesized audio using the browser's Web Audio API. Never fails to load, zero CDN latency, zero 404s.
- **Sound Effects**:
  - Razor-sharp blade slice swoosh
  - Wet fruit squish and splash pop
  - Bomb fuse sizzle and sub-bass detonation boom
  - Melodic ascending combo chimes
  - Tactile UI click feedback
  - Melancholic game over tune
- **Dynamic BGM**: Real-time generative electronic arcade background beat with kick, high-hats, and synth arpeggios.
- **Full Volume & Mute Controls**: Independent sliders and instant toggles. Auto-resumes on first user interaction in compliance with autoplay restrictions.

### 3. Gameplay Mechanics & Modes
- **Classic Mode**:
  - 3 Lives.
  - Missed fruits that fall off-screen without being sliced cost 1 life.
  - Slicing a bomb detonates it and costs 1 life.
  - Difficulty increases dynamically as your score rises.
- **Time Attack Mode**:
  - 60-second frantic countdown challenge.
  - No penalty for dropped fruits.
  - Bombs penalize -10 points and -3 seconds from the clock.
  - Maximizes combos and rapid reflexes.
- **Combo System**:
  - Slicing multiple fruits in a single stroke or within 350ms triggers combo multipliers (2x, 3x, 4x, 5x+ MEGA COMBO).
  - High combos reward bonus score points and trigger celebratory banners.

### 4. Input & Mobile Responsiveness
- **Desktop & Mobile**: Seamless support for mouse drag and multi-touch swipe.
- **No Page Scroll Interference**: `touch-action: none` and safe-area insets prevent pull-to-refresh and viewport jitter.
- **Fullscreen Mode**: One-tap fullscreen toggle for immersive gameplay.

### 5. Advertisement Monetization Architecture
- Compliant with **Google AdSense** and **Google H5 Games Ads**:
  1. **Home Screen Banner**: `#ad-banner-home`
  2. **Game Over Screen Banner**: `#ad-banner-gameover`
  3. **Interstitial Hook**: Triggered between game sessions (`AdManager.showInterstitial(callback)`).
  4. **Rewarded Ad Extra Life**: In Classic Mode, players can watch a rewarded ad to revive once per session (`AdManager.showRewarded({ onReward, onDismiss })`).
- **Policy Compliance Guarantee**:
  - All ad containers remain hidden (`display: none`) until a real, approved provider is configured.
  - Ads are never displayed during active fruit slicing.
  - No simulated ad impressions or fake clicks.
  - Rewarded lives are only granted after real provider confirmation.

---

## 📁 Project Structure

```
fruit-slice-rush/
  ├── index.html                  # HTML5 entry shell & UI layout
  ├── package.json                # Dependencies and build scripts
  ├── vite.config.js              # Vite dev server and build configuration
  ├── public/
  │   ├── favicon.svg             # Game favicon
  │   └── assets/                 # Static assets directory
  ├── src/
  │   ├── main.js                 # App bootstrap and controller orchestration
  │   ├── game/
  │   │   ├── Game.js             # Three.js scene, camera, lights, game loop
  │   │   ├── Fruit.js            # 3D fruit models, halves, and bomb meshes
  │   │   ├── FruitSpawner.js     # Launch physics, wave patterns, difficulty scaling
  │   │   ├── Collision.js        # Segment-sphere intersection detection
  │   │   ├── Physics.js          # Gravity, velocity, rotation, slice impulses
  │   │   ├── ParticleSystem.js   # 3D droplets, shockwaves, score popups
  │   │   ├── SwipeController.js  # Neon blade trail rendering & touch/mouse input
  │   │   └── TextureFactory.js   # Procedural canvas textures for fruit skins & pulp
  │   ├── ui/
  │   │   ├── Menu.js             # Main menu, mode tabs, play button, sound toggle
  │   │   ├── GameHUD.js          # In-game score, lives, timer, combo banners, pause
  │   │   ├── GameOver.js         # Animated score tally, stats, share, rewarded ad
  │   │   └── Settings.js         # Volume controls, quality selector, score reset
  │   ├── audio/
  │   │   └── AudioManager.js     # Procedural Web Audio API sound synthesis & BGM
  │   ├── ads/
  │   │   └── AdManager.js        # AdSense / H5 Games Ads monetization integration
  │   ├── storage/
  │   │   └── ScoreStorage.js     # LocalStorage high scores & player preferences
  │   └── styles/
  │       ├── main.css            # Theme colors, CSS variables, screen shakes
  │       ├── game.css            # Glassmorphism UI, modals, buttons, banners
  │       └── responsive.css      # Mobile portrait, notch safe-areas, landscape
  └── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or pnpm / yarn

### Installation
1. Clone or download the repository to your local machine.
2. Open a terminal in the project root:
   ```bash
   cd "fruit-slice-rush"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To launch the Vite development server with hot module reloading:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000/
```

### Production Build
To create a production-optimized build:
```bash
npm run build
```
The bundled files will be generated in the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 💰 Advertisement Integration Guide

`AdManager.js` provides clean plug-and-play hooks for Google AdSense and Google H5 Games Ads.

### Enabling Google AdSense / H5 Game Ads

In `src/main.js`, configure `adManager` with your Google AdSense Publisher ID:

```javascript
// Replace with your publisher client ID
adManager.init({
  client: 'ca-pub-XXXXXXXXXXXXXXXX'
});
```

### Banner Ads Configuration
In `index.html`, inside `#ad-banner-home` and `#ad-banner-gameover`, add your approved `<ins class="adsbygoogle">` unit tags:

```html
<div id="ad-banner-home" class="ad-slot-container">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
       data-ad-slot="1234567890"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
</div>
```

### Google H5 Games Ads (Ad Placement API)
`AdManager.js` is pre-wired to communicate with `window.adBreak`:
- **Interstitial Ads**: Automatically called via `adManager.showInterstitial(callback)` when a user restarts or switches screens.
- **Rewarded Extra Life**: When configured, the "Watch Ad: +1 Extra Life" button appears on the Game Over screen. Upon full completion of the video, `game.reviveExtraLife()` is invoked.

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Install the Vercel CLI or link via GitHub:
   ```bash
   npm install -g vercel
   vercel
   ```
2. Build Command: `npm run build`
3. Output Directory: `dist`

### Deploy to Cloudflare Pages
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Select **Create application** > **Pages** > **Connect to Git**.
3. Set the build configuration:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**.

### Deploy to Netlify
1. Drag and drop the `dist/` folder into Netlify Drop, or connect your repository.
2. Build command: `npm run build`
3. Publish directory: `dist`

---

## 🎮 How to Play

1. **Slice**: Click and drag your mouse or swipe your finger across launched fruits.
2. **Combos**: Slice 2 or more fruits in a single stroke for bonus points.
3. **Avoid Bombs**: Never hit ticking black bombs! In Classic mode they cost a life; in Time Attack they deduct score and time.
4. **Survive & Score**: Compete for the ultimate high score on Classic and Time Attack!

---

## 📄 License
This project is licensed under the MIT License.
