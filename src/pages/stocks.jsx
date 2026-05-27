import { useEffect, useMemo, useState } from 'react';
import { useLegacyPage } from '../hooks/useLegacyPage.js';
import { getBasket, addToBasket, removeFromBasket } from '../api/stocks.js';
import { loadStockMaster } from '../api/stockMaster.js';
import SidebarUserCard from '../components/SidebarUserCard.jsx';

const MAX_AUTOCOMPLETE = 50;
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

const pageStyles = "\n.layout { display: flex; min-height: 100vh; }\n.sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; }\n.sidebar-logo { padding: 22px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }\n.sidebar-nav { flex: 1; padding: 14px 12px; overflow-y: auto; }\n.nav-section { font-size: 9px; font-family: 'DM Mono', monospace; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); padding: 10px 8px 5px; margin-top: 8px; }\n.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; margin-bottom: 2px; position: relative; }\n.nav-item:hover { background: var(--card); color: var(--text-primary); }\n.nav-item.active { background: var(--accent-bg); color: var(--accent); }\n.nav-item.active::before { content: ''; position: absolute; left: 0; top: 5px; bottom: 5px; width: 3px; background: var(--accent); border-radius: 0 2px 2px 0; }\n.sidebar-bottom { padding: 12px; border-top: 1px solid var(--border); }\n.main { margin-left: var(--sidebar-w); flex: 1; }\n.topbar { height: 58px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 0 28px; gap: 14px; position: sticky; top: 0; z-index: 50; }\n.topbar-title { font-size: 15px; font-weight: 700; }\n.topbar-sub { font-size: 11.5px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.topbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }\n.theme-btn { width: 32px; height: 32px; border-radius: 6px; background: transparent; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; }\n\n.body { padding: 28px 40px; }\n.add-section { display: grid; grid-template-columns: 580px 1fr; gap: 20px; margin-bottom: 32px; align-items: start; }\n.search-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 20px; }\n.card-title { font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 14px; }\n.search-bar { display: flex; gap: 8px; margin-bottom: 12px; }\n.search-input { flex: 1; background: var(--surface); border: 1.5px solid var(--border); border-radius: 7px; color: var(--text-primary); font-family: 'Noto Sans KR', sans-serif; font-size: 13.5px; padding: 10px 14px; outline: none; }\n.search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }\n.btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; border: none; font-family: 'Noto Sans KR', sans-serif; }\n.btn-primary { background: var(--accent); color: #fff; }\n.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }\n.search-result-list { display: flex; flex-direction: column; gap: 6px; max-height: 480px; overflow-y: auto; }\n.search-result-item { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 10px 13px; display: flex; align-items: center; gap: 12px; }\n.sr-logo { width: 34px; height: 34px; border-radius: 8px; background: var(--card); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }\n.sr-name { font-size: 13px; font-weight: 700; }\n.sr-code { font-size: 10px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.sr-market { font-size: 9px; padding: 2px 6px; border-radius: 4px; background: var(--surface); border: 1px solid var(--border); color: var(--text-muted); font-family: 'DM Mono', monospace; margin-left: 4px; }\n.sr-add-btn { padding: 5px 11px; border-radius: 5px; background: var(--accent); color: #fff; font-size: 11.5px; font-weight: 700; border: none; cursor: pointer; font-family: 'Noto Sans KR', sans-serif; margin-left: auto; }\n.sr-add-btn.added { background: var(--positive-bg); color: var(--positive); border: 1px solid var(--positive-border); }\n.sr-add-btn:disabled { opacity: 0.6; cursor: not-allowed; }\n.empty-msg { font-size: 12px; color: var(--text-muted); padding: 12px; text-align: center; }\n\n.basket-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }\n.basket-header-left { font-size: 12px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); }\n.basket-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }\n.basket-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 18px; position: relative; transition: all 0.18s; cursor: pointer; }\n.basket-card:hover { background: var(--card-hover); border-color: var(--border-light); }\n.basket-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }\n.bc-logo { width: 38px; height: 38px; border-radius: 9px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 17px; }\n.bc-remove { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 13px; padding: 4px; border-radius: 4px; }\n.bc-remove:hover { background: var(--negative-bg); color: var(--negative); }\n.bc-name { font-size: 14px; font-weight: 700; margin-bottom: 1px; }\n.bc-code { font-size: 10px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.bc-market-badge { font-size: 9px; padding: 1px 5px; border-radius: 3px; background: var(--surface); border: 1px solid var(--border); color: var(--text-muted); font-family: 'DM Mono', monospace; margin-left: 5px; }\n.bc-news-row { display: flex; gap: 4px; margin-top: 12px; flex-wrap: wrap; }\n.bc-news-pill { display: flex; align-items: center; gap: 3px; padding: 3px 7px; border-radius: 20px; font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace; }\n.bc-news-pill.good { background: var(--positive-bg); color: var(--positive); }\n.bc-news-pill.bad { background: var(--negative-bg); color: var(--negative); }\n.bc-news-pill.mid { background: var(--neutral-bg); color: var(--neutral); }\n.basket-add-card { background: transparent; border: 1.5px dashed var(--border); border-radius: 10px; padding: 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 190px; cursor: pointer; gap: 8px; }\n.basket-add-card:hover { border-color: var(--accent); background: var(--accent-bg); }\n";
const pageScripts = "\nfunction applyTheme(t){const r=document.documentElement;if(t==='light'){r.classList.add('theme-light');r.classList.remove('theme-dark');r.setAttribute('data-theme','light');document.getElementById('themeBtn').textContent='☀️';}else{r.classList.remove('theme-light');r.classList.add('theme-dark');r.setAttribute('data-theme','dark');document.getElementById('themeBtn').textContent='🌙';}localStorage.setItem('theme',t);}\nfunction toggleTheme(){const c=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');applyTheme(c==='dark'?'light':'dark');}\n(function(){const s=localStorage.getItem('theme');if(s)applyTheme(s);else if(window.matchMedia('(prefers-color-scheme: light)').matches)applyTheme('light');else document.getElementById('themeBtn').textContent='🌙';})();\n";

export default function Stocks() {
  useLegacyPage({ title: "내 바구니 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [master, setMaster] = useState([]);
  const [pendingCode, setPendingCode] = useState(null);

  const basketCodes = useMemo(() => new Set(basket.map((s) => s.stockCode)), [basket]);
  const searchResults = useMemo(() => filterStocks(master, keyword), [master, keyword]);

  const loadBasket = async () => {
    setLoading(true);
    try {
      const res = await getBasket();
      setBasket(res?.data || []);
    } catch (err) {
      // 401 인터셉터가 처리
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBasket();
    loadStockMaster().then(setMaster);
  }, []);

  const handleAdd = async (stockCode) => {
    setPendingCode(stockCode);
    try {
      await addToBasket(stockCode);
      await loadBasket();
    } catch (err) {
      const c = err?.response?.data?.code;
      if (c === 'STOCK_409') alert('이미 바구니에 담긴 종목입니다.');
      else if (c === 'STOCK_400') alert('바구니는 최대 20개까지 담을 수 있습니다.');
      else if (c === 'STOCK_404') alert('존재하지 않는 종목입니다.');
      else alert(err?.response?.data?.message || '추가에 실패했습니다.');
    } finally {
      setPendingCode(null);
    }
  };

  const handleRemove = async (e, stockCode, name) => {
    e.stopPropagation();
    if (!confirm(`${name}을(를) 바구니에서 제거할까요?`)) return;
    setPendingCode(stockCode);
    try {
      await removeFromBasket(stockCode);
      setBasket((prev) => prev.filter((s) => s.stockCode !== stockCode));
    } catch (err) {
      alert(err?.response?.data?.message || '제거에 실패했습니다.');
    } finally {
      setPendingCode(null);
    }
  };

  const goDetail = (stockCode) => {
    window.location.href = `/stock-detail.html?code=${encodeURIComponent(stockCode)}`;
  };

  const marketBadge = (market) => market || '-';

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
          <a href="stocks.html" className="nav-item active"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>🧺</span> 내 바구니</a>
          <a href="shared-baskets.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>👥</span> 공용 바구니</a>
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
            <div className="topbar-title">내 바구니</div>
            <div className="topbar-sub">종목 등록 및 관리</div>
          </div>
          <div className="topbar-right">
            <button className="theme-btn" onClick={() => { toggleTheme(); }} id="themeBtn" title="테마 전환">🌙</button>
          </div>
        </div>
        <div className="body">
          <div className="add-section">
            <div className="search-card">
              <div className="card-title">🔍 종목 검색 & 추가</div>
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
                    className="btn btn-primary"
                    onClick={() => setKeyword('')}
                    style={{ background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="search-result-list">
                {!keyword.trim() ? (
                  <div className="empty-msg">
                    {master.length === 0 ? '종목 목록 불러오는 중...' : `종목명 또는 코드를 입력하세요. (총 ${master.length.toLocaleString()}종목)`}
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="empty-msg">검색 결과가 없습니다.</div>
                ) : (
                  searchResults.map((s) => {
                    const already = basketCodes.has(s.code);
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
                          onClick={() => !already && handleAdd(s.code)}
                        >
                          {already ? '✓ 추가됨' : (pendingCode === s.code ? '추가중...' : '+ 추가')}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className="search-card">
              <div className="card-title">💡 TIP</div>
              <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                • 바구니는 최대 <strong>20개</strong> 까지 담을 수 있습니다.<br />
                • 담은 종목의 뉴스와 급등락 알림을 실시간으로 받아볼 수 있습니다.<br />
                • 카드를 클릭하면 종목 상세 분석 페이지로 이동합니다.
              </div>
            </div>
          </div>

          <div className="basket-header">
            <div className="basket-header-left">
              🧺 내 바구니 <span style={{ color: 'var(--accent)' }}>({basket.length}종목)</span>
            </div>
          </div>
          <div className="basket-grid">
            {loading ? (
              <div className="empty-msg" style={{ gridColumn: '1/-1' }}>불러오는 중...</div>
            ) : (
              <>
                {basket.map((s) => (
                  <div className="basket-card" key={s.stockCode} onClick={() => goDetail(s.stockCode)}>
                    <div className="basket-card-top">
                      <div className="bc-logo">📊</div>
                      <button
                        className="bc-remove"
                        onClick={(e) => handleRemove(e, s.stockCode, s.name)}
                        disabled={pendingCode === s.stockCode}
                      >
                        ✕
                      </button>
                    </div>
                    <div className="bc-name">
                      {s.name}
                      <span className="bc-market-badge">{marketBadge(s.market)}</span>
                    </div>
                    <div className="bc-code">{s.stockCode}</div>
                    <div className="bc-news-row">
                      <span className="bc-news-pill good">🟢 호재 {s.positiveNewsCount ?? 0}</span>
                      <span className="bc-news-pill bad">🔴 악재 {s.negativeNewsCount ?? 0}</span>
                      <span className="bc-news-pill mid">🟡 중립 {s.neutralNewsCount ?? 0}</span>
                    </div>
                  </div>
                ))}
                <div
                  className="basket-add-card"
                  onClick={() => document.querySelector('.search-input')?.focus()}
                >
                  <div style={{ fontSize: 26, color: 'var(--text-muted)' }}>+</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>종목 추가하기</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>검색창에서 종목을 선택하세요</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
