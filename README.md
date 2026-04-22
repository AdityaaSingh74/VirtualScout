<div align="center">

# 🎓 VirtualScout

### AI-Powered 360° Virtual Campus Tour

*Explore every corner of your campus through immersive panoramic views, guided by Scout — your intelligent AI companion.*

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## 📌 Overview

**VirtualScout** is a fully interactive, AI-powered virtual campus tour application. It combines immersive 360° street-view panoramas with an intelligent conversational guide named **Scout** — letting prospective students, visitors, and parents explore every building, lab, garden, and facility on campus, without ever setting foot there.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **360° Campus Panoramas** | Immersive Google Street View & Kuula-powered panoramic views of every campus location |
| 🤖 **Scout — AI Chat Guide** | Intelligent rule-based conversational AI that understands natural language and navigates the 360° view based on your questions |
| 🔊 **Text-to-Speech (TTS)** | Scout speaks responses aloud using the Web Speech API with smart voice selection |
| 🎤 **Voice Input (STT)** | Talk to Scout using your microphone — transcribed live via the Speech Recognition API |
| 📍 **Location Navigation** | Click quick-action chips or chat naturally to instantly jump to any of 20+ campus locations |
| 💡 **Insider Tips** | Scout shares location-specific tips, fun facts, and recommendations |
| 🧠 **Smart NLP** | Understands greetings, category questions, free-text descriptions, and more — not just keywords |
| ✨ **3D Holographic Avatar** | A beautifully animated glassmorphic 3D AI mascot that reacts to its current state (talking, thinking, waving, idle) |
| 📱 **Fully Responsive** | Works seamlessly on mobile, tablet, and desktop |
| ⚡ **Error Resilient** | React Error Boundaries ensure the tour keeps running even if the chat panel encounters an issue |

---

## 🏛️ Campus Locations Covered

<details>
<summary><strong>🏫 Campus Highlights (7 locations)</strong></summary>

- 🚪 Main Gate
- 🏠 Girls Hostel
- 🌳 Mughal Garden (2 views)
- 🌿 Botanical Garden
- 🛕 Temple
- 🏀 Basketball Ground

</details>

<details>
<summary><strong>🎓 Academic Block (8 locations)</strong></summary>

- 🏗️ 4th Floor Rooftop
- 3️⃣ 3rd Floor
- 2️⃣ 2nd Floor
- 🔬 1st Floor ECE Lab
- ⚛️ 1st Floor Physics Lab
- 🌤️ 1st Floor Balcony
- 🎓 Lecture Halls (1st Floor)
- 🎭 Auditorium (Ground Floor)

</details>

<details>
<summary><strong>🔬 Specialized Labs</strong></summary>

- 🤖 Drobotics Lab (Robotics, Drones & Automation)

</details>

<details>
<summary><strong>☕ Open Cafeteria (OC)</strong></summary>

- ☕ OC (Open Cafeteria)
- 🌅 OC Balcony (360° panorama)

</details>

<details>
<summary><strong>📍 General</strong></summary>

- 🏫 Front Academic Block
- 🧘 Dhyan Kaksh (Meditation Hall)

</details>

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev) with [TypeScript 5](https://typescriptlang.org) |
| **Build Tool** | [Vite 5](https://vitejs.dev) with SWC |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| **Routing** | [React Router DOM v6](https://reactrouter.com) |
| **UI Components** | [Radix UI](https://radix-ui.com) primitives |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Panoramas** | Google Street View Embeds + [Kuula](https://kuula.co) 360° |
| **Speech** | Native Web Speech API (TTS + STT — no API key needed) |
| **State Management** | React hooks (`useState`, `useRef`, `useCallback`) |
| **Testing** | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) `v18+` and `npm` installed
- A modern browser (Chrome or Edge recommended for full speech support)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AdityaaSingh74/VirtualScout.git

# 2. Navigate into the project
cd VirtualScout

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:8080** (or the next available port).

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy anywhere.

---

## 📁 Project Structure

```
VirtualScout/
├── public/
│   ├── favicon.ico          # App favicon
│   └── avatar.png           # Mascot image asset
├── src/
│   ├── components/
│   │   ├── AvatarGuide.tsx  # 3D Holographic AI mascot (animated)
│   │   ├── ChatInterface.tsx# Main chat UI + AI brain + speech integration
│   │   ├── ChatMessage.tsx  # Individual message bubbles with markdown + typewriter
│   │   ├── LocationMenu.tsx # Location category dropdown menu
│   │   ├── NavLink.tsx      # Navigation link component
│   │   ├── StreetViewEmbed.tsx # 360° panorama iframe renderer
│   │   ├── TourLayout.tsx   # Main tour page layout (360° + chat panel)
│   │   ├── WelcomeHero.tsx  # Landing/welcome screen
│   │   └── ui/              # shadcn/ui base components
│   ├── data/
│   │   └── campusLocations.ts # All 20+ campus locations + keyword matching
│   ├── hooks/
│   │   └── useSpeech.ts     # Custom hook: TTS + STT with retry logic
│   ├── pages/
│   │   ├── Index.tsx        # App entry page
│   │   └── NotFound.tsx     # 404 page
│   ├── App.tsx              # Root app with routing
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles + design tokens
├── index.html               # HTML template with SEO meta tags
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # Tailwind theme customization
└── package.json
```

---

## 🎤 Voice Features

VirtualScout uses the **browser-native Web Speech API** — no external API keys or paid services required.

### Text-to-Speech (Scout speaks)
- Scout automatically reads every response aloud
- Smart voice selection picks the best available English voice (prefers Google/Samantha voices)
- Cleans markdown, emojis, and symbols before speaking
- Built-in retry loop handles browsers that load voices asynchronously
- Toggle Scout's voice on/off using the 🔊 button in the chat toolbar

### Speech-to-Text (You speak)
- Click the 🎤 microphone icon in the chat input
- Speak naturally — your words are transcribed directly into the chat
- Press Enter or send to submit your voice message

> **Note:** Speech features work best in **Google Chrome** or **Microsoft Edge**. Safari has partial support. Firefox does not support Speech Recognition.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub (already done ✅)
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import from GitHub
3. Select the `VirtualScout` repository
4. Vercel auto-detects **Vite** — leave all settings as default
5. Click **Deploy**

**Important:** Add a `vercel.json` to handle React Router client-side routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Deploy via CLI

```bash
npm install -g vercel
vercel --prod
```

---

## 🗺️ Roadmap

- [ ] **Interactive 2D Mini-Map** — Click buildings to navigate
- [ ] **Voice Wake Word** — "Hey Scout, take me to the library"
- [ ] **LLM Integration** — Plug in OpenAI/Gemini for open-ended conversations
- [ ] **Campus Scavenger Hunt** — Gamified orientation quests with badges
- [ ] **WebXR / VR Mode** — Full VR headset support via WebXR API
- [ ] **Live Campus Data** — OC menu, event calendar, real-time weather
- [ ] **Multiplayer Guided Tours** — Live group tours hosted by student ambassadors

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Aditya Singh**
- GitHub: [@AdityaaSingh74](https://github.com/AdityaaSingh74)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ for students, by a student.</sub>
</div>
