import axios from './axiosConfig.js';

// 9-1. 유저 검색 (초대 전 확인)
export async function searchUser(email) {
  const { data } = await axios.get('/api/shared-baskets/users/search', {
    params: { email },
  });
  return data;
}

// 9-2. 공용 바구니 생성
export async function createBasket(name) {
  const { data } = await axios.post('/api/shared-baskets', { name });
  return data;
}

// 9-3. 내 공용 바구니 목록 조회
export async function listBaskets() {
  const { data } = await axios.get('/api/shared-baskets');
  return data;
}

// 9-4. 공용 바구니 상세 조회
export async function getBasket(basketId) {
  const { data } = await axios.get(`/api/shared-baskets/${encodeURIComponent(basketId)}`);
  return data;
}

// 9-5. 공용 바구니 삭제 (소유자 전용)
export async function deleteBasket(basketId) {
  const { data } = await axios.delete(`/api/shared-baskets/${encodeURIComponent(basketId)}`);
  return data;
}

// 9-6. 유저 초대 (이메일 발송)
export async function inviteUser(basketId, email) {
  const { data } = await axios.post(
    `/api/shared-baskets/${encodeURIComponent(basketId)}/invite`,
    { email },
  );
  return data;
}

// 9-7. 초대 수락
export async function acceptInvitation(token) {
  const { data } = await axios.post('/api/shared-baskets/invitations/accept', null, {
    params: { token },
  });
  return data;
}

// 9-8. 바구니 나가기
export async function leaveBasket(basketId) {
  const { data } = await axios.delete(`/api/shared-baskets/${encodeURIComponent(basketId)}/leave`);
  return data;
}

// 9-9. 멤버 강제 퇴장 (소유자 전용)
export async function kickMember(basketId, memberId) {
  const { data } = await axios.delete(
    `/api/shared-baskets/${encodeURIComponent(basketId)}/members/${encodeURIComponent(memberId)}`,
  );
  return data;
}

// 9-10. 공용 바구니에 종목 추가
export async function addStock(basketId, stockCode) {
  const { data } = await axios.post(
    `/api/shared-baskets/${encodeURIComponent(basketId)}/stocks`,
    { stockCode },
  );
  return data;
}

// 9-11. 공용 바구니에서 종목 제거
export async function removeStock(basketId, stockCode) {
  const { data } = await axios.delete(
    `/api/shared-baskets/${encodeURIComponent(basketId)}/stocks/${encodeURIComponent(stockCode)}`,
  );
  return data;
}
