# ⚡ Code Editor - Browser-Based IDE

<div align="center">

![Code Editor Banner](https://img.shields.io/badge/Code%20Editor-Live-brightgreen?style=for-the-badge&logo=react&logoColor=white)
[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Now-blue?style=for-the-badge)](https://code-editor-project-fx3t.vercel.app/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

**A powerful, browser-based code editor with live preview for JavaScript, HTML, and CSS**

[🎮 Live Demo](https://code-editor-project-fx3t.vercel.app/) • [📖 Features](#-features) • [🚀 Quick Start](#-quick-start) • [📸 Screenshots](#-screenshots)

</div>

---

## 🌟 Features

### 🎨 **Multi-Language Support**
- ⚡ **JavaScript** - Full execution in browser with console output
- 🌐 **HTML** - Live visual preview with real-time rendering
- 🎨 **CSS** - Applied to sample template for instant preview

### 🛠️ **Powerful Editor**
- 📝 Line numbers with syntax highlighting
- ⌨️ 15+ keyboard shortcuts (VS Code style)
- 🔍 Find & replace functionality
- ↩️ Unlimited undo/redo
- 📋 Code copy & download
- 💾 Auto-save to browser storage

### 🎭 **Dual Theme Support**
- 🌙 **Dark Mode** - Easy on the eyes (default)
- ☀️ **Light Mode** - Clean and bright
- Instant theme switching

### 📱 **Responsive Design**
- 💻 Desktop optimized
- 📱 Tablet friendly  
- 📱 Mobile responsive
- ↔️ Resizable output panel

### ⚡ **Live Preview**
- 🖥️ Console output for JavaScript
- 🌐 Real-time HTML rendering in iframe
- 🎨 CSS preview with sample components
- 🔄 Refresh & open in new tab options

### 📊 **Event Dashboard**
- 👁️ Real-time event logging
- ⌨️ Keyboard tracking
- 🐛 Debug assistance
- 📈 History tracking

---

## 🎯 Demo

### 🔗 **Live Application**
👉 **[https://code-editor-project-fx3t.vercel.app/](https://code-editor-project-fx3t.vercel.app/)**

Try it now - no installation required!

---

## 📸 Screenshots

### Dark Theme 🌙
```
┌─────────────────────────────────────────────────────┐
│  ⚡ Code Editor            [💾 Download] [☀️ Light]  │
├──────────────────────┬──────────────────────────────┤
│                      │                              │
│   📝 JavaScript      │      📊 Events               │
│   Code Editor        │      Real-time Logging       │
│                      │                              │
├──────────────────────┴──────────────────────────────┤
│                                                      │
│   🖥️ Console / 🌐 Live Preview                      │
│   Output with syntax highlighting                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Light Theme ☀️
```
Clean, professional interface with white background
Perfect for daytime coding sessions
```

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** 16.x or higher
- **npm** 8.x or higher
- **Docker** (optional, for containerized deployment)

### 💻 Local Development

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd code-editor-project

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open in browser
# The app will open at http://localhost:3000
```

### 🐳 Docker Deployment

```bash
# 1. Build and start with Docker Compose
docker-compose up --build

# 2. Open in browser
# Visit http://localhost:3000

# 3. Stop the container
docker-compose down
```

---

## ⌨️ Keyboard Shortcuts

### 📁 File Operations
| Shortcut | Action |
|----------|--------|
| `Ctrl + S` | Save code |
| `Ctrl + Enter` | Run code |

### ✏️ Editing
| Shortcut | Action |
|----------|--------|
| `Ctrl + Z` | Undo |
| `Ctrl + Shift + Z` | Redo |
| `Ctrl + /` | Toggle comment |
| `Ctrl + D` | Duplicate line |
| `Ctrl + L` | Delete line |

### 🔍 Navigation
| Shortcut | Action |
|----------|--------|
| `Ctrl + F` | Find in code |
| `Ctrl + A` | Select all |
| `Tab` | Indent (2 spaces) |
| `Shift + Tab` | Outdent |
| `Ctrl + ]` | Indent line |
| `Ctrl + [` | Outdent line |
| `Enter` | Auto-indent new line |

### ⚡ Advanced
| Shortcut | Action |
|----------|--------|
| `Ctrl + K → C` | Chord shortcut |
| `Shift + ?` | Show help |
| `Esc` | Close dialogs |

> 💡 **Mac Users:** Use `Cmd` instead of `Ctrl`

---

## 📦 Project Structure

```
code-editor-project/
├── 📂 src/
│   ├── App.js              # Main React component (955 lines)
│   ├── App.css             # Styling with themes (671 lines)
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── 📂 public/
│   └── index.html          # HTML template
├── 📄 package.json         # Dependencies
├── 📄 Dockerfile           # Docker configuration
├── 📄 docker-compose.yml   # Docker Compose setup
├── 📄 .env.example         # Environment variables template
└── 📄 README.md           # This file
```

---

## 🎨 Features in Detail

### 🔧 JavaScript Execution
- ✅ Full ES2024 support
- ✅ Console.log, warn, error, info
- ✅ Execution time tracking
- ✅ Error handling with stack traces
- ✅ Return value display

### 🌐 HTML Preview
- ✅ Real-time iframe rendering
- ✅ Full CSS & JavaScript support
- ✅ Interactive elements work
- ✅ Error overlay for debugging
- ✅ Refresh & new tab options

### 🎨 CSS Preview
- ✅ Applied to sample template
- ✅ Cards, buttons, forms showcase
- ✅ Responsive grid layout
- ✅ Animation support
- ✅ Real-time updates

---

## 🛡️ Technologies Used

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) | Frontend framework |
| ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Programming language |
| ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3) | Styling |
| ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white) | Containerization |
| ![Vercel](https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel) | Deployment |

</div>

---

## 👨‍💻 Author

**Mohammad Riyaz**

## 🙏 Acknowledgments

- Inspired by VS Code, CodePen, and JSFiddle
- Built with React and modern web technologies
- Deployed on Vercel for lightning-fast performance

---
### ⭐ Star this repo if you found it helpful!

**Made with ❤️ and React**

[⬆ Back to Top](#-code-editor---browser-based-ide)
