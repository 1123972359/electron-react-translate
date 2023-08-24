const { app } = require('electron');
const path = require('path');

const BASE_URL = {
  prod: path.resolve(app.getAppPath(), './build/index.html'),
  test: 'http://localhost:3000/'
};

module.exports = {
  BASE_URL
};
