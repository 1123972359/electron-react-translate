const { app, ipcMain } = require('electron');
const createMenu = require('./lib/menu');
const createTray = require('./lib/tray');
const { createShortcut, removeShortcut } = require('./lib/shortcut');
const { createBrowserWindow } = require('./lib/browser');
const path = require('path');
const store = require('./lib/store');

const event = {
  init: 'on-entry',
  storage: 'on-storage',
  submit: 'on-submit'
};

app.on('ready', () => {
  const win = createBrowserWindow({
    loadURL: {
      prod: path.resolve(app.getAppPath(), './build/index.html'),
      test: 'http://localhost:3001/'
    }
  });
  // 当应用程序窗口关闭时，最小化到托盘
  win.on('close', (event) => {
    event.preventDefault();
    win.hide();
  });

  ipcMain.once(event.init, () => {
    const save = store.get('save');
    if (!save) {
      return;
    }
    win.webContents.send(event.storage, save);
    createTray(win);
    createMenu();
    createShortcut();
  });

  ipcMain.once(event.submit, (_, data) => {
    store.set('save', data);
    app.relaunch();
  });
});

app.on('will-quit', () => {
  removeShortcut();
});
