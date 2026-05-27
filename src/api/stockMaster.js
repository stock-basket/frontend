/**
 * KRX 종목 마스터 (KOSPI + KOSDAQ) 로더.
 *  - public/krx_stocks.json 을 1회 fetch 해서 메모리에 캐싱한다.
 *  - 동시에 여러 호출자가 와도 한 번만 요청 (pending promise 공유).
 *
 * 종목 데이터 구조:
 *   { code: string, name: string, market: 'KOSPI' | 'KOSDAQ' }
 */

let _cache = null;
let _byCode = null;
let _loading = null;

export function loadStockMaster() {
  if (_cache) return Promise.resolve(_cache);
  if (_loading) return _loading;
  _loading = fetch('/krx_stocks.json')
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => [])
    .then((arr) => {
      _cache = Array.isArray(arr) ? arr : [];
      _byCode = new Map(_cache.map((s) => [s.code, s]));
      return _cache;
    });
  return _loading;
}

export function getStockMeta(code) {
  if (!_byCode) return null;
  return _byCode.get(code) || null;
}

export function getStockName(code) {
  return getStockMeta(code)?.name || null;
}
