import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import * as Sentry from '@sentry/electron/main';
import { PostHog } from 'posthog-node';
import { fileURLToPath } from 'node:url';
import Store from 'electron-store'
import { v4 as uuidv4 } from 'uuid';
import path from 'node:path';
import { download as downloader } from 'electron-dl';
import isDev from 'electron-is-dev';
import "../use-require"
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import Authenticate from '../lib/muse/index';

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

const store = new Store();

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;
let userId: any;

// init sentry
Sentry.init({
  dsn: 'https://ed67aaa611f771150f1aa779a7f66925@o416101.ingest.us.sentry.io/4508151376642048',
});

// init posthog
const posthog = new PostHog(
    'phc_6SAY5JblXxvIU6zzkcoYDInjcBVBn0lW08HjvLm6HVB',
    { host: 'https://us.i.posthog.com' }
)

function sendLog(args: any) {
  try {
    win?.webContents.send('log', args);
  } catch (e) {}
}

function createWindow() {
  try {
    Menu.setApplicationMenu(null);
  } catch (e) {
    // ignore
  }
  win = new BrowserWindow({
    minWidth: 1020,
    minHeight: 620,
    title: 'Halbestunde',
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
    titleBarStyle: 'hiddenInset',
    titleBarOverlay: {
      height: 32,
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      devTools: isDev,
      nodeIntegration: true,
    },
  });

  userId = getOrCreateUserId()

  // remove default menu
  try {
    win.setMenuBarVisibility(false);
    win?.removeMenu();
  } catch (e) {
    // ignore
  }

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    sendLog(new Date().toLocaleString());
    if (isDev) {
      win?.webContents.openDevTools({ mode: 'detach' });
    }
    let auth;
    try {
      sendLog('init');
      posthog.capture({
        distinctId: userId ?? uuidv4(),
        event: 'muse_sdk_init',
      });
      auth = new Authenticate(isDev);
      posthog.capture({
        distinctId: userId ?? uuidv4(),
        event: 'muse_sdk_auth_success',
      });
      sendLog('success');
      if (auth.connected) {
        sendLog('auth-connected');
        const info = auth.getIsAllowed();
        posthog.capture({
          distinctId: userId ?? uuidv4(),
          event: 'muse_sdk_auth_info',
          properties: {
            ...info,
          },
        });
        win?.webContents.send('muse-user', {
          ...info,
          dev: isDev,
        });
      } else {
        posthog.capture({
          distinctId: userId ?? uuidv4(),
          event: 'muse_sdk_connection_error'
        });
        Sentry.captureException({
          message:"Unable to establish connection"
        });
        win?.webContents.send('muse-user-error', {
          message: 'Connection did not work',
          dev: isDev,
        });
      }
      sendLog('init-done');
    } catch (error) {
      console.log({ error });
      win?.webContents.send('muse-user-error', { message: error });
      Sentry.captureException(error);
    } finally {
      auth?.finalize();
    }
  });
}

// ipcMain comms
ipcMain.on('download', async (_event, args) => {
  const downloadPath = app.getPath('downloads');
  const { filename, url, ext } = args;
  const currentWindow = BrowserWindow.getFocusedWindow();
  const filePath = `${filename}.${ext}`;
  if (currentWindow) {
    try {
      await downloader(currentWindow, url, {
        directory: downloadPath,
        filename: filePath,
        onTotalProgress: (progress) => {
          win?.webContents.send('download-progress', progress);
        },
        onCompleted: () => {
          win?.webContents.send('download-complete', {});
        },
      });
    } catch (e) {
      Sentry.captureException(e);
      win?.webContents.send('download-error', e);
    } finally {
    }
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', async () => {
  await posthog.shutdown();
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('install-update', () => {
  setImmediate(() => {
    app.removeAllListeners('window-all-closed');
    if (win != null) {
      win.close();
    }
  });
});


function getOrCreateUserId() {
  let userId = store.get('userId');

  if (!userId) {
    // Generate a new unique ID
    userId = uuidv4();
    
    // Store the generated ID persistently
    store.set('userId', userId);
    
    console.log('New user ID generated:', userId);
  } else {
    console.log('Existing user ID retrieved:', userId);
  }

  return userId;
}

app.whenReady().then(createWindow);
