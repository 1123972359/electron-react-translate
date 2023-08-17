const { globalShortcut } = require('electron');
const createTranslate = require('./translate');

/**
 * 创建快捷键
 */
const createShortcut = () => {
  // 翻译成英文
  const translate2en = globalShortcut.register('CommandOrControl+1', () => {
    createTranslate('en');
  });

  // 翻译成中文
  const translate2zh = globalShortcut.register('CommandOrControl+2', () => {
    createTranslate('zh');
  });

  if (!translate2en || !translate2zh) {
    console.log('Registration failed.');
  }
};

/**
 * 销毁快捷键
 */
const removeShortcut = () => {
  globalShortcut.unregisterAll();
};

module.exports = {
  createShortcut,
  removeShortcut
};
