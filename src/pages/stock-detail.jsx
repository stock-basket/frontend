import { useLegacyPage } from '../hooks/useLegacyPage.js';

const pageStyles = "\n.layout { display: flex; min-height: 100vh; }\n.sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; }\n.sidebar-logo { padding: 22px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }\n.sidebar-nav { flex: 1; padding: 14px 12px; overflow-y: auto; }\n.nav-section { font-size: 9px; font-family: 'DM Mono', monospace; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); padding: 10px 8px 5px; margin-top: 8px; }\n.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; margin-bottom: 2px; position: relative; }\n.nav-item:hover { background: var(--card); color: var(--text-primary); }\n.nav-item.active { background: var(--accent-bg); color: var(--accent); }\n.nav-item.active::before { content: ''; position: absolute; left: 0; top: 5px; bottom: 5px; width: 3px; background: var(--accent); border-radius: 0 2px 2px 0; }\n.nav-badge { margin-left: auto; background: var(--negative); color: #fff; font-size: 9px; font-weight: 700; padding: 1px 6px; border-radius: 20px; }\n.sidebar-bottom { padding: 12px; border-top: 1px solid var(--border); }\n.user-card { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 6px; cursor: pointer; transition: background 0.15s; }\n.user-card:hover { background: var(--card); }\n.user-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; }\n.user-name { font-size: 12.5px; font-weight: 600; }\n.user-plan { font-size: 9.5px; color: var(--accent); font-family: 'DM Mono', monospace; }\n\n.main { margin-left: var(--sidebar-w); flex: 1; min-height: 100vh; }\n\n/* ── Stock Hero ── */\n.stock-hero {\n  background: var(--surface); border-bottom: 1px solid var(--border);\n  padding: 22px 32px;\n  display: flex; align-items: center; justify-content: space-between; gap: 20px;\n}\n.stock-hero-left { display: flex; align-items: center; gap: 16px; }\n.stock-avatar {\n  width: 50px; height: 50px;\n  background: linear-gradient(135deg, #1d2d50, #2a3f6f);\n  border-radius: 12px; display: flex; align-items: center; justify-content: center;\n  font-size: 20px; border: 1px solid var(--border-light); flex-shrink: 0;\n}\n.stock-hero-info h1 { font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }\n.stock-meta { display: flex; align-items: center; gap: 8px; margin-top: 3px; }\n.stock-ticker { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-muted); background: var(--card); padding: 2px 7px; border-radius: 4px; border: 1px solid var(--border); }\n.stock-summary-short { font-size: 12px; color: var(--text-secondary); }\n\n.stock-hero-right { display: flex; align-items: center; gap: 20px; }\n.price-block { text-align: right; }\n.price-main { font-family: 'DM Mono', monospace; font-size: 26px; font-weight: 500; }\n.price-change { font-family: 'DM Mono', monospace; font-size: 13px; margin-top: 1px; }\n.price-change.up { color: var(--positive); }\n.price-change.down { color: var(--negative); }\n.price-time { font-size: 10.5px; color: var(--text-muted); margin-top: 2px; }\n.hero-actions { display: flex; gap: 8px; }\n.btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; font-family: 'Noto Sans KR', sans-serif; }\n.btn-primary { background: var(--accent); color: #fff; }\n.btn-primary:hover { background: var(--accent-hover); }\n.btn-ghost { background: transparent; color: var(--text-secondary); border: 1px solid var(--border); }\n.btn-ghost:hover { background: var(--card); color: var(--text-primary); }\n.btn-danger { background: transparent; color: var(--negative); border: 1px solid var(--negative-border); }\n.btn-danger:hover { background: var(--negative-bg); }\n.btn-sm { padding: 5px 10px; font-size: 11.5px; }\n\n.theme-btn { width: 32px; height: 32px; border-radius: 6px; background: transparent; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; transition: all 0.15s; }\n.theme-btn:hover { background: var(--card); color: var(--text-primary); }\n\n/* ── Alert Banner ── */\n.alert-banner {\n  background: var(--negative-bg); border-bottom: 1px solid var(--negative-border);\n  padding: 10px 32px; display: flex; align-items: center; gap: 10px; font-size: 12.5px;\n}\n.alert-banner .alert-icon { color: var(--negative); font-size: 14px; }\n.alert-banner .alert-text { flex: 1; color: var(--text-primary); }\n.alert-count { font-family: 'DM Mono', monospace; font-size: 10px; color: var(--text-muted); margin-left: auto; }\n\n/* ── Tabs ── */\n.detail-tabs {\n  display: flex; border-bottom: 1px solid var(--border);\n  background: var(--surface); padding: 0 32px; position: sticky; top: 0; z-index: 40;\n}\n.detail-tab {\n  padding: 13px 18px; font-size: 13px; font-weight: 500; color: var(--text-muted);\n  border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s; white-space: nowrap;\n}\n.detail-tab:hover { color: var(--text-primary); }\n.detail-tab.active { color: var(--accent); border-bottom-color: var(--accent); }\n\n/* ── Tab Content ── */\n.tab-content { display: none; }\n.tab-content.active { display: block; }\n\n/* ── Main body grid ── */\n.detail-body {\n  padding: 24px 32px;\n  display: grid;\n  grid-template-columns: 1fr 300px;\n  gap: 20px;\n  align-items: start;\n}\n\n/* ── Stats row ── */\n.stats-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 20px; }\n.stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 15px 16px; }\n.stat-label { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; font-family: 'DM Mono', monospace; }\n.stat-value { font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500; color: var(--text-primary); }\n.stat-sub { font-size: 11px; color: var(--text-muted); margin-top: 2px; }\n\n/* ── AI Summary Card ── */\n.ai-summary-card {\n  background: linear-gradient(135deg, rgba(248,113,113,0.05), rgba(248,113,113,0.02));\n  border: 1px solid var(--negative-border);\n  border-radius: 10px; padding: 18px; margin-bottom: 18px;\n}\n.ai-summary-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }\n.ai-badge { background: var(--accent-bg); color: var(--accent); font-size: 9px; font-weight: 700; padding: 2px 7px; border-radius: 4px; font-family: 'DM Mono', monospace; }\n.ai-summary-title { font-size: 13px; font-weight: 700; color: var(--text-primary); }\n.ai-summary-text { font-size: 12.5px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 12px; }\n.ai-score-bar { display: flex; align-items: center; gap: 10px; }\n.ai-score-bar .bar { flex: 1; height: 6px; border-radius: 4px; background: var(--border); overflow: hidden; }\n.ai-score-bar .fill { height: 100%; border-radius: 4px; }\n.ai-score-num { font-family: 'DM Mono', monospace; font-size: 12px; font-weight: 700; min-width: 52px; text-align: right; }\n\n/* ── Chart Card ── */\n.chart-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 18px; margin-bottom: 18px; }\n.chart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }\n.chart-title { font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); }\n.period-tabs { display: flex; gap: 3px; }\n.period-tab {\n  padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 600;\n  cursor: pointer; color: var(--text-muted); border: 1px solid var(--border);\n  background: var(--surface); transition: all 0.15s; font-family: 'DM Mono', monospace;\n}\n.period-tab.active { background: var(--accent-bg); color: var(--accent); border-color: rgba(129,140,248,0.3); }\n.period-tab:hover:not(.active) { background: var(--card); color: var(--text-secondary); }\n\n.custom-date-row { display: flex; align-items: center; gap: 8px; margin-top: 10px; display: none; }\n.custom-date-row.show { display: flex; }\n.date-input { background: var(--surface); border: 1px solid var(--border); border-radius: 5px; color: var(--text-primary); font-family: 'DM Mono', monospace; font-size: 12px; padding: 5px 10px; outline: none; transition: border-color 0.15s; }\n.date-input:focus { border-color: var(--accent); }\n\n#chartCanvas { width: 100%; display: block; cursor: crosshair; }\n\n.chart-legend { display: flex; align-items: center; gap: 16px; margin-top: 10px; font-size: 11px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 4px; }\n\n/* News tooltip on chart */\n#chartTooltip {\n  position: fixed; z-index: 200;\n  background: var(--surface); border: 1px solid var(--border);\n  border-radius: 8px; padding: 12px 14px;\n  font-size: 12px; max-width: 260px;\n  pointer-events: none; display: none;\n  box-shadow: var(--shadow);\n}\n.tooltip-title { font-weight: 700; margin-bottom: 4px; font-size: 12.5px; }\n.tooltip-chip { display: inline-flex; align-items: center; gap: 3px; padding: 2px 7px; border-radius: 20px; font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace; margin-bottom: 6px; }\n.tooltip-text { color: var(--text-secondary); line-height: 1.5; font-size: 11.5px; }\n.tooltip-score { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-muted); margin-top: 6px; }\n\n/* ── News Timeline ── */\n.news-timeline { display: flex; flex-direction: column; gap: 8px; }\n.news-filter-row { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; flex-wrap: wrap; }\n.nf-tab { padding: 5px 12px; border-radius: 20px; font-size: 11.5px; font-weight: 600; cursor: pointer; color: var(--text-muted); border: 1px solid var(--border); background: var(--surface); transition: all 0.15s; }\n.nf-tab.active { background: var(--card); color: var(--text-primary); border-color: var(--border-light); }\n.nf-tab.good.active { background: var(--positive-bg); color: var(--positive); border-color: var(--positive-border); }\n.nf-tab.bad.active { background: var(--negative-bg); color: var(--negative); border-color: var(--negative-border); }\n\n.news-item {\n  background: var(--card); border: 1px solid var(--border); border-radius: 8px;\n  padding: 14px 16px; display: flex; gap: 12px;\n  border-left: 3px solid transparent; cursor: pointer; transition: all 0.15s;\n}\n.news-item:hover { background: var(--card-hover); transform: translateX(2px); }\n.news-item.good { border-left-color: var(--positive); }\n.news-item.bad { border-left-color: var(--negative); }\n.news-item.mid { border-left-color: var(--neutral); }\n.news-score-circle {\n  width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;\n  display: flex; flex-direction: column; align-items: center; justify-content: center;\n  font-family: 'DM Mono', monospace;\n}\n.news-score-circle.good { background: var(--positive-bg); border: 1.5px solid var(--positive-border); }\n.news-score-circle.bad { background: var(--negative-bg); border: 1.5px solid var(--negative-border); }\n.news-score-circle.mid { background: var(--neutral-bg); border: 1.5px solid var(--neutral-border); }\n.news-score-num { font-size: 13px; font-weight: 700; line-height: 1; }\n.news-score-circle.good .news-score-num { color: var(--positive); }\n.news-score-circle.bad .news-score-num { color: var(--negative); }\n.news-score-circle.mid .news-score-num { color: var(--neutral); }\n.news-item-body { flex: 1; min-width: 0; }\n.news-item-meta { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; flex-wrap: wrap; }\n.news-item-title { font-size: 13.5px; font-weight: 600; line-height: 1.4; margin-bottom: 4px; }\n.news-item-excerpt { font-size: 11.5px; color: var(--text-secondary); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }\n.chip { display: inline-flex; align-items: center; gap: 3px; padding: 2px 7px; border-radius: 20px; font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace; }\n.chip-good { background: var(--positive-bg); color: var(--positive); border: 1px solid var(--positive-border); }\n.chip-bad { background: var(--negative-bg); color: var(--negative); border: 1px solid var(--negative-border); }\n.chip-mid { background: var(--neutral-bg); color: var(--neutral); border: 1px solid var(--neutral-border); }\n.chip-urgent { background: rgba(248,113,113,0.18); color: var(--negative); border: 1px solid var(--negative); }\n.chip-gray { background: var(--surface); color: var(--text-muted); border: 1px solid var(--border); }\n.news-time { font-size: 10px; color: var(--text-muted); font-family: 'DM Mono', monospace; margin-left: auto; white-space: nowrap; }\n\n/* ── Right Column ── */\n.right-col { display: flex; flex-direction: column; gap: 14px; }\n.widget { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }\n.widget-title { font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 12px; }\n\n/* Donut chart */\n.donut-wrap { display: flex; align-items: center; gap: 14px; }\n.donut-chart { width: 72px; height: 72px; flex-shrink: 0; }\n.donut-legend { display: flex; flex-direction: column; gap: 6px; flex: 1; }\n.donut-item { display: flex; align-items: center; gap: 7px; font-size: 12px; }\n.donut-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }\n.donut-label { flex: 1; color: var(--text-secondary); }\n.donut-val { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-primary); font-weight: 600; }\n\n/* Alert settings */\n.alert-setting-item { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--border); }\n.alert-setting-item:last-child { border-bottom: none; }\n.alert-setting-label { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--text-secondary); }\n.toggle { width: 34px; height: 18px; background: var(--border-light); border-radius: 20px; position: relative; transition: background 0.2s; flex-shrink: 0; cursor: pointer; border: none; }\n.toggle::after { content: ''; position: absolute; width: 12px; height: 12px; border-radius: 50%; background: #fff; top: 3px; left: 3px; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }\n.toggle.on { background: var(--accent); }\n.toggle.on::after { transform: translateX(16px); }\n\n/* Basket mini list */\n.basket-mini-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--border); cursor: pointer; }\n.basket-mini-item:last-child { border-bottom: none; }\n.basket-mini-item:hover .bm-name { color: var(--accent); }\n.bm-logo { width: 28px; height: 28px; border-radius: 6px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; }\n.bm-name { font-size: 12.5px; font-weight: 600; flex: 1; transition: color 0.15s; }\n.bm-price-col { text-align: right; }\n.bm-price { font-size: 12px; font-family: 'DM Mono', monospace; font-weight: 600; }\n.bm-change { font-size: 10px; font-family: 'DM Mono', monospace; }\n\n/* Crawl schedule */\n.crawl-item { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--border); }\n.crawl-item:last-child { border-bottom: none; }\n.crawl-time { font-size: 11px; font-family: 'DM Mono', monospace; color: var(--text-secondary); min-width: 44px; }\n.crawl-label { font-size: 12px; color: var(--text-secondary); flex: 1; }\n.crawl-status { font-size: 10px; font-family: 'DM Mono', monospace; }\n.crawl-status.done { color: var(--positive); }\n.crawl-status.pending { color: var(--text-muted); }\n.crawl-status.live { color: var(--negative); }\n@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.3} }\n.pulse { animation: pulse 1.2s infinite; }\n\n/* ── Company Info Tab ── */\n.company-hero {\n  background: var(--card); border: 1px solid var(--border); border-radius: 10px;\n  padding: 20px; margin-bottom: 18px;\n}\n.company-tagline { font-size: 15px; font-weight: 700; color: var(--text-primary); line-height: 1.5; margin-bottom: 14px; }\n.company-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.75; margin-bottom: 16px; }\n.company-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }\n.cs-item { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 12px 14px; }\n.cs-label { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px; font-family: 'DM Mono', monospace; }\n.cs-value { font-size: 14px; font-weight: 700; font-family: 'DM Mono', monospace; color: var(--text-primary); }\n.cs-sub { font-size: 10.5px; color: var(--text-muted); margin-top: 2px; }\n\n/* ── 급등락 기록 Tab ── */\n.spike-item { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; display: flex; align-items: center; gap: 14px; }\n.spike-date { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-muted); min-width: 64px; }\n.spike-change { font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 700; min-width: 72px; }\n.spike-change.up { color: var(--positive); }\n.spike-change.down { color: var(--negative); }\n.spike-cause { flex: 1; font-size: 12.5px; color: var(--text-secondary); line-height: 1.5; }\n";
const pageScripts = "\n// ── Tab switching ──\nfunction switchTab(id, el) {\n  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));\n  document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));\n  document.getElementById('tab-' + id).classList.add('active');\n  el.classList.add('active');\n}\n\nfunction setNewsFilter(f, el) {\n  document.querySelectorAll('.nf-tab').forEach(t => t.classList.remove('active'));\n  el.classList.add('active');\n}\n\n// ── Period ──\nfunction setPeriod(p, el) {\n  document.querySelectorAll('.period-tab').forEach(t => t.classList.remove('active'));\n  el.classList.add('active');\n  const row = document.getElementById('customDateRow');\n  if (p === 'custom') { row.classList.add('show'); }\n  else { row.classList.remove('show'); drawChart(p); }\n}\nfunction loadCustomChart() {\n  const from = document.getElementById('dateFrom').value;\n  const to = document.getElementById('dateTo').value;\n  drawChart('custom', from, to);\n}\n\n// ── Candlestick Chart ──\nconst newsEvents = [\n  { idx: 3, type: 'bad', score: 87, title: 'HBM3E 납품 재지연', excerpt: '수율 문제로 엔비디아 납품 밀릴 가능성. 단기 주가 하락 압력.' },\n  { idx: 6, type: 'good', score: 92, title: 'HBM4 계약 임박', excerpt: '엔비디아와 HBM4 계약 10조원 규모. 장기 호재.' },\n  { idx: 10, type: 'bad', score: 73, title: 'D램 ASP 하락 지속', excerpt: '4분기 연속 D램 가격 하락. 삼성·마이크론 매출 타격.' },\n  { idx: 14, type: 'good', score: 68, title: 'AI 서버 DRAM 수요 증가', excerpt: 'AI 인프라 확대로 고대역폭 메모리 수요 급증 전망.' },\n];\n\nfunction generateCandles(count) {\n  let price = 73500;\n  const candles = [];\n  for (let i = 0; i < count; i++) {\n    const open = price;\n    const change = (Math.random() - 0.48) * 1400;\n    const close = open + change;\n    const high = Math.max(open, close) + Math.random() * 500;\n    const low = Math.min(open, close) - Math.random() * 500;\n    candles.push({ open, high, low, close });\n    price = close;\n  }\n  return candles;\n}\n\nlet currentCandles = [];\nlet chartWidth = 0, chartHeight = 0;\nlet canvasEl, ctx;\n\nfunction drawChart(period) {\n  if (!canvasEl) {\n    canvasEl = document.getElementById('chartCanvas');\n    ctx = canvasEl.getContext('2d');\n  }\n  const container = canvasEl.parentElement;\n  const dpr = window.devicePixelRatio || 1;\n  chartWidth = container.clientWidth - 36;\n  chartHeight = 260;\n  canvasEl.width = chartWidth * dpr;\n  canvasEl.height = chartHeight * dpr;\n  canvasEl.style.width = chartWidth + 'px';\n  canvasEl.style.height = chartHeight + 'px';\n  ctx.scale(dpr, dpr);\n\n  let candleCount = { '1d': 32, '1w': 30, '1m': 30, '3m': 90, 'custom': 45 }[period] || 30;\n  currentCandles = generateCandles(candleCount);\n\n  const isDark = !document.documentElement.classList.contains('theme-light') &&\n    document.documentElement.getAttribute('data-theme') !== 'light' &&\n    !window.matchMedia('(prefers-color-scheme: light)').matches;\n\n  const colors = {\n    bg: isDark ? '#1e2235' : '#ffffff',\n    grid: isDark ? 'rgba(42,46,69,0.8)' : 'rgba(200,210,230,0.6)',\n    text: isDark ? '#555d7a' : '#9099b5',\n    up: '#34d399', down: '#f87171',\n    upFill: isDark ? '#34d399' : '#059669',\n    downFill: isDark ? '#f87171' : '#dc2626',\n  };\n\n  const padL = 50, padR = 16, padT = 16, padB = 36;\n  const w = chartWidth - padL - padR;\n  const h = chartHeight - padT - padB;\n\n  // Find price range\n  const allPrices = currentCandles.flatMap(c => [c.high, c.low]);\n  const minP = Math.min(...allPrices) - 300;\n  const maxP = Math.max(...allPrices) + 300;\n  const range = maxP - minP;\n\n  const toY = p => padT + h - ((p - minP) / range) * h;\n  const candleW = Math.max(3, Math.floor(w / candleCount) - 2);\n  const spacing = w / candleCount;\n\n  ctx.clearRect(0, 0, chartWidth, chartHeight);\n\n  // Grid lines\n  ctx.strokeStyle = colors.grid;\n  ctx.lineWidth = 0.5;\n  for (let i = 0; i <= 5; i++) {\n    const y = padT + (h / 5) * i;\n    ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + w, y); ctx.stroke();\n    const label = Math.round(maxP - (range / 5) * i);\n    ctx.fillStyle = colors.text;\n    ctx.font = '10px DM Mono, monospace';\n    ctx.textAlign = 'right';\n    ctx.fillText(label.toLocaleString(), padL - 4, y + 3);\n  }\n\n  // News event backgrounds\n  newsEvents.forEach(ev => {\n    if (ev.idx >= currentCandles.length) return;\n    const x = padL + ev.idx * spacing + spacing / 2;\n    const color = ev.type === 'good' ? 'rgba(52,211,153,0.08)' : 'rgba(248,113,113,0.08)';\n    ctx.fillStyle = color;\n    ctx.fillRect(x - spacing * 0.6, padT, spacing * 1.2, h);\n  });\n\n  // Draw candles\n  currentCandles.forEach((c, i) => {\n    const x = padL + i * spacing + spacing / 2;\n    const isUp = c.close >= c.open;\n    const color = isUp ? colors.upFill : colors.downFill;\n\n    // Wick\n    ctx.strokeStyle = color;\n    ctx.lineWidth = 1;\n    ctx.beginPath();\n    ctx.moveTo(x, toY(c.high));\n    ctx.lineTo(x, toY(c.low));\n    ctx.stroke();\n\n    // Body\n    const bodyTop = toY(Math.max(c.open, c.close));\n    const bodyBot = toY(Math.min(c.open, c.close));\n    const bodyH = Math.max(1, bodyBot - bodyTop);\n    ctx.fillStyle = color;\n    ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);\n\n    // Empty body for up candles (hollow style)\n    if (isUp && candleW > 3) {\n      ctx.fillStyle = colors.bg;\n      ctx.fillRect(x - candleW / 2 + 1, bodyTop + 1, candleW - 2, Math.max(1, bodyH - 2));\n      ctx.strokeStyle = color;\n      ctx.lineWidth = 1;\n      ctx.strokeRect(x - candleW / 2, bodyTop, candleW, bodyH);\n    }\n  });\n\n  // News event dots\n  newsEvents.forEach(ev => {\n    if (ev.idx >= currentCandles.length) return;\n    const c = currentCandles[ev.idx];\n    const x = padL + ev.idx * spacing + spacing / 2;\n    const y = toY(c.low) + 12;\n    const col = ev.type === 'good' ? colors.up : colors.down;\n    ctx.beginPath();\n    ctx.arc(x, y, 4, 0, Math.PI * 2);\n    ctx.fillStyle = col;\n    ctx.fill();\n    // Score label\n    ctx.fillStyle = col;\n    ctx.font = 'bold 9px DM Mono, monospace';\n    ctx.textAlign = 'center';\n    ctx.fillText(ev.score, x, y + 13);\n  });\n\n  // X axis labels\n  ctx.fillStyle = colors.text;\n  ctx.font = '10px DM Mono, monospace';\n  ctx.textAlign = 'center';\n  const step = Math.max(1, Math.floor(candleCount / 6));\n  for (let i = 0; i < candleCount; i += step) {\n    const x = padL + i * spacing + spacing / 2;\n    ctx.fillText('10/' + (10 - Math.floor((candleCount - i - 1) * 0.3)), x, padT + h + 18);\n  }\n}\n\n// Hover/click on chart\nlet tooltipEl;\nfunction getTooltip() {\n  if (!tooltipEl) tooltipEl = document.getElementById('chartTooltip');\n  return tooltipEl;\n}\n\ncanvasEl = document.getElementById('chartCanvas');\ncanvasEl.addEventListener('mousemove', function(e) {\n  if (!currentCandles.length) return;\n  const rect = canvasEl.getBoundingClientRect();\n  const x = e.clientX - rect.left;\n  const padL = 50, padR = 16;\n  const w = chartWidth - padL - padR;\n  const spacing = w / currentCandles.length;\n  const idx = Math.floor((x - padL) / spacing);\n\n  const ev = newsEvents.find(n => n.idx === idx);\n  const tt = getTooltip();\n  if (ev && idx >= 0 && idx < currentCandles.length) {\n    const chipCol = ev.type === 'good' ? 'background:var(--positive-bg);color:var(--positive);border:1px solid var(--positive-border)' :\n      'background:var(--negative-bg);color:var(--negative);border:1px solid var(--negative-border)';\n    document.getElementById('ttTitle').textContent = ev.title;\n    document.getElementById('ttChip').innerHTML = `<span class=\"tooltip-chip\" style=\"${chipCol}\">${ev.type === 'good' ? '호재' : '악재'}</span>`;\n    document.getElementById('ttText').textContent = ev.excerpt;\n    document.getElementById('ttScore').textContent = '영향력 점수: ' + ev.score;\n    tt.style.display = 'block';\n    tt.style.left = (e.clientX + 12) + 'px';\n    tt.style.top = (e.clientY - 20) + 'px';\n  } else {\n    tt.style.display = 'none';\n  }\n});\n\ncanvasEl.addEventListener('mouseleave', function() {\n  getTooltip().style.display = 'none';\n});\n\ncanvasEl.addEventListener('click', function(e) {\n  const rect = canvasEl.getBoundingClientRect();\n  const x = e.clientX - rect.left;\n  const padL = 50, padR = 16;\n  const w = chartWidth - padL - padR;\n  const spacing = w / currentCandles.length;\n  const idx = Math.floor((x - padL) / spacing);\n  const ev = newsEvents.find(n => n.idx === idx);\n  if (ev) { location.href = 'news-detail.html'; }\n});\n\n// Theme\nfunction applyTheme(t) {\n  const r = document.documentElement;\n  if (t === 'light') {\n    r.classList.add('theme-light'); r.classList.remove('theme-dark');\n    r.setAttribute('data-theme', 'light');\n    document.getElementById('themeBtn').textContent = '☀️';\n  } else {\n    r.classList.remove('theme-light'); r.classList.add('theme-dark');\n    r.setAttribute('data-theme', 'dark');\n    document.getElementById('themeBtn').textContent = '🌙';\n  }\n  localStorage.setItem('theme', t);\n  setTimeout(() => drawChart(document.querySelector('.period-tab.active')?.textContent === '직접 입력' ? 'custom' : '1d'), 50);\n}\nfunction toggleTheme() {\n  const c = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n  applyTheme(c === 'dark' ? 'light' : 'dark');\n}\n(function() {\n  const s = localStorage.getItem('theme');\n  if (s) applyTheme(s);\n  else if (window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');\n  else document.getElementById('themeBtn').textContent = '🌙';\n  setTimeout(() => drawChart('1d'), 80);\n})();\n\nwindow.addEventListener('resize', () => drawChart('1d'));\n";

export default function StockDetail() {
  useLegacyPage({ title: "삼성전자 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

  return (
    <>
      <div id="chartTooltip">
        <div className="tooltip-title" id="ttTitle"></div>
        <div id="ttChip"></div>
        <div className="tooltip-text" id="ttText"></div>
        <div className="tooltip-score" id="ttScore"></div>
      </div>
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
          <div className="stock-hero">
            <div className="stock-hero-left">
              <div className="stock-avatar">
                💠
              </div>
              <div className="stock-hero-info">
                <h1>
                  삼성전자
                </h1>
                <div className="stock-meta">
                  <span className="stock-ticker">
                    005930
                  </span>
                  <span className="stock-ticker">
                    KOSPI
                  </span>
                  <span className="stock-summary-short">
                    반도체 · 전자제품 제조
                  </span>
                </div>
              </div>
            </div>
            <div className="stock-hero-right">
              <div className="price-block">
                <div className="price-main">
                  ₩72,400
                </div>
                <div className="price-change down">
                  ▼ 1,200 (-1.63%)
                </div>
                <div className="price-time">
                  2025.10.10 15:30 기준
                </div>
              </div>
              <div className="hero-actions">
                <button className="btn btn-primary btn-sm">
                  + 바구니 담기
                </button>
                <button className="btn btn-ghost btn-sm" onClick={(event) => { toggleTheme(); }} id="themeBtn" title="테마 전환" style={{"padding": "5px 8px"}}>
                  🌙
                </button>
              </div>
            </div>
          </div>
          <div className="alert-banner">
            <span className="alert-icon">
              ⚡
            </span>
            <span className="alert-text">
              <strong>
                급락 감지
              </strong>
               — 오늘 HBM 생산 차질 관련 악재 뉴스 3건 집중 발생. AI가 주가 하락 원인으로 분석 중입니다.
    
            </span>
            <span className="alert-count">
              1 / 22
            </span>
          </div>
          <div className="detail-tabs">
            <div className="detail-tab active" onClick={(event) => { switchTab('news', event.currentTarget); }}>
              📰 뉴스 분석
            </div>
            <div className="detail-tab" onClick={(event) => { switchTab('company', event.currentTarget); }}>
              🏢 기업 정보
            </div>
            <div className="detail-tab" onClick={(event) => { switchTab('spikes', event.currentTarget); }}>
              ⚡ 급등락 기록
            </div>
          </div>
          <div id="tab-news" className="tab-content active">
            <div className="detail-body">
              <div>
                <div className="stats-row">
                  <div className="stat-card">
                    <div className="stat-label">
                      오늘 수집 뉴스
                    </div>
                    <div className="stat-value" style={{"color": "var(--accent)"}}>
                      18건
                    </div>
                    <div className="stat-sub">
                      전일 대비 +3건
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">
                      호재
                    </div>
                    <div className="stat-value" style={{"color": "var(--positive)"}}>
                      5건
                    </div>
                    <div className="stat-sub">
                      평균 영향력 71
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">
                      악재
                    </div>
                    <div className="stat-value" style={{"color": "var(--negative)"}}>
                      11건
                    </div>
                    <div className="stat-sub">
                      ⚠ 평균 영향력 82
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">
                      AI 종합 점수
                    </div>
                    <div className="stat-value" style={{"color": "var(--negative)"}}>
                      38
                    </div>
                    <div className="stat-sub">
                      / 100 · 부정 우세
                    </div>
                  </div>
                </div>
                <div className="ai-summary-card">
                  <div className="ai-summary-header">
                    <span className="ai-badge">
                      AI 분석
                    </span>
                    <span className="ai-summary-title">
                      오늘의 삼성전자 종합 판단
                    </span>
                  </div>
                  <p className="ai-summary-text">
                    
            오늘 삼성전자 관련 뉴스에서 
                    <strong>
                      HBM3E 수율 문제
                    </strong>
                    와 
                    <strong>
                      엔비디아 납품 지연
                    </strong>
                     이슈가 반복적으로 언급되며 부정적 센티먼트가 우세합니다. 특히 오후 2시경 회의에서 발표된 "HBM 생산 차질" 보도가 주가 급락의 직접적 트리거로 분석됩니다.
          
                  </p>
                  <div className="ai-score-bar">
                    <span style={{"fontSize": "11px", "color": "var(--text-muted)", "fontFamily": "'DM Mono',monospace", "minWidth": "60px"}}>
                      악재 우세
                    </span>
                    <div className="bar">
                      <div className="fill" style={{"width": "38%", "background": "linear-gradient(90deg,var(--negative),var(--neutral))"}}></div>
                    </div>
                    <span className="ai-score-num" style={{"color": "var(--negative)"}}>
                      38 / 100
                    </span>
                  </div>
                </div>
                <div className="chart-card">
                  <div className="chart-header">
                    <div className="chart-title">
                      📈 가격 + 뉴스 영향력 오버레이
                    </div>
                    <div className="period-tabs">
                      <div className="period-tab active" onClick={(event) => { setPeriod('1d',event.currentTarget); }}>
                        1일
                      </div>
                      <div className="period-tab" onClick={(event) => { setPeriod('1w',event.currentTarget); }}>
                        1주
                      </div>
                      <div className="period-tab" onClick={(event) => { setPeriod('1m',event.currentTarget); }}>
                        1월
                      </div>
                      <div className="period-tab" onClick={(event) => { setPeriod('3m',event.currentTarget); }}>
                        3월
                      </div>
                      <div className="period-tab" onClick={(event) => { setPeriod('custom',event.currentTarget); }}>
                        직접 입력
                      </div>
                    </div>
                  </div>
                  <div className="custom-date-row" id="customDateRow">
                    <input type="date" className="date-input" id="dateFrom" defaultValue="2025-09-01" />
                    <span style={{"color": "var(--text-muted)", "fontSize": "12px"}}>
                      ~
                    </span>
                    <input type="date" className="date-input" id="dateTo" defaultValue="2025-10-10" />
                    <button className="btn btn-ghost btn-sm" onClick={(event) => { loadCustomChart(); }}>
                      적용
                    </button>
                  </div>
                  <canvas id="chartCanvas" height="260"></canvas>
                  <div className="chart-legend">
                    <span>
                      <span className="legend-dot" style={{"background": "var(--negative)"}}></span>
                      캔들 (하락)
                    </span>
                    <span>
                      <span className="legend-dot" style={{"background": "var(--positive)"}}></span>
                      캔들 (상승)
                    </span>
                    <span>
                      <span className="legend-dot" style={{"background": "var(--negative)", "opacity": "0.6"}}></span>
                      악재 이벤트
                    </span>
                    <span>
                      <span className="legend-dot" style={{"background": "var(--positive)", "opacity": "0.6"}}></span>
                      호재 이벤트
                    </span>
                    <span style={{"marginLeft": "auto", "color": "var(--text-muted)", "fontSize": "10px"}}>
                      클릭 또는 드래그로 해당 날짜 뉴스 확인
                    </span>
                  </div>
                </div>
                <div className="chart-card" style={{"paddingBottom": "8px"}}>
                  <div className="chart-header" style={{"marginBottom": "10px"}}>
                    <div className="chart-title">
                      📋 오늘의 뉴스 타임라인
                    </div>
                    <div style={{"fontSize": "11px", "color": "var(--text-muted)", "fontFamily": "'DM Mono',monospace"}}>
                      18건
                    </div>
                  </div>
                  <div className="news-filter-row">
                    <div className="nf-tab active" onClick={(event) => { setNewsFilter('all',event.currentTarget); }}>
                      전체 18
                    </div>
                    <div className="nf-tab good" onClick={(event) => { setNewsFilter('good',event.currentTarget); }}>
                      🟢 호재 5
                    </div>
                    <div className="nf-tab bad" onClick={(event) => { setNewsFilter('bad',event.currentTarget); }}>
                      🔴 악재 11
                    </div>
                    <div className="nf-tab" onClick={(event) => { setNewsFilter('mid',event.currentTarget); }}>
                      🟡 중립 2
                    </div>
                  </div>
                  <div className="news-timeline" id="newsTimeline">
                    <a href="news-detail.html" className="news-item bad">
                      <div className="news-score-circle bad">
                        <div className="news-score-num">
                          87
                        </div>
                      </div>
                      <div className="news-item-body">
                        <div className="news-item-meta">
                          <span className="chip chip-bad">
                            악재
                          </span>
                          <span className="chip chip-urgent">
                            ⚡ 급락 원인
                          </span>
                          <span className="chip chip-gray">
                            한국경제
                          </span>
                          <span className="news-time">
                            14:18
                          </span>
                        </div>
                        <div className="news-item-title">
                          삼성전자 HBM3E 엔비디아 납품 또 지연… "수율 개선 난항, 3분기로 밀릴 수도"
                        </div>
                        <div className="news-item-excerpt">
                          HBM3E 수율이 목표치에 미달해 엔비디아 납품이 재차 지연될 가능성. 경쟁사 SK하이닉스는 HBM3E 공급을 강화할 것으로 전망.
                        </div>
                      </div>
                    </a>
                    <a href="news-detail.html" className="news-item bad">
                      <div className="news-score-circle bad">
                        <div className="news-score-num">
                          73
                        </div>
                      </div>
                      <div className="news-item-body">
                        <div className="news-item-meta">
                          <span className="chip chip-bad">
                            악재
                          </span>
                          <span className="chip chip-gray">
                            매일경제
                          </span>
                          <span className="news-time">
                            13:40
                          </span>
                        </div>
                        <div className="news-item-title">
                          메모리 반도체 ASP, 4분기 연속 하락 전망… HBM 및 D램 전반 부진
                        </div>
                        <div className="news-item-excerpt">
                          D램 단가 하락이 지속돼 삼성전자·마이크론 매출부 타격, 2분기 이상 지속 가능성 제기.
                        </div>
                      </div>
                    </a>
                    <a href="news-detail.html" className="news-item good">
                      <div className="news-score-circle good">
                        <div className="news-score-num">
                          92
                        </div>
                      </div>
                      <div className="news-item-body">
                        <div className="news-item-meta">
                          <span className="chip chip-good">
                            호재
                          </span>
                          <span className="chip chip-gray">
                            전자신문
                          </span>
                          <span className="news-time">
                            10:22
                          </span>
                        </div>
                        <div className="news-item-title">
                          삼성전자, 엔비디아와 HBM4 공급 계약 체결 임박… 수주 규모 10조원 전망
                        </div>
                        <div className="news-item-excerpt">
                          반도체 업계에 따르면 삼성전자와 엔비디아 간 HBM4 납품 계약이 이달 내 체결 예정이며, 수주 규모가 업계 예상치를 크게 상회할 것으로 보인다.
                        </div>
                      </div>
                    </a>
                    <a href="news-detail.html" className="news-item mid">
                      <div className="news-score-circle mid">
                        <div className="news-score-num">
                          52
                        </div>
                      </div>
                      <div className="news-item-body">
                        <div className="news-item-meta">
                          <span className="chip chip-mid">
                            중립
                          </span>
                          <span className="chip chip-gray">
                            연합뉴스
                          </span>
                          <span className="news-time">
                            09:10
                          </span>
                        </div>
                        <div className="news-item-title">
                          삼성전자 3분기 실적 가이던스 발표 예정… 시장 예상치 부합 여부 주목
                        </div>
                        <div className="news-item-excerpt">
                          3분기 영업이익 시장 컨센서스는 약 10.5조원 수준. 가이던스에 따라 단기 주가 방향성 결정될 전망.
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="right-col">
                <div className="widget">
                  <div className="widget-title">
                    📊 오늘 뉴스 분포
                  </div>
                  <div className="donut-wrap">
                    <svg className="donut-chart" viewbox="0 0 72 72">
                      <circle cx="36" cy="36" r="28" fill="none" stroke="var(--border)" stroke-width="10"></circle>
                      <circle cx="36" cy="36" r="28" fill="none" stroke="var(--negative)" stroke-width="10" stroke-dasharray="107.5 68.1" stroke-dashoffset="0" stroke-linecap="butt" transform="rotate(-90 36 36)"></circle>
                      <circle cx="36" cy="36" r="28" fill="none" stroke="var(--positive)" stroke-width="10" stroke-dasharray="49.2 126.4" stroke-dashoffset="-107.5" stroke-linecap="butt" transform="rotate(-90 36 36)"></circle>
                      <circle cx="36" cy="36" r="28" fill="none" stroke="var(--neutral)" stroke-width="10" stroke-dasharray="19.4 156.2" stroke-dashoffset="-156.7" stroke-linecap="butt" transform="rotate(-90 36 36)"></circle>
                      <text x="36" y="40" text-anchor="middle" font-size="13" font-weight="700" font-family="'DM Mono',monospace" fill="var(--text-primary)">
                        61%
                      </text>
                    </svg>
                    <div className="donut-legend">
                      <div className="donut-item">
                        <div className="donut-dot" style={{"background": "var(--negative)"}}></div>
                        <span className="donut-label">
                          악재
                        </span>
                        <span className="donut-val">
                          11건 (61%)
                        </span>
                      </div>
                      <div className="donut-item">
                        <div className="donut-dot" style={{"background": "var(--positive)"}}></div>
                        <span className="donut-label">
                          호재
                        </span>
                        <span className="donut-val">
                          5건 (28%)
                        </span>
                      </div>
                      <div className="donut-item">
                        <div className="donut-dot" style={{"background": "var(--neutral)"}}></div>
                        <span className="donut-label">
                          중립
                        </span>
                        <span className="donut-val">
                          2건 (11%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="widget">
                  <div className="widget-title">
                    🔔 알림 설정
                  </div>
                  <div className="alert-setting-item">
                    <span className="alert-setting-label">
                      ⚡ 급등락 감지 알림
                    </span>
                    <button className="toggle on" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
                  </div>
                  <div className="alert-setting-item">
                    <span className="alert-setting-label">
                      🔴 고영향 악재 뉴스
                    </span>
                    <button className="toggle on" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
                  </div>
                  <div className="alert-setting-item">
                    <span className="alert-setting-label">
                      🟢 고영향 호재 뉴스
                    </span>
                    <button className="toggle" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
                  </div>
                </div>
                <div className="widget">
                  <div className="widget-title">
                    🧺 내 바구니
                  </div>
                  <div className="basket-mini-item" onClick={(event) => { location.href='stock-detail.html'; }}>
                    <div className="bm-logo">
                      💠
                    </div>
                    <div className="bm-name">
                      삼성전자
                    </div>
                    <div className="bm-price-col">
                      <div className="bm-price">
                        72,400
                      </div>
                      <div className="bm-change" style={{"color": "var(--negative)"}}>
                        ▼ -1.63%
                      </div>
                    </div>
                  </div>
                  <div className="basket-mini-item">
                    <div className="bm-logo">
                      📱
                    </div>
                    <div className="bm-name">
                      카카오
                    </div>
                    <div className="bm-price-col">
                      <div className="bm-price">
                        42,150
                      </div>
                      <div className="bm-change" style={{"color": "var(--negative)"}}>
                        ▼ -4.20%
                      </div>
                    </div>
                  </div>
                  <div className="basket-mini-item">
                    <div className="bm-logo">
                      🔷
                    </div>
                    <div className="bm-name">
                      SK하이닉스
                    </div>
                    <div className="bm-price-col">
                      <div className="bm-price">
                        192,500
                      </div>
                      <div className="bm-change" style={{"color": "var(--positive)"}}>
                        ▲ +3.11%
                      </div>
                    </div>
                  </div>
                  <div className="basket-mini-item">
                    <div className="bm-logo">
                      🟩
                    </div>
                    <div className="bm-name">
                      NAVER
                    </div>
                    <div className="bm-price-col">
                      <div className="bm-price">
                        214,000
                      </div>
                      <div className="bm-change" style={{"color": "var(--negative)"}}>
                        ▼ -0.23%
                      </div>
                    </div>
                  </div>
                  <a href="stocks.html" style={{"display": "block", "textAlign": "center", "marginTop": "10px", "fontSize": "11.5px", "color": "var(--accent)", "fontFamily": "'DM Mono',monospace"}}>
                    + 종목 추가하기
                  </a>
                </div>
                <div className="widget" style={{"background": "linear-gradient(135deg,rgba(129,140,248,0.07),var(--card))", "borderColor": "rgba(129,140,248,0.2)"}}>
                  <div className="widget-title" style={{"color": "var(--accent)"}}>
                    🤖 오늘 뉴스 요약
                  </div>
                  <p style={{"fontSize": "12px", "color": "var(--text-secondary)", "lineHeight": "1.7"}}>
                    
            삼성전자 오늘 뉴스 흐름은 
                    <strong style={{"color": "var(--negative)"}}>
                      악재 우세
                    </strong>
                    .
            HBM 납품 지연 이슈가 오전부터 부각되며 주가 하락 압력이 이어지고 있습니다.
            다만 HBM4 계약 체결 임박 뉴스가 호재로 작용, 낙폭을 일부 제한 중.
          
                  </p>
                </div>
                <div className="widget">
                  <div className="widget-title">
                    ⏱ 크롤링 스케줄
                  </div>
                  <div className="crawl-item">
                    <span className="crawl-time">
                      09:00
                    </span>
                    <span className="crawl-label">
                      장 시작 전 뉴스
                    </span>
                    <span className="crawl-status done">
                      ✓ 완료
                    </span>
                  </div>
                  <div className="crawl-item">
                    <span className="crawl-time">
                      11:00
                    </span>
                    <span className="crawl-label">
                      오전 주요 뉴스
                    </span>
                    <span className="crawl-status done">
                      ✓ 완료
                    </span>
                  </div>
                  <div className="crawl-item">
                    <span className="crawl-time">
                      13:00
                    </span>
                    <span className="crawl-label">
                      점심 이후 뉴스
                    </span>
                    <span className="crawl-status done">
                      ✓ 완료
                    </span>
                  </div>
                  <div className="crawl-item">
                    <span className="crawl-time">
                      15:00
                    </span>
                    <span className="crawl-label">
                      장 마감 전 뉴스
                    </span>
                    <span className="crawl-status live pulse">
                      ● 진행 중
                    </span>
                  </div>
                  <div className="crawl-item">
                    <span className="crawl-time">
                      17:00
                    </span>
                    <span className="crawl-label">
                      장 마감 후 뉴스
                    </span>
                    <span className="crawl-status pending">
                      대기
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="tab-company" className="tab-content">
            <div className="detail-body">
              <div>
                <div className="company-hero">
                  <div className="company-tagline">
                    💡 삼성전자는 반도체, 스마트폰, 디스플레이, 가전 등을 아우르는 글로벌 종합 전자기업입니다.
                  </div>
                  <p className="company-desc">
                    
            삼성전자는 1969년 설립되어 반도체, 모바일, CE(가전), 디스플레이 사업을 영위하는 대한민국 최대 기업입니다.
            메모리 반도체(DRAM, NAND)와 파운드리 분야에서 세계 최고 수준의 점유율을 보유하고 있으며,
            스마트폰(Galaxy 시리즈) 부문에서도 글로벌 1위를 다투고 있습니다.
            AI 반도체 수요 확대에 따른 HBM(High Bandwidth Memory) 공급 역량이 향후 실적의 핵심 변수로 부각되고 있습니다.
          
                  </p>
                  <div className="company-stats">
                    <div className="cs-item">
                      <div className="cs-label">
                        시가총액
                      </div>
                      <div className="cs-value">
                        431조
                      </div>
                      <div className="cs-sub">
                        원 (KRW)
                      </div>
                    </div>
                    <div className="cs-item">
                      <div className="cs-label">
                        업종
                      </div>
                      <div className="cs-value" style={{"fontSize": "12px"}}>
                        반도체·전자
                      </div>
                      <div className="cs-sub">
                        KOSPI 대형주
                      </div>
                    </div>
                    <div className="cs-item">
                      <div className="cs-label">
                        PER
                      </div>
                      <div className="cs-value">
                        14.2x
                      </div>
                      <div className="cs-sub">
                        12개월 선행
                      </div>
                    </div>
                    <div className="cs-item">
                      <div className="cs-label">
                        PBR
                      </div>
                      <div className="cs-value">
                        1.18x
                      </div>
                      <div className="cs-sub">
                        기준: 2024 BPS
                      </div>
                    </div>
                    <div className="cs-item">
                      <div className="cs-label">
                        배당수익률
                      </div>
                      <div className="cs-value">
                        2.1%
                      </div>
                      <div className="cs-sub">
                        연간 (2024E)
                      </div>
                    </div>
                    <div className="cs-item">
                      <div className="cs-label">
                        52주 범위
                      </div>
                      <div className="cs-value" style={{"fontSize": "11px"}}>
                        59,900
                      </div>
                      <div className="cs-sub">
                        ~ 84,800원
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chart-card">
                  <div className="chart-header">
                    <div className="chart-title">
                      주요 사업 구성
                    </div>
                  </div>
                  <div style={{"display": "flex", "flexDirection": "column", "gap": "10px"}}>
                    <div>
                      <div style={{"display": "flex", "justifyContent": "space-between", "fontSize": "12px", "marginBottom": "4px"}}>
                        <span style={{"color": "var(--text-secondary)"}}>
                          DS (반도체)
                        </span>
                        <span style={{"fontFamily": "'DM Mono',monospace", "color": "var(--accent)"}}>
                          38%
                        </span>
                      </div>
                      <div style={{"height": "5px", "background": "var(--border)", "borderRadius": "4px", "overflow": "hidden"}}>
                        <div style={{"height": "100%", "width": "38%", "background": "var(--accent)", "borderRadius": "4px"}}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{"display": "flex", "justifyContent": "space-between", "fontSize": "12px", "marginBottom": "4px"}}>
                        <span style={{"color": "var(--text-secondary)"}}>
                          MX (모바일)
                        </span>
                        <span style={{"fontFamily": "'DM Mono',monospace", "color": "var(--accent)"}}>
                          34%
                        </span>
                      </div>
                      <div style={{"height": "5px", "background": "var(--border)", "borderRadius": "4px", "overflow": "hidden"}}>
                        <div style={{"height": "100%", "width": "34%", "background": "var(--accent)", "borderRadius": "4px"}}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{"display": "flex", "justifyContent": "space-between", "fontSize": "12px", "marginBottom": "4px"}}>
                        <span style={{"color": "var(--text-secondary)"}}>
                          CE (가전)
                        </span>
                        <span style={{"fontFamily": "'DM Mono',monospace", "color": "var(--accent)"}}>
                          16%
                        </span>
                      </div>
                      <div style={{"height": "5px", "background": "var(--border)", "borderRadius": "4px", "overflow": "hidden"}}>
                        <div style={{"height": "100%", "width": "16%", "background": "var(--accent)", "borderRadius": "4px"}}></div>
                      </div>
                    </div>
                    <div>
                      <div style={{"display": "flex", "justifyContent": "space-between", "fontSize": "12px", "marginBottom": "4px"}}>
                        <span style={{"color": "var(--text-secondary)"}}>
                          디스플레이
                        </span>
                        <span style={{"fontFamily": "'DM Mono',monospace", "color": "var(--accent)"}}>
                          12%
                        </span>
                      </div>
                      <div style={{"height": "5px", "background": "var(--border)", "borderRadius": "4px", "overflow": "hidden"}}>
                        <div style={{"height": "100%", "width": "12%", "background": "var(--accent)", "borderRadius": "4px"}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-col">
                <div className="widget">
                  <div className="widget-title">
                    🔔 알림 설정
                  </div>
                  <div className="alert-setting-item">
                    <span className="alert-setting-label">
                      ⚡ 급등락 감지 알림
                    </span>
                    <button className="toggle on" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
                  </div>
                  <div className="alert-setting-item">
                    <span className="alert-setting-label">
                      🔴 고영향 악재 뉴스
                    </span>
                    <button className="toggle on" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
                  </div>
                  <div className="alert-setting-item">
                    <span className="alert-setting-label">
                      🟢 고영향 호재 뉴스
                    </span>
                    <button className="toggle" onClick={(event) => { event.currentTarget.classList.toggle('on'); }}></button>
                  </div>
                </div>
                <div className="widget">
                  <div className="widget-title">
                    🧺 내 바구니
                  </div>
                  <div className="basket-mini-item">
                    <div className="bm-logo">
                      💠
                    </div>
                    <div className="bm-name">
                      삼성전자
                    </div>
                    <div className="bm-price-col">
                      <div className="bm-price">
                        72,400
                      </div>
                      <div className="bm-change" style={{"color": "var(--negative)"}}>
                        ▼ -1.63%
                      </div>
                    </div>
                  </div>
                  <div className="basket-mini-item">
                    <div className="bm-logo">
                      🔷
                    </div>
                    <div className="bm-name">
                      SK하이닉스
                    </div>
                    <div className="bm-price-col">
                      <div className="bm-price">
                        192,500
                      </div>
                      <div className="bm-change" style={{"color": "var(--positive)"}}>
                        ▲ +3.11%
                      </div>
                    </div>
                  </div>
                  <a href="stocks.html" style={{"display": "block", "textAlign": "center", "marginTop": "10px", "fontSize": "11.5px", "color": "var(--accent)", "fontFamily": "'DM Mono',monospace"}}>
                    + 종목 추가하기
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div id="tab-spikes" className="tab-content">
            <div className="detail-body">
              <div>
                <div className="chart-card">
                  <div className="chart-title" style={{"marginBottom": "14px"}}>
                    📋 최근 30일 급등락 기록
                  </div>
                  <div className="spike-item">
                    <span className="spike-date">
                      10.10
                    </span>
                    <span className="spike-change down">
                      ▼ -1.63%
                    </span>
                    <div className="spike-cause">
                      HBM3E 납품 지연 재부각, 수율 문제 복수 보도
                    </div>
                  </div>
                  <div className="spike-item">
                    <span className="spike-date">
                      10.07
                    </span>
                    <span className="spike-change up">
                      ▲ +2.14%
                    </span>
                    <div className="spike-cause">
                      HBM4 엔비디아 계약 임박 소식, 대규모 수주 기대
                    </div>
                  </div>
                  <div className="spike-item">
                    <span className="spike-date">
                      09.25
                    </span>
                    <span className="spike-change down">
                      ▼ -3.20%
                    </span>
                    <div className="spike-cause">
                      DS부문 3Q 영업이익 컨센서스 하향. 파운드리 가동률 저하 우려
                    </div>
                  </div>
                  <div className="spike-item">
                    <span className="spike-date">
                      09.18
                    </span>
                    <span className="spike-change up">
                      ▲ +3.45%
                    </span>
                    <div className="spike-cause">
                      AI서버 DRAM 수요 급증, 삼성 수혜 전망 보고서 다수 발간
                    </div>
                  </div>
                  <div className="spike-item">
                    <span className="spike-date">
                      09.11
                    </span>
                    <span className="spike-change down">
                      ▼ -2.88%
                    </span>
                    <div className="spike-cause">
                      미국 반도체 수출 규제 강화 우려, 중국향 매출 위험 재부각
                    </div>
                  </div>
                </div>
              </div>
              <div className="right-col">
                <div className="widget">
                  <div className="widget-title">
                    📊 30일 급등락 요약
                  </div>
                  <div style={{"display": "flex", "flexDirection": "column", "gap": "10px", "marginTop": "4px"}}>
                    <div style={{"background": "var(--positive-bg)", "border": "1px solid var(--positive-border)", "borderRadius": "8px", "padding": "12px"}}>
                      <div style={{"fontSize": "10px", "color": "var(--positive)", "fontFamily": "'DM Mono',monospace", "letterSpacing": "1px", "marginBottom": "4px"}}>
                        급등 횟수
                      </div>
                      <div style={{"fontSize": "22px", "fontWeight": "700", "fontFamily": "'DM Mono',monospace", "color": "var(--positive)"}}>
                        6회
                      </div>
                      <div style={{"fontSize": "11px", "color": "var(--text-muted)"}}>
                        평균 +2.8%
                      </div>
                    </div>
                    <div style={{"background": "var(--negative-bg)", "border": "1px solid var(--negative-border)", "borderRadius": "8px", "padding": "12px"}}>
                      <div style={{"fontSize": "10px", "color": "var(--negative)", "fontFamily": "'DM Mono',monospace", "letterSpacing": "1px", "marginBottom": "4px"}}>
                        급락 횟수
                      </div>
                      <div style={{"fontSize": "22px", "fontWeight": "700", "fontFamily": "'DM Mono',monospace", "color": "var(--negative)"}}>
                        8회
                      </div>
                      <div style={{"fontSize": "11px", "color": "var(--text-muted)"}}>
                        평균 -2.3%
                      </div>
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
