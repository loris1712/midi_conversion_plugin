import React from 'react'
import ReactDOM from 'react-dom/client'
import { Theme } from '@radix-ui/themes';
import App from './App.tsx'
import '@radix-ui/themes/styles.css';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Theme>
    <App />
  </Theme>,
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
