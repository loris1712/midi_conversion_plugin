import ReactDOM from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import App from './App.tsx';
import '@radix-ui/themes/styles.css';
import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { log } from '@utils/logger.ts';

const queryClient = new QueryClient();

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  log(message);
});

window.ipcRenderer.on('muse-user', (_event, message) => {
  log(message);
});

window.ipcRenderer.on('log', (_event, message) => {
  log(message);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Theme>
      <App />
    </Theme>
  </QueryClientProvider>,
);

