import axios from './axiosConfig.js';

export async function register(verifiedToken, body) {
  // body: { password, nickname, newsletterAlert, volatilityAlert }
  const { data } = await axios.post('/api/users/register', body, {
    headers: { 'X-Verified-Token': verifiedToken },
  });
  return data;
}

export async function login(email, password) {
  const { data } = await axios.post('/api/users/login', { email, password });
  // data.data.accessToken
  return data;
}

export async function me() {
  const { data } = await axios.get('/api/users/me');
  return data;
}

export async function deleteMe() {
  const { data } = await axios.delete('/api/users/me');
  return data;
}

export async function updateNickname(nickname) {
  const { data } = await axios.patch('/api/users/me/account', { nickname });
  return data;
}

export async function updatePassword(currentPassword, newPassword) {
  const { data } = await axios.patch('/api/users/me/password', { currentPassword, newPassword });
  return data;
}

export async function updateAlertSettings(settings) {
  // settings: { isGlobalAlertEnabled, isVolatilityAlertEnabled, volatilityThresholdPercent,
  //             isBadNewsAlertEnabled, isGoodNewsAlertEnabled, newsImpactThreshold, isEmailAlertEnabled }
  const { data } = await axios.patch('/api/users/me/alert-settings', settings);
  return data;
}

export function logout() {
  localStorage.removeItem('accessToken');
  window.location.href = '/login.html';
}

export function isLoggedIn() {
  return !!localStorage.getItem('accessToken');
}
