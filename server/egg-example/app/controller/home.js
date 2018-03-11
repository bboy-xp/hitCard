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
    // var year = ctx.request.body.info.createTime.year;
    // var month = ctx.request.body.info.createTime.month;
    // var day = ctx.request.body.info.createTime.day;
    var info;
    var User = ctx.model.User;
    //计算的查询日期
    const now = new Date();
    const nowDate = now.getDate();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    const aDayAgo = new Date(nowYear,nowMonth,nowDate - 0);
    // 查询是否数据库里有用户，如果有将createTime追加到用户的数据里面
    const haveUser = await new Promise((resolve, reject) => {
      User.find({ name,createTime: {
        $gte: aDayAgo,
        $lt: now,
      } }, function (err, docs) {
        if (docs.length !== 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
    if (!haveUser) {
      var user = new User({
        name: name,
        money: money,
        createTime: new Date(),
      })
      user.save();
      ctx.body = 'ok';
    }
  //  else {
  //     User.update({
  //       name: name
  //     }, {
  //         $push: {
  //           createTime: {
  //             day: day,
  //             month: month,
  //             year: year,
  //           }
  //         }
  //       }, (err) => {
  //         if (!!err) {
  //           console.log('mongoose更新数据报错' + err);
  //         }
  //       })
      // ctx.body = 'ok';
  //   }

  }
  async getInfo() {
    const ctx = this.ctx;
    //计算的查询日期
    const now = new Date();
    const nowDate = now.getDate();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    const aDayAgo = new Date(nowYear,nowMonth,nowDate - 0);
    var name = ctx.request.body.name;
    var info = {};
    var User = ctx.model.User;
    //注意Model.find查询数据库时回掉函数有顺序，先err后docs
    //查询今天支付总人数
    info.todayJoinCount = await new Promise((resolve, reject) => {
      User.find({ createTime: {
        $gte: aDayAgo,
        $lt: now,
      } }, function (err, docs) {
        resolve(docs.length);
      });
    })
    // console.log(info);
    // 查询用户是否已支付
    var haveUser = await new Promise((resolve, reject) => {
      User.find({ name: name, createTime: {
        $gte: aDayAgo,
        $lt: now,
      } }, function (err, docs) {
        if (docs.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    info.haveUser = haveUser;
  //   //查询数据库今天成功签到的情况
  //   var hitCardDocs = await new Promise((resolve, reject) => {
  //     User.find({
  //       hitCard: {
  //         $elemMatch: {
  //           day: day,
  //           month: month
  //         }
  //       }
  //     }, function (err, docs) {
  //       resolve(docs)
  //     });
  //   });
  //   info.hitCardDocs = hitCardDocs;
  //   //查询昨天的参与挑战的情况
  //   var yesterdayJoinDocs = await new Promise((resolve, reject) => {
  //     User.find({ createTime: { "day": day - 1, "month": month, "year": 2018 } }, (err, docs) => {
  //       resolve(docs);
  //     })
  //   })
  //   info.yesterdayJoinDocs = yesterdayJoinDocs;
    ctx.body = info;
  }
  async meGetInfo() {
    const ctx = this.ctx;
  //   var name = ctx.request.body.name;
  //   var User = ctx.model.User;
  //   var info = [];
  //   //用await promise的方法阻塞获得数据，就不会出现前端玄学接不到数据的情况了
  //   var info = await new Promise((resolve, reject) => {
  //     User.find({ name: name }, function (err, docs) {
  //       resolve(docs);
  //     });
  //   })
    ctx.body = info;
  }
  async successHitCard() {
    const ctx = this.ctx;
    var data = ctx.request.body;
    var User = ctx.model.User;
    var haveUser = await new Promise((resolve, reject) => {
      User.find({ name: data.name }, function (err, docs) {
        if (docs.length !== 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    });
    //判断时间段的函数
    var time_range = function (beginTime, endTime, nowTime) {
      var strb = beginTime.split(":");
      if (strb.length != 2) {
        return false;
      }

      var stre = endTime.split(":");
      if (stre.length != 2) {
        return false;
      }

      var strn = nowTime.split(":");
      if (stre.length != 2) {
        return false;
      }
      var b = new Date();
      var e = new Date();
      var n = new Date();

      b.setHours(strb[0]);
      b.setMinutes(strb[1]);
      e.setHours(stre[0]);
      e.setMinutes(stre[1]);
      n.setHours(strn[0]);
      n.setMinutes(strn[1]);

      if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;
      } else {
        return false;
      }
    }
    var now = new Date();
    var nowTime = String(now.getHours()+':'+now.getMinutes());
    var canOpenRedBag = time_range("05:00", "24:00", nowTime);
    var message;
    //计算的查询日期
    
    const nowDate = now.getDate();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    const aDayAgo = new Date(nowYear,nowMonth,nowDate - 0);
    //后端判断是否数据库里有用户，和用户从前端发过来的时间是否符合时间段
    if (haveUser && canOpenRedBag) {
      message = await new Promise((resolve, reject) => {
        User.update({ name: data.name }, {
          hitCard: now
     }, { upsert: true, multi: true }, (err) => {
          if (!!err) {
            reject(err);
          } else {
            resolve("ok");
          }
        })
      })
    } else {
      message = "改了前端代码么，哼哼";
    }
    ctx.body = 'ok';
  }
  async getMoney() {
    const ctx = this.ctx;
  //   var data = ctx.request.body;
  //   var User = ctx.model.User;
  //   // 查询昨天的参与人数
  //   var yesterdayJoinCount = await new Promise((resolve, reject) => {
  //     User.find({ createTime: { "day": data.day - 1, "month": data.month, "year": 2018 } }, (err, docs) => {
  //       resolve(docs.length);
  //     })
  //   })
  //   // 查询今天的签到人数
  //   var hitCardCount = await new Promise((resolve, reject) => {
  //     User.find({
  //       hitCard: {
  //         $elemMatch: {
  //           day: data.day,
  //           month: data.month
  //         }
  //       }
  //     }, function (err, docs) {
  //       resolve(docs.length);
  //     });
  //   });
  //   // 红包分配
  //   var totalMoney = yesterdayJoinCount - hitCardCount;
  //   var people = hitCardCount;
  //   function rp(total, n) {
  //     var remain = total
  //     var ret = []
  //     for (let i = 0; i < n - 1; i++) {
  //       let m = Math.ceil(Math.random() * 100 * (remain - (n - (i + 1)) * 0.01)) / 100
  //       ret.push(m)
  //       remain -= m
  //     }
  //     ret.push(Number(remain.toFixed(2)))
  //     return ret
  //   }
  //   var redBagArr = rp(totalMoney, people);
  //   for (let i = 0; i < redBagArr.length; i++) {
  //     redBagArr[i] += 1;
  //     redBagArr[i] = redBagArr[i].toFixed(2);
  //   }
  //   console.log(redBagArr);
  //   var insertMoney = new Promise((resolve, reject) => {
  //     User.update({
  //       hitCard: {
  //         $elemMatch: {
  //           day: data.day,
  //           month: data.month
  //         }
  //       }
  //     },{
  //       $push: {
  //         getMoney: {
  //           money:1.1,
  //           day: data.day,
  //           month: data.month
  //         }
  //       }
  //     },{ upsert: true, multi: true },(err) => {
  //       if (!!err) {
  //         reject(err);
  //       }else{
  //         resolve('ok');
  //       }
  //     })
  //   })
  //   // console.log(redBagArr);
  //   this.ctx.body = 'ok'
  }
}

module.exports = HomeController;
