import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useLegacyPage } from '../hooks/useLegacyPage.js';
import { getStockDetail, getBasket, addToBasket, removeFromBasket } from '../api/stocks.js';
import { getNewsByStock } from '../api/news.js';
import { subscribeChart, getMinuteCandles, getDailyCandles, getWeeklyCandles } from '../api/chart.js';
import { loadStockMaster, getStockMeta } from '../api/stockMaster.js';
import SidebarUserCard from '../components/SidebarUserCard.jsx';

const pageStyles = `
.layout { display: flex; min-height: 100vh; }
.sidebar { width: var(--sidebar-w); background: var(--surface); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; }
.sidebar-logo { padding: 22px 20px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
.sidebar-nav { flex: 1; padding: 14px 12px; overflow-y: auto; }
.nav-section { font-size: 9px; font-family: 'DM Mono', monospace; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); padding: 10px 8px 5px; margin-top: 8px; }
.nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; color: var(--text-secondary); cursor: pointer; transition: all 0.15s; margin-bottom: 2px; position: relative; text-decoration: none; }
.nav-item:hover { background: var(--card); color: var(--text-primary); }
.nav-item.active { background: var(--accent-bg); color: var(--accent); }
.nav-item.active::before { content: ''; position: absolute; left: 0; top: 5px; bottom: 5px; width: 3px; background: var(--accent); border-radius: 0 2px 2px 0; }
.sidebar-bottom { padding: 12px; border-top: 1px solid var(--border); }
.user-card { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 6px; }
.user-avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#8b5cf6); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; }
.user-name { font-size: 12.5px; font-weight: 600; }
.user-plan { font-size: 9.5px; color: var(--accent); font-family: 'DM Mono', monospace; }

.main { margin-left: var(--sidebar-w); flex: 1; min-height: 100vh; }

.stock-hero { background: var(--surface); border-bottom: 1px solid var(--border); padding: 22px 32px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.stock-hero-left { display: flex; align-items: center; gap: 16px; }
.stock-avatar { width: 50px; height: 50px; background: linear-gradient(135deg, #1d2d50, #2a3f6f); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 1px solid var(--border-light); flex-shrink: 0; }
.stock-hero-info h1 { font-size: 20px; font-weight: 700; letter-spacing: -0.5px; }
.stock-name-row { display: flex; align-items: center; gap: 10px; }
.basket-select { background: var(--card); border: 1px solid var(--border); border-radius: 6px; color: var(--text-primary); font-size: 12px; padding: 4px 8px; font-family: 'Noto Sans KR', sans-serif; cursor: pointer; outline: none; max-width: 200px; }
.basket-select:hover { border-color: var(--accent); }
.stock-meta { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
.stock-ticker { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-muted); background: var(--card); padding: 2px 7px; border-radius: 4px; border: 1px solid var(--border); }
.stock-summary-short { font-size: 12px; color: var(--text-secondary); }

.stock-hero-right { display: flex; align-items: center; gap: 20px; }
.price-block { text-align: right; }
.price-main { font-family: 'DM Mono', monospace; font-size: 26px; font-weight: 500; }
.price-change { font-family: 'DM Mono', monospace; font-size: 13px; margin-top: 1px; }
.price-change.up { color: var(--positive); }
.price-change.down { color: var(--negative); }
.price-time { font-size: 10.5px; color: var(--text-muted); margin-top: 2px; }
.hero-actions { display: flex; gap: 8px; }
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 6px; font-size: 12.5px; font-weight: 600; cursor: pointer; border: none; transition: all 0.15s; font-family: 'Noto Sans KR', sans-serif; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-primary:hover { background: var(--accent-hover); }
.btn-ghost { background: transparent; color: var(--text-secondary); border: 1px solid var(--border); }
.btn-ghost:hover { background: var(--card); color: var(--text-primary); }
.btn-sm { padding: 5px 10px; font-size: 11.5px; }
.btn[disabled] { opacity: 0.55; cursor: not-allowed; }

.detail-body { padding: 24px 32px; display: grid; grid-template-columns: 1fr 300px; gap: 20px; align-items: start; }

.stats-row { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 20px; }
.stat-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 15px 16px; }
.stat-label { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; font-family: 'DM Mono', monospace; }
.stat-value { font-family: 'DM Mono', monospace; font-size: 20px; font-weight: 500; color: var(--text-primary); }

.chart-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 18px; margin-bottom: 18px; }
.chart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; gap: 12px; flex-wrap: wrap; }
.chart-title { font-size: 11px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); }
.live-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--negative); margin-right: 6px; animation: pulse 1.4s infinite; }
@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.25} }
.tf-tabs { display: flex; gap: 4px; }
.tf-tab { padding: 4px 11px; border-radius: 5px; font-size: 11.5px; font-weight: 600; cursor: pointer; color: var(--text-muted); border: 1px solid var(--border); background: var(--surface); transition: all 0.15s; font-family: 'DM Mono', monospace; }
.tf-tab.active { background: var(--accent-bg); color: var(--accent); border-color: rgba(129,140,248,0.3); }
.tf-tab:hover:not(.active) { color: var(--text-secondary); }
.chart-hint { font-size: 10.5px; color: var(--text-muted); font-family: 'DM Mono', monospace; }
#chartCanvas { width: 100%; display: block; cursor: grab; touch-action: none; }
#chartCanvas.dragging { cursor: grabbing; }
#chartCanvas.xhair { cursor: crosshair; }
#chartCanvas.xhair.dragging { cursor: grabbing; }
.xhair-btn { padding: 4px 10px; border-radius: 5px; font-size: 13px; font-weight: 600; cursor: pointer; color: var(--text-muted); border: 1px solid var(--border); background: var(--surface); transition: all 0.15s; line-height: 1; }
.xhair-btn.active { background: var(--accent-bg); color: var(--accent); border-color: rgba(129,140,248,0.3); }
.range-btn { padding: 4px 10px; border-radius: 5px; font-size: 11px; font-weight: 600; cursor: pointer; color: var(--text-muted); border: 1px solid var(--border); background: var(--surface); transition: all 0.15s; font-family: 'DM Mono', monospace; line-height: 1.4; }
.range-btn.active { background: rgba(251,191,36,0.12); color: #fbbf24; border-color: rgba(251,191,36,0.4); }
.range-btn[disabled] { opacity: 0.4; cursor: not-allowed; }
#chartCanvas.range { cursor: crosshair; }
#chartCanvas.range.dragging { cursor: grabbing; }

.range-news-panel { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 14px; max-height: 540px; overflow-y: auto; }
.range-news-panel .panel-title { font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 4px; }
.range-news-panel .panel-sub { font-size: 11px; color: var(--text-muted); margin-bottom: 10px; font-family: 'DM Mono', monospace; }
.range-news-item { display: block; padding: 9px 10px; border-radius: 6px; border: 1px solid var(--border); margin-bottom: 6px; text-decoration: none; color: var(--text-primary); transition: all 0.15s; border-left: 3px solid transparent; }
.range-news-item:hover { background: var(--card-hover); }
.range-news-item.good { border-left-color: var(--positive); }
.range-news-item.bad { border-left-color: var(--negative); }
.range-news-item.mid { border-left-color: var(--neutral); }
.range-news-meta { display: flex; gap: 6px; align-items: center; margin-bottom: 4px; font-size: 9.5px; color: var(--text-muted); font-family: 'DM Mono', monospace; }
.range-news-title { font-size: 12px; font-weight: 600; line-height: 1.35; color: var(--text-primary); }
.range-clear-btn { font-size: 10.5px; padding: 3px 8px; border-radius: 4px; border: 1px solid var(--border); background: transparent; color: var(--text-muted); cursor: pointer; font-family: 'DM Mono', monospace; }
.range-clear-btn:hover { color: var(--text-primary); }

.news-timeline { display: flex; flex-direction: column; gap: 8px; }
.news-item { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; display: flex; gap: 12px; border-left: 3px solid transparent; cursor: pointer; transition: all 0.15s; text-decoration: none; }
.news-item:hover { background: var(--card-hover); transform: translateX(2px); }
.news-item.good { border-left-color: var(--positive); }
.news-item.bad { border-left-color: var(--negative); }
.news-item.mid { border-left-color: var(--neutral); }
.news-score-circle { width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: 'DM Mono', monospace; }
.news-score-circle.good { background: var(--positive-bg); border: 1.5px solid var(--positive-border); color: var(--positive); }
.news-score-circle.bad { background: var(--negative-bg); border: 1.5px solid var(--negative-border); color: var(--negative); }
.news-score-circle.mid { background: var(--neutral-bg); border: 1.5px solid var(--neutral-border); color: var(--neutral); }
.news-score-num { font-size: 13px; font-weight: 700; line-height: 1; }
.news-item-body { flex: 1; min-width: 0; }
.news-item-meta { display: flex; align-items: center; gap: 7px; margin-bottom: 5px; flex-wrap: wrap; }
.news-item-title { font-size: 13.5px; font-weight: 600; line-height: 1.4; margin-bottom: 4px; color: var(--text-primary); }
.news-item-excerpt { font-size: 11.5px; color: var(--text-secondary); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.chip { display: inline-flex; align-items: center; gap: 3px; padding: 2px 7px; border-radius: 20px; font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace; }
.chip-good { background: var(--positive-bg); color: var(--positive); border: 1px solid var(--positive-border); }
.chip-bad { background: var(--negative-bg); color: var(--negative); border: 1px solid var(--negative-border); }
.chip-mid { background: var(--neutral-bg); color: var(--neutral); border: 1px solid var(--neutral-border); }
.chip-gray { background: var(--surface); color: var(--text-muted); border: 1px solid var(--border); }
.news-time { font-size: 10px; color: var(--text-muted); font-family: 'DM Mono', monospace; margin-left: auto; white-space: nowrap; }

.right-col { display: flex; flex-direction: column; gap: 14px; }
.widget { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
.widget-title { font-size: 10px; font-weight: 700; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 12px; }

.empty-state { padding: 32px 16px; text-align: center; color: var(--text-muted); font-size: 13px; }

.theme-btn { width: 32px; height: 32px; border-radius: 6px; background: transparent; border: 1px solid var(--border); color: var(--text-secondary); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 15px; transition: all 0.15s; }
.theme-btn:hover { background: var(--card); color: var(--text-primary); }
`;

const themeScript = `
(function() {
  function apply(t) {
    const r = document.documentElement;
    if (t === 'light') { r.classList.add('theme-light'); r.classList.remove('theme-dark'); r.setAttribute('data-theme', 'light'); }
    else { r.classList.remove('theme-light'); r.classList.add('theme-dark'); r.setAttribute('data-theme', 'dark'); }
    const btn = document.getElementById('themeBtn'); if (btn) btn.textContent = t === 'light' ? '☀️' : '🌙';
    localStorage.setItem('theme', t);
  }
  window.__toggleTheme = function() {
    const c = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    apply(c === 'dark' ? 'light' : 'dark');
  };
  const s = localStorage.getItem('theme');
  if (s) apply(s);
  else if (window.matchMedia('(prefers-color-scheme: light)').matches) apply('light');
  else apply('dark');
})();
`;

const TIMEFRAMES = [
  { key: '1m', label: '분봉', bucketMs: 60 * 1000 },
  { key: '1d', label: '일봉', bucketMs: 24 * 60 * 60 * 1000 },
  { key: '1w', label: '주봉', bucketMs: 7 * 24 * 60 * 60 * 1000 },
];

function sentimentClass(t) {
  if (t === 'POSITIVE') return 'good';
  if (t === 'NEGATIVE') return 'bad';
  if (t === 'NEUTRAL') return 'mid';
  return 'mid';
}
function sentimentLabel(t) {
  if (t === 'POSITIVE') return '호재';
  if (t === 'NEGATIVE') return '악재';
  if (t === 'NEUTRAL') return '중립';
  return '분석중';
}
function formatTime(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch { return iso; }
}
function getQueryParam(name) {
  const u = new URL(window.location.href);
  return u.searchParams.get(name);
}

function parseCandleTime(timeStr) {
  if (timeStr.length > 10) {
    // Datetime like "2026-05-07T09:00" — no Z so treated as local time by Date constructor
    return new Date(timeStr).getTime();
  }
  // Date-only like "2026-04-18" — parse as local midnight to avoid UTC offset issues
  const [y, m, d] = timeStr.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}

function normCandle(c) {
  return {
    time: c.time,
    t: parseCandleTime(c.time),
    open: c.open,
    high: c.high,
    low: c.low,
    close: c.close,
    volume: c.volume ?? 0,
  };
}

function formatBucketLabel(ms, tfKey) {
  const d = new Date(ms);
  const pad = (n) => String(n).padStart(2, '0');
  if (tfKey === '1m') return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  if (tfKey === '1w') return `${d.getFullYear() % 100}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
}

function formatTooltipDate(t, tfKey) {
  const d = new Date(t);
  const pad = (n) => String(n).padStart(2, '0');
  const date = `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
  if (tfKey === '1m') return `${date} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  return date;
}

function drawRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export default function StockDetail() {
  useLegacyPage({ title: '종목 상세 — 주식 바구니', styles: pageStyles, scripts: themeScript });

  const stockCode = getQueryParam('code') || '005930';

  const [stock, setStock] = useState(null);
  const [stockErr, setStockErr] = useState('');
  const [stockMeta, setStockMeta] = useState(null);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [basket, setBasket] = useState([]);
  const [actionMsg, setActionMsg] = useState('');

  const [currentPrice, setCurrentPrice] = useState(null);
  const [prevClose, setPrevClose] = useState(null);
  const [lastTickAt, setLastTickAt] = useState(null);

  const [timeframe, setTimeframe] = useState('1m');
  const [chartVersion, setChartVersion] = useState(0);
  const [candleLoading, setCandleLoading] = useState(true);
  const [crosshairEnabled, setCrosshairEnabled] = useState(false);
  const [rangeMode, setRangeMode] = useState(false); // 기간 선택 모드
  const [rangeSel, setRangeSel] = useState({ startIdx: null, endIdx: null }); // 절대 인덱스 (현재 timeframe의 candles 기준)
  const [rangeTf, setRangeTf] = useState(null); // 선택이 만들어진 타임프레임 ('1m' | '1d')
  const [rangeNews, setRangeNews] = useState([]);
  const [rangeNewsLoading, setRangeNewsLoading] = useState(false);
  const [rangeNewsErr, setRangeNewsErr] = useState('');

  const canvasRef = useRef(null);
  const crosshairRef = useRef({ x: null, y: null });
  const crosshairEnabledRef = useRef(false);
  const drawChartRef = useRef(null);
  const rangeModeRef = useRef(false);
  const rangeSelRef = useRef({ startIdx: null, endIdx: null });
  const candlesRef = useRef([]); // 현재 timeframe의 candles 참조 (이벤트 핸들러용)
  const timeframeRef = useRef('1m');
  const viewSnapshotRef = useRef(null); // drawChart에서 startIdx/visibleCount 등을 저장 → 클릭 시 인덱스 계산에 사용
  const minuteCandlesRef = useRef([]);
  const dailyCandlesRef = useRef([]);
  const weeklyCandlesRef = useRef([]);
  const dailyCursorRef = useRef({ hasMore: false, nextCursor: null });
  const weeklyCursorRef = useRef({ hasMore: false, nextCursor: null });
  const loadingMoreRef = useRef(false);
  const loadMoreFnRef = useRef(null);
  // 차트 뷰 상태: rightIndex=null 이면 항상 최신 추종, 숫자면 그 인덱스에 고정
  const viewRef = useRef({ rightIndex: null, visibleCount: 60 });
  const dragRef = useRef({ active: false, startX: 0, startRightIndex: 0, wasFollowing: true });

  // 마스터 로드 후 종목 메타 추출
  useEffect(() => {
    loadStockMaster().then(() => {
      setStockMeta(getStockMeta(stockCode));
    });
  }, [stockCode]);

  // 종목 상세 (백엔드)
  useEffect(() => {
    let alive = true;
    setStockErr('');
    setStock(null);
    getStockDetail(stockCode)
      .then((res) => { if (alive) setStock(res?.data || null); })
      .catch((err) => {
        if (!alive) return;
        const code = err.response?.data?.code;
        if (code === 'STOCK_404') setStockErr('존재하지 않는 종목입니다.');
        else setStockErr('');
      });
    return () => { alive = false; };
  }, [stockCode]);

  // 뉴스
  useEffect(() => {
    let alive = true;
    setNewsLoading(true);
    getNewsByStock(stockCode, { page: 0, size: 20 })
      .then((res) => { if (alive) setNews(res?.data?.content || []); })
      .catch(() => { if (alive) setNews([]); })
      .finally(() => { if (alive) setNewsLoading(false); });
    return () => { alive = false; };
  }, [stockCode]);

  // 바구니
  useEffect(() => {
    getBasket().then((res) => setBasket(res?.data || [])).catch(() => {});
  }, []);

  // 분봉 캔들에 SSE 틱 적용 (API 문서 8-1 기준)
  const applyTickToMinute = useCallback((isoTime, price) => {
    const minuteKey = isoTime.slice(0, 16);
    const arr = minuteCandlesRef.current;
    if (arr.length > 0 && arr[arr.length - 1].time === minuteKey) {
      const last = arr[arr.length - 1];
      last.high = Math.max(last.high, price);
      last.low = Math.min(last.low, price);
      last.close = price;
    } else {
      arr.push({ time: minuteKey, t: new Date(minuteKey).getTime(), open: price, high: price, low: price, close: price, volume: 0 });
    }
  }, []);

  // 초기 캔들 로드 + SSE 구독
  useEffect(() => {
    minuteCandlesRef.current = [];
    dailyCandlesRef.current = [];
    weeklyCandlesRef.current = [];
    dailyCursorRef.current = { hasMore: false, nextCursor: null };
    weeklyCursorRef.current = { hasMore: false, nextCursor: null };
    setCurrentPrice(null);
    setPrevClose(null);
    setCandleLoading(true);
    setRangeSel({ startIdx: null, endIdx: null });
    setRangeTf(null);
    setRangeNews([]);
    setRangeNewsErr('');
    viewRef.current = { rightIndex: null, visibleCount: 60 };
    setChartVersion((v) => v + 1);

    // 분봉·일봉·주봉 병렬 로드
    Promise.all([
      getMinuteCandles(stockCode).catch(() => ({ data: [] })),
      getDailyCandles(stockCode, { limit: 20 }).catch(() => ({ data: { candles: [], hasMore: false, nextCursor: null } })),
      getWeeklyCandles(stockCode, { limit: 20 }).catch(() => ({ data: { candles: [], hasMore: false, nextCursor: null } })),
    ]).then(([minuteRes, dailyRes, weeklyRes]) => {
      const minuteC = (minuteRes?.data || []).map(normCandle);
      minuteCandlesRef.current = minuteC;

      const dailyC = (dailyRes?.data?.candles || []).map(normCandle);
      dailyCandlesRef.current = dailyC;
      dailyCursorRef.current = {
        hasMore: dailyRes?.data?.hasMore ?? false,
        nextCursor: dailyRes?.data?.nextCursor ?? null,
      };

      const weeklyC = (weeklyRes?.data?.candles || []).map(normCandle);
      weeklyCandlesRef.current = weeklyC;
      weeklyCursorRef.current = {
        hasMore: weeklyRes?.data?.hasMore ?? false,
        nextCursor: weeklyRes?.data?.nextCursor ?? null,
      };

      console.log(`[Chart] ${stockCode} 분봉:${minuteC.length} 일봉:${dailyC.length}(hasMore:${dailyRes?.data?.hasMore}) 주봉:${weeklyC.length}(hasMore:${weeklyRes?.data?.hasMore})`);

      // 가장 최근 일봉의 종가를 전일 종가로 활용
      if (dailyC.length > 0) setPrevClose(dailyC[dailyC.length - 1].close);

      setCandleLoading(false);
      setChartVersion((v) => v + 1);
    }).catch((err) => {
      console.error('[Chart] 캔들 로드 실패', err);
      setCandleLoading(false);
      setChartVersion((v) => v + 1);
    });

    const unsubscribe = subscribeChart(stockCode, {
      onSnapshot: (data) => {
        const price = data.price ?? null;
        if (price != null) {
          setCurrentPrice(price);
          if (data.time) applyTickToMinute(data.time, price);
        }
        setLastTickAt(Date.now());
        setChartVersion((v) => v + 1);
      },
      onTick: (data) => {
        const price = data.price ?? null;
        if (price == null) return;
        setCurrentPrice(price);
        if (data.time) applyTickToMinute(data.time, price);
        setLastTickAt(Date.now());
        setChartVersion((v) => v + 1);
      },
      onError: (e) => console.warn('chart SSE error', e),
    });

    return () => unsubscribe();
  }, [stockCode, applyTickToMinute]);

  // 타임프레임에 맞는 캔들 배열 반환
  // 스프레드로 새 참조를 생성해야 drawChart useCallback이 재생성되어 차트가 갱신됨
  const candles = useMemo(() => {
    if (timeframe === '1m') return [...minuteCandlesRef.current];
    if (timeframe === '1d') return [...dailyCandlesRef.current];
    if (timeframe === '1w') return [...weeklyCandlesRef.current];
    return [];
    // chartVersion이 dep에 있어야 ref 변동을 반영
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe, chartVersion]);

  // 일봉·주봉 히스토리 추가 로드 (커서 페이지네이션)
  const loadMoreCandles = useCallback(async () => {
    if (loadingMoreRef.current) return;
    if (timeframe === '1d' && !dailyCursorRef.current.hasMore) return;
    if (timeframe === '1w' && !weeklyCursorRef.current.hasMore) return;
    if (timeframe === '1m') return;

    loadingMoreRef.current = true;
    try {
      if (timeframe === '1d') {
        const res = await getDailyCandles(stockCode, { before: dailyCursorRef.current.nextCursor, limit: 200 });
        const newCandles = (res?.data?.candles || []).map(normCandle);
        if (newCandles.length > 0) {
          dailyCandlesRef.current = [...newCandles, ...dailyCandlesRef.current];
          dailyCursorRef.current = {
            hasMore: res?.data?.hasMore ?? false,
            nextCursor: res?.data?.nextCursor ?? null,
          };
          // 프리펜드 후 rightIndex를 보정해 현재 보이는 위치 유지
          if (viewRef.current.rightIndex != null) viewRef.current.rightIndex += newCandles.length;
          setChartVersion((v) => v + 1);
        }
      } else if (timeframe === '1w') {
        const res = await getWeeklyCandles(stockCode, { before: weeklyCursorRef.current.nextCursor, limit: 200 });
        const newCandles = (res?.data?.candles || []).map(normCandle);
        if (newCandles.length > 0) {
          weeklyCandlesRef.current = [...newCandles, ...weeklyCandlesRef.current];
          weeklyCursorRef.current = {
            hasMore: res?.data?.hasMore ?? false,
            nextCursor: res?.data?.nextCursor ?? null,
          };
          if (viewRef.current.rightIndex != null) viewRef.current.rightIndex += newCandles.length;
          setChartVersion((v) => v + 1);
        }
      }
    } catch (err) {
      console.warn('loadMoreCandles error', err);
    } finally {
      loadingMoreRef.current = false;
    }
  }, [timeframe, stockCode]);

  // ref들을 최신 값으로 동기화
  loadMoreFnRef.current = loadMoreCandles;
  crosshairEnabledRef.current = crosshairEnabled;
  rangeModeRef.current = rangeMode;
  rangeSelRef.current = rangeSel;
  candlesRef.current = candles;
  timeframeRef.current = timeframe;

  // 캔들의 t(ms) → yyyy-MM-dd 변환 (API 호출용)
  const candleDateStr = useCallback((c) => {
    const d = new Date(c.t);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  // 캔들 차트 렌더링
  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const cssW = (canvas.parentElement?.clientWidth ?? 600) - 36;
    const cssH = 320;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, cssW, cssH);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const gridColor = isLight ? 'rgba(200,210,230,0.5)' : 'rgba(70,75,100,0.4)';
    const textColor = isLight ? '#9099b5' : '#555d7a';
    const upColor = '#34d399';
    const downColor = '#f87171';

    const padL = 64, padR = 16, padT = 16, padB = 32;
    const w = cssW - padL - padR;
    const h = cssH - padT - padB;

    if (!candles.length) {
      ctx.fillStyle = textColor;
      ctx.font = "12px 'DM Mono', monospace";
      ctx.textAlign = 'center';
      let emptyMsg;
      if (candleLoading) {
        emptyMsg = '데이터 불러오는 중...';
      } else if (timeframe === '1m') {
        emptyMsg = '금일 분봉 데이터 없음 (장 외 시간 또는 데이터 준비 중)';
      } else {
        emptyMsg = `${timeframe === '1d' ? '일봉' : '주봉'} 데이터 없음`;
      }
      ctx.fillText(emptyMsg, cssW / 2, cssH / 2);
      return;
    }

    const visibleCount = Math.max(5, Math.min(viewRef.current.visibleCount, 1000));
    const total = candles.length;
    let right = viewRef.current.rightIndex;
    if (right == null) right = total - 1;
    right = Math.max(0, Math.min(total - 1, right));
    const startIdx = Math.max(0, right - visibleCount + 1);
    const visible = candles.slice(startIdx, right + 1);
    if (!visible.length) return;

    // 좌측 끝 도달 시 히스토리 추가 로드 (일봉·주봉)
    if (startIdx === 0 && (timeframe === '1d' || timeframe === '1w')) {
      loadMoreFnRef.current?.();
    }

    // y range
    let minP = Infinity, maxP = -Infinity;
    for (const c of visible) {
      if (c.low < minP) minP = c.low;
      if (c.high > maxP) maxP = c.high;
    }
    if (minP === maxP) { minP -= 1; maxP += 1; }
    const yp = (maxP - minP) * 0.1;
    minP -= yp; maxP += yp;
    const range = maxP - minP;
    const toY = (p) => padT + h - ((p - minP) / range) * h;

    // grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    ctx.fillStyle = textColor;
    ctx.font = "10px 'DM Mono', monospace";
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const y = padT + (h / 4) * i;
      ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(padL + w, y); ctx.stroke();
      const label = (maxP - (range / 4) * i).toLocaleString(undefined, { maximumFractionDigits: 0 });
      ctx.fillText(label, padL - 6, y + 3);
    }

    // candles
    const slot = w / visible.length;
    const bodyW = Math.max(2, Math.floor(slot * 0.72));
    visible.forEach((c, i) => {
      const cx = padL + slot * i + slot / 2;
      const up = c.close >= c.open;
      const col = up ? upColor : downColor;
      // wick
      ctx.strokeStyle = col;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, toY(c.high));
      ctx.lineTo(cx, toY(c.low));
      ctx.stroke();
      // body
      const top = toY(Math.max(c.open, c.close));
      const bot = toY(Math.min(c.open, c.close));
      const bh = Math.max(1, bot - top);
      ctx.fillStyle = col;
      ctx.fillRect(cx - bodyW / 2, top, bodyW, bh);
    });

    // x-axis time labels
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    const desired = Math.min(6, visible.length);
    const step = Math.max(1, Math.floor(visible.length / desired));
    for (let i = 0; i < visible.length; i += step) {
      const cx = padL + slot * i + slot / 2;
      ctx.fillText(formatBucketLabel(visible[i].t, timeframe), cx, padT + h + 18);
    }

    // 선택 영역(기간) 오버레이 — 현재 timeframe과 선택이 만들어진 timeframe이 같을 때만
    if (rangeSel.startIdx != null && rangeTf === timeframe) {
      const a = rangeSel.startIdx;
      const b = rangeSel.endIdx != null ? rangeSel.endIdx : a;
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      // visible 범위와 교집합
      const visLo = Math.max(lo, startIdx);
      const visHi = Math.min(hi, right);
      if (visHi >= visLo) {
        const x1 = padL + (visLo - startIdx) * slot;
        const x2 = padL + (visHi - startIdx + 1) * slot;
        ctx.fillStyle = isLight ? 'rgba(251,191,36,0.16)' : 'rgba(251,191,36,0.18)';
        ctx.fillRect(x1, padT, x2 - x1, h);
        ctx.strokeStyle = 'rgba(251,191,36,0.7)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        // 시작/끝 경계선만 (실제 데이터 끝이 visible에 있는 경우)
        if (lo >= startIdx && lo <= right) {
          ctx.beginPath(); ctx.moveTo(x1, padT); ctx.lineTo(x1, padT + h); ctx.stroke();
        }
        if (hi >= startIdx && hi <= right) {
          ctx.beginPath(); ctx.moveTo(x2, padT); ctx.lineTo(x2, padT + h); ctx.stroke();
        }
        ctx.setLineDash([]);
      }
    }

    // 좌표 계산에 필요한 정보를 스냅샷으로 저장 (클릭 핸들러에서 사용)
    viewSnapshotRef.current = { padL, padT, w, h, slot, startIdx, right, total };

    // 십자선
    const { x: mx, y: my } = crosshairRef.current;
    if (crosshairEnabled && mx != null && mx >= padL && mx <= padL + w && my >= padT && my <= padT + h) {
      const relX = mx - padL;
      const hovIdx = Math.max(0, Math.min(visible.length - 1, Math.floor(relX / slot)));
      const hov = visible[hovIdx];
      const snapX = padL + slot * hovIdx + slot / 2;

      const lineColor = isLight ? 'rgba(80,100,160,0.5)' : 'rgba(160,170,220,0.5)';
      const labelBg = isLight ? '#667' : '#8890bb';

      // 수직선 (캔들 중심에 스냅)
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.beginPath(); ctx.moveTo(snapX, padT); ctx.lineTo(snapX, padT + h); ctx.stroke();

      // 수평선 (마우스 Y 위치)
      ctx.beginPath(); ctx.moveTo(padL, my); ctx.lineTo(padL + w, my); ctx.stroke();
      ctx.setLineDash([]);

      // Y축 가격 라벨
      const hovPrice = maxP - ((my - padT) / h) * range;
      ctx.font = "10px 'DM Mono', monospace";
      const priceStr = Math.round(hovPrice).toLocaleString();
      const priceStrW = ctx.measureText(priceStr).width;
      ctx.fillStyle = labelBg;
      drawRoundRect(ctx, 2, my - 8, padL - 8, 16, 3);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'right';
      ctx.fillText(priceStr, padL - 6, my + 3.5);

      // X축 시간 라벨
      const timeStr = formatBucketLabel(hov.t, timeframe);
      const timeStrW = ctx.measureText(timeStr).width + 14;
      ctx.fillStyle = labelBg;
      drawRoundRect(ctx, snapX - timeStrW / 2, padT + h + 2, timeStrW, 16, 3);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.fillText(timeStr, snapX, padT + h + 13);

      // OHLC 툴팁
      const isHovUp = hov.close >= hov.open;
      const hovColor = isHovUp ? upColor : downColor;

      // 이전 봉 종가 (% 계산 기준)
      const absIdx = startIdx + hovIdx;
      const prevCandleClose = absIdx > 0 ? candles[absIdx - 1].close : null;
      const makePct = (val) => {
        if (prevCandleClose == null || prevCandleClose === 0) return null;
        const p = (val - prevCandleClose) / prevCandleClose * 100;
        return (p >= 0 ? '+' : '') + p.toFixed(2) + '%';
      };
      const pctColor = (val) => (prevCandleClose == null ? (isLight ? '#666' : '#777')
        : val >= prevCandleClose ? upColor : downColor);

      const ohlcDefs = [
        { label: '시', price: hov.open,  col: isLight ? '#555' : '#bbb' },
        { label: '고', price: hov.high,  col: upColor },
        { label: '저', price: hov.low,   col: downColor },
        { label: '종', price: hov.close, col: hovColor },
      ];
      const priceStrs = ohlcDefs.map((r) => r.price.toLocaleString());
      const pctStrs = ohlcDefs.map((r) => makePct(r.price));
      const hasPct = pctStrs.some((p) => p != null);
      const volStr = hov.volume > 0 ? hov.volume.toLocaleString() : '—';
      const tooltipDate = formatTooltipDate(hov.t, timeframe);

      // 텍스트 너비 측정
      const ttLineH = 17;
      const ttPadH = 10;
      const ttPadV = 8;
      ctx.font = "11px 'DM Mono', monospace";
      const priceMaxW = Math.max(...priceStrs.map((s) => ctx.measureText(s).width));
      const pctMaxW = hasPct ? Math.max(...pctStrs.filter(Boolean).map((s) => ctx.measureText(s).width)) : 0;
      ctx.font = "10px 'DM Mono', monospace";
      const dateW = ctx.measureText(tooltipDate).width;
      const volLabelW = ctx.measureText('거래량').width;
      const volValW = ctx.measureText(volStr).width;
      const labelW = ctx.measureText('종').width + 4;
      const innerW = Math.max(
        dateW,
        labelW + 4 + priceMaxW + (hasPct ? 6 + pctMaxW : 0),
        volLabelW + 6 + volValW,
      );
      const ttW = innerW + ttPadH * 2;
      // 높이: 상단패딩 + 날짜(13) + 구분선갭(9) + OHLC 4행 + 거래량 1행 + 하단패딩
      const ttH = ttPadV + 13 + 9 + 5 * ttLineH + ttPadV;

      let ttX = snapX + 14;
      let ttY = padT + 10;
      if (ttX + ttW > padL + w - 4) ttX = snapX - ttW - 14;
      if (ttY + ttH > padT + h - 4) ttY = padT + h - ttH - 4;

      // 배경 & 테두리
      ctx.fillStyle = isLight ? 'rgba(243,245,255,0.97)' : 'rgba(18,21,36,0.97)';
      ctx.strokeStyle = hovColor;
      ctx.lineWidth = 1;
      drawRoundRect(ctx, ttX, ttY, ttW, ttH, 5);
      ctx.fill();
      ctx.stroke();

      // 날짜 헤더
      ctx.font = "10px 'DM Mono', monospace";
      ctx.fillStyle = isLight ? '#888' : '#777';
      ctx.textAlign = 'center';
      ctx.fillText(tooltipDate, ttX + ttW / 2, ttY + ttPadV + 10);

      // 구분선
      const sepY = ttY + ttPadV + 17;
      ctx.strokeStyle = isLight ? 'rgba(180,190,220,0.5)' : 'rgba(60,65,100,0.5)';
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(ttX + 6, sepY); ctx.lineTo(ttX + ttW - 6, sepY); ctx.stroke();

      // OHLC 행
      ctx.font = "11px 'DM Mono', monospace";
      const rightEdge = ttX + ttW - ttPadH;
      const priceRight = hasPct ? rightEdge - pctMaxW - 6 : rightEdge;
      const ohlcStartY = sepY + 5;
      ohlcDefs.forEach(({ label, price, col }, i) => {
        const ry = ohlcStartY + i * ttLineH + 12;
        ctx.fillStyle = isLight ? '#aaa' : '#555';
        ctx.textAlign = 'left';
        ctx.fillText(label, ttX + ttPadH, ry);
        ctx.fillStyle = col;
        ctx.textAlign = 'right';
        ctx.fillText(priceStrs[i], priceRight, ry);
        if (hasPct && pctStrs[i] != null) {
          ctx.fillStyle = pctColor(price);
          ctx.fillText(pctStrs[i], rightEdge, ry);
        }
      });

      // 거래량 행
      ctx.font = "10px 'DM Mono', monospace";
      const volY = ohlcStartY + 4 * ttLineH + 11;
      ctx.fillStyle = isLight ? '#aaa' : '#555';
      ctx.textAlign = 'left';
      ctx.fillText('거래량', ttX + ttPadH, volY);
      ctx.fillStyle = isLight ? '#666' : '#999';
      ctx.textAlign = 'right';
      ctx.fillText(volStr, rightEdge, volY);

      // 남은 state 리셋
      ctx.setLineDash([]);
    }
  }, [candles, timeframe, candleLoading, crosshairEnabled, rangeSel, rangeTf]);

  // drawChart 최신 버전을 ref에 저장 (이벤트 핸들러에서 사용)
  drawChartRef.current = drawChart;

  // 리렌더 시 자동 그리기
  useEffect(() => {
    drawChart();
  }, [drawChart]);

  // 윈도우 리사이즈
  useEffect(() => {
    const onResize = () => drawChart();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [drawChart]);

  // 십자선 마우스 추적 (한 번만 부착, ref로 최신 값 참조)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove = (e) => {
      if (!crosshairEnabledRef.current) return;
      if (dragRef.current.active) {
        crosshairRef.current = { x: null, y: null };
        return;
      }
      const rect = canvas.getBoundingClientRect();
      crosshairRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      drawChartRef.current?.();
    };
    const onLeave = () => {
      if (!crosshairEnabledRef.current) return;
      crosshairRef.current = { x: null, y: null };
      drawChartRef.current?.();
    };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    return () => {
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // 십자선 토글 시 커서 변경 및 잔상 제거
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.classList.toggle('xhair', crosshairEnabled);
    if (!crosshairEnabled) {
      crosshairRef.current = { x: null, y: null };
      drawChartRef.current?.();
    }
  }, [crosshairEnabled]);

  // 기간 선택 모드 토글 시 커서 클래스
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.classList.toggle('range', rangeMode);
  }, [rangeMode]);

  // 기간 뉴스 fetch
  const fetchRangeNews = useCallback(async (lo, hi, tf) => {
    const arr = tf === '1m' ? minuteCandlesRef.current
              : tf === '1d' ? dailyCandlesRef.current : null;
    if (!arr || !arr[lo] || !arr[hi]) return;
    const from = candleDateStr(arr[lo]);
    const to = candleDateStr(arr[hi]);
    setRangeNewsLoading(true);
    setRangeNewsErr('');
    try {
      const res = await getNewsByStock(stockCode, { from, to, page: 0, size: 50 });
      setRangeNews(res?.data?.content || []);
    } catch (err) {
      console.warn('range news error', err);
      setRangeNewsErr('뉴스 조회 실패');
      setRangeNews([]);
    } finally {
      setRangeNewsLoading(false);
    }
  }, [stockCode, candleDateStr]);

  // 기간 선택 클릭 핸들러
  const onCanvasClick = useCallback((e) => {
    if (!rangeModeRef.current) return;
    const tf = timeframeRef.current;
    if (tf !== '1m' && tf !== '1d') return; // 주봉 제외
    const canvas = canvasRef.current;
    const snap = viewSnapshotRef.current;
    if (!canvas || !snap) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    if (mx < snap.padL || mx > snap.padL + snap.w) return;
    if (my < snap.padT || my > snap.padT + snap.h) return;
    const localIdx = Math.floor((mx - snap.padL) / snap.slot);
    const absIdx = Math.max(0, Math.min(snap.total - 1, snap.startIdx + localIdx));

    const cur = rangeSelRef.current;
    if (cur.startIdx == null || cur.endIdx != null) {
      // 새 선택의 시작점
      setRangeSel({ startIdx: absIdx, endIdx: null });
      setRangeTf(tf);
      setRangeNews([]);
      setRangeNewsErr('');
    } else {
      // 끝점 확정 + 뉴스 fetch
      const lo = Math.min(cur.startIdx, absIdx);
      const hi = Math.max(cur.startIdx, absIdx);
      setRangeSel({ startIdx: lo, endIdx: hi });
      void fetchRangeNews(lo, hi, tf);
    }
  }, [fetchRangeNews]);

  // 선택 + 뉴스 지우기
  const clearRange = useCallback(() => {
    setRangeSel({ startIdx: null, endIdx: null });
    setRangeTf(null);
    setRangeNews([]);
    setRangeNewsErr('');
  }, []);

  // 선택 기간 라벨 (yyyy-MM-dd ~ yyyy-MM-dd)
  const rangeLabel = useMemo(() => {
    if (rangeSel.startIdx == null || !rangeTf) return null;
    const arr = rangeTf === '1m' ? minuteCandlesRef.current
              : rangeTf === '1d' ? dailyCandlesRef.current : null;
    const a = arr?.[rangeSel.startIdx];
    const b = rangeSel.endIdx != null ? arr?.[rangeSel.endIdx] : null;
    if (!a) return null;
    if (!b) return `${candleDateStr(a)} ~ (끝점 클릭)`;
    return `${candleDateStr(a)} ~ ${candleDateStr(b)}`;
  }, [rangeSel, rangeTf, candleDateStr, chartVersion]);

  // 휠 줌
  const onWheel = useCallback((e) => {
    e.preventDefault();
    const cur = viewRef.current.visibleCount;
    const factor = e.deltaY > 0 ? 1.15 : 1 / 1.15;
    const next = Math.max(10, Math.min(500, Math.round(cur * factor)));
    if (next !== cur) {
      viewRef.current.visibleCount = next;
      drawChart();
    }
  }, [drawChart]);

  // 드래그 팬
  const onMouseDown = useCallback((e) => {
    if (rangeModeRef.current) return; // 기간 선택 모드에서는 드래그-팬 차단
    const total = candles.length;
    if (!total) return;
    const isFollowing = viewRef.current.rightIndex == null;
    const rightIdx = isFollowing ? total - 1 : viewRef.current.rightIndex;
    dragRef.current = { active: true, startX: e.clientX, startRightIndex: rightIdx, wasFollowing: isFollowing };
    canvasRef.current?.classList.add('dragging');
  }, [candles.length]);

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current.active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width - 64 - 16;
    const visibleCount = viewRef.current.visibleCount;
    const slot = w / Math.max(1, visibleCount);
    const dx = e.clientX - dragRef.current.startX;
    const idxShift = Math.round(dx / slot);
    const total = candles.length;
    if (!total) return;
    let next = dragRef.current.startRightIndex - idxShift;
    const minRight = Math.min(total - 1, visibleCount - 1);
    next = Math.max(minRight, Math.min(total - 1, next));
    const newRight = next >= total - 1 ? null : next; // 최신에 닿으면 다시 추종 모드
    if (newRight !== viewRef.current.rightIndex) {
      viewRef.current.rightIndex = newRight;
      drawChart();
    }
  }, [candles.length, drawChart]);

  const onMouseUp = useCallback(() => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      canvasRef.current?.classList.remove('dragging');
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener('wheel', onWheel, { passive: false });
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('click', onCanvasClick);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      canvas.removeEventListener('wheel', onWheel);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('click', onCanvasClick);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onWheel, onMouseDown, onMouseMove, onMouseUp, onCanvasClick]);

  // 시간단위 변경 시 뷰 리셋
  const switchTimeframe = (key) => {
    if (key === timeframe) return;
    const defaultVisible = key === '1m' ? 60 : 20;
    viewRef.current = { rightIndex: null, visibleCount: defaultVisible };
    setTimeframe(key);
  };

  // 바구니 변경 → 다른 종목으로 이동
  const onBasketChange = (e) => {
    const code = e.target.value;
    if (code && code !== stockCode) {
      window.location.href = `/stock-detail.html?code=${encodeURIComponent(code)}`;
    }
  };

  // 표시용 이름 (백엔드 > 마스터 > 코드)
  const displayName =
    stock?.stockName || stock?.name ||
    stockMeta?.name ||
    (stockErr ? stockErr : (basket.find((b) => b.stockCode === stockCode)?.name) || stockCode);
  const displayMarket = stock?.market || stockMeta?.market;
  const displaySummary = stock?.summary;

  const inBasket = useMemo(() => basket.some((b) => b.stockCode === stockCode), [basket, stockCode]);

  const toggleBasket = async () => {
    setActionMsg('');
    try {
      if (inBasket) {
        await removeFromBasket(stockCode);
        setBasket((prev) => prev.filter((b) => b.stockCode !== stockCode));
        setActionMsg('바구니에서 제거되었습니다.');
      } else {
        await addToBasket(stockCode);
        const res = await getBasket();
        setBasket(res?.data || []);
        setActionMsg('바구니에 추가되었습니다.');
      }
    } catch (err) {
      const code = err.response?.data?.code;
      if (code === 'STOCK_409') setActionMsg('이미 바구니에 있는 종목입니다.');
      else if (code === 'STOCK_404') setActionMsg('존재하지 않는 종목입니다.');
      else if (code === 'STOCK_400') setActionMsg('바구니는 최대 20개까지 담을 수 있습니다.');
      else setActionMsg('처리에 실패했습니다.');
    }
  };

  const change = currentPrice != null && prevClose != null ? currentPrice - prevClose : null;
  const changePct = change != null && prevClose ? (change / prevClose) * 100 : null;
  const isUp = change != null ? change >= 0 : null;

  const counts = news.reduce((acc, n) => {
    const k = sentimentClass(n.sentimentType);
    acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, {});

  // 바구니에 현재 종목이 없으면 선택 옵션에 추가해 표시 (혼란 방지)
  const basketOptions = useMemo(() => {
    const arr = [...basket];
    if (!arr.some((b) => b.stockCode === stockCode)) {
      arr.unshift({ stockCode, name: displayName });
    }
    return arr;
  }, [basket, stockCode, displayName]);

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
          <a href="news.html" className="nav-item"><span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>📰</span> 뉴스 피드</a>
          <a href="stocks.html" className="nav-item"><span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>🧺</span> 내 바구니</a>
          <a href="shared-baskets.html" className="nav-item"><span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>👥</span> 공용 바구니</a>
          <a href="stock-detail.html" className="nav-item active"><span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>🔍</span> 종목 분석</a>
          <div className="nav-section">설정</div>
          <a href="settings.html" className="nav-item"><span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>🔔</span> 알림 설정</a>
          <a href="account.html" className="nav-item"><span style={{ fontSize: '14px', width: '20px', textAlign: 'center' }}>⚙️</span> 계정 설정</a>
        </nav>
        <SidebarUserCard />
      </aside>

      <div className="main">
        <div className="stock-hero">
          <div className="stock-hero-left">
            <div className="stock-avatar">💠</div>
            <div className="stock-hero-info">
              <div className="stock-name-row">
                <h1>{displayName}</h1>
                {basketOptions.length > 0 && (
                  <select
                    className="basket-select"
                    value={stockCode}
                    onChange={onBasketChange}
                    title="다른 보유 종목 선택"
                  >
                    {basketOptions.map((b) => (
                      <option key={b.stockCode} value={b.stockCode}>
                        {b.name} ({b.stockCode})
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <div className="stock-meta">
                <span className="stock-ticker">{stockCode}</span>
                {displayMarket && <span className="stock-ticker">{displayMarket}</span>}
                {displaySummary && <span className="stock-summary-short">{displaySummary}</span>}
              </div>
            </div>
          </div>
          <div className="stock-hero-right">
            <div className="price-block">
              <div className="price-main">
                {currentPrice != null ? `₩${Number(currentPrice).toLocaleString()}` : '—'}
              </div>
              <div className={`price-change ${isUp ? 'up' : isUp === false ? 'down' : ''}`}>
                {change != null
                  ? `${isUp ? '▲' : '▼'} ${Math.abs(change).toLocaleString(undefined, { maximumFractionDigits: 0 })} (${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%)`
                  : '실시간 대기 중'}
              </div>
              <div className="price-time">
                {lastTickAt ? new Date(lastTickAt).toLocaleTimeString('ko-KR') + ' 기준' : '—'}
              </div>
            </div>
            <div className="hero-actions">
              <button className="btn btn-primary btn-sm" onClick={toggleBasket}>
                {inBasket ? '✓ 바구니' : '+ 바구니 담기'}
              </button>
              <button
                className="btn btn-ghost btn-sm theme-btn"
                id="themeBtn"
                title="테마 전환"
                onClick={() => window.__toggleTheme && window.__toggleTheme()}
              >
                🌙
              </button>
            </div>
          </div>
        </div>

        {actionMsg && (
          <div style={{ padding: '8px 32px', fontSize: '12px', color: 'var(--text-secondary)', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
            {actionMsg}
          </div>
        )}

        <div className="detail-body">
          <div>
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-label">오늘 수집 뉴스</div>
                <div className="stat-value" style={{ color: 'var(--accent)' }}>{news.length}건</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">호재</div>
                <div className="stat-value" style={{ color: 'var(--positive)' }}>{counts.good || 0}건</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">악재</div>
                <div className="stat-value" style={{ color: 'var(--negative)' }}>{counts.bad || 0}건</div>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div className="chart-title">
                  <span className="live-dot"></span>가격 차트 ({TIMEFRAMES.find((x) => x.key === timeframe)?.label})
                </div>
                <div className="tf-tabs">
                  {TIMEFRAMES.map((tf) => (
                    <button
                      key={tf.key}
                      className={`tf-tab ${timeframe === tf.key ? 'active' : ''}`}
                      onClick={() => switchTimeframe(tf.key)}
                    >
                      {tf.label}
                    </button>
                  ))}
                  <button
                    className={`xhair-btn ${crosshairEnabled ? 'active' : ''}`}
                    onClick={() => setCrosshairEnabled((v) => !v)}
                    title="십자선 ON/OFF"
                  >
                    ╋
                  </button>
                  <button
                    className={`range-btn ${rangeMode ? 'active' : ''}`}
                    onClick={() => setRangeMode((v) => !v)}
                    disabled={timeframe === '1w'}
                    title={timeframe === '1w' ? '주봉에서는 사용 불가' : '기간 선택 (두 번 클릭)'}
                  >
                    기간
                  </button>
                </div>
                <div className="chart-hint">
                  {candles.length}봉 · 휠: 줌 · 드래그: 이동
                  {crosshairEnabled ? ' · 십자선 ON' : ''}
                  {rangeMode ? ' · 기간 선택 ON (클릭 2회)' : ''}
                </div>
              </div>
              <canvas ref={canvasRef} id="chartCanvas" height="320"></canvas>
            </div>

            <div className="chart-card" style={{ paddingBottom: '8px' }}>
              <div className="chart-header" style={{ marginBottom: '10px' }}>
                <div className="chart-title">📋 종목 관련 뉴스</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: "'DM Mono',monospace" }}>
                  {news.length}건
                </div>
              </div>
              <div className="news-timeline">
                {newsLoading ? (
                  <div className="empty-state">불러오는 중...</div>
                ) : news.length === 0 ? (
                  <div className="empty-state">관련 뉴스가 없습니다.</div>
                ) : (
                  news.map((n) => {
                    const k = sentimentClass(n.sentimentType);
                    return (
                      <a key={n.id} href={`news-detail.html?id=${n.id}`} className={`news-item ${k}`}>
                        <div className={`news-score-circle ${k}`}>
                          <div className="news-score-num">{n.impactScore ?? '-'}</div>
                        </div>
                        <div className="news-item-body">
                          <div className="news-item-meta">
                            <span className={`chip chip-${k}`}>{sentimentLabel(n.sentimentType)}</span>
                            {n.publisher && <span className="chip chip-gray">{n.publisher}</span>}
                            <span className="news-time">{formatTime(n.publishedAt)}</span>
                          </div>
                          <div className="news-item-title">{n.headline}</div>
                          {n.summary && <div className="news-item-excerpt">{n.summary}</div>}
                        </div>
                      </a>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="right-col">
            {(rangeSel.startIdx != null || rangeNewsLoading) && (
              <div className="range-news-panel">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div className="panel-title">📅 기간 뉴스</div>
                  <button className="range-clear-btn" onClick={clearRange}>지우기</button>
                </div>
                <div className="panel-sub">
                  {rangeLabel || '선택 진행 중'}
                  {rangeSel.endIdx != null && !rangeNewsLoading && ` · ${rangeNews.length}건`}
                </div>
                {rangeSel.endIdx == null ? (
                  <div className="empty-state" style={{ padding: '16px 8px' }}>차트에서 끝점을 클릭하세요.</div>
                ) : rangeNewsLoading ? (
                  <div className="empty-state" style={{ padding: '16px 8px' }}>불러오는 중...</div>
                ) : rangeNewsErr ? (
                  <div className="empty-state" style={{ padding: '16px 8px' }}>{rangeNewsErr}</div>
                ) : rangeNews.length === 0 ? (
                  <div className="empty-state" style={{ padding: '16px 8px' }}>해당 기간 뉴스 없음</div>
                ) : (
                  rangeNews.map((n) => {
                    const k = sentimentClass(n.sentimentType);
                    return (
                      <a key={n.id} href={`news-detail.html?id=${n.id}`} className={`range-news-item ${k}`}>
                        <div className="range-news-meta">
                          <span>{sentimentLabel(n.sentimentType)}</span>
                          {n.publisher && (<><span>·</span><span>{n.publisher}</span></>)}
                          <span style={{ marginLeft: 'auto' }}>{formatTime(n.publishedAt)}</span>
                        </div>
                        <div className="range-news-title">{n.title || n.headline}</div>
                      </a>
                    );
                  })
                )}
              </div>
            )}

            <div className="widget">
              <div className="widget-title">📊 종목 정보</div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                <div><strong style={{ color: 'var(--text-primary)' }}>종목명</strong> · {displayName}</div>
                <div><strong style={{ color: 'var(--text-primary)' }}>종목 코드</strong> · {stockCode}</div>
                {displayMarket && <div><strong style={{ color: 'var(--text-primary)' }}>시장</strong> · {displayMarket}</div>}
                {displaySummary && <div style={{ marginTop: 8 }}>{displaySummary}</div>}
              </div>
            </div>

            <div className="widget">
              <div className="widget-title">🔔 이 종목 알림</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                전역 알림 설정은 <a href="settings.html" style={{ color: 'var(--accent)' }}>알림 설정</a> 페이지에서 관리할 수 있습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
