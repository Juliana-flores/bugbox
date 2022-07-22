import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './views/app';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </StrictMode>
);
