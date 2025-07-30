# 🎨 Webtoys 🧸

<div align="center">

**A powerful visual editor for creating and customizing interactive web widgets**

[![Version](https://img.shields.io/badge/version-1.0.4-blue.svg)](./version.txt)
[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed.svg)](./Dockerfile)

### 🚀 [**Use it now**](https://www.webtoy.io) 🚀

[✨ Features](#-features) • [🚀 Getting Started](#-getting-started) • [🎨 Available Webtoys](#-available-webtoys) • [🛠️ Development](#️-development) • [🐳 Docker](#-docker)

</div>

---

## 🎯 About

**Webtoys** is a **visual widget builder** that lets you create and customize interactive web widgets, then embed them anywhere using URL parameters.

### How it works:

1. **Customize** your widget in the visual editor (colors, themes, content, behavior...)
2. **Get a unique URL** for your configured widget  
3. **Embed anywhere** using that URL (websites, streams, dashboards, etc.)

### Perfect for:
- **Digital signage** - Real-time information displays
- **Dashboards** - Custom data visualization widgets
- **Streamers** - Custom widgets for Twitch/YouTube streams
- **Websites** - Weather, clock, and content widgets  

Think of it as **Canva for web widgets** - design visually, get a URL, use everywhere! 🚀

## ✨ Features

- **🎨 Visual Editor**: Intuitive three-panel interface for seamless widget creation
- **⚡ Real-time Preview**: See your changes instantly as you customize
- **🎯 Multiple Widget Types**: Clock, countdown, text, weather, RSS feeds, and more
- **🌈 Rich Theming**: Beautiful pre-built themes with full customization options
- **💾 Auto-save**: Persistent editor state with automatic saving
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🚀 Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript

## 🎨 Available Webtoys

### 🕐 Clock Widget
Display time with multiple formats, timezones, and visual themes
- **Digital & Analog modes** - Choose your preferred time display
- **Multiple timezones** - Support for world clocks
- **Beautiful themes** - Modern, Dark, Neon, Minimal, and Retro styles

### ⏰ Countdown Timer
Beautiful countdown timer for events and deadlines
- **Custom messages** - Add personalized text
- **Event images** - Include photos for your countdown
- **Multiple themes** - Modern Blue, Dark, Sunset, Ocean, and Forest themes
- **Flexible targeting** - Set any future date and time

### 📝 Simple Text
Customizable text display with advanced styling options
- **Rich typography** - Multiple fonts and sizes (2px to 512px)
- **Color customization** - Full color picker support
- **Text alignment** - Left, center, and right alignment
- **Scrolling effects** - Horizontal and vertical scrolling with speed control

### 🌤️ Weather Screen
Display current weather information with beautiful visuals
- **Location-based** - Any city or location worldwide
- **Visual templates** - Modern, Dark, Sunset, Ocean, and Forest themes
- **Smooth animations** - Optional animated weather effects

### 📡 RSS Feed
Display RSS feed content with customizable templates
- **Any RSS source** - Support for all standard RSS feeds
- **Custom templates** - Use `{{ title }}` and `{{ description }}` placeholders
- **Scrolling ticker** - Horizontal and vertical scrolling options
- **Auto-refresh** - Configurable refresh intervals (30s to 1 hour)
- **Rich formatting** - Custom fonts, colors, and sizes

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and **pnpm** (recommended) or npm
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/obscreen/webtoys.git
   cd webtoys
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   yarn install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   yarn dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to start creating!

## 🎮 How to Use

1. **Browse the Catalog** - Explore available webtoys in the left panel
2. **Add a Webtoy** - Click on any webtoy to add it to your workspace
3. **Customize** - Use the right panel to modify appearance, content, and behavior
4. **Preview** - See your changes in real-time in the center panel
5. **Export** - Save your creations or deploy them to your website

### Editor Interface

- **🗂️ Left Panel (Catalog)**: Browse and search available webtoys
- **🖥️ Center Panel (Editor)**: Live preview and tab management
- **⚙️ Right Panel (Customizer)**: Configuration options and settings

## 🛠️ Development

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, styled-components
- **UI Components**: Radix UI primitives
- **State Management**: React Context API
- **Build Tools**: Modern ES modules with hot reload

### Project Structure

```
webtoys/
├── app/                    # Next.js app directory
├── components/
│   ├── common/            # Shared components
│   ├── ui/                # UI component library
│   └── webtoys/           # Individual webtoy implementations
├── editor/                # Editor interface components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── types/                 # TypeScript type definitions
└── utils/                 # Helper functions
```

### Adding New Webtoys

1. Create a new directory in `components/webtoys/`
2. Implement the webtoy component following existing patterns
3. Add a `webtoy.json` configuration file
4. Register the webtoy in `lib/webtoy-loader.ts`

### Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

## 🐳 Docker

### Quick Start with Public Image

The easiest way to run Webtoys is using our pre-built Docker image from Docker Hub:

```bash
# Pull and run the latest image
docker run -p 3000:3000 obscreen/webtoys:latest
```

Open your browser to [http://localhost:3000](http://localhost:3000) and start creating!

### Development with Docker

```bash
# Build the image locally
docker build -t webtoys .

# Run the container
docker run -p 3000:3000 webtoys
```

### Production Deployment

```bash
# Using docker-compose
docker-compose --profile prod up -d
```

The application includes automated CI/CD with GitHub Actions for seamless deployment.

## 📁 Key Files

- **`components/webtoys/`** - Individual webtoy implementations
- **`editor/WebtoysApp/`** - Main editor interface
- **`lib/webtoy-loader.ts`** - Webtoy loading and registration
- **`types/webtoy.ts`** - Core type definitions
- **`docker-compose.yml`** - Docker deployment configuration

## 🤝 Contributing

We welcome contributions! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests
- 📚 Improve documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">

**WebToys is an [Obscreen](https://www.obscreen.io) project**

[⭐ Star us on GitHub](../../) • [🐛 Report Issue](../../issues) • [💬 Discussions](../../discussions)

</div> 