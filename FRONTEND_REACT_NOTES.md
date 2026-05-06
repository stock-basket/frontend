# React 전환 내역

- 기존 화면 HTML 파일들은 `src/pages/*.jsx` React 컴포넌트로 변환했습니다.
- 루트의 HTML 파일은 Vite 앱 진입점인 `index.html`만 남겼습니다.
- 기존 경로 이름(`/news.html`, `/stocks.html` 등)은 React 라우팅에서 그대로 유지했습니다.
- Axios 공통 설정은 `src/api/axiosConfig.js`에 분리했습니다. 기본값은 `/api`라서 프론트 코드에 `localhost:8080`을 직접 쓰지 않습니다.
- 개발 서버에서 `/api` 요청은 `vite.config.js` proxy를 통해 `http://localhost:8080`으로 전달됩니다.
