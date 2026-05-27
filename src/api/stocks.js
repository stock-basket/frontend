import axios from './axiosConfig.js';

export async function getBasket() {
  const { data } = await axios.get('/api/stocks/basket');
  return data;
}

export async function addToBasket(stockCode) {
  const { data } = await axios.post('/api/stocks/basket', { stockCode });
  return data;
}

export async function removeFromBasket(stockCode) {
  const { data } = await axios.delete(`/api/stocks/basket/${encodeURIComponent(stockCode)}`);
  return data;
}

export async function getStockDetail(stockCode) {
  const { data } = await axios.get(`/api/stocks/${encodeURIComponent(stockCode)}`);
  return data;
}

export async function searchStocks(keyword) {
  const { data } = await axios.get('/api/stocks/search', {
    params: { keyword },
  });
  return data;
}
