<template>
    <div class="contain">
        <h1>登录</h1>
        <span class="simpleStyle">用户名</span>
        <input class="inputStyle" v-model="username" type="text">
        <span class="simpleStyle">密码</span>
        <input class="inputStyle" v-model="password" type="text">
        
        <button class="simpleStyle">登录</button>
        <router-link to="/Logup">
            <div class="gotoLogup">点我注册账号</div>
        </router-link>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return{
            username:'',
            password:''

        }
    }
};
</script>

<style scoped>
    .contain{
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .simpleStyle{
        margin: 15px;
    }
    .inputStyle{
        padding: 5px 5px;
    }
    .gotoLogup{
        color: red;
    }
    
</style>