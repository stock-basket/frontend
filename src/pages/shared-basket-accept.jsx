import { useEffect, useState } from 'react';
import { useLegacyPage } from '../hooks/useLegacyPage.js';
import { acceptInvitation } from '../api/sharedBaskets.js';
import { isLoggedIn } from '../api/users.js';

const pageStyles = `
.wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; background: var(--bg); }
.card { width: 100%; max-width: 460px; background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 36px 32px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.25); }
.icon { font-size: 44px; margin-bottom: 14px; }
.title { font-size: 22px; font-weight: 800; margin-bottom: 8px; letter-spacing: -0.5px; }
.sub { font-size: 13.5px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 22px; }
.basket-info { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 16px; margin-bottom: 22px; text-align: left; }
.basket-info .label { font-size: 10px; font-family: 'DM Mono', monospace; letter-spacing: 1.5px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; }
.basket-info .name { font-size: 17px; font-weight: 700; margin-bottom: 4px; }
.basket-info .owner { font-size: 12px; color: var(--text-muted); font-family: 'DM Mono', monospace; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 11px 22px; border-radius: 7px; font-size: 13.5px; font-weight: 700; cursor: pointer; border: none; font-family: 'Noto Sans KR', sans-serif; }
.btn-primary { background: var(--accent); color: #fff; }
.btn-ghost { background: var(--surface); color: var(--text-secondary); border: 1px solid var(--border); }
.btn-row { display: flex; gap: 8px; justify-content: center; }
.error { color: var(--negative); font-size: 13px; margin-bottom: 18px; font-family: 'DM Mono', monospace; }
`;

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function SharedBasketAccept() {
  useLegacyPage({ title: '공용 바구니 초대 — 주식 바구니', styles: pageStyles });

  const [state, setState] = useState({ status: 'pending', data: null, error: null });

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const token = sp.get('token');

    if (!token) {
      setState({ status: 'error', error: '잘못된 초대 링크입니다. (토큰 누락)' });
      return;
    }

    if (!isLoggedIn()) {
      const next = encodeURIComponent(`/shared-basket-accept.html?token=${encodeURIComponent(token)}`);
      window.location.href = `/login.html?next=${next}`;
      return;
    }

    (async () => {
      try {
        const res = await acceptInvitation(token);
        setState({ status: 'success', data: res?.data || null });
      } catch (err) {
        const code = err?.response?.data?.code;
        const map = {
          SHARED_404_INVITE: '존재하지 않는 초대입니다.',
          SHARED_403_INVITE: '본인에게 발송된 초대가 아닙니다. 초대받은 계정으로 로그인해주세요.',
          SHARED_409_ACCEPTED: '이미 수락한 초대입니다.',
          SHARED_400_EXPIRED: '만료된 초대입니다. (48시간 초과)',
        };
        setState({ status: 'error', error: map[code] || err?.response?.data?.message || '초대 수락에 실패했습니다.' });
      }
    })();
  }, []);

  return (
    <div className="wrap">
      <div className="card">
        {state.status === 'pending' && (
          <>
            <div className="icon">⏳</div>
            <div className="title">초대 확인 중...</div>
            <div className="sub">잠시만 기다려주세요.</div>
          </>
        )}

        {state.status === 'success' && (
          <>
            <div className="icon">🎉</div>
            <div className="title">바구니에 합류했어요!</div>
            <div className="sub">아래 바구니의 멤버로 등록되었습니다. 지금 바로 이동해서 함께 종목을 관리해보세요.</div>
            {state.data && (
              <div className="basket-info">
                <div className="label">JOINED BASKET</div>
                <div className="name">{state.data.name}</div>
                <div className="owner">소유자 · {state.data.ownerNickname}</div>
              </div>
            )}
            <div className="btn-row">
              {state.data?.id && (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/shared-basket-detail.html?id=${encodeURIComponent(state.data.id)}`)}
                >
                  바구니로 이동
                </button>
              )}
              <button className="btn btn-ghost" onClick={() => navigate('/shared-baskets.html')}>
                전체 목록
              </button>
            </div>
          </>
        )}

        {state.status === 'error' && (
          <>
            <div className="icon">⚠️</div>
            <div className="title">초대를 처리할 수 없어요</div>
            <div className="error">{state.error}</div>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => navigate('/shared-baskets.html')}>
                공용 바구니로 가기
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
