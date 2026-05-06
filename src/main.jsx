import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

import Account from './pages/account.jsx';
import Home from './pages/index.jsx';
import Login from './pages/login.jsx';
import NewsDetail from './pages/news-detail.jsx';
import News from './pages/news.jsx';
import Register from './pages/register.jsx';
import Settings from './pages/settings.jsx';
import StockDetail from './pages/stock-detail.jsx';
import Stocks from './pages/stocks.jsx';

const routes = {
  '/': Home,
  '/account.html': Account,
  '/index.html': Home,
  '/login.html': Login,
  '/news-detail.html': NewsDetail,
  '/news.html': News,
  '/register.html': Register,
  '/settings.html': Settings,
  '/stock-detail.html': StockDetail,
  '/stocks.html': Stocks,
};

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/index.html';
  return pathname.endsWith('/') ? '/index.html' : pathname;
}

function App() {
  const [path, setPath] = useState(normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);

    const onClick = (event) => {
      const link = event.target.closest?.('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
      if (!href.endsWith('.html') && href !== '/') return;
      event.preventDefault();
      const nextPath = normalizePath(new URL(href, window.location.origin).pathname);
      window.history.pushState({}, '', nextPath);
      setPath(nextPath);
    };

    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onClick);
    };
  }, []);

  const Page = useMemo(() => routes[path] || Home, [path]);
  return <Page />;
}

createRoot(document.getElementById('root')).render(<App />);
