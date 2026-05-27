import { useEffect, useState } from 'react';
import { me, logout, isLoggedIn } from '../api/users.js';

/**
 * 사이드바 좌측 하단의 로그인 상태 표시 카드.
 *  - 마운트 시 GET /api/users/me 호출하여 닉네임 표시
 *  - 클릭 시 로그아웃 (비로그인 상태이면 로그인 페이지로 이동)
 *
 * 스타일을 인라인으로 두어, 페이지별 CSS 존재 여부에 의존하지 않는다.
 */
const wrapStyle = {
  padding: '12px',
  borderTop: '1px solid var(--border)',
};
const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '9px',
  padding: '8px 10px',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 0.15s',
};
const avatarStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  fontWeight: 700,
  color: '#fff',
  flexShrink: 0,
};
const nameStyle = {
  fontSize: '12.5px',
  fontWeight: 600,
  color: 'var(--text-primary)',
};
const planStyle = {
  fontSize: '9.5px',
  color: 'var(--accent)',
  fontFamily: "'DM Mono', monospace",
};

export default function SidebarUserCard() {
  const [nickname, setNickname] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [hover, setHover] = useState(false);
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!loggedIn) {
      setLoaded(true);
      return;
    }
    (async () => {
      try {
        const res = await me();
        setNickname(res?.data?.nickname || null);
      } catch {
        // 401 은 axios 인터셉터가 처리
      } finally {
        setLoaded(true);
      }
    })();
  }, [loggedIn]);

  const handleClick = () => {
    if (!loggedIn) {
      window.location.href = '/login.html';
      return;
    }
    if (confirm('로그아웃하시겠습니까?')) logout();
  };

  const name = loggedIn ? (nickname || (loaded ? '...' : '...')) : '로그인';
  const initial = (nickname || (loggedIn ? '?' : '↪')).slice(0, 1);
  const plan = loggedIn ? 'USER' : 'GUEST';

  return (
    <div style={wrapStyle}>
      <div
        style={{ ...cardStyle, background: hover ? 'var(--card)' : 'transparent' }}
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        title={loggedIn ? '클릭하여 로그아웃' : '로그인'}
      >
        <div style={avatarStyle}>{initial}</div>
        <div>
          <div style={nameStyle}>{name}</div>
          <div style={planStyle}>{plan}</div>
        </div>
      </div>
    </div>
  );
}
