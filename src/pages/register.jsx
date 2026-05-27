import { useState } from 'react';
import { useLegacyPage } from '../hooks/useLegacyPage.js';
import { sendEmailCode, verifyEmailCode } from '../api/auth.js';
import { register as registerApi } from '../api/users.js';

const pageStyles = "\nbody {\n  min-height: 100vh;\n}\n#root {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  min-height: 100vh;\n}\n\n/* LEFT */\n.left-panel {\n  background: var(--surface);\n  border-right: 1px solid var(--border);\n  display: flex; flex-direction: column;\n  padding: 48px; position: relative; overflow: hidden;\n}\n.logo-wrap { display: flex; align-items: center; gap: 10px; }\n.left-body { margin-top: auto; }\n.left-heading { font-size: 22px; font-weight: 800; letter-spacing: -0.8px; margin-bottom: 8px; line-height: 1.35; }\n.left-heading .c-accent { color: var(--accent); }\n.left-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 28px; }\n\n/* RIGHT */\n.right-panel {\n  display: flex; align-items: center; justify-content: center;\n  padding: 48px 60px; overflow-y: auto;\n  background: var(--bg);\n}\n.form-box { width: 100%; max-width: 420px; }\n.form-title { font-size: 24px; font-weight: 800; letter-spacing: -0.8px; margin-bottom: 6px; }\n.form-sub { font-size: 13px; color: var(--text-secondary); margin-bottom: 28px; }\n\n.email-verify-row { display: flex; gap: 8px; }\n.email-verify-row .input { flex: 1; }\n.btn-verify {\n  padding: 11px 14px; border-radius: var(--radius-sm);\n  background: var(--accent-bg); border: 1px solid rgba(129,140,248,0.3);\n  color: var(--accent); font-size: 12.5px; font-weight: 700;\n  cursor: pointer; white-space: nowrap; transition: all 0.15s;\n  font-family: 'Noto Sans KR', sans-serif; flex-shrink: 0;\n}\n.btn-verify:hover { background: var(--accent); color: #fff; }\n.btn-verify:disabled { opacity: 0.5; cursor: not-allowed; }\n.btn-verify.sent { background: var(--positive-bg); color: var(--positive); border-color: var(--positive-border); }\n\n.verify-code-wrap { margin-top: 8px; display: flex; gap: 8px; align-items: center; }\n.verify-code-input { flex: 1; letter-spacing: 6px; font-family: 'DM Mono', monospace; font-size: 16px; text-align: center; }\n.btn-confirm {\n  padding: 11px 14px; border-radius: var(--radius-sm);\n  background: var(--positive-bg); border: 1px solid var(--positive-border);\n  color: var(--positive); font-size: 12.5px; font-weight: 700;\n  cursor: pointer; white-space: nowrap; transition: all 0.15s;\n  font-family: 'Noto Sans KR', sans-serif;\n}\n.btn-confirm:hover { background: var(--positive); color: #fff; }\n\n.verify-status { font-size: 11.5px; margin-top: 5px; font-family: 'DM Mono', monospace; }\n.verify-status.success { color: var(--positive); }\n.verify-status.error { color: var(--negative); }\n\n.input-pw-wrap { position: relative; }\n.input-pw-wrap .input { padding-right: 44px; }\n.toggle-pw {\n  position: absolute; right: 13px; top: 50%; transform: translateY(-50%);\n  background: none; border: none; cursor: pointer;\n  color: var(--text-muted); font-size: 15px;\n}\n\n.checkbox-group { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }\n.checkbox-item { display: flex; align-items: flex-start; gap: 9px; }\n.checkbox-item input { accent-color: var(--accent); width: 15px; height: 15px; margin-top: 2px; flex-shrink: 0; }\n.checkbox-item label { font-size: 12.5px; color: var(--text-secondary); line-height: 1.5; cursor: pointer; }\n.checkbox-item label a { color: var(--accent); }\n\n.btn-submit {\n  width: 100%; padding: 14px; border-radius: 8px;\n  border: none; cursor: pointer;\n  background: var(--accent); color: #fff;\n  font-size: 15px; font-weight: 700;\n  font-family: 'Noto Sans KR', sans-serif;\n  transition: all 0.15s; margin-top: 6px;\n}\n.btn-submit:hover { background: var(--accent-hover); }\n.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }\n\n.login-link { text-align: center; margin-top: 18px; font-size: 13px; color: var(--text-secondary); }\n.login-link a { color: var(--accent); font-weight: 600; }\n\n.theme-toggle-btn {\n  position: fixed; top: 20px; right: 20px;\n  width: 36px; height: 36px; border-radius: 8px;\n  background: var(--card); border: 1px solid var(--border);\n  cursor: pointer; font-size: 16px;\n  display: flex; align-items: center; justify-content: center;\n  z-index: 10;\n}\n";
const pageScripts = "\nfunction applyTheme(t){const r=document.documentElement;if(t==='light'){r.classList.add('theme-light');r.classList.remove('theme-dark');r.setAttribute('data-theme','light');document.getElementById('themeBtn').textContent='☀️';}else{r.classList.remove('theme-light');r.classList.add('theme-dark');r.setAttribute('data-theme','dark');document.getElementById('themeBtn').textContent='🌙';}localStorage.setItem('theme',t);}\nfunction toggleTheme(){const c=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');applyTheme(c==='dark'?'light':'dark');}\n(function(){const s=localStorage.getItem('theme');if(s)applyTheme(s);else if(window.matchMedia('(prefers-color-scheme: light)').matches)applyTheme('light');else document.getElementById('themeBtn').textContent='🌙';})();\n";

export default function Register() {
  useLegacyPage({ title: "회원가입 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verifiedToken, setVerifiedToken] = useState(null);
  const [verifyMsg, setVerifyMsg] = useState({ text: '', kind: '' });
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [termsOk, setTermsOk] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [volatility, setVolatility] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const emailVerified = !!verifiedToken;

  const handleSendCode = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setVerifyMsg({ text: '올바른 이메일 주소를 입력해주세요.', kind: 'error' });
      return;
    }
    try {
      await sendEmailCode(email);
      setCodeSent(true);
      setVerifyMsg({ text: '인증 메일이 발송되었습니다. 메일함을 확인해주세요.', kind: 'success' });
    } catch (err) {
      const code = err?.response?.data?.code;
      const msg = err?.response?.data?.message;
      if (code === 'USER_409') setVerifyMsg({ text: '이미 가입된 이메일입니다.', kind: 'error' });
      else setVerifyMsg({ text: msg || '발송에 실패했습니다.', kind: 'error' });
    }
  };

  const handleConfirmCode = async () => {
    if (code.length !== 6) {
      setVerifyMsg({ text: '인증 코드 6자리를 입력해주세요.', kind: 'error' });
      return;
    }
    try {
      const res = await verifyEmailCode(email, code);
      const token = res?.data;
      if (!token) throw new Error('No verifiedToken');
      setVerifiedToken(token);
      setVerifyMsg({ text: '✓ 이메일 인증이 완료되었습니다.', kind: 'success' });
    } catch (err) {
      setVerifyMsg({ text: '✗ 인증 코드가 올바르지 않거나 만료되었습니다.', kind: 'error' });
    }
  };

  const canSubmit =
    emailVerified &&
    termsOk &&
    password.length >= 8 &&
    password === passwordConfirm &&
    nickname.trim().length >= 2;

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await registerApi(verifiedToken, {
        password,
        nickname: nickname.trim(),
        newsletterAlert: newsletter,
        volatilityAlert: volatility,
      });
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      window.location.href = '/login.html';
    } catch (err) {
      const c = err?.response?.data?.code;
      const m = err?.response?.data?.message;
      if (c === 'TOKEN_401') setSubmitError('이메일 인증이 만료되었습니다. 다시 진행해주세요.');
      else if (c === 'USER_409') setSubmitError('이미 가입된 이메일입니다.');
      else if (c === 'VALID_400') setSubmitError(m || '입력값을 확인해주세요.');
      else setSubmitError(m || '회원가입에 실패했습니다.');
    } finally {
      setSubmitting(false);
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
        <div className="left-body">
          <div className="left-heading">
            바구니를 만들고
            <br />
            <span className="c-accent">시작하세요</span>
          </div>
          <p className="left-desc">
            관심 종목을 담고, AI가 분석한 뉴스를
            <br />
            매일 받아보세요.
          </p>
        </div>
      </div>
      <div className="right-panel">
        <form className="form-box" onSubmit={handleRegister}>
          <h1 className="form-title">바구니 만들기 🧺</h1>
          <p className="form-sub">아래 정보를 입력하고 바로 시작하세요</p>

          <div className="input-group">
            <label className="input-label">닉네임</label>
            <input
              type="text"
              className="input"
              placeholder="예: 투자고수123"
              maxLength="20"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="input-hint">2~20자</div>
          </div>

          <div className="input-group">
            <label className="input-label">
              이메일 주소 <span style={{ color: 'var(--negative)' }}>*</span>
            </label>
            <div className="email-verify-row">
              <input
                type="email"
                className="input"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailVerified}
              />
              {!emailVerified && (
                <button
                  type="button"
                  className={`btn-verify ${codeSent ? 'sent' : ''}`}
                  onClick={handleSendCode}
                >
                  {codeSent ? '재발송' : '인증 메일 발송'}
                </button>
              )}
            </div>
            {codeSent && !emailVerified && (
              <div className="verify-code-wrap">
                <input
                  type="text"
                  className="input verify-code-input"
                  placeholder="인증 코드 6자리"
                  maxLength="6"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                />
                <button type="button" className="btn-confirm" onClick={handleConfirmCode}>
                  확인
                </button>
              </div>
            )}
            {verifyMsg.text && (
              <div className={`verify-status ${verifyMsg.kind}`}>{verifyMsg.text}</div>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">비밀번호</label>
            <div className="input-pw-wrap">
              <input
                type={showPw ? 'text' : 'password'}
                className="input"
                placeholder="8~20자, 영문 대소문자·숫자·특수문자(@$!%*#?&)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <div className="input-group">
            <label className="input-label">비밀번호 확인</label>
            <div className="input-pw-wrap">
              <input
                type={showPwConfirm ? 'text' : 'password'}
                className="input"
                placeholder="비밀번호를 다시 입력"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPwConfirm((v) => !v)}
              >
                👁
              </button>
            </div>
            {passwordConfirm && (
              <div className={`verify-status ${password === passwordConfirm ? 'success' : 'error'}`}>
                {password === passwordConfirm ? '✓ 비밀번호가 일치합니다.' : '✗ 비밀번호가 일치하지 않습니다.'}
              </div>
            )}
          </div>

          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="terms"
                checked={termsOk}
                onChange={(e) => setTermsOk(e.target.checked)}
              />
              <label htmlFor="terms">
                <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 동의합니다
                <span style={{ color: 'var(--negative)' }}> *</span>
              </label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="newsletter"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
              />
              <label htmlFor="newsletter">
                뉴스레터 및 호재/악재 알림 수신에 동의합니다 (선택)
              </label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="volatility"
                checked={volatility}
                onChange={(e) => setVolatility(e.target.checked)}
              />
              <label htmlFor="volatility">
                급등락 감지 시 이메일 알림을 받겠습니다 (선택)
              </label>
            </div>
          </div>

          {submitError && (
            <div className="verify-status error" style={{ marginBottom: 8 }}>{submitError}</div>
          )}

          <button type="submit" className="btn-submit" disabled={!canSubmit || submitting}>
            {submitting ? '가입 중...' : '바구니 만들기 🧺'}
          </button>
          <p className="login-link">
            이미 계정이 있으신가요? <a href="login.html">로그인</a>
          </p>
        </form>
      </div>
    </>
  );
}
