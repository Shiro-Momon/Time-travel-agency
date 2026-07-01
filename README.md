# TimeTravel Agency — Luxury Temporal Expeditions

An immersive, premium web application for the **TimeTravel Agency**, allowing clients to explore historical eras, receive recommendations based on their interests, interact with an AI temporal concierge, and book temporal voyages with absolute chronological security.

---

## 🛠️ Stack Technique

- **Core & Runtime**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) (fast HMR, bundled deployment)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (modern CSS utility variables, customized dark theme, fluid design)
- **Icons**: [Lucide React](https://lucide.dev/) (modern, clean SVG icons)
- **AI Integrations**: [Mistral AI API](https://mistral.ai/) (`mistral-small` model) or client-side fallback simulation
- **Hosting / Deployment**: [Vercel](https://vercel.com/) (configuration ready via `vercel.json`)

---

## 🌟 Features Implémentées

1. **Cinematic Hero Landing**: 
   - A looping high-definition background teaser video featuring atmospheric custom black-gold gradients and smooth entrance animations.
2. **Interactive Destination Gallery**: 
   - Features **Cretaceous Era (-65M BC)**, **Florence 1504 (Renaissance)**, and **Paris 1889 (Belle Époque)**.
   - **Hover state video playbacks** (looping, muted) replacing static card images for a lively feel.
   - Detail Modals showing package details, prices, and curated itinerary highlights.
3. **Temporal Match Quiz**:
   - An interactive 4-step quiz calculating points to recommend the most suitable epoch for the user based on their preferences.
4. **AI Temporal Concierge Chatbot**:
   - Floating widget matching the gold-glassmorphic luxury theme.
   - Direct integration with **Mistral AI API** using the `mistral-small` model with a custom system persona prompt.
   - Secure local storage for the user's API Key.
   - Smart keyword-based conversational fallback if no API key is provided.
5. **Ledger Booking Desk**:
   - Dynamically adapts date labels and calendar options depending on the selected era.
   - Real-time price calculation according to travel class (Signature, Executive, Royal) and passenger count.
   - Secure minting of warp boarding passes upon booking.

---

## 🤖 Transparence des Outils IA Utilisés

- **Code & Setup**: Developed in pair programming with **Antigravity (Google DeepMind)**.
- **Vibe Coding**: Scaffolding initialized using the Vite React command-line interface.
- **Asset generation**: Graphics, audio/video assets, and branding logos were pre-generated in Phase 1 of the project and integrated into this application.
- **Chatbot Logic**: Powered by the **Mistral AI** (`mistral-small`) language model to guide travelers through the history and travel choices.

---

## 🚀 Installation & Lancement Local

### Prérequis
- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/) or yarn

### Étapes
1. **Installer les dépendances** :
   ```bash
   npm install
   ```
2. **Lancer le serveur de développement local** :
   ```bash
   npm run dev
   ```
3. **Construire la version de production** :
   ```bash
   npm run build
   ```

---

## 💳 Crédits & Mentions

- **Visuels & Médias** : Midjourney + Runway (Projet 1)
- **Chatbot Engine** : Mistral AI API (`mistral-small-latest`)
- **Projet Pédagogique** : Ynov Campus - M1/M2 Digital & IA (Projet Final - En groupe - TimeTravel Agency)
