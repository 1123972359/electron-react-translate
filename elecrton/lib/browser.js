const { BrowserWindow } = require('electron');
const path = require('path');

/**
 * 创建一个窗口
 * @param {object} param
 * @param {{prod: string; test: string;}} param.loadURL
 * @returns {BrowserWindow}
 */
const createBrowserWindow = ({ loadURL, ...rest }) => {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true, // 允许在渲染进程中使用 Node.js API
      contextIsolation: false, // 关闭上下文隔离以使用 Electron API
      preload: path.join(__dirname, '../preload.js')
    },
    ...rest
  });

  console.log(`process.env.E_ENV`, process.env.E_ENV);
  win.loadURL(loadURL.prod);

  if (process.env.E_ENV !== 'dev') {
    win.loadURL(loadURL.prod);
  } else {
    win.loadURL(loadURL.test);
    win.webContents.openDevTools();
  }
  return win;
};

module.exports = {
  createBrowserWindow
};
