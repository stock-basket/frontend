import { useEffect, useState } from 'react';
import { useLegacyPage } from '../hooks/useLegacyPage.js';
import { getNewsFeed, getUrgentNews } from '../api/news.js';
import { getUnreadAlertCount } from '../api/alerts.js';
import SidebarUserCard from '../components/SidebarUserCard.jsx';

const pageStyles = "\n.layout{display:flex;min-height:100vh;}\n.sidebar{width:var(--sidebar-w);background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;}\n.sidebar-logo{padding:22px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;}\n.sidebar-nav{flex:1;padding:16px 12px;overflow-y:auto;}\n.nav-section{font-size:9px;font-family:'DM Mono',monospace;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);padding:10px 8px 5px;margin-top:8px;}\n.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:6px;font-size:13px;font-weight:500;color:var(--text-secondary);cursor:pointer;margin-bottom:2px;position:relative;}\n.nav-item:hover{background:var(--card);color:var(--text-primary);}\n.nav-item.active{background:var(--accent-bg);color:var(--accent);}\n.nav-item.active::before{content:'';position:absolute;left:0;top:5px;bottom:5px;width:3px;background:var(--accent);border-radius:0 2px 2px 0;}\n.nav-badge{margin-left:auto;background:var(--negative);color:#fff;font-size:9px;font-weight:700;padding:1px 6px;border-radius:20px;}\n\n.main{margin-left:var(--sidebar-w);flex:1;}\n.topbar{height:58px;background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 28px;gap:14px;position:sticky;top:0;z-index:50;}\n.topbar-title{font-size:15px;font-weight:700;}\n.topbar-sub{font-size:11.5px;color:var(--text-muted);font-family:'DM Mono',monospace;}\n.topbar-right{margin-left:auto;display:flex;align-items:center;gap:10px;}\n.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:6px;font-size:12.5px;font-weight:600;cursor:pointer;border:none;font-family:'Noto Sans KR',sans-serif;}\n.btn-primary{background:var(--accent);color:#fff;}\n.btn-ghost{background:transparent;color:var(--text-secondary);border:1px solid var(--border);}\n.theme-btn{width:32px;height:32px;border-radius:6px;background:transparent;border:1px solid var(--border);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;}\n.body{padding:26px 28px;}\n.filter-row{display:flex;align-items:center;gap:10px;margin-bottom:20px;flex-wrap:wrap;}\n.filter-group{display:flex;gap:4px;}\n.f-tab{padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;color:var(--text-muted);border:1px solid var(--border);background:var(--surface);}\n.f-tab.active{background:var(--card);color:var(--text-primary);border-color:var(--border-light);}\n.f-tab.good.active{background:var(--positive-bg);color:var(--positive);border-color:var(--positive-border);}\n.f-tab.bad.active{background:var(--negative-bg);color:var(--negative);border-color:var(--negative-border);}\n.f-tab.urgent.active{background:rgba(248,113,113,0.15);color:var(--negative);border-color:var(--negative);}\n\n.news-grid{display:grid;grid-template-columns:1fr;gap:18px;}\n.news-feed{display:flex;flex-direction:column;gap:10px;}\n.section-label{font-size:11px;font-weight:700;font-family:'DM Mono',monospace;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-secondary);margin:8px 0 4px;display:flex;align-items:center;gap:6px;}\n.urgent-header{display:flex;align-items:center;gap:8px;font-size:11px;font-weight:700;font-family:'DM Mono',monospace;letter-spacing:1.5px;text-transform:uppercase;color:var(--negative);margin-bottom:8px;}\n.urgent-dot{width:7px;height:7px;border-radius:50%;background:var(--negative);animation:pulse 1.2s infinite;}\n@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}\n.news-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:16px 18px;display:flex;gap:14px;border-left:3px solid transparent;cursor:pointer;transition:all 0.15s;}\n.news-card:hover{background:var(--card-hover);border-color:var(--border-light);transform:translateX(2px);}\n.news-card.POSITIVE{border-left-color:var(--positive);}\n.news-card.NEGATIVE{border-left-color:var(--negative);}\n.news-card.NEUTRAL{border-left-color:var(--neutral);}\n.news-card.urgent{border-left-color:var(--negative);box-shadow:0 0 12px rgba(248,113,113,0.08);}\n.news-body-wrap{flex:1;min-width:0;}\n.news-meta{display:flex;align-items:center;gap:7px;margin-bottom:7px;flex-wrap:wrap;}\n.chip{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;font-family:'DM Mono',monospace;}\n.chip-good{background:var(--positive-bg);color:var(--positive);border:1px solid var(--positive-border);}\n.chip-bad{background:var(--negative-bg);color:var(--negative);border:1px solid var(--negative-border);}\n.chip-mid{background:var(--neutral-bg);color:var(--neutral);border:1px solid var(--neutral-border);}\n.chip-gray{background:var(--surface);color:var(--text-muted);border:1px solid var(--border);}\n.news-stock{font-size:11px;font-weight:700;color:var(--accent);font-family:'DM Mono',monospace;}\n.news-source{font-size:10px;color:var(--text-muted);}\n.news-time{font-size:10px;color:var(--text-muted);font-family:'DM Mono',monospace;margin-left:auto;}\n.news-title{font-size:14px;font-weight:600;line-height:1.45;margin-bottom:6px;}\n.news-excerpt{font-size:12px;color:var(--text-secondary);line-height:1.6;margin-bottom:10px;}\n.impact-row{display:flex;align-items:center;gap:8px;}\n.impact-label{font-size:10px;color:var(--text-muted);font-family:'DM Mono',monospace;white-space:nowrap;min-width:36px;}\n.impact-bar{flex:1;height:5px;background:var(--border);border-radius:4px;overflow:hidden;max-width:150px;}\n.impact-fill{height:100%;border-radius:4px;}\n.impact-score{font-size:11px;font-weight:700;font-family:'DM Mono',monospace;min-width:24px;}\n.impact-reason{font-size:11px;color:var(--text-muted);margin-top:2px;}\n.empty{font-size:12.5px;color:var(--text-muted);padding:24px;text-align:center;}\n.pagination{display:flex;justify-content:center;gap:6px;margin-top:18px;}\n.page-btn{padding:5px 11px;border-radius:6px;font-size:12px;background:var(--surface);border:1px solid var(--border);color:var(--text-secondary);cursor:pointer;}\n.page-btn.active{background:var(--accent);color:#fff;border-color:var(--accent);}\n.page-btn:disabled{opacity:0.4;cursor:not-allowed;}\n";
const pageScripts = "\nfunction applyTheme(t){const r=document.documentElement;if(t==='light'){r.classList.add('theme-light');r.classList.remove('theme-dark');r.setAttribute('data-theme','light');const b=document.getElementById('themeBtn');if(b)b.textContent='☀️';}else{r.classList.remove('theme-light');r.classList.add('theme-dark');r.setAttribute('data-theme','dark');const b=document.getElementById('themeBtn');if(b)b.textContent='🌙';}localStorage.setItem('theme',t);}\nfunction toggleTheme(){const c=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');applyTheme(c==='dark'?'light':'dark');}\n(function(){const s=localStorage.getItem('theme');if(s)applyTheme(s);else if(window.matchMedia('(prefers-color-scheme: light)').matches)applyTheme('light');})();\n";

const FILTERS = [
  { key: 'all', label: '전체', sentiment: null },
  { key: 'POSITIVE', label: '🟢 호재', sentiment: 'POSITIVE' },
  { key: 'NEGATIVE', label: '🔴 악재', sentiment: 'NEGATIVE' },
  { key: 'NEUTRAL', label: '🟡 중립', sentiment: 'NEUTRAL' },
  { key: 'urgent', label: '⚡ 긴급' },
];

function sentimentClass(s) {
  return s || 'NEUTRAL';
}

function sentimentChip(s) {
  if (s === 'POSITIVE') return <span className="chip chip-good">🟢 호재</span>;
  if (s === 'NEGATIVE') return <span className="chip chip-bad">🔴 악재</span>;
  if (s === 'NEUTRAL') return <span className="chip chip-mid">🟡 중립</span>;
  return <span className="chip chip-gray">분석 중</span>;
}

function fmtTime(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
}

function impactColor(s) {
  if (s === 'POSITIVE') return 'var(--positive)';
  if (s === 'NEGATIVE') return 'var(--negative)';
  return 'var(--neutral)';
}

export default function News() {
  useLegacyPage({ title: "뉴스 피드 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ content: [], page: { totalPages: 0, totalElements: 0, number: 0 } });
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [filter]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        let res;
        if (filter === 'urgent') {
          res = await getUrgentNews({ page, size: 10 });
        } else {
          const f = FILTERS.find((x) => x.key === filter);
          res = await getNewsFeed({ sentiment: f?.sentiment, page, size: 10 });
        }
        if (!cancelled) setData(res?.data || { content: [], page: { totalPages: 0, totalElements: 0, number: 0 } });
      } catch (err) {
        if (!cancelled) setData({ content: [], page: { totalPages: 0, totalElements: 0, number: 0 } });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [filter, page]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUnreadAlertCount();
        setUnreadCount(res?.data || 0);
      } catch {}
    })();
  }, []);

  const items = data?.content || [];
  const totalPages = data?.page?.totalPages || 0;

  const goDetail = (id) => {
    window.location.href = `/news-detail.html?id=${encodeURIComponent(id)}`;
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
          <a href="news.html" className="nav-item active">
            <span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>📰</span> 뉴스 피드
            {unreadCount > 0 && <span className="nav-badge">{unreadCount}</span>}
          </a>
          <a href="stocks.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>🧺</span> 내 바구니</a>
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
            <div className="topbar-title">뉴스 피드</div>
            <div className="topbar-sub">총 {data?.page?.totalElements ?? 0}건</div>
          </div>
          <div className="topbar-right">
            <button className="btn btn-ghost" onClick={() => { window.location.href = '/settings.html'; }}>🔔 알림 설정</button>
            <button className="btn btn-primary" onClick={() => setPage((p) => p)}>↺ 새로고침</button>
            <button className="theme-btn" onClick={() => { toggleTheme(); }} id="themeBtn" title="테마 전환">🌙</button>
          </div>
        </div>
        <div className="body">
          <div className="filter-row">
            <div className="filter-group">
              {FILTERS.map((f) => (
                <div
                  key={f.key}
                  className={`f-tab ${f.key === 'POSITIVE' ? 'good' : ''} ${f.key === 'NEGATIVE' ? 'bad' : ''} ${f.key === 'urgent' ? 'urgent' : ''} ${filter === f.key ? 'active' : ''}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </div>
              ))}
            </div>
          </div>

          <div className="news-grid">
            <div className="news-feed">
              {filter === 'urgent' && (
                <div className="urgent-header">
                  <div className="urgent-dot"></div>
                  ⚡ 긴급 · 영향력 80점 이상
                </div>
              )}
              {loading ? (
                <div className="empty">불러오는 중...</div>
              ) : items.length === 0 ? (
                <div className="empty">표시할 뉴스가 없습니다.</div>
              ) : (
                items.map((n) => (
                  <div
                    key={n.id}
                    className={`news-card ${sentimentClass(n.sentimentType)} ${n.impactScore >= 80 ? 'urgent' : ''}`}
                    onClick={() => goDetail(n.id)}
                  >
                    <div className="news-body-wrap">
                      <div className="news-meta">
                        {sentimentChip(n.sentimentType)}
                        {n.impactScore >= 80 && <span className="chip chip-bad">⚡ 고영향</span>}
                        <span className="news-stock">{n.stockName} ({n.stockCode})</span>
                        <span className="news-source">{n.publisher}</span>
                        <span className="news-time">{fmtTime(n.publishedAt)}</span>
                      </div>
                      <div className="news-title">{n.title}</div>
                      {n.aiComment && <div className="news-excerpt">{n.aiComment}</div>}
                      <div className="impact-row">
                        <span className="impact-label">영향력</span>
                        <div className="impact-bar">
                          <div
                            className="impact-fill"
                            style={{
                              width: `${Math.max(0, Math.min(100, n.impactScore || 0))}%`,
                              background: impactColor(n.sentimentType),
                            }}
                          ></div>
                        </div>
                        <span className="impact-score" style={{ color: impactColor(n.sentimentType) }}>
                          {n.impactScore ?? '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    disabled={page <= 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                  >
                    이전
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      className={`page-btn ${i === page ? 'active' : ''}`}
                      onClick={() => setPage(i)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="page-btn"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  >
                    다음
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
