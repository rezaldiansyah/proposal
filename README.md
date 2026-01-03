# Habits Media Presentation Platform

Web-based presentation directory for Habits Media Network. Create interactive, code-based presentations that can be deployed to GitHub Pages.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📁 Project Structure

```
presentation/
├── docs/                           # Documentation
│   └── research-notes.md          # Reference materials
├── presentations/                  # All presentations
│   └── annual-meeting-2026/       # Example presentation
├── public/assets/                  # Static assets
├── src/
│   ├── js/                        # JavaScript files
│   ├── styles/                    # CSS files
│   └── ...
├── index.html                      # Landing page
├── package.json
└── vite.config.js
```

## 📊 Tech Stack

- **Vite** - Build tool & dev server
- **Reveal.js** - Presentation framework
- **Apache ECharts** - Interactive charts
- **GSAP** - Animations

## ➕ Adding New Presentations

1. Create folder in `presentations/[name]/`
2. Add `index.html` with Reveal.js structure
3. Import presentation styles: `@import '/src/styles/presentation.css'`
4. Add card to `index.html` directory grid

## 🌐 GitHub Pages Deployment

1. Push to GitHub repository
2. Run `npm run deploy`
3. Enable GitHub Pages in Settings → Pages → Source: `gh-pages`
4. Access at `https://[username].github.io/presentation/`

## 📝 License

© 2026 Habits Media Network. All rights reserved.
