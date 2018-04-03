'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/join', controller.home.join);
  router.post('/getInfo', controller.home.getInfo);
  router.post('/meGetInfo', controller.home.meGetInfo);
  router.post('/successHitCard', controller.home.successHitCard);
  router.get('/getCode', controller.home.getCode);
  router.get('/checkLogin', controller.home.checkLogin);
  // router.post('/logup', controller.home.logup);
  // router.post('/login', controller.home.login);
};
