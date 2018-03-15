<template>
    <div class="contain">
        <h1>注册</h1>
        <span class="simpleStyle">用户名</span>
        <input class="inputStyle" v-model="username" type="text">
        <span class="simpleStyle">密码</span>
        <input class="inputStyle" v-model="password" type="text">
        <span class="simpleStyle">确认密码</span>
        <input class="inputStyle" v-model="passwordAgain" type="text">
        <button class="simpleStyle" v-on:click="logup">注册</button>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      passwordAgain: ""
    };
  },
  methods: {
    logup() {
      if (this.password.length <= 4) {
        alert("密码长度必须大于四位");
      } else {
        if (this.password !== this.passwordAgain) {
          alert("两次输入的密码不一致");
        } else {
          var data = {
            username: this.username,
            password: this.password
          };
        //   console.log(data);
          axios.post("/logup", data).then(res => {
            if (res.data === "ok") {
              this.$router.push({path: '/'});
            }
          });
        }
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
.simpleStyle {
  margin: 15px;
}
.inputStyle {
  padding: 5px 5px;
}
</style>