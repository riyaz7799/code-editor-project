# High-Performance Code Editor with Advanced Keyboard Event Handling

A professional browser-based code editor built with React, featuring VS Code-style keyboard shortcuts, real-time event logging, and JavaScript code execution capabilities.

![Project Status](https://img.shields.io/badge/status-complete-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![Docker](https://img.shields.io/badge/Docker-ready-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Architecture](#architecture)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Requirements Compliance](#requirements-compliance)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

This project is a fully functional, browser-based code editor that demonstrates advanced keyboard event handling, state management, and performance optimization techniques. Inspired by VS Code, it provides a seamless coding experience with sophisticated keyboard shortcuts, undo/redo functionality, and real-time event debugging capabilities.

**Key Highlights:**
- ✅ All 13 core requirements implemented
- ✅ Professional VS Code-inspired UI
- ✅ JavaScript code execution in browser
- ✅ Multi-language syntax support
- ✅ Fully Dockerized for easy deployment

---

## ✨ Features

### Core Features (Required)

1. **Advanced Keyboard Shortcuts**
   - Save: `Ctrl+S` / `Cmd+S`
   - Undo: `Ctrl+Z` / `Cmd+Z`
   - Redo: `Ctrl+Shift+Z` / `Cmd+Shift+Z`
   - Indent: `Tab` (adds 2 spaces)
   - Outdent: `Shift+Tab` (removes 2 spaces)
   - Toggle Comment: `Ctrl+/` / `Cmd+/`
   - Auto-indent on Enter: Maintains current indentation level
   - Chord Shortcut: `Ctrl+K` then `Ctrl+C` (within 2 seconds)

2. **State Management**
   - Full undo/redo history stack
   - Persistent state tracking
   - Exposed verification functions for testing

3. **Real-time Event Dashboard**
   - Logs `keydown`, `keyup`, `input` events
   - Displays modifier keys (Ctrl, Meta, Shift)
   - Scrollable event history
   - Toggleable visibility

4. **Performance Optimization**
   - Debounced syntax highlighting (150ms delay)
   - Prevents performance degradation during rapid typing
   - Efficient event handling

5. **Cross-Platform Support**
   - Automatic platform detection (Windows/Linux/Mac)
   - Works with both Ctrl and Cmd modifiers

### Bonus Features

6. **JavaScript Code Execution**
   - Run JavaScript code directly in browser
   - Real-time console output
   - Error handling and display
   - `Ctrl+Enter` quick run shortcut

7. **Multi-Language Support**
   - JavaScript (fully executable)
   - HTML with embedded JavaScript (fully executable)
   - Python, Java, C++ (syntax examples)
   - CSS (styling reference)

8. **Professional UI**
   - VS Code-inspired dark theme
   - Line numbers
   - Syntax-friendly monospace font
   - Smooth animations and transitions
   - Responsive layout

9. **Developer Tools**
   - Console output panel
   - Clear console functionality
   - Language selector
   - Run button with visual feedback

---

## 🛠 Tech Stack

- **Frontend Framework:** React 18.x
- **Styling:** CSS3 (Custom, no external libraries)
- **Containerization:** Docker & Docker Compose
- **Build Tool:** Create React App
- **Node.js:** 18.x (Alpine)

---

## 🚀 Getting Started

### Prerequisites

- Docker Desktop installed and running
- Git (for cloning the repository)

### Installation & Setup

1. **Clone the repository:**
```bash
   git clone <repository-url>
   cd code-editor-project
```

2. **Environment Setup:**
```bash
   # Copy the example environment file
   cp .env.example .env
```

3. **Build and Run with Docker:**
```bash
   docker-compose up --build
```

4. **Access the application:**
```
   Open your browser and navigate to: http://localhost:3000
```

### Alternative: Local Development (Without Docker)
```bash
# Install dependencies
npm install

# Start development server
npm start

# Application will be available at http://localhost:3000
```

---

## 📖 Usage

### Basic Usage

1. **Writing Code:**
   - Click in the editor area to start typing
   - Use keyboard shortcuts for efficient editing
   - Watch the event dashboard for real-time feedback

2. **Running Code:**
   - Select "JavaScript" from the language dropdown
   - Write or paste your JavaScript code
   - Click **▶ Run** button or press `Ctrl+Enter`
   - View output in the console panel below

3. **Toggling Event Dashboard:**
   - Click **👁️ Hide/Show Events** button to toggle dashboard
   - Dashboard is visible by default for debugging

### Example Code
```javascript
// Try this in the editor:
console.log('Hello, Code Editor!');

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Doubled:', doubled);

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('Fibonacci(10):', fibonacci(10));
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+S` / `Cmd+S` | Save | Triggers save action (logs to dashboard) |
| `Ctrl+Z` / `Cmd+Z` | Undo | Reverts to previous state |
| `Ctrl+Shift+Z` / `Cmd+Shift+Z` | Redo | Reapplies undone change |
| `Tab` | Indent | Adds 2 spaces at line beginning |
| `Shift+Tab` | Outdent | Removes 2 spaces from line beginning |
| `Enter` | Auto-indent | Creates new line with same indentation |
| `Ctrl+/` / `Cmd+/` | Toggle Comment | Adds/removes `//` at line start |
| `Ctrl+K` then `Ctrl+C` | Chord Shortcut | Multi-step shortcut (within 2 seconds) |
| `Ctrl+Enter` | Run Code | Executes JavaScript code |

---

## 🏗 Architecture

### Component Structure
```
App (Main Component)
├── Editor Section
│   ├── Editor Header (Language selector, Run button, Toggle button)
│   ├── Line Numbers
│   └── Textarea (Code input)
├── Event Dashboard (Toggleable)
│   └── Event Log List
├── Console Section
│   ├── Console Header
│   └── Console Output
└── Status Bar
```

### State Management

**Core States:**
- `content`: Current editor text
- `undoStack`: Array of previous states
- `redoStack`: Array of undone states
- `eventLogs`: Keyboard event history
- `consoleOutput`: Code execution results
- `showDashboard`: Toggle state for event dashboard

**Performance Optimizations:**
- Debounced syntax highlighting (150ms)
- Event log limiting (last 50 events)
- Efficient re-rendering with React hooks

### Event Flow
```
User Input → Event Listeners → State Update → Re-render
                ↓
           Event Dashboard
                ↓
           History Stack
```

---

## 🧪 Testing

### Manual Testing

1. **Test Keyboard Shortcuts:**
```javascript
   // In browser console
   document.querySelector('[data-test-id="editor-input"]').focus()
   // Then try all keyboard shortcuts
```

2. **Test Exposed Functions:**
```javascript
   // In browser console
   window.getEditorState()
   // Returns: { content: "...", historySize: number }
   
   window.getHighlightCallCount()
   // Returns: number
```

3. **Test Event Logging:**
   - Type in editor
   - Observe events in dashboard
   - Verify event types and key values

### Automated Testing Verification

All required `data-test-id` attributes are present:
- `editor-container`
- `editor-input`
- `event-dashboard`
- `event-log-list`
- `event-log-entry`

---

## 📁 Project Structure
```
code-editor-project/
├── README.md                    # This file
├── docker-compose.yml          # Docker orchestration
├── Dockerfile                  # Docker image definition
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # Node dependencies
├── package-lock.json          # Dependency lock file
├── public/
│   └── index.html             # HTML entry point
└── src/
    ├── App.js                 # Main React component
    ├── App.css                # Component styles
    ├── index.js               # React entry point
    └── index.css              # Global styles
```

---

## ✅ Requirements Compliance

### Core Requirements Status

| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | UI Layout with test IDs | ✅ Complete | All data-test-id attributes present |
| 2 | Event logging dashboard | ✅ Complete | Real-time keyboard event tracking |
| 3 | Ctrl+S / Cmd+S save | ✅ Complete | Prevents browser dialog |
| 4 | Tab indentation | ✅ Complete | 2 spaces, focus retained |
| 5 | Auto-indent on Enter | ✅ Complete | Maintains indentation level |
| 6 | Undo/Redo stack | ✅ Complete | Full history management |
| 7 | Toggle comment | ✅ Complete | Adds/removes // |
| 8 | Chord shortcut | ✅ Complete | Ctrl+K, Ctrl+C with 2s timeout |
| 9 | Input event handling | ✅ Complete | Typing and pasting supported |
| 10 | Debounced highlighting | ✅ Complete | 150ms debounce interval |
| 11 | Cross-platform modifiers | ✅ Complete | Ctrl and Cmd support |
| 12 | Docker containerization | ✅ Complete | Full Docker setup with healthcheck |
| 13 | .env.example file | ✅ Complete | Documents all variables |

**Completion: 13/13 (100%)**

### Exposed Functions
```javascript
// Verification functions available on window object
window.getEditorState()      // Returns editor state
window.getHighlightCallCount() // Returns highlight call count
```

---

## 🎨 Design Decisions

### Why React?
- Component-based architecture for maintainability
- Efficient re-rendering with Virtual DOM
- Strong ecosystem and community support
- Built-in hooks for state management

### Why Textarea over ContentEditable?
- Simpler cursor management
- Better browser compatibility
- Easier state control
- More predictable behavior

### Why Docker?
- Consistent development environment
- Easy deployment
- Isolated dependencies
- Cross-platform compatibility

### Event Dashboard Visibility
- Visible by default per requirements
- Toggleable for better UX
- Essential for debugging and verification
- Can be hidden for production use

---

## 🔮 Future Enhancements

### Potential Improvements

1. **Advanced Features:**
   - Syntax highlighting with color coding
   - Code completion / IntelliSense
   - Multiple file tabs
   - File import/export
   - Theme customization

2. **Backend Integration:**
   - Python/Java/C++ code execution
   - Code compilation service
   - Save to cloud storage
   - User authentication

3. **Collaboration:**
   - Real-time collaborative editing
   - Code sharing via URL
   - Version control integration

4. **Performance:**
   - Virtual scrolling for large files
   - Web Workers for code execution
   - IndexedDB for local storage

5. **Accessibility:**
   - Screen reader optimization
   - High contrast mode
   - Keyboard navigation improvements

---

## 🐛 Known Limitations

1. **Code Execution:**
   - Only JavaScript and HTML can execute in browser
   - Python/Java/C++ require backend compiler (not implemented)
   - No sandboxing for executed code

2. **Editor Features:**
   - No syntax highlighting colors (debouncing implemented)
   - Single file editing only
   - No code folding

3. **Browser Support:**
   - Optimized for modern browsers (Chrome, Firefox, Edge)
   - Limited IE11 support

---

## 📝 Environment Variables

See `.env.example` for all available environment variables:
```bash
# Application Port
APP_PORT=3000

# Node Environment
NODE_ENV=development
```

---

## 🤝 Contributing

This is a project submission. For educational purposes only.

---

## 📜 License

This project is created for educational purposes as part of a coding assignment.

---

## 👤 Author

**Mohammad Riyaz**

- Project: High-Performance Code Editor
- Submitted: February 2026
- Course: Frontend Development

---

## 🙏 Acknowledgments

- Inspired by VS Code's keyboard event handling
- Requirements provided by course instructors
- React documentation and community
- Docker documentation

---

## 📞 Support

For questions or issues related to this project:

1. Check the [Testing](#testing) section
2. Review [Keyboard Shortcuts](#keyboard-shortcuts)
3. Verify Docker is running properly
4. Check browser console for errors

---

## 🎯 Quick Start Summary
```bash
# 1. Clone repository
git clone <repository-url>

# 2. Navigate to project
cd code-editor-project

# 3. Run with Docker
docker-compose up --build

# 4. Open browser
# Visit: http://localhost:3000

# 5. Start coding!
```

---

**Built with ❤️ using React and Docker**

---

*Last Updated: February 2026*