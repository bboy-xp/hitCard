'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1519740281974_7401';

  // add your config here
  config.middleware = [];

  exports.mongoose = {
    url: 'mongodb://127.0.0.1/hitcard',
    options: {}
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
  };

  return config;
};
