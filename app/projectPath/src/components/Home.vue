<template>
    <div class="contain">
        <div class="head">
            <img class="bg" src="../../static/picture/bg2.jpg" alt="">
            <div class="info">
                <div class="infoText1">明早参与打卡挑战的人数</div>
                <div class="peopleCount">{{totalPeople}}</div>
                <div class="infoText2">当前共有<span class="totalMoney">{{totalMoney}}</span>元打卡金</div>

            </div>
        </div>
        <div class="body">
            <div class="join">
                <div v-on:click='join' class="joinText">
                    {{btnText}}
                </div>
                <router-link to="/Rule">
                    <div class="joinRule">
                        挑战规则 >>
                    </div>
                </router-link>
                <div>
                    <count-down class="timer" v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :currentTime="currentTime" :startTime="startTime" :endTime="endTime" :tipText="'距离开始文字1'" :tipTextEnd="'距离结束文字1'" :endText="'结束自定义文字2'" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分钟'" :secondsTxt="'秒'"></count-down>
                </div>
            </div>
            <div class="situation">
                <div class="todaySituation">
                    <div class="title">今日打卡战况</div>
                    <div class="situationText">
                        {{successPeople}}人打卡成功,{{failPeople}}人打卡失败
                    </div>
                </div>
                <div class="users">
                    <div class="user">
                        <div class="userHead">
                            <img class="headPic" src="../../static/picture/head.png" alt="">
                        </div>
                        <div class="userTitle color1">早起之星</div>
                        <div class="name">{{name1}}</div>
                        <div class="describe">{{hitCardTime}}打卡</div>
                    </div>
                    <div class="user">
                        <div class="userHead">
                            <img class="headPic" src="../../static/picture/head.png" alt="">
                        </div>
                        <div class="userTitle color2">运气之星</div>
                        <div class="name">{{name2}}</div>
                        <div class="describe">{{hitCardMoney}}元</div>
                    </div>
                    <div class="user">
                        <div class="userHead">
                            <img class="headPic" src="../../static/picture/head.png" alt="">
                        </div>
                        <div class="userTitle color3">毅力之星</div>
                        <div class="name">{{name3}}</div>
                        <div class="describe">连续{{hitCardCount}}次</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="tab">
                <img class="tabIcon" src="../../static/picture/home.png" alt="">
                <div class="tabName Home">首页</div>
            </div>
            <router-link to="/My">
                <div class="tab">
                    <img class="tabIcon" src="../../static/picture/me.png" alt="">
                    <div class="tabName My">我的</div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import CountDown from "vue2-countdown";
export default {
  components: {
    CountDown
  },
  data() {
    return {
      name: "newbility-xp",
      totalPeople: 1111111,
      totalMoney: 1111111,
      successPeople: 2,
      failPeople: 3,
      name1: "xp",
      name2: "feit",
      name3: "lbn",
      hitCardTime: "05:00",
      hitCardMoney: 3,
      hitCardCount: 50,
      btnText: "参与打卡挑战",
      startTime: new Date().getTime(),
      currentTime: new Date().getTime(),
      openRedBag: false
    };
  },
  computed: {
    endTime() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var day = date.getDate() + 1;
      var time = new Date("2018-" + month + "-" + day + " 05:00:00").getTime();
      return time;
    }
  },
  mounted: async function get() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var data = {
      name: this.name,
      time: {
        month: month,
        day: day
      }
    };
    //这里用time_range方法判断签到时间是否在早八点到五点
    this.openRedBag = this.time_range('05:00','24:00');
    axios.post("/getInfo", data).then(res => {
      var haveUser = res.data.haveUser;
      this.infos = res.data.db;
      this.totalPeople = res.data.db.length;
      this.totalMoney = res.data.db.length;
      if (haveUser) {
        this.btnText = "签到";
      } else {
        this.btnText = "参与打卡挑战";
      }
    });
  },
  methods: {
    countDownS_cb: function(x) {
      console.log("计时开始");
    },
    countDownE_cb: function(x) {
      console.log("计时结束");
    },
    join() {
      if (this.btnText === "参与打卡挑战") {
        alert("支付成功,参与挑战");
        var date = new Date();
        var year = date.getUTCFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var data = {
          info: {
            name: this.name,
            money: 1,
            createTime: {
              year: year,
              month: month,
              day: day
            }
          }
        };
        axios.post("/join", data).then(res => {
          if ((res.data = "ok")) {
            window.location.reload();
          }
        });
      } else if (this.btnText === "签到" && this.openRedBag) {
        // alert("签到成功,明天再接再厉!");
        var now = new Date();  
        var year = now.getFullYear();       //年  
        var month = now.getMonth() + 1;     //月  
        var day = now.getDate();            //日  
        var h = now.getHours();            //时  
        var m = now.getMinutes();          //分 
        var data = {
          name: this.name,
          year: year,
          month: month,
          day: day,
          hour: h,
          minute: m,
        }
        axios.post('/successHitCard',data).then(res => {
          if (res.data == "ok") {
            alert("签到成功,明天再接再厉!");
            this.btnText = "参与打卡挑战";
          }else{
            alert(res.data);
          }
        })
        
      } else {
        alert("时间还没到哦");
      }
    },
    time_range(beginTime, endTime) {
      var strb = beginTime.split(":");
      if (strb.length != 2) {
        return false;
      }

      var stre = endTime.split(":");
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
      if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style scoped>
.contain {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head {
  height: 270px;
  margin-bottom: 20px;
}
.bg {
  width: 100%;
  position: absolute;
  left: 0;
  z-index: -1;
}
.info {
  z-index: 10px;
  color: white;
  margin: 80px;
  text-align: center;
  font-size: 13px;
  font-weight: lighter;
}
.totalMoney {
  color: #539e19;
  font-weight: bold;
}
.peopleCount {
  font-size: 40px;
  font-weight: normal;
}
.body {
  flex: 1;
  overflow: hidden;
}

.join {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.joinText {
  width: 300px;
  padding: 5px 0px;
  box-shadow: 5px 5px 5px #ffe4b3;
  border-radius: 10px;
  background-color: #ffc351;
}
.joinRule {
  font-size: 12px;
  padding-top: 10px;
  color: grey;
}
.timer {
  font-size: 14px;
  font-family: "\9ED1\4F53";
}
.title {
  font-size: 20px;
  font-family: "黑体";
  font-weight: bolder;
  margin: 10px 0 0 105px;
  width: 150px;
}
.situation {
  text-align: center;
}
.situationText {
  /* margin: 5px 0 20px 35px; */
  font-size: 13px;
  font-family: "黑体";
}

.headPic {
  height: 60px;
  border: 3px solid #d3cfcf;
  border-radius: 60px;
  overflow: hidden;
}
.users {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 25px;
}
.userTitle {
  margin-top: -5px;
  font-size: 10px;
  padding: 1px 10px;
  font-weight: lighter;

  color: white;
}
.color1 {
  background-color: #008001;
}
.color2 {
  background-color: #00a3fd;
}
.color3 {
  background-color: #ffc352;
}
.describe {
  font-size: 11px;
}
.foot {
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-around;
  height: 50px;
  width: 100%;
}
.tabIcon {
  height: 20px;
  margin-left: 3px;
  margin-top: 4px;
}
.tabName {
  font-size: 13px;
}
.My {
  color: hsl(202, 100%, 50%);
}
</style>