import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { autoUpdater } from 'electron-updater';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { download as downloader } from 'electron-dl';
import isDev from 'electron-is-dev';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { initDB } from '../lib/db/index';

import Muse from '../lib/muse/index';

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

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;

// auto updater
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

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
    minWidth: 780,
    minHeight: 440,
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
      nodeIntegration: true
    },
  });

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
    initDB('Halbestunde', 'v1');
    win?.webContents.send('main-process-message', new Date().toLocaleString());
    if (isDev) {
      win?.webContents.openDevTools({ mode: 'detach' });
    }
    let museSdk;
    try {
      sendLog('init-sdk');
      museSdk = new Muse(isDev);
      sendLog('init-sdk-success');
      if (museSdk.connected) {
        sendLog('sdk-connected');
        const userInfo = museSdk.getUserInfo();
        const activeSub = museSdk.getActivationStatus();
        const subOption = museSdk.getSubscriptionOption();
        win?.webContents.send('muse-user', { userInfo, activeSub, subOption });
      } else {
        win?.webContents.send('muse-user-error', {
          message: 'Connection did not work',
        });
      }
      sendLog('init-sdk-done');
    } catch (error) {
      win?.webContents.send('muse-user-error', { message: error });
    } finally {
      museSdk?.finalize();
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
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
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
  autoUpdater.checkForUpdates();
  win?.webContents.send('check-updates');
});

autoUpdater.on('update-available', () => {
  autoUpdater.downloadUpdate();
});

autoUpdater.on('update-downloaded', (info) => {
  win?.webContents.send('update-downloaded', info);
});

// check and install update
ipcMain.on('check-updates', async () => {
  const results = await autoUpdater.checkForUpdatesAndNotify();
  win?.webContents.send('check-updates-response', results);
});

ipcMain.on('install-update', () => {
  setImmediate(() => {
    app.removeAllListeners('window-all-closed');
    autoUpdater.quitAndInstall(true, true);
    if (win != null) {
      win.close();
    }
  });
});

app.whenReady().then(createWindow);
