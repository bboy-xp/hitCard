<template>
  <div class="contain">
    <div class="body">
      <div class="head">
        <img class="headPic" src="../../static/picture/head.png" alt="">
        <span class="nickName">{{nickName}}</span>
      </div>
    </div>
   
    <footer class="tabbar">
      
      <div class="tabbarItem">
        天天红包
      </div>
      
      
      <div v-on:click="me" class="tabbarItem">
        我的主页
      </div>
        
    </footer>

  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {
    
  },
  data() {
    return {
      nickName:'xp',
    };
  },
  
  mounted: {   
  },
  methods: {
    
  },
  computed: {}
};
</script>

<style>
.contain {
  height: 100vh;
  background-color: #fe0000;
  display: flex;
  flex-direction: column; 
  align-items: center;
}
.body{
  display: flex;
  flex-direction: column; 
  flex:1;
}
.headPic{
  margin-top: 30px;
  height: 60px;
  
}
.nickName{
  display: block;
  margin:0 50%;

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