// electron/main.js
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/../node_modules/electron`)
});

const { app, BrowserWindow } = require('electron');

const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load URL in dev or built index.html in production
  if (isDev) {
    win.loadURL('http://localhost:3000');
    //win.webContents.openDevTools();  // opens debugger by default
  } else {
    const indexPath = path.join(__dirname, "../frontend/out/index.html")
    win.loadFile(path.join(indexPath));
  }
}

app.whenReady().then(() => {
  createWindow();

  // On macOS, re-open window when clicking dock icon
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  // On macOS keep app active until user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});