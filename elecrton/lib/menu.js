const { app, Menu } = require('electron');

/**
 * 创建菜单
 */
const createMenu = () => {
  const template = [
    {
      label: '操作',
      submenu: [{ label: '退出', click: () => app.exit() }]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

module.exports = createMenu;
