import axios from './axiosConfig.js';

export async function getAlerts() {
  const { data } = await axios.get('/api/alerts');
  return data;
}

export async function getUnreadAlerts() {
  const { data } = await axios.get('/api/alerts/unread');
  return data;
}

export async function getUnreadAlertCount() {
  const { data } = await axios.get('/api/alerts/unread/count');
  return data;
}

export async function markAlertRead(alertId) {
  const { data } = await axios.patch(`/api/alerts/${encodeURIComponent(alertId)}/read`);
  return data;
}

export async function markAllAlertsRead() {
  const { data } = await axios.patch('/api/alerts/read-all');
  return data;
}
