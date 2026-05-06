import { useLegacyPage } from '../hooks/useLegacyPage.js';

const pageStyles = "\n:root.theme-light {\n  --bg: #10121a;\n  --surface: #181b27;\n  --card: #1e2235;\n  --card-hover: #242840;\n  --border: #2a2e45;\n  --border-light: #333750;\n  --text-primary: #e4e7f2;\n  --text-secondary: #8890ae;\n  --text-muted: #555d7a;\n  --positive: #34d399;\n  --positive-bg: rgba(52,211,153,0.08);\n  --positive-border: rgba(52,211,153,0.22);\n  --negative: #f87171;\n  --negative-bg: rgba(248,113,113,0.08);\n  --negative-border: rgba(248,113,113,0.22);\n  --neutral: #fbbf24;\n  --neutral-bg: rgba(251,191,36,0.08);\n  --neutral-border: rgba(251,191,36,0.22);\n  --accent: #818cf8;\n  --accent-bg: rgba(129,140,248,0.12);\n  --accent-hover: #6366f1;\n  color-scheme: dark;\n}\n\n/* ── Light Theme ── */\n:root.theme-light,\n[data-theme=\"light\"] {\n  --bg: #f4f5f9;\n  --surface: #ffffff;\n  --card: #ffffff;\n  --card-hover: #f8f9fc;\n  --border: #e1e4ef;\n  --border-light: #cdd2e3;\n  --text-primary: #1a1d2e;\n  --text-secondary: #5a6380;\n  --text-muted: #9099b5;\n  --positive: #059669;\n  --positive-bg: rgba(5,150,105,0.08);\n  --positive-border: rgba(5,150,105,0.22);\n  --negative: #dc2626;\n  --negative-bg: rgba(220,38,38,0.08);\n  --negative-border: rgba(220,38,38,0.22);\n  --neutral: #d97706;\n  --neutral-bg: rgba(217,119,6,0.08);\n  --neutral-border: rgba(217,119,6,0.22);\n  --accent: #6366f1;\n  --accent-bg: rgba(99,102,241,0.1);\n  --accent-hover: #4f46e5;\n  color-scheme: light;\n}\n\n/* ── System preference ── */\n@media (prefers-color-scheme: light) {\n  :root:not(.theme-dark):not([data-theme=\"dark\"]) {\n    --bg: #f4f5f9;\n    --surface: #ffffff;\n    --card: #ffffff;\n    --card-hover: #f8f9fc;\n    --border: #e1e4ef;\n    --border-light: #cdd2e3;\n    --text-primary: #1a1d2e;\n    --text-secondary: #5a6380;\n    --text-muted: #9099b5;\n    --positive: #059669;\n    --positive-bg: rgba(5,150,105,0.08);\n    --positive-border: rgba(5,150,105,0.22);\n    --negative: #dc2626;\n    --negative-bg: rgba(220,38,38,0.08);\n    --negative-border: rgba(220,38,38,0.22);\n    --neutral: #d97706;\n    --neutral-bg: rgba(217,119,6,0.08);\n    --neutral-border: rgba(217,119,6,0.22);\n    --accent: #6366f1;\n    --accent-bg: rgba(99,102,241,0.1);\n    --accent-hover: #4f46e5;\n    color-scheme: light;\n  }\n}\n*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\nhtml { scroll-behavior: smooth; }\nbody {\n  font-family: 'Noto Sans KR', sans-serif;\n  background: var(--bg);\n  color: var(--text-primary);\n  line-height: 1.6;\n  -webkit-font-smoothing: antialiased;\n  overflow-x: hidden;\n  transition: background 0.2s, color 0.2s;\n}\na { text-decoration: none; color: inherit; }\n\n/* ── BG Grid ── */\nbody::before {\n  content: '';\n  position: fixed;\n  inset: 0;\n  background-image:\n    linear-gradient(rgba(129,140,248,0.03) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(129,140,248,0.03) 1px, transparent 1px);\n  background-size: 48px 48px;\n  pointer-events: none;\n  z-index: 0;\n}\n\n/* ── NAV ── */\nnav {\n  position: fixed; top: 0; left: 0; right: 0;\n  z-index: 100;\n  padding: 0 60px;\n  height: 66px;\n  display: flex; align-items: center; justify-content: space-between;\n  background: rgba(16,18,26,0.85);\n  backdrop-filter: blur(16px);\n  border-bottom: 1px solid var(--border);\n}\n.nav-logo {\n  display: flex; align-items: center; gap: 10px;\n}\n.nav-logo .logo-icon {\n  width: 36px; height: 36px;\n  background: linear-gradient(135deg, var(--accent), #6366f1);\n  border-radius: 9px;\n  display: flex; align-items: center; justify-content: center;\n  font-size: 17px;\n}\n.nav-logo .logo-text { font-size: 17px; font-weight: 800; letter-spacing: -0.5px; }\n.nav-logo .logo-sub {\n  font-size: 9px; color: var(--text-muted);\n  font-family: 'DM Mono', monospace; letter-spacing: 2px; text-transform: uppercase;\n}\n\n.nav-links { display: flex; align-items: center; gap: 6px; }\n.nav-links a {\n  padding: 8px 16px; border-radius: 7px;\n  font-size: 13.5px; font-weight: 500; color: var(--text-secondary);\n  transition: all 0.15s;\n}\n.nav-links a:hover { background: var(--card); color: var(--text-primary); }\n.nav-cta {\n  background: var(--accent); color: #fff !important;\n  padding: 8px 20px; border-radius: 7px;\n  font-size: 13.5px; font-weight: 700;\n  transition: background 0.15s !important;\n}\n.nav-cta:hover { background: var(--accent-hover) !important; }\n.theme-btn{width:32px;height:32px;border-radius:6px;background:transparent;border:1px solid var(--border);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;transition:all 0.15s;}\n.theme-btn:hover{background:var(--card);color:var(--text-primary);}\n/* ── HERO ── */\n.hero {\n  position: relative; z-index: 1;\n  min-height: 100vh;\n  display: flex; align-items: center; justify-content: center;\n  flex-direction: column;\n  text-align: center;\n  padding: 120px 40px 80px;\n}\n\n.hero-badge {\n  display: inline-flex; align-items: center; gap: 6px;\n  background: rgba(129,140,248,0.1);\n  border: 1px solid rgba(129,140,248,0.25);\n  border-radius: 30px;\n  padding: 5px 14px;\n  font-size: 11px; font-weight: 600; color: var(--accent);\n  font-family: 'DM Mono', monospace; letter-spacing: 1px;\n  margin-bottom: 32px;\n  animation: fadeUp 0.6s ease both;\n}\n\n.hero-badge::before { content: '●'; font-size: 7px; animation: pulse 2s infinite; }\n\n@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }\n\n.hero-title {\n  font-size: clamp(44px, 7vw, 80px);\n  font-weight: 900;\n  letter-spacing: -2.5px;\n  line-height: 1.05;\n  margin-bottom: 8px;\n  animation: fadeUp 0.6s 0.1s ease both;\n}\n.hero-title .accent { color: var(--accent); }\n.hero-title .positive { color: var(--positive); }\n.hero-title .negative { color: var(--negative); }\n\n.hero-sub {\n  font-size: 17px; color: var(--text-secondary);\n  max-width: 560px;\n  margin: 20px auto 48px;\n  font-weight: 400;\n  line-height: 1.7;\n  animation: fadeUp 0.6s 0.2s ease both;\n}\n\n.hero-actions {\n  display: flex; align-items: center; gap: 12px;\n  animation: fadeUp 0.6s 0.3s ease both;\n}\n.btn-hero-primary {\n  background: var(--accent); color: #fff;\n  padding: 14px 32px; border-radius: 9px;\n  font-size: 15px; font-weight: 700;\n  transition: all 0.2s;\n  display: flex; align-items: center; gap: 8px;\n}\n.btn-hero-primary:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(99,102,241,0.35); }\n\n.btn-hero-ghost {\n  background: transparent; color: var(--text-secondary);\n  border: 1px solid var(--border);\n  padding: 14px 28px; border-radius: 9px;\n  font-size: 15px; font-weight: 600;\n  transition: all 0.2s;\n}\n.btn-hero-ghost:hover { background: var(--card); color: var(--text-primary); }\n\n/* ── MOCK DASHBOARD PREVIEW ── */\n.hero-preview {\n  position: relative; z-index: 1;\n  margin: 70px auto 0;\n  max-width: 900px; width: 100%;\n  animation: fadeUp 0.7s 0.4s ease both;\n}\n\n.preview-frame {\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(129,140,248,0.1);\n}\n\n.preview-topbar {\n  background: var(--card);\n  padding: 12px 20px;\n  display: flex; align-items: center; gap: 8px;\n  border-bottom: 1px solid var(--border);\n}\n.preview-dot { width: 10px; height: 10px; border-radius: 50%; }\n.preview-dot:nth-child(1) { background: #ff5f57; }\n.preview-dot:nth-child(2) { background: #ffbd2e; }\n.preview-dot:nth-child(3) { background: #28c840; }\n\n.preview-body {\n  display: grid;\n  grid-template-columns: 180px 1fr;\n  height: 360px;\n}\n.preview-sidebar {\n  background: var(--surface);\n  border-right: 1px solid var(--border);\n  padding: 16px 12px;\n}\n.preview-sidebar-item {\n  padding: 7px 10px;\n  border-radius: 6px;\n  font-size: 11px; color: var(--text-muted);\n  margin-bottom: 2px;\n}\n.preview-sidebar-item.active {\n  background: rgba(129,140,248,0.1);\n  color: var(--accent);\n}\n.preview-sidebar-item .dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: 6px; }\n\n.preview-main { padding: 16px; display: flex; flex-direction: column; gap: 10px; overflow: hidden; }\n.preview-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }\n.preview-stat {\n  background: var(--card); border: 1px solid var(--border);\n  border-radius: 8px; padding: 10px 12px;\n}\n.preview-stat .label { font-size: 9px; color: var(--text-muted); font-family: 'DM Mono', monospace; letter-spacing: 1px; text-transform: uppercase; }\n.preview-stat .value { font-size: 15px; font-weight: 700; font-family: 'DM Mono', monospace; margin-top: 2px; }\n.preview-stat .change { font-size: 10px; margin-top: 1px; font-family: 'DM Mono', monospace; }\n\n.preview-news-list { display: flex; flex-direction: column; gap: 6px; }\n\n.preview-news-card {\n  background: var(--card); border-radius: 7px;\n  padding: 10px 12px; display: flex; gap: 10px; align-items: flex-start;\n  border-left: 3px solid transparent;\n  position: relative;\n}\n\n.preview-news-card.good { border-left-color: var(--positive); }\n.preview-news-card.bad  { border-left-color: var(--negative); }\n.preview-news-card.mid  { border-left-color: var(--neutral); }\n\n.preview-news-chip {\n  font-size: 9px; padding: 2px 6px; border-radius: 4px;\n  font-family: 'DM Mono', monospace; font-weight: 700;\n  flex-shrink: 0;\n  margin-top: 1px;\n}\n.preview-news-chip.good { background: rgba(52,211,153,0.15); color: var(--positive); }\n.preview-news-chip.bad  { background: rgba(248,113,113,0.15); color: var(--negative); }\n.preview-news-chip.mid  { background: rgba(251,191,36,0.15); color: var(--neutral); }\n\n.preview-news-text { font-size: 10.5px; color: var(--text-secondary); line-height: 1.4; flex: 1; }\n.preview-news-impact { font-size: 9px; color: var(--text-muted); font-family: 'DM Mono', monospace; margin-top: 3px; }\n.preview-news-bar { height: 3px; background: var(--border); border-radius: 2px; margin-top: 4px; overflow: hidden; }\n.preview-news-bar-fill { height: 100%; border-radius: 2px; }\n\n/* ── FEATURES ── */\n.section {\n  position: relative; z-index: 1;\n  padding: 100px 60px;\n}\n\n.section-label {\n  font-size: 10px; font-family: 'DM Mono', monospace;\n  letter-spacing: 3px; text-transform: uppercase;\n  color: var(--accent); margin-bottom: 14px;\n}\n\n.section-title {\n  font-size: clamp(30px, 4vw, 48px);\n  font-weight: 800; letter-spacing: -1.5px;\n  line-height: 1.1; margin-bottom: 20px;\n}\n.section-sub { font-size: 16px; color: var(--text-secondary); max-width: 520px; }\n\n.features-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  margin-top: 60px;\n}\n\n.feature-card {\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: 14px;\n  padding: 28px;\n  transition: all 0.25s;\n  position: relative;\n  overflow: hidden;\n}\n\n.feature-card::before {\n  content: '';\n  position: absolute;\n  top: 0; left: 0; right: 0;\n  height: 2px;\n  background: var(--accent);\n  opacity: 0;\n  transition: opacity 0.25s;\n}\n.feature-card:hover::before { opacity: 1; }\n.feature-card:hover { background: var(--card-hover, #242840); transform: translateY(-2px); }\n\n.feature-icon {\n  font-size: 28px; margin-bottom: 18px;\n  width: 52px; height: 52px;\n  background: var(--surface);\n  border-radius: 12px;\n  display: flex; align-items: center; justify-content: center;\n  border: 1px solid var(--border);\n}\n\n.feature-title { font-size: 16px; font-weight: 700; margin-bottom: 10px; }\n.feature-desc { font-size: 13.5px; color: var(--text-secondary); line-height: 1.65; }\n\n/* ── HOW IT WORKS ── */\n.steps { position: relative; z-index: 1; padding: 80px 60px; background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }\n\n.steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-top: 60px; position: relative; }\n.steps-grid::before {\n  content: '';\n  position: absolute;\n  top: 30px; left: 15%; right: 15%;\n  height: 1px;\n  background: linear-gradient(90deg, transparent, var(--border), transparent);\n}\n\n.step { text-align: center; position: relative; }\n.step-number {\n  width: 52px; height: 52px;\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: 50%;\n  display: flex; align-items: center; justify-content: center;\n  font-family: 'DM Mono', monospace;\n  font-size: 15px; font-weight: 500; color: var(--accent);\n  margin: 0 auto 18px;\n  position: relative; z-index: 1;\n}\n.step-title { font-size: 15px; font-weight: 700; margin-bottom: 8px; }\n.step-desc { font-size: 12.5px; color: var(--text-secondary); line-height: 1.6; }\n\n/* ── CTA SECTION ── */\n.cta-section {\n  position: relative; z-index: 1;\n  padding: 100px 60px;\n  text-align: center;\n}\n\n.cta-box {\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: 20px;\n  padding: 70px 60px;\n  max-width: 700px;\n  margin: 0 auto;\n  position: relative;\n  overflow: hidden;\n}\n\n.cta-box::before {\n  content: '';\n  position: absolute;\n  top: -60px; left: 50%; transform: translateX(-50%);\n  width: 300px; height: 300px;\n  background: radial-gradient(circle, rgba(129,140,248,0.12), transparent 70%);\n  pointer-events: none;\n}\n\n.cta-box .section-title { max-width: 500px; margin: 0 auto 16px; }\n.cta-box .section-sub { margin: 0 auto 36px; }\n\n/* ── FOOTER ── */\nfooter {\n  position: relative; z-index: 1;\n  background: var(--surface);\n  border-top: 1px solid var(--border);\n  padding: 36px 60px;\n  display: flex; align-items: center; justify-content: space-between;\n}\n\n.footer-copy { font-size: 12px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.footer-links { display: flex; gap: 20px; }\n.footer-links a { font-size: 12px; color: var(--text-muted); transition: color 0.15s; }\n.footer-links a:hover { color: var(--text-secondary); }\n\n/* ── ANIMATIONS ── */\n@keyframes fadeUp {\n  from { opacity: 0; transform: translateY(24px); }\n  to   { opacity: 1; transform: translateY(0); }\n}\n\n/* ── TICKER ── */\n.ticker-wrap {\n  position: relative; z-index: 1;\n  background: var(--surface);\n  border-top: 1px solid var(--border);\n  border-bottom: 1px solid var(--border);\n  padding: 10px 0;\n  overflow: hidden;\n}\n.ticker {\n  display: flex; gap: 40px;\n  animation: ticker 30s linear infinite;\n  width: max-content;\n}\n@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }\n.ticker-item {\n  display: flex; align-items: center; gap: 8px;\n  font-family: 'DM Mono', monospace; font-size: 12px;\n  white-space: nowrap;\n}\n.ticker-item .name { color: var(--text-secondary); }\n.ticker-item .price { color: var(--text-primary); }\n.ticker-item .up { color: var(--positive); }\n.ticker-item .dn { color: var(--negative); }\n";
const pageScripts = "\nfunction applyTheme(t) {\n  const r = document.documentElement;\n  if (t === 'light') {\n    r.classList.add('theme-light'); r.classList.remove('theme-dark');\n    r.setAttribute('data-theme', 'light');\n    document.getElementById('themeBtn').textContent = '☀️';\n  } else {\n    r.classList.remove('theme-light'); r.classList.add('theme-dark');\n    r.setAttribute('data-theme', 'dark');\n    document.getElementById('themeBtn').textContent = '🌙';\n  }\n  localStorage.setItem('theme', t);\n}\nfunction toggleTheme() {\n  const c = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n  applyTheme(c === 'dark' ? 'light' : 'dark');\n}\n(function() {\n  const s = localStorage.getItem('theme');\n  if (s) applyTheme(s);\n  else if (window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');\n  else document.getElementById('themeBtn').textContent = '🌙';\n})();\n";

export default function Home() {
  useLegacyPage({ title: "주식 바구니 — AI 뉴스 분석 플랫폼", styles: pageStyles, scripts: pageScripts });

  return (
    <>
      <nav>
        <div className="nav-logo">
          <div className="logo-icon">
            🧺
          </div>
          <div>
            <div className="logo-text">
              주식 바구니
            </div>
            <div className="logo-sub">
              AI NEWS INTELLIGENCE
            </div>
          </div>
        </div>
        <div className="nav-links">
          <a href="#features">
            기능
          </a>
          <a href="#how">
            작동 방식
          </a>
          <a href="login.html">
            로그인
          </a>
          <a href="register.html" className="nav-cta">
            무료 시작하기 →
          </a>
          <button className="theme-btn" onClick={(event) => { toggleTheme(); }} id="themeBtn" title="테마 전환" style={{"width": "32px", "height": "32px", "borderRadius": "7px", "background": "transparent", "border": "1px solid var(--border)", "color": "var(--text-secondary)", "cursor": "pointer", "display": "flex", "alignItems": "center", "justifyContent": "center", "fontSize": "15px", "transition": "all 0.15s", "marginLeft": "4px"}}>
            🌙
          </button>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-badge">
          AI POWERED · 실시간 뉴스 분석 · BETA
        </div>
        <h1 className="hero-title">
          <span className="positive">
            호재
          </span>
          인지 
          <span className="negative">
            악재
          </span>
          인지
          <br />
          <span className="accent">
            1초
          </span>
           만에 파악하세요
  
        </h1>
        <p className="hero-sub">
          
    보유 종목의 뉴스를 AI가 실시간 분석하여 영향력과 방향성을 시각화합니다.
          <br />
          
    급등락의 이유를 빠르게 파악하고, 중요한 뉴스를 놓치지 마세요.
  
        </p>
        <div className="hero-actions">
          <a href="register.html" className="btn-hero-primary">
            지금 바구니 만들기 🧺
          </a>
          <a href="stock-detail.html" className="btn-hero-ghost">
            대시보드 미리보기
          </a>
        </div>
        <div className="hero-preview">
          <div className="preview-frame">
            <div className="preview-topbar">
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
              <div className="preview-dot"></div>
            </div>
            <div className="preview-body">
              <div className="preview-sidebar">
                <div style={{"fontSize": "9px", "color": "var(--text-muted)", "fontFamily": "'DM Mono',monospace", "letterSpacing": "2px", "textTransform": "uppercase", "padding": "4px 10px 8px"}}>
                  내 바구니
                </div>
                <div className="preview-sidebar-item active">
                  <span className="dot" style={{"background": "var(--positive)"}}></span>
                  삼성전자
          
                </div>
                <div className="preview-sidebar-item">
                  <span className="dot" style={{"background": "var(--negative)"}}></span>
                  카카오
          
                </div>
                <div className="preview-sidebar-item">
                  <span className="dot" style={{"background": "var(--positive)"}}></span>
                  SK하이닉스
          
                </div>
                <div className="preview-sidebar-item">
                  <span className="dot" style={{"background": "var(--neutral)"}}></span>
                  NAVER
          
                </div>
                <div className="preview-sidebar-item">
                  <span className="dot" style={{"background": "var(--positive)"}}></span>
                  현대차
          
                </div>
                <div style={{"marginTop": "12px", "fontSize": "9px", "color": "var(--text-muted)", "fontFamily": "'DM Mono',monospace", "letterSpacing": "2px", "textTransform": "uppercase", "padding": "4px 10px 8px"}}>
                  분석 현황
                </div>
                <div style={{"padding": "6px 10px", "fontSize": "10px", "color": "var(--text-secondary)"}}>
                  오늘 뉴스 
                  <span style={{"color": "var(--accent)", "fontWeight": "700"}}>
                    42건
                  </span>
                </div>
                <div style={{"padding": "2px 10px", "fontSize": "10px", "color": "var(--text-secondary)"}}>
                  호재 
                  <span style={{"color": "var(--positive)"}}>
                    28
                  </span>
                   / 악재 
                  <span style={{"color": "var(--negative)"}}>
                    14
                  </span>
                </div>
              </div>
              <div className="preview-main">
                <div className="preview-stats">
                  <div className="preview-stat">
                    <div className="label">
                      포트폴리오
                    </div>
                    <div className="value" style={{"color": "var(--positive)"}}>
                      +2.34%
                    </div>
                    <div className="change" style={{"color": "var(--positive)"}}>
                      ▲ 오늘
                    </div>
                  </div>
                  <div className="preview-stat">
                    <div className="label">
                      호재 뉴스
                    </div>
                    <div className="value" style={{"color": "var(--text-primary)"}}>
                      28건
                    </div>
                    <div className="change" style={{"color": "var(--positive)"}}>
                      ▲ +8 급증
                    </div>
                  </div>
                  <div className="preview-stat">
                    <div className="label">
                      긴급 알림
                    </div>
                    <div className="value" style={{"color": "var(--negative)"}}>
                      3건
                    </div>
                    <div className="change" style={{"color": "var(--negative)"}}>
                      ● 확인 필요
                    </div>
                  </div>
                </div>
                <div className="preview-news-list">
                  <div className="preview-news-card good">
                    <div className="preview-news-chip good">
                      호재
                    </div>
                    <div style={{"flex": "1"}}>
                      <div className="preview-news-text">
                        삼성전자, 엔비디아와 HBM4 공급 계약 체결 임박... 수주 규모 10조원 전망
                      </div>
                      <div className="preview-news-impact">
                        영향력 ██████████░░ 83%
                      </div>
                    </div>
                  </div>
                  <div className="preview-news-card bad">
                    <div className="preview-news-chip bad">
                      악재
                    </div>
                    <div style={{"flex": "1"}}>
                      <div className="preview-news-text">
                        카카오 계열사 SM엔터 주식 거래 관련 금감원 조사 확대 가능성
                      </div>
                      <div className="preview-news-impact">
                        영향력 ████░░░░░░░░ 35%
                      </div>
                    </div>
                  </div>
                  <div className="preview-news-card mid">
                    <div className="preview-news-chip mid">
                      중립
                    </div>
                    <div style={{"flex": "1"}}>
                      <div className="preview-news-text">
                        NAVER, 웹툰 분기 실적 예상치 소폭 하회... 글로벌 MAU는 증가
                      </div>
                      <div className="preview-news-impact">
                        영향력 ██████░░░░░░ 52%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker-item">
            <span className="name">
              005930
            </span>
            <span className="price">
              84,200
            </span>
            <span className="up">
              ▲ +1.82%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              035720
            </span>
            <span className="price">
              42,150
            </span>
            <span className="dn">
              ▼ -0.94%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              000660
            </span>
            <span className="price">
              192,500
            </span>
            <span className="up">
              ▲ +3.11%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              035420
            </span>
            <span className="price">
              214,000
            </span>
            <span className="dn">
              ▼ -0.23%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              005380
            </span>
            <span className="price">
              271,000
            </span>
            <span className="up">
              ▲ +2.45%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              NVDA
            </span>
            <span className="price">
              $142.30
            </span>
            <span className="up">
              ▲ +4.20%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              AAPL
            </span>
            <span className="price">
              $218.10
            </span>
            <span className="up">
              ▲ +0.55%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              TSLA
            </span>
            <span className="price">
              $192.60
            </span>
            <span className="dn">
              ▼ -2.14%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              005930
            </span>
            <span className="price">
              84,200
            </span>
            <span className="up">
              ▲ +1.82%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              035720
            </span>
            <span className="price">
              42,150
            </span>
            <span className="dn">
              ▼ -0.94%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              000660
            </span>
            <span className="price">
              192,500
            </span>
            <span className="up">
              ▲ +3.11%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              035420
            </span>
            <span className="price">
              214,000
            </span>
            <span className="dn">
              ▼ -0.23%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              005380
            </span>
            <span className="price">
              271,000
            </span>
            <span className="up">
              ▲ +2.45%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              NVDA
            </span>
            <span className="price">
              $142.30
            </span>
            <span className="up">
              ▲ +4.20%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              AAPL
            </span>
            <span className="price">
              $218.10
            </span>
            <span className="up">
              ▲ +0.55%
            </span>
          </div>
          <div className="ticker-item">
            <span className="name">
              TSLA
            </span>
            <span className="price">
              $192.60
            </span>
            <span className="dn">
              ▼ -2.14%
            </span>
          </div>
        </div>
      </div>
      <section className="section" id="features">
        <div className="section-label">
          CORE FEATURES
        </div>
        <h2 className="section-title">
          뉴스를 보는 방식을
          <br />
          바꿉니다
        </h2>
        <p className="section-sub">
          기존 증권사 앱의 텍스트 나열 방식에서 벗어나, AI가 분석한 뉴스를 시각적으로 계층화합니다.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              🎯
            </div>
            <div className="feature-title">
              호재 / 악재 즉시 판단
            </div>
            <div className="feature-desc">
              AI가 뉴스 본문을 분석하여 해당 종목에 긍정적인지 부정적인지를 색상과 아이콘으로 즉시 구분합니다. 제목만 봐도 판단 가능.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              📊
            </div>
            <div className="feature-title">
              영향력 점수 시각화
            </div>
            <div className="feature-desc">
              뉴스의 중요도를 0-100점으로 정량화. 기관 발표, 실적, 정책 변화 등 파급력이 큰 뉴스를 최상단에 자동 배치합니다.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              ⚡
            </div>
            <div className="feature-title">
              급등락 즉시 원인 분석
            </div>
            <div className="feature-desc">
              종목이 ±3% 이상 변동될 때 즉시 알림과 함께 원인 뉴스를 자동으로 수집·분석하여 보고서를 생성합니다.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              🧺
            </div>
            <div className="feature-title">
              나만의 종목 바구니
            </div>
            <div className="feature-desc">
              관심 종목을 바구니에 담아 관리하세요. 국내·해외 주식 모두 지원하며, 하루 최대 10번 자동 크롤링됩니다.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              🔔
            </div>
            <div className="feature-title">
              맞춤 알림 설정
            </div>
            <div className="feature-desc">
              영향력 점수 70점 이상인 뉴스, 특정 키워드가 포함된 뉴스, 급등락 감지 등 조건별 알림을 세밀하게 설정합니다.
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              📈
            </div>
            <div className="feature-title">
              뉴스-주가 상관관계
            </div>
            <div className="feature-desc">
              과거 뉴스와 주가 움직임의 상관관계를 분석하여, 어떤 유형의 뉴스가 실제 주가에 영향을 줬는지 히스토리로 보여줍니다.
            </div>
          </div>
        </div>
      </section>
      <section className="steps" id="how">
        <div style={{"textAlign": "center"}}>
          <div className="section-label">
            HOW IT WORKS
          </div>
          <h2 className="section-title">
            4단계로 완성되는
            <br />
            AI 뉴스 분석
          </h2>
        </div>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">
              01
            </div>
            <div className="step-title">
              종목 등록
            </div>
            <div className="step-desc">
              관심 종목을 바구니에 추가합니다. 검색 한 번으로 국내외 주식 모두 등록 가능.
            </div>
          </div>
          <div className="step">
            <div className="step-number">
              02
            </div>
            <div className="step-title">
              AI 크롤링
            </div>
            <div className="step-desc">
              하루 n번 스케줄에 따라 AI가 각 종목 관련 뉴스를 자동으로 수집합니다.
            </div>
          </div>
          <div className="step">
            <div className="step-number">
              03
            </div>
            <div className="step-title">
              분석 & 분류
            </div>
            <div className="step-desc">
              호재/악재 판별, 영향력 점수 산정, 관련 테마 태깅이 자동으로 이루어집니다.
            </div>
          </div>
          <div className="step">
            <div className="step-number">
              04
            </div>
            <div className="step-title">
              시각적 리포트
            </div>
            <div className="step-desc">
              중요도 순서로 정렬된 뉴스를 한눈에 확인. 급등락 원인 리포트는 즉시 알림.
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section">
        <div className="cta-box">
          <div className="section-label">
            GET STARTED FREE
          </div>
          <h2 className="section-title">
            지금 바로 시작하세요
          </h2>
          <p className="section-sub">
            회원가입 후 5개 종목까지 무료로 사용할 수 있습니다.
            <br />
            신용카드 없이 즉시 시작 가능.
          </p>
          <div style={{"display": "flex", "justifyContent": "center", "gap": "12px", "marginTop": "36px"}}>
            <a href="register.html" className="btn-hero-primary">
              무료로 시작하기 →
            </a>
            <a href="login.html" className="btn-hero-ghost">
              이미 계정이 있어요
            </a>
          </div>
        </div>
      </section>
      <footer>
        <div className="footer-copy">
          © 2026 주식 바구니 · AI NEWS INTELLIGENCE · BETA
        </div>
        <div className="footer-links">
          <a href="#">
            이용약관
          </a>
          <a href="#">
            개인정보처리방침
          </a>
          <a href="#">
            공지사항
          </a>
          <a href="#">
            고객센터
          </a>
        </div>
      </footer>
    </>
  );
}
