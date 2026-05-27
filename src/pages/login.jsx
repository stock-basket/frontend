import { useState } from 'react';
import { useLegacyPage } from '../hooks/useLegacyPage.js';
import { login as loginApi } from '../api/users.js';

const pageStyles = "\nbody {\n  min-height: 100vh;\n}\n#root {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  min-height: 100vh;\n}\n\n/* ── LEFT PANEL ── */\n.left-panel {\n  background: var(--surface);\n  border-right: 1px solid var(--border);\n  display: flex;\n  flex-direction: column;\n  padding: 48px;\n  position: relative;\n  overflow: hidden;\n}\n.left-panel::before {\n  content: '';\n  position: absolute;\n  bottom: -120px; left: -60px;\n  width: 400px; height: 400px;\n  background: radial-gradient(circle, rgba(129,140,248,0.08), transparent 65%);\n  pointer-events: none;\n}\n.logo-wrap { display: flex; align-items: center; gap: 10px; margin-bottom: auto; }\n.left-content { margin-top: auto; padding-bottom: 20px; }\n.left-heading {\n  font-size: 34px; font-weight: 900;\n  letter-spacing: -1.5px; line-height: 1.15; margin-bottom: 16px;\n}\n.left-heading .c-positive { color: var(--positive); }\n.left-heading .c-negative { color: var(--negative); }\n.left-heading .c-accent { color: var(--accent); }\n.left-desc { font-size: 14px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 32px; }\n\n.mini-news-stack { display: flex; flex-direction: column; gap: 8px; }\n.mini-news-item {\n  background: var(--card); border: 1px solid var(--border);\n  border-radius: 8px; padding: 11px 14px;\n  display: flex; gap: 10px; align-items: flex-start;\n  border-left: 3px solid transparent;\n}\n.mini-news-item.good { border-left-color: var(--positive); }\n.mini-news-item.bad  { border-left-color: var(--negative); }\n.mini-news-item.mid  { border-left-color: var(--neutral); }\n.mini-chip {\n  font-size: 9px; padding: 2px 7px; border-radius: 4px;\n  font-family: 'DM Mono', monospace; font-weight: 700; flex-shrink: 0;\n}\n.mini-chip.good { background: var(--positive-bg); color: var(--positive); }\n.mini-chip.bad  { background: var(--negative-bg); color: var(--negative); }\n.mini-chip.mid  { background: var(--neutral-bg); color: var(--neutral); }\n.mini-news-title { font-size: 11.5px; color: var(--text-secondary); line-height: 1.45; }\n.mini-impact-row { display: flex; align-items: center; gap: 6px; margin-top: 5px; }\n.mini-impact-label { font-size: 9px; color: var(--text-muted); font-family: 'DM Mono', monospace; }\n.mini-bar { flex: 1; height: 3px; background: var(--border); border-radius: 2px; overflow: hidden; }\n.mini-bar-fill { height: 100%; border-radius: 2px; }\n\n/* ── RIGHT PANEL ── */\n.right-panel {\n  display: flex; align-items: center; justify-content: center;\n  padding: 60px;\n  background: var(--bg);\n}\n.form-box { width: 100%; max-width: 380px; }\n.form-title { font-size: 26px; font-weight: 800; letter-spacing: -0.8px; margin-bottom: 6px; }\n.form-sub { font-size: 13.5px; color: var(--text-secondary); margin-bottom: 32px; }\n\n.input-wrap { position: relative; }\n.input-wrap .input { padding-right: 46px; }\n.toggle-pw {\n  position: absolute; right: 14px; top: 50%; transform: translateY(-50%);\n  background: none; border: none; cursor: pointer;\n  color: var(--text-muted); font-size: 16px; transition: color 0.15s;\n}\n.toggle-pw:hover { color: var(--text-secondary); }\n\n.form-options {\n  display: flex; align-items: center; justify-content: space-between;\n  margin-bottom: 22px; margin-top: -4px;\n}\n.checkbox-wrap { display: flex; align-items: center; gap: 7px; cursor: pointer; }\n.checkbox-wrap input[type=\"checkbox\"] { accent-color: var(--accent); width: 14px; height: 14px; }\n.checkbox-label { font-size: 12.5px; color: var(--text-secondary); }\n.forgot-link { font-size: 12.5px; color: var(--accent); }\n.forgot-link:hover { text-decoration: underline; }\n\n.btn-login {\n  width: 100%; padding: 14px; border-radius: 8px;\n  border: none; cursor: pointer;\n  background: var(--accent); color: #fff;\n  font-size: 15px; font-weight: 700;\n  font-family: 'Noto Sans KR', sans-serif;\n  transition: all 0.15s;\n}\n.btn-login:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.3); }\n.btn-login:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }\n.login-error { font-size: 12px; color: var(--negative); margin-top: -8px; margin-bottom: 12px; }\n\n.register-link { text-align: center; margin-top: 22px; font-size: 13px; color: var(--text-secondary); }\n.register-link a { color: var(--accent); font-weight: 600; }\n.register-link a:hover { text-decoration: underline; }\n\n.theme-toggle-btn {\n  position: fixed; top: 20px; right: 20px;\n  width: 36px; height: 36px; border-radius: 8px;\n  background: var(--card); border: 1px solid var(--border);\n  cursor: pointer; font-size: 16px;\n  display: flex; align-items: center; justify-content: center;\n  transition: all 0.15s; z-index: 10;\n}\n.theme-toggle-btn:hover { background: var(--card-hover); }\n";
const pageScripts = "\n// Theme\nfunction applyTheme(theme) {\n  const root = document.documentElement;\n  if (theme === 'light') {\n    root.classList.add('theme-light');\n    root.classList.remove('theme-dark');\n    root.setAttribute('data-theme','light');\n    document.getElementById('themeBtn').textContent = '☀️';\n  } else {\n    root.classList.remove('theme-light');\n    root.classList.add('theme-dark');\n    root.setAttribute('data-theme','dark');\n    document.getElementById('themeBtn').textContent = '🌙';\n  }\n  localStorage.setItem('theme', theme);\n}\nfunction toggleTheme() {\n  const current = localStorage.getItem('theme') ||\n    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n  applyTheme(current === 'dark' ? 'light' : 'dark');\n}\n(function() {\n  const saved = localStorage.getItem('theme');\n  if (saved) { applyTheme(saved); }\n  else if (window.matchMedia('(prefers-color-scheme: light)').matches) { applyTheme('light'); }\n  else { document.getElementById('themeBtn').textContent = '🌙'; }\n})();\n";

export default function Login() {
  useLegacyPage({ title: "로그인 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력하세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await loginApi(email, password);
      const token = res?.data?.accessToken;
      if (!token) throw new Error('No token in response');
      localStorage.setItem('accessToken', token);
      window.location.href = '/stocks.html';
    } catch (err) {
      const code = err?.response?.data?.code;
      const msg = err?.response?.data?.message;
      if (code === 'USER_401') setError('이메일 또는 비밀번호가 일치하지 않습니다.');
      else if (code === 'VALID_400') setError(msg || '입력값을 확인해주세요.');
      else setError(msg || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="theme-toggle-btn" onClick={() => { toggleTheme(); }} id="themeBtn" title="테마 전환">
        🌙
      </button>
      <div className="left-panel">
        <div className="logo-wrap">
          <div className="logo-icon">🧺</div>
          <div>
            <div className="logo-text">주식 바구니</div>
            <div className="logo-sub">AI NEWS INTELLIGENCE</div>
          </div>
        </div>
        <div className="left-content">
          <h2 className="left-heading">
            <span className="c-positive">호재</span>와 <span className="c-negative">악재</span>,
            <br />
            <span className="c-accent">한눈</span>에 보세요
          </h2>
          <p className="left-desc">
            AI가 분석한 뉴스 영향력을 시각적으로 확인하고
            <br />
            더 빠른 투자 결정을 내리세요.
          </p>
        </div>
      </div>
      <div className="right-panel">
        <form className="form-box" onSubmit={onSubmit}>
          <h1 className="form-title">다시 오셨군요 👋</h1>
          <p className="form-sub">계정에 로그인하여 오늘의 뉴스를 확인하세요</p>
          <div className="input-group">
            <label className="input-label">이메일</label>
            <input
              type="email"
              className="input"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <label className="input-label">비밀번호</label>
            <div className="input-wrap">
              <input
                type={showPw ? 'text' : 'password'}
                className="input"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPw((v) => !v)}
              >
                👁
              </button>
            </div>
          </div>
          {error && <div className="login-error">{error}</div>}
          <div className="form-options">
            <label className="checkbox-wrap">
              <input type="checkbox" />
              <span className="checkbox-label">로그인 상태 유지</span>
            </label>
            <a href="#" className="forgot-link">비밀번호 찾기</a>
          </div>
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
          <p className="register-link">
            아직 계정이 없으신가요? <a href="register.html">무료 회원가입</a>
          </p>
        </form>
      </div>
    </>
  );
}
