module.exports = {
  schedule: {
    cron: '0 30 8 * * *',//早上八点半执行
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    var User = ctx.model.User;
    var Record = ctx.model.Record;
    //计算的查询日期
    const now = new Date();
    const nowDate = now.getDate();
    
    const nowMonth = now.getMonth();
    const nowYear = now.getFullYear();
    const nowday = new Date(nowYear,nowMonth,nowDate - 0);
    const aDayAgo = new Date(nowYear,nowMonth,nowDate - 1);
    // 查询昨天的参与人数
    var yesterdayJoinCount = await new Promise((resolve, reject) => {
      User.find({createTime: {
        $gte:aDayAgo,
        $lt: nowday
      }}, (err, docs) => {
        resolve(docs.length);
      })
    })
    // 查询今天的签到人数
    var hitCardCount = await new Promise((resolve, reject) => {
      Record.find({
        hitCardTime:{
          $gte:nowday,
          $lt: now
        },
        use: true
      }, function (err, docs) {
        resolve(docs.length);
      });
    });
    // 红包分配
    var totalMoney = yesterdayJoinCount - hitCardCount;
    var people = hitCardCount;
    function rp(total, n) {
      var remain = total
      var ret = []
      for (let i = 0; i < n - 1; i++) {
        let m = Math.ceil(Math.random() * 100 * (remain - (n - (i + 1)) * 0.01)) / 100
        ret.push(m)
        remain -= m
      }
      ret.push(Number(remain.toFixed(2)))
      return ret
    }
    var redBagArr = rp(totalMoney, people);
    for (let i = 0; i < redBagArr.length; i++) {
      redBagArr[i] += 1;
      redBagArr[i] = Number(redBagArr[i].toFixed(2));
    }
    console.log(redBagArr);
    // 分配好的红包钱redBagArr，接下来将redBagArr的元素分别update到每一个Collection
    for (let i = 0; i < redBagArr.length; i++) {
      var updateSuccess = await new Promise((resolve,reject) => {
        Record.update({
          hitCardTime:{
            $gte:nowday,
            $lt: now
          },
          got:false
        },{
          getMoney: redBagArr[i],
          got: true
        },err => {
          if(!err){
            resolve('ok');
          }else{
            reject(err);
          }
        })
      });
      if(updateSuccess == 'ok'){
        console.log('第'+i+'个人更新成功');
      }else{
        console.log('第'+i+'个人更新失败，原因是'+ err);
      }
      
    }
  },
};