import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/electron/renderer';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Theme } from '@radix-ui/themes';
import App from './App.tsx';
import '@radix-ui/themes/styles.css';
import './index.css';
import Fallback from 'layout/ErrorBoundary/Fallback.tsx';
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

Sentry.init({
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallbackRender={Fallback}>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <App />
      </Theme>
    </QueryClientProvider>
  </ErrorBoundary>,
);
