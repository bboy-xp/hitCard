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
                            <img class="headPic" v-bind:src=headPicSrc1 alt="">
                        </div>
                        <div class="userTitle color1">早起之星</div>
                        <div class="name">{{name1}}</div>
                        <div class="describe">{{hitCardTime}}打卡</div>
                    </div>
                    <div class="user">
                        <div class="userHead">
                            <img class="headPic" v-bind:src=headPicSrc2 alt="">
                        </div>
                        <div class="userTitle color2">运气之星</div>
                        <div class="name">{{name2}}</div>
                        <div class="describe">{{hitCardMoney}}元</div>
                    </div>
                    <div class="user">
                        <div class="userHead">
                            <img class="headPic" v-bind:src=headPicSrc3 alt="">
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
                <img class="tabIconHome" src="../../static/picture/blueHome.png" alt="">
                <div class="tabName Home">首页</div>
            </div>
                <div class="tab" v-on:click="gotoMy">
                    <img class="tabIcon" src="../../static/picture/blackMe.png" alt="">
                    <div class="tabName">我的</div>
                </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import CountDown from "vue2-countdown";
import { format } from "url";
import { setInterval, clearInterval } from "timers";
export default {
  components: {
    CountDown
  },
  data() {
    return {
      name,
      totalPeople: "Loading",
      totalMoney: 'Loading',
      successPeople: 0,
      failPeople: 0,
      name1: "",
      name2: "",
      name3: "",
      hitCardTime: "",
      hitCardMoney: 0,
      hitCardCount: 0,
      btnText: "参与打卡挑战",
      startTime: new Date().getTime(),
      currentTime: new Date().getTime(),
      openRedBag: false,
      canJoin: false,
      headPicUrl:'',
      headPicSrc1: "../../static/picture/head.png",
      headPicSrc2: "../../static/picture/head.png",
      headPicSrc3: "../../static/picture/head.png",
    };
  },
  computed: {
    endTime() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var nextDay = date.getDate() + 1;
      var today = date.getDate();
      var hour = date.getHours();
      if (hour >= 8) {
        var time = new Date(
          "2018-" + month + "-" + nextDay + " 05:00:00"
        ).getTime();
        return time;
      } else {
        var time = new Date(
          "2018-" + month + "-" + today + " 05:00:00"
        ).getTime();
        return time;
      }
    }
  },
  mounted: async function get() {
    //在这里拿到cookie判断
    
    const checkLogin = await axios.get('/checkLogin');
    // console.log(checkLogin.data);
    this.headPicUrl = checkLogin.data.headImgUrl;
    this.name = checkLogin.data.name;
    if(checkLogin.data.message == 'no'){
      this.$router.push('Login');
    }
    // this.name = this.$route.query.name;
    // console.log(this.$route.query.name);
    // console.log(this.name);
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    //这里用time_range方法判断签到时间是否在早八点到五点
    this.openRedBag = this.time_range("05:00", "08:00");
    //用time_range方法判断参与时间是否符合时间
    this.canJoin = this.time_range("08:00", "23:50");
    // console.log(that.name);
    // const that = this;
    var info = await new Promise((resolve, reject) => {
      axios.post("/getInfo").then(res => {
        // console.log(that.name);
        resolve(res.data);
      });
    });
    // console.log(info);

    //计算成功人数和失败人数
    this.totalPeople = info.todayJoinCount;
    this.totalMoney = info.todayJoinCount;
    //hitCardDocs查询数据库今天成功签到
    this.successPeople = info.hitCardDocs.length;
    //yesterdayJoinDocs查询昨天的参与挑战
    this.failPeople = info.yesterdayJoinDocs.length - info.hitCardDocs.length;

    // 开始写早起之星逻辑
    if (info.earlestStar != null) {
      var earlestStar = info.earlestStar;
      this.name1 = earlestStar.name;
      this.headPicSrc1 = earlestStar.headPicUrl;
      var earlestStarTime = earlestStar.hitCardTime;
      earlestStarTime = new Date(earlestStarTime);
      var earlestStarTimeHour = earlestStarTime.getHours();
      var earlestStarTimeMinute = earlestStarTime.getMinutes();
      if (earlestStarTimeHour < 10) {
        earlestStarTimeHour = "0" + earlestStarTimeHour;
      }
      if (earlestStarTimeMinute < 10) {
        earlestStarTimeMinute = "0" + earlestStarTimeMinute;
      }
      var earlestStarTimeStr = String(
        earlestStarTimeHour + ":" + earlestStarTimeMinute
      );
      this.hitCardTime = earlestStarTimeStr;
    }

    // 开始写运气之星的逻辑
    if (info.luckStar != null) {
      var luckStar = info.luckStar;
      this.name2 = luckStar.name;
      this.headPicSrc2 = luckStar.headPicUrl;
      this.hitCardMoney = luckStar.getMoney;
    }
    var now = new Date();
    var hour = now.getHours();

    // 开始写毅力之星的逻辑
    if (info.harderStar != null) {
      var harderStar = info.harderStar;
      this.name3 = harderStar.name;
      this.headPicSrc3 = harderStar.headPicUrl;
      this.hitCardCount = harderStar.money;
    }
    //判断时间在八点的前后，改变btntext的文字
    if (hour >= 8) {
      if (info.todayHaveUser) {
        this.btnText = "签到";
      } else {
        this.btnText = "参与打卡挑战";
      }
    } else {
      if (info.yesterdayHaveUser) {
        this.btnText = "签到";
      } else {
        this.btnText = "参与打卡挑战";
      }
    }
    //判断时间在5点前后，改变签到成功失败的人数
    if (hour >= 5) {
      //hitCardDocs查询数据库今天成功签到
      this.successPeople = info.hitCardDocs.length;
      //yesterdayJoinDocs查询昨天的参与挑战
      this.failPeople = info.yesterdayJoinDocs.length - info.hitCardDocs.length;
    } else {
      this.successPeople = 0;
      this.failPeople = 0;
    }
  },
  methods: {
    countDownS_cb: function(x) {
      console.log("计时开始");
    },
    countDownE_cb: function(x) {
      console.log("计时结束");
    },
    join() {
      if (this.btnText === "参与打卡挑战" && this.canJoin) {
        var data = {
          info: {
            name: this.name,
            money: 1,
            headPicUrl:this.headPicUrl
          }
        };
        axios.post("/join", data).then(res => {
          // console.log(res);
          if ((res.data = "ok")) {
            alert("支付成功,参与挑战");
            this.btnText = '签到';
            this.totalPeople += 1;
            this.totalMoney += 1;

            // 在参与成功之后，不需要重新加载一遍页面，只需要像后端发送一个取回最新数据的请求
            // window.location.reload();
          }
        });
      } else if (this.btnText === "签到" && this.openRedBag) {
        axios.post("/successHitCard", { name: this.name }).then(res => {
          if (res.data == "ok") {
            alert("签到成功,明天再接再厉!");
            this.btnText = "参与打卡挑战";
            window.location.reload();
          } else {
            alert(res.data);
          }
        });
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
    },
    gotoMy() {
      this.$router.replace({ path: "/My"});
    }
  }
};
</script>

<style scoped>

</style>


<style scoped>
html {
  font-size: calc(112.5% + 0.5vw);
}
.contain {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.head {
  height: 32%;
  margin-bottom: 3vh;
}
.bg {
  width: 100%;
  height: 33%;
  position: absolute;
  left: 0;
  z-index: -1;
}
.info {
  z-index: 10px;
  color: white;
  margin: 60px 80px 80px 80px;
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
  width: 80vw;
  padding: 5px 0px;
  box-shadow: 5px 5px 5px #ffe4b3;
  border-radius: 6px;
  background-color: #ffc351;
  font-size: 13px;
  color: white;
  letter-spacing: 1px;
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
  font-size: 18px;
  font-family: "黑体";
  font-weight: bolder;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 40vw;
}
.situation {
  text-align: center;
}
.situationText {
  margin-bottom: 3vh;
  font-size: 13px;
  font-family: "黑体";
}

.headPic {
  height: 9vh;
  border: 3px solid #d3cfcf;
  border-radius: 60px;
  overflow: hidden;
}
.users {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;
}
.userTitle {
  margin-top: 0px;
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
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-around;
  height: 50px;
  width: 100%;
}
.tabIcon {
  margin-top: 5px;
  height: 15px;
  width:15px;
  background-size:100% 100%;
}
.tabIconHome {
  margin-top: 5px;
  height: 15px;
  width:15px;
  background-size:100% 100%;
}
.tabName {
  font-size: 4vw;
}
.tab{
  display: flex;
  flex-direction:column;
  justify-content:space-around;
  align-items:center;
}
.Home {
  color: hsl(202, 100%, 50%);
}
</style>