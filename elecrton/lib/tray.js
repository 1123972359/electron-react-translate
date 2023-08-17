let tray;
const { Tray } = require('electron');
const path = require('path');

/**
 * 最小化托盘
 */
const createTray = (win) => {
  // 创建系统托盘图标
  tray = new Tray(path.join(__dirname, '../assets/tray-icon.png'));

  // 托盘图标被单击时，显示窗口
  tray.on('click', () => {
    win.show();
  });
};

module.exports = createTray;
