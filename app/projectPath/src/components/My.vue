<template>
    <div class="contain">
        <div class="head">
            <img v-bind:src=headPicSrc alt="" class="bg">
            <div class="me">
                <img class="myHeadPic" src="../../static/picture/head.png" alt="">
                <div class="name">
                    {{name}}
                </div>
            </div>
            <div class="infos">
                <div class="info">
                    <div class="infoTitle">我的付出(元)</div>
                    <div class="infoCount">{{pay}}</div>
                </div>
                <div class="info">
                    <div class="infoTitle">我的收获(元)</div>
                    <div class="infoCount">{{harvest}}</div>
                </div>
                <div class="info">
                    <div class="infoTitle">累计打卡(天)</div>
                    <div class="infoCount">{{hitCard}}</div>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="title">战绩明细</div>
            <div class="details">
                <div class="detail" v-for = '(info,index) in infos' :key="index">
                    <div class="date">{{new Date(info.hitCardTime).getMonth()+1}}-{{new Date(info.hitCardTime).getDate()}}</div>
                    <div class="hitCard">已打卡</div>
                    <div class="money">+{{info.getMoney}}</div>
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="tab" v-on:click="gotoHome">
                <img class="tabIconHome" src="../../static/picture/blackHome.png" alt="">
                <div class="tabName Home">首页</div>
            </div>
            <div class="tab">
                <img class="tabIcon" src="../../static/picture/blueMe.png" alt="">
                <div class="tabName My">我的</div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { clearTimeout } from "timers";
export default {
  data() {
    return {
      name,
      pay: 0,
      harvest: 0,
      hitCard: 0,
      infos: [],
      headPicSrc: "../../static/picture/bg.jpg"
    };
  },
  mounted: async function() {
    this.name = this.$route.query.name;
    axios.post("/meGetInfo", { name: this.name }).then(res => {
      this.hitCard = res.data.totalHitCard.length;
      var totalHitCard = res.data.totalHitCard;
      var totalMoney = 0;
      for (let i = 0; i < totalHitCard.length; i++) {
        totalMoney += totalMoney;
      }
      this.pay = res.data.totalMoney;
      this.harvest = res.data.harvest;
      this.infos = totalHitCard;
      // console.log(res.data);
    });
  },
  methods: {
    gotoHome() {
      this.$router.replace({ path: "/Home", query: { name: this.name } });
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
  height: 200px;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.bg {
  width: 100%;
  position: absolute;
  left: 0;
  z-index: -1;
}
.me {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.myHeadPic {
  height: 60px;
  width: 60px;
  border: 3px solid rgb(247, 236, 236);
  border-radius: 60px;
  overflow: hidden;
  margin: 10px auto 0 auto;
}
.name {
  font-size: 21px;
  color: #ffffff;
}
.infos {
  margin-top: -65px;
  display: flex;
  width: 100%;
  color: white;
  text-align: center;
}
.info {
  margin-top: 80px;
  width: 22vw;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.infoTitle {
  margin-left: 10%;
  width: 100px;
  font-size: 15px;
}
.infoCount {
  font-size: 20px;
}
.body {
  flex: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  position: relative;
  flex-direction: column;
}
.title {
  margin: 0;
  font-size: 16px;
  font-weight: lighter;
  font-size: 14px;
  padding: 3px 15px;
  background-color: #eeeeee;
  width: 100%;
}
.details {
  overflow: scroll;
}
.detail {
  border-bottom: 1px solid #efefef;
  display: flex;
  height: 7vh;
  align-items: center;
  font-size: 14px;
}
.date {
  margin: 0 10px 0 15px;
  color: #909090;
}
.hitCard {
  flex: 1;
  color: #ffcb6c;
}
.money {
  margin-right: 20px;
  color: #7fb853;
}

.foot {
  background-color: #f2f2f2;
  display: flex;
  justify-content: space-around;
  height: 50px;
  width: 100%;
}
.tabIcon {
  height: 25px;
  width: 25px;
  background-size: 100% 100%;
}
.tabIconHome {
  height: 25px;
  width: 25px;
  background-size: 100% 100%;
}
.tabName {
  font-size: 9px;

}
.tab {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center
}
.My {
  color: hsl(202, 100%, 50%);
}

</style>