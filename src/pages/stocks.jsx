import { useLegacyPage } from '../hooks/useLegacyPage.js';

const pageStyles = "\n.layout { display: flex; min-height: 100vh; }\n.sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; }\n.sidebar-logo { padding: 22px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }\n.sidebar-nav { flex: 1; padding: 14px 12px; overflow-y: auto; }\n.nav-section { font-size: 9px; font-family: 'DM Mono', monospace; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); padding: 10px 8px 5px; margin-top: 8px; }\n.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; margin-bottom: 2px; position: relative; }\n.nav-item:hover { background: var(--card); color: var(--text-primary); }\n.nav-item.active { background: var(--accent-bg); color: var(--accent); }\n.nav-item.active::before { content: ''; position: absolute; left: 0; top: 5px; bottom: 5px; width: 3px; background: var(--accent); border-radius: 0 2px 2px 0; }\n.nav-badge { margin-left: auto; background: var(--negative); color: #fff; font-size: 9px; font-weight: 700; padding: 1px 6px; border-radius: 20px; }\n.sidebar-bottom { padding: 12px; border-top: 1px solid var(--border); }\n.user-card { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 6px; cursor: pointer; transition: background 0.15s; }\n.user-card:hover { background: var(--card); }\n.user-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; }\n.user-name { font-size: 12.5px; font-weight: 600; }\n.user-plan { font-size: 9.5px; color: var(--accent); font-family: 'DM Mono', monospace; }\n\n.main { margin-left: var(--sidebar-w); flex: 1; }\n.topbar { height: 58px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 28px; gap: 14px; position: sticky; top: 0; z-index: 50; }\n.topbar-title { font-size: 15px; font-weight: 700; letter-spacing: -0.3px; }\n.topbar-sub { font-size: 11.5px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }\n.theme-btn { width: 32px; height: 32px; border-radius: 6px; background: transparent; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; transition: all 0.15s; }\n.theme-btn:hover { background: var(--card); color: var(--text-primary); }\n\n/* Page body with outer margin */\n.body { padding: 28px 40px; }\n\n/* ── ADD SECTION ── */\n.add-section {\n  display: grid;\n  grid-template-columns: 580px 1fr;\n  gap: 20px;\n  margin-bottom: 32px;\n  align-items: start;\n}\n\n.search-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 20px; }\n.card-title { font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 14px; }\n\n.search-bar { display: flex; gap: 8px; margin-bottom: 12px; }\n.search-input {\n  flex: 1; background: var(--surface); border: 1.5px solid var(--border); border-radius: 7px;\n  color: var(--text-primary); font-family: 'Noto Sans KR', sans-serif; font-size: 13.5px;\n  padding: 10px 14px; outline: none; transition: all 0.15s;\n}\n.search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }\n.search-input::placeholder { color: var(--text-muted); }\n.btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; font-family: 'Noto Sans KR', sans-serif; }\n.btn-primary { background: var(--accent); color: #fff; }\n.btn-primary:hover { background: var(--accent-hover); }\n.btn-ghost { background: transparent; color: var(--text-secondary); border: 1px solid var(--border); }\n.btn-ghost:hover { background: var(--card); color: var(--text-primary); }\n\n.market-tabs { display: flex; gap: 4px; margin-bottom: 12px; }\n.market-tab { padding: 5px 12px; border-radius: 5px; font-size: 11.5px; font-weight: 600; cursor: pointer; color: var(--text-muted); border: 1px solid var(--border); transition: all 0.15s; }\n.market-tab.active { background: var(--accent-bg); color: var(--accent); border-color: rgba(129,140,248,0.3); }\n\n.search-result-list { display: flex; flex-direction: column; gap: 6px; }\n.search-result-item {\n  background: var(--surface); border: 1px solid var(--border); border-radius: 8px;\n  padding: 10px 13px; display: flex; align-items: center; gap: 12px;\n  cursor: pointer; transition: all 0.15s;\n}\n.search-result-item:hover { background: var(--card); border-color: var(--accent); }\n.search-result-item.adding { border-color: var(--positive); background: var(--positive-bg); }\n.sr-logo { width: 34px; height: 34px; border-radius: 8px; background: var(--card); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }\n.sr-name { font-size: 13px; font-weight: 700; }\n.sr-code { font-size: 10px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.sr-market { font-size: 9px; padding: 2px 6px; border-radius: 4px; background: var(--surface); border: 1px solid var(--border); color: var(--text-muted); font-family: 'DM Mono', monospace; margin-left: 4px; }\n.sr-price { margin-left: auto; text-align: right; }\n.sr-price .price { font-size: 13px; font-weight: 700; font-family: 'DM Mono', monospace; }\n.sr-price .change { font-size: 10px; font-family: 'DM Mono', monospace; }\n.sr-add-btn { padding: 5px 11px; border-radius: 5px; background: var(--accent); color: #fff; font-size: 11.5px; font-weight: 700; border: none; cursor: pointer; font-family: 'Noto Sans KR', sans-serif; flex-shrink: 0; transition: all 0.15s; }\n.sr-add-btn:hover { background: var(--accent-hover); }\n.sr-add-btn.added { background: var(--positive-bg); color: var(--positive); border: 1px solid var(--positive-border); }\n\n/* Recommend card */\n.recommend-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 18px; }\n.recommend-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border); cursor: pointer; }\n.recommend-item:last-child { border-bottom: none; }\n.recommend-item:hover .r-name { color: var(--accent); }\n.r-rank { font-size: 11px; color: var(--text-muted); font-family: 'DM Mono', monospace; width: 16px; text-align: center; }\n.r-name { font-size: 12.5px; font-weight: 600; flex: 1; transition: color 0.15s; }\n.r-code { font-size: 10px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.r-heat { font-size: 10px; font-family: 'DM Mono', monospace; color: var(--neutral); }\n\n/* ── MY BASKET ── */\n.basket-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }\n.basket-header-left { font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); }\n.basket-header-right { display: flex; align-items: center; gap: 8px; }\n\n.drag-hint { font-size: 11px; color: var(--text-muted); font-family: 'DM Mono', monospace; display: flex; align-items: center; gap: 5px; }\n\n.basket-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }\n\n/* Draggable card */\n.basket-card {\n  background: var(--card); border: 1px solid var(--border); border-radius: 10px;\n  padding: 18px; position: relative; transition: all 0.18s; cursor: pointer;\n  user-select: none;\n}\n.basket-card:hover { background: var(--card-hover); border-color: var(--border-light); }\n.basket-card.dragging {\n  opacity: 0.5; transform: scale(0.97);\n  border: 2px dashed var(--accent);\n}\n.basket-card.drag-over {\n  border-color: var(--accent);\n  background: var(--accent-bg);\n  transform: scale(1.01);\n}\n\n.bc-drag-handle {\n  position: absolute; top: 10px; left: 50%; transform: translateX(-50%);\n  color: var(--text-muted); font-size: 12px; cursor: grab;\n  opacity: 0; transition: opacity 0.2s;\n  letter-spacing: 2px;\n}\n.basket-card:hover .bc-drag-handle { opacity: 1; }\n.bc-drag-handle:active { cursor: grabbing; }\n\n.basket-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; margin-top: 8px; }\n.bc-logo { width: 38px; height: 38px; border-radius: 9px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 17px; }\n.bc-remove { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 13px; padding: 4px; border-radius: 4px; transition: all 0.15s; }\n.bc-remove:hover { background: var(--negative-bg); color: var(--negative); }\n.bc-name { font-size: 14px; font-weight: 700; margin-bottom: 1px; }\n.bc-code { font-size: 10px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.bc-market-badge { font-size: 9px; padding: 1px 5px; border-radius: 3px; background: var(--surface); border: 1px solid var(--border); color: var(--text-muted); font-family: 'DM Mono', monospace; margin-left: 5px; }\n.bc-price-row { display: flex; align-items: flex-end; justify-content: space-between; margin: 8px 0 10px; }\n.bc-price { font-size: 19px; font-weight: 800; font-family: 'DM Mono', monospace; }\n.bc-change { font-size: 12px; font-family: 'DM Mono', monospace; font-weight: 700; }\n\n.bc-news-row { display: flex; gap: 4px; margin-bottom: 9px; flex-wrap: wrap; }\n.bc-news-pill { display: flex; align-items: center; gap: 3px; padding: 3px 7px; border-radius: 20px; font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace; }\n.bc-news-pill.good { background: var(--positive-bg); color: var(--positive); }\n.bc-news-pill.bad { background: var(--negative-bg); color: var(--negative); }\n.bc-news-pill.mid { background: var(--neutral-bg); color: var(--neutral); }\n\n.bc-alert-row { background: var(--surface); border-radius: 6px; padding: 6px 10px; font-size: 11px; color: var(--text-secondary); border: 1px solid var(--border); }\n.bc-alert-row.has-alert { background: var(--negative-bg); border-color: var(--negative-border); color: var(--negative); }\n\n/* ADD CARD */\n.basket-add-card {\n  background: transparent; border: 1.5px dashed var(--border); border-radius: 10px;\n  padding: 18px; display: flex; flex-direction: column; align-items: center;\n  justify-content: center; min-height: 190px; cursor: pointer; transition: all 0.18s; gap: 8px;\n}\n.basket-add-card:hover { border-color: var(--accent); background: var(--accent-bg); }\n.basket-add-card .add-icon { font-size: 26px; color: var(--text-muted); }\n.basket-add-card .add-text { font-size: 13px; color: var(--text-muted); font-weight: 600; }\n.basket-add-card:hover .add-icon, .basket-add-card:hover .add-text { color: var(--accent); }\n";
const pageScripts = "\n// Market filter\nfunction setMarket(m, el) {\n  document.querySelectorAll('.market-tab').forEach(t => t.classList.remove('active'));\n  el.classList.add('active');\n}\n\nfunction handleSearch(v) { /* API: GET /api/stocks/search?q=v&market=kospi,kosdaq */ }\n\nfunction addStock(el, name, code, market) {\n  const btn = el.querySelector('.sr-add-btn');\n  if (btn.classList.contains('added')) return;\n  btn.classList.add('added');\n  btn.textContent = '✓ 추가됨';\n  el.classList.add('adding');\n  setTimeout(() => alert(name + '이(가) 바구니에 추가되었습니다!'), 100);\n}\n\nfunction removeCard(e, btn) {\n  e.stopPropagation();\n  const card = btn.closest('.basket-card');\n  const name = card.querySelector('.bc-name').textContent.trim().split(' ')[0];\n  if (confirm(name + '을(를) 바구니에서 제거할까요?')) {\n    card.style.transition = 'all 0.2s';\n    card.style.opacity = '0';\n    card.style.transform = 'scale(0.9)';\n    setTimeout(() => { card.remove(); updateCount(); }, 200);\n  }\n}\n\nfunction goDetail(e) {\n  if (e.target.closest('.bc-remove')) return;\n  location.href = 'stock-detail.html';\n}\n\nfunction updateCount() {\n  const cards = document.querySelectorAll('.basket-card').length;\n  document.getElementById('basketCount').textContent = '(' + cards + '종목)';\n}\n\n// ── Drag & Drop Reorder ──\nlet dragSrc = null;\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  setupDrag();\n});\n\nfunction setupDrag() {\n  const cards = document.querySelectorAll('.basket-card[draggable]');\n  cards.forEach(card => {\n    card.addEventListener('dragstart', function(e) {\n      dragSrc = this;\n      this.classList.add('dragging');\n      e.dataTransfer.effectAllowed = 'move';\n    });\n    card.addEventListener('dragend', function() {\n      this.classList.remove('dragging');\n      document.querySelectorAll('.basket-card').forEach(c => c.classList.remove('drag-over'));\n    });\n    card.addEventListener('dragover', function(e) {\n      e.preventDefault();\n      e.dataTransfer.dropEffect = 'move';\n      document.querySelectorAll('.basket-card').forEach(c => c.classList.remove('drag-over'));\n      if (this !== dragSrc) this.classList.add('drag-over');\n    });\n    card.addEventListener('drop', function(e) {\n      e.preventDefault();\n      if (this !== dragSrc) {\n        const grid = document.getElementById('basketGrid');\n        const cards = [...grid.children];\n        const fromIdx = cards.indexOf(dragSrc);\n        const toIdx = cards.indexOf(this);\n        if (fromIdx < toIdx) {\n          grid.insertBefore(dragSrc, this.nextSibling);\n        } else {\n          grid.insertBefore(dragSrc, this);\n        }\n        this.classList.remove('drag-over');\n      }\n    });\n  });\n}\n\n// Theme\nfunction applyTheme(t) {\n  const r = document.documentElement;\n  if (t === 'light') {\n    r.classList.add('theme-light'); r.classList.remove('theme-dark');\n    r.setAttribute('data-theme', 'light');\n    document.getElementById('themeBtn').textContent = '☀️';\n  } else {\n    r.classList.remove('theme-light'); r.classList.add('theme-dark');\n    r.setAttribute('data-theme', 'dark');\n    document.getElementById('themeBtn').textContent = '🌙';\n  }\n  localStorage.setItem('theme', t);\n}\nfunction toggleTheme() {\n  const c = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n  applyTheme(c === 'dark' ? 'light' : 'dark');\n}\n(function() {\n  const s = localStorage.getItem('theme');\n  if (s) applyTheme(s);\n  else if (window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');\n  else document.getElementById('themeBtn').textContent = '🌙';\n})();\n";

export default function Stocks() {
  useLegacyPage({ title: "내 바구니 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

  return (
    <>
      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">
              🧺
            </div>
            <div>
              <div className="logo-text">
                주식 바구니
              </div>
              <div className="logo-sub">
                AI INTEL
              </div>
            </div>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-section">
              메뉴
            </div>
            <a href="news.html" className="nav-item">
              <span style={{"fontSize": "14px", "width": "20px", "textAlign": "center"}}>
                📰
              </span>
               뉴스 피드
              <span className="nav-badge">
                3
              </span>
            </a>
            <a href="stocks.html" className="nav-item active">
              <span style={{"fontSize": "14px", "width": "20px", "textAlign": "center"}}>
                🧺
              </span>
               내 바구니
            </a>
            <a href="stock-detail.html" className="nav-item">
              <span style={{"fontSize": "14px", "width": "20px", "textAlign": "center"}}>
                🔍
              </span>
               종목 분석
            </a>
            <div className="nav-section">
              설정
            </div>
            <a href="settings.html" className="nav-item">
              <span style={{"fontSize": "14px", "width": "20px", "textAlign": "center"}}>
                🔔
              </span>
               알림 설정
            </a>
            <a href="account.html" className="nav-item">
              <span style={{"fontSize": "14px", "width": "20px", "textAlign": "center"}}>
                ⚙️
              </span>
               계정 설정
            </a>
            <a href="index.html" className="nav-item">
              <span style={{"fontSize": "14px", "width": "20px", "textAlign": "center"}}>
                🏠
              </span>
               홈으로
            </a>
          </nav>
          <div className="sidebar-bottom">
            <div className="user-card">
              <div className="user-avatar">
                홍
              </div>
              <div>
                <div className="user-name">
                  홍길동
                </div>
                <div className="user-plan">
                  FREE
                </div>
              </div>
              <span style={{"marginLeft": "auto", "color": "var(--text-muted)", "fontSize": "14px"}}>
                ⋯
              </span>
            </div>
          </div>
        </aside>
        <div className="main">
          <div className="topbar">
            <div>
              <div className="topbar-title">
                내 바구니
              </div>
              <div className="topbar-sub">
                종목 등록 및 관리
              </div>
            </div>
            <div className="topbar-right">
              <button className="theme-btn" onClick={(event) => { toggleTheme(); }} id="themeBtn" title="테마 전환">
                🌙
              </button>
            </div>
          </div>
          <div className="body">
            <div className="add-section">
              <div className="search-card">
                <div className="card-title">
                  🔍 종목 검색 & 추가
                </div>
                <div className="search-bar">
                  <input type="text" className="search-input" id="searchInput" placeholder="종목명 또는 코드 검색 (예: 삼성전자, 005930)" onInput={(event) => { handleSearch(event.currentTarget.value); }} />
                  <button className="btn btn-primary">
                    검색
                  </button>
                </div>
                <div className="market-tabs">
                  <div className="market-tab active" onClick={(event) => { setMarket('kospi',event.currentTarget); }}>
                    KOSPI
                  </div>
                  <div className="market-tab" onClick={(event) => { setMarket('kosdaq',event.currentTarget); }}>
                    KOSDAQ
                  </div>
                </div>
                <div className="search-result-list" id="searchResults">
                  <div id="defaultResults">
                    <div style={{"fontSize": "11px", "color": "var(--text-muted)", "marginBottom": "8px", "fontFamily": "'DM Mono',monospace"}}>
                      📈 인기 종목
                    </div>
                    <div className="search-result-item" onClick={(event) => { addStock(event.currentTarget,'삼성전자','005930','KOSPI'); }}>
                      <div className="sr-logo">
                        💠
                      </div>
                      <div style={{"flex": "1"}}>
                        <div className="sr-name">
                          삼성전자 
                          <span className="sr-market">
                            KOSPI
                          </span>
                        </div>
                        <div className="sr-code">
                          005930
                        </div>
                      </div>
                      <div className="sr-price">
                        <div className="price">
                          84,200
                        </div>
                        <div className="change" style={{"color": "var(--positive)"}}>
                          ▲ +1.82%
                        </div>
                      </div>
                      <button className="sr-add-btn">
                        + 추가
                      </button>
                    </div>
                    <div className="search-result-item" onClick={(event) => { addStock(event.currentTarget,'SK하이닉스','000660','KOSPI'); }}>
                      <div className="sr-logo">
                        🔷
                      </div>
                      <div style={{"flex": "1"}}>
                        <div className="sr-name">
                          SK하이닉스 
                          <span className="sr-market">
                            KOSPI
                          </span>
                        </div>
                        <div className="sr-code">
                          000660
                        </div>
                      </div>
                      <div className="sr-price">
                        <div className="price">
                          192,500
                        </div>
                        <div className="change" style={{"color": "var(--positive)"}}>
                          ▲ +3.11%
                        </div>
                      </div>
                      <button className="sr-add-btn">
                        + 추가
                      </button>
                    </div>
                    <div className="search-result-item" onClick={(event) => { addStock(event.currentTarget,'카카오','035720','KOSPI'); }}>
                      <div className="sr-logo">
                        📱
                      </div>
                      <div style={{"flex": "1"}}>
                        <div className="sr-name">
                          카카오 
                          <span className="sr-market">
                            KOSPI
                          </span>
                        </div>
                        <div className="sr-code">
                          035720
                        </div>
                      </div>
                      <div className="sr-price">
                        <div className="price">
                          42,150
                        </div>
                        <div className="change" style={{"color": "var(--negative)"}}>
                          ▼ -4.20%
                        </div>
                      </div>
                      <button className="sr-add-btn">
                        + 추가
                      </button>
                    </div>
                    <div className="search-result-item" onClick={(event) => { addStock(event.currentTarget,'NAVER','035420','KOSPI'); }}>
                      <div className="sr-logo">
                        🟩
                      </div>
                      <div style={{"flex": "1"}}>
                        <div className="sr-name">
                          NAVER 
                          <span className="sr-market">
                            KOSPI
                          </span>
                        </div>
                        <div className="sr-code">
                          035420
                        </div>
                      </div>
                      <div className="sr-price">
                        <div className="price">
                          214,000
                        </div>
                        <div className="change" style={{"color": "var(--negative)"}}>
                          ▼ -0.23%
                        </div>
                      </div>
                      <button className="sr-add-btn">
                        + 추가
                      </button>
                    </div>
                    <div className="search-result-item" onClick={(event) => { addStock(event.currentTarget,'카카오게임즈','293490','KOSDAQ'); }}>
                      <div className="sr-logo">
                        🎮
                      </div>
                      <div style={{"flex": "1"}}>
                        <div className="sr-name">
                          카카오게임즈 
                          <span className="sr-market">
                            KOSDAQ
                          </span>
                        </div>
                        <div className="sr-code">
                          293490
                        </div>
                      </div>
                      <div className="sr-price">
                        <div className="price">
                          18,400
                        </div>
                        <div className="change" style={{"color": "var(--positive)"}}>
                          ▲ +1.10%
                        </div>
                      </div>
                      <button className="sr-add-btn">
                        + 추가
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="recommend-card">
                <div className="card-title">
                  🔥 오늘 핫 종목
                </div>
                <div style={{"fontSize": "11px", "color": "var(--text-muted)", "fontFamily": "'DM Mono',monospace", "marginBottom": "10px"}}>
                  뉴스 언급량 기준
                </div>
                <div className="recommend-item">
                  <span className="r-rank">
                    1
                  </span>
                  <div style={{"flex": "1"}}>
                    <div className="r-name">
                      삼성전자
                    </div>
                    <div className="r-code">
                      005930 · KOSPI
                    </div>
                  </div>
                  <span className="r-heat">
                    🔥 언급 284회
                  </span>
                </div>
                <div className="recommend-item">
                  <span className="r-rank">
                    2
                  </span>
                  <div style={{"flex": "1"}}>
                    <div className="r-name">
                      카카오
                    </div>
                    <div className="r-code">
                      035720 · KOSPI
                    </div>
                  </div>
                  <span className="r-heat">
                    🔥 언급 201회
                  </span>
                </div>
                <div className="recommend-item">
                  <span className="r-rank">
                    3
                  </span>
                  <div style={{"flex": "1"}}>
                    <div className="r-name">
                      SK하이닉스
                    </div>
                    <div className="r-code">
                      000660 · KOSPI
                    </div>
                  </div>
                  <span className="r-heat" style={{"color": "var(--text-secondary)"}}>
                    언급 176회
                  </span>
                </div>
                <div className="recommend-item">
                  <span className="r-rank">
                    4
                  </span>
                  <div style={{"flex": "1"}}>
                    <div className="r-name">
                      NAVER
                    </div>
                    <div className="r-code">
                      035420 · KOSPI
                    </div>
                  </div>
                  <span className="r-heat" style={{"color": "var(--text-secondary)"}}>
                    언급 143회
                  </span>
                </div>
                <div className="recommend-item">
                  <span className="r-rank">
                    5
                  </span>
                  <div style={{"flex": "1"}}>
                    <div className="r-name">
                      셀트리온
                    </div>
                    <div className="r-code">
                      068270 · KOSPI
                    </div>
                  </div>
                  <span className="r-heat" style={{"color": "var(--text-secondary)"}}>
                    언급 98회
                  </span>
                </div>
                <div style={{"marginTop": "12px", "padding": "9px", "background": "var(--surface)", "borderRadius": "6px", "border": "1px solid var(--border)", "fontSize": "11.5px", "color": "var(--text-secondary)", "lineHeight": "1.6"}}>
                  
          💡 AI 추천: 오늘 
                  <strong style={{"color": "var(--positive)"}}>
                    SK하이닉스
                  </strong>
                  와 
                  <strong style={{"color": "var(--positive)"}}>
                    삼성전자
                  </strong>
                  의 뉴스 흐름이 매우 긍정적입니다.
        
                </div>
              </div>
            </div>
            <div className="basket-header">
              <div className="basket-header-left">
                🧺 내 바구니 
                <span id="basketCount" style={{"color": "var(--accent)"}}>
                  (5종목)
                </span>
              </div>
              <div className="basket-header-right">
                <span className="drag-hint">
                  ⠿ 드래그로 순서 변경
                </span>
              </div>
            </div>
            <div className="basket-grid" id="basketGrid">
              <div className="basket-card" draggable={true} data-id="005930" onClick={(event) => { goDetail(event); }}>
                <div className="bc-drag-handle">
                  ⠿⠿
                </div>
                <div className="basket-card-top">
                  <div className="bc-logo">
                    💠
                  </div>
                  <button className="bc-remove" onClick={(event) => { removeCard(event,event.currentTarget); }}>
                    ✕
                  </button>
                </div>
                <div className="bc-name">
                  삼성전자 
                  <span className="bc-market-badge">
                    KOSPI
                  </span>
                </div>
                <div className="bc-code">
                  005930
                </div>
                <div className="bc-price-row">
                  <div className="bc-price">
                    84,200
                  </div>
                  <div className="bc-change" style={{"color": "var(--positive)"}}>
                    ▲ +1.82%
                  </div>
                </div>
                <div className="bc-news-row">
                  <span className="bc-news-pill good">
                    🟢 호재 7
                  </span>
                  <span className="bc-news-pill bad">
                    🔴 악재 3
                  </span>
                  <span className="bc-news-pill mid">
                    🟡 중립 2
                  </span>
                </div>
                <div className="bc-alert-row">
                  🔕 알림 없음
                </div>
              </div>
              <div className="basket-card" draggable={true} data-id="035720" onClick={(event) => { goDetail(event); }}>
                <div className="bc-drag-handle">
                  ⠿⠿
                </div>
                <div className="basket-card-top">
                  <div className="bc-logo">
                    📱
                  </div>
                  <button className="bc-remove" onClick={(event) => { removeCard(event,event.currentTarget); }}>
                    ✕
                  </button>
                </div>
                <div className="bc-name">
                  카카오 
                  <span className="bc-market-badge">
                    KOSPI
                  </span>
                </div>
                <div className="bc-code">
                  035720
                </div>
                <div className="bc-price-row">
                  <div className="bc-price">
                    42,150
                  </div>
                  <div className="bc-change" style={{"color": "var(--negative)"}}>
                    ▼ -4.20%
                  </div>
                </div>
                <div className="bc-news-row">
                  <span className="bc-news-pill good">
                    🟢 호재 2
                  </span>
                  <span className="bc-news-pill bad">
                    🔴 악재 6
                  </span>
                </div>
                <div className="bc-alert-row has-alert">
                  ⚡ 급락 -4.2% 감지 · 원인 분석 완료
                </div>
              </div>
              <div className="basket-card" draggable={true} data-id="000660" onClick={(event) => { goDetail(event); }}>
                <div className="bc-drag-handle">
                  ⠿⠿
                </div>
                <div className="basket-card-top">
                  <div className="bc-logo">
                    🔷
                  </div>
                  <button className="bc-remove" onClick={(event) => { removeCard(event,event.currentTarget); }}>
                    ✕
                  </button>
                </div>
                <div className="bc-name">
                  SK하이닉스 
                  <span className="bc-market-badge">
                    KOSPI
                  </span>
                </div>
                <div className="bc-code">
                  000660
                </div>
                <div className="bc-price-row">
                  <div className="bc-price">
                    192,500
                  </div>
                  <div className="bc-change" style={{"color": "var(--positive)"}}>
                    ▲ +3.11%
                  </div>
                </div>
                <div className="bc-news-row">
                  <span className="bc-news-pill good">
                    🟢 호재 8
                  </span>
                  <span className="bc-news-pill bad">
                    🔴 악재 2
                  </span>
                </div>
                <div className="bc-alert-row">
                  🔕 알림 없음
                </div>
              </div>
              <div className="basket-card" draggable={true} data-id="035420" onClick={(event) => { goDetail(event); }}>
                <div className="bc-drag-handle">
                  ⠿⠿
                </div>
                <div className="basket-card-top">
                  <div className="bc-logo">
                    🟩
                  </div>
                  <button className="bc-remove" onClick={(event) => { removeCard(event,event.currentTarget); }}>
                    ✕
                  </button>
                </div>
                <div className="bc-name">
                  NAVER 
                  <span className="bc-market-badge">
                    KOSPI
                  </span>
                </div>
                <div className="bc-code">
                  035420
                </div>
                <div className="bc-price-row">
                  <div className="bc-price">
                    214,000
                  </div>
                  <div className="bc-change" style={{"color": "var(--negative)"}}>
                    ▼ -0.23%
                  </div>
                </div>
                <div className="bc-news-row">
                  <span className="bc-news-pill good">
                    🟢 호재 3
                  </span>
                  <span className="bc-news-pill bad">
                    🔴 악재 3
                  </span>
                </div>
                <div className="bc-alert-row">
                  🔕 알림 없음
                </div>
              </div>
              <div className="basket-card" draggable={true} data-id="005380" onClick={(event) => { goDetail(event); }}>
                <div className="bc-drag-handle">
                  ⠿⠿
                </div>
                <div className="basket-card-top">
                  <div className="bc-logo">
                    🚗
                  </div>
                  <button className="bc-remove" onClick={(event) => { removeCard(event,event.currentTarget); }}>
                    ✕
                  </button>
                </div>
                <div className="bc-name">
                  현대차 
                  <span className="bc-market-badge">
                    KOSPI
                  </span>
                </div>
                <div className="bc-code">
                  005380
                </div>
                <div className="bc-price-row">
                  <div className="bc-price">
                    271,000
                  </div>
                  <div className="bc-change" style={{"color": "var(--positive)"}}>
                    ▲ +2.45%
                  </div>
                </div>
                <div className="bc-news-row">
                  <span className="bc-news-pill good">
                    🟢 호재 5
                  </span>
                  <span className="bc-news-pill bad">
                    🔴 악재 1
                  </span>
                </div>
                <div className="bc-alert-row">
                  🔕 알림 없음
                </div>
              </div>
              <div className="basket-add-card" onClick={(event) => { document.getElementById('searchInput').focus(); }}>
                <div className="add-icon">
                  +
                </div>
                <div className="add-text">
                  종목 추가하기
                </div>
                <div style={{"fontSize": "11px", "color": "var(--text-muted)"}}>
                  검색창에서 종목을 선택하세요
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
