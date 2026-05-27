import { useState } from 'react';
import { useLegacyPage } from '../hooks/useLegacyPage.js';
import { updateAlertSettings } from '../api/users.js';
import SidebarUserCard from '../components/SidebarUserCard.jsx';

const pageStyles = "\n.layout { display: flex; min-height: 100vh; }\n.sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; }\n.sidebar-logo { padding: 22px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }\n.sidebar-nav { flex: 1; padding: 14px 12px; overflow-y: auto; }\n.nav-section { font-size: 9px; font-family: 'DM Mono', monospace; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); padding: 10px 8px 5px; margin-top: 8px; }\n.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; margin-bottom: 2px; position: relative; }\n.nav-item:hover { background: var(--card); color: var(--text-primary); }\n.nav-item.active { background: var(--accent-bg); color: var(--accent); }\n.nav-item.active::before { content: ''; position: absolute; left: 0; top: 5px; bottom: 5px; width: 3px; background: var(--accent); border-radius: 0 2px 2px 0; }\n.sidebar-bottom { padding: 12px; border-top: 1px solid var(--border); }\n.user-card { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 6px; cursor: pointer; }\n.user-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; }\n.user-name { font-size: 12.5px; font-weight: 600; }\n.user-plan { font-size: 9.5px; color: var(--accent); font-family: 'DM Mono', monospace; }\n\n.main { margin-left: var(--sidebar-w); flex: 1; }\n.topbar { height: 58px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 28px; gap: 14px; position: sticky; top: 0; z-index: 50; }\n.topbar-title { font-size: 15px; font-weight: 700; }\n.topbar-sub { font-size: 11.5px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }\n.theme-btn { width: 32px; height: 32px; border-radius: 6px; background: transparent; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; }\n\n.body { padding: 28px 40px; max-width: 900px; }\n.setting-section { background: var(--card); border: 1px solid var(--border); border-radius: 10px; margin-bottom: 16px; overflow: hidden; }\n.setting-section-title { font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); padding: 14px 18px; background: var(--surface); border-bottom: 1px solid var(--border); }\n.setting-item { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid var(--border); gap: 20px; }\n.setting-item:last-child { border-bottom: none; }\n.setting-label { display: flex; flex-direction: column; gap: 3px; }\n.setting-label-main { font-size: 13.5px; font-weight: 500; color: var(--text-primary); }\n.setting-label-sub { font-size: 11.5px; color: var(--text-muted); }\n.toggle { width: 38px; height: 21px; background: var(--border-light); border-radius: 20px; position: relative; transition: background 0.2s; flex-shrink: 0; cursor: pointer; border: none; }\n.toggle::after { content: ''; position: absolute; width: 15px; height: 15px; border-radius: 50%; background: #fff; top: 3px; left: 3px; transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.3); }\n.toggle.on { background: var(--accent); }\n.toggle.on::after { transform: translateX(17px); }\n\n.setting-input { background: var(--surface); border: 1.5px solid var(--border); border-radius: 6px; color: var(--text-primary); font-family: 'Noto Sans KR', sans-serif; font-size: 13px; padding: 8px 12px; outline: none; min-width: 100px; text-align:center; }\n.setting-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }\n.btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; font-family: 'Noto Sans KR', sans-serif; }\n.btn-primary { background: var(--accent); color: #fff; }\n.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }\n.feedback { font-size: 12px; margin-left: 12px; font-family: 'DM Mono', monospace; }\n.feedback.success { color: var(--positive); }\n.feedback.error { color: var(--negative); }\n";
const pageScripts = "\nfunction applyTheme(t){const r=document.documentElement;if(t==='light'){r.classList.add('theme-light');r.classList.remove('theme-dark');r.setAttribute('data-theme','light');document.getElementById('themeBtn').textContent='☀️';}else{r.classList.remove('theme-light');r.classList.add('theme-dark');r.setAttribute('data-theme','dark');document.getElementById('themeBtn').textContent='🌙';}localStorage.setItem('theme',t);}\nfunction toggleTheme(){const c=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');applyTheme(c==='dark'?'light':'dark');}\n(function(){const s=localStorage.getItem('theme');if(s)applyTheme(s);else if(window.matchMedia('(prefers-color-scheme: light)').matches)applyTheme('light');else document.getElementById('themeBtn').textContent='🌙';})();\n";

function Toggle({ on, onChange }) {
  return (
    <button
      type="button"
      className={`toggle ${on ? 'on' : ''}`}
      onClick={() => onChange(!on)}
    />
  );
}

export default function Settings() {
  useLegacyPage({ title: "알림 설정 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

  const [globalOn, setGlobalOn] = useState(true);
  const [volatilityOn, setVolatilityOn] = useState(true);
  const [volatilityPct, setVolatilityPct] = useState(3);
  const [badOn, setBadOn] = useState(true);
  const [goodOn, setGoodOn] = useState(false);
  const [impactThreshold, setImpactThreshold] = useState(70);
  const [emailOn, setEmailOn] = useState(true);
  const [pushOn, setPushOn] = useState(typeof Notification !== 'undefined' && Notification.permission === 'granted');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const togglePush = async (next) => {
    if (next && 'Notification' in window) {
      const perm = await Notification.requestPermission();
      setPushOn(perm === 'granted');
    } else {
      setPushOn(false);
    }
  };

  const handleSave = async () => {
    setFeedback(null);
    setSaving(true);
    try {
      await updateAlertSettings({
        isGlobalAlertEnabled: globalOn,
        isVolatilityAlertEnabled: volatilityOn,
        volatilityThresholdPercent: Number(volatilityPct),
        isBadNewsAlertEnabled: badOn,
        isGoodNewsAlertEnabled: goodOn,
        newsImpactThreshold: Number(impactThreshold),
        isEmailAlertEnabled: emailOn,
      });
      setFeedback({ kind: 'success', text: '저장되었습니다.' });
    } catch (err) {
      setFeedback({ kind: 'error', text: err?.response?.data?.message || '저장에 실패했습니다.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">🧺</div>
          <div>
            <div className="logo-text">주식 바구니</div>
            <div className="logo-sub">AI INTEL</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">메뉴</div>
          <a href="news.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>📰</span> 뉴스 피드</a>
          <a href="stocks.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>🧺</span> 내 바구니</a>
          <a href="shared-baskets.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>👥</span> 공용 바구니</a>
          <a href="stock-detail.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>🔍</span> 종목 분석</a>
          <div className="nav-section">설정</div>
          <a href="settings.html" className="nav-item active"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>🔔</span> 알림 설정</a>
          <a href="account.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>⚙️</span> 계정 설정</a>
        </nav>
        <SidebarUserCard />
      </aside>
      <div className="main">
        <div className="topbar">
          <div>
            <div className="topbar-title">알림 설정</div>
            <div className="topbar-sub">알림 방식 및 임계값 설정</div>
          </div>
          <div className="topbar-right">
            <button className="theme-btn" onClick={() => { toggleTheme(); }} id="themeBtn" title="테마 전환">🌙</button>
          </div>
        </div>
        <div className="body">
          <div className="setting-section">
            <div className="setting-section-title">전체 알림</div>
            <div className="setting-item">
              <div className="setting-label">
                <div className="setting-label-main">알림 전체 활성화</div>
                <div className="setting-label-sub">꺼두면 모든 알림이 비활성화됩니다</div>
              </div>
              <Toggle on={globalOn} onChange={setGlobalOn} />
            </div>
          </div>

          <div className="setting-section">
            <div className="setting-section-title">급등락 감지</div>
            <div className="setting-item">
              <div className="setting-label">
                <div className="setting-label-main">⚡ 급등락 감지 알림</div>
                <div className="setting-label-sub">주가가 일정 % 이상 변동 시 즉시 알림</div>
              </div>
              <Toggle on={volatilityOn} onChange={setVolatilityOn} />
            </div>
            <div className="setting-item">
              <div className="setting-label">
                <div className="setting-label-main">감지 임계값 (%)</div>
                <div className="setting-label-sub">이 수치 이상 변동 시 알림 발송</div>
              </div>
              <input
                type="number"
                className="setting-input"
                min="1"
                max="20"
                step="0.5"
                value={volatilityPct}
                onChange={(e) => setVolatilityPct(e.target.value)}
              />
            </div>
          </div>

          <div className="setting-section">
            <div className="setting-section-title">뉴스 알림</div>
            <div className="setting-item">
              <div className="setting-label">
                <div className="setting-label-main">🔴 악재 뉴스 알림</div>
                <div className="setting-label-sub">악재로 분류된 뉴스 알림 수신</div>
              </div>
              <Toggle on={badOn} onChange={setBadOn} />
            </div>
            <div className="setting-item">
              <div className="setting-label">
                <div className="setting-label-main">🟢 호재 뉴스 알림</div>
                <div className="setting-label-sub">호재로 분류된 뉴스 알림 수신</div>
              </div>
              <Toggle on={goodOn} onChange={setGoodOn} />
            </div>
            <div className="setting-item">
              <div className="setting-label">
                <div className="setting-label-main">알림 최소 영향력 점수 (0~100)</div>
                <div className="setting-label-sub">이 점수 이상의 뉴스만 알림 발송</div>
              </div>
              <input
                type="number"
                className="setting-input"
                min="0"
                max="100"
                value={impactThreshold}
                onChange={(e) => setImpactThreshold(e.target.value)}
              />
            </div>
          </div>

          <div className="setting-section">
            <div className="setting-section-title">알림 방식</div>
            <div className="setting-item">
              <div className="setting-label">
                <div className="setting-label-main">이메일 알림</div>
                <div className="setting-label-sub">가입한 이메일로 알림 발송</div>
              </div>
              <Toggle on={emailOn} onChange={setEmailOn} />
            </div>
            <div className="setting-item">
              <div className="setting-label">
                <div className="setting-label-main">브라우저 푸시 알림</div>
                <div className="setting-label-sub">브라우저 알림 권한 필요</div>
              </div>
              <Toggle on={pushOn} onChange={togglePush} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? '저장 중...' : '설정 저장'}
            </button>
            {feedback && <span className={`feedback ${feedback.kind}`}>{feedback.text}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
