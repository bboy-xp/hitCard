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

    var info;


    var User = ctx.model.User;
    
    // 查询是否数据库里有用户，如果有将createTime追加到用户的数据里面
    await User.find({name:name},function(err,docs){
      console.log(docs); 
      if (docs !== []) {
        console.log('用户已存在');

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
      }
    })

    ctx.body = 'ok';
  }
  async getInfo () {
    const ctx = this.ctx;
    var name = ctx.request.body.name;
    // console.log(name);
    var info = {};
    var User = ctx.model.User;
    //注意Model.find查询数据库时回掉函数有顺序，先err后docs
    await User.find({createTime:[{"day" : 2, "month" : 3, "year" : 2018}]},function(err,docs){
      info.count = docs.length;
      
      
    });
    await User.find({name:name,createTime:[{"day" : 2, "month" : 3, "year" : 2018}]},function(err,docs){
      // console.log(docs);
      if (docs !== null) {
        info.haveUser = 'yes'
      }
    });
    //查询数据库所有数据，发送给前端做排行榜
    await User.find({createTime:[{"day" : 2, "month" : 3, "year" : 2018}]},function(err,docs){
      info.db = docs;
      
      // console.log(docs);
    });
    
    
    // console.log(count);
    ctx.body = info;
  }
}

module.exports = HomeController;
