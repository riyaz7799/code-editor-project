import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  const [undoStack, setUndoStack] = useState(['']);
  const [redoStack, setRedoStack] = useState([]);
  const [eventLogs, setEventLogs] = useState([]);
  const [chordState, setChordState] = useState(null);
  const [highlightCount, setHighlightCount] = useState(0);
  const [lineNumbers, setLineNumbers] = useState(['1']);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [showDashboard, setShowDashboard] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showFind, setShowFind] = useState(false);
  const [findText, setFindText] = useState('');
  const [findCount, setFindCount] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [panelMode, setPanelMode] = useState(() => sessionStorage.getItem('panelMode') || 'console');
  const [previewSrc, setPreviewSrc] = useState(() => sessionStorage.getItem('previewSrc') || '');
  const [lastRunLang, setLastRunLang] = useState(() => sessionStorage.getItem('lastRunLang') || '');

  const editorRef = useRef(null);
  const chordTimerRef = useRef(null);
  const highlightTimerRef = useRef(null);
  const findInputRef = useRef(null);
  const iframeRef = useRef(null);

  // ─────────────────────────────────────────
  // LANGUAGE TEMPLATES
  // ─────────────────────────────────────────
  const languageTemplates = {
    javascript: `// JavaScript - Fully Executable in Browser
// Press Ctrl+Enter or click ▶ Run!

console.log('=== JavaScript Editor ===');

// 1. Variables
const language = 'JavaScript';
let version = 'ES2024';
console.log('Language:', language, '| Version:', version);

// 2. Arrays
const fruits = ['Apple', 'Banana', 'Orange', 'Mango'];
console.log('\\n--- Arrays ---');
fruits.forEach((fruit, i) => console.log(\`  \${i + 1}. \${fruit}\`));

// 3. Functions
console.log('\\n--- Functions ---');
function calculateSum(a, b) { return a + b; }
const square = x => x * x;
const cube = x => x * x * x;
console.log('Sum(10, 5):', calculateSum(10, 5));
console.log('Square(7):', square(7));
console.log('Cube(4):', cube(4));

// 4. Objects
console.log('\\n--- Objects ---');
const person = {
  name: 'Developer',
  age: 25,
  skills: ['JavaScript', 'HTML', 'CSS'],
  greet() { return \`Hello! I am \${this.name}\`; }
};
console.log(person.greet());
console.log('Skills:', person.skills.join(', '));

// 5. Array Methods
console.log('\\n--- Array Methods ---');
const numbers = [1,2,3,4,5,6,7,8,9,10];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const total = numbers.reduce((a, b) => a + b, 0);
console.log('Doubled:', doubled.join(', '));
console.log('Evens:', evens.join(', '));
console.log('Total:', total);

// 6. Classes
console.log('\\n--- Classes ---');
class Rectangle {
  constructor(w, h) { this.w = w; this.h = h; }
  area() { return this.w * this.h; }
  perimeter() { return 2 * (this.w + this.h); }
  toString() { return \`Rectangle(\${this.w}x\${this.h})\`; }
}
const rect = new Rectangle(10, 5);
console.log(rect.toString());
console.log('Area:', rect.area(), '| Perimeter:', rect.perimeter());

// 7. Destructuring & Spread
console.log('\\n--- Destructuring ---');
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log('First:', first, '| Second:', second, '| Rest:', rest.join(', '));
const merged = [...[1,2,3], ...[4,5,6]];
console.log('Merged:', merged.join(', '));

// 8. Math & Date
console.log('\\n--- Math ---');
console.log('PI:', Math.PI.toFixed(4));
console.log('Sqrt(144):', Math.sqrt(144));
console.log('Date:', new Date().toLocaleString());

// 9. Algorithms
console.log('\\n--- Algorithms ---');
function fibonacci(n) {
  const fib = [0, 1];
  for(let i = 2; i < n; i++) fib[i] = fib[i-1] + fib[i-2];
  return fib.slice(0, n);
}
function isPrime(n) {
  if(n <= 1) return false;
  for(let i = 2; i <= Math.sqrt(n); i++) if(n % i === 0) return false;
  return true;
}
const primes = Array.from({length: 20}, (_, i) => i+2).filter(isPrime);
console.log('Fibonacci(8):', fibonacci(8).join(', '));
console.log('Primes < 20:', primes.join(', '));
console.log('\\n=== Done! ===');`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live HTML Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      color: #fff;
      min-height: 100vh;
      padding: 20px;
    }
    h1 {
      text-align: center;
      font-size: 2em;
      margin-bottom: 20px;
      background: linear-gradient(135deg, #e94560, #f97316);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }
    .card {
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
    }
    .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(233,69,96,0.25); }
    .card .icon { font-size: 2em; margin-bottom: 8px; }
    .card h3 { color: #e94560; font-size: 0.9em; margin-bottom: 4px; }
    .card p { font-size: 0.75em; opacity: 0.7; }
    .section {
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 14px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .section-title { color: #4ec9b0; font-weight: 700; margin-bottom: 10px; font-size: 0.9em; }
    .btn {
      background: linear-gradient(135deg, #e94560, #c62a47);
      color: #fff; border: none;
      padding: 8px 16px; border-radius: 20px;
      cursor: pointer; font-weight: 600; font-size: 12px;
      margin: 3px; transition: all 0.25s;
    }
    .btn:hover { transform: scale(1.06); box-shadow: 0 4px 14px rgba(233,69,96,0.45); }
    .btn.blue { background: linear-gradient(135deg, #007acc, #0098ff); }
    .counter-num { font-size: 3em; font-weight: 800; color: #e94560; text-align: center; padding: 8px; }
    .bar-row { margin: 6px 0; }
    .bar-label { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px; }
    .bar-track { background: rgba(255,255,255,0.08); border-radius: 8px; height: 13px; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 8px; transition: width 0.5s ease; }
    .js-fill { background: linear-gradient(to right, #f7df1e, #f0c800); }
    .html-fill { background: linear-gradient(to right, #e34f26, #f06529); }
    .css-fill { background: linear-gradient(to right, #264de4, #2965f1); }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th { background: rgba(78,201,176,0.25); padding: 8px 10px; text-align: left; }
    td { padding: 7px 10px; border-bottom: 1px solid rgba(255,255,255,0.07); }
    tr:hover td { background: rgba(255,255,255,0.04); }
    #output {
      background: rgba(0,0,0,0.35); border-radius: 8px;
      padding: 10px; margin-top: 8px;
      font-family: monospace; color: #4ade80;
      font-size: 12px; min-height: 40px; line-height: 1.6;
    }
  </style>
</head>
<body>
  <h1>🚀 Live HTML Preview</h1>

  <div class="grid">
    <div class="card"><div class="icon">⚡</div><h3>JavaScript</h3><p>Real execution</p></div>
    <div class="card"><div class="icon">🌐</div><h3>HTML</h3><p>Visual preview</p></div>
    <div class="card"><div class="icon">🎨</div><h3>CSS</h3><p>Applied styles</p></div>
    <div class="card"><div class="icon">🔥</div><h3>Interactive</h3><p>Fully functional!</p></div>
  </div>

  <div class="section">
    <div class="section-title">🎮 Counter</div>
    <div class="counter-num" id="counter">0</div>
    <div style="text-align:center">
      <button class="btn" onclick="changeCount(-5)">-5</button>
      <button class="btn" onclick="changeCount(-1)">-1</button>
      <button class="btn blue" onclick="resetCount()">Reset</button>
      <button class="btn" onclick="changeCount(1)">+1</button>
      <button class="btn" onclick="changeCount(5)">+5</button>
    </div>
  </div>

  <div class="section">
    <div class="section-title">📊 Skill Bars</div>
    <div class="bar-row">
      <div class="bar-label"><span>JavaScript</span><span id="js-pct">85%</span></div>
      <div class="bar-track"><div class="bar-fill js-fill" id="js-bar" style="width:85%"></div></div>
    </div>
    <div class="bar-row">
      <div class="bar-label"><span>HTML</span><span id="html-pct">92%</span></div>
      <div class="bar-track"><div class="bar-fill html-fill" id="html-bar" style="width:92%"></div></div>
    </div>
    <div class="bar-row">
      <div class="bar-label"><span>CSS</span><span id="css-pct">78%</span></div>
      <div class="bar-track"><div class="bar-fill css-fill" id="css-bar" style="width:78%"></div></div>
    </div>
    <button class="btn blue" style="margin-top:8px" onclick="randomizeBars()">🎲 Randomize</button>
  </div>

  <div class="section">
    <div class="section-title">📋 Table</div>
    <table>
      <thead><tr><th>Language</th><th>Year</th><th>Browser?</th></tr></thead>
      <tbody>
        <tr><td>JavaScript</td><td>1995</td><td>✅ Yes</td></tr>
        <tr><td>HTML</td><td>1993</td><td>✅ Yes</td></tr>
        <tr><td>CSS</td><td>1996</td><td>✅ Yes</td></tr>
      </tbody>
    </table>
  </div>

  <div class="section">
    <div class="section-title">⚡ Live Output</div>
    <button class="btn" onclick="showCurrentTime()">🕐 Time</button>
    <button class="btn" onclick="showSquares()">🔢 Squares</button>
    <button class="btn" onclick="showRandomNums()">🎲 Random</button>
    <button class="btn blue" onclick="clearOutput()">🗑️ Clear</button>
    <div id="output">Click a button above...</div>
  </div>

  <script>
    // All functions defined at top level - fully self contained
    var counterVal = 0;

    function changeCount(val) {
      counterVal += val;
      document.getElementById('counter').textContent = counterVal;
    }

    function resetCount() {
      counterVal = 0;
      document.getElementById('counter').textContent = 0;
    }

    function randomizeBars() {
      var ids = ['js', 'html', 'css'];
      ids.forEach(function(id) {
        var v = Math.floor(Math.random() * 35) + 60;
        document.getElementById(id + '-bar').style.width = v + '%';
        document.getElementById(id + '-pct').textContent = v + '%';
      });
    }

    function showCurrentTime() {
      var n = new Date();
      document.getElementById('output').innerHTML =
        '📅 ' + n.toLocaleDateString() + '&nbsp;&nbsp;⏰ ' + n.toLocaleTimeString();
    }

    function showSquares() {
      var result = [1,2,3,4,5].map(function(i) { return i + '² = ' + (i*i); }).join('  |  ');
      document.getElementById('output').textContent = result;
    }

    function showRandomNums() {
      var nums = [];
      for(var i = 0; i < 6; i++) nums.push(Math.floor(Math.random() * 100));
      var sum = nums.reduce(function(a,b){return a+b;}, 0);
      document.getElementById('output').textContent =
        'Numbers: ' + nums.join(', ') + '  |  Max: ' + Math.max.apply(null, nums) + '  |  Sum: ' + sum;
    }

    function clearOutput() {
      document.getElementById('output').textContent = 'Cleared!';
    }
  </script>
</body>
</html>`,

    css: `/* CSS Preview Demo */
/* Click ▶ Run — see your CSS applied to a real HTML template! */

:root {
  --primary: #7c3aed;
  --secondary: #06b6d4;
  --accent: #f59e0b;
  --success: #10b981;
  --bg: #0f172a;
  --surface: rgba(255,255,255,0.05);
  --border: rgba(255,255,255,0.1);
  --text: #e2e8f0;
  --radius: 14px;
  --shadow: 0 8px 32px rgba(0,0,0,0.4);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--bg);
  background-image:
    radial-gradient(ellipse at top left, rgba(124,58,237,0.15) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(6,182,212,0.15) 0%, transparent 50%);
  color: var(--text);
  min-height: 100vh;
  padding: 24px;
  line-height: 1.6;
}

h1 {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 6px;
}

h2 { font-size: 1.05rem; font-weight: 700; color: var(--secondary); margin-bottom: 12px; }
p { color: rgba(226,232,240,0.8); font-size: 0.88rem; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  border-color: var(--primary);
  box-shadow: 0 18px 44px rgba(124,58,237,0.22);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 20px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: var(--transition);
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), #9f67ff);
  color: white;
  box-shadow: 0 4px 14px rgba(124,58,237,0.35);
}

.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(124,58,237,0.5); }

.btn-secondary {
  background: linear-gradient(135deg, var(--secondary), #22d3ee);
  color: #0f172a;
  box-shadow: 0 4px 14px rgba(6,182,212,0.35);
}

.btn-secondary:hover { transform: translateY(-2px); }

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-outline:hover { background: var(--primary); color: white; transform: translateY(-2px); }

.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.badge-purple { background: rgba(124,58,237,0.15); color: #a78bfa; border: 1px solid rgba(124,58,237,0.3); }
.badge-cyan   { background: rgba(6,182,212,0.15);  color: #67e8f9; border: 1px solid rgba(6,182,212,0.3); }
.badge-amber  { background: rgba(245,158,11,0.15); color: #fcd34d; border: 1px solid rgba(245,158,11,0.3); }
.badge-green  { background: rgba(16,185,129,0.15); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.3); }

input, textarea {
  width: 100%;
  padding: 10px 14px;
  background: rgba(255,255,255,0.04);
  border: 2px solid var(--border);
  border-radius: 9px;
  color: var(--text);
  font-size: 13px;
  transition: var(--transition);
  margin-bottom: 9px;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--primary);
  background: rgba(124,58,237,0.05);
  box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
}

table { width: 100%; border-collapse: collapse; }
th { background: rgba(124,58,237,0.2); padding: 10px 12px; text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #a78bfa; }
td { padding: 9px 12px; border-bottom: 1px solid var(--border); font-size: 12px; }
tr:hover td { background: rgba(124,58,237,0.05); }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(124,58,237,0.4); }
  50%       { box-shadow: 0 0 0 10px rgba(124,58,237,0); }
}

.animate-in { animation: fadeInUp 0.5s ease forwards; }
.animate-pulse { animation: pulse 2s infinite; }

.text-center { text-align: center; }
.text-primary { color: var(--primary); }
.flex { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.mt-2 { margin-top: 12px; }
.mb-2 { margin-bottom: 12px; }
.w-full { width: 100%; }

@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
  h1 { font-size: 1.5rem; }
  body { padding: 14px; }
}`
  };

  // ─────────────────────────────────────────
  // EFFECTS
  // ─────────────────────────────────────────
  useEffect(() => {
    window.getEditorState = () => ({ content, historySize: undoStack.length });
    window.getHighlightCallCount = () => highlightCount;
  }, [content, undoStack.length, highlightCount]);

  // Persist preview state across page refreshes
  useEffect(() => { sessionStorage.setItem('panelMode', panelMode); }, [panelMode]);
  useEffect(() => { sessionStorage.setItem('previewSrc', previewSrc); }, [previewSrc]);
  useEffect(() => { sessionStorage.setItem('lastRunLang', lastRunLang); }, [lastRunLang]);

  useEffect(() => {
    setLineNumbers(content.split('\n').map((_, i) => String(i + 1)));
  }, [content]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === '?' && e.shiftKey) { e.preventDefault(); setShowHelp(true); }
      if (e.key === 'Escape') { setShowHelp(false); setShowFind(false); }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  useEffect(() => {
    if (showFind && findInputRef.current) findInputRef.current.focus();
  }, [showFind]);

  // Write to iframe whenever previewSrc changes
  const writeToIframe = useCallback((html) => {
    if (iframeRef.current && html) {
      try {
        const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document;

        // Inject error handler BEFORE any user scripts run
        const errorScript = `<script>
window.onerror = function(msg, src, line, col, err) {
  var box = document.getElementById('__error_overlay__');
  if (!box) {
    box = document.createElement('div');
    box.id = '__error_overlay__';
    box.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#1e1e1e;color:#f48771;font-family:monospace;font-size:12px;padding:10px 14px;border-top:2px solid #f48771;z-index:9999;max-height:80px;overflow:auto;';
    document.body.appendChild(box);
  }
  box.innerHTML = '❌ <strong>' + (err ? err.name : 'Error') + ':</strong> ' + msg +
    (line ? ' &nbsp;<span style="color:#858585">Line ' + line + '</span>' : '') +
    ' &nbsp;<button onclick="this.parentNode.remove()" style="float:right;background:#333;color:#ccc;border:1px solid #555;border-radius:3px;cursor:pointer;padding:1px 6px;font-size:11px">✕</button>';
  return true;
};
</script>`;

        // Insert error handler right after <head> or at the very start
        let injectedHtml = html;
        if (html.includes('<head>')) {
          injectedHtml = html.replace('<head>', '<head>' + errorScript);
        } else if (html.includes('<body>')) {
          injectedHtml = html.replace('<body>', '<body>' + errorScript);
        } else {
          injectedHtml = errorScript + html;
        }

        doc.open();
        doc.write(injectedHtml);
        doc.close();
      } catch (e) {
        console.error('iframe write error:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (previewSrc) {
      // Small delay to ensure iframe is mounted
      const t = setTimeout(() => writeToIframe(previewSrc), 50);
      return () => clearTimeout(t);
    }
  }, [previewSrc, writeToIframe]);

  // ─────────────────────────────────────────
  // HELPERS
  // ─────────────────────────────────────────
  const logEvent = (type, key, code, mod = {}) => {
    setEventLogs(prev => [...prev.slice(-50), {
      type, key, code,
      ctrl: mod.ctrl || false,
      meta: mod.meta || false,
      shift: mod.shift || false
    }]);
  };

  const triggerHighlight = () => {
    if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);
    highlightTimerRef.current = setTimeout(() => setHighlightCount(p => p + 1), 150);
  };

  const handleInput = (e) => {
    const v = e.target.value;
    setContent(v);
    setUndoStack(p => [...p, v]);
    setRedoStack([]);
    triggerHighlight();
    logEvent('input', '', '', {});
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setContent(languageTemplates[lang] || '');
    setConsoleOutput([]);
    setPreviewSrc('');
    setPanelMode('console');
    setLastRunLang('');
    sessionStorage.removeItem('previewSrc');
    sessionStorage.setItem('panelMode', 'console');
    sessionStorage.setItem('lastRunLang', '');
  };

  const fmt = (arg) => {
    if (arg === null) return 'null';
    if (arg === undefined) return 'undefined';
    if (typeof arg === 'object') { try { return JSON.stringify(arg); } catch { return String(arg); } }
    return String(arg);
  };

  // ─────────────────────────────────────────
  // EXECUTE JAVASCRIPT
  // ─────────────────────────────────────────
  const executeJavaScript = () => {
    const logs = [];
    const _log = console.log, _err = console.error, _warn = console.warn, _info = console.info;
    console.log   = (...a) => { logs.push({ type: 'log',   message: a.map(fmt).join(' ') }); _log(...a);  };
    console.error = (...a) => { logs.push({ type: 'error', message: a.map(fmt).join(' ') }); _err(...a);  };
    console.warn  = (...a) => { logs.push({ type: 'warn',  message: a.map(fmt).join(' ') }); _warn(...a); };
    console.info  = (...a) => { logs.push({ type: 'info',  message: a.map(fmt).join(' ') }); _info(...a); };
    try {
      const t0 = performance.now();
      // eslint-disable-next-line no-new-func
      const result = new Function(content)();
      const ms = (performance.now() - t0).toFixed(2);
      if (result !== undefined) logs.push({ type: 'result', message: `→ ${fmt(result)}` });
      if (logs.length === 0) logs.push({ type: 'success', message: '✓ Executed (no output)' });
      logs.push({ type: 'time', message: `⏱ ${ms}ms` });
    } catch (err) {
      logs.push({ type: 'error', message: `❌ ${err.name}: ${err.message}` });
      if (err.stack) {
        err.stack.split('\n').slice(1, 3).forEach(l => {
          if (l.trim()) logs.push({ type: 'error', message: `   ${l.trim()}` });
        });
      }
    } finally {
      console.log = _log; console.error = _err; console.warn = _warn; console.info = _info;
      setConsoleOutput(logs);
      setPanelMode('console');
      setLastRunLang('javascript');
      setIsRunning(false);
    }
  };

  // ─────────────────────────────────────────
  // EXECUTE HTML → iframe preview
  // ─────────────────────────────────────────
  const executeHTML = () => {
    setPreviewSrc(content);
    setLastRunLang('html');
    setPanelMode('preview');
    setIsRunning(false);
  };

  // ─────────────────────────────────────────
  // EXECUTE CSS → inject into sample template
  // ─────────────────────────────────────────
  const executeCSS = () => {
    const sampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Preview</title>
  <style>${content}</style>
</head>
<body>
  <h1>CSS Visual Preview</h1>
  <p>Your CSS is applied to this template. Edit and re-run to see changes!</p>

  <div class="grid mt-2">
    <div class="card animate-in">
      <h2>Card One</h2>
      <p>Hover to see your transitions and shadows!</p>
      <div class="mt-2 flex">
        <span class="badge badge-purple">Purple</span>
        <span class="badge badge-cyan">Cyan</span>
      </div>
    </div>
    <div class="card animate-in">
      <h2>Card Two</h2>
      <p>CSS variables and utilities all applied.</p>
      <div class="mt-2 flex">
        <span class="badge badge-amber">Amber</span>
        <span class="badge badge-green">Green</span>
      </div>
    </div>
    <div class="card animate-in">
      <h2>Card Three</h2>
      <p>Responsive grid adapts to any screen.</p>
      <div class="mt-2 flex">
        <span class="badge badge-purple">CSS3</span>
        <span class="badge badge-cyan">Grid</span>
      </div>
    </div>
  </div>

  <div class="card mb-2">
    <h2>Buttons</h2>
    <div class="flex">
      <button class="btn btn-primary">Primary</button>
      <button class="btn btn-secondary">Secondary</button>
      <button class="btn btn-outline">Outline</button>
    </div>
  </div>

  <div class="card mb-2">
    <h2>Form Elements</h2>
    <input type="text" placeholder="Your CSS styles this input...">
    <input type="email" placeholder="your@email.com">
    <textarea placeholder="Your CSS styles this textarea..." rows="2"></textarea>
  </div>

  <div class="card">
    <h2>Data Table</h2>
    <table>
      <thead>
        <tr><th>Variable</th><th>Value</th><th>Status</th></tr>
      </thead>
      <tbody>
        <tr><td>--primary</td><td>#7c3aed</td><td><span class="badge badge-purple">Active</span></td></tr>
        <tr><td>--secondary</td><td>#06b6d4</td><td><span class="badge badge-cyan">Active</span></td></tr>
        <tr><td>--accent</td><td>#f59e0b</td><td><span class="badge badge-amber">Active</span></td></tr>
        <tr><td>--success</td><td>#10b981</td><td><span class="badge badge-green">Active</span></td></tr>
      </tbody>
    </table>
  </div>
</body>
</html>`;
    setPreviewSrc(sampleHTML);
    setLastRunLang('css');
    setPanelMode('preview');
    setIsRunning(false);
  };

  // ─────────────────────────────────────────
  // RUN
  // ─────────────────────────────────────────
  const runCode = () => {
    setIsRunning(true);
    setConsoleOutput([]);
    if (selectedLanguage === 'javascript') executeJavaScript();
    else if (selectedLanguage === 'html') executeHTML();
    else if (selectedLanguage === 'css') executeCSS();
  };

  // ─────────────────────────────────────────
  // PANEL ACTIONS
  // ─────────────────────────────────────────
  const goBackToConsole = () => setPanelMode('console');

  const refreshPreview = () => writeToIframe(previewSrc);

  const openPreviewTab = () => {
    if (!previewSrc) return;
    const blob = new Blob([previewSrc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const clearConsole = () => setConsoleOutput([]);

  const copyConsoleOutput = () => {
    const text = consoleOutput.map(l => l.message).join('\n');
    if (!text) { alert('⚠️ Console is empty!'); return; }
    navigator.clipboard.writeText(text).then(() => alert('✓ Copied!')).catch(() => alert('❌ Failed'));
  };

  const copyCode = () => {
    if (!content) { alert('⚠️ Editor is empty!'); return; }
    navigator.clipboard.writeText(content).then(() => alert('✓ Code copied!')).catch(() => alert('❌ Failed'));
  };

  const downloadCode = () => {
    if (!content) { alert('⚠️ Editor is empty!'); return; }
    const ext = { javascript: 'js', html: 'html', css: 'css' };
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${ext[selectedLanguage] || 'txt'}`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const handleFind = () => {
    if (!findText || !editorRef.current) return;
    const text = editorRef.current.value;
    const escaped = findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matches = [...text.matchAll(new RegExp(escaped, 'gi'))];
    setFindCount(matches.length);
    if (matches.length > 0) {
      editorRef.current.focus();
      editorRef.current.setSelectionRange(matches[0].index, matches[0].index + findText.length);
    }
  };

  // ─────────────────────────────────────────
  // KEYBOARD
  // ─────────────────────────────────────────
  const handleKeyDown = (e) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const isMod = isMac ? e.metaKey : e.ctrlKey;
    logEvent('keydown', e.key, e.code, { ctrl: e.ctrlKey, meta: e.metaKey, shift: e.shiftKey });

    if (isMod && e.key === 'Enter') { e.preventDefault(); runCode(); return; }

    if (isMod && e.key === 's') {
      e.preventDefault();
      setEventLogs(p => [...p, { type: 'action', message: 'Action: Save' }]);
      return;
    }

    if (isMod && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      if (undoStack.length > 1) {
        const ns = [...undoStack]; const cur = ns.pop(); const prev = ns[ns.length - 1];
        setRedoStack(p => [...p, cur]); setUndoStack(ns); setContent(prev);
      }
      return;
    }

    if (isMod && e.key === 'Z' && e.shiftKey) {
      e.preventDefault();
      if (redoStack.length > 0) {
        const nr = [...redoStack]; const s = nr.pop();
        setRedoStack(nr); setUndoStack(p => [...p, s]); setContent(s);
      }
      return;
    }

    if (isMod && e.key === '/') {
      e.preventDefault();
      const ta = editorRef.current; const st = ta.selectionStart; const tx = ta.value;
      let ls = st; while (ls > 0 && tx[ls-1] !== '\n') ls--;
      let le = st; while (le < tx.length && tx[le] !== '\n') le++;
      const line = tx.substring(ls, le);
      const nc = line.startsWith('// ')
        ? tx.substring(0,ls) + line.substring(3) + tx.substring(le)
        : tx.substring(0,ls) + '// ' + line + tx.substring(le);
      setContent(nc); setUndoStack(p=>[...p,nc]); setRedoStack([]); return;
    }

    if (isMod && e.key === 'd') {
      e.preventDefault();
      const ta = editorRef.current; const st = ta.selectionStart; const tx = ta.value;
      let ls = st; while (ls > 0 && tx[ls-1] !== '\n') ls--;
      let le = st; while (le < tx.length && tx[le] !== '\n') le++;
      const line = tx.substring(ls, le);
      const nc = tx.substring(0,le) + '\n' + line + tx.substring(le);
      setContent(nc); setUndoStack(p=>[...p,nc]); setRedoStack([]);
      setEventLogs(p=>[...p,{type:'action',message:'Action: Duplicate Line'}]);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = le + line.length + 1; }, 0);
      return;
    }

    if (isMod && e.key === 'l') {
      e.preventDefault();
      const ta = editorRef.current; const st = ta.selectionStart; const tx = ta.value;
      let ls = st; while (ls > 0 && tx[ls-1] !== '\n') ls--;
      let le = st; while (le < tx.length && tx[le] !== '\n') le++;
      const de = le < tx.length ? le+1 : le;
      const ds = ls > 0 && le === tx.length ? ls-1 : ls;
      const nc = tx.substring(0,ds) + tx.substring(de);
      setContent(nc); setUndoStack(p=>[...p,nc]); setRedoStack([]);
      setEventLogs(p=>[...p,{type:'action',message:'Action: Delete Line'}]);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = ds; }, 0);
      return;
    }

    if (isMod && e.key === 'f') { e.preventDefault(); setShowFind(p=>!p); return; }

    if (isMod && e.key === ']') {
      e.preventDefault();
      const ta = editorRef.current; const st = ta.selectionStart; const tx = ta.value;
      let ls = st; while (ls > 0 && tx[ls-1] !== '\n') ls--;
      const nc = tx.substring(0,ls) + '  ' + tx.substring(ls);
      setContent(nc); setUndoStack(p=>[...p,nc]); setRedoStack([]); return;
    }

    if (isMod && e.key === '[') {
      e.preventDefault();
      const ta = editorRef.current; const st = ta.selectionStart; const tx = ta.value;
      let ls = st; while (ls > 0 && tx[ls-1] !== '\n') ls--;
      if (tx.substring(ls, ls+2) === '  ') {
        const nc = tx.substring(0,ls) + tx.substring(ls+2);
        setContent(nc); setUndoStack(p=>[...p,nc]); setRedoStack([]);
      }
      return;
    }

    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const ta = editorRef.current; const st = ta.selectionStart; const tx = ta.value;
      let ls = st; while (ls > 0 && tx[ls-1] !== '\n') ls--;
      const nc = tx.substring(0,ls) + '  ' + tx.substring(ls);
      setContent(nc); setUndoStack(p=>[...p,nc]); setRedoStack([]);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = st+2; }, 0); return;
    }

    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const ta = editorRef.current; const st = ta.selectionStart; const tx = ta.value;
      let ls = st; while (ls > 0 && tx[ls-1] !== '\n') ls--;
      if (tx.substring(ls, ls+2) === '  ') {
        const nc = tx.substring(0,ls) + tx.substring(ls+2);
        setContent(nc); setUndoStack(p=>[...p,nc]); setRedoStack([]);
        setTimeout(() => { ta.selectionStart = ta.selectionEnd = Math.max(ls, st-2); }, 0);
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const ta = editorRef.current; const st = ta.selectionStart; const tx = ta.value;
      let ls = st; while (ls > 0 && tx[ls-1] !== '\n') ls--;
      let sp = 0; while (tx[ls+sp] === ' ') sp++;
      const nc = tx.substring(0,st) + '\n' + ' '.repeat(sp) + tx.substring(st);
      setContent(nc); setUndoStack(p=>[...p,nc]); setRedoStack([]);
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = st+1+sp; }, 0); return;
    }

    if (isMod && e.key === 'k') {
      e.preventDefault();
      setChordState('waiting');
      if (chordTimerRef.current) clearTimeout(chordTimerRef.current);
      chordTimerRef.current = setTimeout(() => setChordState(null), 2000);
      return;
    }

    if (chordState === 'waiting' && isMod && e.key === 'c') {
      e.preventDefault();
      setChordState(null);
      if (chordTimerRef.current) clearTimeout(chordTimerRef.current);
      setEventLogs(p=>[...p,{type:'action',message:'Action: Chord Success'}]);
      return;
    }

    if (chordState === 'waiting' && e.key !== 'k') {
      setChordState(null);
      if (chordTimerRef.current) clearTimeout(chordTimerRef.current);
    }
  };

  const handleKeyUp   = (e) => logEvent('keyup', e.key, e.code, { ctrl: e.ctrlKey, meta: e.metaKey, shift: e.shiftKey });
  const handleCompStart = () => logEvent('compositionstart', '', '', {});
  const handleCompEnd   = () => logEvent('compositionend', '', '', {});

  const stats = {
    chars: content.length,
    words: content.trim().split(/\s+/).filter(Boolean).length
  };

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <div className="App">

      {/* ─── TOP BAR ─── */}
      <div className="top-bar">
        <span className="app-title">⚡ Code Editor</span>
        <div className="top-bar-right">
          <button onClick={downloadCode} className="top-bar-btn download-btn">💾 Download</button>
          <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} className="top-bar-btn theme-btn">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      <div className="main-layout">
        <div className="top-section">

          {/* ─── EDITOR ─── */}
          <div className="editor-section" data-test-id="editor-container">
            <div className="editor-header">
              <div className="editor-header-left">
                <h2>📝 Editor</h2>
                <select value={selectedLanguage} onChange={e => handleLanguageChange(e.target.value)} className="language-select">
                  <option value="javascript">⚡ JavaScript</option>
                  <option value="html">🌐 HTML</option>
                  <option value="css">🎨 CSS</option>
                </select>
              </div>
              <div className="editor-actions">
                <button onClick={() => setShowHelp(true)} className="action-btn" title="Shortcuts (Shift+?)">❓</button>
                <button onClick={() => setShowFind(p=>!p)} className="action-btn" title="Find (Ctrl+F)">🔍</button>
                <button onClick={copyCode} className="action-btn copy-btn" title="Copy Code" disabled={!content}>📄 Copy</button>
                <button onClick={() => setShowDashboard(p=>!p)} className="action-btn toggle-btn">
                  {showDashboard ? '👁️ Hide' : '👁️ Show'} Events
                </button>
                <button onClick={runCode} className="run-btn" disabled={isRunning} title="Run (Ctrl+Enter)">
                  {isRunning ? '⏳ Running...' : '▶ Run'}
                </button>
              </div>
            </div>

            {/* Find Bar */}
            {showFind && (
              <div className="find-bar">
                <span>🔍</span>
                <input
                  ref={findInputRef}
                  type="text"
                  className="find-input"
                  placeholder="Find in code..."
                  value={findText}
                  onChange={e => setFindText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleFind();
                    if (e.key === 'Escape') { setShowFind(false); setFindText(''); setFindCount(0); }
                  }}
                />
                <button className="find-btn" onClick={handleFind}>Find</button>
                {findCount > 0 && <span className="find-count">{findCount} match{findCount!==1?'es':''}</span>}
                {findText && findCount === 0 && <span className="find-none">No matches</span>}
                <button className="find-close" onClick={() => { setShowFind(false); setFindText(''); setFindCount(0); }}>✕</button>
              </div>
            )}

            {/* Editor Area */}
            <div className="editor-wrapper">
              <div className="line-numbers" aria-hidden="true">
                {lineNumbers.map((n,i) => <div key={i} className="line-number">{n}</div>)}
              </div>
              <textarea
                ref={editorRef}
                data-test-id="editor-input"
                className="editor-input"
                value={content}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onCompositionStart={handleCompStart}
                onCompositionEnd={handleCompEnd}
                placeholder={`// Start coding...\n// JS → Console output\n// HTML & CSS → Live visual preview!\n// Shift+? for all shortcuts`}
                spellCheck={false}
                aria-multiline="true"
                aria-label="Code editor"
              />
            </div>
          </div>

          {/* ─── EVENT DASHBOARD ─── */}
          {showDashboard && (
            <div className="dashboard-section" data-test-id="event-dashboard">
              <div className="dashboard-header">
                <h2>📊 Events</h2>
                <button className="clear-events-btn" onClick={() => setEventLogs([])}>🗑️</button>
              </div>
              <div className="event-log" data-test-id="event-log-list">
                {eventLogs.length === 0
                  ? <div className="empty-state">Start typing to see events...</div>
                  : eventLogs.map((log,i) => (
                    <div key={i} className="event-log-entry" data-test-id="event-log-entry">
                      {log.type === 'action'
                        ? <span className="action-log">✓ {log.message}</span>
                        : <span>
                            <strong>{log.type}</strong>
                            {log.key && <> | <code>{log.key}</code></>}
                            {log.ctrl  && <span className="mod-key"> Ctrl</span>}
                            {log.meta  && <span className="mod-key"> Meta</span>}
                            {log.shift && <span className="mod-key"> Shift</span>}
                          </span>
                      }
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>

        {/* ─── BOTTOM PANEL ─── */}
        <div className="bottom-panel">
          <div className="panel-header">
            <div className="panel-header-left">

              {/* BACK BUTTON - shown in preview mode */}
              {panelMode === 'preview' && (
                <button className="back-btn" onClick={goBackToConsole} title="Back to Console">
                  ← Back
                </button>
              )}

              <span className="panel-label">
                {panelMode === 'console' ? (
                  <>🖥️ Console {selectedLanguage === 'javascript' && <span className="lang-badge js-badge">JS</span>}</>
                ) : (
                  <>🌐 Live Preview
                    {lastRunLang === 'html' && <span className="lang-badge html-badge">HTML</span>}
                    {lastRunLang === 'css'  && <span className="lang-badge css-badge">CSS</span>}
                  </>
                )}
              </span>
            </div>

            <div className="panel-header-right">
              {panelMode === 'console' ? (
                <>
                  <button onClick={copyConsoleOutput} className="panel-btn" disabled={!consoleOutput.length}>📋 Copy</button>
                  <button onClick={clearConsole} className="panel-btn">🗑️ Clear</button>
                </>
              ) : (
                <>
                  <button onClick={refreshPreview} className="panel-btn" disabled={!previewSrc}>🔄 Refresh</button>
                  <button onClick={openPreviewTab} className="panel-btn" disabled={!previewSrc}>🔗 New Tab</button>
                </>
              )}
            </div>
          </div>

          {/* ── CONSOLE ── */}
          {panelMode === 'console' && (
            <div className="console-output">
              {consoleOutput.length === 0
                ? <div className="empty-state">
                    {selectedLanguage === 'javascript'
                      ? <>Press <kbd>Ctrl+Enter</kbd> or click <strong>▶ Run</strong></>
                      : <>Press <strong>▶ Run</strong> to see the live visual preview</>
                    }
                  </div>
                : consoleOutput.map((log,i) => (
                  <div key={i} className={`console-line console-${log.type}`}>
                    <span className="c-arrow">›</span>
                    <span className="c-msg">{log.message}</span>
                  </div>
                ))
              }
            </div>
          )}

          {/* ── PREVIEW (iframe) ── */}
          {panelMode === 'preview' && (
            <div className="preview-wrapper">
              {previewSrc ? (
                <>
                  <div className="browser-bar">
                    <div className="browser-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <div className="browser-url">
                      {lastRunLang === 'css' ? '🎨 CSS applied to sample template' : '🌐 Live HTML Render'}
                    </div>
                    <button className="browser-refresh" onClick={refreshPreview} title="Refresh">↻</button>
                  </div>
                  <iframe
                    ref={iframeRef}
                    className="preview-iframe"
                    title="Live Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </>
              ) : (
                <div className="preview-empty">
                  <div className="preview-empty-icon">
                    {selectedLanguage === 'css' ? '🎨' : '🌐'}
                  </div>
                  <p>Click <strong>▶ Run</strong> to see the live visual preview!</p>
                  <button onClick={runCode} className="run-btn" style={{marginTop:'14px'}}>▶ Run Now</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ─── STATUS BAR ─── */}
      <div className="status-bar">
        <span>⚡ {selectedLanguage.toUpperCase()}</span>
        <span>Lines: {lineNumbers.length} | Chars: {stats.chars} | Words: {stats.words}</span>
        <span>History: {undoStack.length} | Redo: {redoStack.length}</span>
        <span>{chordState === 'waiting' ? '⏳ Ctrl+K...' : 'Ready'}</span>
        <span>{panelMode === 'preview' ? '🌐 Preview' : '🖥️ Console'}</span>
        <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
      </div>

      {/* ─── HELP MODAL ─── */}
      {showHelp && (
        <div className="modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>⌨️ Keyboard Shortcuts</h2>
              <button onClick={() => setShowHelp(false)} className="close-btn">✕</button>
            </div>
            <div className="modal-body">
              <div className="shortcut-group">
                <h3>📁 File</h3>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>S</kbd></div><span>Save</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>Enter</kbd></div><span>Run Code</span></div>
              </div>
              <div className="shortcut-group">
                <h3>✏️ Editing</h3>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>Z</kbd></div><span>Undo</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd></div><span>Redo</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>/</kbd></div><span>Toggle Comment</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>D</kbd></div><span>Duplicate Line</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>L</kbd></div><span>Delete Line</span></div>
              </div>
              <div className="shortcut-group">
                <h3>🔍 Navigation</h3>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>F</kbd></div><span>Find in Code</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>A</kbd></div><span>Select All</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Tab</kbd></div><span>Indent</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Shift</kbd>+<kbd>Tab</kbd></div><span>Outdent</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>]</kbd></div><span>Indent Line</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>[</kbd></div><span>Outdent Line</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Enter</kbd></div><span>Auto-indent</span></div>
              </div>
              <div className="shortcut-group">
                <h3>⚡ Advanced</h3>
                <div className="sc"><div className="sc-keys"><kbd>Ctrl</kbd>+<kbd>K</kbd>→<kbd>C</kbd></div><span>Chord</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Shift</kbd>+<kbd>?</kbd></div><span>This Help</span></div>
                <div className="sc"><div className="sc-keys"><kbd>Esc</kbd></div><span>Close Dialogs</span></div>
              </div>
            </div>
            <div className="modal-footer">
              <p>💡 Mac: use <kbd>Cmd</kbd> instead of <kbd>Ctrl</kbd></p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;