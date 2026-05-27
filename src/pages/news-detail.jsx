import { useEffect, useState } from 'react';
import { useLegacyPage } from '../hooks/useLegacyPage.js';
import { getNewsDetail } from '../api/news.js';
import SidebarUserCard from '../components/SidebarUserCard.jsx';

const pageStyles = "\n.layout{display:flex;min-height:100vh;}\n.sidebar{width:var(--sidebar-w);background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;position:fixed;top:0;left:0;height:100vh;z-index:100;}\n.sidebar-logo{padding:22px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;}\n.sidebar-nav{flex:1;padding:16px 12px;}\n.nav-section{font-size:9px;font-family:'DM Mono',monospace;letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);padding:10px 8px 5px;margin-top:8px;}\n.nav-item{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:6px;font-size:13px;font-weight:500;color:var(--text-secondary);cursor:pointer;margin-bottom:2px;}\n.nav-item:hover{background:var(--card);color:var(--text-primary);}\n.main{margin-left:var(--sidebar-w);flex:1;}\n.topbar{height:58px;background:var(--surface);border-bottom:1px solid var(--border);display:flex;align-items:center;padding:0 28px;gap:14px;position:sticky;top:0;z-index:50;}\n.topbar-title{font-size:15px;font-weight:700;}\n.back-btn{display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-muted);cursor:pointer;background:none;border:none;}\n.back-btn:hover{color:var(--text-primary);}\n.theme-btn{margin-left:auto;width:32px;height:32px;border-radius:6px;background:transparent;border:1px solid var(--border);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;}\n\n.container{padding:24px 32px;max-width:1100px;}\n.article-card{background:var(--card);border:1px solid var(--border);border-radius:10px;overflow:hidden;margin-bottom:16px;}\n.article-verdict-bar{height:4px;}\n.article-verdict-bar.POSITIVE{background:var(--positive);}\n.article-verdict-bar.NEGATIVE{background:var(--negative);}\n.article-verdict-bar.NEUTRAL{background:var(--neutral);}\n.article-header{padding:28px 28px 20px;}\n.article-type-row{display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap;}\n.chip{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:700;font-family:'DM Mono',monospace;}\n.chip-good{background:var(--positive-bg);color:var(--positive);border:1px solid var(--positive-border);}\n.chip-bad{background:var(--negative-bg);color:var(--negative);border:1px solid var(--negative-border);}\n.chip-mid{background:var(--neutral-bg);color:var(--neutral);border:1px solid var(--neutral-border);}\n.chip-gray{background:var(--surface);color:var(--text-muted);border:1px solid var(--border);}\n.chip-accent{background:var(--accent-bg);color:var(--accent);border:1px solid rgba(129,140,248,.25);}\n.article-headline{font-size:22px;font-weight:700;line-height:1.5;letter-spacing:-0.3px;color:var(--text-primary);margin-bottom:14px;}\n.article-meta-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding-bottom:18px;border-bottom:1px solid var(--border);font-size:12px;color:var(--text-muted);}\n.meta-link{color:var(--accent);text-decoration:none;}\n.meta-link:hover{text-decoration:underline;}\n\n.impact-hero{margin:20px 28px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:20px 24px;display:flex;gap:24px;align-items:center;}\n.impact-score-big{width:84px;height:84px;border-radius:50%;border:3px solid var(--neutral);display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;}\n.impact-score-big.POSITIVE{border-color:var(--positive);background:var(--positive-bg);}\n.impact-score-big.NEGATIVE{border-color:var(--negative);background:var(--negative-bg);}\n.impact-score-big.NEUTRAL{border-color:var(--neutral);background:var(--neutral-bg);}\n.impact-score-num{font-family:'DM Mono',monospace;font-size:26px;font-weight:600;line-height:1;}\n.impact-score-num.POSITIVE{color:var(--positive);}\n.impact-score-num.NEGATIVE{color:var(--negative);}\n.impact-score-num.NEUTRAL{color:var(--neutral);}\n.impact-score-label{font-size:9px;margin-top:2px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;}\n.impact-details{flex:1;}\n.impact-details-title{font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:10px;}\n.impact-metrics{display:flex;flex-direction:column;gap:6px;}\n.impact-metric{display:flex;align-items:center;gap:8px;}\n.impact-metric-label{font-size:11px;color:var(--text-muted);width:96px;flex-shrink:0;}\n.impact-metric-bar{flex:1;height:6px;background:var(--border);border-radius:3px;overflow:hidden;}\n.impact-metric-fill{height:100%;border-radius:3px;background:var(--accent);}\n.impact-metric-val{font-family:'DM Mono',monospace;font-size:11px;color:var(--text-secondary);width:32px;text-align:right;}\n\n.analysis-section{padding:0 28px 24px;}\n.analysis-section+.analysis-section{border-top:1px solid var(--border);padding-top:20px;}\n.section-head{display:flex;align-items:center;gap:8px;margin-bottom:14px;}\n.section-head-title{font-size:14px;font-weight:600;}\n.section-head-badge{margin-left:auto;background:var(--accent-bg);color:var(--accent);border:1px solid rgba(129,140,248,.2);border-radius:4px;padding:2px 7px;font-size:10px;font-weight:600;}\n.ai-analysis-body{font-size:13px;line-height:1.9;color:var(--text-secondary);white-space:pre-wrap;}\n.verdict-box{background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:14px;}\n.verdict-box.POSITIVE{background:var(--positive-bg);border-color:var(--positive-border);}\n.verdict-box.NEGATIVE{background:var(--negative-bg);border-color:var(--negative-border);}\n.verdict-box.NEUTRAL{background:var(--neutral-bg);border-color:var(--neutral-border);}\n.verdict-title{font-size:11px;font-weight:600;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;}\n.verdict-text{font-size:13px;line-height:1.7;color:var(--text-primary);}\n.loading,.error-state{padding:40px;text-align:center;color:var(--text-muted);font-size:13px;}\n";
const pageScripts = "\nfunction applyTheme(t){const r=document.documentElement;if(t==='light'){r.classList.add('theme-light');r.classList.remove('theme-dark');r.setAttribute('data-theme','light');const b=document.getElementById('themeBtn');if(b)b.textContent='☀️';}else{r.classList.remove('theme-light');r.classList.add('theme-dark');r.setAttribute('data-theme','dark');const b=document.getElementById('themeBtn');if(b)b.textContent='🌙';}localStorage.setItem('theme',t);}\nfunction toggleTheme(){const c=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');applyTheme(c==='dark'?'light':'dark');}\n(function(){const s=localStorage.getItem('theme');if(s)applyTheme(s);else if(window.matchMedia('(prefers-color-scheme: light)').matches)applyTheme('light');})();\n";

function sentimentChip(s) {
  if (s === 'POSITIVE') return <span className="chip chip-good">🟢 호재</span>;
  if (s === 'NEGATIVE') return <span className="chip chip-bad">🔴 악재</span>;
  if (s === 'NEUTRAL') return <span className="chip chip-mid">🟡 중립</span>;
  return <span className="chip chip-gray">분석 중</span>;
}

function fmtTime(iso) {
  if (!iso) return '';
  try { return new Date(iso).toLocaleString('ko-KR'); } catch { return iso; }
}

export default function NewsDetail() {
  useLegacyPage({ title: "뉴스 상세 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
      setError('newsId가 지정되지 않았습니다. URL에 ?id=뉴스ID 를 추가하세요.');
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await getNewsDetail(id);
        setNews(res?.data || null);
      } catch (err) {
        const c = err?.response?.data?.code;
        if (c === 'NEWS_404') setError('존재하지 않는 뉴스입니다.');
        else setError(err?.response?.data?.message || '뉴스를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const sentiment = news?.sentimentType || 'NEUTRAL';

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
          <a href="settings.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>🔔</span> 알림 설정</a>
          <a href="account.html" className="nav-item"><span style={{fontSize:'14px',width:'20px',textAlign:'center'}}>⚙️</span> 계정 설정</a>
        </nav>
        <SidebarUserCard />
      </aside>
      <div className="main">
        <div className="topbar">
          <button className="back-btn" onClick={() => window.history.back()}>← 뒤로</button>
          <div className="topbar-title">뉴스 상세 분석</div>
          <button className="theme-btn" onClick={() => { toggleTheme(); }} id="themeBtn">🌙</button>
        </div>
        <div className="container">
          {loading ? (
            <div className="loading">불러오는 중...</div>
          ) : error ? (
            <div className="error-state">{error}</div>
          ) : !news ? (
            <div className="loading">뉴스가 없습니다.</div>
          ) : (
            <>
              <div className="article-card">
                <div className={`article-verdict-bar ${sentiment}`}></div>
                <div className="article-header">
                  <div className="article-type-row">
                    {sentimentChip(sentiment)}
                    {news.impactScore >= 80 && <span className="chip chip-bad">⚡ 고영향</span>}
                    {(news.aiAnalysis || news.aiVerdict) && <span className="chip chip-accent">AI 분석 완료</span>}
                    <span className="chip chip-gray">{news.stockName} · {news.stockCode}</span>
                  </div>
                  <div className="article-headline">{news.title}</div>
                  <div className="article-meta-row">
                    <span>📰 {news.publisher}</span>
                    <span>·</span>
                    <span>{fmtTime(news.publishedAt)}</span>
                    {news.sourceUrl && (
                      <>
                        <span>·</span>
                        <a className="meta-link" href={news.sourceUrl} target="_blank" rel="noreferrer">원문 보기 ↗</a>
                      </>
                    )}
                  </div>
                </div>
                <div className={`impact-hero`}>
                  <div className={`impact-score-big ${sentiment}`}>
                    <div className={`impact-score-num ${sentiment}`}>{news.impactScore ?? '-'}</div>
                    <div className="impact-score-label">영향력</div>
                  </div>
                  <div className="impact-details">
                    <div className="impact-details-title">📊 세부 영향도 분석</div>
                    <div className="impact-metrics">
                      <div className="impact-metric">
                        <span className="impact-metric-label">시장 충격</span>
                        <div className="impact-metric-bar"><div className="impact-metric-fill" style={{ width: `${news.marketShockScore || 0}%` }}></div></div>
                        <span className="impact-metric-val">{news.marketShockScore ?? '-'}</span>
                      </div>
                      <div className="impact-metric">
                        <span className="impact-metric-label">신뢰도</span>
                        <div className="impact-metric-bar"><div className="impact-metric-fill" style={{ width: `${news.reliabilityScore || 0}%` }}></div></div>
                        <span className="impact-metric-val">{news.reliabilityScore ?? '-'}</span>
                      </div>
                      <div className="impact-metric">
                        <span className="impact-metric-label">단기 영향</span>
                        <div className="impact-metric-bar"><div className="impact-metric-fill" style={{ width: `${news.shortTermImpact || 0}%` }}></div></div>
                        <span className="impact-metric-val">{news.shortTermImpact ?? '-'}</span>
                      </div>
                      <div className="impact-metric">
                        <span className="impact-metric-label">장기 영향</span>
                        <div className="impact-metric-bar"><div className="impact-metric-fill" style={{ width: `${news.longTermImpact || 0}%` }}></div></div>
                        <span className="impact-metric-val">{news.longTermImpact ?? '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {news.aiVerdict && (
                  <div className="analysis-section">
                    <div className={`verdict-box ${sentiment}`}>
                      <div className="verdict-title">🤖 AI 판단</div>
                      <div className="verdict-text">{news.aiVerdict}</div>
                    </div>
                  </div>
                )}

                {news.aiAnalysis && (
                  <div className="analysis-section">
                    <div className="section-head">
                      <div className="section-head-title">📝 AI 상세 분석</div>
                      <span className="section-head-badge">AI</span>
                    </div>
                    <div className="ai-analysis-body">{news.aiAnalysis}</div>
                  </div>
                )}

                {news.content && (
                  <div className="analysis-section">
                    <div className="section-head">
                      <div className="section-head-title">📰 원문 요약</div>
                    </div>
                    <div className="ai-analysis-body">{news.content}</div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
