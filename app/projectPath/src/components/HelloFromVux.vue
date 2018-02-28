<template>
  <div class="contain">
    <div class="bg">
      <div class="info">
        <span class="infoText">共<span class="money">{{money}}</span>元</span><br>
        <span class="peopleCount">当前已有{{peopleCount}}人参与</span>

        </div>
      <img src="../../static/picture/redBag.jpg" class="redBag" alt="">
      <button class="poenBtn" v-on:click="join">
        支付一元立即参与
      </button>
    </div>
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
import axios from 'axios';  
export default {

  components: {
    
  },
  data () {
    return {
      money:0,
      peopleCount:0,
    }
  },
  mounted: function () {
    var date = new Date();
    var month = date.getMonth()+1;
    var day  = date.getDate();
    axios.post('/getInfo',{name:'xp',time:{month:month,day:day}}).then((res) => {
      console.log(res);
    })
  },
  methods:{
    join(){
      alert('支付成功')
      var date = new Date();
      var year = date.getUTCFullYear();
      var month = date.getMonth()+1;
      var day  = date.getDate();
      console.log(year,month,day);
      axios.post('/join',{
        info:{
          name:'xp',
          money:1,
          createTime:{
            year:year,
            month:month,
            day:day
          }
        }
      }).then((res) => {
        console.log(res);
      })

    }
  },
  computed: {
    
  }
}
</script>

<style>
  
  .contain{
    height:100vh;
    background-color: #fe0000;
  }
  .info{
    position: absolute;
    left:140px;
    top:10px;
  }
  .infoText{
    font-size: 30px;
  }
  .peopleCount{
    margin-left: -20px;
  }
  .money{
    color:azure;
    font-size: 30px;
  }
  .redBag{
    
    width:100%;
    height:100%;
  }
  .poenBtn{
    height:50px;
    width:150px;
    position: absolute;
    top:160px;
    left:110px;
    color:red;
    
    
  }
  .list {
    position: absolute;
    height:300px;
    width:100%;
    top:250px;
  }
  .tabbar{
    height: 60px;
    background-color: aliceblue;
    width:100%;
    display: flex;
    position:absolute;
    bottom:0;
  }
  .tabbarItem{
    margin:20px 60px;
  }
</style>