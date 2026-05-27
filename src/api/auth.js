import axios from './axiosConfig.js';

// 회원가입 이메일 인증
export async function sendEmailCode(email) {
  const { data } = await axios.post('/api/auth/email/send', { email });
  return data;
}

export async function verifyEmailCode(email, code) {
  const { data } = await axios.post('/api/auth/email/verify', { email, code });
  // data.data 는 verifiedToken (JWT 문자열)
  return data;
}
