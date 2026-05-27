import axiosInstance, { API_BASE } from './axiosConfig.js';

export async function getMinuteCandles(stockCode) {
  const res = await axiosInstance.get(`/api/chart/${encodeURIComponent(stockCode)}/candles/minutes`);
  return res.data;
}

export async function getDailyCandles(stockCode, { before, limit } = {}) {
  const params = {};
  if (before != null) params.before = before;
  if (limit != null) params.limit = limit;
  const res = await axiosInstance.get(`/api/chart/${encodeURIComponent(stockCode)}/candles/daily`, { params });
  return res.data;
}

export async function getWeeklyCandles(stockCode, { before, limit } = {}) {
  const params = {};
  if (before != null) params.before = before;
  if (limit != null) params.limit = limit;
  const res = await axiosInstance.get(`/api/chart/${encodeURIComponent(stockCode)}/candles/weekly`, { params });
  return res.data;
}

/**
 * 실시간 가격 SSE 구독. EventSource 는 Authorization 헤더를 지원하지 않으므로
 * fetch 기반 ReadableStream 으로 직접 SSE 를 파싱한다.
 *
 * @param {string} stockCode 종목 코드
 * @param {{ onSnapshot?: (data) => void, onTick?: (data) => void, onError?: (err) => void }} handlers
 * @returns {() => void} 구독 해제 함수
 */
export function subscribeChart(stockCode, handlers = {}) {
  const controller = new AbortController();
  const token = localStorage.getItem('accessToken');
  const url = `${API_BASE}/api/chart/${encodeURIComponent(stockCode)}/stream`;

  (async () => {
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'text/event-stream',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        handlers.onError?.(new Error(`SSE connect failed: ${res.status}`));
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = '';

      const dispatch = (event, payload) => {
        try {
          const data = JSON.parse(payload);
          if (event === 'snapshot') handlers.onSnapshot?.(data);
          else if (event === 'tick') handlers.onTick?.(data);
        } catch (e) {
          // ignore parse errors
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });

        let idx;
        while ((idx = buf.indexOf('\n\n')) !== -1) {
          const raw = buf.slice(0, idx);
          buf = buf.slice(idx + 2);

          let event = 'message';
          let dataLines = [];
          for (const line of raw.split('\n')) {
            if (line.startsWith('event:')) event = line.slice(6).trim();
            else if (line.startsWith('data:')) dataLines.push(line.slice(5).trimStart());
          }
          if (dataLines.length) dispatch(event, dataLines.join('\n'));
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') handlers.onError?.(err);
    }
  })();

  return () => controller.abort();
}
