import { useEffect, useMemo, useState } from 'react';
import { useLegacyPage } from '../hooks/useLegacyPage.js';
import {
  getBasket,
  deleteBasket,
  inviteUser,
  searchUser,
  leaveBasket,
  kickMember,
  addStock,
  removeStock,
} from '../api/sharedBaskets.js';
import { loadStockMaster } from '../api/stockMaster.js';
import SidebarUserCard from '../components/SidebarUserCard.jsx';

const MAX_AUTOCOMPLETE = 30;
function filterStocks(master, raw) {
  const q = (raw || '').trim().toLowerCase();
  if (!q) return [];
  const prefix = [];
  const contains = [];
  for (const s of master) {
    const name = (s.name || '').toLowerCase();
    const code = (s.code || '').toLowerCase();
    if (name.startsWith(q) || code.startsWith(q)) prefix.push(s);
    else if (name.includes(q) || code.includes(q)) contains.push(s);
    if (prefix.length >= MAX_AUTOCOMPLETE) break;
  }
  return prefix.concat(contains).slice(0, MAX_AUTOCOMPLETE);
}

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
.back-link { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--text-muted); cursor: pointer; margin-bottom: 14px; }
.back-link:hover { color: var(--text-primary); }

.hero { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 22px 24px; margin-bottom: 24px; display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; }
.hero-left { display: flex; gap: 14px; flex: 1; min-width: 0; }
.hero-icon { width: 50px; height: 50px; border-radius: 12px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
.hero-title { font-size: 22px; font-weight: 800; margin-bottom: 4px; }
.hero-meta { font-size: 12px; color: var(--text-muted); font-family: 'DM Mono', monospace; }
.owner-pill { font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace; padding: 3px 8px; border-radius: 4px; margin-left: 8px; }
.owner-pill.owner { background: var(--accent-bg); color: var(--accent); }
.owner-pill.member { background: var(--surface); color: var(--text-muted); border: 1px solid var(--border); }
.hero-actions { display: flex; gap: 8px; align-items: flex-start; }

.btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; border: none; font-family: 'Noto Sans KR', sans-serif; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-ghost { background: var(--surface); color: var(--text-secondary); border: 1px solid var(--border); }
.btn-ghost:hover { background: var(--card); color: var(--text-primary); }
.btn-danger { background: var(--negative-bg); color: var(--negative); border: 1px solid var(--negative-border); }
.btn-danger:hover { background: var(--negative); color: #fff; }

.grid-2 { display: grid; grid-template-columns: 380px 1fr; gap: 20px; align-items: start; }
.panel { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 18px 20px; }
.panel-title { font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; }
.panel-title .count { color: var(--accent); font-size: 11px; }

.member-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid var(--border); }
.member-row:last-child { border-bottom: none; }
.member-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#8b5cf6); color: #fff; font-weight: 700; font-size: 12.5px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.member-info { flex: 1; min-width: 0; }
.member-nick { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.member-email { font-size: 11px; color: var(--text-muted); font-family: 'DM Mono', monospace; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.member-tag { font-size: 9.5px; padding: 2px 6px; border-radius: 4px; font-family: 'DM Mono', monospace; font-weight: 700; }
.member-tag.owner { background: var(--accent-bg); color: var(--accent); }
.member-tag.self { background: var(--positive-bg); color: var(--positive); border: 1px solid var(--positive-border); }
.member-kick { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 13px; padding: 4px 6px; border-radius: 4px; }
.member-kick:hover { background: var(--negative-bg); color: var(--negative); }

.invite-row { display: flex; gap: 6px; margin-top: 12px; }
.text-input { flex: 1; background: var(--surface); border: 1.5px solid var(--border); border-radius: 6px; color: var(--text-primary); font-family: 'Noto Sans KR', sans-serif; font-size: 13px; padding: 8px 12px; outline: none; }
.text-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }
.invite-result { margin-top: 12px; padding: 10px 12px; background: var(--surface); border: 1px solid var(--border); border-radius: 7px; display: flex; align-items: center; gap: 10px; }
.invite-result .info { flex: 1; min-width: 0; }
.invite-result .nick { font-size: 13px; font-weight: 700; }
.invite-result .email { font-size: 11px; color: var(--text-muted); font-family: 'DM Mono', monospace; }
.feedback { font-size: 11.5px; margin-top: 8px; font-family: 'DM Mono', monospace; }
.feedback.error { color: var(--negative); }
.feedback.success { color: var(--positive); }

.search-bar { display: flex; gap: 8px; margin-bottom: 12px; }
.search-input { flex: 1; background: var(--surface); border: 1.5px solid var(--border); border-radius: 7px; color: var(--text-primary); font-family: 'Noto Sans KR', sans-serif; font-size: 13.5px; padding: 10px 14px; outline: none; }
.search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }
.search-result-list { display: flex; flex-direction: column; gap: 6px; max-height: 340px; overflow-y: auto; margin-bottom: 16px; }
.search-result-item { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 10px 13px; display: flex; align-items: center; gap: 12px; }
.sr-logo { width: 32px; height: 32px; border-radius: 8px; background: var(--card); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 14px; flex-shrink: 0; }
.sr-name { font-size: 13px; font-weight: 700; }
.sr-code { font-size: 10px; color: var(--text-muted); font-family: 'DM Mono', monospace; }
.sr-market { font-size: 9px; padding: 2px 6px; border-radius: 4px; background: var(--surface); border: 1px solid var(--border); color: var(--text-muted); font-family: 'DM Mono', monospace; margin-left: 4px; }
.sr-add-btn { padding: 5px 11px; border-radius: 5px; background: var(--accent); color: #fff; font-size: 11.5px; font-weight: 700; border: none; cursor: pointer; font-family: 'Noto Sans KR', sans-serif; margin-left: auto; }
.sr-add-btn.added { background: var(--positive-bg); color: var(--positive); border: 1px solid var(--positive-border); }
.sr-add-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.empty-msg { font-size: 12px; color: var(--text-muted); padding: 12px; text-align: center; }

.stock-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
.stock-card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 14px; position: relative; }
.stock-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px; }
.sc-logo { width: 32px; height: 32px; border-radius: 8px; background: var(--card); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 14px; }
.sc-remove { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 13px; padding: 4px; border-radius: 4px; }
.sc-remove:hover { background: var(--negative-bg); color: var(--negative); }
.sc-name { font-size: 13.5px; font-weight: 700; }
.sc-code { font-size: 10px; color: var(--text-muted); font-family: 'DM Mono', monospace; }
.sc-market-badge { font-size: 9px; padding: 1px 5px; border-radius: 3px; background: var(--card); border: 1px solid var(--border); color: var(--text-muted); font-family: 'DM Mono', monospace; margin-left: 5px; }
`;
const pageScripts = `
function applyTheme(t){const r=document.documentElement;if(t==='light'){r.classList.add('theme-light');r.classList.remove('theme-dark');r.setAttribute('data-theme','light');document.getElementById('themeBtn').textContent='☀️';}else{r.classList.remove('theme-light');r.classList.add('theme-dark');r.setAttribute('data-theme','dark');document.getElementById('themeBtn').textContent='🌙';}localStorage.setItem('theme',t);}
function toggleTheme(){const c=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');applyTheme(c==='dark'?'light':'dark');}
(function(){const s=localStorage.getItem('theme');if(s)applyTheme(s);else if(window.matchMedia('(prefers-color-scheme: light)').matches)applyTheme('light');else document.getElementById('themeBtn').textContent='🌙';})();
`;

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function SharedBasketDetail() {
  useLegacyPage({ title: '공용 바구니 상세 — 주식 바구니', styles: pageStyles, scripts: pageScripts });

  const basketId = useMemo(() => {
    const sp = new URLSearchParams(window.location.search);
    return sp.get('id');
  }, []);

  const [basket, setBasket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [inviteEmail, setInviteEmail] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  const [inviteFeedback, setInviteFeedback] = useState(null);
  const [inviting, setInviting] = useState(false);

  const [master, setMaster] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [pendingCode, setPendingCode] = useState(null);

  const stockCodes = useMemo(() => new Set((basket?.stocks || []).map((s) => s.stockCode)), [basket]);
  const searchResults = useMemo(() => filterStocks(master, keyword), [master, keyword]);

  const load = async () => {
    if (!basketId) {
      setLoadError('잘못된 접근입니다.');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await getBasket(basketId);
      setBasket(res?.data || null);
      setLoadError(null);
    } catch (err) {
      const code = err?.response?.data?.code;
      if (code === 'SHARED_404') setLoadError('존재하지 않는 바구니입니다.');
      else if (code === 'SHARED_403') setLoadError('이 바구니에 참여 중이지 않습니다.');
      else setLoadError(err?.response?.data?.message || '불러오기에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    loadStockMaster().then(setMaster);
  }, [basketId]);

  const handleSearchUser = async () => {
    const email = inviteEmail.trim();
    if (!email) return;
    setInviteFeedback(null);
    setSearchedUser(null);
    setSearching(true);
    try {
      const res = await searchUser(email);
      setSearchedUser(res?.data || null);
    } catch (err) {
      const code = err?.response?.data?.code;
      if (code === 'USER_404') setInviteFeedback({ kind: 'error', text: '가입되지 않은 이메일입니다.' });
      else setInviteFeedback({ kind: 'error', text: err?.response?.data?.message || '사용자 검색에 실패했습니다.' });
    } finally {
      setSearching(false);
    }
  };

  const handleInvite = async () => {
    if (!searchedUser) return;
    setInviting(true);
    setInviteFeedback(null);
    try {
      await inviteUser(basketId, searchedUser.email);
      setInviteFeedback({ kind: 'success', text: `${searchedUser.nickname}님에게 초대 메일을 보냈습니다. (48시간 유효)` });
      setSearchedUser(null);
      setInviteEmail('');
    } catch (err) {
      const code = err?.response?.data?.code;
      const map = {
        SHARED_400_SELF: '자기 자신은 초대할 수 없습니다.',
        SHARED_409_MEMBER: '이미 바구니에 참여 중인 사용자입니다.',
        SHARED_409_INVITE: '이미 유효한 초대가 발송된 상태입니다.',
        USER_404: '가입되지 않은 이메일입니다.',
        SHARED_403: '바구니에 참여 중이지 않습니다.',
      };
      setInviteFeedback({ kind: 'error', text: map[code] || err?.response?.data?.message || '초대에 실패했습니다.' });
    } finally {
      setInviting(false);
    }
  };

  const handleKick = async (memberId, nickname) => {
    if (!confirm(`${nickname}님을 바구니에서 내보낼까요?`)) return;
    try {
      await kickMember(basketId, memberId);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || '멤버 퇴장에 실패했습니다.');
    }
  };

  const handleLeave = async () => {
    if (!confirm('이 바구니에서 나가시겠습니까?')) return;
    try {
      await leaveBasket(basketId);
      navigate('/shared-baskets.html');
    } catch (err) {
      const code = err?.response?.data?.code;
      if (code === 'SHARED_400_LEAVE') alert('소유자는 바구니를 나갈 수 없습니다. 바구니를 삭제해야 합니다.');
      else alert(err?.response?.data?.message || '나가기에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!confirm(`"${basket?.name}" 바구니를 삭제하시겠습니까? 멤버 전원이 함께 빠지며 되돌릴 수 없습니다.`)) return;
    try {
      await deleteBasket(basketId);
      navigate('/shared-baskets.html');
    } catch (err) {
      alert(err?.response?.data?.message || '삭제에 실패했습니다.');
    }
  };

  const handleAddStock = async (stockCode) => {
    setPendingCode(stockCode);
    try {
      await addStock(basketId, stockCode);
      await load();
    } catch (err) {
      const c = err?.response?.data?.code;
      if (c === 'STOCK_409') alert('이미 바구니에 담긴 종목입니다.');
      else if (c === 'SHARED_400_LIMIT') alert('공용 바구니는 최대 30개까지 담을 수 있습니다.');
      else if (c === 'STOCK_404') alert('존재하지 않는 종목입니다.');
      else alert(err?.response?.data?.message || '추가에 실패했습니다.');
    } finally {
      setPendingCode(null);
    }
  };

  const handleRemoveStock = async (stockCode, name) => {
    if (!confirm(`${name}을(를) 바구니에서 제거할까요?`)) return;
    setPendingCode(stockCode);
    try {
      await removeStock(basketId, stockCode);
      await load();
    } catch (err) {
      alert(err?.response?.data?.message || '제거에 실패했습니다.');
    } finally {
      setPendingCode(null);
    }
  };

  const goStockDetail = (stockCode) => {
    window.location.href = `/stock-detail.html?code=${encodeURIComponent(stockCode)}`;
  };

  const marketBadge = (market) => market || '-';
  const initial = (nick) => (nick || '?').slice(0, 1);

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
            <div className="topbar-title">공용 바구니 상세</div>
            <div className="topbar-sub">멤버 · 종목 · 초대 관리</div>
          </div>
          <div className="topbar-right">
            <button className="theme-btn" onClick={() => { toggleTheme(); }} id="themeBtn" title="테마 전환">🌙</button>
          </div>
        </div>
        <div className="body">
          <div className="back-link" onClick={() => navigate('/shared-baskets.html')}>← 공용 바구니 목록</div>

          {loading ? (
            <div className="empty-msg">불러오는 중...</div>
          ) : loadError ? (
            <div className="panel"><div className="empty-msg">{loadError}</div></div>
          ) : basket ? (
            <>
              <div className="hero">
                <div className="hero-left">
                  <div className="hero-icon">👥</div>
                  <div style={{ minWidth: 0 }}>
                    <div className="hero-title">
                      {basket.name}
                      <span className={`owner-pill ${basket.isOwner ? 'owner' : 'member'}`}>
                        {basket.isOwner ? 'OWNER' : 'MEMBER'}
                      </span>
                    </div>
                    <div className="hero-meta">
                      소유자 · {basket.owner?.nickname || '-'} ({basket.owner?.email || '-'})
                    </div>
                  </div>
                </div>
                <div className="hero-actions">
                  {basket.isOwner ? (
                    <button className="btn btn-danger" onClick={handleDelete}>바구니 삭제</button>
                  ) : (
                    <button className="btn btn-ghost" onClick={handleLeave}>바구니 나가기</button>
                  )}
                </div>
              </div>

              <div className="grid-2">
                <div className="panel">
                  <div className="panel-title">
                    <span>👤 멤버</span>
                    <span className="count">{(basket.members?.length ?? 0) + 1}명</span>
                  </div>

                  <div className="member-row">
                    <div className="member-avatar">{initial(basket.owner?.nickname)}</div>
                    <div className="member-info">
                      <div className="member-nick">
                        {basket.owner?.nickname}
                        <span className="member-tag owner" style={{ marginLeft: 6 }}>OWNER</span>
                      </div>
                      <div className="member-email">{basket.owner?.email}</div>
                    </div>
                  </div>

                  {(basket.members || []).map((m) => (
                    <div className="member-row" key={m.id}>
                      <div className="member-avatar">{initial(m.nickname)}</div>
                      <div className="member-info">
                        <div className="member-nick">{m.nickname}</div>
                        <div className="member-email">{m.email}</div>
                      </div>
                      {basket.isOwner && (
                        <button
                          className="member-kick"
                          title="강제 퇴장"
                          onClick={() => handleKick(m.id, m.nickname)}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}

                  <div style={{ marginTop: 18 }}>
                    <div className="panel-title" style={{ marginBottom: 8 }}>✉️ 멤버 초대</div>
                    <div className="invite-row">
                      <input
                        type="email"
                        className="text-input"
                        placeholder="초대할 이메일"
                        value={inviteEmail}
                        onChange={(e) => { setInviteEmail(e.target.value); setSearchedUser(null); setInviteFeedback(null); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSearchUser(); }}
                      />
                      <button
                        className="btn btn-ghost"
                        disabled={searching || !inviteEmail.trim()}
                        onClick={handleSearchUser}
                      >
                        {searching ? '검색중...' : '확인'}
                      </button>
                    </div>

                    {searchedUser && (
                      <div className="invite-result">
                        <div className="member-avatar">{initial(searchedUser.nickname)}</div>
                        <div className="info">
                          <div className="nick">{searchedUser.nickname}</div>
                          <div className="email">{searchedUser.email}</div>
                        </div>
                        <button
                          className="btn btn-primary"
                          disabled={inviting}
                          onClick={handleInvite}
                        >
                          {inviting ? '발송중...' : '초대 메일 보내기'}
                        </button>
                      </div>
                    )}

                    {inviteFeedback && (
                      <div className={`feedback ${inviteFeedback.kind}`}>{inviteFeedback.text}</div>
                    )}
                  </div>
                </div>

                <div className="panel">
                  <div className="panel-title">
                    <span>📊 담긴 종목</span>
                    <span className="count">{basket.stocks?.length ?? 0} / 30</span>
                  </div>

                  <div className="search-bar">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="종목명 또는 코드 입력 (예: 삼, 005930)"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      autoComplete="off"
                    />
                    {keyword && (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => setKeyword('')}
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {keyword.trim() && (
                    <div className="search-result-list">
                      {searchResults.length === 0 ? (
                        <div className="empty-msg">검색 결과가 없습니다.</div>
                      ) : (
                        searchResults.map((s) => {
                          const already = stockCodes.has(s.code);
                          return (
                            <div className="search-result-item" key={s.code}>
                              <div className="sr-logo">📈</div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div className="sr-name">
                                  {s.name}
                                  <span className="sr-market">{marketBadge(s.market)}</span>
                                </div>
                                <div className="sr-code">{s.code}</div>
                              </div>
                              <button
                                className={`sr-add-btn ${already ? 'added' : ''}`}
                                disabled={already || pendingCode === s.code}
                                onClick={() => !already && handleAddStock(s.code)}
                              >
                                {already ? '✓ 추가됨' : (pendingCode === s.code ? '추가중...' : '+ 추가')}
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {(basket.stocks?.length ?? 0) === 0 ? (
                    <div className="empty-msg">아직 담긴 종목이 없습니다. 위에서 검색해 추가해보세요.</div>
                  ) : (
                    <div className="stock-grid">
                      {basket.stocks.map((s) => (
                        <div className="stock-card" key={s.stockCode}>
                          <div className="stock-card-top">
                            <div className="sc-logo" onClick={() => goStockDetail(s.stockCode)} style={{ cursor: 'pointer' }}>📊</div>
                            <button
                              className="sc-remove"
                              onClick={() => handleRemoveStock(s.stockCode, s.name)}
                              disabled={pendingCode === s.stockCode}
                            >
                              ✕
                            </button>
                          </div>
                          <div className="sc-name" onClick={() => goStockDetail(s.stockCode)} style={{ cursor: 'pointer' }}>
                            {s.name}
                            <span className="sc-market-badge">{marketBadge(s.market)}</span>
                          </div>
                          <div className="sc-code">{s.stockCode}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
