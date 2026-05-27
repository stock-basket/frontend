import { useEffect, useState } from 'react';
import { useLegacyPage } from '../hooks/useLegacyPage.js';
import { listBaskets, createBasket } from '../api/sharedBaskets.js';
import SidebarUserCard from '../components/SidebarUserCard.jsx';

const pageStyles = `
.layout { display: flex; min-height: 100vh; }
.sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; }
.sidebar-logo { padding: 22px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
.sidebar-nav { flex: 1; padding: 14px 12px; overflow-y: auto; }
.nav-section { font-size: 9px; font-family: 'DM Mono', monospace; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); padding: 10px 8px 5px; margin-top: 8px; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; margin-bottom: 2px; position: relative; }
.nav-item:hover { background: var(--card); color: var(--text-primary); }
.nav-item.active { background: var(--accent-bg); color: var(--accent); }
.nav-item.active::before { content: ''; position: absolute; left: 0; top: 5px; bottom: 5px; width: 3px; background: var(--accent); border-radius: 0 2px 2px 0; }
.main { margin-left: var(--sidebar-w); flex: 1; }
.topbar { height: 58px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 28px; gap: 14px; position: sticky; top: 0; z-index: 50; }
.topbar-title { font-size: 15px; font-weight: 700; }
.topbar-sub { font-size: 11.5px; color: var(--text-muted); font-family: 'DM Mono', monospace; }
.topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }
.theme-btn { width: 32px; height: 32px; border-radius: 6px; background: transparent; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; }

.body { padding: 28px 40px; }
.create-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 20px; margin-bottom: 28px; }
.card-title { font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 14px; }
.create-row { display: flex; gap: 8px; }
.create-input { flex: 1; background: var(--surface); border: 1.5px solid var(--border); border-radius: 7px; color: var(--text-primary); font-family: 'Noto Sans KR', sans-serif; font-size: 13.5px; padding: 10px 14px; outline: none; }
.create-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; border: none; font-family: 'Noto Sans KR', sans-serif; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.hint { font-size: 11.5px; color: var(--text-muted); margin-top: 8px; }

.basket-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.basket-header-left { font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); }
.basket-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.basket-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 18px; position: relative; transition: all 0.18s; cursor: pointer; }
.basket-card:hover { background: var(--card-hover); border-color: var(--border-light); }
.basket-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
.bc-logo { width: 38px; height: 38px; border-radius: 9px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 17px; }
.owner-pill { font-size: 9.5px; font-weight: 700; font-family: 'DM Mono', monospace; padding: 3px 7px; border-radius: 4px; }
.owner-pill.owner { background: var(--accent-bg); color: var(--accent); }
.owner-pill.member { background: var(--surface); color: var(--text-muted); border: 1px solid var(--border); }
.bc-name { font-size: 15px; font-weight: 700; margin-bottom: 2px; }
.bc-meta { font-size: 11px; color: var(--text-muted); font-family: 'DM Mono', monospace; margin-bottom: 12px; }
.bc-stats-row { display: flex; gap: 6px; flex-wrap: wrap; }
.bc-stat-pill { display: flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 20px; font-size: 10.5px; font-weight: 700; font-family: 'DM Mono', monospace; background: var(--surface); border: 1px solid var(--border); color: var(--text-secondary); }
.empty-msg { font-size: 12px; color: var(--text-muted); padding: 24px; text-align: center; grid-column: 1/-1; }
.feedback { font-size: 12px; margin-left: 12px; font-family: 'DM Mono', monospace; align-self: center; }
.feedback.error { color: var(--negative); }
`;
const pageScripts = `
function applyTheme(t){const r=document.documentElement;if(t==='light'){r.classList.add('theme-light');r.classList.remove('theme-dark');r.setAttribute('data-theme','light');document.getElementById('themeBtn').textContent='☀️';}else{r.classList.remove('theme-light');r.classList.add('theme-dark');r.setAttribute('data-theme','dark');document.getElementById('themeBtn').textContent='🌙';}localStorage.setItem('theme',t);}
function toggleTheme(){const c=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');applyTheme(c==='dark'?'light':'dark');}
(function(){const s=localStorage.getItem('theme');if(s)applyTheme(s);else if(window.matchMedia('(prefers-color-scheme: light)').matches)applyTheme('light');else document.getElementById('themeBtn').textContent='🌙';})();
`;

export default function SharedBaskets() {
  useLegacyPage({ title: '공용 바구니 — 주식 바구니', styles: pageStyles, scripts: pageScripts });

  const [baskets, setBaskets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await listBaskets();
      setBaskets(res?.data || []);
    } catch (err) {
      // 401 인터셉터가 처리
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (trimmed.length > 30) {
      setError('바구니 이름은 최대 30자입니다.');
      return;
    }
    setError(null);
    setCreating(true);
    try {
      await createBasket(trimmed);
      setName('');
      await load();
    } catch (err) {
      setError(err?.response?.data?.message || '바구니 생성에 실패했습니다.');
    } finally {
      setCreating(false);
    }
  };

  const goDetail = (id) => {
    window.history.pushState({}, '', `/shared-basket-detail.html?id=${encodeURIComponent(id)}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
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
          <a href="shared-baskets.html" className="nav-item active"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>👥</span> 공용 바구니</a>
          <a href="stock-detail.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>🔍</span> 종목 분석</a>
          <div className="nav-section">설정</div>
          <a href="settings.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>🔔</span> 알림 설정</a>
          <a href="account.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>⚙️</span> 계정 설정</a>
        </nav>
        <SidebarUserCard />
      </aside>
      <div className="main">
        <div className="topbar">
          <div>
            <div className="topbar-title">공용 바구니</div>
            <div className="topbar-sub">함께 보는 바구니 — 부부 · 친구 · 팀</div>
          </div>
          <div className="topbar-right">
            <button className="theme-btn" onClick={() => { toggleTheme(); }} id="themeBtn" title="테마 전환">🌙</button>
          </div>
        </div>
        <div className="body">
          <div className="create-card">
            <div className="card-title">➕ 새 공용 바구니 만들기</div>
            <div className="create-row">
              <input
                type="text"
                className="create-input"
                placeholder="바구니 이름 (예: 우리 가족 바구니)"
                value={name}
                maxLength={30}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCreate(); }}
              />
              <button
                className="btn btn-primary"
                disabled={creating || !name.trim()}
                onClick={handleCreate}
              >
                {creating ? '생성 중...' : '바구니 만들기'}
              </button>
              {error && <span className="feedback error">{error}</span>}
            </div>
            <div className="hint">바구니를 만든 뒤, 이메일로 멤버를 초대할 수 있어요. 한 바구니에 최대 30종목까지 담을 수 있습니다.</div>
          </div>

          <div className="basket-header">
            <div className="basket-header-left">
              👥 내 공용 바구니 <span style={{ color: 'var(--accent)' }}>({baskets.length})</span>
            </div>
          </div>
          <div className="basket-grid">
            {loading ? (
              <div className="empty-msg">불러오는 중...</div>
            ) : baskets.length === 0 ? (
              <div className="empty-msg">아직 참여 중인 공용 바구니가 없습니다. 위에서 새로 만들거나, 다른 멤버의 초대를 기다려보세요.</div>
            ) : (
              baskets.map((b) => (
                <div className="basket-card" key={b.id} onClick={() => goDetail(b.id)}>
                  <div className="basket-card-top">
                    <div className="bc-logo">👥</div>
                    <span className={`owner-pill ${b.isOwner ? 'owner' : 'member'}`}>
                      {b.isOwner ? 'OWNER' : 'MEMBER'}
                    </span>
                  </div>
                  <div className="bc-name">{b.name}</div>
                  <div className="bc-meta">소유자 · {b.ownerNickname}</div>
                  <div className="bc-stats-row">
                    <span className="bc-stat-pill">👤 {(b.memberCount ?? 0) + 1}명</span>
                    <span className="bc-stat-pill">📊 {b.stockCount ?? 0}종목</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
