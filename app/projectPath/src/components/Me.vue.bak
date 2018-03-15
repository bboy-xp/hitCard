<template>
  <div class="contain">
    <img src="../../static/picture/redBag.jpg" class="redBag" alt="">
    <div class="body">
      <div class="head">
        <img class="headPic" src="../../static/picture/head.png" alt="">
        <div class="name">{{name}}</div>
      </div>
      <div>
        <div class="infoText">累计投入(元)</div>
        <div class="infoText">累计赚取(元)</div>
        <div class="infoText">成功打卡(天)</div>
      </div>
      <div>
        <div class="infoCount">{{input}}</div>
        <div class="infoCount">{{earn}}</div>
        <div class="infoCount">{{days}}</div>
      </div>
      <div class="function">
        <div v-on:click='share' class="functionText">
          炫耀战绩
        </div>
        <div v-on:click='realMoney' class="functionText">
          点击提现
        </div>
      </div>
    </div>
   
    <footer class="tabbar">
      
      <router-link to="/HelloFromVux">
        <div class="tabbarItem">
          天天红包
        </div>
      </router-link>
      
      
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
      input: 1,
      earn: 1,
      days: 1,
      info: []
    };
  },

  mounted: async function() {
    axios
    .post("/meGetInfo", { name: this.name })
    .then(res => {
      console.log(res);
      this.info = res.data;
      this.input = res.data.length;
      this.earn = res.data.length;
      
    })
    .catch(err => {
      console.log(err);
    });
  },
  methods: {
    share() {
      alert('分享到微信');
    },
    realMoney() {
      alert('抱歉超过10元支持提现');
    }
  },
  computed: {}
};
</script>

<style scpoed>
.contain {
  height: 100vh;
  
  display: flex;
  flex-direction: column;
  align-items: center;
}
.redBag {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
}
.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.headPic {
  margin-top: 40px;
  height: 60px;
}
.name {
  margin-left:25px;
  margin-top: 30px;
}
.infoText {
  display: inline-block;
  margin: 60px 14px 0 14px;
  font-size: 13px;
}
.infoCount {
  display: inline-block;
  margin: 20px 45px 0 45px;
  font-size: 20px;
  color: white;
}
.function {
  margin-top: 30px;
}
.functionText {
  border: 1px solid black;
  padding:5px;
  border-radius: 35px;
  display: inline-block;
  margin: 0 40px;
}
.tabbar {
  height: 60px;
  background-color: aliceblue;
  width: 100%;
  display: flex;
}
.tabbarItem {
  margin: 20px 60px;
}
</style>