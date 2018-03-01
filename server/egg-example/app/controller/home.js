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
    await User.find({name:name}).then((res) => {
      console.log(res);
    })
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
    var info = {};
    var User = ctx.model.User;
    //注意Model.find查询数据库时回掉函数有顺序，先err后docs
    await User.find({createTime:[{"day" : 1, "month" : 3, "year" : 2018}]},function(err,docs){
      // console.log(docs);
      info.count = docs.length;
      
    });
    
    // console.log(count);
    ctx.body = info;
  }
}

module.exports = HomeController;
