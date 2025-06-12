import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// GitHub Pages SPA redirect handling
// This script handles the redirect from the 404.html file
(function(l) {
  if (l.search[1] === '/' ) {
    const decoded = l.search.slice(1).split('&').map(function(s) {
      return s.replace(/~and~/g, '&')
    }).join('?');
    window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
}(window.location))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);