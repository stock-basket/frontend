import { useLegacyPage } from '../hooks/useLegacyPage.js';

const pageStyles = "\nbody {\n  min-height: 100vh;\n}\n#root {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  min-height: 100vh;\n}\n\n/* LEFT */\n.left-panel {\n  background: var(--surface);\n  border-right: 1px solid var(--border);\n  display: flex; flex-direction: column;\n  padding: 48px; position: relative; overflow: hidden;\n}\n.left-panel::before {\n  content: '';\n  position: absolute; top: -80px; right: -80px;\n  width: 350px; height: 350px;\n  background: radial-gradient(circle, rgba(52,211,153,0.06), transparent 65%);\n  pointer-events: none;\n}\n.logo-wrap { display: flex; align-items: center; gap: 10px; }\n\n.left-body { margin-top: auto; }\n.left-heading { font-size: 22px; font-weight: 800; letter-spacing: -0.8px; margin-bottom: 8px; line-height: 1.35; }\n.left-heading .c-accent { color: var(--accent); }\n.left-desc { font-size: 13px; color: var(--text-secondary); line-height: 1.7; margin-bottom: 28px; }\n\n.feature-list { display: flex; flex-direction: column; gap: 10px; }\n.feature-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--text-secondary); }\n.feature-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }\n.feature-text strong { color: var(--text-primary); display: block; font-size: 13px; margin-bottom: 2px; }\n.feature-text span { font-size: 11.5px; color: var(--text-muted); }\n\n/* RIGHT */\n.right-panel {\n  display: flex; align-items: center; justify-content: center;\n  padding: 48px 60px; overflow-y: auto;\n  background: var(--bg);\n}\n.form-box { width: 100%; max-width: 420px; }\n.form-title { font-size: 24px; font-weight: 800; letter-spacing: -0.8px; margin-bottom: 6px; }\n.form-sub { font-size: 13px; color: var(--text-secondary); margin-bottom: 28px; }\n\n/* Email verify row */\n.email-verify-row { display: flex; gap: 8px; }\n.email-verify-row .input { flex: 1; }\n.btn-verify {\n  padding: 11px 14px; border-radius: var(--radius-sm);\n  background: var(--accent-bg); border: 1px solid rgba(129,140,248,0.3);\n  color: var(--accent); font-size: 12.5px; font-weight: 700;\n  cursor: pointer; white-space: nowrap; transition: all 0.15s;\n  font-family: 'Noto Sans KR', sans-serif; flex-shrink: 0;\n}\n.btn-verify:hover { background: var(--accent); color: #fff; }\n.btn-verify:disabled { opacity: 0.5; cursor: not-allowed; }\n.btn-verify.sent { background: var(--positive-bg); color: var(--positive); border-color: var(--positive-border); }\n\n.verify-code-wrap {\n  display: none; margin-top: 8px;\n}\n.verify-code-wrap.show { display: flex; gap: 8px; align-items: center; }\n.verify-code-input { flex: 1; letter-spacing: 6px; font-family: 'DM Mono', monospace; font-size: 16px; text-align: center; }\n.btn-confirm {\n  padding: 11px 14px; border-radius: var(--radius-sm);\n  background: var(--positive-bg); border: 1px solid var(--positive-border);\n  color: var(--positive); font-size: 12.5px; font-weight: 700;\n  cursor: pointer; white-space: nowrap; transition: all 0.15s;\n  font-family: 'Noto Sans KR', sans-serif;\n}\n.btn-confirm:hover { background: var(--positive); color: #fff; }\n\n.verify-status {\n  font-size: 11.5px; margin-top: 5px; display: none;\n  font-family: 'DM Mono', monospace;\n}\n.verify-status.success { color: var(--positive); display: block; }\n.verify-status.error { color: var(--negative); display: block; }\n\n/* PW strength */\n.strength-bar { height: 4px; border-radius: 4px; background: var(--border); margin-top: 6px; overflow: hidden; }\n.strength-fill { height: 100%; border-radius: 4px; transition: all 0.3s; width: 0%; }\n\n.input-pw-wrap { position: relative; }\n.input-pw-wrap .input { padding-right: 44px; }\n.toggle-pw {\n  position: absolute; right: 13px; top: 50%; transform: translateY(-50%);\n  background: none; border: none; cursor: pointer;\n  color: var(--text-muted); font-size: 15px;\n}\n\n.checkbox-group { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }\n.checkbox-item { display: flex; align-items: flex-start; gap: 9px; }\n.checkbox-item input { accent-color: var(--accent); width: 15px; height: 15px; margin-top: 2px; flex-shrink: 0; }\n.checkbox-item label { font-size: 12.5px; color: var(--text-secondary); line-height: 1.5; cursor: pointer; }\n.checkbox-item label a { color: var(--accent); }\n\n.btn-submit {\n  width: 100%; padding: 14px; border-radius: 8px;\n  border: none; cursor: pointer;\n  background: var(--accent); color: #fff;\n  font-size: 15px; font-weight: 700;\n  font-family: 'Noto Sans KR', sans-serif;\n  transition: all 0.15s; margin-top: 6px;\n}\n.btn-submit:hover { background: var(--accent-hover); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.3); }\n.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }\n\n.login-link { text-align: center; margin-top: 18px; font-size: 13px; color: var(--text-secondary); }\n.login-link a { color: var(--accent); font-weight: 600; }\n\n.theme-toggle-btn {\n  position: fixed; top: 20px; right: 20px;\n  width: 36px; height: 36px; border-radius: 8px;\n  background: var(--card); border: 1px solid var(--border);\n  cursor: pointer; font-size: 16px;\n  display: flex; align-items: center; justify-content: center;\n  transition: all 0.15s; z-index: 10;\n}\n";
const pageScripts = "\nlet emailVerified = false;\n\nfunction sendVerification() {\n  const email = document.getElementById('emailInput').value.trim();\n  if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {\n    alert('올바른 이메일 주소를 입력해주세요.');\n    return;\n  }\n  const btn = document.getElementById('verifyBtn');\n  btn.textContent = '재발송';\n  btn.classList.add('sent');\n  document.getElementById('verifyCodeWrap').classList.add('show');\n  document.getElementById('verifyStatus').textContent = '인증 메일이 발송되었습니다. 메일함을 확인해주세요.';\n  document.getElementById('verifyStatus').className = 'verify-status success';\n  // In real app: POST /api/auth/send-verification { email }\n}\n\nfunction confirmCode() {\n  const code = document.getElementById('verifyCodeInput').value.trim();\n  // Mock: accept any 6-digit code\n  if (code.length === 6) {\n    emailVerified = true;\n    document.getElementById('verifyStatus').textContent = '✓ 이메일 인증이 완료되었습니다.';\n    document.getElementById('verifyStatus').className = 'verify-status success';\n    document.getElementById('verifyCodeWrap').style.display = 'none';\n    document.getElementById('verifyBtn').style.display = 'none';\n    document.getElementById('emailInput').disabled = true;\n    checkSubmit();\n  } else {\n    document.getElementById('verifyStatus').textContent = '✗ 인증 코드가 올바르지 않습니다.';\n    document.getElementById('verifyStatus').className = 'verify-status error';\n  }\n}\n\nfunction checkStrength(val) {\n  let score = 0;\n  if (val.length >= 8) score++;\n  if (/[A-Z]/.test(val)) score++;\n  if (/[0-9]/.test(val)) score++;\n  if (/[^A-Za-z0-9]/.test(val)) score++;\n  const fill = document.getElementById('strengthFill');\n  const label = document.getElementById('strengthLabel');\n  const pct = score * 25;\n  const colors = ['var(--negative)','#f97316','var(--neutral)','var(--positive)'];\n  const labels = ['매우 약함','보통','강함','매우 강함'];\n  fill.style.width = pct + '%';\n  fill.style.background = val.length === 0 ? '' : colors[Math.max(0, score-1)];\n  label.textContent = val.length === 0 ? '비밀번호를 입력해주세요' : labels[Math.max(0, score-1)];\n\n  const confirm = document.getElementById('pwConfirmInput').value;\n  if (confirm) checkPwMatch();\n  checkSubmit();\n}\n\nfunction checkPwMatch() {\n  const pw = document.getElementById('pwInput').value;\n  const confirm = document.getElementById('pwConfirmInput').value;\n  const status = document.getElementById('pwMatchStatus');\n  if (!confirm) { status.className = 'verify-status'; return; }\n  if (pw === confirm) {\n    status.textContent = '✓ 비밀번호가 일치합니다.';\n    status.className = 'verify-status success';\n  } else {\n    status.textContent = '✗ 비밀번호가 일치하지 않습니다.';\n    status.className = 'verify-status error';\n  }\n  checkSubmit();\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n  document.getElementById('pwConfirmInput').addEventListener('input', checkPwMatch);\n});\n\nfunction checkSubmit() {\n  const terms = document.getElementById('terms').checked;\n  const pw = document.getElementById('pwInput').value;\n  const confirm = document.getElementById('pwConfirmInput').value;\n  const nickname = document.getElementById('nicknameInput').value.trim();\n  const ok = emailVerified && terms && pw.length >= 8 && pw === confirm && nickname.length >= 2;\n  document.getElementById('submitBtn').disabled = !ok;\n}\n\nfunction togglePw(id) {\n  const el = document.getElementById(id);\n  el.type = el.type === 'password' ? 'text' : 'password';\n}\n\nfunction doRegister() {\n  // POST /api/auth/register\n  location.href = 'stock-detail.html';\n}\n\n// Theme\nfunction applyTheme(theme) {\n  const root = document.documentElement;\n  if (theme === 'light') {\n    root.classList.add('theme-light'); root.classList.remove('theme-dark');\n    root.setAttribute('data-theme','light');\n    document.getElementById('themeBtn').textContent = '☀️';\n  } else {\n    root.classList.remove('theme-light'); root.classList.add('theme-dark');\n    root.setAttribute('data-theme','dark');\n    document.getElementById('themeBtn').textContent = '🌙';\n  }\n  localStorage.setItem('theme', theme);\n}\nfunction toggleTheme() {\n  const current = localStorage.getItem('theme') ||\n    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');\n  applyTheme(current === 'dark' ? 'light' : 'dark');\n}\n(function() {\n  const saved = localStorage.getItem('theme');\n  if (saved) applyTheme(saved);\n  else if (window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');\n  else document.getElementById('themeBtn').textContent = '🌙';\n})();\n";

export default function Register() {
  useLegacyPage({ title: "회원가입 — 주식 바구니", styles: pageStyles, scripts: pageScripts });

  return (
    <>
      <button className="theme-toggle-btn" onClick={(event) => { toggleTheme(); }} id="themeBtn" title="테마 전환">
        🌙
      </button>
      <div className="left-panel">
        <div className="logo-wrap">
          <div className="logo-icon">
            🧺
          </div>
          <div>
            <div className="logo-text">
              주식 바구니
            </div>
            <div className="logo-sub">
              AI NEWS INTELLIGENCE
            </div>
          </div>
        </div>
        <div className="left-body">
          <div className="left-heading">
            바구니를 만들고
            <br />
            <span className="c-accent">
              시작하세요
            </span>
          </div>
          <p className="left-desc">
            관심 종목을 담고, AI가 분석한 뉴스를
            <br />
            매일 받아보세요.
          </p>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">
                📰
              </span>
              <div className="feature-text">
                <strong>
                  AI 뉴스 분석
                </strong>
                <span>
                  호재·악재를 자동으로 분류하고 영향력을 수치화
                </span>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                ⚡
              </span>
              <div className="feature-text">
                <strong>
                  급등락 알림
                </strong>
                <span>
                  주가 이상 감지 시 즉시 원인 분석 및 알림 발송
                </span>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                📊
              </span>
              <div className="feature-text">
                <strong>
                  뉴스 오버레이 차트
                </strong>
                <span>
                  주가 차트와 뉴스 이벤트를 한 화면에서 확인
                </span>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">
                🔒
              </span>
              <div className="feature-text">
                <strong>
                  개인정보 안전 보호
                </strong>
                <span>
                  암호화된 데이터 저장, 언제든지 계정 삭제 가능
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right-panel">
        <div className="form-box">
          <h1 className="form-title">
            바구니 만들기 🧺
          </h1>
          <p className="form-sub">
            아래 정보를 입력하고 바로 시작하세요
          </p>
          <div className="input-group">
            <label className="input-label">
              닉네임
            </label>
            <input type="text" className="input" id="nicknameInput" placeholder="예: 투자고수123" maxLength="20" />
            <div className="input-hint">
              2~20자, 한글·영문·숫자 사용 가능
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">
              이메일 주소 
              <span style={{"color": "var(--negative)"}}>
                *
              </span>
            </label>
            <div className="email-verify-row">
              <input type="email" className="input" id="emailInput" placeholder="example@email.com" />
              <button className="btn-verify" id="verifyBtn" onClick={(event) => { sendVerification(); }}>
                인증 메일 발송
              </button>
            </div>
            <div className="verify-code-wrap" id="verifyCodeWrap">
              <input type="text" className="input verify-code-input" id="verifyCodeInput" placeholder="인증 코드 6자리" maxLength="6" />
              <button className="btn-confirm" onClick={(event) => { confirmCode(); }}>
                확인
              </button>
            </div>
            <div className="verify-status" id="verifyStatus"></div>
          </div>
          <div className="input-group">
            <label className="input-label">
              비밀번호
            </label>
            <div className="input-pw-wrap">
              <input type="password" className="input" id="pwInput" placeholder="8자 이상 입력" onInput={(event) => { checkStrength(event.currentTarget.value); }} />
              <button className="toggle-pw" type="button" onClick={(event) => { togglePw('pwInput'); }}>
                👁
              </button>
            </div>
            <div className="strength-bar">
              <div className="strength-fill" id="strengthFill"></div>
            </div>
            <div className="input-hint" id="strengthLabel">
              비밀번호를 입력해주세요
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">
              비밀번호 확인
            </label>
            <div className="input-pw-wrap">
              <input type="password" className="input" id="pwConfirmInput" placeholder="비밀번호를 다시 입력" />
              <button className="toggle-pw" type="button" onClick={(event) => { togglePw('pwConfirmInput'); }}>
                👁
              </button>
            </div>
            <div className="verify-status" id="pwMatchStatus"></div>
          </div>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input type="checkbox" id="terms" onChange={(event) => { checkSubmit(); }} />
              <label htmlFor="terms">
                <a href="#">
                  이용약관
                </a>
                 및 
                <a href="#">
                  개인정보처리방침
                </a>
                에 동의합니다
          
                <span style={{"color": "var(--negative)"}}>
                   *
                </span>
              </label>
            </div>
            <div className="checkbox-item">
              <input type="checkbox" id="marketing" />
              <label htmlFor="marketing">
                뉴스레터 및 마케팅 정보 수신에 동의합니다 (선택)
              </label>
            </div>
            <div className="checkbox-item">
              <input type="checkbox" id="alertEmail" defaultChecked={true} />
              <label htmlFor="alertEmail">
                급등락 감지 시 이메일 알림을 받겠습니다 (선택)
              </label>
            </div>
          </div>
          <button className="btn-submit" id="submitBtn" disabled={true} onClick={(event) => { doRegister(); }}>
            바구니 만들기 🧺
          </button>
          <p className="login-link">
            이미 계정이 있으신가요? 
            <a href="login.html">
              로그인
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
