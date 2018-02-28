'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async join() {
    const ctx = this.ctx;
    
    // console.log(ctx.request.body);

    var name = ctx.request.body.info.name;
    var money = ctx.request.body.info.money;
    var year = ctx.request.body.info.createTime.year;
    var month = ctx.request.body.info.createTime.month;
    var day = ctx.request.body.info.createTime.day;

    var User = ctx.model.User;
    var user = new User ({
      name: name,
      money: money,
      createTime: [{
        year: year,
        month: month,
        day: day
      }]
    })
    await user.save();

    ctx.body = 'ok';
  }
  async getInfo () {
    const ctx = this.ctx;
    ctx.body = 'success';
  }
}

module.exports = HomeController;
