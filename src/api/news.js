import axios from './axiosConfig.js';

export async function getNewsFeed({ sentiment, page = 0, size = 10 } = {}) {
  const params = { page, size };
  if (sentiment) params.sentiment = sentiment;
  const { data } = await axios.get('/api/news', { params });
  return data;
}

export async function getNewsDetail(newsId) {
  const { data } = await axios.get(`/api/news/${encodeURIComponent(newsId)}`);
  return data;
}

export async function getUrgentNews({ page = 0, size = 5 } = {}) {
  const { data } = await axios.get('/api/news/urgent', { params: { page, size } });
  return data;
}

export async function getNewsByStock(stockCode, { from, to, page = 0, size = 10 } = {}) {
  const params = { page, size };
  if (from && to) {
    params.from = from;
    params.to = to;
  }
  const { data } = await axios.get(`/api/news/stock/${encodeURIComponent(stockCode)}`, { params });
  return data;
}
