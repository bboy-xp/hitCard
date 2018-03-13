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
    var Record = ctx.model.Record;
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
      var record = new Record({
        name: name,
        money: 1,
        createTime: new Date(),
        use: false
      })
      record.save();
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
    const aDayAgo = new Date(nowYear,nowMonth,nowDate - 1);
    const nowday = new Date(nowYear,nowMonth,nowDate);
    var name = ctx.request.body.name;
    var info = {};
    var User = ctx.model.User;
    var Record = ctx.model.Record;
    //注意Model.find查询数据库时回掉函数有顺序，先err后docs
    //查询今天支付总人数
    info.todayJoinCount = await new Promise((resolve, reject) => {
      User.find({ createTime: {
        $gte: nowday,
        $lt: now,
      } }, function (err, docs) {
        resolve(docs.length);
      });
    })
    //查询昨天的总人数
    info.yesterdayJoinCount = await new Promise((resolve, reject) => {
      User.find({ createTime: {
        $gte: aDayAgo,
        $lt: nowday,
      } }, function (err, docs) {
        resolve(docs.length);
      });
    })
    // 查询用户是否已支付
    var todayHaveUser = await new Promise((resolve, reject) => {
      User.find({ name: name, createTime: {
        $gte: nowday,
        $lt: now,
      } }, function (err, docs) {
        if (docs.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    info.todayHaveUser = todayHaveUser;
    var yesterdayHaveUser = await new Promise((resolve, reject) => {
      User.find({ name: name, createTime: {
        $gte: aDayAgo,
        $lt: nowday,
      } }, function (err, docs) {
        if (docs.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    info.yesterdayHaveUser = yesterdayHaveUser;

    //查询数据库今天成功签到的情况
    var hitCardDocs = await new Promise((resolve, reject) => {
      Record.find({
        hitCard: {
          $gte: nowday,
          $lt: now
        }
      }, function (err, docs) {
        resolve(docs)
      });
    });
    info.hitCardDocs = hitCardDocs;
    //查询昨天的参与挑战的情况
    var yesterdayJoinCount = await new Promise((resolve, reject) => {
      User.find({ createTime: {
        $gte: aDayAgo,
        $lt: nowday
      } }, (err, docs) => {
        resolve(docs.length);
      })
    })
    info.yesterdayJoinCount = yesterdayJoinCount;
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
    var Record = ctx.model.Record;
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
    const nowday = new Date(nowYear,nowMonth,nowDate - 0);
    const aDayAgo = new Date(nowYear,nowMonth,nowDate - 1);
    //后端判断是否数据库里有用户，和用户从前端发过来的时间是否符合时间段
    if (canOpenRedBag) {
    
      var haveUser = await new Promise((resolve,reject) => {
        User.find({
          name:data.name,hitCard: {
            $gte: nowday,
            $lt: now,
          }
        },(err,docs) => {
          if(docs.length == 0){
            resolve(false);
          }else{
            resolve(true);
          }
        })
      });
      // console.log(data);
      //对更新进行测试
      // var test = await new Promise((resolve,reject) => {
      //   User.find({
      //     name: data.name,
          
      //   },(err,docs) => {
      //     resolve(docs);
      //   })
      // });
      // console.log(test);
      if(!haveUser){
        // 更新user表
        var userUpdateMessage = await new Promise((resolve,reject) => {
          User.update({name: data.name},{
            hitCard:now,
          },(err) => {
            if(!err){
              resolve('ok');
            }else{
              reject(err);
            }
          })
        });
        // console.log(userUpdateMessage);
        // 更新record流水表
        var recordUpdateMessage = await new Promise((resolve,reject) => {
          User.update({name: data.name,createTime: {
            $gte: aDayAgo,
            $lt: nowday,
          }},{
            hitCardTime: now,
            use: true,
            getMoney: 0,
            got: false,
          },(err) => {
            if(!err){
              resolve('ok');
            }else{
              reject(err);
            }
          })
        });
        if(userUpdateMessage == "ok"&&recordUpdateMessage == "ok"){
          message = "ok"
        }else{
          console.log(err);
          message = "后端更新数据出错，请重试";
        }
        
      }else{
        message = "您已签过到，请勿重复操作"
      }
    } else {
      message = "改了前端代码么，哼哼";
    }
    // console.log(message);
    ctx.body = message;
  }
  // async getMoney() {
  //   const ctx = this.ctx;
  //   var data = ctx.request.body;
  //   var User = ctx.model.User;
  //   var Record = ctx.model.Record;
  //   //计算的查询日期
  //   const now = new Date();
  //   const nowDate = now.getDate();
  //   const nowMonth = now.getMonth();
  //   const nowYear = now.getFullYear();
  //   const nowday = new Date(nowYear,nowMonth,nowDate - 0);
  //   const aDayAgo = new Date(nowYear,nowMonth,nowDate - 1);
  //   // 查询昨天的参与人数
  //   var yesterdayJoinCount = await new Promise((resolve, reject) => {
  //     User.find({createTime: {
  //       $gte:aDayAgo,
  //       $lt: nowday
  //     }}, (err, docs) => {
  //       resolve(docs.length);
  //     })
  //   })
  //   // 查询今天的签到人数
  //   var hitCardCount = await new Promise((resolve, reject) => {
  //     Record.find({
  //       hitCardTime:{
  //         $gte:nowday,
  //         $lt: now
  //       },
  //       use: true
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
  //     redBagArr[i] = Number(redBagArr[i].toFixed(2));
  //   }
  //   console.log(redBagArr);
  //   // 分配好的红包钱redBagArr，接下来将redBagArr的元素分别update到每一个Collection
  //   for (let i = 0; i < redBagArr.length; i++) {
  //     var updateSuccess = await new Promise((resolve,reject) => {
  //       Record.update({
  //         hitCardTime:{
  //           $gte:nowday,
  //           $lt: now
  //         },
  //         got:false
  //       },{
  //         getMoney: redBagArr[i],
  //         got: true
  //       },err => {
  //         if(!err){
  //           resolve('ok');
  //         }else{
  //           reject(err);
  //         }
  //       })
  //     });
  //     if(updateSuccess == 'ok'){
  //       console.log('第'+i+'个人更新成功');
  //     }else{
  //       console.log('第'+i+'个人更新失败，原因是'+ err);
  //     }
      
  //   }
  //   this.ctx.body = 'ok'
  // }
}

module.exports = HomeController;
