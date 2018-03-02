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
    <count-down class="timer" v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :currentTime="currentTime" :startTime="startTime" :endTime="1519938000000" :tipText="'距离开始文字1'" :tipTextEnd="'距离结束文字1'" :endText="'结束自定义文字2'" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>
    <div class="list">
      <span class="listTitle">排行榜</span>
      <div v-for="(info,index) in infos" :key="info">
        <span>{{index+1}}</span>
        <span> {{info.name}}</span>
        <span>共签到{{info.createTime.length}}次</span>
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
import CountDown from 'vue2-countdown'
export default {
  components: {
    CountDown
  },
  data() {
    return {
      name: "ft",
      btnText: "支付一元立即参与",
      money: 0,
      peopleCount: 0,
      startTime:( new Date() ).getTime(),
      currentTime:( new Date() ).getTime(),
      infos:[],
    };
  },
  // ready: function countTime() {
  //   setTimeout(function() {
  //     var date = new Date();
  //     var month = date.getMonth() + 1;
  //     var day = date.getDate();
  //     var now = date.getTime();
      // var endDate = new Date("2018-3-2 05:00:00");
      // var end = endDate.getTime();
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
  mounted: async function get() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    axios
      .post("/getInfo", { name: this.name, time: { month: month, day: day } })
      .then(res => {
        // console.log(res.data.haveUser);
        var haveUser = res.data.haveUser;
        
        if (haveUser == "yes"){
          console.log(res.data);
          this.infos = res.data.db;
          // this.btnText = "抢红包";
        }
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

    // var now = date.getTime();
    // var endDate = new Date("2018-3-2 05:00:00");
    // var end = endDate.getTime();
    // console.log(now);
    // this.currentTime = now;
    // this.startTime = now;
    // this.endTime = end;
  },
  methods: {
    countDownS_cb: function (x) {
      console.log(x)
    },
    countDownE_cb: function (x) {
      console.log(x)
    },
    // countTime(){
    //   var date = new Date();
    //   var now = date.getTime();
    //   var month = date.getMonth()+1;
    //   var day =date.getDate() + 1;
    //   var endTime = new Date("2018-"+month+"-"+day+" 05:00:00");
    //   var end = endTime.getTime();
    //   var leftTime = end-now;
    //   console.log(leftTime);
    //   var h,m,s;
    //   if (leftTime>=0) {
    //     h = Math.floor(leftTime/1000/60/60%24);
    //     m = Math.floor(leftTime/1000/60%60);
    //     s = Math.floor(leftTime/1000%60);
    //   }
    //   console.log(h,m,s);
    //   this.h = h;
    //   this.m = m;
    //   this.s = s;
    //   setTimeout(countTime,1000);
    // },
    join() {
      if (this.btnText === "支付一元立即参与") {
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
            
          }
        });
      }else{
        alert('时间还没到，不能领取哦')
      }
      // alert("支付成功");
      // var date = new Date();
      // var year = date.getUTCFullYear();
      // var month = date.getMonth() + 1;
      // var day = date.getDate();
      // console.log(year, month, day);
      // axios
      //   .post("/join", {
      //     info: {
      //       name: this.name,
      //       money: 1,
      //       createTime: {
      //         year: year,
      //         month: month,
      //         day: day
      //       }
      //     }
      //   })
      //   .then(res => {
      //     if ((res.data = "ok")) {
      //       this.btnText = "抢红包";
      //       countTime();
      //     }
      //   });
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
  left: 110px;
}
</style>