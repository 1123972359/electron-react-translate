const { default: axios } = require('axios');
const { clipboard, ipcMain, app } = require('electron');
const fs = require('fs');
const md5 = require('md5');
const { createBrowserWindow } = require('./browser');
const path = require('path');
const store = require('./store');
const { BASE_URL } = require('../constant');

/**
 * 读取粘贴板事件
 * @param {'en'|'zh'} to
 */
const createTranslate = (to = 'en') => {
  const text = clipboard.readText();
  if (!text) return;
  const { appid, secret } = store.get('save');
  const salt = Math.random();
  const sign = md5(appid + text + salt + secret);
  const fd = new FormData();
  fd.append('q', text);
  fd.append('from', 'auto');
  fd.append('to', to);
  fd.append('appid', appid);
  fd.append('salt', salt);
  fd.append('sign', sign);
  axios({
    method: 'post',
    url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
    data: fd,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then((response) => {
      console.log('Response:', response.data);

      fs.writeFile('log.txt', JSON.stringify(response.data), (err) => {
        console.error(err);
      });

      createSmallWindow(response.data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

/**
 *
 * @param {{from: string;to: string;trans_result: { src: string; dst: string }[];}} trans_result
 */
const createSmallWindow = (data) => {
  const search = new URLSearchParams();
  search.append('result', 1);

  // 监听渲染进程的请求
  let win = createBrowserWindow({
    loadURL: {
      prod: `${BASE_URL.prod}?${search.toString()}`,
      test: `${BASE_URL.test}?${search.toString()}`
    },
    width: 800,
    height: 500,
    resizable: true, // 允许调整窗口大小
    frame: true // 隐藏窗口边框和标题栏
  });

  win.focus();

  const event = {
    init: 'on-translate-init',
    translate: 'on-translate',
    hide: 'on-hide'
  };
  ipcMain.once(event.init, () => {
    win.webContents.send(event.translate, data);
  });
  ipcMain.once(event.hide, () => {
    win.close();
  });

  // 监听小窗口关闭事件
  win.on('closed', () => {
    win = null;
  });
};

module.exports = createTranslate;
