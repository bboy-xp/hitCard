'use strict';

const Controller = require('egg').Controller;
const { readFileSync } = require('fs');
const { resolve } = require('path');
const axios = require('axios');

class HomeController extends Controller {
  async index() {
    // const data = readFileSync(resolve(__dirname, '../public/index1.html'), 'utf8');
    // this.ctx.body = data;
    this.ctx.body = 'ok';
  }
  async join() {
    const ctx = this.ctx;
    var name = ctx.request.body.info.name;
    var money = ctx.request.body.info.money;
    var headPicUrl = ctx.request.body.info.headPicUrl;
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
    const aDayAgo = new Date(nowYear, nowMonth, nowDate - 1);
    // 查询是否数据库里有用户，如果有将createTime追加到用户的数据里面
    const haveUser = await new Promise((resolve, reject) => {
      User.find({
        name
      }, function (err, docs) {
        if (docs.length !== 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    })
    // console.log(haveUser);
    var record = new Record({
      name: name,
      headPicUrl: headPicUrl,
      money: 1,
      createTime: new Date(),
      use: false
    })
    record.save();

    if (!haveUser) {
      // 如果用户不存在，将数据插入到user表里面
      var user = new User({
          name: name,
          headPicUrl: headPicUrl,
          createTime: now,
        })
        user.save();
        // console.log('执行没有用户的操作');
      } else {
      // 如果用户存在，更新user表里面的creatTime
      await new Promise((resolve, reject) => {
        User.update({ name: name }, {
          createTime: now,
        }, err => {
          if (!!err) {
            console.log(err);
            reject(err);
          } else {
            resolve("ok")
          }
        })
      })
    }
    ctx.body = 'ok';
  }
  async getInfo() {
    const ctx = this.ctx;
    var User = ctx.model.User;
    var Record = ctx.model.Record;
    var Password = ctx.model.Password;
    //计算的查询日期
    const now = new Date();
    const nowDate = now.getDate();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    const aDayAgo = new Date(nowYear, nowMonth, nowDate - 1);
    const nowday = new Date(nowYear, nowMonth, nowDate);
    var openid = ctx.cookies.get('openid');
    var name = await new Promise((resolve,reject) => {
      Password.findOne({openid:openid},(err,doc) => {
        resolve(doc.name);
      })
    })
    // console.log(name);
    var info = {};
    
    //注意Model.find查询数据库时回掉函数有顺序，先err后docs
    //查询今天支付总人数
    info.todayJoinCount = await new Promise((resolve, reject) => {
      User.find({
        createTime: {
          $gte: nowday,
          $lt: now,
        }
      }, function (err, docs) {
        resolve(docs.length);
      });
    })
    //查询昨天的总人数
    info.yesterdayJoinCount = await new Promise((resolve, reject) => {
      Record.find({
        createTime: {
          $gte: aDayAgo,
          $lt: nowday,
        }
      }, function (err, docs) {
        resolve(docs.length);
      });
    })
    // 查询用户是否已支付
    var todayHaveUser = await new Promise((resolve, reject) => {
      User.find({
        name: name, createTime: {
          $gte: nowday,
          $lt: now,
        }
      }, function (err, docs) {
        if (docs.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
    info.todayHaveUser = todayHaveUser;
    var yesterdayHaveUser = await new Promise((resolve, reject) => {
      User.find({
        name: name, createTime: {
          $gte: aDayAgo,
          $lt: nowday,
        }
      }, function (err, docs) {
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
        hitCardTime: {
          $gte: nowday,
          $lt: now
        }
      }, function (err, docs) {
        resolve(docs)
      });
    });
    info.hitCardDocs = hitCardDocs;
    //查询昨天的参与挑战的情况
    var yesterdayJoinDocs = await new Promise((resolve, reject) => {
      Record.find({
        createTime: {
          $gte: aDayAgo,
          $lt: nowday
        }
      }, (err, docs) => {
        resolve(docs);

      })
    })
    info.yesterdayJoinDocs = yesterdayJoinDocs;

    //获取早起之星
    var earlestStar = await Record.find({
      hitCardTime: {
        $gte: nowday,
        $lt: now
      }
    }, (err, docs) => {

    }).sort({ 'hitCardTime': 1 });
    info.earlestStar = earlestStar[0];
    //获取运气之星
    var luckStar = await Record.find({
      hitCardTime: {
        $gte: nowday,
        $lt: now
      },
      got: true
      
    }).sort({ 'getMoney': -1 });
    info.luckStar = luckStar[0];
    //获取毅力之星
    var harderStar = await User.find({
      money:{
        $gte: 0
      }
    }).sort({ 'money': -1 });
    // console.log(harderStar);
    info.harderStar = harderStar[0];
    ctx.body = info;
  }
  async meGetInfo() {
    const ctx = this.ctx;
    var name = ctx.request.body.name;
    var Record = ctx.model.Record;
    var info = {};
    // 用await promise的方法阻塞获得数据，就不会出现前端玄学接不到数据的情况了
    info.totalMoney = await new Promise((resolve, reject) => {
      Record.find({ name: name }, function (err, docs) {
        resolve(docs.length);
      });
    });
    var totalHitCard = await new Promise((resolve, reject) => {
      Record.find({
        name: name,
        use: true,
        got: true
      }, (err, docs) => {
        resolve(docs);
      })
    })
    info.totalHitCard = totalHitCard;
    var harvest = 0;
    for (let i = 0; i < totalHitCard.length; i++) {
      harvest += totalHitCard[i].getMoney
    }
    // console.log(totalHitCard);
    info.harvest = harvest;
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
    var nowTime = String(now.getHours() + ':' + now.getMinutes());
    var canOpenRedBag = time_range("05:00", "08:00", nowTime);
    var message;
    //计算的查询日期
    const nowDate = now.getDate();
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    const nowday = new Date(nowYear, nowMonth, nowDate - 0);
    const aDayAgo = new Date(nowYear, nowMonth, nowDate - 1);
    //后端判断是否数据库里有用户，和用户从前端发过来的时间是否符合时间段
    if (canOpenRedBag) {

      var haveUser = await new Promise((resolve, reject) => {
        User.find({
          name: data.name, hitCard: {
            $gte: nowday,
            $lt: now,
          }
        }, (err, docs) => {
          if (docs.length == 0) {
            resolve(false);
          } else {
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
      if (!haveUser) {
        // 更新user表
        var userUpdateMessage = await new Promise((resolve, reject) => {
          User.update({ name: data.name }, {
            hitCard: now,
            $inc: {
              money: 1,
            }
          }, (err) => {
            if (!err) {
              resolve('ok');
            } else {
              reject(err);
            }
          })
        });
        // console.log(userUpdateMessage);
        // 更新record流水表
        var recordUpdateMessage = await new Promise((resolve, reject) => {
          Record.update({
            name: data.name, createTime: {
              $gte: aDayAgo,
              $lt: nowday,
            }
          }, {
              hitCardTime: now,
              use: true,
              getMoney: 0,
              got: false,
            }, (err) => {
              if (!err) {
                resolve('ok');
              } else {
                reject(err);
              }
            })
        });
        if (userUpdateMessage == "ok" && recordUpdateMessage == "ok") {
          message = "ok"
        } else {
          console.log(err);
          message = "后端更新数据出错，请重试";
        }

      } else {
        message = "您已签过到，请勿重复操作"
      }
    } else {
      message = "改了前端代码么，哼哼";
    }
    // console.log(message);
    ctx.body = message;
  }
  async getCode() {
    const ctx = this.ctx
    // console.log('走到这里了');
    var Password = ctx.model.Password;
    // 获取code
    const code = ctx.query.code;
    // console.log(code);
    const codeData = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx21174deccc6b6c4b&secret=903087872adb2b41d2a4cea77a53446f&code=${code}&grant_type=authorization_code`); 
    const access_token = codeData.data.access_token;
    const openid = codeData.data.openid;
    const refresh_token = codeData.data.refresh_token;
    const userMessages = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`);
    
    const haveUser = await new Promise((resolve, reject) => {
      Password.find({
        openid: userMessages.data.openid,
        name: userMessages.data.nickname
      }, function (err, docs) {
        // console.log(docs);
        if (docs.length !== 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
    });
    // console.log(haveUser);
    if (!haveUser) {
      var user = new Password({
        name: userMessages.data.nickname,
        headImgUrl: userMessages.data.headimgurl,
        sex: userMessages.data.sex,
        city: userMessages.data.city,
        province: userMessages.data.province,
        country: userMessages.data.country,
        openid: userMessages.data.openid
      })
      user.save();
      ctx.cookies.set('openid', userMessages.data.openid, new Date(new Date().valueOf() + 30 * 1 * 24 * 60 * 60 * 1000),'/');
      const origanData = readFileSync(resolve(__dirname, '../public/index1.html'), 'utf8');
      // console.log('即将执行ctx.body1');
      ctx.body = origanData;
    } else {
      // console.log(userMessages.data.openid);
      // ctx.cookies.set('openid', ctx.cookies.get('openid'), new Date(new Date().valueOf() + 1 * 24 * 60 * 60 * 1000),'/');
      // console.log();
      // console.log(object);
      // let openId = ctx.cookies.get('openid');
      // console.log(openId);
      ctx.cookies.set('openid', openid, new Date(new Date().valueOf() + 30 * 1 * 24 * 60 * 60 * 1000),'/');
      const origanData = readFileSync(resolve(__dirname, '../public/index1.html'), 'utf8');
      // console.log('即将执行ctx.body2');
      ctx.body = origanData;
    }
    
    // // 用code请求获得access_token
    // axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx21174deccc6b6c4b&secret=903087872adb2b41d2a4cea77a53446f&code=${code}&grant_type=authorization_code`).then(function (res) {
    //   // console.log(res.data);
    //   const refresh_token = res.data.refresh_token;
    //   // 刷新access_token
    //   axios.get(`https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wx21174deccc6b6c4b&grant_type=refresh_token&refresh_token=${refresh_token}`).then(function (res) {
    //     // console.log(res.data);
    //     const access_token = res.data.access_token;
    //     const openid = res.data.openid;
    //     axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`).then(async function (res) {
    //       // console.log(res.data);
    //       var data = res.data;
    //       const haveUser = await new Promise((resolve, reject) => {
    //         Password.find({
    //           openid: data.openid,
    //           name: data.nickname
    //         }, function (err, docs) {
    //           console.log(docs);
    //           if (docs.length !== 0) {
    //             resolve(true);
    //           } else {
    //             resolve(false);
    //           }
    //         })
    //       });
    //       console.log(haveUser);
    //       if (!haveUser) {
    //         var user = new Password({
    //           name: data.nickname,
    //           headImgUrl: data.headimgurl,
    //           sex: data.sex,
    //           city: data.city,
    //           province: data.province,
    //           country: data.country,
    //           openid: data.openid
    //         })
    //         user.save();
    //         ctx.cookies.set('openid', data.openid, new Date(new Date().valueOf() + 1 * 24 * 60 * 60 * 1000));
    //         const origanData = readFileSync(resolve(__dirname, '../public/index1.html'), 'utf8');
    //         console.log('即将执行ctx.body');
    //         ctx.body = origanData;
    //       } else {
    //         console.log('即将执行ctx.body');
    //         ctx.body = '该用户名已处在'
    //       }
    //     })
    //   })
    // })
    // console.log(data.password);


  }
  // async login() {
  //   const ctx = this.ctx;
  //   var data = ctx.request.body;
  //   var Password = ctx.model.Password;
  //   const haveUser = await new Promise((resolve, reject) => {
  //     Password.find({
  //       name: data.username,
  //       password: data.password
  //     }, function (err, docs) {
  //       if (docs.length !== 0) {
  //         resolve(true);
  //       } else {
  //         resolve(false);
  //       }
  //     })
  //   });
  //   if(!haveUser){
  //     ctx.body = '用户不存在';
  //   }else{
  //     ctx.body = 'ok';
  //   }
  // }
  async checkLogin() {
    // console.log('走到这里了');
    const ctx = this.ctx;
    let openid = ctx.cookies.get('openid');
    // console.log('openid是'+openid);
    // console.log('openid:'+!!openid);
    var Password = ctx.model.Password;
    var data = {};
    if(!!openid){
      const haveUser = await new Promise((resolve, reject) => {
        Password.find({
          openid: openid
        },(err,docs) => {
          if(docs.legth == 0){
            resolve(false);
          }else{
            resolve(true);
          }
        })
      });
      // console.log('haveUser:'+haveUser);
      if(haveUser){
        const UserMessage = await new Promise((resolve, reject) => {
          Password.find({
            openid: openid
          },(err,docs) => {
            // console.log(docs);
            // console.log(docs[0].openid);
            data.name = docs[0].name;
            data.headImgUrl = docs[0].headImgUrl;
            data.openid = docs[0].openid;
            resolve('ok');
            // console.log('往data中插入数据完成');
          })
        });
        // console.log('离开数据库查询');
        data.message = 'yes';
        // console.log(data);
        ctx.body = data;
      }
    }else{
      // console.log('走到这里啦');
      data.message = 'no';
      ctx.body = data;
    }
    // ctx.body = 'ok';
    // const haveUser = await new Promise((resolve, reject) => {
    //   Password.find({
    //     openid: openid
    //   },(err,docs) => {
    //     if(docs.legth == 0){
    //       resolve(false);
    //     }else{
    //       resolve(true);
    //     }
    //   })
    // });
    // console.log(haveUser);
    // if(haveUser){
    //   ctx.body = 'yes';
    // }else{
    //   ctx.body = 'no';
    // }
  }
}

module.exports = HomeController;
