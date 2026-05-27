import * as auth from './auth.js';
import * as users from './users.js';
import * as stocks from './stocks.js';
import * as news from './news.js';
import * as alerts from './alerts.js';
import * as sharedBaskets from './sharedBaskets.js';
import { subscribeChart } from './chart.js';

export const api = {
  auth,
  users,
  stocks,
  news,
  alerts,
  sharedBaskets,
  chart: { subscribeChart },
};

// 레거시 스크립트 핸들러에서도 호출 가능하도록 전역 등록
if (typeof window !== 'undefined') {
  window.api = api;
}

export default api;
