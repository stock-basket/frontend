import { useLegacyPage } from '../hooks/useLegacyPage.js';

const pageStyles = "\n.layout { display: flex; min-height: 100vh; }\n.sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; }\n.sidebar-logo { padding: 22px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }\n.sidebar-nav { flex: 1; padding: 14px 12px; overflow-y: auto; }\n.nav-section { font-size: 9px; font-family: 'DM Mono', monospace; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); padding: 10px 8px 5px; margin-top: 8px; }\n.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; margin-bottom: 2px; position: relative; }\n.nav-item:hover { background: var(--card); color: var(--text-primary); }\n.nav-item.active { background: var(--accent-bg); color: var(--accent); }\n.nav-item.active::before { content: ''; position: absolute; left: 0; top: 5px; bottom: 5px; width: 3px; background: var(--accent); border-radius: 0 2px 2px 0; }\n.nav-badge { margin-left: auto; background: var(--negative); color: #fff; font-size: 9px; font-weight: 700; padding: 1px 6px; border-radius: 20px; }\n.sidebar-bottom { padding: 12px; border-top: 1px solid var(--border); }\n.user-card { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 6px; cursor: pointer; transition: background 0.15s; }\n.user-card:hover { background: var(--card); }\n.user-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; }\n.user-name { font-size: 12.5px; font-weight: 600; }\n.user-plan { font-size: 9.5px; color: var(--accent); font-family: 'DM Mono', monospace; }\n\n.main { margin-left: var(--sidebar-w); flex: 1; }\n.topbar { height: 58px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 28px; gap: 14px; position: sticky; top: 0; z-index: 50; }\n.topbar-title { font-size: 15px; font-weight: 700; letter-spacing: -0.3px; }\n.topbar-sub { font-size: 11.5px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }\n.theme-btn { width: 32px; height: 32px; border-radius: 6px; background: transparent; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; transition: all 0.15s; }\n.theme-btn:hover { background: var(--card); color: var(--text-primary); }\n\n.body { padding: 28px 40px; max-width: 900px; }\n\n/* Setting sections */\n.setting-section { background: var(--card); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 16px; overflow: hidden; }\n.setting-section-title { font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); padding: 14px 18px; background: var(--surface); border-bottom: 1px solid var(--border); }\n.setting-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid var(--border); gap: 20px; }\n.setting-item:last-child { border-bottom: none; }\n.setting-label { display: flex; flex-direction: column; gap: 3px; }\n.setting-label-main { font-size: 13.5px; font-weight: 500; color: var(--text-primary); }\n.setting-label-sub { font-size: 11.5px; color: var(--text-muted); }\n\n/* Plan badge */\n.plan-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace; }\n.plan-free { background: var(--surface); color: var(--text-muted); border: 1px solid var(--border); }\n.plan-pro { background: var(--accent-bg); color: var(--accent); border: 1px solid rgba(129,140,248,0.3); }\n\n/* Danger zone */\n.danger-zone { background: var(--negative-bg); border: 1px solid var(--negative-border); border-radius: 10px; padding: 18px; margin-top: 24px; }\n.danger-title { font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--negative); margin-bottom: 10px; }\n.danger-desc { font-size: 12.5px; color: var(--text-secondary); margin-bottom: 14px; line-height: 1.6; }\n\n/* Input */\n.setting-input { background: var(--surface); border: 1.5px solid var(--border); border-radius: 6px; color: var(--text-primary); font-family: 'Noto Sans KR', sans-serif; font-size: 13px; padding: 8px 12px; outline: none; transition: all 0.15s; min-width: 180px; }\n.setting-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }\n";
const pageScripts = "\nfunction applyTheme(t) {\n  const r = document.documentElement;\n  if (t === 'light') {\n    r.classList.add('theme-light'); r.classList.remove('theme-dark');\n    r.setAttribute('data-theme', 'light');\n    document.getElementById('themeBtn').textContent = '☀️';\n  } else {\n    r.classList.remove('theme-light'); r.classList.add('theme-dark');\n    r.setAttribute('data-theme', 'dark');\n    document.getElementById('themeBtn').textContent = '🌙';\n  }\n  localStorage.setItem('theme', t);\n}\nfunction toggleTheme() {\n  const c = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n  applyTheme(c === 'dark' ? 'light' : 'dark');\n}\n(function() {\n  const s = localStorage.getItem('theme');\n  if (s) applyTheme(s);\n  else if (window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');\n  else document.getElementById('themeBtn').textContent = '🌙';\n})();\n";

export default function Account() {
  useLegacyPage({ title: "계정 설정 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

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
            <a href="settings.html" className="nav-item">
              <span style={{"fontSize": "14px", "width": "20px", "textAlign": "center"}}>
                🔔
              </span>
               알림 설정
            </a>
            <a href="account.html" className="nav-item active">
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
                계정 설정
              </div>
              <div className="topbar-sub">
                프로필 · 보안 · 플랜
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
                기본 정보
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    닉네임
                  </div>
                  <div className="setting-label-sub">
                    다른 사용자에게 표시되는 이름
                  </div>
                </div>
                <input type="text" className="setting-input" defaultValue="홍길동" />
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    이메일
                  </div>
                  <div className="setting-label-sub">
                    로그인 및 알림에 사용
                  </div>
                </div>
                <input type="email" className="setting-input" defaultValue="hong@example.com" />
              </div>
            </div>
            <div className="setting-section">
              <div className="setting-section-title">
                비밀번호 변경
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    현재 비밀번호
                  </div>
                </div>
                <input type="password" className="setting-input" placeholder="현재 비밀번호" />
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    새 비밀번호
                  </div>
                  <div className="setting-label-sub">
                    8자 이상, 영문·숫자·특수문자 조합 권장
                  </div>
                </div>
                <input type="password" className="setting-input" placeholder="새 비밀번호 (8자 이상)" />
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    새 비밀번호 확인
                  </div>
                </div>
                <input type="password" className="setting-input" placeholder="새 비밀번호 재입력" />
              </div>
            </div>
            <div className="setting-section">
              <div className="setting-section-title">
                구독 플랜
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    현재 플랜
                  </div>
                  <div className="setting-label-sub">
                    무료 플랜 · 뉴스 20건/일, 바구니 1개
                  </div>
                </div>
                <span className="plan-badge plan-free">
                  FREE
                </span>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <div className="setting-label-main">
                    PRO 플랜으로 업그레이드
                  </div>
                  <div className="setting-label-sub">
                    무제한 뉴스 · 바구니 10개 · 실시간 알림 · 뉴스 상세 분석
                  </div>
                </div>
                <button className="btn btn-primary" onClick={(event) => { alert('결제 페이지로 이동합니다.'); }}>
                  ₩9,900/월 업그레이드
                </button>
              </div>
            </div>
            <div style={{"display": "flex", "gap": "10px", "marginTop": "6px"}}>
              <button className="btn btn-primary" onClick={(event) => { alert('계정 정보가 저장되었습니다.'); }}>
                변경 사항 저장
              </button>
            </div>
            <div className="danger-zone">
              <div className="danger-title">
                ⚠️ 위험 구역
              </div>
              <div className="danger-desc">
                
        계정을 탈퇴하면 바구니, 알림 설정, 뉴스 기록 등 모든 데이터가 즉시 삭제되며 복구할 수 없습니다.
      
              </div>
              <button className="btn btn-danger" onClick={(event) => { if(confirm('정말 탈퇴하시겠습니까?\n모든 데이터가 영구 삭제됩니다.'))alert('탈퇴 처리되었습니다.'); }}>
                계정 탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
