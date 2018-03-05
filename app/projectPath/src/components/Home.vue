<style>
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
}
.joinText {
  padding: 10px 100px;
  box-shadow: 5px 5px 5px #ffe4b3;
  border-radius: 10px;
  background-color: #ffc351;
}
.joinRule {
  font-size: 12px;
  padding-top: 10px;
  color: grey;
}

.title {
  font-size: 20px;
  font-family: "黑体";
  font-weight: bolder;
  margin: 20px 0 0 85px;
  width: 150px;
}
.situationText {
  margin: 5px 0 20px 55px;
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
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.userTitle {
  margin-top: -5px;
  font-size: 10px;
  padding: 1px 10px;
  font-weight: lighter;
  background-color: #008001;
  color: white;
}
.describe {
  font-size: 11px;
}
.foot {
  display: flex;
  justify-content: space-around;
  height: 50px;
  width: 100%;
}
.tabIcon {
  height: 20px;
  margin-left: 3px;
}
.tabName {
  font-size: 13px;
}
.My {
  color: hsl(202, 100%, 50%);
}
</style>



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
                        <div class="userTitle">早起之星</div>
                        <div class="name">{{name1}}</div>
                        <div class="describe">{{hitCardTime}}打卡</div>
                    </div>
                    <div class="user">
                        <div class="userHead">
                            <img class="headPic" src="../../static/picture/head.png" alt="">
                        </div>
                        <div class="userTitle">运气之星</div>
                        <div class="name">{{name2}}</div>
                        <div class="describe">{{hitCardMoney}}元</div>
                    </div>
                    <div class="user">
                        <div class="userHead">
                            <img class="headPic" src="../../static/picture/head.png" alt="">
                        </div>
                        <div class="userTitle">毅力之星</div>
                        <div class="name">{{name3}}</div>
                        <div class="describe">连续{{hitCardCount}}次</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="tab">
                <img class="tabIcon" src="../../static/picture/home.png" alt="">
                <div class="tabName">首页</div>
            </div>
            <div class="tab">
                <router-link to="/My">
                    <img class="tabIcon" src="../../static/picture/me.png" alt="">
                    <div class="tabName My">我的</div>
                </router-link>
                
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return{
            name: 'newbility-xp',
            totalPeople: 1111111,
            totalMoney: 1111111,
            successPeople: 20000,
            failPeople: 2000,
            name1: 'xp',
            name2: 'ft',
            name3: 'lbn',
            hitCardTime: '05:00',
            hitCardMoney: 3,
            hitCardCount: 50,
            btnText: '参与打卡挑战'
        }
    },
    methods: {
        join() {
            // console.log('ok');
            if (this.btnText === '参与打卡挑战') {
                alert('支付成功,参与挑战');
                var date = new Date();
                var year = date.getUTCFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                var data = {
                    info:{
                        name: this.name,
                        money: 1,
                        createTime: {
                            year: year,
                            month: month,
                            day: day
                        }
                    }
                }
                axios.post("/join",data).then(res => {
                    if ((res.data = "ok")) {
                        window.location.reload(); 
                    }else{
                        alert("时间还没到哦");
                    }
                })
                
            }
        }
    }
};
</script>
