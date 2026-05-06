import { useEffect } from 'react';

export function useLegacyPage({ title, styles, scripts }) {
  useEffect(() => {
    document.title = title || '주식 바구니';

    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-react-page-style', title || 'page');
    styleEl.textContent = styles || '';
    document.head.appendChild(styleEl);

    const savedTheme = localStorage.getItem('theme')
      || (window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.classList.toggle('theme-light', savedTheme === 'light');
    document.documentElement.classList.toggle('theme-dark', savedTheme !== 'light');
    document.documentElement.setAttribute('data-theme', savedTheme === 'light' ? 'light' : 'dark');

    let scriptEl;
    if (scripts?.trim()) {
      scriptEl = document.createElement('script');
      scriptEl.type = 'text/javascript';
      scriptEl.textContent = scripts;
      document.body.appendChild(scriptEl);
      window.setTimeout(() => document.dispatchEvent(new Event('DOMContentLoaded')), 0);
    }

    return () => {
      styleEl.remove();
      scriptEl?.remove();
    };
  }, [title, styles, scripts]);
}
