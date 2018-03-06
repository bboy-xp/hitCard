'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async join() {
    const ctx = this.ctx;    
    var name = ctx.request.body.info.name;
    var money = ctx.request.body.info.money;
    var year = ctx.request.body.info.createTime.year;
    var month = ctx.request.body.info.createTime.month;
    var day = ctx.request.body.info.createTime.day; 
    var info;
    var User = ctx.model.User;
    
    // 查询是否数据库里有用户，如果有将createTime追加到用户的数据里面
    const haveUser = await new Promise((resolve, reject) => {
      User.find({name:name},function(err,docs){
        if (docs.length !== 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
    if (!haveUser) {
      var user = new User ({
        name: name,
        money: money,
        createTime: [{
          year: year,
          month: month,
          day: day
        }]
      })
      user.save();
      ctx.body = 'ok';
    } else {
      User.update({
        name: name
      },{
        $push:{
          createTime: {
            day: day,
            month: month,
            year: year,
          }
        }
      },(err) => {
        if (!!err) {
          console.log('mongoose更新数据报错'+err);
        }
      })
      ctx.body = 'ok';
    }

  }
  async getInfo () {
    const ctx = this.ctx;
    var date = new Date();
    var month = date.getMonth() + 1;//月份
    var day = date.getDate();//日
    var name = ctx.request.body.name;
    var info = {};
    var User = ctx.model.User;
    //注意Model.find查询数据库时回掉函数有顺序，先err后docs
    User.find({createTime:[{"day" : day, "month" : month, "year" : 2018}]},function(err,docs){
      info.count = docs.length;
    });
    User.find({name:name,createTime:[{"day" : day, "month" : month, "year" : 2018}]},function(err,docs){
      if (docs.length == 0) {
        info.haveUser = 'no'
      }else{
        info.haveUser = 'yes'
      }
    });
    //查询数据库所有数据，发送给前端做排行榜
    const docs = await new Promise((resolve, reject) => {
      User.find({createTime:[{"day" : day, "month" : month, "year" : 2018}]},function(err,docs){
        resolve(docs)
      }); 
    })
    info.db = docs;
    ctx.body = info;
  }
  async meGetInfo () {
    const ctx = this.ctx;
    var name = ctx.request.body.name;
    var User = ctx.model.User;
    var info = [];
    //用await promise的方法阻塞获得数据，就不会出现前端玄学接不到数据的情况了
    var info = await new Promise((resolve,reject) => {
      User.find({name : name},function(err,docs){
        resolve(docs);
      });
    })
    ctx.body = info;
  }
}

module.exports = HomeController;
