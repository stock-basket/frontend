import { useLegacyPage } from '../hooks/useLegacyPage.js';

const pageStyles = "\n.layout { display: flex; min-height: 100vh; }\n.sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; }\n.sidebar-logo { padding: 22px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }\n.sidebar-nav { flex: 1; padding: 14px 12px; overflow-y: auto; }\n.nav-section { font-size: 9px; font-family: 'DM Mono', monospace; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); padding: 10px 8px 5px; margin-top: 8px; }\n.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; margin-bottom: 2px; position: relative; }\n.nav-item:hover { background: var(--card); color: var(--text-primary); }\n.nav-item.active { background: var(--accent-bg); color: var(--accent); }\n.nav-item.active::before { content: ''; position: absolute; left: 0; top: 5px; bottom: 5px; width: 3px; background: var(--accent); border-radius: 0 2px 2px 0; }\n.nav-badge { margin-left: auto; background: var(--negative); color: #fff; font-size: 9px; font-weight: 700; padding: 1px 6px; border-radius: 20px; }\n.sidebar-bottom { padding: 12px; border-top: 1px solid var(--border); }\n.user-card { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 6px; cursor: pointer; transition: background 0.15s; }\n.user-card:hover { background: var(--card); }\n.user-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; }\n.user-name { font-size: 12.5px; font-weight: 600; }\n.user-plan { font-size: 9.5px; color: var(--accent); font-family: 'DM Mono', monospace; }\n\n.main { margin-left: var(--sidebar-w); flex: 1; }\n.topbar { height: 58px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 28px; gap: 14px; position: sticky; top: 0; z-index: 50; }\n.topbar-title { font-size: 15px; font-weight: 700; letter-spacing: -0.3px; }\n.topbar-sub { font-size: 11.5px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }\n.theme-btn { width: 32px; height: 32px; border-radius: 6px; background: transparent; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; transition: all 0.15s; }\n.theme-btn:hover { background: var(--card); color: var(--text-primary); }\n\n.body { padding: 28px 40px; max-width: 900px; }\n\n/* Settings tabs */\n.settings-tabs { display: flex; gap: 3px; margin-bottom: 24px; }\n.settings-tab { padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; color: var(--text-secondary); border: 1px solid var(--border); background: var(--surface); transition: all 0.15s; }\n.settings-tab.active { background: var(--accent-bg); color: var(--accent); border-color: rgba(129,140,248,0.3); }\n\n.tab-content { display: none; }\n.tab-content.active { display: block; }\n\n/* Setting sections */\n.setting-section { background: var(--card); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 16px; overflow: hidden; }\n.setting-section-title { font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); padding: 14px 18px; background: var(--surface); border-bottom: 1px solid var(--border); }\n.setting-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid var(--border); gap: 20px; }\n.setting-item:last-child { border-bottom: none; }\n.setting-label { display: flex; flex-direction: column; gap: 3px; }\n.setting-label-main { font-size: 13.5px; font-weight: 500; color: var(--text-primary); }\n.setting-label-sub { font-size: 11.5px; color: var(--text-muted); }\n.toggle { width: 38px; height: 21px; background: var(--border-light); border-radius: 20px; position: relative; transition: background 0.2s; flex-shrink: 0; cursor: pointer; border: none; }\n.toggle::after { content: ''; position: absolute; width: 15px; height: 15px; border-radius: 50%; background: #fff; top: 3px; left: 3px; transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }\n.toggle.on { background: var(--accent); }\n.toggle.on::after { transform: translateX(17px); }\n\n/* Theme selector */\n.theme-options { display: flex; gap: 8px; }\n.theme-opt { padding: 7px 16px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; border: 1px solid var(--border); background: var(--surface); color: var(--text-secondary); transition: all 0.15s; }\n.theme-opt.active { background: var(--accent-bg); color: var(--accent); border-color: rgba(129,140,248,0.3); }\n.theme-opt:hover:not(.active) { background: var(--card); color: var(--text-primary); }\n\n/* Input in setting */\n.setting-input { background: var(--surface); border: 1.5px solid var(--border); border-radius: 6px; color: var(--text-primary); font-family: 'Noto Sans KR', sans-serif; font-size: 13px; padding: 8px 12px; outline: none; transition: all 0.15s; min-width: 180px; }\n.setting-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }\n\n.btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; font-family: 'Noto Sans KR', sans-serif; }\n.btn-primary { background: var(--accent); color: #fff; }\n.btn-primary:hover { background: var(--accent-hover); }\n.btn-ghost { background: transparent; color: var(--text-secondary); border: 1px solid var(--border); }\n.btn-ghost:hover { background: var(--card); color: var(--text-primary); }\n.btn-danger { background: transparent; color: var(--negative); border: 1px solid var(--negative-border); }\n.btn-danger:hover { background: var(--negative-bg); }\n";
const pageScripts = "\nfunction requestPush() {\n  if ('Notification' in window) Notification.requestPermission();\n}\n\nfunction setThemeOpt(opt, el) {\n  document.querySelectorAll('.theme-opt').forEach(e => e.classList.remove('active'));\n  el.classList.add('active');\n  if (opt === 'system') {\n    localStorage.removeItem('theme');\n    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;\n    applyTheme(prefersDark ? 'dark' : 'light');\n  } else {\n    applyTheme(opt);\n  }\n}\n\nfunction applyTheme(t) {\n  const r = document.documentElement;\n  if (t === 'light') {\n    r.classList.add('theme-light'); r.classList.remove('theme-dark');\n    r.setAttribute('data-theme', 'light');\n    document.getElementById('themeBtn').textContent = '☀️';\n  } else {\n    r.classList.remove('theme-light'); r.classList.add('theme-dark');\n    r.setAttribute('data-theme', 'dark');\n    document.getElementById('themeBtn').textContent = '🌙';\n  }\n  localStorage.setItem('theme', t);\n  // Sync theme option buttons\n  const saved = localStorage.getItem('theme');\n  document.getElementById('themeOptSystem').classList.toggle('active', !saved);\n  document.getElementById('themeOptDark').classList.toggle('active', saved === 'dark');\n  document.getElementById('themeOptLight').classList.toggle('active', saved === 'light');\n}\nfunction toggleTheme() {\n  const c = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n  applyTheme(c === 'dark' ? 'light' : 'dark');\n}\n(function() {\n  const s = localStorage.getItem('theme');\n  if (s) applyTheme(s);\n  else if (window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');\n  else document.getElementById('themeBtn').textContent = '🌙';\n})();\n";

export default function Settings() {
  useLegacyPage({ title: "설정 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

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
            <a href="settings.html" className="nav-item active">
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
                알림 설정
              </div>
              <div className="topbar-sub">
                알림 방식 및 임계값 설정
              </div>
            </div>
            <div className="topbar-right">
              <button className="theme-btn" onClick={(event) => { toggleTheme(); }} id="themeBtn" title="테마 전환">
                🌙
              </button>
            </div>
          </div>
          <div className="body">
            <div className="setting-section">
              <div className="setting-section-title">
                전체 알림
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    알림 전체 활성화
                  </div>
                  <div className="setting-label-sub">
                    꺼두면 모든 알림이 비활성화됩니다
                  </div>
                </div>
                <button className="toggle on" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
              </div>
            </div>
            <div className="setting-section">
              <div className="setting-section-title">
                급등락 감지
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    ⚡ 급등락 감지 알림
                  </div>
                  <div className="setting-label-sub">
                    주가가 일정 % 이상 변동 시 즉시 알림
                  </div>
                </div>
                <button className="toggle on" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    감지 임계값 (%)
                  </div>
                  <div className="setting-label-sub">
                    이 수치 이상 변동 시 알림 발송
                  </div>
                </div>
                <input type="number" className="setting-input" defaultValue="3" min="1" max="20" style={{"width": "100px", "textAlign": "center"}} />
              </div>
            </div>
            <div className="setting-section">
              <div className="setting-section-title">
                뉴스 알림
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    🔴 고영향 악재 뉴스 알림
                  </div>
                  <div className="setting-label-sub">
                    영향력 점수 70점 이상 악재 발생 시
                  </div>
                </div>
                <button className="toggle on" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    🟢 고영향 호재 뉴스 알림
                  </div>
                  <div className="setting-label-sub">
                    영향력 점수 70점 이상 호재 발생 시
                  </div>
                </div>
                <button className="toggle" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    알림 최소 영향력 점수
                  </div>
                  <div className="setting-label-sub">
                    이 점수 이상의 뉴스만 알림 발송
                  </div>
                </div>
                <input type="number" className="setting-input" defaultValue="70" min="0" max="100" style={{"width": "100px", "textAlign": "center"}} />
              </div>
            </div>
            <div className="setting-section">
              <div className="setting-section-title">
                알림 방식
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    이메일 알림
                  </div>
                  <div className="setting-label-sub">
                    hong@example.com
                  </div>
                </div>
                <button className="toggle on" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    브라우저 푸시 알림
                  </div>
                  <div className="setting-label-sub">
                    브라우저 알림 권한 필요
                  </div>
                </div>
                <button className="toggle" onClick={(event) => { event.currentTarget.classList.toggle('on');requestPush(); }}></button>
              </div>
            </div>
            <div className="setting-section">
              <div className="setting-section-title">
                화면 설정
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    색상 테마
                  </div>
                  <div className="setting-label-sub">
                    시스템 설정을 따르거나 직접 선택하세요
                  </div>
                </div>
                <div className="theme-options">
                  <div className="theme-opt" id="themeOptSystem" onClick={(event) => { setThemeOpt('system',event.currentTarget); }}>
                    🖥 시스템
                  </div>
                  <div className="theme-opt" id="themeOptDark" onClick={(event) => { setThemeOpt('dark',event.currentTarget); }}>
                    🌙 다크
                  </div>
                  <div className="theme-opt" id="themeOptLight" onClick={(event) => { setThemeOpt('light',event.currentTarget); }}>
                    ☀️ 라이트
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" style={{"marginTop": "6px"}} onClick={(event) => { alert('알림 설정이 저장되었습니다.'); }}>
              설정 저장
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
