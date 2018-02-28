'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/join', controller.home.join);
  router.post('/getInfo', controller.home.getInfo);
};
