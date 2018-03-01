<template>
  <div class="contain">
    <div class="bg">
      <div class="info">
        <span class="infoText">共<span class="money">{{money}}</span>元</span><br>
        <span class="peopleCount">当前已有{{peopleCount}}人参与</span>

        </div>
      <img src="../../static/picture/redBag.jpg" class="redBag" alt="">
      <button class="poenBtn" v-on:click="join">
        {{btnText}}
      </button>
    </div>
    <span class="timer">倒计时{{h}}小时{{m}}分{{s}}秒</span>
    <div class="list">
      <span class="listTitle">排行榜</span>
      <div>
        <span>1</span>
        <span> 昵称</span>
        <span>共签到n次</span>
      </div>
    </div>

    <footer class="tabbar">
      <div class="tabbarItem">
        天天红包
      </div>
      <div class="tabbarItem">
        我的主页
      </div>
    </footer>

  </div>
  
  

 
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      name: "ft",
      btnText: "支付一元立即参与",
      money: 0,
      peopleCount: 0,
      h: 0,
      m: 0,
      s: 0
    };
  },
  // ready: function countTime() {
  //   setTimeout(function() {
  //     var date = new Date();
  //     var month = date.getMonth() + 1;
  //     var day = date.getDate();
  //     var now = date.getTime();
  //     var endDate = new Date("2018-3-2 05:00:00");
  //     var end = endDate.getTime();
  //     var leftTime = end - now;
  //     console.log(leftTime);
  //     var h, m, s;
  //     if (leftTime >= 0) {
  //       h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
  //       m = Math.floor((leftTime / 1000 / 60) % 60);
  //       s = Math.floor((leftTime / 1000) % 60);
  //     }
  //     console.log(h, m, s);
  //     this.h = h;
  //     this.m = m;
  //     this.s = s;
  //   }, 1000);
  // },
  mounted: function get() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    axios
      .post("/getInfo", { name: "xp", time: { month: month, day: day } })
      .then(res => {
        console.log(res);
        this.money = res.data.count;
        this.peopleCount = res.data.count;
      });

    // var now = date.getTime();

    // var endTime = new Date("2018-"+month+"-"+day+"05:00:00");
    // var end = endTime.getTime();
    // var leftTime = end-now;
    // var h,m,s;
    // if (leftTime>=0) {
    //   h = Math.floor(leftTime/1000/60/60%24);
    //   m = Math.floor(leftTime/1000/60%60);
    //   s = Math.floor(leftTime/1000%60);
    // }
    // console.log(h,m,s);
    // this.h = h;
    // this.m = m;
    // this.s = s;
    // setTimeout(countTime,1000);

    // var now = date.getTime();
    // var endDate = new Date("2018-3-2 05:00:00");
    // var end = endDate.getTime();
    // var leftTime = end-now;
    // console.log(leftTime);
    // var h,m,s;
    // if (leftTime>=0) {
    //   h = Math.floor(leftTime/1000/60/60%24);
    //   m = Math.floor(leftTime/1000/60%60);
    //   s = Math.floor(leftTime/1000%60);
    // }
    // console.log(h,m,s);
    // this.h = h;
    // this.m = m;
    // this.s = s;
    // setTimeout(get,1000);
  },
  methods: {
    countTime(){
      var date = new Date();
      var now = date.getTime();
      var month = date.getMonth()+1;
      var day =date.getDate() + 1;
      var endTime = new Date("2018-"+month+"-"+day+" 05:00:00");
      var end = endTime.getTime();
      var leftTime = end-now;
      console.log(leftTime);
      var h,m,s;
      if (leftTime>=0) {
        h = Math.floor(leftTime/1000/60/60%24);
        m = Math.floor(leftTime/1000/60%60);
        s = Math.floor(leftTime/1000%60);
      }
      console.log(h,m,s);
      this.h = h;
      this.m = m;
      this.s = s;
      setTimeout(countTime,1000);
    },
    join() {
      alert("支付成功");
      var date = new Date();
      var year = date.getUTCFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      console.log(year, month, day);
      axios
        .post("/join", {
          info: {
            name: this.name,
            money: 1,
            createTime: {
              year: year,
              month: month,
              day: day
            }
          }
        })
        .then(res => {
          if ((res.data = "ok")) {
            this.btnText = "抢红包";
            countTime();
          }
        });
    }
  },
  computed: {}
};
</script>

<style>
.contain {
  height: 100vh;
  background-color: #fe0000;
}
.info {
  position: absolute;
  left: 140px;
  top: 10px;
}
.infoText {
  font-size: 30px;
}
.peopleCount {
  margin-left: -20px;
}
.money {
  color: azure;
  font-size: 30px;
}
.redBag {
  width: 100%;
  height: 100%;
}
.poenBtn {
  height: 50px;
  width: 150px;
  position: absolute;
  top: 160px;
  left: 110px;
  color: red;
}
.list {
  position: absolute;
  height: 300px;
  width: 100%;
  top: 250px;
}
.tabbar {
  height: 60px;
  background-color: aliceblue;
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0;
}
.tabbarItem {
  margin: 20px 60px;
}
.timer {
  position: absolute;
  top: 220px;
  left: 70px;
}
</style>