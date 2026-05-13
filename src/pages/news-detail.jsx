import { useLegacyPage } from '../hooks/useLegacyPage.js';

const pageStyles = "\n    /* ── News Detail Specific ── */\n    .news-detail-layout {\n      padding: 28px 32px;\n      display: grid;\n      grid-template-columns: 1fr;\n      gap: 28px;\n      align-items: start;\n      max-width: 1200px;\n    }\n\n    /* ── Page header ── */\n    .page-header-bar {\n      padding: 20px 32px 0;\n      display: flex; align-items: center; gap: 8px;\n    }\n    .back-btn {\n      display: flex; align-items: center; gap: 6px;\n      font-size: 12px; color: var(--text-muted); cursor: pointer;\n      transition: color .2s;\n    }\n    .back-btn:hover { color: var(--text-primary); }\n    .breadcrumb-sep { color: var(--border-light); }\n    .breadcrumb-current { font-size: 12px; color: var(--text-primary); }\n\n    /* ── Main Article ── */\n    .article-card {\n      background: var(--card);\n      border: 1px solid var(--border);\n      border-radius: var(--radius);\n      overflow: hidden;\n    }\n\n    .article-verdict-bar {\n      height: 4px;\n      background: var(--negative);\n    }\n\n    .article-header { padding: 28px 28px 20px; }\n\n    .article-type-row {\n      display: flex; align-items: center; gap: 8px; margin-bottom: 14px;\n    }\n\n    .article-headline {\n      font-size: 20px; font-weight: 700;\n      line-height: 1.5; letter-spacing: -0.3px;\n      color: var(--text-primary);\n      margin-bottom: 14px;\n    }\n\n    .article-meta-row {\n      display: flex; align-items: center; gap: 12px; flex-wrap: wrap;\n      padding-bottom: 18px; border-bottom: 1px solid var(--border);\n    }\n    .meta-item {\n      display: flex; align-items: center; gap: 5px;\n      font-size: 12px; color: var(--text-muted);\n    }\n    .meta-item .label { font-size: 10px; letter-spacing: .4px; }\n    .meta-item .val { color: var(--text-secondary); }\n    .meta-sep { width: 1px; height: 12px; background: var(--border-light); }\n\n    /* ── Impact Score Hero ── */\n    .impact-hero {\n      margin: 20px 28px;\n      background: linear-gradient(135deg, rgba(248,113,113,.05), rgba(248,113,113,.02));\n      border: 1px solid var(--negative-border);\n      border-radius: var(--radius);\n      padding: 20px 24px;\n      display: flex; gap: 24px; align-items: center;\n    }\n    .impact-score-big {\n      width: 80px; height: 80px; border-radius: 50%;\n      border: 3px solid var(--negative);\n      display: flex; flex-direction: column;\n      align-items: center; justify-content: center;\n      flex-shrink: 0;\n      background: var(--negative-bg);\n    }\n    .impact-score-num {\n      font-family: 'DM Mono', monospace;\n      font-size: 26px; font-weight: 500;\n      color: var(--negative); line-height: 1;\n    }\n    .impact-score-label { font-size: 9px; color: var(--negative); margin-top: 2px; }\n    .impact-details { flex: 1; }\n    .impact-details-title { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 10px; }\n    .impact-metrics { display: flex; flex-direction: column; gap: 6px; }\n    .impact-metric { display: flex; align-items: center; gap: 8px; }\n    .impact-metric-label { font-size: 11px; color: var(--text-muted); width: 80px; flex-shrink: 0; }\n    .impact-metric-bar { flex: 1; height: 5px; background: var(--border); border-radius: 3px; overflow: hidden; }\n    .impact-metric-fill { height: 100%; border-radius: 3px; }\n    .impact-metric-val { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-muted); width: 28px; text-align: right; }\n\n    /* ── AI Analysis Section ── */\n    .analysis-section { padding: 0 28px 24px; }\n    .analysis-section + .analysis-section { border-top: 1px solid var(--border); padding-top: 20px; }\n\n    .section-head {\n      display: flex; align-items: center; gap: 8px;\n      margin-bottom: 14px;\n    }\n    .section-head-icon { font-size: 16px; }\n    .section-head-title { font-size: 14px; font-weight: 600; color: var(--text-primary); }\n    .section-head-badge {\n      margin-left: auto;\n      background: var(--accent-bg); color: var(--accent);\n      border: 1px solid rgba(129,140,248,.2);\n      border-radius: 4px; padding: 2px 7px;\n      font-size: 10px; font-weight: 600;\n    }\n\n    /* ── AI Analysis body ── */\n    .ai-analysis-body {\n      font-size: 13px; line-height: 1.9;\n      color: var(--text-secondary);\n    }\n    .ai-analysis-body p { margin-bottom: 12px; }\n    .ai-analysis-body p:last-child { margin-bottom: 0; }\n    .ai-analysis-body strong { color: var(--text-primary); }\n    .ai-analysis-body .highlight-neg {\n      background: var(--negative-bg);\n      color: var(--negative);\n      border-radius: 3px; padding: 0 4px;\n    }\n    .ai-analysis-body .highlight-pos {\n      background: var(--positive-bg);\n      color: var(--positive);\n      border-radius: 3px; padding: 0 4px;\n    }\n\n    /* ── Key points list ── */\n    .key-points { display: flex; flex-direction: column; gap: 8px; }\n    .key-point {\n      display: flex; gap: 10px; align-items: flex-start;\n      padding: 10px 12px;\n      background: var(--surface); border-radius: 7px;\n      font-size: 12px; line-height: 1.6;\n    }\n    .kp-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }\n    .kp-text { color: var(--text-secondary); }\n    .kp-text strong { color: var(--text-primary); }\n\n    /* ── Related stock impact ── */\n    .affected-stocks { display: flex; flex-direction: column; gap: 8px; }\n    .affected-stock-row {\n      display: flex; align-items: center; gap: 12px;\n      padding: 10px 12px;\n      background: var(--surface); border-radius: 7px;\n    }\n    .aff-icon { font-size: 16px; flex-shrink: 0; }\n    .aff-info { flex: 1; }\n    .aff-name { font-size: 12px; font-weight: 600; color: var(--text-primary); }\n    .aff-reason { font-size: 11px; color: var(--text-muted); }\n    .aff-impact {\n      font-size: 11px; font-family: 'DM Mono', monospace;\n      padding: 3px 8px; border-radius: 4px;\n    }\n    .aff-impact.neg { background: var(--negative-bg); color: var(--negative); }\n    .aff-impact.pos { background: var(--positive-bg); color: var(--positive); }\n    .aff-impact.neutral { background: var(--neutral-bg); color: var(--neutral); }\n\n    /* ── Original article ── */\n    .original-article-box {\n      margin: 0 28px 24px;\n      background: var(--surface);\n      border: 1px solid var(--border);\n      border-radius: var(--radius);\n      overflow: hidden;\n    }\n    .oab-header {\n      padding: 12px 16px;\n      border-bottom: 1px solid var(--border);\n      display: flex; align-items: center; justify-content: space-between;\n    }\n    .oab-title { font-size: 12px; font-weight: 600; color: var(--text-muted); }\n    .oab-source { font-size: 11px; color: var(--text-muted); }\n    .oab-body {\n      padding: 16px;\n      font-size: 12px; line-height: 1.9;\n      color: var(--text-muted);\n    }\n    .oab-more {\n      padding: 10px 16px;\n      border-top: 1px solid var(--border);\n      display: flex; justify-content: center;\n    }\n\n    /* ── Tags ── */\n    .tags-wrap { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }\n    .tag {\n      background: var(--surface); color: var(--text-muted);\n      border: 1px solid var(--border); border-radius: 4px;\n      padding: 3px 9px; font-size: 11px;\n    }\n    .tag:hover { border-color: var(--border-light); color: var(--text-primary); cursor: pointer; }\n\n    /* ── Right sidebar ── */\n    .news-sidebar { display: flex; flex-direction: column; gap: 16px; }\n    .sidebar-card {\n      background: var(--card);\n      border: 1px solid var(--border);\n      border-radius: var(--radius);\n      padding: 18px;\n    }\n    .sidebar-card-title {\n      font-size: 11px; font-weight: 600;\n      color: var(--text-muted); letter-spacing: .5px;\n      text-transform: uppercase; margin-bottom: 14px;\n    }\n\n    /* ── Mini impact gauge ── */\n    .gauge-wrap {\n      display: flex; flex-direction: column; gap: 10px;\n    }\n    .gauge-row { display: flex; flex-direction: column; gap: 4px; }\n    .gauge-label-row { display: flex; justify-content: space-between; align-items: center; }\n    .gauge-name { font-size: 12px; color: var(--text-secondary); }\n    .gauge-val { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-muted); }\n    .gauge-bar { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; }\n    .gauge-fill { height: 100%; border-radius: 3px; transition: width .5s ease; }\n\n    /* ── Related news cards ── */\n    .related-news-list { display: flex; flex-direction: column; gap: 10px; }\n    .related-news-item {\n      display: flex; gap: 10px;\n      padding: 10px 0;\n      border-bottom: 1px solid var(--border);\n      cursor: pointer;\n      transition: opacity .15s;\n    }\n    .related-news-item:last-child { border-bottom: none; padding-bottom: 0; }\n    .related-news-item:hover { opacity: 0.75; }\n    .rni-indicator { width: 3px; border-radius: 2px; flex-shrink: 0; }\n    .rni-content { flex: 1; }\n    .rni-title { font-size: 11px; font-weight: 500; color: var(--text-primary); line-height: 1.5; margin-bottom: 4px; }\n    .rni-meta { display: flex; gap: 6px; }\n    .rni-score { font-family: 'DM Mono', monospace; font-size: 10px; }\n    .rni-time { font-size: 10px; color: var(--text-muted); }\n\n    /* ── Action buttons ── */\n    .action-buttons { display: flex; flex-direction: column; gap: 8px; }\n\n    /* ── Verdict summary ── */\n    .verdict-box {\n      background: var(--negative-bg);\n      border: 1px solid var(--negative-border);\n      border-radius: var(--radius);\n      padding: 14px;\n    }\n    .verdict-box.positive-verdict {\n      background: var(--positive-bg);\n      border-color: var(--positive-border);\n    }\n    .verdict-box-title { font-size: 11px; font-weight: 600; color: var(--negative); margin-bottom: 8px; }\n    .verdict-box.positive-verdict .verdict-box-title { color: var(--positive); }\n    .verdict-box-text { font-size: 12px; color: var(--text-secondary); line-height: 1.7; }\n\n    /* Confidence stars */\n    .confidence-stars { display: flex; gap: 3px; }\n    .star { font-size: 13px; color: var(--neutral); }\n    .star.empty { color: var(--border-light); }\n  ";
const pageScripts = "\nfunction applyTheme(t){const r=document.documentElement;if(t==='light'){r.classList.add('theme-light');r.classList.remove('theme-dark');r.setAttribute('data-theme','light');const b=document.getElementById('themeBtn');if(b)b.textContent='☀️';}else{r.classList.remove('theme-light');r.classList.add('theme-dark');r.setAttribute('data-theme','dark');const b=document.getElementById('themeBtn');if(b)b.textContent='🌙';}localStorage.setItem('theme',t);}\nfunction toggleTheme(){const c=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');applyTheme(c==='dark'?'light':'dark');}\n(function(){const s=localStorage.getItem('theme');if(s)applyTheme(s);else if(window.matchMedia('(prefers-color-scheme: light)').matches)applyTheme('light');})();\n";

export default function NewsDetail() {
  useLegacyPage({ title: "뉴스 상세 분석 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

  return (
    <>
      <div className="app-layout">
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
        <main className="main-content">
          <div className="page-header-bar">
            <a href="news.html" className="back-btn">
              ← 뉴스 피드
            </a>
            <span className="breadcrumb-sep">
              /
            </span>
            <a href="stock-detail.html" className="back-btn">
              삼성전자
            </a>
            <span className="breadcrumb-sep">
              /
            </span>
            <span className="breadcrumb-current">
              뉴스 상세
            </span>
          </div>
          <div className="news-detail-layout">
            <div>
              <div className="article-card">
                <div className="article-verdict-bar"></div>
                <div className="article-header">
                  <div className="article-type-row">
                    <span className="chip chip-negative">
                      ⚠️ 악재
                    </span>
                    <span className="chip" style={{"background": "rgba(248,113,113,.08)", "color": "#f87171", "border": "1px solid rgba(248,113,113,.2)", "fontSize": "11px", "padding": "2px 8px"}}>
                      ⚡ 급락 트리거 분석
                    </span>
                    <span className="chip chip-accent" style={{"marginLeft": "auto"}}>
                      AI 분석 완료
                    </span>
                  </div>
                  <h1 className="article-headline">
                    
              삼성전자 HBM3E 엔비디아 납품 또 지연… "수율 개선 난항, 3분기로 밀릴 수도"
            
                  </h1>
                  <div className="article-meta-row">
                    <div className="meta-item">
                      <span className="label">
                        출처
                      </span>
                      <span className="val">
                        한국경제
                      </span>
                    </div>
                    <div className="meta-sep"></div>
                    <div className="meta-item">
                      <span className="label">
                        발행
                      </span>
                      <span className="val" style={{"fontFamily": "'DM Mono',monospace"}}>
                        2025.03.18 14:18
                      </span>
                    </div>
                    <div className="meta-sep"></div>
                    <div className="meta-item">
                      <span className="label">
                        수집
                      </span>
                      <span className="val" style={{"fontFamily": "'DM Mono',monospace"}}>
                        14:19 (+1분)
                      </span>
                    </div>
                    <div className="meta-sep"></div>
                    <div className="meta-item">
                      <span>
                        📎 삼성전자
                      </span>
                    </div>
                  </div>
                </div>
                <div className="impact-hero">
                  <div className="impact-score-big">
                    <div className="impact-score-num">
                      87
                    </div>
                    <div className="impact-score-label">
                      영향력
                    </div>
                  </div>
                  <div className="impact-details">
                    <div className="impact-details-title">
                      🤖 AI 영향력 분석
                    </div>
                    <div style={{"fontSize": "12.5px", "color": "var(--text-secondary)", "lineHeight": "1.65", "marginTop": "8px"}}>
                      
                이 뉴스는 삼성전자 주가에 
                      <strong style={{"color": "var(--negative)"}}>
                        부정적 영향
                      </strong>
                      을 미칠 가능성이 높습니다. HBM3E 납품 지연 우려가 단기 실적에 직접적 영향을 줄 수 있으며, 추가 확인이 필요합니다.
              
                    </div>
                    <div style={{"marginTop": "12px", "display": "flex", "alignItems": "center", "gap": "8px"}}>
                      <div style={{"flex": "1", "height": "6px", "background": "var(--border)", "borderRadius": "4px", "overflow": "hidden"}}>
                        <div style={{"height": "100%", "width": "87%", "background": "var(--negative)", "borderRadius": "4px"}}></div>
                      </div>
                      <span style={{"fontFamily": "'DM Mono',monospace", "fontSize": "12px", "fontWeight": "700", "color": "var(--negative)"}}>
                        87 / 100
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="analysis-section">
              <div className="section-head">
                <span className="section-head-icon">
                  🤖
                </span>
                <div className="section-head-title">
                  AI 뉴스 분석
                </div>
                <span className="section-head-badge">
                  GPT-4o 분석
                </span>
              </div>
              <div className="ai-analysis-body">
                <p>
                  
                이 뉴스는 삼성전자의 
                  <strong>
                    HBM3E(High Bandwidth Memory 3E)
                  </strong>
                   제품이 엔비디아에 대한 납품 일정이
                기존 2분기에서 
                  <span className="highlight-neg">
                    3분기로 지연
                  </span>
                  될 수 있다는 내용을 담고 있습니다.
                수율(良品率) 개선이 당초 계획보다 더디게 진행되고 있는 것으로 알려졌습니다.
              
                </p>
                <p>
                  
                HBM3E는 삼성전자 DS(디바이스솔루션) 부문의 핵심 성장 제품으로,
                
                  <strong>
                    엔비디아 H200·B200 GPU에 탑재
                  </strong>
                  되어 연간 수조 원의 매출이 기대되는 품목입니다.
                납품 지연이 현실화될 경우 
                  <span className="highlight-neg">
                    2025년 2분기 실적에 직접적 타격
                  </span>
                  이 불가피하며,
                경쟁사 SK하이닉스가 HBM3E 공급 주도권을 강화할 가능성이 높아집니다.
              
                </p>
                <p>
                  
                시장은 이 보도에 즉각 반응하여 삼성전자 주가가 발행 후 10분 내 
                  <span className="highlight-neg">
                    −0.8% 추가 하락
                  </span>
                  했습니다.
                외신(로이터, 블룸버그)이 동일 이슈를 반복 보도하며 글로벌 투자자들의 주목도가 높아지고 있어,
                단기 매도 심리는 더욱 강해질 것으로 판단됩니다.
              
                </p>
              </div>
            </div>
            <div className="analysis-section">
              <div className="section-head">
                <span className="section-head-icon">
                  📍
                </span>
                <div className="section-head-title">
                  핵심 포인트
                </div>
              </div>
              <div className="key-points">
                <div className="key-point">
                  <span className="kp-icon">
                    🔴
                  </span>
                  <div className="kp-text">
                    <strong>
                      납품 지연 리스크:
                    </strong>
                     HBM3E 수율 85% 이하 유지 시 엔비디아와의 공급 계약 조건 미달 가능성. 대체 공급사(SK하이닉스, 마이크론) 선호도 상승.
                  </div>
                </div>
                <div className="key-point">
                  <span className="kp-icon">
                    🔴
                  </span>
                  <div className="kp-text">
                    <strong>
                      실적 하향 리스크:
                    </strong>
                     2025년 DS 부문 영업이익 컨센서스 기준 ~4.2조 원 규모가 불확실해짐. 증권사 일부 TP 하향 예상.
                  </div>
                </div>
                <div className="key-point">
                  <span className="kp-icon">
                    🟡
                  </span>
                  <div className="kp-text">
                    <strong>
                      경쟁사 수혜 가능:
                    </strong>
                     SK하이닉스는 HBM3 공급에서 앞선 만큼 이번 이슈로 반사 이익 기대. 단기 수급 차별화 예상.
                  </div>
                </div>
                <div className="key-point">
                  <span className="kp-icon">
                    🟢
                  </span>
                  <div className="kp-text">
                    <strong>
                      중장기 관점 유효:
                    </strong>
                     삼성전자의 파운드리 + 메모리 수직 계열화 강점은 유효. 3Q25 납품 정상화 시 주가 반등 여력 존재.
                  </div>
                </div>
              </div>
            </div>
            <div className="analysis-section">
              <div className="section-head">
                <span className="section-head-icon">
                  📊
                </span>
                <div className="section-head-title">
                  연관 종목 영향 분석
                </div>
              </div>
              <div className="affected-stocks">
                <div className="affected-stock-row">
                  <span className="aff-icon">
                    📱
                  </span>
                  <div className="aff-info">
                    <div className="aff-name">
                      삼성전자 (005930)
                    </div>
                    <div className="aff-reason">
                      뉴스 주체 — 직접적 실적 영향
                    </div>
                  </div>
                  <span className="aff-impact neg">
                    직접 악재 ↓↓
                  </span>
                </div>
                <div className="affected-stock-row">
                  <span className="aff-icon">
                    💾
                  </span>
                  <div className="aff-info">
                    <div className="aff-name">
                      SK하이닉스 (000660)
                    </div>
                    <div className="aff-reason">
                      HBM 시장 경쟁사 — 반사 수혜 예상
                    </div>
                  </div>
                  <span className="aff-impact pos">
                    반사 호재 ↑
                  </span>
                </div>
                <div className="affected-stock-row">
                  <span className="aff-icon">
                    🖥️
                  </span>
                  <div className="aff-info">
                    <div className="aff-name">
                      NVIDIA (NVDA)
                    </div>
                    <div className="aff-reason">
                      주요 고객사 — 공급망 불안이나 대체 가능
                    </div>
                  </div>
                  <span className="aff-impact neutral">
                    중립 →
                  </span>
                </div>
                <div className="affected-stock-row">
                  <span className="aff-icon">
                    📡
                  </span>
                  <div className="aff-info">
                    <div className="aff-name">
                      한미반도체 (042700)
                    </div>
                    <div className="aff-reason">
                      HBM 후공정 장비 — HBM 생산 차질로 수요 감소 우려
                    </div>
                  </div>
                  <span className="aff-impact neg">
                    간접 악재 ↓
                  </span>
                </div>
              </div>
            </div>
            <div className="original-article-box">
              <div className="oab-header">
                <div className="oab-title">
                  원문 기사
                </div>
                <div className="oab-source">
                  한국경제 · 2025.03.18 14:18
                </div>
              </div>
              <div className="oab-body">
                
              삼성전자가 엔비디아에 공급하기로 한 HBM3E(5세대 고대역폭메모리) 납품이 또다시 지연될 수 있다는 관측이
              나오고 있다. 당초 2분기 납품을 목표로 하고 있었지만 수율 개선이 여전히 어려움을 겪고 있어 일정이
              3분기로 밀릴 수 있다는 우려가 업계에서 제기되고 있다. 
                <br />
                <br />
                
              반도체 업계에 따르면 삼성전자는 현재 HBM3E 양산 수율이 목표치에 미치지 못하는 상황이다.
              엔비디아가 요구하는 품질 기준을 맞추기 위해 공정 개선 작업이 진행 중이지만 당초 예상보다
              시간이 더 걸리고 있는 것으로 알려졌다...
            
              </div>
              <div className="oab-more">
                <a href="#" className="btn btn-ghost btn-sm" onClick={(event) => { alert('외부 원문 링크로 이동합니다.'); }}>
                  원문 전체 보기 →
                </a>
              </div>
            </div>
            <div style={{"padding": "16px 28px 24px"}}></div>
          </div>
        </main>
      </div>
      

    </>
  );
}
