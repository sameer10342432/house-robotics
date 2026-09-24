// Polyfill / guard for environments where window.fetch has only a getter
try {
  let origFetch = window.fetch;
  let desc = Object.getOwnPropertyDescriptor(window, 'fetch');
  if (!desc) {
    const proto = Object.getPrototypeOf(window);
    if (proto) desc = Object.getOwnPropertyDescriptor(proto, 'fetch');
  }
  if (!desc || !desc.set) {
    Object.defineProperty(window, 'fetch', {
      configurable: true,
      enumerable: true,
      get() {
        return origFetch;
      },
      set(val) {
        origFetch = val;
      },
    });
  }
} catch (_) {}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
