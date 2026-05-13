import { useLegacyPage } from '../hooks/useLegacyPage.js';

const pageStyles = "\n*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}\na{text-decoration:none;color:inherit;}\n::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px;}\n\n.layout{display:flex;min-height:100vh;}\n.sidebar{width:var(--sidebar-w);background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;}\n.sidebar-logo{padding:22px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;}\n.logo-icon{width:34px;height:34px;background:linear-gradient(135deg,var(--accent),#6366f1);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;}\n.logo-text{font-size:15px;font-weight:800;letter-spacing:-0.3px;}\n.logo-sub{font-size:9px;color:var(--text-muted);font-family:'DM Mono',monospace;letter-spacing:1.5px;text-transform:uppercase;}\n.sidebar-nav{flex:1;padding:16px 12px;overflow-y:auto;}\n.nav-section{font-size:9px;font-family:'DM Mono',monospace;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);padding:10px 8px 5px;margin-top:8px;}\n.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:6px;font-size:13px;font-weight:500;color:var(--text-secondary);cursor:pointer;transition:all 0.15s;margin-bottom:2px;position:relative;}\n.nav-item:hover{background:var(--card);color:var(--text-primary);}\n.nav-item.active{background:var(--accent-bg);color:var(--accent);}\n.nav-item.active::before{content:'';position:absolute;left:0;top:5px;bottom:5px;width:3px;background:var(--accent);border-radius:0 2px 2px 0;}\n.nav-badge{margin-left:auto;background:var(--negative);color:#fff;font-size:9px;font-weight:700;padding:1px 6px;border-radius:20px;}\n.sidebar-bottom{padding:12px;border-top:1px solid var(--border);}\n.user-card{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:6px;cursor:pointer;transition:background 0.15s;}\n.user-card:hover{background:var(--card);}\n.user-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;}\n.user-name{font-size:12.5px;font-weight:600;}\n.user-plan{font-size:9.5px;color:var(--accent);font-family:'DM Mono',monospace;}\n\n.main{margin-left:var(--sidebar-w);flex:1;}\n.topbar{height:58px;background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 28px;gap:14px;position:sticky;top:0;z-index:50;}\n.topbar-title{font-size:15px;font-weight:700;letter-spacing:-0.3px;}\n.topbar-sub{font-size:11.5px;color:var(--text-muted);font-family:'DM Mono',monospace;}\n.topbar-right{margin-left:auto;display:flex;align-items:center;gap:10px;}\n.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:6px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;transition:all 0.15s;font-family:'Noto Sans KR',sans-serif;}\n.btn-primary{background:var(--accent);color:#fff;}\n.btn-primary:hover{background:#6366f1;}\n.btn-ghost{background:transparent;color:var(--text-secondary);border:1px solid var(--border);}\n.btn-ghost:hover{background:var(--card);color:var(--text-primary);}\n\n.body{padding:26px 28px;}\n\n/* ── FILTER BAR ── */\n.filter-row{display:flex;align-items:center;gap:10px;margin-bottom:20px;flex-wrap:wrap;}\n.filter-group{display:flex;gap:4px;}\n.f-tab{padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;color:var(--text-muted);border:1px solid var(--border);background:var(--surface);transition:all 0.15s;}\n.f-tab:hover{border-color:var(--border-light);color:var(--text-secondary);}\n.f-tab.active{background:var(--card);color:var(--text-primary);border-color:var(--border-light);}\n.f-tab.good.active{background:var(--positive-bg);color:var(--positive);border-color:var(--positive-border);}\n.f-tab.bad.active{background:var(--negative-bg);color:var(--negative);border-color:var(--negative-border);}\n.f-tab.urgent.active{background:rgba(248,113,113,0.15);color:var(--negative);border-color:var(--negative);}\n\n.theme-btn{width:32px;height:32px;border-radius:6px;background:transparent;border:1px solid var(--border);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;transition:all 0.15s;}\n.theme-btn:hover{background:var(--card);color:var(--text-primary);}\n.sort-select{padding:6px 10px;border-radius:6px;background:var(--surface);border:1px solid var(--border);color:var(--text-secondary);font-size:12px;font-family:'Noto Sans KR',sans-serif;outline:none;cursor:pointer;margin-left:auto;}\n\n/* Stock filter pills */\n.stock-pills{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;}\n.stock-pill{\n  padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;cursor:pointer;\n  border:1px solid var(--border);background:var(--surface);color:var(--text-muted);\n  transition:all 0.15s;font-family:'DM Mono',monospace;\n  display:flex;align-items:center;gap:5px;\n}\n.stock-pill:hover{border-color:var(--border-light);color:var(--text-secondary);}\n.stock-pill.active{background:var(--card);color:var(--text-primary);border-color:var(--border-light);}\n.stock-pill .dot{width:6px;height:6px;border-radius:50%;}\n\n/* ── NEWS GRID ── */\n.news-grid{display:grid;grid-template-columns:1fr 300px;gap:18px;}\n.news-feed{display:flex;flex-direction:column;gap:10px;}\n\n/* URGENT section */\n.urgent-section{margin-bottom:8px;}\n.urgent-header{\n  display:flex;align-items:center;gap:8px;\n  font-size:11px;font-weight:700;font-family:'DM Mono',monospace;\n  letter-spacing:1.5px;text-transform:uppercase;\n  color:var(--negative);margin-bottom:8px;\n}\n.urgent-dot{width:7px;height:7px;border-radius:50%;background:var(--negative);animation:pulse 1.2s infinite;}\n@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.3;}}\n\n.section-label{font-size:11px;font-weight:700;font-family:'DM Mono',monospace;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-secondary);margin:16px 0 8px;display:flex;align-items:center;gap:6px;}\n\n/* NEWS CARDS */\n.news-card{\n  background:var(--card);border:1px solid var(--border);border-radius:10px;\n  padding:16px 18px;display:flex;gap:14px;\n  border-left:3px solid transparent;\n  cursor:pointer;transition:all 0.15s;\n}\n.news-card:hover{background:var(--card-hover);border-color:var(--border-light);transform:translateX(2px);}\n.news-card.good{border-left-color:var(--positive);}\n.news-card.bad{border-left-color:var(--negative);}\n.news-card.mid{border-left-color:var(--neutral);}\n.news-card.urgent{border-left-color:var(--negative);border-top:1px solid var(--negative-border);box-shadow:0 0 12px rgba(248,113,113,0.08);}\n.news-card.xl{padding:20px 22px;}\n\n.news-rank{font-family:'DM Mono',monospace;font-size:16px;font-weight:700;color:var(--text-muted);flex-shrink:0;width:24px;text-align:center;margin-top:3px;}\n.news-body-wrap{flex:1;min-width:0;}\n.news-meta{display:flex;align-items:center;gap:7px;margin-bottom:7px;flex-wrap:wrap;}\n\n.chip{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;font-family:'DM Mono',monospace;}\n.chip-good{background:var(--positive-bg);color:var(--positive);border:1px solid var(--positive-border);}\n.chip-bad{background:var(--negative-bg);color:var(--negative);border:1px solid var(--negative-border);}\n.chip-mid{background:var(--neutral-bg);color:var(--neutral);border:1px solid var(--neutral-border);}\n.chip-urgent{background:rgba(248,113,113,0.2);color:var(--negative);border:1px solid var(--negative);}\n.chip-accent{background:var(--accent-bg);color:var(--accent);border:1px solid rgba(129,140,248,0.25);}\n.chip-gray{background:var(--surface);color:var(--text-muted);border:1px solid var(--border);}\n\n.news-stock{font-size:11px;font-weight:700;color:var(--accent);font-family:'DM Mono',monospace;}\n.news-source{font-size:10px;color:var(--text-muted);}\n.news-time{font-size:10px;color:var(--text-muted);font-family:'DM Mono',monospace;margin-left:auto;}\n.news-title{font-size:14px;font-weight:600;line-height:1.45;margin-bottom:6px;}\n.news-xl .news-title{font-size:15.5px;}\n.news-excerpt{font-size:12px;color:var(--text-secondary);line-height:1.6;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}\n\n/* impact */\n.impact-section{display:flex;flex-direction:column;gap:5px;}\n.impact-row{display:flex;align-items:center;gap:8px;}\n.impact-label{font-size:10px;color:var(--text-muted);font-family:'DM Mono',monospace;white-space:nowrap;min-width:36px;}\n.impact-bar{flex:1;height:5px;background:var(--border);border-radius:4px;overflow:hidden;max-width:150px;}\n.impact-fill{height:100%;border-radius:4px;}\n.impact-score{font-size:11px;font-weight:700;font-family:'DM Mono',monospace;min-width:24px;}\n.impact-reason{font-size:11px;color:var(--text-muted);margin-top:2px;}\n\n.news-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;}\n.tag{display:inline-flex;align-items:center;background:var(--surface);border:1px solid var(--border);padding:1px 6px;border-radius:3px;font-size:10px;color:var(--text-muted);}\n\n/* ── RIGHT SIDE ── */\n.right-col{display:flex;flex-direction:column;gap:14px;}\n.right-top {display:flex;flex-direction: column;gap:14px;}\n.widget{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:16px;max-height: 300px; overflow-y: auto;}\n.widget-title{font-size:11px;font-weight:700;font-family:'DM Mono',monospace;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px;}\n\n/* Keyword cloud */\n.keyword-cloud{display:flex;flex-wrap:wrap;gap:6px;}\n.kw{padding:4px 10px;border-radius:20px;font-size:11.5px;cursor:pointer;transition:all 0.15s;border:1px solid var(--border);background:var(--surface);color:var(--text-secondary);}\n.kw:hover{border-color:var(--accent);color:var(--accent);}\n.kw.big{font-size:13px;font-weight:700;color:var(--text-primary);background:var(--card);}\n.kw.medium{font-size:12px;color:var(--text-secondary);}\n\n/* Timeline */\n.timeline{display:flex;flex-direction:column;gap:0;}\n.tl-item{display:flex;gap:10px;padding:8px 0;position:relative;}\n.tl-item:not(:last-child)::before{content:'';position:absolute;left:15px;top:32px;bottom:0;width:1px;background:var(--border);}\n.tl-time{font-size:10px;color:var(--text-muted);font-family:'DM Mono',monospace;white-space:nowrap;min-width:38px;padding-top:3px;}\n.tl-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:5px;border:2px solid var(--bg);}\n.tl-text{font-size:11.5px;color:var(--text-secondary);line-height:1.5;flex:1;}\n.tl-text strong{color:var(--text-primary);}\n";
const pageScripts = "\nfunction setFilter(type, el) {\n  document.querySelectorAll('.f-tab').forEach(t => t.classList.remove('active'));\n  el.classList.add('active');\n}\nfunction togglePill(el) {\n  document.querySelectorAll('.stock-pill').forEach(p => p.classList.remove('active'));\n  el.classList.add('active');\n}\n\n\nfunction applyTheme(t){const r=document.documentElement;if(t==='light'){r.classList.add('theme-light');r.classList.remove('theme-dark');r.setAttribute('data-theme','light');const b=document.getElementById('themeBtn');if(b)b.textContent='☀️';}else{r.classList.remove('theme-light');r.classList.add('theme-dark');r.setAttribute('data-theme','dark');const b=document.getElementById('themeBtn');if(b)b.textContent='🌙';}localStorage.setItem('theme',t);}\nfunction toggleTheme(){const c=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');applyTheme(c==='dark'?'light':'dark');}\n(function(){const s=localStorage.getItem('theme');if(s)applyTheme(s);else if(window.matchMedia('(prefers-color-scheme: light)').matches)applyTheme('light');})();\n";

export default function News() {
  useLegacyPage({ title: "뉴스 피드 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

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
            <a href="news.html" className="nav-item active">
              <span style={{"fontSize": "14px", "width": "20px", "textAlign": "center"}}>
                📰
              </span>
               뉴스 피드
              <span className="nav-badge">
                3
              </span>
            </a>
            <a href="stocks.html" className="nav-item">
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
                  PRO PLAN
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
                뉴스 피드
              </div>
              <div className="topbar-sub">
                오후 2:30 기준 · 42건 분석 완료
              </div>
            </div>
            <div className="topbar-right">
              <button className="btn btn-ghost" onClick={(event) => { location.href='settings.html'; }}>
                🔔 알림 설정
              </button>
              <button className="btn btn-primary" onClick={(event) => { alert('새로고침! 실제 서비스에서는 최신 뉴스를 크롤링합니다.'); }}>
                ↺ 새로고침
              </button>
              <button className="theme-btn" onClick={(event) => { toggleTheme(); }} id="themeBtn" title="테마 전환">
                🌙
              </button>
            </div>
          </div>
          <div className="body">
            <div className="filter-row">
              <div className="filter-group">
                <div className="f-tab active" onClick={(event) => { setFilter('all',event.currentTarget); }}>
                  전체 42
                </div>
                <div className="f-tab good" onClick={(event) => { setFilter('good',event.currentTarget); }}>
                  🟢 호재 28
                </div>
                <div className="f-tab bad" onClick={(event) => { setFilter('bad',event.currentTarget); }}>
                  🔴 악재 14
                </div>
                <div className="f-tab" onClick={(event) => { setFilter('mid',event.currentTarget); }}>
                  🟡 중립 8
                </div>
                <div className="f-tab urgent" onClick={(event) => { setFilter('urgent',event.currentTarget); }}>
                  ⚡ 긴급 3
                </div>
              </div>
              <select className="sort-select">
                <option>
                  영향력 높은순
                </option>
                <option>
                  최신순
                </option>
                <option>
                  호재 먼저
                </option>
                <option>
                  악재 먼저
                </option>
              </select>
            </div>
            <div className="stock-pills">
              <div className="stock-pill active" onClick={(event) => { togglePill(event.currentTarget); }}>
                <span className="dot" style={{"background": "var(--positive)"}}></span>
                전체
              </div>
              <div className="stock-pill" onClick={(event) => { togglePill(event.currentTarget); }}>
                <span className="dot" style={{"background": "var(--positive)"}}></span>
                삼성전자
              </div>
              <div className="stock-pill" onClick={(event) => { togglePill(event.currentTarget); }}>
                <span className="dot" style={{"background": "var(--negative)"}}></span>
                카카오
              </div>
              <div className="stock-pill" onClick={(event) => { togglePill(event.currentTarget); }}>
                <span className="dot" style={{"background": "var(--positive)"}}></span>
                SK하이닉스
              </div>
              <div className="stock-pill" onClick={(event) => { togglePill(event.currentTarget); }}>
                <span className="dot" style={{"background": "var(--neutral)"}}></span>
                NAVER
              </div>
              <div className="stock-pill" onClick={(event) => { togglePill(event.currentTarget); }}>
                <span className="dot" style={{"background": "var(--positive)"}}></span>
                현대차
              </div>
            </div>
            <div className="news-grid">
              <div className="news-feed" id="newsFeed">
                <div className="urgent-section">
                  <div className="urgent-header">
                    <div className="urgent-dot"></div>
                    ⚡ 긴급 · 즉시 확인 필요
                  </div>
                  <div className="news-card bad urgent xl news-xl" onClick={(event) => { location.href='news-detail.html'; }} style={{"marginBottom": "6px"}}>
                    <div className="news-rank" style={{"fontSize": "22px", "color": "var(--negative)"}}>
                      !
                    </div>
                    <div className="news-body-wrap">
                      <div className="news-meta">
                        <span className="chip chip-bad">
                          🔴 악재
                        </span>
                        <span className="chip chip-urgent">
                          ⚡ 급락 원인
                        </span>
                        <span className="chip chip-accent">
                          AI 분석 완료
                        </span>
                        <span className="news-stock">
                          카카오
                        </span>
                        <span className="news-source">
                          금융신문
                        </span>
                        <span className="news-time">
                          13:58
                        </span>
                      </div>
                      <div className="news-title">
                        금감원, 카카오 SM엔터 주가 조작 의혹 조사 범위 확대… 카카오엔터·카카오페이 포함 가능성
                      </div>
                      <div className="news-excerpt">
                        금융감독원이 카카오의 SM엔터테인먼트 인수 과정에서 발생한 주가 조작 의혹 조사를 카카오 주요 계열사로 확대하는 방안을 검토 중인 것으로 알려졌다. 이는 이날 카카오 주가가 장중 -4.2%까지 급락하는 주요 원인으로 분석된다.
                      </div>
                      <div className="impact-section">
                        <div className="impact-row">
                          <span className="impact-label">
                            영향력
                          </span>
                          <div className="impact-bar">
                            <div className="impact-fill" style={{"width": "85%", "background": "var(--negative)"}}></div>
                          </div>
                          <span className="impact-score" style={{"color": "var(--negative)"}}>
                            85
                          </span>
                          <span style={{"fontSize": "10px", "color": "var(--text-muted)", "fontFamily": "'DM Mono',monospace"}}>
                            · 매우 높음
                          </span>
                        </div>
                        <div className="impact-reason">
                          💡 AI 판단: 규제·소송 관련 뉴스로 단기 주가 하락 압력 강함. 계열사 확대 시 추가 하락 가능.
                        </div>
                      </div>
                      <div className="news-tags">
                        <span className="tag">
                          규제
                        </span>
                        <span className="tag">
                          금감원
                        </span>
                        <span className="tag">
                          주가조작
                        </span>
                        <span className="tag">
                          계열사
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="section-label">
                  🔥 영향력 높음 (70점↑)
                </div>
                <div className="news-card good" onClick={(event) => { location.href='news-detail.html'; }}>
                  <div className="news-rank">
                    #1
                  </div>
                  <div className="news-body-wrap">
                    <div className="news-meta">
                      <span className="chip chip-good">
                        🟢 호재
                      </span>
                      <span className="news-stock">
                        삼성전자
                      </span>
                      <span className="news-source">
                        전자신문
                      </span>
                      <span className="news-time">
                        14:22
                      </span>
                    </div>
                    <div className="news-title">
                      삼성전자, 엔비디아와 HBM4 공급 계약 체결 임박… 수주 규모 10조원 전망
                    </div>
                    <div className="news-excerpt">
                      반도체 업계에 따르면 삼성전자의 HBM4 납품 계약이 이달 내 체결 예정이며, 수주 규모가 업계 예상치를 크게 상회할 것으로 보인다.
                    </div>
                    <div className="impact-section">
                      <div className="impact-row">
                        <span className="impact-label">
                          영향력
                        </span>
                        <div className="impact-bar">
                          <div className="impact-fill" style={{"width": "92%", "background": "var(--positive)"}}></div>
                        </div>
                        <span className="impact-score" style={{"color": "var(--positive)"}}>
                          92
                        </span>
                        <span style={{"fontSize": "10px", "color": "var(--text-muted)", "fontFamily": "'DM Mono',monospace"}}>
                          · 최고 등급
                        </span>
                      </div>
                      <div className="impact-reason">
                        💡 대규모 계약 소식으로 주가 상승 압력. 실적 개선 가시성 높아짐.
                      </div>
                    </div>
                    <div className="news-tags">
                      <span className="tag">
                        HBM
                      </span>
                      <span className="tag">
                        엔비디아
                      </span>
                      <span className="tag">
                        계약
                      </span>
                      <span className="tag">
                        반도체
                      </span>
                    </div>
                  </div>
                </div>
                <div className="news-card good" onClick={(event) => { location.href='news-detail.html'; }}>
                  <div className="news-rank">
                    #2
                  </div>
                  <div className="news-body-wrap">
                    <div className="news-meta">
                      <span className="chip chip-good">
                        🟢 호재
                      </span>
                      <span className="news-stock">
                        SK하이닉스
                      </span>
                      <span className="news-source">
                        한국경제
                      </span>
                      <span className="news-time">
                        13:15
                      </span>
                    </div>
                    <div className="news-title">
                      SK하이닉스 1분기 영업이익 7조원 돌파 전망… 주요 증권사 목표주가 일제히 상향
                    </div>
                    <div className="impact-section">
                      <div className="impact-row">
                        <span className="impact-label">
                          영향력
                        </span>
                        <div className="impact-bar">
                          <div className="impact-fill" style={{"width": "76%", "background": "var(--positive)"}}></div>
                        </div>
                        <span className="impact-score" style={{"color": "var(--positive)"}}>
                          76
                        </span>
                      </div>
                    </div>
                    <div className="news-tags">
                      <span className="tag">
                        실적
                      </span>
                      <span className="tag">
                        목표주가
                      </span>
                      <span className="tag">
                        HBM
                      </span>
                    </div>
                  </div>
                </div>
                <div className="news-card bad" onClick={(event) => { location.href='news-detail.html'; }}>
                  <div className="news-rank">
                    #3
                  </div>
                  <div className="news-body-wrap">
                    <div className="news-meta">
                      <span className="chip chip-bad">
                        🔴 악재
                      </span>
                      <span className="news-stock">
                        카카오
                      </span>
                      <span className="news-source">
                        조선비즈
                      </span>
                      <span className="news-time">
                        11:44
                      </span>
                    </div>
                    <div className="news-title">
                      카카오 2대 주주 TI 자산운용, 추가 블록딜 가능성 시사… 오버행 우려 확대
                    </div>
                    <div className="impact-section">
                      <div className="impact-row">
                        <span className="impact-label">
                          영향력
                        </span>
                        <div className="impact-bar">
                          <div className="impact-fill" style={{"width": "71%", "background": "var(--negative)"}}></div>
                        </div>
                        <span className="impact-score" style={{"color": "var(--negative)"}}>
                          71
                        </span>
                      </div>
                    </div>
                    <div className="news-tags">
                      <span className="tag">
                        오버행
                      </span>
                      <span className="tag">
                        블록딜
                      </span>
                      <span className="tag">
                        수급
                      </span>
                    </div>
                  </div>
                </div>
                <div className="section-label">
                  📊 영향력 중간 (40-70점)
                </div>
                <div className="news-card good" onClick={(event) => { location.href='news-detail.html'; }}>
                  <div className="news-rank">
                    #4
                  </div>
                  <div className="news-body-wrap">
                    <div className="news-meta">
                      <span className="chip chip-good">
                        🟢 호재
                      </span>
                      <span className="news-stock">
                        현대차
                      </span>
                      <span className="news-source">
                        뉴스1
                      </span>
                      <span className="news-time">
                        11:22
                      </span>
                    </div>
                    <div className="news-title">
                      현대차 아이오닉5, 미국 전기차 보조금 재지급 확인… 판매 모멘텀 회복 기대
                    </div>
                    <div className="impact-section">
                      <div className="impact-row">
                        <span className="impact-label">
                          영향력
                        </span>
                        <div className="impact-bar">
                          <div className="impact-fill" style={{"width": "67%", "background": "var(--positive)"}}></div>
                        </div>
                        <span className="impact-score" style={{"color": "var(--positive)"}}>
                          67
                        </span>
                      </div>
                    </div>
                    <div className="news-tags">
                      <span className="tag">
                        전기차
                      </span>
                      <span className="tag">
                        보조금
                      </span>
                      <span className="tag">
                        미국
                      </span>
                    </div>
                  </div>
                </div>
                <div className="news-card mid" onClick={(event) => { location.href='news-detail.html'; }}>
                  <div className="news-rank">
                    #5
                  </div>
                  <div className="news-body-wrap">
                    <div className="news-meta">
                      <span className="chip chip-mid">
                        🟡 중립
                      </span>
                      <span className="news-stock">
                        NAVER
                      </span>
                      <span className="news-source">
                        연합뉴스
                      </span>
                      <span className="news-time">
                        12:40
                      </span>
                    </div>
                    <div className="news-title">
                      NAVER 웹툰, 분기 매출 예상치 소폭 하회… 글로벌 MAU 2.3억명으로 증가 긍정적
                    </div>
                    <div className="impact-section">
                      <div className="impact-row">
                        <span className="impact-label">
                          영향력
                        </span>
                        <div className="impact-bar">
                          <div className="impact-fill" style={{"width": "52%", "background": "var(--neutral)"}}></div>
                        </div>
                        <span className="impact-score" style={{"color": "var(--neutral)"}}>
                          52
                        </span>
                      </div>
                      <div className="impact-reason">
                        💡 엇갈린 신호. 매출 미달은 부정적이나 사용자 증가는 장기 긍정 신호.
                      </div>
                    </div>
                    <div className="news-tags">
                      <span className="tag">
                        웹툰
                      </span>
                      <span className="tag">
                        실적
                      </span>
                      <span className="tag">
                        글로벌
                      </span>
                    </div>
                  </div>
                </div>
                <div className="news-card good" onClick={(event) => { location.href='news-detail.html'; }}>
                  <div className="news-rank">
                    #6
                  </div>
                  <div className="news-body-wrap">
                    <div className="news-meta">
                      <span className="chip chip-good">
                        🟢 호재
                      </span>
                      <span className="news-stock">
                        삼성전자
                      </span>
                      <span className="news-source">
                        블로터
                      </span>
                      <span className="news-time">
                        10:58
                      </span>
                    </div>
                    <div className="news-title">
                      삼성전자 갤럭시 S25 시리즈 판매량, 전작 대비 15% 상회… 프리미엄 라인업 성과
                    </div>
                    <div className="impact-section">
                      <div className="impact-row">
                        <span className="impact-label">
                          영향력
                        </span>
                        <div className="impact-bar">
                          <div className="impact-fill" style={{"width": "48%", "background": "var(--positive)"}}></div>
                        </div>
                        <span className="impact-score" style={{"color": "var(--positive)"}}>
                          48
                        </span>
                      </div>
                    </div>
                    <div className="news-tags">
                      <span className="tag">
                        갤럭시
                      </span>
                      <span className="tag">
                        스마트폰
                      </span>
                      <span className="tag">
                        판매
                      </span>
                    </div>
                  </div>
                </div>
                <div className="section-label">
                  📋 영향력 낮음 (40점 미만) 
                  <span style={{"fontWeight": "400", "fontSize": "10px", "color": "var(--text-muted)", "letterSpacing": "0"}}>
                    (참고용)
                  </span>
                </div>
                <div className="news-card bad" onClick={(event) => { location.href='news-detail.html'; }} style={{"opacity": "0.7"}}>
                  <div className="news-rank" style={{"fontSize": "13px", "color": "var(--text-muted)"}}>
                    #7
                  </div>
                  <div className="news-body-wrap">
                    <div className="news-meta">
                      <span className="chip chip-bad">
                        🔴 악재
                      </span>
                      <span className="chip chip-gray">
                        낮음
                      </span>
                      <span className="news-stock">
                        삼성전자
                      </span>
                      <span className="news-time">
                        09:30
                      </span>
                    </div>
                    <div className="news-title">
                      삼성전자 파운드리 수율 문제 지속… 2나노 양산 일정 재조정 가능성 언급
                    </div>
                    <div className="impact-section">
                      <div className="impact-row">
                        <span className="impact-label">
                          영향력
                        </span>
                        <div className="impact-bar">
                          <div className="impact-fill" style={{"width": "35%", "background": "var(--negative)", "opacity": "0.7"}}></div>
                        </div>
                        <span className="impact-score" style={{"color": "var(--text-muted)"}}>
                          35
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="news-card good" onClick={(event) => { location.href='news-detail.html'; }} style={{"opacity": "0.7"}}>
                  <div className="news-rank" style={{"fontSize": "13px", "color": "var(--text-muted)"}}>
                    #8
                  </div>
                  <div className="news-body-wrap">
                    <div className="news-meta">
                      <span className="chip chip-good">
                        🟢 호재
                      </span>
                      <span className="chip chip-gray">
                        낮음
                      </span>
                      <span className="news-stock">
                        현대차
                      </span>
                      <span className="news-time">
                        09:10
                      </span>
                    </div>
                    <div className="news-title">
                      현대차 북미 공장 생산 라인 가동률 99% 달성… 수출 물량 확대 예정
                    </div>
                    <div className="impact-section">
                      <div className="impact-row">
                        <span className="impact-label">
                          영향력
                        </span>
                        <div className="impact-bar">
                          <div className="impact-fill" style={{"width": "28%", "background": "var(--positive)", "opacity": "0.7"}}></div>
                        </div>
                        <span className="impact-score" style={{"color": "var(--text-muted)"}}>
                          28
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-col">
                <div className="right-top">
                  <div className="widget">
                    <div className="widget-title">
                      ⏱ 오늘 타임라인
                    </div>
                    <div className="timeline">
                      <div className="tl-item">
                        <span className="tl-time">
                          14:22
                        </span>
                        <div className="tl-dot" style={{"background": "var(--positive)"}}></div>
                        <div className="tl-text">
                          <strong>
                            삼성전자
                          </strong>
                           HBM4 계약 소식 → 주가 +2.1%
                        </div>
                      </div>
                      <div className="tl-item">
                        <span className="tl-time">
                          13:58
                        </span>
                        <div className="tl-dot" style={{"background": "var(--negative)"}}></div>
                        <div className="tl-text">
                          <strong>
                            카카오
                          </strong>
                           금감원 조사 확대 보도 → 주가 -4.2% 급락
                        </div>
                      </div>
                      <div className="tl-item">
                        <span className="tl-time">
                          13:00
                        </span>
                        <div className="tl-dot" style={{"background": "var(--accent)"}}></div>
                        <div className="tl-text">
                          오후 크롤링 완료 · 18건 신규 분석
                        </div>
                      </div>
                      <div className="tl-item">
                        <span className="tl-time">
                          11:44
                        </span>
                        <div className="tl-dot" style={{"background": "var(--negative)"}}></div>
                        <div className="tl-text">
                          <strong>
                            카카오
                          </strong>
                           블록딜 우려 뉴스 → 주가 -1.3%
                        </div>
                      </div>
                      <div className="tl-item">
                        <span className="tl-time">
                          11:00
                        </span>
                        <div className="tl-dot" style={{"background": "var(--accent)"}}></div>
                        <div className="tl-text">
                          오전 크롤링 완료 · 14건 신규 분석
                        </div>
                      </div>
                      <div className="tl-item">
                        <span className="tl-time">
                          09:00
                        </span>
                        <div className="tl-dot" style={{"background": "var(--accent)"}}></div>
                        <div className="tl-text">
                          장 시작 전 크롤링 완료 · 10건 분석
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget" style={{"background": "linear-gradient(135deg,rgba(129,140,248,0.08),var(--card))", "borderColor": "rgba(129,140,248,0.25)"}}>
                    <div className="widget-title" style={{"color": "var(--accent)"}}>
                      🤖 AI 종합 판단
                    </div>
                    <div style={{"fontSize": "13px", "lineHeight": "1.75", "color": "var(--text-secondary)"}}>
                      
            오늘 포트폴리오 전반적으로 
                      <strong style={{"color": "var(--positive)"}}>
                        호재 우세
                      </strong>
                      .
                      <br />
                      <br />
                      <strong style={{"color": "var(--positive)"}}>
                        삼성전자·SK하이닉스
                      </strong>
                      는 반도체 수요 확대로 긍정 흐름. HBM 관련 뉴스의 영향력이 극히 높음.
                      <br />
                      <br />
                      <strong style={{"color": "var(--negative)"}}>
                        카카오
                      </strong>
                      는 규제 리스크가 집중되어 단기 변동성 확대 예상. 포지션 점검 권장.
                      <br />
                      <br />
                      <strong style={{"color": "var(--neutral)"}}>
                        NAVER·현대차
                      </strong>
                      는 중립 신호로 관망 적절.
          
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
